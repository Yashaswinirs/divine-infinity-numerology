import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { Users, BookOpen, CreditCard, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      AdminService.getStudents(),
      AdminService.getCourses(),
      AdminService.getOrders(),
      AdminService.getEnquiries(),
    ])
      .then(([students, courses, orders, enquiries]) => {
        setStudentCount(students.length);
        setCourseCount(courses.length);
        setEnquiriesCount(enquiries.length);

        const totalRev = orders
          .filter((o) => o.status === 'completed')
          .reduce((sum, o) => sum + o.amount, 0);
        setRevenue(totalRev);
        setRecentOrders(orders.slice(0, 5));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Platform Analytics & Overview" />

        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#120b22] border border-[#ffd8a2]/15 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-semibold uppercase tracking-wider">Total Students</span>
                <Users className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{studentCount}</p>
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">Active platform learners</p>
            </div>

            <div className="bg-[#120b22] border border-[#ffd8a2]/15 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-semibold uppercase tracking-wider">Courses</span>
                <BookOpen className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{courseCount}</p>
              <p className="text-[11px] text-[#ffd8a2]/60 mt-2">Published & draft modules</p>
            </div>

            <div className="bg-[#120b22] border border-[#ffd8a2]/15 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-semibold uppercase tracking-wider">Gross Revenue</span>
                <CreditCard className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">₹{revenue.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-emerald-400 mt-2">Verified online payments</p>
            </div>

            <div className="bg-[#120b22] border border-[#ffd8a2]/15 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#ffd8a2]/70 font-semibold uppercase tracking-wider">Consultation Leads</span>
                <MessageSquare className="size-5 text-[#ffd8a2]" />
              </div>
              <p className="text-3xl font-bold text-white mt-3">{enquiriesCount}</p>
              <p className="text-[11px] text-[#ffd8a2]/60 mt-2">Inbound CMS forms</p>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-[#120b22] border border-[#ffd8a2]/15 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Transactions</h3>
                <p className="text-xs text-[#ffd8a2]/60">Latest enrollment orders and payment statuses</p>
              </div>
              <Link to="/payments" className="text-xs text-[#ffd8a2] hover:underline flex items-center gap-1">
                View all orders <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                <p className="text-xs text-[#ffd8a2]/50 py-4 text-center">No orders yet.</p>
              ) : (
                recentOrders.map((ord) => (
                  <div key={ord.id} className="py-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{ord.studentName || 'Student'}</p>
                      <p className="text-[#ffd8a2]/60 text-[11px]">{ord.courseTitle || ord.courseId}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-white">₹{ord.amount.toLocaleString('en-IN')}</p>
                      <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
