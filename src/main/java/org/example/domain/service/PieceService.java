package org.example.domain.service;

import lombok.RequiredArgsConstructor;
import org.example.domain.entity.Piece;
import org.example.domain.repository.PieceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.example.global.util.Util.isValidPosition;


@Service
@RequiredArgsConstructor
public class PieceService {
    private final PieceRepository pieceRepository;

    public List<Piece> getList() {
        return pieceRepository.findAll();
    }

    public void deleteAll() {
        pieceRepository.deleteAll();
    }

    public Piece getPieceByPosition(String position) {
        return pieceRepository.findByPosition(position).orElse(null);
    }

    public void save(String position, String type, String color, String state) {
        Piece square = Piece.builder()
                .position(position)
                .type(type)
                .color(color)
                .state(state)
                .build();
        pieceRepository.save(square);
    }

    //수정 시 좌표(position)는 항상 고정
    public void updatePiece(Piece piece, String type, String color, String state) {
        Piece updatePiece = piece.toBuilder()
                .type(type)
                .color(color)
                .state(state)
                .build();
        pieceRepository.save(updatePiece);
    }

    //해당 말의 색/타입 에 따라 이동/잡기 가능한 위치
    public void ready(Piece piece) {
        String type = piece.getType();
        String color = piece.getColor();
        List<String> positions = getAvailablePositions(piece);
        for (String position : positions) {
            Piece readyPiece;
            if (position.contains("-")) {
                readyPiece = getPieceByPosition(position.substring(1));
                updatePiece(readyPiece, readyPiece.getType(), readyPiece.getColor(), "deathBed");
            } else {
                readyPiece = getPieceByPosition(position);
                updatePiece(readyPiece, type, color, "ready");
            }
        }
    }

    //준비/잡기 상태 되돌리기
    public void cancelReady() {
        List<Piece> readyList = pieceRepository.findByState("ready");
        for (Piece piece : readyList) {
            updatePiece(piece, null, null, null);
        }
        List<Piece> deathBedList = pieceRepository.findByState("deathBed");
        for (Piece piece : deathBedList) {
            updatePiece(piece, piece.getType(), piece.getColor(), "alive");
        }
    }

    //이동
    public void move(String to, String from) {
        Piece toPiece = getPieceByPosition(to);
        Piece fromPiece = getPieceByPosition(from);
        updatePiece(toPiece, toPiece.getType(), toPiece.getColor(),
                checkMate(toPiece) ? "checkmate" : "alive");
        updatePiece(fromPiece, null, null, null);
    }

    //잡기
    public void capture(String to, String from) {
        Piece toPiece = getPieceByPosition(to);
        Piece fromPiece = getPieceByPosition(from);
        updatePiece(toPiece, fromPiece.getType(), fromPiece.getColor(),
                checkMate(toPiece) ? "checkmate" : "alive");
        updatePiece(fromPiece, null, null, null);
    }

    //체크메이트
    private boolean checkMate(Piece piece) {
        List<String> positions = getAvailablePositions(piece);
        for (String position : positions) {
            if (position.contains("-")) {
                Piece capturePiece = getPieceByPosition(position.substring(1));
                return capturePiece.getType().equals("k");
            }
        }
        return false;
    }

    //각 타입에 따라 가능한 포지션 반환
    private List<String> getAvailablePositions(Piece piece) {
        return switch (piece.getType()) {
            case "p" -> pawn(piece);
            case "n" -> knight(piece);
            case "r" -> rook(piece);
            case "b" -> bishop(piece);
            case "q" -> queen(piece);
            case "k" -> king(piece);
            default -> throw new IllegalArgumentException("Invalid piece type: " + piece.getType());
        };
    }

    //moves 좌표에 따른 이동 가능한 좌표
    private List<String> getMoves(Piece piece, int[][] moves) {
        List<String> positions = new ArrayList<>();
        char column = piece.getPosition().charAt(0);
        int row = piece.getPosition().charAt(1) - '0';

        for (int[] move : moves) {
            char targetColumn = (char) (column + move[0]);
            int targetRow = row + move[1];
            if (canMove(targetColumn, targetRow)) {
                positions.add("" + targetColumn + targetRow);
            }
            if (canCapture(targetColumn, targetRow, piece)) {
                positions.add("-" + targetColumn + targetRow);
            }
        }
        return positions;
    }

