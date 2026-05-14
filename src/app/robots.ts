import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/yonetim/', '/sepet/', '/odeme/', '/giris/'],
    },
    sitemap: 'https://ibreoto.vercel.app/sitemap.xml',
  }
}
