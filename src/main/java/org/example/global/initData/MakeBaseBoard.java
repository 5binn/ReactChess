package org.example.global.initData;

import org.example.domain.service.PieceService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//초기 체스판 생성
@Configuration
public class MakeBaseBoard {
    private static String getPieceType(char c) {
        return switch (c) {
            case 'a', 'h' -> "r"; // 룩
            case 'b', 'g' -> "n"; // 나이트
            case 'c', 'f' -> "b"; // 비숍
            case 'd' -> "q";      // 퀸
            case 'e' -> "k";      // 킹
            default -> null;      // 잘못된 입력 처리
        };
    }

    @Bean
    CommandLineRunner initBoard(PieceService pieceService) {
        return args -> {
            insertPieces(pieceService);
        };
    }

    public static void insertPieces(PieceService pieceService) {
        for (int i = 0; i < 8; i++) {
            char c = (char) ('a' + i);
            for (int j = 1; j <= 8; j++) {
                String type = null;
                String color = null;
                String state = "alive";
                switch (j) {
                    case 1, 2 -> {
                        color = "w";
                        if (j == 2) {
                            type = "p";
                        } else {
                            type = getPieceType(c);
                        }
                    }
                    case 7, 8 -> {
                        color = "b";
                        if (j == 7) {
                            type = "p";
                        } else {
                            type = getPieceType(c);
                        }
                    }
                    default -> {
                        state = null;
                    }
                }
                pieceService.save("" + c + j, type, color, state);
            }
        }
    }

    public static void reinsertPieces(PieceService pieceService) {
        pieceService.deleteAll();
        insertPieces(pieceService); // 다시 데이터 삽입
    }
}
