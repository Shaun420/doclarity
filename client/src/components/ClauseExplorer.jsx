import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  AlertCircle, 
  HelpCircle,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';

const ClauseExplorer = ({ clauses }) => {
  const [expandedClauses, setExpandedClauses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedClause, setSelectedClause] = useState(null);

  const toggleClause = (clauseId) => {
    setExpandedClauses(prev => ({
      ...prev,
      [clauseId]: !prev[clauseId]
    }));
  };

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getImportanceIcon = (importance) => {
    switch(importance) {
      case 'high': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'low': return <HelpCircle className="w-5 h-5 text-green-600" />;
      default: return null;
    }
  };

  const filteredClauses = clauses?.filter(clause => {
    const matchesSearch = clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clause.originalText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || clause.importance === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Clause Explorer</h2>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clauses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Clauses</option>
            <option value="high">High Importance</option>
            <option value="medium">Medium Importance</option>
            <option value="low">Low Importance</option>
          </select>
        </div>
      </div>

      {/* Clauses List */}
      <div className="space-y-4">
        {filteredClauses?.map((clause) => (
          <div
            key={clause.id}
            className={`border-2 rounded-lg transition-all duration-200 ${getImportanceColor(clause.importance)}`}
          >
            {/* Clause Header */}
            <button
              onClick={() => toggleClause(clause.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedClauses[clause.id] ? 
                  <ChevronDown className="w-5 h-5 text-gray-600" /> : 
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                }
                {getImportanceIcon(clause.importance)}
                <h3 className="font-semibold text-gray-800 text-left">{clause.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{clause.section}</span>
            </button>

            {/* Expanded Content */}
            {expandedClauses[clause.id] && (
              <div className="px-4 pb-4 border-t border-gray-200">
                {/* Original Text */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Original Text
                  </h4>
                  <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-600 italic">
                    "{clause.originalText}"
                  </div>
                </div>

                {/* Plain English Explanation */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Plain English Explanation</h4>
                  <p className="text-gray-700">{clause.explanation}</p>
                </div>

                {/* Key Implications */}
                {clause.implications && clause.implications.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">What This Means for You</h4>
                    <ul className="space-y-1">
                      {clause.implications.map((implication, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{implication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Items */}
                {clause.actionItems && clause.actionItems.length > 0 && (
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Recommended Actions</h4>
                    <ul className="space-y-1">
                      {clause.actionItems.map((action, index) => (
                        <li key={index} className="text-sm text-blue-700">
                          ✓ {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ask About This Clause */}
                <button
                  onClick={() => setSelectedClause(clause)}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  Ask a question about this clause
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClauseExplorer;