import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Supabase database...');

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const studentPasswordHash = await bcrypt.hash('student123', 10);

  // 1. Master Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@divineinfinity.com' },
    update: {},
    create: {
      email: 'admin@divineinfinity.com',
      passwordHash: adminPasswordHash,
      fullName: 'Tejaswinni (Master Admin)',
      phoneNumber: '+91 9876543210',
      role: 'admin',
      avatarUrl: '/images/about-us/about-tejasswini-portrait.svg',
      isBlocked: false,
    },
  });

  // 2. Demo Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@divineinfinity.com' },
    update: {},
    create: {
      email: 'student@divineinfinity.com',
      passwordHash: studentPasswordHash,
      fullName: 'Priya Sharma',
      phoneNumber: '+91 9123456789',
      role: 'student',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      isBlocked: false,
    },
  });

  // 3. Courses
  const course1 = await prisma.course.upsert({
    where: { slug: 'numerology-foundations' },
    update: {},
    create: {
      title: 'Numerology Foundations & Life Path Mastery',
      slug: 'numerology-foundations',
      description: 'Master Pythagorean, Chaldean, and Vedic numerology systems with real-world case studies and live calculations.',
      price: 14999,
      renewalPrice: 4999,
      accessMonths: 12,
      thumbnailUrl: '/images/courses/courses-hero.webp',
      level: 'all-levels',
      status: 'published',
      modules: {
        create: [
          {
            title: 'Module 1: Foundations of Numbers & Vibrations',
            orderIndex: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to Numbers 1 to 9 & Planetary Rulers',
                  durationMins: 45,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  orderIndex: 1,
                },
                {
                  title: 'Calculating Life Path & Destiny Numbers',
                  durationMins: 50,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  orderIndex: 2,
                },
              ],
            },
          },
          {
            title: 'Module 2: Master Numbers & Karmic Debts',
            orderIndex: 2,
            lessons: {
              create: [
                {
                  title: 'Decoding Master Numbers 11, 22, 33',
                  durationMins: 55,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  orderIndex: 1,
                },
                {
                  title: 'Identifying Karmic Debt Lessons (13, 14, 16, 19)',
                  durationMins: 60,
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  orderIndex: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.upsert({
    where: { slug: 'advanced-name-correction' },
    update: {},
    create: {
      title: 'Advanced Chaldean Name Correction & Business Vibrations',
      slug: 'advanced-name-correction',
      description: 'Professional course on personal name corrections, newborn baby names, and corporate company branding alignment.',
      price: 24999,
      renewalPrice: 7999,
      accessMonths: 12,
      thumbnailUrl: '/images/courses/courses-hero.webp',
      level: 'advanced',
      status: 'published',
    },
  });

  // 4. Sample Enrollment for Priya Sharma
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: course1.id,
      expiresAt: oneYearFromNow,
      progressPct: 79,
    },
  });

  // 5. Sample Paid Order
  await prisma.order.upsert({
    where: { razorpayOrderId: 'order_sample_001' },
    update: {},
    create: {
      userId: student.id,
      courseId: course1.id,
      amount: 14999,
      status: 'paid',
      razorpayOrderId: 'order_sample_001',
      razorpayPaymentId: 'pay_sample_001',
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`- Admin: ${admin.email}`);
  console.log(`- Student: ${student.email}`);
  console.log(`- Courses: ${course1.title}, ${course2.title}`);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
