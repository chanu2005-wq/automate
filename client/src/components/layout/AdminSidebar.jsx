import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Car, BookOpen, Users, 
  CreditCard, Star, BarChart3, LogOut, Menu, X 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/vehicles', icon: Car, label: 'Vehicles' },
    { to: '/admin/bookings', icon: BookOpen, label: 'Bookings' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 shrink-0 border-b border-charcoal-800">
        <Link to="/" className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center shrink-0">
            <Car className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-white">
              Auto<span className="text-accent-600">Mate</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? 'bg-accent-600 text-white'
                  : 'text-charcoal-400 hover:bg-charcoal-800 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium text-sm">{label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-charcoal-800 shrink-0">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} mb-4`}>
          <div className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center text-white shrink-0 font-bold text-sm">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-charcoal-400 text-xs truncate">Admin</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-charcoal-400 hover:bg-charcoal-800 hover:text-white transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-charcoal-900 flex items-center justify-between px-4 z-40">
        <Link to="/" className="flex items-center gap-2">
          <Car className="w-6 h-6 text-accent-600" />
          <span className="text-xl font-bold text-white">Admin</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block bg-charcoal-900 transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 -right-3 w-6 h-6 bg-charcoal-800 rounded-full border border-charcoal-700 flex items-center justify-center text-charcoal-400 hover:text-white z-50"
        >
          <svg className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-charcoal-900 h-full">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
