import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/ibreoto-yonetim-2025/', '/sepet/', '/odeme/', '/giris/'],
    },
    sitemap: 'https://ibreoto.vercel.app/sitemap.xml',
  }
}
