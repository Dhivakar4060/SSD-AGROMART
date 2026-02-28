import api from "../app/axiosConfig";

const reviewService = {
  addProductReview: async (productId, userId, rating, comment) => {
    return api.post(`/reviews/add/${productId}/${userId}`, { rating, comment });
  },

  getProductReviews: async (productId) => {
    try {
      const response = await api.get(`/reviews/product/${productId}`);
      return response.data;
    } catch (error) {
      return [
        {
          id: 1,
          user: { name: "Anita Sharma" },
          rating: 5,
          comment: "Excellent quality!",
          date: "2026-02-15",
        },
      ];
    }
  },
};

export default reviewService;
