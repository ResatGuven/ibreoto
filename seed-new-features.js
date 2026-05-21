const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking and seeding new feature models safely...');

  // 1. Hive and HiveAdoption Seeding
  const hiveCount = await prisma.hive.count();
  if (hiveCount === 0) {
    const hive = await prisma.hive.create({
      data: {
        name: "Kovan Altın Petek",
        status: "ACTIVE",
        location: "Rize, Anzer Yaylası",
        temperature: 34.8,
        humidity: 61.2,
        beeCount: 48000,
        description: "Anzer Yaylası'nın zengin endemik çiçek florasıyla beslenen ve yüksek verimli kovanlarımızdan biri.",
      }
    });
    console.log('✅ Sample Hive created:', hive.name);

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now

    await prisma.hiveAdoption.create({
      data: {
        hiveId: hive.id,
        code: "KOV-1234",
        ownerName: "Arı Hayat Ailesi",
        ownerEmail: "kovanim@arihayat.com",
        startDate: new Date(),
        endDate: endDate,
        status: "ACTIVE"
      }
    });
    console.log('✅ Sample Adoption created with code: KOV-1234');
  } else {
    console.log('ℹ️ Hive table is not empty, skipping hive seed.');
  }

  // 2. HoneyAnalysis Seeding
  const analysisCount = await prisma.honeyAnalysis.count();
  if (analysisCount === 0) {
    await prisma.honeyAnalysis.create({
      data: {
        batchNo: "KESTANE-2026-01",
        productName: "Hakiki Kestane Balı 850 gr",
        proline: 520.0,
        moisture: 16.5,
        diastase: 12.5,
        analysisDate: new Date(),
        notes: "Gıda Kontrol Laboratuvarı tarafından yapılan analizde prolin değeri 520 mg/kg bulunmuştur (Türk Gıda Kodeksi alt sınırı 180 mg/kg'dır). Nem oranı %16.5 ile ideal olgunluk seviyesindedir. Diastaz sayısı 12.5 ile balın tazeliğini ve kalitesini tescil etmektedir."
      }
    });
    console.log('✅ Sample HoneyAnalysis created with batch no: KESTANE-2026-01');
  } else {
    console.log('ℹ️ HoneyAnalysis table is not empty, skipping honey analysis seed.');
  }

  console.log('🎉 Safe seeding process completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during safe seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
