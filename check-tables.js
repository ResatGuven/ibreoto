const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing Hive table...');
  try {
    const hiveCount = await prisma.hive.count();
    console.log(`Hive count: ${hiveCount}`);
  } catch (err) {
    console.error('Hive table failed:', err.message);
  }

  console.log('Testing HiveAdoption table...');
  try {
    const adoptionCount = await prisma.hiveAdoption.count();
    console.log(`HiveAdoption count: ${adoptionCount}`);
  } catch (err) {
    console.error('HiveAdoption table failed:', err.message);
  }

  console.log('Testing HoneyAnalysis table...');
  try {
    const analysisCount = await prisma.honeyAnalysis.count();
    console.log(`HoneyAnalysis count: ${analysisCount}`);
  } catch (err) {
    console.error('HoneyAnalysis table failed:', err.message);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
