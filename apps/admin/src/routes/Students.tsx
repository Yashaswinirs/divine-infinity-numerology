import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminService } from '../services/admin.service';
import { DataTable } from '../components/DataTable';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import type { User } from '@divine/types';

export const Students: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {
    AdminService.getStudents()
      .then(setStudents)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleToggleBlock = async (user: User) => {
    try {
      await AdminService.toggleBlockStudent(user.id, !user.isBlocked);
      fetchStudents();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0717]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Student Directory & Access" />

        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Registered Students</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">
              View student accounts, enrollment activity, and grant or revoke access.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading students...</div>
          ) : (
            <DataTable
              data={students}
              searchPlaceholder="Search by student name or email..."
              searchFilter={(s, q) =>
                s.fullName.toLowerCase().includes(q.toLowerCase()) ||
                s.email.toLowerCase().includes(q.toLowerCase())
              }
              columns={[
                {
                  key: 'fullName',
                  header: 'Student Name',
                  render: (s) => (
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#ffd8a2]/15 text-[#ffd8a2] font-bold flex items-center justify-center text-xs">
                        {s.fullName.charAt(0)}
                      </div>
                      <span className="font-semibold text-white">{s.fullName}</span>
                    </div>
                  ),
                },
                {
                  key: 'email',
                  header: 'Email Address',
                },
                {
                  key: 'phoneNumber',
                  header: 'Phone',
                  render: (s) => s.phoneNumber || '—',
                },
                {
                  key: 'isBlocked',
                  header: 'Account Status',
                  render: (s) => (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        s.isBlocked
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {s.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  ),
                },
                {
                  key: 'createdAt',
                  header: 'Joined On',
                  render: (s) => new Date(s.createdAt).toLocaleDateString(),
                },
                {
                  key: 'actions',
                  header: 'Actions',
                  render: (s) => (
                    <button
                      onClick={() => handleToggleBlock(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        s.isBlocked
                          ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                          : 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25'
                      }`}
                    >
                      {s.isBlocked ? (
                        <>
                          <ShieldCheck className="size-3.5" /> Unblock
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="size-3.5" /> Block
                        </>
                      )}
                    </button>
                  ),
                },
              ]}
            />
          )}
        </main>
      </div>
    </div>
  );
};
