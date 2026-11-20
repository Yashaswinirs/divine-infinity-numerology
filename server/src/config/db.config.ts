import type {
  User,
  Course,
  CourseModule,
  Lesson,
  Enrollment,
  LessonProgress,
  Quiz,
  Certificate,
  Order,
  Notification,
  ContactEnquirySubmission,
} from '@divine/types';
import bcrypt from 'bcryptjs';

/**
 * In-Memory Database store seeded with rich mock data.
 * Designed with clean repository interfaces so it can be swapped with Prisma/Mongoose/TypeORM seamlessly.
 */
export interface DbStore {
  users: Map<string, User & { passwordHash: string }>;
  courses: Map<string, Course>;
  modules: Map<string, CourseModule>;
  lessons: Map<string, Lesson>;
  enrollments: Map<string, Enrollment>;
  progress: Map<string, LessonProgress>;
  quizzes: Map<string, Quiz>;
  certificates: Map<string, Certificate>;
  orders: Map<string, Order>;
  notifications: Map<string, Notification>;
  enquiries: Map<string, ContactEnquirySubmission>;
}

export const db: DbStore = {
  users: new Map(),
  courses: new Map(),
  modules: new Map(),
  lessons: new Map(),
  enrollments: new Map(),
  progress: new Map(),
  quizzes: new Map(),
  certificates: new Map(),
  orders: new Map(),
  notifications: new Map(),
  enquiries: new Map(),
};

