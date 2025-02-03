package org.example.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.global.jpa.BaseEntity;

@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Piece extends BaseEntity {
    //좌표 ex) a1, a2, b1, ...
    private String position;

    //말의 타입 [p(pawn), r(rook), n(knight), b(bishop), q(queen), k(king)]
    @Column(nullable = true)
    private String type;

    //색(차례) [b(black), w(white)]
    @Column(nullable = true)
    private String color;

    //말의 상태 [alive(노말), ready(이동 가능), deathBed(죽기 가능)]
    @Column(nullable = true)
    private String state;
}
