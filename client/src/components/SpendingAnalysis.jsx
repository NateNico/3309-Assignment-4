import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

const SpendingAnalysis = () => {
  const { user } = UserAuth();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!user) return;
      const res = await fetch(`/api/spending-analysis/${user.uid}`);
      const data = await res.json();
      setAnalysis(data);
    };
    fetchAnalysis();
  }, [user]);

  return (
    <div>
      <h2>Spending Analysis</h2>
      {analysis ? (
        <div>
          <p>Total Spent: ${analysis.totalSpent.toFixed(2)}</p>
          {analysis.topCategory && (
            <p>Top Category: {analysis.topCategory}</p>
          )}
          <p>Suggestion: {analysis.suggestion}</p>
        </div>
      ) : (
        <p>Loading analysis...</p>
      )}
    </div>
  );
};

export default SpendingAnalysis;



