import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import orderService from "../../services/orderService";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (user) {
      const data = await orderService.getFarmerOrders(user.id);
      setOrders(data);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-warning text-dark';
      case 'SHIPPED': return 'bg-info text-white';
      case 'DELIVERED': return 'bg-success text-white';
      case 'CANCELLED': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div className="pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Incoming Orders</h3>
        <div className="d-flex gap-2">
          <select 
            className="form-select form-select-sm rounded-pill px-3" 
            style={{ width: '150px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>
          <input 
            type="text" 
            className="form-control form-control-sm rounded-pill px-3" 
            placeholder="Search Order ID/Customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4">Order ID</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 fw-bold text-success">#ORD-{order.id}</td>
                  <td>
                    <div className="fw-bold">{order.customer?.name}</div>
                    <small className="text-muted">{order.shippingAddress}</small>
                  </td>
                  <td className="fw-bold">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="text-muted small">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(order.status)} rounded-pill px-3`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-end px-4">
                    <div className="dropdown">
                      <button className="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                        <li><button className="dropdown-item" onClick={() => updateStatus(order.id, 'SHIPPED')}><i className="bi bi-truck me-2"></i>Mark as Shipped</button></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus(order.id, 'DELIVERED')}><i className="bi bi-check-circle me-2"></i>Mark as Delivered</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={() => updateStatus(order.id, 'CANCELLED')}><i className="bi bi-x-circle me-2"></i>Cancel Order</button></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">No orders found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default FarmerOrders;
