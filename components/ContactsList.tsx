import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Contact } from '../types';
import { Search, Mail, Phone, Trash2, Filter, Plus, X, AlertTriangle } from 'lucide-react';
import AtomicAssistant from './AtomicAssistant';

interface ContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsList: React.FC = () => {
  const { contacts, setContacts } = useOutletContext<ContextType>();
  const [filter, setFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // States for Modals
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  
  // Add Contact Form State
  const [newContactForm, setNewContactForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: ''
  });

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.company.toLowerCase().includes(filter.toLowerCase())
  );

  const initiateDelete = (contact: Contact) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
      setDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
        id: Date.now().toString(),
        name: newContactForm.name,
        email: newContactForm.email,
        company: newContactForm.company,
        role: newContactForm.role,
        phone: newContactForm.phone || '+1 (555) 000-0000',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newContactForm.name)}&background=random`,
        lastContacted: 'Never'
    };
    setContacts(prev => [newContact, ...prev]);
    setAddModalOpen(false);
    setNewContactForm({ name: '', email: '', company: '', role: '', phone: '' });
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-slate-500">Manage your relationships</p>
        </div>
        <button 
            onClick={() => setAddModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus size={18} /> Add Contact
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-grow overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200">
            <Filter size={18} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-grow">
          <table className="w-full text-left">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Contacted</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-9 w-9 rounded-full object-cover border border-slate-200" src={contact.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                        <div className="text-sm text-slate-500">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-700">
                      {contact.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{contact.lastContacted}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedContact(contact)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1.5 rounded"
                        title="AI Assist"
                      >
                        <Mail size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 p-1.5" title="Call">
                        <Phone size={16} />
                      </button>
                      <button 
                        onClick={() => initiateDelete(contact)}
                        className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden relative animate-fade-in">
             <button 
               onClick={() => setSelectedContact(null)}
               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
             >
               <X size={20} />
             </button>
             <div className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 p-1 rounded">AI</span> 
                    Draft Email to {selectedContact.name}
                </h3>
                <AtomicAssistant 
                    context={{
                        type: 'contact',
                        name: selectedContact.name,
                        company: selectedContact.company,
                        data: selectedContact
                    }}
                />
             </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && contactToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fade-in">
                <div className="flex items-center gap-3 text-red-600 mb-4">
                    <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Delete Contact?</h3>
                </div>
                <p className="text-slate-600 mb-6">
                    Are you sure you want to delete <strong>{contactToDelete.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={() => setDeleteModalOpen(false)}
                        className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden relative animate-fade-in">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Add New Contact</h3>
                    <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={newContactForm.name}
                            onChange={e => setNewContactForm({...newContactForm, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input 
                            required
                            type="email" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={newContactForm.email}
                            onChange={e => setNewContactForm({...newContactForm, email: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                            <input 
                                required
                                type="text" 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={newContactForm.company}
                                onChange={e => setNewContactForm({...newContactForm, company: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                            <input 
                                required
                                type="text" 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={newContactForm.role}
                                onChange={e => setNewContactForm({...newContactForm, role: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button 
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Create Contact
                        </button>
                    </div>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default ContactsList;