package org.example.domain.repository;

import org.example.domain.entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PieceRepository extends JpaRepository<Piece, Long> {
    Optional<Piece> findByPosition(String position);
    List<Piece> findByState(String state);
}
