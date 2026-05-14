"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = React.use(params);
    const { slug } = resolvedParams;
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/blog/${slug}`);
                const data = await res.json();
                if (!data.error) setPost(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const sanitizeHtml = (html: string) => {
        return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
    };

    if (loading) {
        return <div className="pt-24 min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>;
    }

    if (!post) {
        return (
            <div className="pt-24 min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-heading font-bold text-secondary mb-4">YAZI BULUNAMADI</h1>
                <Link href="/blog" className="text-primary hover:underline font-body flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Blog'a Geri Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Header */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-sm text-text-muted mb-4 font-body flex items-center">
                    <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
                    <span className="mx-2">&gt;</span>
                    <Link href="/blog" className="hover:text-primary">Blog</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-secondary font-medium">{post.title}</span>
                </div>

                <div className="mb-6">
                    <span className="bg-primary/10 text-primary text-xs font-bold uppercase font-heading px-3 py-1 rounded-full">
                        {post.category}
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4 uppercase leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center text-sm text-text-muted mb-8 space-x-6 font-body">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {post.author}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container mx-auto px-4 max-w-4xl mb-12">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    <img 
                        src={post.image || '/images/logo.jpg'} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = '/images/logo.jpg';
                        }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-3xl pb-20">
                <div 
                    className="prose prose-sm sm:prose-base max-w-none font-body text-text-muted leading-relaxed
                               prose-headings:font-heading prose-headings:font-bold prose-headings:text-secondary prose-headings:uppercase
                               prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                               prose-p:mb-4
                               prose-strong:text-secondary"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />

                {/* Share & Actions */}
                <div className="border-t border-gray-100 mt-12 pt-6 flex justify-between items-center">
                    <Link href="/blog" className="text-secondary font-heading font-bold hover:text-primary transition-colors text-sm uppercase flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Tüm Yazılar
                    </Link>
                    <div className="flex space-x-4">
                        <button className="text-text-muted hover:text-primary transition-colors" title="Paylaş">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="text-text-muted hover:text-primary transition-colors" title="Kaydet">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
