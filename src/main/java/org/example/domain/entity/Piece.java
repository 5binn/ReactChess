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
    private String position;
    @Column(nullable = true)
    private String type;
    @Column(nullable = true)
    private String color;
    @Column(nullable = true)
    private String state;
}
