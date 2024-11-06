import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  // * Getting the API data from loader;
  const menu = useLoaderData();
  console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export default Menu;
