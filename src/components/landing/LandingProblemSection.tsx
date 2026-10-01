import React from 'react';
import {
  MessageSquare,
  BookOpen,
  PhoneCall,
  Instagram,
  FileSpreadsheet,
  Send,
  Search,
  CreditCard,
  AlertCircle,
} from 'lucide-react';

export const LandingProblemSection: React.FC = () => {
  const chaoticSteps = [
    {
      title: 'WhatsApp',
      detail: '« Bonjour, avez-vous de la place demain 14h ? »',
      icon: MessageSquare,
      time: '08:14',
      tag: 'Message non lu',
    },
    {
      title: 'Agenda papier',
      detail: 'Ratures, double réservation sur la cabine 2',
      icon: BookOpen,
      time: '09:02',
      tag: 'Risque de doublon',
    },
    {
      title: 'Appel téléphonique',
      detail: 'Interruption en plein milieu d’un massage',
      icon: PhoneCall,
      time: '10:15',
      tag: 'Moment perturbé',
    },
    {
      title: 'DM Instagram',
      detail: 'Demande de tarif restée en attente 3 jours',
      icon: Instagram,
      time: '11:40',
      tag: 'Client perdu',
    },
    {
      title: 'Tableur bricolé',
      detail: 'Formule cassée pour le calcul de commission',
      icon: FileSpreadsheet,
      time: '13:00',
      tag: 'Erreur de calcul',
    },
    {
      title: 'Message de confirmation manuel',
      detail: 'Recopier le SMS à la main un par un le soir',
      icon: Send,
      time: '18:45',
      tag: 'Temps gaspillé',
    },
    {
      title: 'Recherche d’un ancien rdv',
      detail: 'Retrouver quelle huile avait causé une rougeur',
      icon: Search,
      time: '19:10',
      tag: 'Historique introuvable',
    },
    {
      title: 'Paiement manuel & monnaie',
      detail: 'Ticket perdu et solde restant imprécis',
      icon: CreditCard,
      time: '19:50',
      tag: 'Trésorerie floue',
    },
  ];

  return (
    <section className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Avant Velora
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Une journée ne devrait pas ressembler à ça.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
            Lorsque les informations de votre institut sont dispersées entre six outils différents, la journée devient une course permanente contre les oublis.
          </p>
        </div>

        {/* Scattered / Fragmented Visual Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle connecting disordered path */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {chaoticSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F6F2EA]/40 border border-[#DED8CD] rounded-xl p-4 shadow-xs relative hover:border-[#16382D]/40 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FCFBF8] border border-[#DED8CD] flex items-center justify-center text-[#24312B] group-hover:text-[#16382D] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[11px] text-[#68736D]">
                        {step.time}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#16382D]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#DED8CD]/50 flex items-center gap-1.5 text-[10px] font-mono text-[#8A7147]">
                    <AlertCircle className="w-3 h-3 text-[#8A7147] shrink-0" />
                    <span>{step.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
