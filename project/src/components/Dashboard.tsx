import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  byMonth: { month: string; count: number }[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    byMonth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const todo = tasks?.filter((t) => t.status === 'Todo').length || 0;
      const inProgress = tasks?.filter((t) => t.status === 'In Progress').length || 0;
      const completed = tasks?.filter((t) => t.status === 'Completed').length || 0;

      const monthlyData: { [key: string]: number } = {};
      tasks?.forEach((task) => {
        const month = new Date(task.created_at).toLocaleString('default', {
          month: 'short',
        });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      });

      const byMonth = Object.entries(monthlyData).map(([month, count]) => ({
        month,
        count,
      }));

      setStats({
        total: tasks?.length || 0,
        todo,
        inProgress,
        completed,
        byMonth,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks Created',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Tasks Completed',
        data: [45, 50, 65, 70, 50, 48],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks by Month',
        data: stats.byMonth.slice(0, 6).map((m) => m.count),
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(249, 115, 22)',
          'rgb(34, 34, 34)',
          'rgb(59, 130, 246)',
          'rgb(249, 168, 38)',
          'rgb(147, 197, 253)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Today</h2>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Tasks</span>
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-green-500 mt-1">+11.01%</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Todo</span>
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.todo}</div>
            <div className="text-xs text-green-500 mt-1">+9.15%</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">In Progress</span>
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.inProgress}</div>
            <div className="text-xs text-green-500 mt-1">+8.09%</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completed</span>
              <TrendingDown className="text-red-500" size={16} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.completed}</div>
            <div className="text-xs text-red-500 mt-1">+0.49%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Trends</h3>
            <div className="h-64">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks by Month</h3>
            <div className="h-64">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
