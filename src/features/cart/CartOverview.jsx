import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice} from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  //* Retrieving the total quantity of items:
  const totalCartQuantity = useSelector(getTotalCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if(!getTotalCartItems) return null
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
