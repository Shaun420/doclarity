import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  Shield,
  Info
} from 'lucide-react';

const AtAGlanceSummary = ({ summary }) => {
  const {
    documentType,
    keyPoints,
    risks,
    benefits,
    importantDates,
    financialTerms,
    overallRiskLevel
  } = summary;

  const getRiskLevelColor = (level) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">At a Glance Summary</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(overallRiskLevel)}`}>
          {overallRiskLevel?.toUpperCase()} RISK
        </span>
      </div>

      {/* Document Type */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-700">Document Type</h3>
        </div>
        <p className="text-gray-600 ml-7">{documentType}</p>
      </div>

      {/* Key Points Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Key Benefits */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Key Benefits</h3>
          </div>
          <ul className="space-y-2">
            {benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Risks */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Potential Risks</h3>
          </div>
          <ul className="space-y-2">
            {risks?.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span className="text-gray-700 text-sm">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Information */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Important Dates */}
        {importantDates && importantDates.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">Important Dates</h4>
            </div>
            <div className="space-y-1">
              {importantDates.map((date, index) => (
                <p key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{date.label}:</span> {date.value}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Financial Terms */}
        {financialTerms && financialTerms.length > 0 && (
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-800">Financial Terms</h4>
            </div>
            <div className="space-y-1">
              {financialTerms.map((term, index) => (
                <p key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{term.label}:</span> {term.value}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium text-gray-800">Key Points</h4>
          </div>
          <div className="space-y-1">
            {keyPoints?.slice(0, 3).map((point, index) => (
              <p key={index} className="text-sm text-gray-700">• {point}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtAGlanceSummary;