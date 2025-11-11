import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';


function SubmitLinks() {
  const { user, axios } = useAppContext();
  const [urls, setUrls] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success | error | info
  const [dripMode, setDripMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const urlList = urls
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url !== '');

      if (urlList.length === 0) {
        setMessage('❌ Please enter at least one URL');
        setMessageType('error');
        return;
      }

      if (urlList.length > 500) {
        setMessage('❌ Maximum 500 URLs allowed per submission');
        setMessageType('error');
        return;
      }

      const { data } = await axios.post('/api/urls/submit-batch', {
        urls: urlList,
        dripMode,
      });

      // ✅ Final success check
      if (data.success && data.processedCount > 0) {
        setMessage(
          `🎉 ${
            data.message || `${data.processedCount} URLs submitted successfully!`
          }`
        );
        setMessageType('success');
        setUrls('');

        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      } else {
        // ✅ Handles failure OR 0 processed
        setMessage(
          `❌ ${
            data.message || 'Submission failed or 0 URLs were processed.'
          }`
        );
        setMessageType('error');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Submission failed';
      setMessage(`❌ ${errorMessage}`);
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUrlsChange = (e) => {
    setUrls(e.target.value);
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const urlCount = urls.split('\n').filter((url) => url.trim() !== '').length;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Submit URLs for Indexing
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Submit your URLs to Google Indexing API for fast indexing
        </p>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-300">
                Enter URLs (one per line)
              </label>
              <textarea
                value={urls}
                onChange={handleUrlsChange}
                placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3`}
                rows={8}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-colors font-mono text-sm"
                required
                disabled={submitting}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Enter one URL per line. Maximum 500 URLs per submission.
                </p>
                <p className="text-sm text-gray-400">
                  {urlCount} URL{urlCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Drip Mode Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-750 rounded-lg border border-gray-600">
              <input
                type="checkbox"
                id="dripMode"
                checked={dripMode}
                onChange={(e) => setDripMode(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="dripMode"
                className="flex items-center gap-2 text-gray-300 cursor-pointer"
              >
                <span>Enable Drip Mode</span>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                  onClick={() => {
                    setMessage(
                      '💡 Drip Mode: URLs are processed slowly over time to avoid rate limits and improve success rates.'
                    );
                    setMessageType('info'); // ✅ Info style
                  }}
                >
                  What is Drip Mode?
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting || urlCount === 0}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting {urlCount} URLs...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  SUBMIT URLS{' '}
                  {urlCount > 0
                    ? `${urlCount} URLS (${urlCount} CREDITS)`
                    : '0 URLS (0 CREDITS)'}
                </>
              )}
            </button>
          </form>

          {/* Success / Error / Info Messages */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
                messageType === 'success'
                  ? 'bg-green-900/20 border-green-700 text-green-400'
                  : messageType === 'error'
                  ? 'bg-red-900/20 border-red-700 text-red-400'
                  : 'bg-blue-900/20 border-blue-700 text-blue-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">
                  {messageType === 'success'
                    ? '✅'
                    : messageType === 'error'
                    ? '❌'
                    : '💡'}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{message}</p>
                  {messageType === 'success' && (
                    <p className="text-green-300 text-sm mt-1">
                      URLs have been submitted to Google Indexing API.
                      Check dashboard for status updates.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setMessage('');
                    setMessageType('');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Information Box */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">💡</span>
              <div>
                <p className="text-blue-300 font-medium">How it works:</p>
                <ul className="text-blue-200 text-sm mt-1 space-y-1">
                  <li>• URLs are submitted to Google Indexing API</li>
                  <li>• Average indexing time: 3-4 days</li>
                  <li>• Success rate: 85-95%</li>
                  <li>• Batch processing available</li>
                  <li>• Check your dashboard for updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitLinks;