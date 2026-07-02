import { useState } from 'react';
import { FiCopy, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ShareModal({ isOpen, onClose, shareId, isPublic }) {
  const [loading, setLoading] = useState(false);
  const shareLink = `${window.location.origin}/share/${shareId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success('Link copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Share Itinerary</h2>
        
        {isPublic ? (
          <div>
            <p className="text-gray-600 mb-4 text-sm">Anyone with this link can view your itinerary.</p>
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <input type="text" value={shareLink} readOnly className="bg-transparent flex-1 outline-none text-sm text-gray-700 truncate mr-3" />
              <button onClick={copyLink} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1">
                <FiCopy /> Copy
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm">Enable sharing from the itinerary details page first.</p>
        )}
      </div>
    </div>
  );
}