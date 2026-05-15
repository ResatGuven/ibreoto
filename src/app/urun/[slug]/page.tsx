import React from 'react';
import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id: slug },
        { slug: slug }
      ]
    }
  });

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) return { title: 'Ürün Bulunamadı | İbreOto' };

  let firstImage = '/images/logo.png';
  try {
    const images = JSON.parse(product.images);
    if (Array.isArray(images) && images.length > 0) {
      firstImage = images[0];
    }
  } catch (e) {}

  return {
    title: `${product.name} | İbreOto Premium Aksesuar`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 200),
      images: [firstImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const productData = await getProduct(resolvedParams.slug);

  if (!productData) {
    notFound();
  }

  // Parse images JSON
  let images = ['/images/products/placeholder.png'];
  try {
    const parsed = JSON.parse(productData.images);
    if (Array.isArray(parsed) && parsed.length > 0) {
      images = parsed;
    }
  } catch (e) {
    console.error('Failed to parse product images:', e);
  }

  // Convert prisma model to plain object for client component
  const product = {
    id: productData.id,
    name: productData.name,
    price: Number(productData.price),
    oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
    description: productData.description,
    images: images,
    category: '', 
    stock: productData.stock,
    isFreeShipping: productData.isFreeShipping,
    isNew: productData.isNew,
    rating: 5.0,
    features: [
      'Premium Kalite Malzeme',
      'Aracınıza Tam Uyum',
      'Kolay Montaj Özelliği',
      'Dayanıklı ve Uzun Ömürlü'
    ]
  };

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0],
    description: product.description.substring(0, 200),
    sku: `IBRE-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'İbreOto'
    },
    offers: {
      '@type': 'Offer',
      url: `https://ibreoto.com/urun/${resolvedParams.slug}`,
      priceCurrency: 'TRY',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2026-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
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
