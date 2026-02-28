import api from '../app/axiosConfig';

const adminService = {
  getAllUsers: async () => {
    // Mocking user list
    return [
      { id: 1, name: 'Rajesh Kumar', email: 'rajesh@farmer.com', role: 'FARMER', status: 'VERIFIED', joinedDate: '2026-01-15' },
      { id: 2, name: 'Anita Sharma', email: 'anita@customer.com', role: 'CUSTOMER', status: 'VERIFIED', joinedDate: '2026-02-10' },
      { id: 3, name: 'Suresh Patel', email: 'suresh@farmer.com', role: 'FARMER', status: 'PENDING', joinedDate: '2026-02-24' },
      { id: 4, name: 'Amit Singh', email: 'amit@customer.com', role: 'CUSTOMER', status: 'VERIFIED', joinedDate: '2026-02-20' },
    ];
  },

  verifyUser: async (userId) => {
    console.log(`Verifying user ${userId}`);
    return true;
  },

  deleteUser: async (userId) => {
    console.log(`Deleting user ${userId}`);
    return true;
  },

  getSystemStats: async () => {
    return {
      totalUsers: 1240,
      totalRevenue: '12.4L',
      pendingApprovals: 18,
      activeAuctions: 25
    };
  }
};

export default adminService;
