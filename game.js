class Game {
    constructor(startingX, startingY, tileSize) {
        this.startingX = startingX
        this.startingY = startingY
        this.tileSize = tileSize
        this.playingField = [] // the playing field that we have
        for (let i = 0; i < 20; i++) {
            this.playingField.push(
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // a row
            )
        }
        this.playingField[19][5] = 1
        this.playingField[19][4] = 1
        this.playingField[18][5] = 1
        this.playingField[18][4] = 1
    }

    /* Description: Displays the entire game. Is the most important function. */
    display() {
        stroke(0, 0, 0)
        strokeWeight(1)
        // vertical lines
        for (let i = 0; i <= 10; i++) {
            line(this.startingX + i*this.tileSize, this.startingY,
                this.startingX + i*this.tileSize, this.startingY +
                20*this.tileSize)
        }
        // horizontal lines
        for (let i = 0; i <= 20; i++) {
            line(this.startingX, this.startingY + i*this.tileSize,
                this.startingX + 10*this.tileSize, this.startingY +
                i*this.tileSize)
        }

        stroke(0, 0, 100)
        fill(0, 0, 100)
        // for each row
        let colIndex = 0
        for (let row of this.playingField) {
            // for each cell
            let rowIndex = 0
            for (let cell of row) {
                // if the cell exists there...
                if (cell) {
                    // draw it!
                    rect(this.startingX + rowIndex*this.tileSize + 2,
                         this.startingY + colIndex*this.tileSize + 2,
                         this.startingX + rowIndex*this.tileSize + this.tileSize - 2,
                         this.startingY + colIndex*this.tileSize + this.tileSize - 2)
                }
                rowIndex++
            }
            colIndex++
        }
    }
}