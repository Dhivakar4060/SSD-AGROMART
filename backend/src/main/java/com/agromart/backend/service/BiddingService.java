package com.agromart.backend.service;

import com.agromart.backend.entity.Auction;
import com.agromart.backend.entity.Bid;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.AuctionRepository;
import com.agromart.backend.repository.BidRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BiddingService {
    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    public BiddingService(AuctionRepository auctionRepository, BidRepository bidRepository, UserRepository userRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
    }

    public List<Auction> getActiveAuctions() {
        return auctionRepository.findByStatus("ACTIVE");
    }

    public Auction createAuction(Auction auction, Long farmerId) {
        User farmer = userRepository.findById(farmerId).orElseThrow();
        auction.setFarmer(farmer);
        auction.setCurrentBid(auction.getBasePrice());
        return auctionRepository.save(auction);
    }

    @Transactional
    public Bid placeBid(Long auctionId, Long bidderId, Double amount) {
        Auction auction = auctionRepository.findById(auctionId).orElseThrow();
        User bidder = userRepository.findById(bidderId).orElseThrow();

        if (amount <= auction.getCurrentBid()) {
            throw new RuntimeException("Bid amount must be higher than current bid");
        }

        if (LocalDateTime.now().isAfter(auction.getEndTime())) {
            throw new RuntimeException("Auction has ended");
        }

        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBidder(bidder);
        bid.setAmount(amount);
        bid.setBidTime(LocalDateTime.now());

        auction.setCurrentBid(amount);
        auctionRepository.save(auction);

        return bidRepository.save(bid);
    }

    public List<Bid> getAuctionBids(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId).orElseThrow();
        return bidRepository.findByAuction(auction);
    }
}
