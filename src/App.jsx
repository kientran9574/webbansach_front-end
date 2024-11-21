import React, { useEffect } from 'react'
import Footers from "./components/user/footers/Footers"
import Headers from "./components/user/headers/Headers"
import Home from "./components/user/home/Home"

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Book from './components/book/Book';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import { fetchAccount } from './service/api';
import AdminLayout from './components/admin/AdminLayout';
import PageAdmin from './components/admin/pages/PageAdmin';
import BookAdmin from './components/admin/manage-book';
import { useDispatch } from 'react-redux';
import { doFetcherAccount } from './redux/account/accountSlice';
import ProtectedRoute from './components/auth/protected-route/ProtectedRoute';
import ListUser from './components/admin/manage-user/ListUser';
import OrdersPage from './components/order';
import History from './components/order/History';
const Layout = () => {
  return (
    <>
      <Headers></Headers>
      <Outlet></Outlet>
      <Footers></Footers>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const handleAccountToken = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }

    let res = await fetchAccount();
    if (res && res.data) {
      dispatch(doFetcherAccount(res.data.data));
    }
  };

  useEffect(() => {
    handleAccountToken();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [{
        index: true,
        element: <Home></Home>,
      },
      {
        path: "book/:slug",
        element: <Book></Book>,
      },
      {
        path: "order",
        element: <OrdersPage></OrdersPage>,
      },
      {
        path: "history",
        element: <History></History>,
      },
      ]
    },
    {
      path: "/admin",
      element:
        <ProtectedRoute>
          <AdminLayout></AdminLayout>
        </ProtectedRoute>,
      children: [{
        index: true,
        element:
          <ProtectedRoute>
            <PageAdmin></PageAdmin>
          </ProtectedRoute>
      },
      {
        path: "user",
        element: <ListUser></ListUser>,
      },
      {
        path: "book",
        element: <BookAdmin></BookAdmin>,
      }
      ]
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    }
  ]);
  return (
    <><RouterProvider router={router} /></>
  )
}

export default App