import './App.css'
import FoodSearch from './components/FoodSearch'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Link, BrowserRouter, Routes, Route } from 'react-router'

// This will handle API calls to nutrition info
const queryClient = new QueryClient({
  defaultOptions: {
    // these determine how long to keep 
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
})

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>

        <FoodSearch />
        
      </QueryClientProvider>
    </BrowserRouter>

  )
}

export default App
