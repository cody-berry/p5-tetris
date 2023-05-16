class Game {
    constructor(startingX, startingY, tileSize) {
        this.startingX = startingX
        this.startingY = startingY
        this.tileSize = tileSize
        this.playingField = [] // the playing field that we have
        for (let i = 0; i < 20; i++) {
            let row = []
            for (let j = 0; j < 10; j++) {
                row.push([0, [0, 0, 90]])
            }
            this.playingField.push(row)
        }
        this.piecesList = [
            [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block
            [[[-1, -1], [0, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
            [[[-1, 0], [-1, -1], [0, -1], [1, -1]], [6, 54, 85]], // j block
            [[[-1, 0], [0, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
            [[[-1, 1], [0, 1], [0, 0], [1, 0]], [89, 100, 58]], // z block
            [[[-1, 0], [0, 0], [-1, 1], [0, 1]], [48, 89, 85]], // o block
            [[[-1, 0], [0, 0], [0, 1], [1, 0]], [329, 62, 81]] // t block
        ]
        this.currentPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.currentPiecePos = [4, 1] // x-pos, y-pos
        this.currentPieceColor = this.currentPiece.pop()
        // there's an extra list casing!
        this.currentPiece = this.currentPiece[0]
        this.framesUntilDownDefault = 70
        this.framesUntilDown = this.framesUntilDownDefault
    }

    /* Description: Clears lines. */
    checkLines() {
        let colIndex = 19
        let shift = 0 // how many lines do we shift?
        // iterate through each row
        while (colIndex > -1) {
            // iterate through each line
            let lineClear = true
            for (let cell of this.playingField[colIndex]) {
                // if there isn't a cell filled, then there is no line clear
                if (!cell[0]) {
                    lineClear = false
                }
            }
            let row = []
            for (let i = 0; i < 10; i++) {
                row.push([0, [0, 0, 100]])
            }
            // if there is a line clear, remove the line
            if (lineClear) {
                this.playingField[colIndex] = row
                shift++
                this.framesUntilDownDefault--
                this.framesUntilDown = this.framesUntilDownDefault
            } else { // otherwise, shift it
                this.playingField[colIndex + shift] = this.playingField[colIndex]
                if (shift > 0) {
                    this.playingField[colIndex] = row
                }
            }
            colIndex--
        }
    }

    /* Description: Displays the entire game. Is the most important function. */
    display() {
        this.checkLines()
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
                this.setInPlace()
            }
        }

        noStroke()
        // for each row
        let colIndex = 0
        for (let row of this.playingField) {
            // for each cell
            let rowIndex = 0
            for (let cell of row) {
                // if the cell exists there...
                if (cell[0]) {
                    // draw it!
                    fill(cell[1][0], cell[1][1], cell[1][2])
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
        let color = this.currentPieceColor
        fill(color[0], color[1], color[2])
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
            if (this.playingField[colIndex][rowIndex][0]) {
                return false
            }
        }
        return true
    }

    setInPlace() {
        // move the center down repeatedly and check the borders every time
        while (this.checkBorders()) {
            this.currentPiecePos[1]++
        }
        // add blocks to the playing field
        for (let cell of this.currentPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]
            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]
            // now add it to the playing field
            this.playingField[colIndex-1][rowIndex] = [1, this.currentPieceColor]
        }
        this.currentPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.currentPiecePos = [4, 1] // x-pos, y-pos
        this.currentPieceColor = this.currentPiece.pop()
        this.currentPiece = this.currentPiece[0]
    }

    rotateLeft() {
        let currentPieceCopy =
            JSON.parse(JSON.stringify(this.currentPiece))
        let i = 0
        for (let cell of this.currentPiece) {
            // up rotates to left
            let cellY = cell[1]
            // right rotates to up
            let cellX = cell[0]

            this.currentPiece[i][0] = -cellY
            this.currentPiece[i][1] = cellX
            i++
        }
        if (!this.checkBorders()) {
            this.currentPiece = currentPieceCopy
        }
    }

    rotateRight() {
        let currentPieceCopy =
            JSON.parse(JSON.stringify(this.currentPiece))
        let i = 0
        for (let cell of this.currentPiece) {
            // up rotates to right
            let cellY = cell[1]
            // right rotates to down
            let cellX = cell[0]

            this.currentPiece[i][0] = cellY
            this.currentPiece[i][1] = -cellX
            i++
        }
        if (!this.checkBorders()) {
            this.currentPiece = currentPieceCopy
        }
    }
}