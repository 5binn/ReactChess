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
//@RequiredArgsConstructor
//@Service
//public class Bishop {
//    private final PieceFinder pieceFinder;
//
//    public List<String> getPositions(Piece piece) {
//        List<String> positions = new ArrayList<>();
//        char column = piece.getPosition().charAt(0);
//        int row = piece.getPosition().charAt(1) - '0';
//        int[][] directions = {
//                {1, 1},
//                {-1, -1},
//                {1, -1},
//                {-1, 1},
//        };
//        for (int[] direction : directions) {
//            while (isValidPosition((char) (column + direction[0]), row + direction[1])) {
//                column += direction[0];
//                row += direction[1];
//                if (pieceFinder.getPieceByPosition("" + column + row).getType() == null) {
//                    positions.add("" + column + row);
//                } else if (!pieceFinder.getPieceByPosition("" + column + row).getColor().equals(piece.getColor())) {
//                    positions.add("" + column + row);
//                    break;
//                } else {
//                    break;
//                }
//            }
//        }
//        return positions;
//    }
//}
