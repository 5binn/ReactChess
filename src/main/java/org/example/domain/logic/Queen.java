//package org.example.domain.logic;
//
//import lombok.RequiredArgsConstructor;
//import org.example.domain.entity.Piece;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class Queen {
//    private final Rook rook;
//    private final Bishop bishop;
//    public List<String> getPositions(Piece piece) {
//        List<String> rookPositions = rook.getPositions(piece);
//        rookPositions.addAll(bishop.getPositions(piece));
//        return rookPositions;
//    }
//}
