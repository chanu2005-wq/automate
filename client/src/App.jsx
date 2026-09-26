import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Toaster position="top-right" toastOptions={{ 
          style: { background: '#fff', color: '#111827', border: '1px solid #e5e7eb' },
          success: { iconTheme: { primary: '#d97706', secondary: '#fff' } }
        }} />
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App;
