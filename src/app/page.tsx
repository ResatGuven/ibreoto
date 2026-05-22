import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { IoTDiscountBanner } from '@/components/home/IoTDiscountBanner';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyArihayat } from '@/components/home/WhyArihayat';
import { InstagramBanner } from '@/components/home/InstagramBanner';
import { HoneySelector } from '@/components/home/HoneySelector';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background honeycomb-bg">
      <HeroSlider />
      <IoTDiscountBanner />
      <CategoryShowcase />
      <HoneySelector />
      <FeaturedProducts />
      <WhyArihayat />
      <InstagramBanner />
    </div>
  );
}

