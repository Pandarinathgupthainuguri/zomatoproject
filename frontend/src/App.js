import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import RestaurantDetails from './components/Details/RestaurantDetails';
import Filter from './components/Filter/Filter';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/details/:rName",
    element: <RestaurantDetails/>,
  },
  {
    path: "/filter",
    element: <Filter/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
