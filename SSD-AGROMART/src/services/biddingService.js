import api from '../app/axiosConfig';

const biddingService = {
  getActiveAuctions: async () => {
    try {
      const response = await api.get('/bidding/active');
      return response.data;
    } catch (error) {
      return [
        { 
          id: 101, 
          cropName: 'Premium Wheat', 
          quantity: '500 Quintals', 
          basePrice: 1000, 
          currentBid: 2000, 
          endTime: new Date(Date.now() + 86400000).toISOString(),
          farmer: 'Rajesh Kumar',
          totalBids: 12
        },
        { 
          id: 102, 
          cropName: 'Basmati Rice (Grade A)', 
          quantity: '200 Quintals', 
          basePrice: 4500, 
          currentBid: 4800, 
          endTime: new Date(Date.now() + 172800000).toISOString(),
          farmer: 'Suresh Patel',
          totalBids: 8
        },
      ];
    }
  },

  placeBid: async (auctionId, bidderId, amount) => {
    return api.post(`/bidding/bid/${auctionId}/${bidderId}?amount=${amount}`);
  },

  createAuction: async (auctionData, farmerId) => {
    return api.post(`/bidding/auction/${farmerId}`, auctionData);
  }
};

export default biddingService;
