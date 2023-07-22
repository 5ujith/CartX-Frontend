import './App.css';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { useState, createContext, useEffect } from 'react';
import SigninComponent from './components/SigninComponent';

export const UserContext = createContext();
export const CategoryContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [categoryId, setCategoryId] = useState(1);

  if(!isAuthenticated) {
    return <SigninComponent setIsAuthenticated = {setIsAuthenticated} setUser = {setUser}/>;
  }

  return (
    <div className = 'h-screen'>
      <UserContext.Provider value = {[user, setUser]}>
      <CategoryContext.Provider value = {[categoryId, setCategoryId]}>
        <HeaderComponent />
        <Outlet />
      </CategoryContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
