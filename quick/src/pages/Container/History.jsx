import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

function History() {
  const { user, axios } = useAppContext();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('/api/urls/history');
      if (data.success) {
        setUrls(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-24 flex items-center justify-center">
        <div className="text-xl">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Submission History</h1>
        
        <div className="bg-gray-800 rounded-xl p-6">
          {urls.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No URLs submitted yet</p>
              <p className="text-gray-500 mt-2">Go to Submit Links to add your first URL</p>
            </div>
          ) : (
            <div className="space-y-4">
              {urls.map((url) => (
                <div key={url._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-blue-400">{url.url}</p>
                    <p className="text-sm text-gray-400">
                      Status: <span className={`${
                        url.status === 'indexed' ? 'text-green-400' : 
                        url.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {url.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Submitted: {new Date(url.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  {url.indexedAt && (
                    <p className="text-sm text-green-400">
                      Indexed: {new Date(url.indexedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;