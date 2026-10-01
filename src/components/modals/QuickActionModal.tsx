import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { CalendarPlus, UserPlus, CreditCard, Sparkles } from 'lucide-react';

export const QuickActionModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useApp();

  if (activeModal !== 'quick_action') return null;

  const actions = [
    {
      title: 'Nouveau rendez-vous',
      desc: 'Planifier un soin dans l’agenda d’une praticienne',
      icon: CalendarPlus,
      color: 'bg-[#16382D] text-[#FCFBF8]',
      action: () => {
        closeModal();
        openModal('appointment_form');
      },
    },
    {
      title: 'Nouveau client',
      desc: 'Créer une fiche client avec ses préférences et allergies',
      icon: UserPlus,
      color: 'bg-[#70856F] text-[#FCFBF8]',
      action: () => {
        closeModal();
        openModal('client_form');
      },
    },
    {
      title: 'Nouveau paiement',
      desc: 'Encaisser une prestation ou un achat en boutique',
      icon: CreditCard,
      color: 'bg-[#CDBB96] text-[#16382D]',
      action: () => {
        closeModal();
        openModal('payment_form');
      },
    },
    {
      title: 'Nouveau service',
      desc: 'Ajouter une nouvelle prestation au catalogue de soins',
      icon: Sparkles,
      color: 'bg-[#24312B] text-[#FCFBF8]',
      action: () => {
        closeModal();
        openModal('service_form');
      },
    },
  ];

  return (
    <Modal
      isOpen={activeModal === 'quick_action'}
      onClose={closeModal}
      title="Action rapide"
      subtitle="Que souhaitez-vous effectuer ?"
      maxWidth="sm"
    >
      <div className="grid grid-cols-1 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.title}
              onClick={act.action}
              className="flex items-center gap-3.5 p-3 rounded-xl border border-[#DED8CD] hover:border-[#70856F] bg-[#FCFBF8] hover:bg-[#F6F2EA]/60 transition-all text-left group"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${act.color} group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#16382D] group-hover:text-[#16382D]">
                  {act.title}
                </p>
                <p className="text-[11px] text-[#68736D] line-clamp-1 mt-0.5">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
