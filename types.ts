export enum DealStage {
  LEAD = 'LEAD',
  CONTACTED = 'CONTACTED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED = 'CLOSED',
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string;
  lastContacted: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  expectedCloseDate: string;
  probability: number;
}

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  content: string;
  date: string;
  dealId?: string;
}

export interface NavItem {
  label: string;
  icon: any;
  path: string;
}
