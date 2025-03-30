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
    },
    {
      keyword: "customers",
      data: {
        type: "line",
        title: "New Customers - Q3 2023",
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        values: [120, 145, 210, 180, 160],
        tableData: [
          { week: "Week 1", newCustomers: 120 },
          { week: "Week 2", newCustomers: 145 },
          { week: "Week 3", newCustomers: 210 },
          { week: "Week 4", newCustomers: 180 },
          { week: "Week 5", newCustomers: 160 }
        ]
      }
    }
  ]