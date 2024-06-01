import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import DashBoard from "../layouts/DashBoard";
import AddRoom from "../pages/Dashboard/AddRoom";
import MyListing from "../pages/Dashboard/MyListing";
import Profile from "../pages/Dashboard/common/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "add-room",
        element: <AddRoom />,
      },
      {
        path: "listings",
        element: <MyListing></MyListing>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
