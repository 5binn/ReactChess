//package org.example.domain.service;
//
//import lombok.RequiredArgsConstructor;
//import org.example.domain.entity.Piece;
//import org.example.domain.logic.*;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class PositionsService {
//    private final Pawn pawn;
//    private final Knight knight;
//    private final Rook rook;
//    private final Bishop bishop;
//    private final Queen queen;
//    private final King king;
//
//    public List<String> getPossiblePositions(Piece piece) {
//        return switch (piece.getType()) {
//            case "p" -> pawn.getPositions(piece);
//            case "n" -> knight.getPositions(piece);
//            case "r" -> rook.getPositions(piece);
//            case "b" -> bishop.getPositions(piece);
//            case "q" -> queen.getPositions(piece);
//            case "k" -> king.getPositions(piece);
//            default -> throw new IllegalArgumentException("Invalid piece type: " + piece.getType());
//        };
//    }
//}
