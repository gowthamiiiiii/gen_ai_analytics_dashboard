import React from 'react'
import QueryInput from './components/QueryInput'
import QueryHistory from './components/QueryHistory'
import ResultsDisplay from './components/ResultsDisplay'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gen AI Analytics Dashboard</h1>
          <p className="text-gray-600">Ask natural language questions about your data</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QueryInput />
            <ResultsDisplay />
          </div>
          <div className="lg:col-span-1">
            <QueryHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App