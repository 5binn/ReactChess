//package org.example.domain.logic;
//
//import lombok.RequiredArgsConstructor;
//import org.example.domain.entity.Piece;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.example.global.util.Util.isValidPosition;
//
//@RequiredArgsConstructor
//@Service
//public class Pawn {
//
//    public List<String> getPositions(Piece piece) {
//        List<String> positions = new ArrayList<>();
//        char column = piece.getPosition().charAt(0);
//        int row = piece.getPosition().charAt(1) - '0';
//        int direction = piece.getColor().equals("w") ? 1 : -1; // 이동 방향 설정 (흰색: +1, 검은색: -1)
//        // 첫 이동(2칸 전진) 추가
//        if ((piece.getColor().equals("w") && row == 2) || (piece.getColor().equals("b") && row == 7)) {
//            if (isValidPosition(column, row + 2 * direction)) {
//                positions.add("" + column + (row + 2 * direction));
//            }
//        }
//        if (isValidPosition(column, row + direction)) {
//            positions.add("" + column + (row + direction));
//        }
//        return positions;
//    }
//}
