//package org.example.domain.logic;
//
//import lombok.RequiredArgsConstructor;
//import org.example.domain.entity.Piece;
//import org.example.global.util.PieceFinder;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.example.global.util.Util.isValidPosition;
//
//
//@RequiredArgsConstructor
//@Service
//public class King {
//    private final PieceFinder pieceFinder;
//
//    public List<String> getPositions(Piece piece) {
////        List<String> positions = new ArrayList<>();
////        char column = piece.getPosition().charAt(0);
////        int row = piece.getPosition().charAt(1) - '0';
////        int[][] moves = {
////                {column + 1, row},
////                {column - 1, row},
////                {column, row + 1},
////                {column, row - 1},
////                {column + 1, row + 1},
////                {column - 1, row - 1},
////                {column + 1, row - 1},
////                {column - 1, row + 1},
////        };
////        for (int[] move : moves) {
////            if (isValidPosition((char) move[0], move[1])) {
////                if (pieceFinder.getPieceByPosition("" + move[0] + move[1]).getType() == null ||
////                        !pieceFinder.getPieceByPosition("" + move[0] + move[1]).getColor().equals(piece.getColor())) {
////                    positions.add("" + move[0] + move[1]);
////                }
////            }
////        }
////        return positions;
//    }
//}
