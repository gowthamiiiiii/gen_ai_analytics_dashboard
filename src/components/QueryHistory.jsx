import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentQuery } from '../features/query/querySlice'
import { processQuery } from '../features/query/querySlice'

const QueryHistory = () => {
  const dispatch = useDispatch()
  const queries = useSelector(state => state.query.queries)
  const isLoading = useSelector(state => state.query.isLoading)

  const handleQueryClick = (query) => {
    if (isLoading) return
    dispatch(setCurrentQuery(query))
    dispatch(processQuery(query))
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg h-full">
      <h3 className="text-lg font-semibold mb-3">Recent Queries</h3>
      {queries.length === 0 ? (
        <p className="text-gray-500">Your query history will appear here</p>
      ) : (
        <ul className="space-y-2">
          {queries.map((item) => (
            <li
              key={item.id}
              className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${
                isLoading ? 'opacity-50' : ''
              }`}
              onClick={() => handleQueryClick(item.query)}
            >
              <div className="text-sm font-medium truncate">{item.query}</div>
              <div className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default QueryHistory