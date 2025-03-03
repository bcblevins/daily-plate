import './assets/scss/global/App.scss'
import FoodSearch from './routes/FoodSearch'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import PrivateRoute from './components/PrivateRoute'
import { UserContext } from './components/contexts'
import { useState } from 'react'
import EatFood from './routes/EatFoodN'
import RecipeBuilder from './routes/RecipeBuilder'
import DailySummary from './routes/DailySummary'

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
            <Route
              path="/search"
              element={
                <PrivateRoute >
                  <FoodSearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/eat"
              element={
                <PrivateRoute >
                  <EatFood />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipe-builder"
              element={
                <PrivateRoute >
                  <RecipeBuilder />
                </PrivateRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <PrivateRoute >
                  <DailySummary />
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
