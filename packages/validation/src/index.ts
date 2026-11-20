import { z } from 'zod';

// --- AUTH VALIDATION ---
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

// --- PROFILE & USER VALIDATION ---
export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['admin', 'student', 'instructor']),
});

export const updateUserStatusSchema = z.object({
  isBlocked: z.boolean(),
});

// --- COURSE VALIDATION ---
export const createCourseSchema = z.object({
  title: z.string().min(3, 'Course title is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  description: z.string().min(20, 'Full description is required'),
  thumbnailUrl: z.string().min(1, 'Thumbnail is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all-levels']),
  durationHours: z.number().positive(),
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  currency: z.string().default('INR'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createModuleSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(2, 'Module title is required'),
  order: z.number().int().min(0),
});

export const createLessonSchema = z.object({
  moduleId: z.string().min(1),
  courseId: z.string().min(1),
  title: z.string().min(2, 'Lesson title is required'),
  description: z.string().optional(),
  type: z.enum(['video', 'pdf', 'quiz', 'text']),
  durationMinutes: z.number().min(1),
  order: z.number().int().min(0),
  isFreePreview: z.boolean().default(false),
  videoUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  textContent: z.string().optional(),
});

// --- PROGRESS VALIDATION ---
export const updateProgressSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
  isCompleted: z.boolean(),
  playbackPositionSeconds: z.number().min(0).optional(),
});

// --- QUIZ & ASSESSMENT VALIDATION ---
export const submitQuizSchema = z.object({
  quizId: z.string().min(1),
  answers: z.record(z.string(), z.string()), // questionId -> selectedOptionId
});

// --- PAYMENTS & ORDERS VALIDATION ---
export const createOrderSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  gateway: z.enum(['razorpay', 'stripe', 'manual']).default('razorpay'),
});

export const verifyPaymentSchema = z.object({
  orderId: z.string().min(1),
  gatewayOrderId: z.string().min(1),
  gatewayPaymentId: z.string().min(1),
  gatewaySignature: z.string().optional(),
});

// --- CMS & ENQUIRY VALIDATION ---
export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(7, 'Phone number is required'),
  serviceNeeded: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
