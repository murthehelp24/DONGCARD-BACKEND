import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { prisma } from '../src/lib/prisma.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function importCSV() {
  const csvFilePath = path.join(__dirname, 'OnePieceTCG_Cards.csv');

  // 1. เช็กว่าไฟล์มีอยู่จริงไหมก่อนเริ่ม
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ ไม่พบไฟล์ที่: ${csvFilePath}`);
    console.log("กรุณาย้ายไฟล์ CSV ไปไว้ที่โฟลเดอร์เดียวกับสคริปต์นี้");
    return;
  }

  const results = [];

  console.log('📖 กำลังอ่านข้อมูลจาก CSV...');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(`✅ อ่านเสร็จสิ้น: ${results.length} แถว. กำลังบันทึกลงฐานข้อมูล...`);

      for (const row of results) {
        try {
          // ใช้ upsert เพื่อกันข้อมูลซ้ำ (ถ้ามี id เดิมจะ update ถ้าไม่มีจะ create)
          await prisma.card.upsert({
            where: { id: row.card_id }, 
            update: {
              price: 0, // หรือใส่ logic คำนวณราคาถ้ามี
              stock: 0,
            },
            create: {
              id: row.card_id,
              name: row.card_name,
              rarity: row.card_rarity,
              color: row.card_color,
              type: row.card_type,
              // แปลงค่าจาก CSV เป็น Type ที่ Prisma ต้องการ
              power: row.card_power ? Math.floor(parseFloat(row.card_power)) : null,
              attribute: null, // ใน CSV ไม่มีช่องนี้ชัดเจน
              image: row.card_image,
              price: 0.0,
              stock: 0,
            },
          });
        } catch (err) {
          console.error(`❌ ข้ามการ์ด ID ${row.card_id}:`, err.message);
        }
      }

      console.log('🚀 นำเข้าข้อมูลสำเร็จทั้งหมด!');
      await prisma.$disconnect();
    });
}

importCSV();