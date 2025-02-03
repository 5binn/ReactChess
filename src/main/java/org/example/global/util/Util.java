package org.example.global.util;

public class Util {

    public static boolean isValidPosition(char column, int row) {
        return column >= 'a' && column <= 'h' && row > 0 && row <= 8;
    }


}
