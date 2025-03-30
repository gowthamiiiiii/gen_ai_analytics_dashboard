import React from 'react'
import { useSelector } from 'react-redux'

const StatusIndicator = () => {
  const isLoading = useSelector(state => state.query.isLoading)
  const error = useSelector(state => state.query.error)

  if (!isLoading && !error) return null

  return (
    <div className="fixed bottom-4 right-4">
      {isLoading && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing your query...
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Error: {error}
        </div>
      )}
    </div>
  )
}

export default StatusIndicator