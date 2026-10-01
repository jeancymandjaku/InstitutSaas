import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Plus,
  Search,
  Clock,
  Edit2,
  Trash2,
  CheckCircle,
  EyeOff,
} from 'lucide-react';
import { ServiceCategory } from '../types';

export const ServicesPage: React.FC = () => {
  const { services, openModal, toggleServiceActive, deleteService } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    'all',
    'Soins visage',
    'Massages',
    'Corps',
    'Ongles',
    'Beauté',
  ];

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
      const matchSearch =
        !search.trim() ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Catalogue des Prestations
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            {services.length} rituels et soins proposés dans votre carte
          </p>
        </div>

        <button
          onClick={() => openModal('service_form')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#CDBB96]" />
          <span>+ Ajouter une prestation</span>
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#16382D] text-[#FCFBF8] shadow-xs'
                  : 'bg-[#F6F2EA] text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              {cat === 'all' ? 'Toutes les catégories' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
          <input
            type="text"
            placeholder="Rechercher un soin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-[#FCFBF8] border rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all ${
              service.isActive
                ? 'border-[#DED8CD] hover:border-[#70856F]'
                : 'border-stone-200 opacity-60 bg-stone-50/50'
            }`}
          >
            <div>
              {/* Header: Category & Price */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-semibold text-[#70856F] tracking-wider">
                  {service.category}
                </span>

                <span className="font-mono text-base font-semibold text-[#16382D]">
                  €{service.price}
                </span>
              </div>

              {/* Title & Duration */}
              <h3 className="text-base font-serif font-medium text-[#16382D]">
                {service.name}
              </h3>

              <div className="flex items-center gap-1.5 text-[11px] text-[#68736D] mt-1 font-mono">
                <Clock className="w-3 h-3 text-[#70856F]" />
                <span>{service.durationMinutes} minutes</span>
                {!service.isActive && (
                  <span className="ml-1 text-stone-500 font-sans italic">
                    (Désactivé)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#68736D] mt-3 leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 mt-4 border-t border-[#DED8CD]/60 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleServiceActive(service.id)}
                className={`text-[11px] font-medium transition-colors ${
                  service.isActive
                    ? 'text-[#70856F] hover:text-[#16382D]'
                    : 'text-stone-500 hover:text-[#16382D]'
                }`}
              >
                {service.isActive ? 'Désactiver' : 'Activer'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    openModal('service_form', { isEditing: true, service })
                  }
                  className="p-1 text-[#68736D] hover:text-[#16382D] hover:bg-[#E8EEE8] rounded"
                  title="Modifier le soin"
                  aria-label="Modifier le soin"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                  title="Supprimer"
                  aria-label="Supprimer le soin"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
