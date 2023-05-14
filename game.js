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
        this.piecesList = [
            [[-1, 0], [0, 0], [1, 0], [2, 0]], // i block
            [[-1, -1], [0, -1], [1, -1], [1, 0]], // l block
            [[-1, 0], [-1, -1], [0, -1], [1, -1]], // j block
            [[-1, 0], [0, 0], [0, 1], [1, 1]], // s block
            [[-1, 1], [0, 1], [0, 0], [1, 0]], // z block
            [[-1, 0], [0, 0], [-1, 1], [0, 1]], // o block
            [[-1, 0], [0, 0], [0, 1], [1, 0]] // t block
        ]
        this.currentPiece = random(this.piecesList)
        this.currentPiecePos = [4, 1] // x-pos, y-pos
        this.framesUntilDown = 70
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

        if (frameCount % this.framesUntilDown === 0) {
            let currentPiecePosCopy = [...this.currentPiecePos]
            this.currentPiecePos[1]++ // move down one
            if (!this.checkBorders()) {
                this.currentPiecePos = currentPiecePosCopy
            }
        }

        noStroke()
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
                    rect(this.startingX + rowIndex*this.tileSize + 1,
                         this.startingY + colIndex*this.tileSize + 1,
                         this.startingX + rowIndex*this.tileSize + this.tileSize - 1,
                         this.startingY + colIndex*this.tileSize + this.tileSize - 1)
                }
                rowIndex++
            }
            colIndex++
        }
        // display the current figure
        for (let cell of this.currentPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]
            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]
            // draw it!
            rect(this.startingX + rowIndex*this.tileSize + 1,
                this.startingY + colIndex*this.tileSize + 1,
                this.startingX + rowIndex*this.tileSize + this.tileSize - 1,
                this.startingY + colIndex*this.tileSize + this.tileSize - 1)
        }
    }

    moveLeft() {
        let currentPiecePosCopy = [...this.currentPiecePos]
        this.currentPiecePos[0]--
        if (!this.checkBorders()) {
            this.currentPiecePos = currentPiecePosCopy
        }
    }

    moveRight() {
        let currentPiecePosCopy = [...this.currentPiecePos]
        this.currentPiecePos[0]++
        if (!this.checkBorders()) {
            this.currentPiecePos = currentPiecePosCopy
        }
    }

    // returns true of piece is allowed; returns false if not
    checkBorders() {
        for (let cell of this.currentPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]
            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]
            // if the cell goes to one of the borders, return false
            if (rowIndex < 0) {
                return false
            }
            if (rowIndex > 9) {
                return false
            }
            if (colIndex > 19) {
                return false
            }
            // if the playing field intersects with the piece, return false
            if (this.playingField[colIndex][rowIndex]) {
                return false
            }
        }
        return true
    }
}