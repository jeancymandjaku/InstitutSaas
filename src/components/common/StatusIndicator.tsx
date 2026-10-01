import React from 'react';
import { AppointmentStatus, PaymentStatus } from '../../types';

interface StatusIndicatorProps {
  status: AppointmentStatus | PaymentStatus | 'actif' | 'nouveau' | 'inactif' | 'vip';
  type?: 'appointment' | 'payment' | 'client';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, type = 'appointment' }) => {
  let label = status as string;
  let dotColor = 'bg-[#70856F]';
  let textColor = 'text-[#24312B]';

  if (type === 'appointment') {
    switch (status) {
      case 'confirme':
        label = 'Confirmé';
        dotColor = 'bg-[#16382D]';
        textColor = 'text-[#16382D]';
        break;
      case 'en_attente':
        label = 'En attente';
        dotColor = 'bg-[#CDBB96]';
        textColor = 'text-[#8A7147]';
        break;
      case 'termine':
        label = 'Terminé';
        dotColor = 'bg-[#70856F]';
        textColor = 'text-[#506350]';
        break;
      case 'annule':
        label = 'Annulé';
        dotColor = 'bg-stone-400';
        textColor = 'text-[#68736D]';
        break;
    }
  } else if (type === 'payment') {
    switch (status) {
      case 'paye':
        label = 'Payé';
        dotColor = 'bg-[#16382D]';
        textColor = 'text-[#16382D]';
        break;
      case 'partiel':
        label = 'Partiel';
        dotColor = 'bg-[#CDBB96]';
        textColor = 'text-[#8A7147]';
        break;
      case 'en_attente':
        label = 'En attente';
        dotColor = 'bg-amber-600';
        textColor = 'text-amber-800';
        break;
      case 'rembourse':
        label = 'Remboursé';
        dotColor = 'bg-stone-400';
        textColor = 'text-[#68736D]';
        break;
    }
  } else if (type === 'client') {
    switch (status) {
      case 'vip':
        label = 'Membre VIP';
        dotColor = 'bg-[#CDBB96]';
        textColor = 'text-[#8A7147] font-medium';
        break;
      case 'actif':
        label = 'Client actif';
        dotColor = 'bg-[#70856F]';
        textColor = 'text-[#24312B]';
        break;
      case 'nouveau':
        label = 'Nouveau';
        dotColor = 'bg-[#16382D]';
        textColor = 'text-[#16382D] font-medium';
        break;
      case 'inactif':
        label = 'Inactif';
        dotColor = 'bg-stone-300';
        textColor = 'text-[#68736D]';
        break;
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
