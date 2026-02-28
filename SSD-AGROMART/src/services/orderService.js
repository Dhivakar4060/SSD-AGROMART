import api from "../app/axiosConfig";

const orderService = {
  placeOrder: async (customerId, items, address) => {
    return api.post(`/orders/place/${customerId}`, { items, address });
  },

  getCustomerOrders: async (customerId) => {
    try {
      const response = await api.get(`/orders/customer/${customerId}`);
      return response.data;
    } catch (error) {
      return [
        {
          id: "ORD-8821",
          orderDate: "2026-02-20T10:30:00",
          totalAmount: 1200,
          status: "SHIPPED",
          items: [],
        },
        {
          id: "ORD-8755",
          orderDate: "2026-02-15T14:20:00",
          totalAmount: 450,
          status: "DELIVERED",
          items: [],
        },
      ];
    }
  },

  updateOrderStatus: async (orderId, status) => {
    return api.put(`/orders/${orderId}/status?status=${status}`);
  },
};

export default orderService;
