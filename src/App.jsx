import './App.css'
import FoodSearch from './components/FoodSearch'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Link, BrowserRouter, Routes, Route } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import PrivateRoute from './components/PrivateRoute'
import { UserContext } from './components/contexts'
import { useState } from 'react'

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
  const userHook = useState({});
  return (
    <UserContext.Provider value={userHook}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute >
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </UserContext.Provider>


  )
}

export default App
