import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { TrendingUp, DollarSign, Users, Briefcase } from 'lucide-react';
import { Deal, Contact } from '../types';

interface ContextType {
  deals: Deal[];
  contacts: Contact[];
}

const Dashboard: React.FC = () => {
  const { deals, contacts } = useOutletContext<ContextType>();

  const stats = useMemo(() => {
    const totalValue = deals.reduce((acc, deal) => acc + deal.value, 0);
    const wonDeals = deals.filter(d => d.stage === 'CLOSED').length;
    return [
      { label: 'Total Pipeline', value: `$${totalValue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
      { label: 'Active Deals', value: deals.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
      { label: 'Total Contacts', value: contacts.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
      { label: 'Won Deals', value: wonDeals, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
    ];
  }, [deals, contacts]);

  const chartData = useMemo(() => {
    return deals.map(d => ({
        name: d.title.substring(0, 10) + '...',
        value: d.value,
        stage: d.stage
    }));
  }, [deals]);

  const stageData = useMemo(() => {
      const counts: Record<string, number> = {};
      deals.forEach(d => {
          counts[d.stage] = (counts[d.stage] || 0) + 1;
      });
      return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [deals]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Overview of your sales performance</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-200">
            Last updated: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pipeline Value</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Deals by Stage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
