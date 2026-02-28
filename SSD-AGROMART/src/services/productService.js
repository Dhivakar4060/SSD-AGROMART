import api from "../app/axiosConfig";

const toImageUrl = (url) => {
  if (!url) return null;
  return url.startsWith("/uploads/") ? `http://localhost:8080${url}` : url;
};

const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return (response.data || []).map((p) => ({
        ...p,
        imageUrl: toImageUrl(p.imageUrl),
      }));
    } catch (error) {
      console.warn("Backend not available, using mock data");
      return [
        {
          id: 1,
          name: "Organic Tomatoes",
          price: 40,
          stock: 200,
          category: "Vegetables",
          status: "Active",
          unit: "kg",
        },
        {
          id: 2,
          name: "Basmati Rice",
          price: 120,
          stock: 500,
          category: "Grains",
          status: "Active",
          unit: "kg",
        },
        {
          id: 3,
          name: "Fresh Mangoes",
          price: 150,
          stock: 0,
          category: "Fruits",
          status: "Out of Stock",
          unit: "kg",
        },
      ];
    }
  },

  getFarmerProducts: async (farmerId) => {
    try {
      const response = await api.get(`/products/farmer/${farmerId}`);
      return (response.data || []).map((p) => ({
        ...p,
        imageUrl: toImageUrl(p.imageUrl),
      }));
    } catch (error) {
      return [
        {
          id: 1,
          name: "Organic Tomatoes",
          price: 40,
          stock: 200,
          category: "Vegetables",
          status: "Active",
          unit: "kg",
        },
        {
          id: 2,
          name: "Basmati Rice",
          price: 120,
          stock: 500,
          category: "Grains",
          status: "Active",
          unit: "kg",
        },
      ];
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      const p = response.data;
      return { ...p, imageUrl: toImageUrl(p.imageUrl) };
    } catch (error) {
      return {
        id,
        name: "Organic Tomatoes",
        price: 40,
        stock: 200,
        category: "Vegetables",
        unit: "kg",
        farmer: "Rajesh Kumar",
        location: "Nagpur, MH",
        description:
          "Hand-picked organic tomatoes grown without pesticides. Fresh from our local farm in Nagpur. Rich in flavor and nutrients.",
        images: [],
        rating: 4.5,
        reviews: [
          {
            id: 1,
            user: "Anita Sharma",
            rating: 5,
            comment: "Excellent quality, very fresh!",
            date: "2026-02-15",
          },
          {
            id: 2,
            user: "Suresh Patel",
            rating: 4,
            comment: "Good taste, but a bit expensive.",
            date: "2026-02-10",
          },
        ],
      };
    }
  },

  addProduct: async (productData, farmerId) => {
    const formData = new FormData();
    const { image, ...data } = productData;
    formData.append("product", JSON.stringify(data));
    if (image) {
      formData.append("image", image);
    }
    return api.post(`/products/farmer/${farmerId}`, formData);
  },

  updateProduct: async (id, productData) => {
    const formData = new FormData();
    const { image, ...data } = productData;
    formData.append("product", JSON.stringify(data));
    if (image instanceof File) {
      formData.append("image", image);
    }
    return api.put(`/products/${id}`, formData);
  },

  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
