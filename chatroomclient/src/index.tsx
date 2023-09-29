import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Chatrooms from "./routes/Chatrooms";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { signUpAction, logInAction } from "./services/authService";
import {
  channelsLoader,
  statsLoader,
  viewChannelsLoader,
  channelLoader,
} from "./services/chatService";
import Stats from "./routes/Stats";
import ViewChannels from "./routes/ViewChannels";
import AddChannel from "./routes/AddChannel";
import EditChannel from "./routes/EditChannel";
import ComponentTree from "./routes/ComponentTree";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/signup",
            element: <Signup />,
            action: signUpAction,
          },
          {
            path: "/login",
            element: <Login />,
            action: logInAction,
          },
          {
            path: "/chatrooms",
            element: <Chatrooms />,
            loader: channelsLoader,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                index: true,
                element: <Stats />,
                loader: statsLoader,
              },
              {
                path: "/dashboard/viewchannels",
                element: <ViewChannels />,
                loader: viewChannelsLoader,
              },
              {
                path: "/dashboard/addchannel",
                element: <AddChannel />,
              },
              {
                path: "/dashboard/editchannel/:id",
                element: <EditChannel />,
                loader: channelLoader,
              },
            ],
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/componenttree",
            element: <ComponentTree />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
