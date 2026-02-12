import { LayoutDashboard, ListTodo, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentPage: 'dashboard' | 'tasks';
  onPageChange: (page: 'dashboard' | 'tasks') => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks' as const, icon: ListTodo, label: 'Tasks' },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg">
      <div className="p-6">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-center">
          User
        </div>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
