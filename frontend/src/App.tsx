import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Watchlist } from './components/Watchlist';
import { News } from './components/News';
import { Education } from './components/Education';
import { Alerts } from './components/Alerts';
import { StockProvider } from './contexts/StockContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'watchlist':
        return <Watchlist />;
      case 'news':
        return <News />;
      case 'education':
        return <Education />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <StockProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 ml-64">
            {renderContent()}
          </main>
        </div>
      </div>
    </StockProvider>
  );
}

export default App;