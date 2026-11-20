import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { DataTable } from '../components/DataTable';

export const Payments: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminService.getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Payments & Orders" />

        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Payment Transactions</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">
              Gateway settlements, Razorpay order IDs, and student access allocations.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading orders...</div>
          ) : (
            <DataTable
              data={orders}
              searchPlaceholder="Search by student name or order ID..."
              searchFilter={(o, q) =>
                (o.studentName || '').toLowerCase().includes(q.toLowerCase()) ||
                o.id.toLowerCase().includes(q.toLowerCase()) ||
                (o.gatewayPaymentId || '').toLowerCase().includes(q.toLowerCase())
              }
              columns={[
                {
                  key: 'id',
                  header: 'Order ID',
                  render: (o) => <span className="font-mono text-[11px] text-[#ffd8a2]">{o.id}</span>,
                },
                {
                  key: 'studentName',
                  header: 'Student',
                  render: (o) => (
                    <div>
                      <p className="font-semibold text-white">{o.studentName}</p>
                      <p className="text-[#ffd8a2]/60 text-[10px]">{o.studentEmail}</p>
                    </div>
                  ),
                },
                {
                  key: 'courseTitle',
                  header: 'Course',
                  render: (o) => o.courseTitle || o.courseId,
                },
                {
                  key: 'amount',
                  header: 'Amount',
                  render: (o) => `₹${o.amount.toLocaleString('en-IN')}`,
                },
                {
                  key: 'gateway',
                  header: 'Gateway',
                  render: (o) => <span className="uppercase text-[10px] font-mono">{o.gateway}</span>,
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (o) => (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${
                        o.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : o.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {o.status}
                    </span>
                  ),
                },
                {
                  key: 'createdAt',
                  header: 'Date',
                  render: (o) => new Date(o.createdAt).toLocaleDateString(),
                },
              ]}
            />
          )}
        </main>
      </div>
    </div>
  );
};
