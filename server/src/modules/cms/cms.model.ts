import type { ContactEnquirySubmission } from '@divine/types';
import { db } from '../../config/db.config';

export class CmsModel {
  static getAllEnquiries(): ContactEnquirySubmission[] {
    return Array.from(db.enquiries.values());
  }

  static createEnquiry(enquiry: ContactEnquirySubmission): ContactEnquirySubmission {
    db.enquiries.set(enquiry.id, enquiry);
    return enquiry;
  }

  static updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): ContactEnquirySubmission | undefined {
    const enq = db.enquiries.get(id);
    if (!enq) return undefined;
    enq.status = status;
    return enq;
  }
}
