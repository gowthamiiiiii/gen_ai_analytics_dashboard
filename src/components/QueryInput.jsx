import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentQuery, clearCurrentQuery } from '../features/query/querySlice'
import { processQuery, fetchSuggestions } from '../features/query/querySlice'

const QueryInput = () => {
  const dispatch = useDispatch()
  const currentQuery = useSelector(state => state.query.currentQuery)
  const suggestions = useSelector(state => state.query.suggestions)
  const isLoading = useSelector(state => state.query.isLoading)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (currentQuery.length > 2) {
      dispatch(fetchSuggestions(currentQuery))
    }
  }, [currentQuery, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentQuery.trim() && !isLoading) {
      dispatch(processQuery(currentQuery))
    }
  }

  const handleSuggestionClick = (suggestion) => {
    dispatch(setCurrentQuery(suggestion))
    setShowSuggestions(false)
    dispatch(processQuery(suggestion))
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ask a question about your data..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
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
        
        <button
          type="submit"
          disabled={!currentQuery.trim() || isLoading}
          className={`px-6 py-3 rounded-lg text-white font-medium ${
            !currentQuery.trim() || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 'Ask Data'}
        </button>
      </form>
    </div>
  )
}

export default QueryInput