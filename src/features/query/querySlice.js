import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { processQuery as mockProcessQuery, getSuggestions as mockGetSuggestions } from '../../services/mockApi'

export const processQuery = createAsyncThunk(
  'query/processQuery',
  async (query) => {
    const response = await mockProcessQuery(query)
    return response
  }
)

export const fetchSuggestions = createAsyncThunk(
  'query/fetchSuggestions',
  async (input) => {
    return await mockGetSuggestions(input)
  }
)

const initialState = {
  currentQuery: '',
  queries: [],
  results: null,
  isLoading: false,
  error: null,
  suggestions: [],
  suggestionsLoading: false
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload
    },
    clearCurrentQuery: (state) => {
      state.currentQuery = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.isLoading = false
        state.results = action.payload.results
        state.queries = [
          {
            query: state.currentQuery,
            timestamp: new Date().toISOString(),
            id: Date.now()
          },
          ...state.queries
        ].slice(0, 10)
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchSuggestions.pending, (state) => {
        state.suggestionsLoading = true
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false
        state.suggestions = action.payload
      })
  }
})

export const { setCurrentQuery, clearCurrentQuery } = querySlice.actions
export default querySlice.reducer