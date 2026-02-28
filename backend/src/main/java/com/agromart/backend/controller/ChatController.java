package com.agromart.backend.controller;

import com.agromart.backend.entity.ChatMessage;
import com.agromart.backend.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.agromart.backend.entity.User;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam String message) {
        return ResponseEntity.ok(chatService.sendMessage(senderId, receiverId, message));
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<ChatMessage>> getConversation(
            @RequestParam Long user1Id,
            @RequestParam Long user2Id) {
        return ResponseEntity.ok(chatService.getConversation(user1Id, user2Id));
    }

    @GetMapping("/contacts/{userId}")
    public ResponseEntity<List<User>> getChatContacts(@PathVariable Long userId) {
        return ResponseEntity.ok(chatService.getChatContacts(userId));
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<List<ChatMessage>> getUnreadMessages(@PathVariable Long userId) {
        return ResponseEntity.ok(chatService.getUnreadMessages(userId));
    }
}
