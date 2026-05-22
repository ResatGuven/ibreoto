const fs = require('fs');
const path = require('path');

// Ensure API key is present
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const prompt = `
Bana doğal bal, arıcılık, propolis, arı sütü, polen, apiterapi veya arıların doğadaki önemi hakkında Türkçe, SEO uyumlu ve ilgi çekici bir blog yazısı yaz.
Yazı formatı mutlaka ama mutlaka şu JSON yapısında olmalıdır:
{
  "slug": "yazi-slugu-ornek-kestane-balinin-faydalari",
  "category": "Kategori Adı (Örn: Sağlık, Rehber, Beslenme, Arıcılık)",
  "title": "Yazı Başlığı",
  "excerpt": "Yazının kısa özeti (max 150 karakter)",
  "date": "Bugünün tarihi (Örn: 22 Mayıs 2026)",
  "author": "Arı Hayat Ekibi",
  "image": "/images/blog/blog-1.webp",
  "content": "<p>Yazı içeriği HTML etiketleri ile olmalı. Başlıklar için h3, paragraflar için p kullanılmalı.</p>"
}
Sadece JSON çıktısını ver, başka açıklama yazma.
`;

async function generateBlog() {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    const text = data.candidates[0].content.parts[0].text;
    const newPost = JSON.parse(text);

    // Read existing posts
    const filePath = path.join(__dirname, '../src/data/blog-posts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileData);

    // Add new post to the beginning
    posts.unshift(newPost);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');

    console.log(`Successfully generated and added new blog post: ${newPost.title}`);
  } catch (error) {
    console.error('Error generating blog post:', error);
    process.exit(1);
  }
}

generateBlog();
