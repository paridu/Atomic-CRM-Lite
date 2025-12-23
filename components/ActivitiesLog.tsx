import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Activity } from '../types';
import { Mail, Phone, Users, FileText, Calendar, Clock } from 'lucide-react';

interface ContextType {
  activities: Activity[];
}

const ActivitiesLog: React.FC = () => {
  const { activities } = useOutletContext<ContextType>();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={18} className="text-blue-500" />;
      case 'call': return <Phone size={18} className="text-green-500" />;
      case 'meeting': return <Users size={18} className="text-purple-500" />;
      default: return <FileText size={18} className="text-slate-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-50 border-blue-100';
      case 'call': return 'bg-green-50 border-green-100';
      case 'meeting': return 'bg-purple-50 border-purple-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Activities Log</h1>
        <p className="text-slate-500">Track all team interactions</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-y-auto">
        <div className="space-y-6">
          {activities.length === 0 ? (
            <div className="text-center text-slate-400 py-10">
                No activities logged yet.
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium capitalize bg-slate-100 text-slate-800">
                            {activity.type}
                        </span>
                        <div className="flex items-center text-xs text-slate-400 gap-1">
                            <Calendar size={12} />
                            {activity.date}
                        </div>
                    </div>
                    <p className="text-slate-800 font-medium">{activity.content}</p>
                    {activity.dealId && (
                        <div className="mt-2 text-xs text-slate-500">
                            Linked to deal: <span className="font-mono text-indigo-600">#{activity.dealId}</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesLog;