import api from '../app/axiosConfig';

const chatService = {
  sendMessage: async (senderId, receiverId, message) => {
    return api.post(`/chat/send?senderId=${senderId}&receiverId=${receiverId}&message=${encodeURIComponent(message)}`);
  },

  getConversation: async (user1Id, user2Id) => {
    try {
      const response = await api.get(`/chat/conversation?user1Id=${user1Id}&user2Id=${user2Id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getChatContacts: async (userId) => {
    try {
      const response = await api.get(`/chat/contacts/${userId}`);
      return response.data;
    } catch (error) {
      return [
        { id: 2, name: 'Rajesh Kumar', role: 'FARMER' },
        { id: 3, name: 'Suresh Patel', role: 'FARMER' }
      ];
    }
  },

  getUnreadCount: async (userId) => {
    try {
      const response = await api.get(`/chat/unread/${userId}`);
      return response.data.length;
    } catch (error) {
      return 0;
    }
  }
};

export default chatService;
