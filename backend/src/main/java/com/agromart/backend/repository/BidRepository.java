package com.agromart.backend.repository;

import com.agromart.backend.entity.Auction;
import com.agromart.backend.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByAuction(Auction auction);
}
