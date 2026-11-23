import { apiFetch } from './api';
import { adminAuthStore } from '../store/authStore';
import type { User, Course, Order, ContactEnquirySubmission, AuthSession } from '@divine/types';

export class AdminService {
  // Auth
  static async login(email: string, password: string): Promise<AuthSession> {
    try {
      const session = await apiFetch<AuthSession>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (session.user.role !== 'admin') {
        throw new Error('Access denied. Administrator privileges required.');
      }

      adminAuthStore.setSession(session.user, session.tokens);
      return session;
    } catch (apiErr: any) {
      // Offline fallback for default demo admin credentials
      if (email === 'admin@divineinfinity.com' && password === 'admin123') {
        const demoSession: AuthSession = {
          user: {
            id: 'admin_demo_01',
            email: 'admin@divineinfinity.com',
            fullName: 'Master Admin',
            role: 'admin',
            isBlocked: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'demo_admin_access_token',
            refreshToken: 'demo_admin_refresh_token',
          },
        };
        adminAuthStore.setSession(demoSession.user, demoSession.tokens);
        return demoSession;
      }
      throw apiErr;
    }
  }

  static logout() {
    adminAuthStore.clearSession();
  }

  // Students
  static async getStudents(): Promise<User[]> {
    return apiFetch<User[]>('/users/students');
  }

  static async toggleBlockStudent(id: string, isBlocked: boolean): Promise<User> {
    return apiFetch<User>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isBlocked }),
    });
  }

  // Courses
  static async getCourses(): Promise<Course[]> {
    return apiFetch<Course[]>('/courses');
  }

  static async createCourse(input: Partial<Course>): Promise<Course> {
    return apiFetch<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  static async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    return apiFetch<Course>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  static async deleteCourse(id: string): Promise<void> {
    return apiFetch<void>(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Payments / Orders
  static async getOrders(): Promise<Array<Order & { studentName?: string; courseTitle?: string }>> {
    return apiFetch<Array<Order & { studentName?: string; courseTitle?: string }>>('/payments/all');
  }

  // CMS & Enquiries
  static async getEnquiries(): Promise<ContactEnquirySubmission[]> {
    return apiFetch<ContactEnquirySubmission[]>('/cms/enquiries');
  }

  static async updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Promise<ContactEnquirySubmission> {
    return apiFetch<ContactEnquirySubmission>(`/cms/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }
}
