package org.example.domain.repository;

import org.example.domain.entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PieceRepository extends JpaRepository<Piece, Long> {
    //포지션으로 해당 말 찾기
    Optional<Piece> findByPosition(String position);
    //state 에 해당 하는 말 리스트
    List<Piece> findByState(String state);
}
