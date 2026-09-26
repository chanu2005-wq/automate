import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Car, Bell, Menu, X, ChevronDown, User, LogOut, LayoutDashboard, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
    setUserMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/vehicles', label: 'Vehicles' },
    ...(user ? [{ to: '/my-bookings', label: 'My Bookings' }] : []),
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
      scrolled ? 'shadow-md border-b border-charcoal-200' : 'border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-accent-600 rounded-xl flex items-center justify-center shadow-amber group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-charcoal-900">Auto</span>
              <span className="text-accent-600">Mate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent-600 bg-accent-50'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-100'
                  }`
                }
              >{label}</NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Bell */}
                <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-charcoal-100 transition-colors">
                  <Bell className="w-5 h-5 text-charcoal-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-charcoal-100 transition-colors"
                  >
                    <div className="w-7 h-7 bg-charcoal-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-charcoal-700">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-charcoal-400" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-charcoal-200 rounded-xl shadow-card-hover py-1 z-50">
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}
                      <hr className="my-1 border-charcoal-100" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors">Login</Link>
                <Link to="/auth/register" className="btn-accent text-sm py-2 px-5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-charcoal-100">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-charcoal-200 px-4 py-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/notifications" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">
                Notifications {unreadCount > 0 && <span className="bg-accent-600 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
              </Link>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">Profile</Link>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">Admin Dashboard</Link>}
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">Login</Link>
              <Link to="/auth/register" onClick={() => setMobileOpen(false)} className="block text-center btn-accent text-sm py-3">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
