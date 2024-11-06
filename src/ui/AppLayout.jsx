import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "./Loading";

// * Main app layout:
function AppLayout() {
  // * useNavigation will return the current navigatinon state (idle or loading)
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loading />}
      <Header />
    <div className="overflow-scroll">
      <main className="mx-auto max-w-3xl">
        
        {/* Remdering the child routes */}
        <Outlet />
      </main>
    </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
