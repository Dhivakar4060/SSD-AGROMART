import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import chatService from "../../services/chatService"; // Replace with WebSocket service if using socket
import { useTranslation } from "react-i18next";

const Chat = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef(null);

  // Load contacts on mount
  useEffect(() => {
    if (user) loadContacts();
  }, [user]);

  // Load messages when contact changes
  useEffect(() => {
    if (user && selectedContact) {
      loadMessages();
      // Optionally replace with WebSocket subscription
      const interval = setInterval(loadMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user, selectedContact]);

  // Smooth auto-scroll
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const loadContacts = async () => {
    try {
      const data = await chatService.getChatContacts(user.id);
      setContacts(data);
      if (data.length && !selectedContact) setSelectedContact(data[0]);
    } catch (error) {
      console.error("Failed to load contacts", error);
    }
  };

  const loadMessages = async () => {
    if (!selectedContact) return;
    try {
      const data = await chatService.getConversation(user.id, selectedContact.id);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const response = await chatService.sendMessage(user.id, selectedContact.id, newMessage);
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-4 flex-grow-1">
        <div className="row g-0 card border-0 shadow-sm" style={{ height: "80vh" }}>
          {/* Contacts Sidebar */}
          <div className="col-md-4 col-lg-3 border-end bg-white overflow-auto">
            <div className="p-3 border-bottom sticky-top bg-white">
              <h5 className="fw-bold mb-0">{t("chat.title")}</h5>
            </div>
            <div className="list-group list-group-flush">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`list-group-item list-group-item-action border-0 p-3 ${
                    selectedContact?.id === contact.id ? "bg-success bg-opacity-10 active-chat" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                      <i className="bi bi-person-fill text-success fs-5"></i>
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="mb-0 text-dark fw-bold text-truncate">{contact.name}</h6>
                      <small className="text-muted">{contact.role}</small>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-md-8 col-lg-9 d-flex flex-column bg-light">
            {selectedContact ? (
              <>
                {/* Header */}
                <div className="p-3 border-bottom d-flex align-items-center bg-white sticky-top">
                  <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3 d-md-none">
                    <i className="bi bi-person-fill text-success"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{selectedContact.name}</h6>
                    <small className="text-success small">
                      <i className="bi bi-circle-fill me-1 small"></i> {t("chat.online")}
                    </small>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`d-flex ${msg.sender.id === user.id ? "justify-content-end" : "justify-content-start"}`}
                    >
                      <div
                        className={`p-2 rounded-3 shadow-sm whatsapp-bubble ${
                          msg.sender.id === user.id ? "sent" : "received"
                        }`}
                      >
                        <p className="mb-1">{msg.message}</p>
                        <small className="d-block text-end timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-3 border-top bg-white">
                  <form onSubmit={handleSendMessage} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control rounded-pill border-0 bg-light px-4"
                      placeholder={t("chat.placeholder")}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success rounded-circle p-2" style={{ width: "40px", height: "40px" }}>
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                <i className="bi bi-chat-dots display-1 opacity-25 mb-3"></i>
                <h5>{t("chat.select_contact")}</h5>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .active-chat { border-left: 4px solid #198754 !important; }
        .list-group-item:hover { background-color: #f8f9fa; }

        .whatsapp-bubble.sent { background-color: #dcf8c6; color: #000; border-top-right-radius: 0.5rem; border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }
        .whatsapp-bubble.received { background-color: #fff; color: #000; border-top-right-radius: 0.5rem; border-top-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; border: 1px solid #e6e6e6; }
        .timestamp { font-size: 0.65rem; color: #999; }
      `}</style>
    </div>
  );
};

export default Chat;


// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
// import Navbar from "../../components/common/Navbar";
// import chatService from "../../services/chatService";
// import { useTranslation } from "react-i18next";

// const Chat = () => {
//   const { t } = useTranslation();
//   const { user } = useAuth();

//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [typingUsers, setTypingUsers] = useState({}); // track typing status

//   const chatContainerRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   // Load contacts on mount
//   useEffect(() => {
//     if (user) loadContacts();
//   }, [user]);

//   // Load messages when contact changes
//   useEffect(() => {
//     if (user && selectedContact) {
//       loadMessages();
//       const interval = setInterval(loadMessages, 5000); // Poll every 5s
//       return () => clearInterval(interval);
//     }
//   }, [user, selectedContact]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     const container = chatContainerRef.current;
//     if (container) {
//       container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
//     }
//   }, [messages]);

//   const loadContacts = async () => {
//     try {
//       const data = await chatService.getChatContacts(user.id);
//       setContacts(data);
//       if (data.length && !selectedContact) setSelectedContact(data[0]);
//     } catch (error) {
//       console.error("Failed to load contacts", error);
//     }
//   };

//   const loadMessages = async () => {
//     if (!selectedContact) return;
//     try {
//       const data = await chatService.getConversation(user.id, selectedContact.id);
//       setMessages(data);
//     } catch (error) {
//       console.error("Failed to load messages", error);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedContact) return;

//     try {
//       const response = await chatService.sendMessage(user.id, selectedContact.id, newMessage);
//       setMessages((prev) => [...prev, response.data]);
//       setNewMessage("");
//       notifyStopTyping();
//     } catch (error) {
//       console.error("Failed to send message", error);
//     }
//   };

//   const handleTyping = () => {
//     chatService.sendTypingStatus(user.id, selectedContact.id, true);
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       notifyStopTyping();
//     }, 2000);
//   };

//   const notifyStopTyping = () => {
//     chatService.sendTypingStatus(user.id, selectedContact.id, false);
//   };

//   // Listen for typing status updates
//   useEffect(() => {
//     const unsubscribe = chatService.onTypingStatus((contactId, isTyping) => {
//       setTypingUsers((prev) => ({ ...prev, [contactId]: isTyping }));
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="bg-light min-vh-100 d-flex flex-column">
//       <Navbar />

//       <div className="container py-4 flex-grow-1">
//         <div className="row g-0 card border-0 shadow-sm" style={{ height: "80vh" }}>
//           {/* Contacts Sidebar */}
//           <div className="col-md-4 col-lg-3 border-end bg-white overflow-auto">
//             <div className="p-3 border-bottom sticky-top bg-white">
//               <h5 className="fw-bold mb-0">{t("chat.title")}</h5>
//             </div>
//             <div className="list-group list-group-flush">
//               {contacts.map((contact) => (
//                 <button
//                   key={contact.id}
//                   className={`list-group-item list-group-item-action border-0 p-3 ${
//                     selectedContact?.id === contact.id ? "bg-success bg-opacity-10 active-chat" : ""
//                   }`}
//                   onClick={() => setSelectedContact(contact)}
//                 >
//                   <div className="d-flex align-items-center">
//                     <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
//                       <i className="bi bi-person-fill text-success fs-5"></i>
//                     </div>
//                     <div className="overflow-hidden">
//                       <h6 className="mb-0 text-dark fw-bold text-truncate">{contact.name}</h6>
//                       <small className="text-muted">{contact.role}</small>
//                       {typingUsers[contact.id] && (
//                         <small className="text-success d-block">Typing...</small>
//                       )}
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Chat Window */}
//           <div className="col-md-8 col-lg-9 d-flex flex-column bg-white">
//             {selectedContact ? (
//               <>
//                 {/* Header */}
//                 <div className="p-3 border-bottom d-flex align-items-center bg-white">
//                   <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3 d-md-none">
//                     <i className="bi bi-person-fill text-success"></i>
//                   </div>
//                   <div>
//                     <h6 className="mb-0 fw-bold">{selectedContact.name}</h6>
//                     <small className="text-success small">
//                       <i className="bi bi-circle-fill me-1 small"></i> {t("chat.online")}
//                     </small>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div
//                   ref={chatContainerRef}
//                   className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2 bg-light bg-opacity-25"
//                 >
//                   {messages.map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`d-flex ${
//                         msg.sender.id === user.id ? "justify-content-end" : "justify-content-start"
//                       }`}
//                     >
//                       <div
//                         className={`p-2 rounded-3 shadow-sm ${
//                           msg.sender.id === user.id ? "bg-success text-white" : "bg-white border"
//                         }`}
//                         style={{ maxWidth: "70%", position: "relative" }}
//                       >
//                         <p className="mb-1">{msg.message}</p>
//                         <small
//                           className={`d-block text-end ${
//                             msg.sender.id === user.id ? "text-white-50" : "text-muted"
//                           }`}
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           {new Date(msg.timestamp).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                           {msg.sender.id === user.id && (
//                             <i
//                               className={`bi ms-1 ${
//                                 msg.read ? "bi-check2-all text-primary" : "bi-check2"
//                               }`}
//                             ></i>
//                           )}
//                         </small>
//                       </div>
//                     </div>
//                   ))}
//                   {typingUsers[selectedContact.id] && (
//                     <div className="text-muted small fst-italic">Typing...</div>
//                   )}
//                 </div>

//                 {/* Input */}
//                 <div className="p-3 border-top bg-white">
//                   <form onSubmit={handleSendMessage} className="d-flex gap-2">
//                     <input
//                       type="text"
//                       className="form-control rounded-pill border-0 bg-light px-4"
//                       placeholder={t("chat.placeholder")}
//                       value={newMessage}
//                       onChange={(e) => {
//                         setNewMessage(e.target.value);
//                         handleTyping();
//                       }}
//                     />
//                     <button
//                       type="submit"
//                       className="btn btn-success rounded-circle p-2"
//                       style={{ width: "40px", height: "40px" }}
//                     >
//                       <i className="bi bi-send-fill"></i>
//                     </button>
//                   </form>
//                 </div>
//               </>
//             ) : (
//               <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
//                 <i className="bi bi-chat-dots display-1 opacity-25 mb-3"></i>
//                 <h5>{t("chat.select_contact")}</h5>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .active-chat { border-left: 4px solid #198754 !important; }
//         .list-group-item:hover { background-color: #f8f9fa; }
//       `}</style>
//     </div>
//   );
// };

// export default Chat;
