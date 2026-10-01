import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  CreditCard,
  ShoppingBag,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { currentReport, reportPeriod, setReportPeriod, notify } = useApp();

  const [activeMetric, setActiveMetric] = useState<'revenue' | 'appointments'>('revenue');

  const { kpis, revenueSeries, topServices, practitioners } = currentReport;

  // Real client-side CSV Export
  const handleExportCSV = () => {
    const headers = ['Periode', 'Chiffre_Affaires_EUR', 'Nombre_RDV', 'Nouveaux_Clients', 'Panier_Moyen_EUR'];
    const row1 = [
      reportPeriod,
      kpis.totalRevenue,
      kpis.totalAppointments,
      kpis.newClients,
      kpis.averageCart,
    ];

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(';') + '\r\n';
    csvContent += row1.join(';') + '\r\n\r\n';

    csvContent += '--- DETAIL DES SOINS LES PLUS VENDUS ---\r\n';
    csvContent += 'Soin;Categorie;Ventes;Revenus_EUR\r\n';
    topServices.forEach((s) => {
      csvContent += `${s.name};${s.category};${s.count};${s.revenue}\r\n`;
    });

    csvContent += '\r\n--- PERFORMANCE DES PRATICIENNES ---\r\n';
    csvContent += 'Praticienne;Nombre_RDV;CA_Genere_EUR;Taux_Occupation_Pct\r\n';
    practitioners.forEach((p) => {
      csvContent += `${p.practitionerName};${p.appointmentsCount};${p.revenueGenerated};${p.occupancyRate}%\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rapport_velora_${reportPeriod}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify('Rapport exporté en format CSV');
  };

  const maxRevenue = Math.max(...revenueSeries.map((r) => r.revenue), 1);
  const maxServiceRev = Math.max(...topServices.map((s) => s.revenue), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Rapports & Performance
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            Analyses chiffrées de l’activité de l’institut et tendances
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector Tabs */}
          <div className="flex items-center bg-[#E8EEE8] p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setReportPeriod('today')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                reportPeriod === 'today'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => setReportPeriod('7days')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                reportPeriod === '7days'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setReportPeriod('30days')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                reportPeriod === '30days'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              30 jours
            </button>
            <button
              onClick={() => setReportPeriod('90days')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                reportPeriod === '90days'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              90 jours
            </button>
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DED8CD] bg-[#FCFBF8] hover:bg-[#F6F2EA] text-[#16382D] rounded-lg text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#70856F]" />
            <span>Exporter le rapport</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Chiffre d’affaires
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €{kpis.totalRevenue.toLocaleString('fr-FR')}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#70856F] mt-1 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>{kpis.growthRevenue}</span>
          </div>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Nombre de rendez-vous
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            {kpis.totalAppointments}
          </p>
          <span className="text-[11px] text-[#70856F] font-mono mt-1 block">
            {kpis.growthAppointments}
          </span>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Nouveaux clients
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            {kpis.newClients}
          </p>
          <span className="text-[11px] text-[#68736D] font-mono mt-1 block">
            Taux de rétention: 88%
          </span>
        </div>

        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs font-medium text-[#68736D] block">
            Panier moyen
          </span>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-1.5 tabular-nums">
            €{kpis.averageCart.toFixed(1)}
          </p>
          <span className="text-[11px] text-[#70856F] font-mono mt-1 block">
            +€6.2 vs période précédente
          </span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Revenue Evolution (2 cols) */}
        <div className="lg:col-span-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#16382D]">
                Évolution de l'activité
              </h2>
              <p className="text-xs text-[#68736D]">
                Période: {reportPeriod === 'today' ? "Aujourd'hui par heure" : reportPeriod}
              </p>
            </div>

            <div className="flex items-center bg-[#F6F2EA] p-0.5 rounded-md text-xs">
              <button
                onClick={() => setActiveMetric('revenue')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMetric === 'revenue'
                    ? 'bg-white text-[#16382D] font-medium shadow-xs'
                    : 'text-[#68736D]'
                }`}
              >
                Revenus (€)
              </button>
              <button
                onClick={() => setActiveMetric('appointments')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMetric === 'appointments'
                    ? 'bg-white text-[#16382D] font-medium shadow-xs'
                    : 'text-[#68736D]'
                }`}
              >
                Rendez-vous
              </button>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-64 flex items-end gap-3 pt-6 pb-2 border-b border-[#DED8CD]/60">
            {revenueSeries.map((item, index) => {
              const val = activeMetric === 'revenue' ? item.revenue : item.appointments;
              const maxVal =
                activeMetric === 'revenue'
                  ? maxRevenue
                  : Math.max(...revenueSeries.map((r) => r.appointments), 1);
              const heightPct = Math.max(Math.round((val / maxVal) * 100), 12);

              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-[#16382D] mb-1 font-semibold">
                    {activeMetric === 'revenue' ? `€${item.revenue}` : `${item.appointments} rdv`}
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[48px] bg-[#16382D] group-hover:bg-[#70856F] rounded-t transition-all duration-300 relative cursor-pointer"
                  />

                  {/* Label */}
                  <span className="text-[11px] font-mono text-[#68736D] mt-2 block truncate">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Top Selling Services (1 col) */}
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-[#16382D]">
              Services les plus demandés
            </h2>
            <p className="text-xs text-[#68736D]">
              Classement par volume de chiffre d'affaires
            </p>
          </div>

          <div className="space-y-3.5">
            {topServices.map((service, idx) => {
              const widthPct = Math.round((service.revenue / maxServiceRev) * 100);

              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#24312B]">
                    <span className="font-medium truncate max-w-[160px]">
                      {service.name}
                    </span>
                    <span className="font-mono text-[#16382D] font-semibold">
                      €{service.revenue}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-[#E8EEE8] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="h-full bg-[#70856F] rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#68736D]">
                    <span>{service.category}</span>
                    <span className="font-mono">{service.count} séances</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Practitioner Performance Table */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 shadow-xs space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-[#16382D]">
            Performance & Taux d’occupation des praticiennes
          </h2>
          <p className="text-xs text-[#68736D]">
            Répartition des soins et rentabilité par membre de l’équipe
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DED8CD] text-[11px] font-semibold text-[#68736D]">
                <th className="py-2.5 px-3">Praticienne</th>
                <th className="py-2.5 px-3 text-center">Séances réalisées</th>
                <th className="py-2.5 px-3 text-right">CA généré</th>
                <th className="py-2.5 px-3 text-center">Taux d'occupation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CD]/60">
              {practitioners.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#F6F2EA]/40 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#16382D]">
                    {p.practitionerName}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    {p.appointmentsCount}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-[#16382D]">
                    €{p.revenueGenerated.toLocaleString('fr-FR')}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-mono text-[#70856F] font-semibold">
                      {p.occupancyRate}%
                    </span>
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