    //directions 방향 좌표에 따른 이동 가능한 직선 좌표들
    private List<String> getDirectionalMoves(Piece piece, int[][] directions) {
        List<String> positions = new ArrayList<>();
        char column = piece.getPosition().charAt(0);
        int row = piece.getPosition().charAt(1) - '0';

        for (int[] direction : directions) {
            char currentColumn = column;
            int currentRow = row;
            while (true) {
                currentColumn += direction[0];
                currentRow += direction[1];

                if (canCapture(currentColumn, currentRow, piece)) {
                    positions.add("-" + currentColumn + currentRow);
                    break;
                }
                if (!canMove(currentColumn, currentRow)) break;

                Piece targetPiece = getPieceByPosition("" + currentColumn + currentRow);
                if (targetPiece == null || targetPiece.getType() == null) {
                    positions.add("" + currentColumn + currentRow);
                } else if (!targetPiece.getColor().equals(piece.getColor())) {
                    positions.add("" + currentColumn + currentRow);
                    break;
                } else {
                    break;
                }
            }
        }
        return positions;
    }

    //해당 좌표가 이동 가능한지
    private boolean canMove(char column, int row) {
        return isValidPosition(column, row) &&
                (getPieceByPosition("" + column + row) == null ||
                        getPieceByPosition("" + column + row).getType() == null);
    }

    //해당 좌표가 잡을 수 있는지
    private boolean canCapture(char column, int row, Piece piece) {
        return isValidPosition(column, row) &&
                getPieceByPosition("" + column + row) != null &&
                getPieceByPosition("" + column + row).getColor() != null &&
                !getPieceByPosition("" + column + row).getColor().equals(piece.getColor());
    }

    //폰의 움직임(초기 두 칸 이동)
    public List<String> pawn(Piece piece) {
        List<String> positions = new ArrayList<>();
        char column = piece.getPosition().charAt(0);
        int row = piece.getPosition().charAt(1) - '0';
        int direction = piece.getColor().equals("w") ? 1 : -1;
        if (canMove(column, row + direction))
            positions.add("" + column + (row + direction));

        if ((piece.getColor().equals("w") && row == 2) || (piece.getColor().equals("b") && row == 7)) {
            if (canMove(column, row + 2 * direction))
                positions.add("" + column + (row + 2 * direction));
        }
        if (canCapture((char) (column - 1), row + direction, piece)) {
            positions.add("-" + (char) (column - 1) + (row + direction));
        }
        if (canCapture((char) (column + 1), row + direction, piece)) {
            positions.add("-" + (char) (column + 1) + (row + direction));
        }
        return positions;
    }

    //나이트 좌표
    public List<String> knight(Piece piece) {
        return getMoves(piece, new int[][]{
                {-2, -1}, {-2, 1}, {-1, -2}, {-1, 2},
                {1, -2}, {1, 2}, {2, -1}, {2, 1}
        });
    }

    //룩 방향 좌표
    public List<String> rook(Piece piece) {
        return getDirectionalMoves(piece, new int[][]{
                {1, 0}, {-1, 0}, {0, 1}, {0, -1}
        });
    }

    //비숍 방향 좌표
    public List<String> bishop(Piece piece) {
        return getDirectionalMoves(piece, new int[][]{
                {1, 1}, {-1, -1}, {1, -1}, {-1, 1}
        });
    }

    //퀸 방향 좌표(룩 + 비숍)
    public List<String> queen(Piece piece) {
        List<String> rookPositions = rook(piece);
        rookPositions.addAll(bishop(piece));
        return rookPositions;
    }

    //킹 좌표
    public List<String> king(Piece piece) {
        return getMoves(piece, new int[][]{
                {1, 0}, {-1, 0}, {0, 1}, {0, -1},
                {1, 1}, {-1, -1}, {1, -1}, {-1, 1}
        });
    }

}


