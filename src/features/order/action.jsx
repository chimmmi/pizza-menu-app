import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../order/CreateOrder";
import store from '../../store'
import { clearCart } from "../cart/cartSlice";

export async function action({ request }) {
  //* using formData web API
  //* Getting the data from the form submission:
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority == "true",
  };

  // Handling form errors
  const errors = {};
  if (!isValidPhone(order.phone))
    // If phone number is not valid:
    errors.phone = "Please provide a valid phone number";

  if(Object.keys(errors).length > 0) return errors

  // If no errors, create new order
  const newOrder = await createOrder(order);

  store.dispatch(clearCart())

  //* since navigate is used in components, redirect does the job in loaders and actions:
  return redirect(`/order/${newOrder.id}`);
}
