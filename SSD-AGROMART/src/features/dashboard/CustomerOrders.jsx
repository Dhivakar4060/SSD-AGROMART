import React, { useState, useEffect } from "react";
import orderService from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CustomerOrders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text(t("invoice.title") || "SSD AGROMART - INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`${t("invoice.order_id") || "Order ID"}: #${order.id}`, 20, 40);
    doc.text(`${t("invoice.date") || "Date"}: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 45);
    doc.text(`${t("invoice.customer") || "Customer"}: ${user.name}`, 20, 50);
    doc.text(`${t("invoice.status") || "Status"}: ${t(`order_status.${order.status.toLowerCase()}`) || order.status}`, 20, 55);

    // Table
    const tableData = [
      [t("invoice.summary") || "Order Summary", t("invoice.total_amount") || "Total Amount"],
      [
        `${t("invoice.purchase_of") || "Purchase of"} ${order.items?.length || 0} ${t("invoice.items") || "items"}`,
        `INR ${order.totalAmount}`,
      ],
    ];

    doc.autoTable({
      startY: 65,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: "grid",
      headStyles: { fillColor: [25, 135, 84] },
    });

    doc.text(
      t("invoice.thank_you") || "Thank you for shopping with SSD Agromart!",
      105,
      doc.lastAutoTable.finalY + 20,
      { align: "center" }
    );

    doc.save(`Invoice_${order.id}.pdf`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const data = await orderService.getCustomerOrders(user.id);
        setOrders(data);
      }
    };
    fetchOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-success";
      case "IN_TRANSIT":
        return "bg-info";
      case "PENDING":
        return "bg-warning text-dark";
      case "CANCELLED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (    <div>
      <h3 className="fw-bold mb-4">{t("dashboard.my_orders")}</h3>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">{t("dashboard.order_details")}</th>
                  <th>{t("dashboard.items")}</th>
                  <th>{t("dashboard.amount")}</th>
                  <th>{t("dashboard.status")}</th>
                  <th className="text-center">{t("dashboard.action")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4">
                      <div className="fw-bold text-success">#{order.id}</div>
                      <small className="text-muted">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </small>
                    </td>
                    <td>{order.items?.length || 0} {t("dashboard.items")}</td>
                    <td className="fw-bold text-dark">₹{order.totalAmount}</td>
                    <td>
                      <span className={`badge rounded-pill ${getStatusBadge(order.status)}`}>
                        {t(`order_status.${order.status.toLowerCase()}`) || order.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-success btn-sm rounded-pill px-3"
                        onClick={() => downloadInvoice(order)}
                      >
                        <i className="bi bi-file-earmark-pdf me-1"></i> {t("dashboard.invoice")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CustomerOrders;
