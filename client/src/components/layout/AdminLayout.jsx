import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => (
  <div className="flex min-h-screen bg-charcoal-50">
    <AdminSidebar />
    <main className="flex-1 p-6 md:p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
