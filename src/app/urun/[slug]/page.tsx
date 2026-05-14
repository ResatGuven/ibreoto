import React from 'react';
import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  // If slug is numeric ID, find by ID, otherwise by slug
  const isNumeric = !isNaN(Number(slug));
  
  const product = await prisma.product.findFirst({
    where: isNumeric ? { id: Number(slug) } : { slug: slug }
  });

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) return { title: 'Ürün Bulunamadı | İbreOto' };

  return {
    title: `${product.name} | İbreOto Aksesuar`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image || ''],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const productData = await getProduct(resolvedParams.slug);

  if (!productData) {
    notFound();
  }

  // Convert prisma model to plain object for client component
  const product = {
    id: productData.id,
    name: productData.name,
    price: Number(productData.price),
    description: productData.description,
    images: [productData.image || '/images/products/placeholder.png'],
    category: productData.category,
    rating: 4.8, // Mock for now or add to DB
    features: [
      'Yüksek Kalite Malzeme',
      'Kolay Montaj',
      'Orijinal Tasarım',
      'Dayanıklı Yapı'
    ]
  };

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0],
    description: product.description,
    sku: `IBRE-${product.id}`,
    offers: {
      '@type': 'Offer',
      url: `https://ibreoto.vercel.app/urun/${resolvedParams.slug}`,
      priceCurrency: 'TRY',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} slug={resolvedParams.slug} />
    </>
  );
}
