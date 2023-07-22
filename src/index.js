import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import './App.css';
import AuthenticationComponent from './components/AuthenticationComponent';
import SigninComponent from './components/SigninComponent';
import SignupComponent from './components/SignupComponent';
import CategoryComponent from './components/CategoryComponent';
import ProductDetailComponent from './components/ProductDetailComponent';
import UserProfileComponent from './components/UserProfileComponent';
import MyOrderComponent from './components/MyOrderComponent';
import CartComponent from './components/CartComponent';
import ProductDetailRedirectComponent from './components/ProductDetailRedirectComponent';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomeComponent />
      },
      {
        path: '/category',
        element: <CategoryComponent />
      },
      {
        path: '/product/:id',
        element: <ProductDetailComponent />
      },
      {
        path: '/products/:id',
        element: <ProductDetailRedirectComponent />
      },
      {
        path: '/profile',
        element: <UserProfileComponent />
      },
      {
        path: '/cart',
        element: <CartComponent />
      }
    ]
  },
  {
    path: '/authentication',
    element: <AuthenticationComponent />
  },
  {
    path: '/login',
    element: <SigninComponent />
  },
  {
    path: '/register',
    element: <SignupComponent />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {Router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
