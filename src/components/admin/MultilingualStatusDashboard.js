import { useState, useEffect } from 'react';
import { Pie } from 'recharts';

const MultilingualStatusDashboard = ({ products }) => {
  const [stats, setStats] = useState({
    total: 0,
    complete: 0,
    missingChinese: 0,
    missingEnglish: 0,
    incomplete: 0
  });
  
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    const total = products.length;
    let complete = 0;
    let missingChinese = 0;
    let missingEnglish = 0;
    let incomplete = 0;
    
    products.forEach(product => {
      // Check title completeness
      const hasEnTitle = !!product.title?.en && product.title.en !== '';
      const hasZhTitle = !!product.title?.zh && product.title.zh !== '' && product.title.zh !== product.title.en;
      
      // Check description completeness
      const hasEnDesc = !!product.description?.en && product.description.en !== '';
      const hasZhDesc = !!product.description?.zh && product.description.zh !== '' && product.description.zh !== product.description.en;
      
      // Check features completeness
      const hasEnFeatures = !!product.features?.en && product.features.en.length > 0;
      const hasZhFeatures = !!product.features?.zh && product.features.zh.length > 0;
      
      if (hasEnTitle && hasZhTitle && hasEnDesc && hasZhDesc && hasEnFeatures && hasZhFeatures) {
        complete++;
      } else if (!hasZhTitle || !hasZhDesc || !hasZhFeatures) {
        missingChinese++;
      } else if (!hasEnTitle || !hasEnDesc || !hasEnFeatures) {
        missingEnglish++;
      } else {
        incomplete++;
      }
    });
    
    setStats({
      total,
      complete,
      missingChinese,
      missingEnglish,
      incomplete
    });
    
  }, [products]);
  
  // Prepare data for pie chart
  const chartData = [
    { name: 'Complete', value: stats.complete, fill: '#4ade80' },
    { name: 'Missing Chinese', value: stats.missingChinese, fill: '#fb923c' },
    { name: 'Missing English', value: stats.missingEnglish, fill: '#60a5fa' },
    { name: 'Incomplete', value: stats.incomplete, fill: '#f87171' }
  ];
  
  // Calculate completion percentage
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.complete / stats.total) * 100) 
    : 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Multilingual Content Status</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Stats summary */}
        <div className="mb-6 md:mb-0 md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded border text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border text-center">
              <div className="text-3xl font-bold text-green-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border text-center">
              <div className="text-3xl font-bold text-green-600">{stats.complete}</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.missingChinese}</div>
              <div className="text-sm text-gray-600">Missing Chinese</div>
            </div>
          </div>
        </div>
        
        {/* Pie chart */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                </Pie>
                <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Action advice */}
      <div className="mt-6 p-4 bg-gray-50 rounded border">
        <h3 className="font-medium mb-2">Recommended Actions:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {stats.missingChinese > 0 && (
            <li className="text-sm text-gray-700">
              Add Chinese translations for {stats.missingChinese} products missing Chinese content.
            </li>
          )}
          {stats.missingEnglish > 0 && (
            <li className="text-sm text-gray-700">
              Add English content for {stats.missingEnglish} products missing English descriptions.
            </li>
          )}
          {stats.incomplete > 0 && (
            <li className="text-sm text-gray-700">
              Review {stats.incomplete} products with incomplete information.
            </li>
          )}
          {stats.total === stats.complete && (
            <li className="text-sm text-green-700">
              All products have complete multilingual content. Great job!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

// For compatibility with the component structure
// We need to explicitly import and use these components
import { PieChart, Tooltip, ResponsiveContainer } from 'recharts';

export default MultilingualStatusDashboard;