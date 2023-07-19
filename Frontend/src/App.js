
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

import DashBoard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Authentication from "./components/Authentication/Authentication";

import {loader as dashBoardLoader} from "./loaders/DashBoardLoader";
import homeAction from "./components/FormAction/HomeAction";
import authAction from "./components/FormAction/auth-action";

const route = createBrowserRouter([
  {
    path : "/",
    errorElement : <Error />,
    children : [
      {
        index : true,
        element : <Home />,
        action : homeAction
      },
      {
        path : "dashboard",
        element : <DashBoard />,
        loader : dashBoardLoader
      },
      {
        path : "account",
        element : <Authentication />,
        action : authAction
      }
    ]
  }
])

function App() {
  return  <RouterProvider router={route} />
}

export default App;
