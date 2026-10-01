import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowUpDown,
  Phone,
  Mail,
} from 'lucide-react';
import { Client } from '../types';

export const ClientsPage: React.FC = () => {
  const { clients, openModal, navigateTo } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'visits' | 'lastVisit'>('spent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and sort clients
  const processedClients = useMemo(() => {
    let result = [...clients];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(q) ||
          c.lastName.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`);
      } else if (sortBy === 'spent') {
        comparison = a.totalSpent - b.totalSpent;
      } else if (sortBy === 'visits') {
        comparison = a.totalVisits - b.totalVisits;
      } else if (sortBy === 'lastVisit') {
        comparison = a.lastVisitDate.localeCompare(b.lastVisitDate);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [clients, search, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedClients.length / itemsPerPage) || 1;
  const paginatedClients = processedClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: 'name' | 'spent' | 'visits' | 'lastVisit') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Fichier Clientèle
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            {clients.length} clients fidélisés dans l’institut Velora
          </p>
        </div>

        <button
          onClick={() => openModal('client_form')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#CDBB96]" />
          <span>+ Ajouter un client</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#24312B] placeholder:text-[#68736D]/60 focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Tous les statuts</option>
            <option value="vip">Membres VIP</option>
            <option value="actif">Clients actifs</option>
            <option value="nouveau">Nouveaux</option>
            <option value="inactif">Inactifs</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => toggleSort(e.target.value as any)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="spent">Trier par dépenses</option>
            <option value="visits">Trier par visites</option>
            <option value="lastVisit">Trier par dernière visite</option>
            <option value="name">Trier par nom</option>
          </select>
        </div>
      </div>

      {/* Clients Table (Desktop) / Cards (Mobile) */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs overflow-hidden">
        {paginatedClients.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-8 h-8 text-[#70856F] mx-auto mb-2 opacity-60" />
            <p className="text-xs text-[#68736D]">Aucun client trouvé avec ces filtres.</p>
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-2 text-xs text-[#16382D] underline font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DED8CD] bg-[#F6F2EA]/60 text-[11px] font-semibold text-[#68736D]">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Coordonnées</th>
                  <th className="py-3 px-4">Dernière visite</th>
                  <th className="py-3 px-4 text-center">Visites</th>
                  <th className="py-3 px-4 text-right">Dépenses</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED8CD]/60">
                {paginatedClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => navigateTo('/app/clients', client.id)}
                    className="hover:bg-[#F6F2EA]/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-medium text-[#16382D]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#E8EEE8] border border-[#DED8CD] flex items-center justify-center text-[#16382D] font-serif font-bold text-xs shrink-0">
                          {client.firstName[0]}
                          {client.lastName[0]}
                        </div>
                        <div>
                          <p className="group-hover:text-[#70856F] font-semibold transition-colors">
                            {client.firstName} {client.lastName}
                          </p>
                          {client.notes && (
                            <p className="text-[10px] text-[#68736D] truncate max-w-[180px] italic">
                              {client.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#68736D]">
                      <div className="space-y-0.5">
                        <p className="text-[#24312B] font-mono text-[11px]">{client.phone}</p>
                        <p className="text-[10px] text-[#68736D]">{client.email}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#68736D] text-[11px]">
                      {client.lastVisitDate}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-medium text-[#16382D]">
                      {client.totalVisits}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#16382D]">
                      €{client.totalSpent.toLocaleString('fr-FR')}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusIndicator status={client.status} type="client" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo('/app/clients', client.id);
                        }}
                        className="text-xs text-[#70856F] group-hover:text-[#16382D] hover:underline font-medium"
                      >
                        Consulter →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-3.5 border-t border-[#DED8CD]/60 bg-[#F6F2EA]/40 flex items-center justify-between text-xs text-[#68736D]">
          <span>
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
            {Math.min(currentPage * itemsPerPage, processedClients.length)} sur{' '}
            {processedClients.length} clients
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1 rounded border border-[#DED8CD] disabled:opacity-40 hover:bg-[#E8EEE8]"
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-[#16382D] font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1 rounded border border-[#DED8CD] disabled:opacity-40 hover:bg-[#E8EEE8]"
              aria-label="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
