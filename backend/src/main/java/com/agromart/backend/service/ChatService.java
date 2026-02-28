package com.agromart.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.agromart.backend.entity.ChatMessage;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.ChatMessageRepository;
import com.agromart.backend.repository.UserRepository;

@Service
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatService(ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    public ChatMessage sendMessage(Long senderId, Long receiverId, String message) {
        User sender = userRepository.findById(senderId).orElseThrow();
        User receiver = userRepository.findById(receiverId).orElseThrow();

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setMessage(message);
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessage.setRead(false);

        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getConversation(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id).orElseThrow();
        User user2 = userRepository.findById(user2Id).orElseThrow();

        List<ChatMessage> conversation = chatMessageRepository.findConversation(user1, user2);

        // Mark as read for the receiver
        conversation.stream()
                .filter(m -> m.getReceiver().getId().equals(user1Id) && !m.isRead())
                .forEach(m -> {
                    m.setRead(true);
                    chatMessageRepository.save(m);
                });

        return conversation;
    }

    public List<User> getChatContacts(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        // This is a simplified version - in a real app, you'd get users with existing
        // conversations
        return userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(userId))
                .toList();
    }

    public List<ChatMessage> getUnreadMessages(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return chatMessageRepository.findByReceiverAndIsRead(user, false);
    }
}
