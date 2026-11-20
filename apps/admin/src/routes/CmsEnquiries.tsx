import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { DataTable } from '../components/DataTable';
import type { ContactEnquirySubmission } from '@divine/types';

export const CmsEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = () => {
    AdminService.getEnquiries()
      .then(setEnquiries)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      await AdminService.updateEnquiryStatus(id, status);
      fetchEnquiries();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="CMS Consultation Enquiries" />

        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Inbound Consultation Leads</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">
              Contact requests submitted via the marketing website contact & consultation forms.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading enquiries...</div>
          ) : (
            <DataTable
              data={enquiries}
              searchPlaceholder="Search enquiries by name, email, or service..."
              searchFilter={(e, q) =>
                e.fullName.toLowerCase().includes(q.toLowerCase()) ||
                e.email.toLowerCase().includes(q.toLowerCase()) ||
                (e.serviceNeeded || '').toLowerCase().includes(q.toLowerCase())
              }
              columns={[
                {
                  key: 'fullName',
                  header: 'Client Name',
                  render: (e) => (
                    <div>
                      <p className="font-semibold text-white">{e.fullName}</p>
                      <p className="text-[#ffd8a2]/60 text-[10px]">{e.phoneNumber || '—'}</p>
                    </div>
                  ),
                },
                {
                  key: 'email',
                  header: 'Email',
                },
                {
                  key: 'serviceNeeded',
                  header: 'Service Requested',
                  render: (e) => e.serviceNeeded || 'General Consultation',
                },
                {
                  key: 'message',
                  header: 'Message',
                  render: (e) => <p className="max-w-xs truncate">{e.message}</p>,
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (e) => (
                    <select
                      value={e.status}
                      onChange={(ev) =>
                        handleUpdateStatus(e.id, ev.target.value as 'new' | 'contacted' | 'resolved')
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#140e2b] border border-white/10 text-[11px] text-white focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  ),
                },
                {
                  key: 'createdAt',
                  header: 'Date',
                  render: (e) => new Date(e.createdAt).toLocaleDateString(),
                },
              ]}
            />
          )}
        </main>
      </div>
    </div>
  );
};
