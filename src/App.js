import './App.css';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { useState, createContext, useEffect } from 'react';
import SigninComponent from './components/SigninComponent';
import { Provider } from 'react-redux';
import store from './utils/store';

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
      <Provider store = {store}>
      <UserContext.Provider value = {[user, setUser]}>
      <CategoryContext.Provider value = {[categoryId, setCategoryId]}>
        <HeaderComponent />
        <Outlet />
      </CategoryContext.Provider>
      </UserContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
