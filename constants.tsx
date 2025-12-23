import { Contact, Deal, DealStage, Activity } from './types';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    email: 'sarah.c@techflow.io',
    phone: '+1 (555) 123-4567',
    company: 'TechFlow Inc.',
    role: 'CTO',
    avatar: 'https://picsum.photos/200/200?random=1',
    lastContacted: '2023-10-25',
  },
  {
    id: 'c2',
    name: 'Michael Ross',
    email: 'm.ross@apexglobal.com',
    phone: '+1 (555) 987-6543',
    company: 'Apex Global',
    role: 'VP of Engineering',
    avatar: 'https://picsum.photos/200/200?random=2',
    lastContacted: '2023-10-24',
  },
  {
    id: 'c3',
    name: 'Jessica Pearson',
    email: 'jessica@pearsonhardman.com',
    phone: '+1 (555) 456-7890',
    company: 'Pearson Hardman',
    role: 'Managing Partner',
    avatar: 'https://picsum.photos/200/200?random=3',
    lastContacted: '2023-10-20',
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: 'd1',
    title: 'Enterprise License Expansion',
    value: 45000,
    stage: DealStage.PROPOSAL,
    contactId: 'c1',
    expectedCloseDate: '2023-11-15',
    probability: 60,
  },
  {
    id: 'd2',
    title: 'Q4 Infrastructure Audit',
    value: 12000,
    stage: DealStage.CONTACTED,
    contactId: 'c2',
    expectedCloseDate: '2023-11-30',
    probability: 30,
  },
  {
    id: 'd3',
    title: 'Global API Integration',
    value: 150000,
    stage: DealStage.NEGOTIATION,
    contactId: 'c3',
    expectedCloseDate: '2023-12-10',
    probability: 80,
  },
  {
    id: 'd4',
    title: 'Consulting Retainer',
    value: 5000,
    stage: DealStage.LEAD,
    contactId: 'c1',
    expectedCloseDate: '2024-01-15',
    probability: 10,
  },
];

export const STAGE_CONFIG: Record<DealStage, { label: string; color: string }> = {
  [DealStage.LEAD]: { label: 'New Leads', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  [DealStage.CONTACTED]: { label: 'Contacted', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  [DealStage.PROPOSAL]: { label: 'Proposal Sent', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  [DealStage.NEGOTIATION]: { label: 'Negotiation', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  [DealStage.CLOSED]: { label: 'Closed Won', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    type: 'email',
    content: 'Sent proposal to Sarah Chen regarding Enterprise License.',
    date: '2023-10-26 10:30 AM',
    dealId: 'd1',
  },
  {
    id: 'a2',
    type: 'call',
    content: 'Discovery call with Michael Ross. discussed timeline and budget.',
    date: '2023-10-24 02:00 PM',
    dealId: 'd2',
  },
  {
    id: 'a3',
    type: 'meeting',
    content: 'Lunch meeting with Jessica Pearson to finalize negotiation terms.',
    date: '2023-10-21 12:15 PM',
    dealId: 'd3',
  },
  {
    id: 'a4',
    type: 'note',
    content: 'Internal review of TechFlow requirements.',
    date: '2023-10-20 09:00 AM',
    dealId: 'd1',
  }
];