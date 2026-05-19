"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to homepage when navigating to a non-existent URL
    router.replace('/');
  }, [router]);

  return null;
}
