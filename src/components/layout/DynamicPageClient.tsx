"use client";

import React, { useState, useEffect } from 'react';

export default function DynamicPageClient({ slug, title: defaultTitle, fallbackContent }: { slug: string, title: string, fallbackContent: React.ReactNode }) {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/admin/pages?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.isActive) {
            setPageData(data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch dynamic page:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-white font-body">
        <div className="container mx-auto px-4 max-w-4xl animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // If page exists in DB, render it
  if (pageData) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-white font-body">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase border-b-2 border-primary pb-2">
            {pageData.title}
          </h1>
          <div 
            className="prose prose-sm max-w-none text-gray-700 space-y-6 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </div>
    );
  }

  // Fallback to static content if not found in DB
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase border-b-2 border-primary pb-2">
          {defaultTitle}
        </h1>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-6 text-sm leading-relaxed">
          {fallbackContent}
        </div>
      </div>
    </div>
  );
}
