import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { Login } from './routes/Login';
import { Dashboard } from './routes/Dashboard';
import { MyCourses } from './routes/MyCourses';
import { Learn } from './routes/Learn';
import { Certificates } from './routes/Certificates';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Student Portal Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/learn/:courseId" element={<Learn />} />
          <Route path="/certificates" element={<Certificates />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
