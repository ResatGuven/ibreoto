import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { IoTDiscountBanner } from '@/components/home/IoTDiscountBanner';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background honeycomb-bg">
      <HeroSlider />
      <IoTDiscountBanner />
      <CategoryShowcase />
      <FeaturedProducts />
    </div>
  );
}

