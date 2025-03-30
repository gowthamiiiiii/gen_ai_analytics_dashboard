export const mockResponses = [
  {
    keyword: "sales",
    data: {
      type: "bar",
      title: "Sales by Region - Last Quarter",
      labels: ["North", "South", "East", "West"],
      values: [125000, 98000, 142000, 110000],
      tableData: [
        { region: "North", sales: 125000, growth: "12%" },
        { region: "South", sales: 98000, growth: "8%" },
        { region: "East", sales: 142000, growth: "15%" },
        { region: "West", sales: 110000, growth: "10%" }
      ]
    }
  },
  {
    keyword: "products",
    data: {
      type: "pie",
      title: "Top Products - Last Month",
      labels: ["Product A", "Product B", "Product C", "Product D"],
      values: [45000, 38000, 29000, 21000],
      tableData: [
        { product: "Product A", revenue: 45000, units: 320 },
        { product: "Product B", revenue: 38000, units: 280 },
        { product: "Product C", revenue: 29000, units: 210 },
        { product: "Product D", revenue: 21000, units: 150 }
      ]
    }
  }
]

export const processQuery = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matchedResponse = mockResponses.find(res => 
        query.toLowerCase().includes(res.keyword.toLowerCase())
      ) || mockResponses[0]
      resolve({ results: matchedResponse.data })
    }, 1000)
  })
}

export const getSuggestions = (input) => {
  const commonQueries = [
    "Show me sales by region",
    "Display top products",
    "Compare quarterly revenue",
    "Customer acquisition last month"
  ]
  return Promise.resolve(
    input 
      ? commonQueries.filter(q => q.toLowerCase().includes(input.toLowerCase()))
      : commonQueries.slice(0, 3)
  )
}