package com.agromart.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agromart.backend.entity.Auction;
import com.agromart.backend.entity.Bid;
import com.agromart.backend.service.BiddingService;

@RestController
@RequestMapping("/api/bidding")
public class BiddingController {
    private final BiddingService biddingService;
    public BiddingController(BiddingService biddingService) {
        this.biddingService = biddingService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<Auction>> getActiveAuctions() {
        return ResponseEntity.ok(biddingService.getActiveAuctions());
    }

    @PostMapping("/auction/{farmerId}")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction, @PathVariable Long farmerId) {
        return ResponseEntity.ok(biddingService.createAuction(auction, farmerId));
    }

    @PostMapping("/bid/{auctionId}/{bidderId}")
    public ResponseEntity<Bid> placeBid(
            @PathVariable Long auctionId,
            @PathVariable Long bidderId,
            @RequestParam Double amount
    ) {
        return ResponseEntity.ok(biddingService.placeBid(auctionId, bidderId, amount));
    }

    @GetMapping("/bids/{auctionId}")
    public ResponseEntity<List<Bid>> getAuctionBids(@PathVariable Long auctionId) {
        return ResponseEntity.ok(biddingService.getAuctionBids(auctionId));
    }
}
