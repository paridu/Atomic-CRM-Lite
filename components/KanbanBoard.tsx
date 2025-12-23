import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Deal, DealStage, Contact } from '../types';
import { STAGE_CONFIG } from '../constants';
import { MoreHorizontal, Plus, AlertCircle } from 'lucide-react';
import AtomicAssistant from './AtomicAssistant';

interface ContextType {
  deals: Deal[];
  contacts: Contact[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

const KanbanBoard: React.FC = () => {
  const { deals, contacts, setDeals } = useOutletContext<ContextType>();
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const getContactName = (id: string) => contacts.find(c => c.id === id)?.name || 'Unknown Contact';
  const getContactCompany = (id: string) => contacts.find(c => c.id === id)?.company || '';

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDealId(dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault();
    if (!draggedDealId) return;

    setDeals(prev => prev.map(deal => 
      deal.id === draggedDealId ? { ...deal, stage } : deal
    ));
    setDraggedDealId(null);
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deals Pipeline</h1>
          <p className="text-slate-500">Drag and drop to move deals</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={18} /> New Deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {Object.values(DealStage).map((stage) => {
           const stageDeals = deals.filter(d => d.stage === stage);
           const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

           return (
            <div 
              key={stage} 
              className="flex-shrink-0 w-80 flex flex-col h-full rounded-xl bg-slate-100/50 border border-slate-200"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {/* Column Header */}
              <div className="p-3 border-b border-slate-200/50 bg-white rounded-t-xl sticky top-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-slate-700 text-sm">
                    {STAGE_CONFIG[stage].label}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${STAGE_CONFIG[stage].color.split(' ')[0]} w-full opacity-50`}></div>
                </div>
                <div className="mt-1 text-xs text-slate-500 font-medium text-right">
                  ${totalValue.toLocaleString()}
                </div>
              </div>

              {/* Deals List */}
              <div className="p-2 space-y-3 overflow-y-auto custom-scrollbar flex-grow">
                {stageDeals.map(deal => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {getContactCompany(deal.contactId)}
                      </span>
                      <button 
                        onClick={() => setSelectedDeal(deal)}
                        className="text-slate-300 hover:text-indigo-600 transition-colors"
                      >
                        <AlertCircle size={14} />
                      </button>
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1 leading-snug">{deal.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">Contact: {getContactName(deal.contactId)}</p>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                      <span className="font-bold text-slate-700 text-sm">
                        ${deal.value.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <span>{deal.probability}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                        Drop here
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

       {selectedDeal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden relative">
             <button 
               onClick={() => setSelectedDeal(null)}
               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
             >
               &times;
             </button>
             <div className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 p-1 rounded">AI</span> 
                    Deal Strategy
                </h3>
                <div className="mb-4 text-sm text-slate-600">
                    Get AI advice on how to close <strong>{selectedDeal.title}</strong>.
                </div>
                <AtomicAssistant 
                    context={{
                        type: 'deal',
                        name: selectedDeal.title,
                        data: selectedDeal
                    }}
                />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
