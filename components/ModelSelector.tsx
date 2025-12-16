import React from 'react';
import { TrendingUp, Zap, Shield, Users, Heart, Building2, Truck } from 'lucide-react';

interface ModelSelectorProps {
  onSelectModel: (model: 'donors' | 'operations' | 'hospitals') => void;
}

const models = [
  {
    id: 'donors' as const,
    name: 'Donor Engagement',
    description: 'Donor recruitment, registration, and retention focused on growing and maintaining Australia\'s blood donor base.',
    icon: Heart,
    drivers: ['Donor Acquisition', 'Donor Experience'],
    driverIcons: [TrendingUp, Users],
    color: 'red',
    gradient: 'from-red-500 to-rose-600',
    lightBg: 'bg-red-50',
    examples: ['Donor portal', 'Mobile app', 'Booking system']
  },
  {
    id: 'operations' as const,
    name: 'Collection Operations',
    description: 'Blood collection centres, mobile units, and processing facilities focused on efficiency and compliance.',
    icon: Truck,
    drivers: ['Operational Efficiency', 'Risk Mitigation'],
    driverIcons: [Zap, Shield],
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    lightBg: 'bg-orange-50',
    examples: ['Collection centres', 'Mobile units', 'Processing labs']
  },
  {
    id: 'hospitals' as const,
    name: 'Hospital Services',
    description: 'Hospital partnerships, product distribution, and clinical services focused on reliability and compliance.',
    icon: Building2,
    drivers: ['Risk Mitigation', 'Operational Efficiency'],
    driverIcons: [Shield, Zap],
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    examples: ['Hospital ordering', 'Inventory management', 'Clinical support']
  }
];

export default function ModelSelector({ onSelectModel }: ModelSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lifeblood Value ROI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your focus area to get a customised ROI analysis with relevant value drivers for Australia's blood donation services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => {
            const Icon = model.icon;
            const [DriverIcon1, DriverIcon2] = model.driverIcons;
            
            return (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className="bg-white rounded-2xl shadow-lg p-6 text-left transition-all hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-red-500 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{model.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Value Drivers</div>
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 ${model.lightBg} rounded-full`}>
                      <DriverIcon1 className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-xs font-medium text-gray-700">{model.drivers[0]}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 ${model.lightBg} rounded-full`}>
                      <DriverIcon2 className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-xs font-medium text-gray-700">{model.drivers[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <span className="font-medium">Examples: </span>
                  {model.examples.join(' • ')}
                </div>

                <div className={`mt-4 text-sm font-semibold bg-gradient-to-r ${model.gradient} bg-clip-text text-transparent group-hover:underline`}>
                  Calculate ROI →
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Each model includes customized defaults and focuses on the most relevant value drivers for your use case.
          </p>
        </div>
      </div>
    </div>
  );
}

