import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    // Group FAQs by category
    const categoriesMap: { [key: string]: any[] } = {};
    for (const faq of faqs) {
      const category = faq.category || "Genel";
      if (!categoriesMap[category]) {
        categoriesMap[category] = [];
      }
      categoriesMap[category].push({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      });
    }

    const groupedFaqs = Object.keys(categoriesMap).map((catName) => ({
      category: catName,
      items: categoriesMap[catName],
    }));

    return NextResponse.json(groupedFaqs, { status: 200 });
  } catch (error: any) {
    console.error("SSS listeleme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Sorular yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
