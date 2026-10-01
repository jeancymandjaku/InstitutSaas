import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  ArrowDownRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';
import { PaymentMethod, PaymentStatus } from '../types';

export const PaymentsPage: React.FC = () => {
  const { payments, openModal, updatePaymentStatus } = useApp();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Revenue computations
  const revenueToday = payments
    .filter((p) => p.date === TODAY_DATE && p.status === 'paye')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'en_attente')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = useMemo(() => {
    let list = [...payments];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.clientName.toLowerCase().includes(q) ||
          p.serviceName.toLowerCase().includes(q) ||
          (p.reference && p.reference.toLowerCase().includes(q))
      );
    }

    if (methodFilter !== 'all') {
      list = list.filter((p) => p.method === methodFilter);
    }

    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter);
    }

    // Sort by date & time desc
    list.sort((a, b) => {
      const cmp = b.date.localeCompare(a.date);
      if (cmp !== 0) return cmp;
      return b.time.localeCompare(a.time);
    });

    return list;
  }, [payments, search, methodFilter, statusFilter]);

  const methodLabels: Record<PaymentMethod, string> = {
    carte: 'Carte bancaire',
    especes: 'Espèces',
    mobile_money: 'Mobile Money',
    virement: 'Virement',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Paiements & Encaissements
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            Suivi en direct de la trésorerie et des règlements clients
          </p>
        </div>

        <button
          onClick={() => openModal('payment_form')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#CDBB96]" />
          <span>+ Nouveau paiement</span>
        </button>
      </div>

      {/* Financial Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Revenus aujourd'hui
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €{revenueToday.toLocaleString('fr-FR')}
          </p>
          <span className="text-[11px] text-[#70856F] font-mono mt-1 block">
            Encaissements du jour
          </span>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Cette semaine
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €6,840
          </p>
          <span className="text-[11px] text-[#70856F] font-mono mt-1 block">
            +12.6% vs S-1
          </span>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Ce mois (Septembre)
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €24,580
          </p>
          <span className="text-[11px] text-[#70856F] font-mono mt-1 block">
            Objectif mensuel atteint à 94%
          </span>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Paiements en attente
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €{pendingAmount.toLocaleString('fr-FR')}
          </p>
          <span className="text-[11px] text-[#8A7147] font-mono mt-1 block">
            En attente de régularisation
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
          <input
            type="text"
            placeholder="Rechercher client, référence, soin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Tous les modes de paiement</option>
            <option value="carte">Carte bancaire</option>
            <option value="especes">Espèces</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="virement">Virement bancaire</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Tous les statuts</option>
            <option value="paye">Payé</option>
            <option value="partiel">Partiel</option>
            <option value="en_attente">En attente</option>
            <option value="rembourse">Remboursé</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DED8CD] bg-[#F6F2EA]/60 text-[11px] font-semibold text-[#68736D]">
                <th className="py-3 px-4">Date & Heure</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Prestation / Motif</th>
                <th className="py-3 px-4">Méthode</th>
                <th className="py-3 px-4 text-right">Montant</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CD]/60">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-[#F6F2EA]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#68736D]">
                    <div>{p.date}</div>
                    <div className="text-[10px] text-[#68736D]">{p.time}</div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-[#16382D]">
                    {p.clientName}
                  </td>

                  <td className="py-3.5 px-4 text-[#24312B]">
                    <p className="truncate max-w-[200px]">{p.serviceName}</p>
                    {p.reference && (
                      <span className="text-[10px] font-mono text-[#68736D]">
                        {p.reference}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-[#68736D]">
                    {methodLabels[p.method]}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#16382D]">
                    €{p.amount.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusIndicator status={p.status} type="payment" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {p.status === 'en_attente' && (
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'paye')}
                        className="text-xs text-[#16382D] hover:underline font-semibold"
                      >
                        Encaisser
                      </button>
                    )}
                    {p.status === 'paye' && (
                      <span className="text-[11px] text-[#70856F] font-mono">
                        Validé
                      </span>
                    )}
                    {p.status === 'partiel' && (
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'paye')}
                        className="text-xs text-[#8A7147] hover:underline font-medium"
                      >
                        Soldé
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
