import { updateOrder } from "../../services/apiRestaurant";

export async function action({ params }) {
    console.log("Order ID:", params.orderId);
    const data = { priority: true };
    try {
      await updateOrder(params?.orderId, data);
      return null;
    } catch (error) {
      console.error("Action Error:", error.message);
      throw error;
    }
  }