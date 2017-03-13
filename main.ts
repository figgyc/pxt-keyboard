namespace keyboard {

    function joinArray < T > (a1: T[], a2: T[]): T[] {
        a2.map((value: T, index: number) => {
            a1.push(value);
        });
        return a1;
    }

    // If you're wondering why these symbols, they're ASCII range 33-126, as supported in the default micro:bit font (see https://github.com/lancaster-university/microbit-dal/blob/master/inc/core/MicroBitFont.h)
    /**
     * Array of capital and lowercase letters
     */
    export const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    /**
     * Array of numbers
     */
    export const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    /**
     * Array of symbols
     */
    export const symbols: string[] = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '>', '=', '?', '@', '[', ']', '^', '_', '`', '\\', '{', '}', '|', '~'];
    /**
     * Combined array of numbers, letters, and symbols
     */
    export const everything: string[] = joinArray(joinArray(letters, numbers), symbols);

     /**
    * Appends a number to a file
    * @param charset Array of characters that can be used
    */
    //% blockId="keyboard_show_keyboard" block="show keyboard of %charset"    
    export function showKeyboard(charset: string[]): string {

        let currentLetter: number = 0;
        let currentInput: string = "";
        let buttonsHeld: number = 0;
        basic.showString(charset[currentLetter]);
        while (true) {
            if (input.buttonIsPressed(Button.AB)) {
                if (buttonsHeld == 5000) {
                    led.plotAll();
                    basic.pause(100);
                    basic.clearScreen();
                    buttonsHeld = 0;
                    return currentInput;
                } else {
                    basic.pause(100);
                    buttonsHeld += 100;
                }
            } else if (input.buttonIsPressed(Button.A)) {
                if (currentLetter <= 0) {
                    currentLetter = charset.length - 1;
                } else {
                    currentLetter = currentLetter - 1;
                }
                basic.showString(charset[currentLetter]);
                basic.pause(200);
            } else if (input.buttonIsPressed(Button.B)) {
                if (currentLetter >= charset.length - 1) {
                    currentLetter = 0;
                } else {
                    currentLetter = currentLetter + 1;
                }
                basic.showString(charset[currentLetter]);
                basic.pause(200);
            }
            if (!input.buttonIsPressed(Button.AB)) {
                if (buttonsHeld > 1000) {
                    basic.clearScreen();
                    basic.showString(currentInput);
                } else if (buttonsHeld > 1) {
                    currentInput += charset[currentLetter];
                }
                if (buttonsHeld > 1) {
                    basic.clearScreen();
                    basic.pause(100);
                }
                buttonsHeld = 0;
                basic.showString(charset[currentLetter]);
            }
        }

    }
}
