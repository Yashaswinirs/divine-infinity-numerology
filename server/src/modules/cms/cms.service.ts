import { CmsModel } from './cms.model';
import type { ContactEnquirySubmission } from '@divine/types';

export class CmsService {
  static listEnquiries(): ContactEnquirySubmission[] {
    return CmsModel.getAllEnquiries();
  }

  static submitEnquiry(input: Omit<ContactEnquirySubmission, 'id' | 'status' | 'createdAt'>): ContactEnquirySubmission {
    const enquiry: ContactEnquirySubmission = {
      id: `enq-${Date.now()}`,
      fullName: input.fullName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      serviceNeeded: input.serviceNeeded,
      message: input.message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    return CmsModel.createEnquiry(enquiry);
  }

  static updateStatus(id: string, status: 'new' | 'contacted' | 'resolved') {
    const updated = CmsModel.updateEnquiryStatus(id, status);
    if (!updated) throw new Error('Enquiry not found');
    return updated;
  }
}
