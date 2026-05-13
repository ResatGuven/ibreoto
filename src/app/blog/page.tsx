"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import blogPosts from '@/data/blog-posts.json';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('app_blogs');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(blogPosts);
    }
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">İbreoto Blog</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Araba aksesuarları, bakım ipuçları ve en yeni trendler hakkında uzman yazılarımız.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-lg transition-all duration-300 flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-surface">
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1611245839605-96db1574ede7?w=500'} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold uppercase font-heading px-3 py-1 rounded-full">
                    {post.category || 'Genel'}
                  </span>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-text-muted mb-3 space-x-4 font-body">
                  <div className="flex items-center">
                    <Calendar className="w-3.h-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3.h-3 mr-1" />
                    {post.author || 'Editör'}
                  </div>
                </div>
                <h2 className="text-lg font-heading font-bold mb-2 text-secondary group-hover:text-primary transition-colors uppercase">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-text-muted text-sm mb-4 font-body line-clamp-3">
                  {post.content ? post.content.substring(0, 100) + '...' : 'İçerik bulunamadı.'}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-secondary font-heading font-bold hover:text-primary transition-colors text-sm uppercase flex items-center"
                  >
                    Devamını Oku <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center text-gray-500 font-body py-10">
            Henüz blog yazısı eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
