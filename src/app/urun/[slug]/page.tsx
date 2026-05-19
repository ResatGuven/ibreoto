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
    },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      category: true
    }
  });

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) return { title: 'Ürün Bulunamadı | Arı Hayat' };

  let firstImage = '/images/logo.png';
  try {
    const images = JSON.parse(product.images);
    if (Array.isArray(images) && images.length > 0) {
      firstImage = images[0];
    }
  } catch (e) {}

  return {
    title: `${product.name} | Arı Hayat %100 Doğal Arı Ürünleri`,
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

  // Calculate average rating
  let averageRating = 5.0;
  if (productData.reviews && productData.reviews.length > 0) {
    const total = productData.reviews.reduce((acc, review) => acc + review.rating, 0);
    averageRating = Number((total / productData.reviews.length).toFixed(1));
  }

  // Fetch related products for Cross-Sell
  const relatedProductsData = await prisma.product.findMany({
    where: {
      categoryId: productData.categoryId,
      id: { not: productData.id },
      stock: { gt: 0 }
    },
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  const relatedProducts = relatedProductsData.map(p => {
    let pImages = ['/images/logo.png'];
    try { pImages = JSON.parse(p.images); } catch(e){}
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
      images: pImages,
      isNew: p.isNew,
      isFreeShipping: p.isFreeShipping
    };
  });

  // Convert prisma model to plain object for client component
  const product = {
    id: productData.id,
    name: productData.name,
    price: Number(productData.price),
    oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
    description: productData.description,
    images: images,
    category: productData.category?.name || '', 
    stock: productData.stock,
    isFreeShipping: productData.isFreeShipping,
    isNew: productData.isNew,
    rating: averageRating,
    reviews: productData.reviews.map(r => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      userName: r.user?.name || 'Anonim',
      date: new Date(r.createdAt).toLocaleDateString('tr-TR')
    })),
    features: [
      'Laboratuvar Analizli',
      '%100 Doğal ve Katkısız',
      'Arıların Doğal Döngüsüyle Üretim',
      'Yüksek Besin Değeri Garantisi'
    ]
  };

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0],
    description: product.description.substring(0, 200),
    sku: `AH-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Arı Hayat'
    },
    offers: {
      '@type': 'Offer',
      url: `https://arihayat.com/urun/${resolvedParams.slug}`,
      priceCurrency: 'TRY',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2026-12-31'
    },
    aggregateRating: product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toString(),
      reviewCount: product.reviews.length.toString(),
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} slug={resolvedParams.slug} relatedProducts={relatedProducts} />
    </>
  );
}
