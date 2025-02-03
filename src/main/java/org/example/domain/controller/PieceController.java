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

    @GetMapping("/")
    public List<Piece> getList() {
        return pieceService.getList();
    }

    @GetMapping("/{position}")
    public Piece getPieceByPosition(@PathVariable("position") String position) {
        return pieceService.getPieceByPosition(position);
    }

    @PatchMapping("/reset")
    public List<Piece> reset() {
        MakeBaseBoard.reinsertPieces(pieceService);
        return getList();
    }

    @PatchMapping("/{position}")
    public List<Piece> getReady(@PathVariable("position") String position) {
        Piece piece = pieceService.getPieceByPosition(position);
        pieceService.ready(piece);
        return pieceService.getList();
    }

    @PatchMapping("/cancel")
    public List<Piece> readyCancel() {
        pieceService.cancelReady();
        return pieceService.getList();
    }

    @PatchMapping("/move/{to}/{from}")
    public List<Piece> move(@PathVariable("to") String to, @PathVariable("from") String from) {
        pieceService.move(to, from);
        return pieceService.getList();
    }

    @PatchMapping("/capture/{to}/{from}")
    public List<Piece> capture(@PathVariable("to") String to, @PathVariable("from") String from) {
        pieceService.capture(to, from);
        return pieceService.getList();
    }
}
