import React, { useState } from 'react';
import { userAPI } from '../services/api';
import './UserSearch.css';

const UserSearch = ({ onUserSelect, excludeUserId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await userAPI.searchUsers(searchTerm);
      const filteredResults = response.data.filter(user => user.id !== excludeUserId);
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="user-search">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user.id} className="user-result">
              <span>{user.username} ({user.email})</span>
              <button onClick={() => onUserSelect(user)}>
                Assign
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;