import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, MousePointer, Calculator } from 'lucide-react';

export default function App() {
  const [inputs, setInputs] = useState({
    monthlyVisitors: 50000,
    currentConversionRate: 2.5,
    avgRevenuePerConversion: 5000,
    implementationCost: 150000,
    annualMaintenanceCost: 50000,
    conversionRateIncrease: 35,
    engagementIncrease: 25
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  // Calculations
  const annualVisitors = inputs.monthlyVisitors * 12;
  
  // Current state
  const currentConversions = annualVisitors * (inputs.currentConversionRate / 100);
  const currentRevenue = currentConversions * inputs.avgRevenuePerConversion;
  
  // With personalization
  const newConversionRate = inputs.currentConversionRate * (1 + inputs.conversionRateIncrease / 100);
  const newConversions = annualVisitors * (newConversionRate / 100);
  const newRevenue = newConversions * inputs.avgRevenuePerConversion;
  
  // Additional revenue from engagement (cross-sell, retention)
  const engagementRevenue = currentRevenue * (inputs.engagementIncrease / 100);
  const totalNewRevenue = newRevenue + engagementRevenue;
  
  // ROI calculations
  const annualRevenueLift = totalNewRevenue - currentRevenue;
  const threeYearRevenueLift = annualRevenueLift * 3;
  const totalCostThreeYears = inputs.implementationCost + (inputs.annualMaintenanceCost * 3);
  const netBenefit = threeYearRevenueLift - totalCostThreeYears;
  const roi = ((netBenefit / totalCostThreeYears) * 100);
  const paybackMonths = (inputs.implementationCost / (annualRevenueLift / 12));

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const SliderInput = ({ label, value, onChange, min, max, step, prefix = '', suffix = '', helper }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-blue-600">
          {prefix}{formatNumber(value)}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #dbeafe ${((value - min) / (max - min)) * 100}%, #dbeafe 100%)`
        }}
      />
      {helper && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #2563eb;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #2563eb;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Word & Brown Personalization ROI Calculator
          </h1>
          <p className="text-gray-600">Adjust the sliders to see revenue impact in real-time</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              Your Inputs
            </h2>

            <div className="space-y-6">
              <SliderInput
                label="Monthly Website Visitors"
                value={inputs.monthlyVisitors}
                onChange={(val) => handleInputChange('monthlyVisitors', val)}
                min={1000}
                max={200000}
                step={1000}
              />

              <SliderInput
                label="Current Conversion Rate"
                value={inputs.currentConversionRate}
                onChange={(val) => handleInputChange('currentConversionRate', val)}
                min={0.5}
                max={10}
                step={0.1}
                suffix="%"
              />

              <SliderInput
                label="Average Revenue per Conversion"
                value={inputs.avgRevenuePerConversion}
                onChange={(val) => handleInputChange('avgRevenuePerConversion', val)}
                min={500}
                max={20000}
                step={100}
                prefix="$"
              />

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Investment Costs</h3>
                
                <div className="space-y-6">
                  <SliderInput
                    label="Implementation Cost"
                    value={inputs.implementationCost}
                    onChange={(val) => handleInputChange('implementationCost', val)}
                    min={50000}
                    max={500000}
                    step={10000}
                    prefix="$"
                  />

                  <SliderInput
                    label="Annual Maintenance Cost"
                    value={inputs.annualMaintenanceCost}
                    onChange={(val) => handleInputChange('annualMaintenanceCost', val)}
                    min={10000}
                    max={150000}
                    step={5000}
                    prefix="$"
                  />
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Expected Improvements</h3>
                
                <div className="space-y-6">
                  <SliderInput
                    label="Conversion Rate Increase"
                    value={inputs.conversionRateIncrease}
                    onChange={(val) => handleInputChange('conversionRateIncrease', val)}
                    min={10}
                    max={100}
                    step={5}
                    suffix="%"
                    helper="Industry avg: 20-50%"
                  />

                  <SliderInput
                    label="Customer Engagement Revenue Lift"
                    value={inputs.engagementIncrease}
                    onChange={(val) => handleInputChange('engagementIncrease', val)}
                    min={0}
                    max={50}
                    step={5}
                    suffix="%"
                    helper="From cross-sell, retention, etc."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Revenue Impact</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-xs md:text-sm opacity-90 mb-1">Annual Revenue Lift</div>
                  <div className="text-xl md:text-2xl font-bold">{formatCurrency(annualRevenueLift)}</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-xs md:text-sm opacity-90 mb-1">3-Year Revenue Increase</div>
                  <div className="text-xl md:text-2xl font-bold">{formatCurrency(threeYearRevenueLift)}</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-xs md:text-sm opacity-90 mb-1">ROI (3 Years)</div>
                  <div className="text-xl md:text-2xl font-bold">{roi.toFixed(0)}%</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-xs md:text-sm opacity-90 mb-1">Payback Period</div>
                  <div className="text-xl md:text-2xl font-bold">{paybackMonths.toFixed(1)} mo</div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Annual Revenue</span>
                    <span className="text-base md:text-lg font-semibold text-gray-900">{formatCurrency(currentRevenue)}</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {formatNumber(currentConversions)} conversions at {inputs.currentConversionRate}% rate
                  </div>
                </div>

                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">New Annual Revenue</span>
                    <span className="text-base md:text-lg font-semibold text-green-600">{formatCurrency(totalNewRevenue)}</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {formatNumber(newConversions)} conversions at {newConversionRate.toFixed(2)}% rate
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    + {formatCurrency(engagementRevenue)} from engagement lift
                  </div>
                </div>

                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Total 3-Year Investment</span>
                    <span className="text-base md:text-lg font-semibold text-gray-900">{formatCurrency(totalCostThreeYears)}</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {formatCurrency(inputs.implementationCost)} implementation + {formatCurrency(inputs.annualMaintenanceCost * 3)} maintenance
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-bold text-gray-900">Net Benefit (3 Years)</span>
                    <span className="text-xl md:text-2xl font-bold text-blue-600">{formatCurrency(netBenefit)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MousePointer className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Higher Conversion Rates</div>
                    <div className="text-xs md:text-sm text-gray-600">Personalized experiences convert {inputs.conversionRateIncrease}% better</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Improved Customer Engagement</div>
                    <div className="text-xs md:text-sm text-gray-600">Better retention and cross-sell opportunities</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Competitive Advantage</div>
                    <div className="text-xs md:text-sm text-gray-600">Stand out in the insurance broker market</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Quick Payback</div>
                    <div className="text-xs md:text-sm text-gray-600">Investment pays for itself in {paybackMonths.toFixed(1)} months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3">About This Calculator</h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            This TCO calculator demonstrates the financial impact of implementing website personalization for Word & Brown. 
            The calculations are based on industry benchmarks showing that personalized experiences typically increase conversion 
            rates by 20-50% and improve customer lifetime value through better engagement. Adjust the sliders above to model 
            different scenarios and see how personalization investment could impact your bottom line.
          </p>
        </div>
      </div>
    </div>
  );
}
