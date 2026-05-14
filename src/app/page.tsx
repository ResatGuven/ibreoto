import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyIbreoto } from '@/components/home/WhyIbreoto';
import { InstagramBanner } from '@/components/home/InstagramBanner';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <HeroSlider />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyIbreoto />
      <InstagramBanner />
    </div>
  );
}

