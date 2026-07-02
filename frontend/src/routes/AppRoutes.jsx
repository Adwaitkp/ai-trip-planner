import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import UploadBooking from '../pages/UploadBooking';
import MyItineraries from '../pages/MyItineraries';
import ItineraryDetails from '../pages/ItineraryDetails';
import PublicShare from '../pages/PublicShare';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/share/:shareId" element={<PublicShare />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadBooking />} />
          <Route path="/itineraries" element={<MyItineraries />} />
          <Route path="/itineraries/:id" element={<ItineraryDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}