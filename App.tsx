import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import ContactsList from './components/ContactsList';
import ActivitiesLog from './components/ActivitiesLog';
import { MOCK_CONTACTS, MOCK_DEALS, MOCK_ACTIVITIES } from './constants';
import { Deal, Contact, Activity } from './types';
import { Bell, Search, Menu } from 'lucide-react';

const Layout: React.FC<{
  deals: Deal[];
  contacts: Contact[];
  activities: Activity[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}> = ({ deals, contacts, activities, setDeals, setContacts, setActivities }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Wrapper for Mobile Toggle */}
      <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <button 
                className="md:hidden text-slate-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
             >
                <Menu size={24} />
             </button>
             <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Global search..." 
                    className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-md text-sm transition-all w-64 outline-none"
                />
             </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm ring-2 ring-white">
              JD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <Outlet context={{ deals, contacts, activities, setDeals, setContacts, setActivities }} />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Global State (Mock Backend)
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <Layout 
                deals={deals} 
                contacts={contacts} 
                activities={activities}
                setDeals={setDeals} 
                setContacts={setContacts} 
                setActivities={setActivities}
            />
        }>
          <Route index element={<Dashboard />} />
          <Route path="deals" element={<KanbanBoard />} />
          <Route path="contacts" element={<ContactsList />} />
          <Route path="activities" element={<ActivitiesLog />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;