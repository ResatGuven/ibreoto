"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogRes = await fetch('/api/blog');
        const blogData = await blogRes.json();
        setPosts(Array.isArray(blogData) ? blogData : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-primary font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Sağlıklı Yaşam & Bilgi</p>
          <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-6">ARI HAYAT <span className="text-primary italic">BLOG</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-body">
            Doğal balın faydaları, propolis rehberi ve sağlıklı yaşam ipuçları.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] h-[500px] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, i) => (
              <article key={post.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-3 border border-gray-100 hover:border-primary/20">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={post.image || '/images/products/karisim.png'} 
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    {post.category || 'Genel'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center"><Calendar size={12} className="mr-1.5 text-primary" /> {new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1.5 text-primary" /> 4 Dakika</span>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-black text-secondary group-hover:text-primary transition-colors uppercase leading-tight mb-4 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link href={`/blog/${post.slug}`} className="flex items-center font-heading font-black text-xs text-secondary uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Devamını Oku <ChevronRight size={16} className="ml-1 text-primary" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-heading font-bold text-gray-400 uppercase">Henüz Yazı Eklenmemiş</h3>
          </div>
        )}
      </div>
    </div>
  );
}
