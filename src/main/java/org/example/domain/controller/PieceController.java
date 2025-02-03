package org.example.domain.controller;

import lombok.RequiredArgsConstructor;
import org.example.domain.entity.Piece;
import org.example.domain.service.PieceService;
import org.example.global.initData.MakeBaseBoard;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pieces")
@RequiredArgsConstructor
public class PieceController {
    private final PieceService pieceService;

    //전체 좌표 불러오기
    @GetMapping("/")
    public List<Piece> getList() {
        return pieceService.getList();
    }

    //해당 좌표 불러오기
    @GetMapping("/{position}")
    public Piece getPieceByPosition(@PathVariable("position") String position) {
        return pieceService.getPieceByPosition(position);
    }

    //초기 상태로 리셋
    @PatchMapping("/reset")
    public List<Piece> reset() {
        MakeBaseBoard.reinsertPieces(pieceService);
        return getList();
    }

    //현재 상태 + 해당 좌표에서 이동 가능한 좌표
    @PatchMapping("/{position}")
    public List<Piece> getReady(@PathVariable("position") String position) {
        Piece piece = pieceService.getPieceByPosition(position);
        pieceService.ready(piece);
        return pieceService.getList();
    }

    //마지막 상태로 되돌리기
    @PatchMapping("/cancel")
    public List<Piece> readyCancel() {
        pieceService.cancelReady();
        return pieceService.getList();
    }

    //from -> to 좌표로 이동
    @PatchMapping("/move/{to}/{from}")
    public List<Piece> move(@PathVariable("to") String to, @PathVariable("from") String from) {
        pieceService.move(to, from);
        return pieceService.getList();
    }

    //from -> to 좌표로 잡고 이동
    @PatchMapping("/capture/{to}/{from}")
    public List<Piece> capture(@PathVariable("to") String to, @PathVariable("from") String from) {
        pieceService.capture(to, from);
        return pieceService.getList();
    }
}
