import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, clearCurrentQuery } from '../features/query/querySlice';
import { processQuery, fetchSuggestions } from '../features/query/querySlice';

const QueryInput = () => {
  const dispatch = useDispatch();
  const currentQuery = useSelector(state => state.query.currentQuery);
  const suggestions = useSelector(state => state.query.suggestions);
  const isLoading = useSelector(state => state.query.isLoading);
  const [localQuery, setLocalQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Sync Redux state with local state
  useEffect(() => {
    setLocalQuery(currentQuery);
  }, [currentQuery]);

  // Fetch suggestions when typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery.length > 2) {
        dispatch(fetchSuggestions(localQuery));
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setCurrentQuery(value));
    setShowSuggestions(value.length > 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(processQuery(localQuery));
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(clearCurrentQuery());
    inputRef.current.focus();
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
    dispatch(processQuery(suggestion));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(localQuery.length > 2)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ask a question about your data..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
          {isLoading ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <button
              type="submit"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg text-white ${
                localQuery.trim()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!localQuery.trim()}
            >
              Ask
            </button>
          )}
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default QueryInput;
