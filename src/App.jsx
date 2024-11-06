import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error"
import Menu from "./features/menu/Menu"
import { loader as menuLoader } from "./features/menu/menuLoader";
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import { action as createOrderAction } from "./features/order/action";
import {loader as orderLoader} from "./features/order/orderLoader";
import {action as updateOrderAction} from "./features/order/updateOrderAction"
import AppLayout from "./ui/AppLayout";


const router = createBrowserRouter([
  {
    //* parent element, main layout for the child routes
    // * it will always be rendered:
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [

      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/menu',
        element: <Menu/>,
        // *fetching data before rendering the menu path.
        //* this will preload the API data before the menu component renders.
        loader: menuLoader,
        errorElement: <Error/>,
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        //Path to create new order: 
        path: '/order/new',
        element: <CreateOrder/>,
        loader: orderLoader,
        errorElement: <Error/>,
        //* action call after form submission:
        action: createOrderAction
      },
      {
        //Dynamic route to handle data
        path: '/order/:orderId',
        loader: orderLoader,
        element: <Order/>,
        errorElement: <Error/>,
        action: updateOrderAction,
      }

    ]

  }
 
])


function App() {
  return <RouterProvider router={router}/>
}

export default App;
