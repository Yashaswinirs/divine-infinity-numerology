/**
 * @divine/types - Core Domain Types for Divine Infinity LMS & Platform
 */

// --- USER & ROLES ---
export type Role = 'admin' | 'student' | 'instructor';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
  avatarUrl?: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  dateOfBirth?: string;
  enrolledCourseCount: number;
  completedCourseCount: number;
  certificatesEarned: number;
}

// --- AUTH ---
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

// --- COURSES, MODULES & LESSONS ---
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  level: CourseLevel;
  durationHours: number;
  price: number;
  originalPrice?: number;
  currency: string;
  status: CourseStatus;
  instructorId: string;
  instructorName: string;
  tags: string[];
  modulesCount: number;
  lessonsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export type LessonType = 'video' | 'pdf' | 'quiz' | 'text';

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description?: string;
  type: LessonType;
  durationMinutes: number;
  order: number;
  isFreePreview: boolean;
  videoUrl?: string;
  pdfUrl?: string;
  textContent?: string;
  quizId?: string;
}

// --- ENROLLMENTS & PROGRESS ---
export type EnrollmentStatus = 'active' | 'completed' | 'expired' | 'cancelled';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  expiresAt?: string;
  completionPercentage: number;
  completedAt?: string;
  lastAccessedAt: string;
}

export interface LessonProgress {
  id: string;
  studentId: string;
  lessonId: string;
  courseId: string;
  isCompleted: boolean;
  completedAt?: string;
  playbackPositionSeconds?: number;
}

export interface CourseProgressDetail {
  courseId: string;
  studentId: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  isCourseCompleted: boolean;
  lastLessonId?: string;
  lessonProgressMap: Record<string, boolean>;
}

// --- ASSESSMENTS & QUIZZES ---
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string; // Not sent to student during quiz
  explanation?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  passPercentage: number;
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalScore: number;
  percentage: number;
  isPassed: boolean;
  submittedAt: string;
}

// --- CERTIFICATES ---
export interface Certificate {
  id: string;
  certificateNumber: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  pdfUrl: string;
  verificationUrl: string;
}

// --- PAYMENTS & ORDERS ---
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentGateway = 'razorpay' | 'stripe' | 'manual';

export interface Order {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

// --- NOTIFICATIONS ---
export type NotificationType = 'system' | 'course_update' | 'quiz_result' | 'certificate_issued';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}

// --- CMS & ENQUIRIES ---
export interface ContactEnquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  serviceNeeded?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

// --- API RESPONSE TYPES ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errorCode?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
