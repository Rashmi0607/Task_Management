import { Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <User size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
