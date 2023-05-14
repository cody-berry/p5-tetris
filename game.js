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
        this.playingField[0][0] = 1
        this.playingField[0][1] = 1
        this.playingField[0][8] = 1
        this.playingField[0][9] = 1
        this.playingField[1][0] = 1
        this.playingField[1][9] = 1
        this.playingField[2][0] = 1
        this.playingField[2][9] = 1
        this.playingField[3][0] = 1
        this.playingField[3][9] = 1
        this.playingField[4][0] = 1
        this.playingField[4][9] = 1
        this.playingField[5][0] = 1
        this.playingField[5][9] = 1
        this.playingField[6][0] = 1
        this.playingField[6][9] = 1
        this.playingField[7][0] = 1
        this.playingField[7][9] = 1
        this.playingField[8][0] = 1
        this.playingField[8][9] = 1
        this.playingField[9][0] = 1
        this.playingField[9][9] = 1
        this.playingField[10][0] = 1
        this.playingField[10][9] = 1
        this.playingField[11][0] = 1
        this.playingField[11][9] = 1
        this.playingField[12][9] = 1
        this.playingField[12][0] = 1
        this.playingField[13][9] = 1
        this.playingField[13][0] = 1
        this.playingField[14][9] = 1
        this.playingField[14][0] = 1
        this.playingField[15][9] = 1
        this.playingField[15][0] = 1
        this.playingField[16][9] = 1
        this.playingField[16][0] = 1
        this.playingField[17][9] = 1
        this.playingField[17][0] = 1
        this.playingField[18][9] = 1
        this.playingField[18][0] = 1
        this.playingField[19][9] = 1
        this.playingField[19][0] = 1
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
            // if the playing field intersects with the piece, return false
            if (this.playingField[colIndex][rowIndex]) {
                return false
            }
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
        }
        return true
    }
}