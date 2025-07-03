import React, { useState } from 'react';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useStock } from '../contexts/StockContext';

export function Alerts() {
  const { alerts, addAlert, removeAlert } = useStock();
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    type: 'price_above',
    value: '',
    message: ''
  });

  const handleAddAlert = () => {
    if (newAlert.symbol && newAlert.value) {
      addAlert({
        id: Date.now().toString(),
        symbol: newAlert.symbol,
        type: newAlert.type as 'price_above' | 'price_below' | 'volume_spike',
        value: parseFloat(newAlert.value),
        message: newAlert.message,
        isActive: true,
        createdAt: new Date().toISOString()
      });
      setNewAlert({ symbol: '', type: 'price_above', value: '', message: '' });
      setShowAddAlert(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Price Alerts</h1>
          <p className="text-gray-400">Set notifications for price movements and market events</p>
        </div>
        <button
          onClick={() => setShowAddAlert(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Alert
        </button>
      </div>

      {showAddAlert && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Stock Symbol</label>
              <input
                type="text"
                value={newAlert.symbol}
                onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value.toUpperCase() })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="e.g., NABIL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Alert Type</label>
              <select
                value={newAlert.type}
                onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="price_above">Price Above</option>
                <option value="price_below">Price Below</option>
                <option value="volume_spike">Volume Spike</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Value</label>
              <input
                type="number"
                value={newAlert.value}
                onChange={(e) => setNewAlert({ ...newAlert, value: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="e.g., 1200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
              <input
                type="text"
                value={newAlert.message}
                onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="Custom alert message"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAddAlert}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create Alert
            </button>
            <button
              onClick={() => setShowAddAlert(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Active Alerts ({alerts.length})</h2>
        
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No alerts set</h3>
            <p className="text-gray-500">Create your first alert to get notified about price movements</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'price_above' ? 'bg-emerald-500/20' :
                    alert.type === 'price_below' ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    {alert.type === 'price_above' ? (
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    ) : alert.type === 'price_below' ? (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{alert.symbol}</h4>
                    <p className="text-sm text-gray-400">
                      {alert.type === 'price_above' ? 'Price above' :
                       alert.type === 'price_below' ? 'Price below' : 'Volume spike at'} Rs. {alert.value}
                    </p>
                    {alert.message && (
                      <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}