// Seed initial database
export async function seedDatabase() {
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const studentPasswordHash = await bcrypt.hash('student123', 10);

  // 1. Admin User
  const adminUser: User & { passwordHash: string } = {
    id: 'user-admin-1',
    email: 'admin@divineinfinity.com',
    fullName: 'Tejasswini (Admin)',
    phoneNumber: '+91 9876543210',
    role: 'admin',
    avatarUrl: '/images/about-us/about-tejasswini-portrait.svg',
    isBlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    passwordHash: adminPasswordHash,
  };
  db.users.set(adminUser.id, adminUser);

  // 2. Demo Student User
  const studentUser: User & { passwordHash: string } = {
    id: 'user-student-1',
    email: 'student@divineinfinity.com',
    fullName: 'Aarav Sharma',
    phoneNumber: '+91 9123456789',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    isBlocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    passwordHash: studentPasswordHash,
  };
  db.users.set(studentUser.id, studentUser);

  // 3. Courses (Derived from divine-infinity curriculum)
  const course1: Course = {
    id: 'course-numerology-pro',
    title: 'Complete Professional Numerology Mastery',
    slug: 'complete-professional-numerology-mastery',
    summary: 'Master Pythagorean, Chaldean, and Vedic numerology systems with real-world case studies.',
    description: 'Learn to decode life path numbers, destiny numbers, name vibration corrections, and karmic debts with master coach Tejasswini.',
    thumbnailUrl: '/images/courses/courses-hero.webp',
    level: 'all-levels',
    durationHours: 32,
    price: 14999,
    originalPrice: 24999,
    currency: 'INR',
    status: 'published',
    instructorId: 'user-admin-1',
    instructorName: 'Tejasswini',
    tags: ['Numerology', 'Chaldean', 'Pythagorean', 'Name Correction'],
    modulesCount: 3,
    lessonsCount: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.courses.set(course1.id, course1);

  // Course 1 Modules & Lessons
  const module1: CourseModule = {
    id: 'mod-1',
    courseId: course1.id,
    title: 'Module 1: Foundations of Numbers & Vibrations',
    order: 1,
    lessons: [],
  };
  const lesson1: Lesson = {
    id: 'les-1-1',
    moduleId: module1.id,
    courseId: course1.id,
    title: 'Introduction to Numbers 1 to 9 & Planetary Rulers',
    description: 'Deep dive into individual number energies and their core ruling planets.',
    type: 'video',
    durationMinutes: 45,
    order: 1,
    isFreePreview: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  };
  const lesson2: Lesson = {
    id: 'les-1-2',
    moduleId: module1.id,
    courseId: course1.id,
    title: 'Calculating Life Path & Destiny Numbers',
    description: 'Step-by-step master methodology for accurate birthdate calculations.',
    type: 'video',
    durationMinutes: 50,
    order: 2,
    isFreePreview: false,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  };
  const lesson3: Lesson = {
    id: 'les-1-3',
    moduleId: module1.id,
    courseId: course1.id,
    title: 'Knowledge Check: Core Number Archetypes',
    type: 'quiz',
    durationMinutes: 15,
    order: 3,
    isFreePreview: false,
    quizId: 'quiz-mod-1',
  };
  module1.lessons = [lesson1, lesson2, lesson3];
  db.modules.set(module1.id, module1);
  db.lessons.set(lesson1.id, lesson1);
  db.lessons.set(lesson2.id, lesson2);
  db.lessons.set(lesson3.id, lesson3);

  // Module 2
  const module2: CourseModule = {
    id: 'mod-2',
    courseId: course1.id,
    title: 'Module 2: Master Numbers & Karmic Lessons',
    order: 2,
    lessons: [],
  };
  const lesson4: Lesson = {
    id: 'les-2-1',
    moduleId: module2.id,
    courseId: course1.id,
    title: 'Master Numbers 11, 22, and 33 Demystified',
    description: 'Higher vibration spiritual lessons and responsibilities.',
    type: 'video',
    durationMinutes: 40,
    order: 1,
    isFreePreview: false,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  };
  const lesson5: Lesson = {
    id: 'les-2-2',
    moduleId: module2.id,
    courseId: course1.id,
    title: 'Downloadable Guide: Master Number Cheat Sheets',
    description: 'Reference PDF manual for your consultation practice.',
    type: 'pdf',
    durationMinutes: 20,
    order: 2,
    isFreePreview: false,
    pdfUrl: '/docs/numerology-cheat-sheet.pdf',
  };
  const lesson6: Lesson = {
    id: 'les-2-3',
    moduleId: module2.id,
    courseId: course1.id,
    title: 'Final Certification Assessment',
    type: 'quiz',
    durationMinutes: 30,
    order: 3,
    isFreePreview: false,
    quizId: 'quiz-final',
  };
  module2.lessons = [lesson4, lesson5, lesson6];
  db.modules.set(module2.id, module2);
  db.lessons.set(lesson4.id, lesson4);
  db.lessons.set(lesson5.id, lesson5);
  db.lessons.set(lesson6.id, lesson6);

  // Quizzes
  const quiz1: Quiz = {
    id: 'quiz-mod-1',
    lessonId: lesson3.id,
    title: 'Module 1 Knowledge Check',
    passPercentage: 70,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q1',
        question: 'Which celestial body governs the Number 1 in Vedic Numerology?',
        options: [
          { id: 'opt-a', text: 'Sun (Surya)' },
          { id: 'opt-b', text: 'Moon (Chandra)' },
          { id: 'opt-c', text: 'Jupiter (Brihaspati)' },
          { id: 'opt-d', text: 'Mars (Mangal)' },
        ],
        correctOptionId: 'opt-a',
        explanation: 'Number 1 is ruled by the Sun, representing leadership, ego, and life force.',
      },
      {
        id: 'q2',
        question: 'What is the sum reduced to a single digit for birth date 28?',
        options: [
          { id: 'opt-a', text: '8' },
          { id: 'opt-b', text: '1 (2 + 8 = 10 -> 1 + 0 = 1)' },
          { id: 'opt-c', text: '2' },
          { id: 'opt-d', text: '7' },
        ],
        correctOptionId: 'opt-b',
        explanation: '28 reduces to 10 which further reduces to 1.',
      },
    ],
  };
  db.quizzes.set(quiz1.id, quiz1);

  // 4. Enroll demo student into course 1
  const enrollment: Enrollment = {
    id: 'enr-1',
    studentId: studentUser.id,
    courseId: course1.id,
    status: 'active',
    enrolledAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    completionPercentage: 50,
    lastAccessedAt: new Date().toISOString(),
  };
  db.enrollments.set(enrollment.id, enrollment);

  // Progress for student
  db.progress.set(`${studentUser.id}_${lesson1.id}`, {
    id: `prg-1`,
    studentId: studentUser.id,
    lessonId: lesson1.id,
    courseId: course1.id,
    isCompleted: true,
    completedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  });
  db.progress.set(`${studentUser.id}_${lesson2.id}`, {
    id: `prg-2`,
    studentId: studentUser.id,
    lessonId: lesson2.id,
    courseId: course1.id,
    isCompleted: true,
    completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  });
  db.progress.set(`${studentUser.id}_${lesson3.id}`, {
    id: `prg-3`,
    studentId: studentUser.id,
    lessonId: lesson3.id,
    courseId: course1.id,
    isCompleted: true,
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  });

  // Certificate
  const certificate: Certificate = {
    id: 'cert-1',
    certificateNumber: 'DI-NUM-2026-0042',
    studentId: studentUser.id,
    studentName: studentUser.fullName,
    courseId: course1.id,
    courseTitle: course1.title,
    issueDate: new Date().toISOString(),
    pdfUrl: '/certificates/cert-42.pdf',
    verificationUrl: 'http://localhost:3000/verify/DI-NUM-2026-0042',
  };
  db.certificates.set(certificate.id, certificate);

  // Demo Order
  const order: Order = {
    id: 'ord-1001',
    studentId: studentUser.id,
    courseId: course1.id,
    amount: 14999,
    currency: 'INR',
    status: 'completed',
    gateway: 'razorpay',
    gatewayOrderId: 'order_test_998877',
    gatewayPaymentId: 'pay_test_445566',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  };
  db.orders.set(order.id, order);

  // Notifications
  const notif: Notification = {
    id: 'notif-1',
    userId: studentUser.id,
    title: 'Welcome to Divine Infinity LMS!',
    message: 'Your enrollment in Complete Professional Numerology Mastery is active. Start learning now.',
    type: 'system',
    isRead: false,
    linkUrl: '/learn/course-numerology-pro',
    createdAt: new Date().toISOString(),
  };
  db.notifications.set(notif.id, notif);
}
