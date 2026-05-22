import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const fallbackRecipes = [
  {
    name: "Ballı ve Yulaflı Enerji Topları",
    prepTime: "10 Dk",
    difficulty: "Kolay",
    honeyUsage: "Çiçek Balı - Malzemeleri bir arada tutmak ve doğal tatlılık vermek için.",
    ingredients: [
      "1.5 su bardağı yulaf ezmesi",
      "2 yemek kaşığı Arı Hayat Süzme Çiçek Balı",
      "3 yemek kaşığı fıstık ezmesi (şekersiz)",
      "1/2 çay bardağı dövülmüş ceviz içi",
      "1 yemek kaşığı kakao (isteğe bağlı)"
    ],
    instructions: [
      "Geniş bir kaba yulaf, kakao ve ceviz içini ekleyip karıştırın.",
      "Üzerine fıstık ezmesini ve Arı Hayat süzme çiçek balını ilave edin.",
      "Tüm malzemeler bütünleşene kadar güzelce yoğurun.",
      "Elde ettiğiniz harçtan ceviz büyüklüğünde toplar yuvarlayın.",
      "Buzdolabında 20-30 dakika dinlendirdikten sonra servis edebilirsiniz."
    ],
    benefits: "Yulafın lif yapısı ve balın doğal karbonhidrat içeriği sayesinde gün boyu enerji verir, tatlı krizlerini sağlıklı bir şekilde önler."
  },
  {
    name: "Fırında Ballı ve Sarımsaklı Tavuk Marinasyonu",
    prepTime: "40 Dk",
    difficulty: "Orta",
    honeyUsage: "Kestane Balı - Karamelize doku ve hafif odunsu, keskin bir lezzet derinliği katmak için.",
    ingredients: [
      "500g tavuk göğsü veya but",
      "1.5 yemek kaşığı Arı Hayat Kestane Balı",
      "3 diş ezilmiş sarımsak",
      "2 yemek kaşığı zeytinyağı",
      "1 yemek kaşığı soya sosu",
      "Baharatlar (kekik, karabiber, pul biber, tuz)"
    ],
    instructions: [
      "Ufak bir kapta zeytinyağı, soya sosu, ezilmiş sarımsak, Arı Hayat kestane balı ve baharatları çırparak homojen bir marinasyon sosu hazırlayın.",
      "Tavukları bu sosa bulayarak en az 20 dakika (mümkünse 1 saat) buzdolabında bekletin.",
      "Fırın tepsisine dizdiğiniz tavukları, kalan marinesiyle birlikte 190 derece ısıtılmış fırında üzeri kızarana kadar yaklaşık 30-35 dakika pişirin.",
      "Sıcak servis edin."
    ],
    benefits: "Kestane balının antiseptik özellikleri ve sarımsağın doğal antibiyotik yapısı birleşerek bağışıklık sistemini destekler ve etin yumuşacık pişmesini sağlar."
  }
];

export async function POST(req: Request) {
  try {
    const { geminiKey, ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: 'Lütfen malzeme girin.' }, { status: 400 });
    }

    // Helper to get fallback recipe based on ingredients
    const getFallbackRecipe = (ingredientsList: string[]) => {
      const listLower = (ingredientsList || []).map(i => i.toLowerCase());
      const isChickenRelated = listLower.some(i => 
        i.includes('tavuk') || 
        i.includes('but') || 
        i.includes('göğüs') || 
        i.includes('chicken') || 
        i.includes('et') || 
        i.includes('sarımsak') || 
        i.includes('soya')
      );
      return isChickenRelated ? fallbackRecipes[1] : fallbackRecipes[0];
    };

    // No Gemini key? Return fallback recipes
    if (!geminiKey) {
      return NextResponse.json({ success: true, isFallback: true, data: getFallbackRecipe(ingredients) });
    }

    const systemInstruction = `
Sen sağlıklı beslenme, apiterapi ve doğal yaşam konularında uzmanlaşmış profesyonel bir Şef ve Gurmesin.
Senden eldeki malzemelere göre, şeker yerine bal (tercihen Arı Hayat'ın Kestane Balı, Karakovan Balı, Çiçek Balı gibi doğal balları) kullanan, sağlıklı, pratik ve lezzetli bir yemek, sos veya tatlı tarifi hazırlamanı istiyoruz.

Mevcut Malzemeler: ${ingredients.join(", ")}

Lütfen hazırlayacağın yazıyı tam olarak aşağıdaki JSON formatında teslim et. JSON yapısı dışında başka hiçbir açıklama, markdown bloğu veya fazladan metin EKLEME:
{
  "name": "Tarifin Adı (Örn: Muzlu ve Yulaflı Ballı Bar)",
  "prepTime": "Hazırlık Süresi (Örn: 15 Dk)",
  "difficulty": "Zorluk Derecesi (Kolay, Orta, Zor)",
  "honeyUsage": "Hangi bal çeşidinin neden tercih edilmesi gerektiği (Örn: Yayla Çiçek Balı - hafif aromasıyla tatlıyı dengelemek için)",
  "ingredients": ["Kullanılacak malzemelerin listesi ve ölçüleri (satır satır array)"],
  "instructions": ["Hazırlanış adımları sırayla (satır satır array)"],
  "benefits": "Bu tarifin sağlığa faydaları ve besin değeri hakkında kısa bir açıklama."
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemInstruction }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      // Fallback in case of external API error
      return NextResponse.json({ success: true, isFallback: true, data: getFallbackRecipe(ingredients) });
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (e) {
      const cleanText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleanText);
    }

    return NextResponse.json({ success: true, isFallback: false, data: parsedResult });
  } catch (error: any) {
    console.error("AI Recipe generate error:", error);
    // Silent recovery: return standard fallback on exception
    // We try to parse body to get ingredients if possible, or default to fallbackRecipes[0]
    let fallbackData = fallbackRecipes[0];
    try {
      const body = await req.clone().json();
      const listLower = (body.ingredients || []).map((i: string) => i.toLowerCase());
      const isChickenRelated = listLower.some((i: string) => 
        i.includes('tavuk') || 
        i.includes('but') || 
        i.includes('göğüs') || 
        i.includes('chicken') || 
        i.includes('et') || 
        i.includes('sarımsak') || 
        i.includes('soya')
      );
      if (isChickenRelated) fallbackData = fallbackRecipes[1];
    } catch (e) {}
    
    return NextResponse.json({ success: true, isFallback: true, data: fallbackData });
  }
}
