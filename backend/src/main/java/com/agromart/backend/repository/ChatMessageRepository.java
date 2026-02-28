package com.agromart.backend.repository;

import com.agromart.backend.entity.ChatMessage;
import com.agromart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    @Query("SELECT m FROM ChatMessage m WHERE (m.sender = ?1 AND m.receiver = ?2) OR (m.sender = ?2 AND m.receiver = ?1) ORDER BY m.timestamp ASC")
    List<ChatMessage> findConversation(User user1, User user2);

    List<ChatMessage> findByReceiverAndIsRead(User receiver, boolean isRead);
}
