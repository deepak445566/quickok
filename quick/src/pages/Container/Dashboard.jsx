import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

function Dashboard() {
  const { user, axios } = useAppContext();
  const [stats, setStats] = useState(null);
  const [recentUrls, setRecentUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ FIXED: Remove indexing-stats API call (it doesn't exist yet)
      const [statsResponse, historyResponse] = await Promise.all([
        axios.get('/api/urls/stats'),
        axios.get('/api/urls/history?limit=5')
      ]);

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      if (historyResponse.data.success) {
        setRecentUrls(historyResponse.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchDashboardData();
  };

  // Calculate additional stats
  const calculateStats = () => {
    if (!stats) return null;
    
    const failedCount = stats.totalSubmitted - stats.totalIndexed;
    const successRate = stats.totalSubmitted > 0 
      ? Math.round((stats.totalIndexed / stats.totalSubmitted) * 100) 
      : 0;
    
    const pendingCount = recentUrls.filter(url => 
      url.status === 'pending' || url.status === 'submitted'
    ).length;

    return {
      ...stats,
      failedCount,
      successRate,
      pendingCount
    };
  };

  const calculatedStats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Monitor your indexing performance</p>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>🔄</span>
            Refresh Data
          </button>
        </div>

        {/* Show message if no data */}
        {!calculatedStats && (
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6 mb-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Welcome to QuickIndexing!</h3>
            <p className="text-gray-300 mb-4">Start by submitting your first URL to see analytics</p>
            <button 
              onClick={() => window.location.href = '/submitlinks'}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your First URL
            </button>
          </div>
        )}

        {/* Stats Cards - Only show if we have data */}
        {calculatedStats && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-blue-500/30 hover:border-blue-400 transition-all duration-200">
                <div className="text-3xl font-bold text-blue-400 mb-2">{calculatedStats.totalSubmitted}</div>
                <p className="text-gray-300 font-medium">Total Links</p>
                <p className="text-sm text-gray-500 mt-1">All time submissions</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-green-500/30 hover:border-green-400 transition-all duration-200">
                <div className="text-3xl font-bold text-green-400 mb-2">{calculatedStats.totalIndexed}</div>
                <p className="text-gray-300 font-medium">Indexed</p>
                <p className="text-sm text-gray-500 mt-1">Successfully indexed</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculatedStats.totalSubmitted > 0 ? (calculatedStats.totalIndexed / calculatedStats.totalSubmitted) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-yellow-500/30 hover:border-yellow-400 transition-all duration-200">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{calculatedStats.todaySubmissions}</div>
                <p className="text-gray-300 font-medium">Today</p>
                <p className="text-sm text-gray-500 mt-1">Today's submissions</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-purple-500/30 hover:border-purple-400 transition-all duration-200">
                <div className="text-3xl font-bold text-purple-400 mb-2">{calculatedStats.successRate}%</div>
                <p className="text-gray-300 font-medium">Success Rate</p>
                <p className="text-sm text-gray-500 mt-1">Indexing success</p>
                <div className="mt-2">
                  <span className={`text-xs font-medium ${
                    calculatedStats.successRate >= 80 ? 'text-green-400' :
                    calculatedStats.successRate >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {calculatedStats.successRate >= 80 ? 'Excellent' :
                     calculatedStats.successRate >= 50 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Status Distribution */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
                  <span>📊</span>
                  Indexing Analytics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300 flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Total Submitted
                    </span>
                    <span className="text-blue-400 font-semibold">{calculatedStats.totalSubmitted}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Successfully Indexed
                    </span>
                    <span className="text-green-400 font-semibold">{calculatedStats.totalIndexed}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Failed/Not Indexed
                    </span>
                    <span className="text-red-400 font-semibold">{calculatedStats.failedCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300 flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      Pending
                    </span>
                    <span className="text-yellow-400 font-semibold">{calculatedStats.pendingCount}</span>
                  </div>
                  
                  {/* Success Rate Bar */}
                  <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Indexing Success Rate</span>
                      <span className="text-purple-400 font-semibold">{calculatedStats.successRate}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          calculatedStats.successRate >= 80 ? 'bg-green-500' :
                          calculatedStats.successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${calculatedStats.successRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-green-400 flex items-center gap-2">
                  <span>⚡</span>
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => window.location.href = '/submitlinks'}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-lg flex items-center justify-center gap-2"
                  >
                    🚀 Submit New URL
                  </button>
                  <button 
                    onClick={() => window.location.href = '/check'}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-lg flex items-center justify-center gap-2"
                  >
                    🔍 Check Indexing Status
                  </button>
                  <button 
                    onClick={() => window.location.href = '/history'}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-lg flex items-center justify-center gap-2"
                  >
                    📊 View Full History
                  </button>
                </div>
                
                {/* System Status */}
                <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">API Status</span>
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Operational
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Last Updated</span>
                      <span className="text-blue-400 text-sm">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Data Source</span>
                      <span className="text-green-400 text-sm">Real Database</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
                  <span>🕒</span>
                  Recent Submissions
                </h3>
                <button 
                  onClick={() => window.location.href = '/history'}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  View All →
                </button>
              </div>
              
              {recentUrls.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-400 text-lg">No submissions yet</p>
                  <p className="text-gray-500 mt-2">Start by submitting your first URL</p>
                  <button 
                    onClick={() => window.location.href = '/submitlinks'}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Submit URL
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentUrls.map((url) => (
                    <div 
                      key={url._id} 
                      className="bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 transition-all duration-200 hover:border-gray-500"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate text-sm sm:text-base">{url.url}</p>
                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              url.status === 'indexed' ? 'bg-green-900/50 text-green-300 border border-green-700' : 
                              url.status === 'failed' ? 'bg-red-900/50 text-red-300 border border-red-700' : 
                              url.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                              url.status === 'submitted' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                              'bg-gray-900/50 text-gray-300 border border-gray-700'
                            }`}>
                              {url.status.charAt(0).toUpperCase() + url.status.slice(1)}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {new Date(url.submittedAt).toLocaleDateString()} at {new Date(url.submittedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {url.indexed ? (
                            <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm border border-green-700 flex items-center gap-1">
                              ✅ Indexed
                            </span>
                          ) : url.status === 'pending' ? (
                            <span className="bg-yellow-900/30 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-700 flex items-center gap-1">
                              ⏳ Processing
                            </span>
                          ) : (
                            <span className="bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm border border-red-700 flex items-center gap-1">
                              ❌ Not Indexed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Performance Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
              <h3 className="text-xl font-semibold mb-6 text-purple-400 flex items-center gap-2">
                <span>📈</span>
                Performance Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl text-green-400 mb-2">✅</div>
                  <p className="text-white font-semibold">Indexing Success</p>
                  <p className="text-2xl font-bold text-green-400 mt-2">{calculatedStats.successRate}%</p>
                  <p className="text-gray-400 text-sm mt-1">URLs successfully indexed</p>
                </div>
                
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl text-blue-400 mb-2">🚀</div>
                  <p className="text-white font-semibold">Total Processed</p>
                  <p className="text-2xl font-bold text-blue-400 mt-2">{calculatedStats.totalSubmitted}</p>
                  <p className="text-gray-400 text-sm mt-1">URLs submitted</p>
                </div>
                
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl text-yellow-400 mb-2">⏳</div>
                  <p className="text-white font-semibold">Active Processing</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">{calculatedStats.pendingCount}</p>
                  <p className="text-gray-400 text-sm mt-1">URLs in queue</p>
                </div>
              </div>
            </div>
          </>
        )}

        
      </div>
    </div>
  );
}

export default Dashboard;