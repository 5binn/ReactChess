package org.example.global.util;

public class Util {

    //min/max 좌표
    public static boolean isValidPosition(char column, int row) {
        return column >= 'a' && column <= 'h' && row > 0 && row <= 8;
    }


}
