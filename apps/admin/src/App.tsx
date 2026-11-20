import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoute } from './guards/AdminRoute';
import { Login } from './routes/Login';
import { Dashboard } from './routes/Dashboard';
import { Students } from './routes/Students';
import { Courses } from './routes/Courses';
import { Payments } from './routes/Payments';
import { Reports } from './routes/Reports';
import { CmsEnquiries } from './routes/CmsEnquiries';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/cms-enquiries" element={<CmsEnquiries />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
