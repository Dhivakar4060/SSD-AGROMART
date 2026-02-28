package com.agromart.backend.service;

import com.agromart.backend.entity.Auction;
import com.agromart.backend.entity.Bid;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.AuctionRepository;
import com.agromart.backend.repository.BidRepository;
import com.agromart.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BiddingServiceTest {

    @Mock
    private AuctionRepository auctionRepository;
    @Mock
    private BidRepository bidRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BiddingService biddingService;

    private User bidder;
    private Auction auction;

    @BeforeEach
    void setUp() {
        bidder = new User();
        bidder.setId(1L);
        bidder.setName("Test Bidder");

        auction = new Auction();
        auction.setId(1L);
        auction.setBasePrice(1000.0);
        auction.setCurrentBid(1000.0);
        auction.setEndTime(LocalDateTime.now().plusHours(2));
        auction.setStatus("ACTIVE");
    }

    @Test
    void placeBid_Success() {
        // Arrange
        when(auctionRepository.findById(1L)).thenReturn(Optional.of(auction));
        when(userRepository.findById(1L)).thenReturn(Optional.of(bidder));
        when(bidRepository.save(any(Bid.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Bid result = biddingService.placeBid(1L, 1L, 1200.0);

        // Assert
        assertNotNull(result);
        assertEquals(1200.0, result.getAmount());
        assertEquals(1200.0, auction.getCurrentBid());
        verify(auctionRepository).save(auction);
        verify(bidRepository).save(any(Bid.class));
    }

    @Test
    void placeBid_LowerThanCurrentBid_ThrowsException() {
        // Arrange
        when(auctionRepository.findById(1L)).thenReturn(Optional.of(auction));
        when(userRepository.findById(1L)).thenReturn(Optional.of(bidder));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            biddingService.placeBid(1L, 1L, 900.0)
        );
        assertEquals("Bid amount must be higher than current bid", exception.getMessage());
        verify(bidRepository, never()).save(any(Bid.class));
    }

    @Test
    void placeBid_AuctionEnded_ThrowsException() {
        // Arrange
        auction.setEndTime(LocalDateTime.now().minusMinutes(1));
        when(auctionRepository.findById(1L)).thenReturn(Optional.of(auction));
        when(userRepository.findById(1L)).thenReturn(Optional.of(bidder));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> 
            biddingService.placeBid(1L, 1L, 1500.0)
        );
        assertEquals("Auction has ended", exception.getMessage());
        verify(bidRepository, never()).save(any(Bid.class));
    }
}
