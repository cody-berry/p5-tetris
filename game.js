class Game {
    constructor(tileSize, gameMode) {
        this.tileSize = tileSize

        // board width and board height initialization
        // tetris is a 10x20 grid
        this.boardWidth = 10
        this.boardHeight = 20

        // pentis is a 14x27 grid
        if (gameMode === "pentis") {
            this.boardWidth = 14
            this.boardHeight = 27
        }

        // tritis is a 8x15 grid
        if (gameMode === "tritis") {
            this.boardWidth = 8
            this.boardHeight = 15
        }

        // all pieces is a 17x30 grid
        if (gameMode === "all") {
            this.boardWidth = 17
            this.boardHeight = 30
        }

        // random starter blocks is a 16x35 grid
        if (gameMode === "random") {
            this.boardWidth = 16
            this.boardHeight = 35
        }

        // y starts at the tile size.
        this.startingY = this.tileSize

        /* x is positioned such that the board is centered in the middle of the
           grid. since there are 5 lines to the left, 5 tileSizes should be removed
           from width/2. */
        this.startingX = width/2 - this.tileSize*(this.boardWidth/2)
        this.playingField = [] // the playing field that we have
        for (let i = 0; i < this.boardHeight; i++) {
            let row = []
            for (let j = 0; j < this.boardWidth; j++) {
                row.push([0, [0, 0, 0]])
            }
            this.playingField.push(row)
        }

        this.framesUntilDownDefault = 70
        this.framesUntilDown = this.framesUntilDownDefault

        // tetris pieces
        if (gameMode === "tetris") {

            // classic Tetris: the Tetris pieces
            this.piecesList = [
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, -1], [0, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
                [[[-1, 0], [-1, -1], [0, -1], [1, -1]], [6, 54, 85]], // j block
                [[[-1, 0], [0, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
                [[[-1, 1], [0, 1], [0, 0], [1, 0]], [89, 100, 58]], // z block
                [[[-1, 0], [0, 0], [-1, 1], [0, 1]], [48, 89, 85]], // o block
                [[[-1, 0], [0, 0], [0, 1], [1, 0]], [329, 62, 81]] // t block
            ]
        }
        // tritis pieces
        if (gameMode === "tritis") {

            // Tritis: the Tetris pieces with holes added
            this.piecesList = [
                [[[-1, 0], [0, 0], [1, 0]], [188, 83, 65]], // i block (common)
                [[[-1, 0], [0, 0], [1, 0]], [188, 83, 65]], // i block (common)
                [[[-1, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
                [[[-1, 0], [-1, -1], [1, -1]], [6, 54, 85]], // j block
                [[[-1, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
                [[[-1, 1], [0, 1], [1, 0]], [89, 100, 58]], // z block
                [[[-1, 0], [-1, 1], [0, 1]], [48, 89, 85]], // o block
                [[[-1, 0], [0, 1], [1, 0]], [329, 62, 81]] // t block
            ]
        }
        // pentis pieces
        if (gameMode === "pentis") {

            // Pentis: A few Pentis pieces that either share properties with
            // Tetris or are just Tetris pieces with one extra block
            this.piecesList = [
                [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-2, -1], [-1, -1], [0, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
                [[[-1, 0], [-1, -1], [0, -1], [1, -1], [2, -1]], [6, 54, 85]], // j block
                [[[-2, 0], [-1, 0], [0, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
                [[[-1, 1], [0, 1], [0, 0], [1, 0], [2, 0]], [89, 100, 58]], // z block
                [[[-1, 0], [0, 1], [0, 0], [0, -1], [1, 0]], [48, 89, 85]], // + block
                [[[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0]], [329, 62, 81]] // [ block
            ]
        }
        // all pieces included
        if (gameMode === "all") {

            // All pieces included: A combination of Tetris, Tritis, and Pentis.
            this.piecesList = [
                // Tetris pieces
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, -1], [0, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
                [[[-1, 0], [-1, -1], [0, -1], [1, -1]], [6, 54, 85]], // j block
                [[[-1, 0], [0, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
                [[[-1, 1], [0, 1], [0, 0], [1, 0]], [89, 100, 58]], // z block
                [[[-1, 0], [0, 0], [-1, 1], [0, 1]], [48, 89, 85]], // o block
                [[[-1, 0], [0, 0], [0, 1], [1, 0]], [329, 62, 81]], // t block
                // Pentis pieces
                [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [201, 96, 83]], // i block (common)
                [[[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]], [201, 96, 83]], // i block (common)
                [[[-2, -1], [-1, -1], [0, -1], [1, -1], [1, 0]], [216, 78, 100]], // l block
                [[[-1, 0], [-1, -1], [0, -1], [1, -1], [2, -1]], [22, 49, 87]], // j block
                [[[-2, 0], [-1, 0], [0, 0], [0, 1], [1, 1]], [360, 54, 87]], // s block
                [[[-1, 1], [0, 1], [0, 0], [1, 0], [2, 0]], [89, 70, 72]], // z block
                [[[-1, 0], [0, 1], [0, 0], [0, -1], [1, 0]], [45, 37, 91]], // + block
                [[[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0]], [329, 41, 81]], // [ block
                // Tritis pieces
                [[[-1, 0], [0, 0], [1, 0]], [188, 100, 83]], // i block (common)
                [[[-1, 0], [0, 0], [1, 0]], [188, 100, 83]], // i block (common)
                [[[-1, -1], [1, -1], [1, 0]], [216, 100, 74]], // l block
                [[[-1, 0], [-1, -1], [1, -1]], [22, 89, 100]], // j block
                [[[-1, 0], [0, 1], [1, 1]], [360, 96, 71]], // s block
                [[[-1, 1], [0, 1], [1, 0]], [89, 100, 84]], // z block
                [[[-1, 0], [-1, 1], [0, 1]], [48, 100, 68]], // o block
                [[[-1, 0], [0, 1], [1, 0]], [329, 87, 96]] // t block
            ]
        }
        // tetris pieces with 30 blocks in the bottom 5 rows and 1 line clear
        // until new blocks spawn
        if (gameMode === "random") {
            // initializing Tetris pieces
            this.piecesList = [
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, 0], [0, 0], [1, 0], [2, 0]], [188, 83, 65]], // i block (common)
                [[[-1, -1], [0, -1], [1, -1], [1, 0]], [216, 96, 98]], // l block
                [[[-1, 0], [-1, -1], [0, -1], [1, -1]], [6, 54, 85]], // j block
                [[[-1, 0], [0, 0], [0, 1], [1, 1]], [360, 66, 78]], // s block
                [[[-1, 1], [0, 1], [0, 0], [1, 0]], [89, 100, 58]], // z block
                [[[-1, 0], [0, 0], [-1, 1], [0, 1]], [48, 89, 85]], // o block
                [[[-1, 0], [0, 0], [0, 1], [1, 0]], [329, 62, 81]] // t block
            ]

            // initializing 30 random blocks
            for (let i = 0; i < 30; i++) {

                // make sure that 2 random blocks don't spawn in the same place!
                let foundPlace = false
                while (!foundPlace) {

                    // colIndex is in bottom 5 rows. since only in use for
                    // the random gameMode, the list can be hardcoded
                    let colIndex = random([30, 31, 32, 33, 34])

                    // rowIndex spans all the board.
                    let rowIndex = random([0, 1, 2, 3, 4,
                                           5, 6, 7, 8, 9,
                                           10, 11, 12, 13, 14, 15])
                    let hue = random(0, 360)

                    if (this.playingField[colIndex][rowIndex][0] === 0) {
                        foundPlace = true

                        // not only do these pieces have a random position,
                        // they also have a random hue
                        this.playingField[colIndex][rowIndex] = [1, [hue, 50, 100]]
                    }
                }
            }

            // how many lines until random blocks are there at the start?
            this.linesUntilRandomBlocksDefault = 1

            // how many lines until random blocks are there at the start?
            // (note this one changes)
            this.linesUntilRandomBlocks = 1

            // how many numbers are spawned?
            this.numberOfBlocksSpawned = 5

            // how many rows are available to spawn random blocks for?
            this.rowRange = 5

            // tiles will be too big normally
            this.tileSize -= 3
        }

        this.currentPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.currentPiecePos = [floor(this.boardWidth/2), 1] // x-pos, y-pos
        this.currentPieceColor = this.currentPiece.pop()
        // there's an extra list casing!
        this.currentPiece = this.currentPiece[0]

        // holded piece starts like the current piece.
        this.holdedPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.holdedPiecePos = [4, 1] // x-pos, y-pos
        this.holdedPieceColor = this.holdedPiece.pop()
        // there's an extra list casing!
        this.holdedPiece = this.holdedPiece[0]


        // define the next piece
        this.nextPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.nextPieceColor = this.nextPiece.pop()
        // there's an extra list casing!
        this.nextPiece = this.nextPiece[0]

        this.paused = false
        this.failed = false
    }

    /* Description: Clears lines. */
    checkLines() {
        let colIndex = this.boardHeight - 1
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
            for (let i = 0; i < this.boardWidth; i++) {
                row.push([0, [0, 0, 100]])
            }
            // if there is a line clear, remove the line
            if (lineClear) {
                this.playingField[colIndex] = row
                shift++
                this.framesUntilDownDefault--
                this.framesUntilDown = this.framesUntilDownDefault
            }

            // otherwise, shift the line down by how many lines are cleared
            else {
                this.playingField[colIndex + shift] = this.playingField[colIndex]
                if (shift > 0) {
                    this.playingField[colIndex] = row
                }
            }
            colIndex--
        }

        // if the number of line clears left until random blocks spawn is
        // now 0 after updating for each line, spawn more random locks
        if (this.linesUntilRandomBlocks) {

            // the total number of line clears is also equal to shift
            // because shift is designed to be the number of line clears
            this.linesUntilRandomBlocks -= shift
            if (this.linesUntilRandomBlocks <= 0) {
                for (let i = 0; i < this.numberOfBlocksSpawned; i++) {

                    // careful: we don't want two blocks to spawn in the
                    // same place!
                    let foundPlace = false
                    while (!foundPlace) {

                        // use the range function to determine the columns
                        // that the block can spawn in
                        let colIndex = random(this.range(35-this.rowRange, 35))

                        // spawn in any of the rows
                        let rowIndex = random([0, 1, 2, 3, 4, 5,
                                               6, 7, 8, 9, 10, 11,
                                               12, 13, 14, 15])

                        // define the random hue
                        let hue = random(0, 360)

                        // if it is free, then we have found a place and
                        // then we increment the number of blocks spawned
                        if (this.playingField[colIndex][rowIndex][0] === 0) {
                            foundPlace = true
                            this.playingField[colIndex][rowIndex] = [1, [hue, 50, 100]]
                            this.numberOfBlocksSpawned += 4
                        }
                    }
                }
                this.linesUntilRandomBlocksDefault++

                // extra lines cleared should count as progress to the next one
                this.linesUntilRandomBlocks = this.linesUntilRandomBlocksDefault + this.linesUntilRandomBlocks
                this.rowRange += 1
            }
        }
    }

    /* Description: The Javascript equivalent of Python range. Only used in
     *              checkLines to prevent having to use a for loop. */
    range(startArg, stopArg) {

        // we can't modify arguments
        let start = startArg
        let stop = stopArg

        // reverse stop and start if start is greater than stop
        if (stop < start) {
            let temp = start
            start = stop
            stop = temp
        }

        // make the result
        let result = []
        for (let i = start; i < stop; i++) {
            result.push(i)
        }
        return result
    }

    /* Description: Displays the entire game. Is the most important function.
     *              Not only does it display the game, but it also holds the
     *              mechanism for moving pieces down and displaying buttons to
     *              start different game modes. It also checks lines for you.*/
    display() {
        // display the buttons
        // Tritis:
        fill(0, 0, 30)
        if (mouseX > 30 &&
            mouseX < 150 &&
            mouseY > 50 &&
            mouseY < 90) {
            fill(0, 0, 20)
        }
        noStroke()
        rect(30, 50, 150, 90)
        textSize(35)
        textAlign(CENTER, CENTER)
        fill(0, 0, 100)
        text("TRITIS", 90, 70)

        // Tetris:
        fill(0, 0, 30)
        if (mouseX > 30 &&
            mouseX < 150 &&
            mouseY > 120 &&
            mouseY < 160) {
            fill(0, 0, 20)
        }
        rect(30, 120, 150, 160)
        fill(0, 0, 100)
        text("TETRIS", 90, 140)

        // Pentis:
        fill(0, 0, 30)
        if (mouseX > 30 &&
            mouseX < 150 &&
            mouseY > 190 &&
            mouseY < 230) {
            fill(0, 0, 20)
        }
        rect(30, 190, 150, 230)
        fill(0, 0, 100)
        text("PENTIS", 90, 210)

        // All:
        fill(0, 0, 30)
        if (mouseX > 30 &&
            mouseX < 150 &&
            mouseY > 260 &&
            mouseY < 300) {
            fill(0, 0, 20)
        }
        rect(30, 260, 150, 300)
        fill(0, 0, 100)
        text("ALL", 90, 280)

        // Random:
        fill(0, 0, 30)
        if (mouseX > 30 &&
            mouseX < 150 &&
            mouseY > 330 &&
            mouseY < 370) {
            fill(0, 0, 20)
        }
        rect(30, 330, 150, 370)
        fill(0, 0, 100)
        text("RANDOM", 90, 350)
        textAlign(LEFT)


        this.checkLines()
        stroke(0, 0, 0)
        strokeWeight(1)

        // vertical lines
        for (let i = 0; i <= this.boardWidth; i++) {
            line(this.startingX + i*this.tileSize, this.startingY,
                this.startingX + i*this.tileSize, this.startingY +
                this.boardHeight*this.tileSize)
        }

        // horizontal lines
        for (let i = 0; i <= this.boardHeight; i++) {
            line(this.startingX, this.startingY + i*this.tileSize,
                this.startingX + this.boardWidth*this.tileSize, this.startingY +
                i*this.tileSize)
        }

        // make the block go down. if it doesn't, then set it in place
        if (frameCount % this.framesUntilDown === 0 && !this.paused) {
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
                    // draw the cell! make sure to fill it with its color in
                    // cell[1].
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
        // set the color
        let color = this.currentPieceColor
        fill(color[0], color[1], color[2])

        for (let cell of this.currentPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]

            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]

            // draw the block!
            rect(this.startingX + rowIndex*this.tileSize + 1,
                this.startingY + colIndex*this.tileSize + 1,
                this.startingX + rowIndex*this.tileSize + this.tileSize - 1,
                this.startingY + colIndex*this.tileSize + this.tileSize - 1)
        }

        // display the center. useful when preforming rotation tricks
        stroke(0, 0, 100)
        noFill()
        circle(this.startingX + this.currentPiecePos[0]*this.tileSize + this.tileSize/2,
               this.startingY + this.currentPiecePos[1]*this.tileSize + this.tileSize/2,
               this.tileSize - 6)

        // display the next figure
        color = this.nextPieceColor
        fill(color[0], color[1], color[2])
        noStroke()
        // the next figure will be displayed at (30*tileSize, 2*tileSize)
        let x = 30
        let y = 2
        for (let cell of this.nextPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = y - cell[1]

            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = x + cell[0]

            // draw the block!
            rect(rowIndex*this.tileSize + 1,
                colIndex*this.tileSize + 1,
                rowIndex*this.tileSize + this.tileSize - 1,
                colIndex*this.tileSize + this.tileSize - 1)
        }

        // display the ghost
        // make a current piece copy to set the current piece back to once
        // we're done
        let currentPiecePosCopy = [...this.currentPiecePos]

        // move down all the way while making sure that the piece is still
        // acceptable
        while (this.checkBorders()) {
            this.currentPiecePos[1]++
        }

        // by the time we didn't make the check, we would've advanced one
        // too far and we should bring it back one
        this.currentPiecePos[1]--

        // instead of the normal draw process of filling, here we are just
        // there to display the outlines
        noFill()
        stroke(0, 0, 50)
        strokeWeight(2)
        for (let cell of this.currentPiece) {

            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]

            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]

            // draw the block!
            rect(this.startingX + rowIndex*this.tileSize,
                this.startingY + colIndex*this.tileSize,
                this.startingX + rowIndex*this.tileSize + this.tileSize,
                this.startingY + colIndex*this.tileSize + this.tileSize)
        }

        // set it back now
        this.currentPiecePos = currentPiecePosCopy

        // display the holded piece, basically the same as displaying the
        // next piece
        // set the color
        color = this.holdedPieceColor
        fill(color[0], color[1], color[2])
        noStroke()

        // the holded figure will be displayed at (10*tileSize, 2*tileSize)
        x = 10
        y = 2

        for (let cell of this.holdedPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = y - cell[1]

            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = x + cell[0]

            // draw the block!
            rect(rowIndex*this.tileSize + 1,
                colIndex*this.tileSize + 1,
                rowIndex*this.tileSize + this.tileSize - 1,
                colIndex*this.tileSize + this.tileSize - 1)
        }

        // if the system is paused, display a translucent shade of grey over the
        // screen and display PAUSED in the middle
        if (this.paused && !this.failed) {
            fill(0, 0, 25, 35)
            rect(0, 0, width, height)
            fill(0, 0, 100)
            textSize(60)
            textAlign(CENTER, CENTER)
            text("PAUSED", width/2, height/2)
        }

        // if the game has been failed, display a grey screen that is more
        // opaque and FAILED instead of PAUSED in the center
        if (this.failed) {
            fill(0, 0, 25, 50)
            rect(0, 0, width, height)
            fill(0, 0, 100)
            textSize(100)
            textAlign(CENTER, CENTER)
            text("FAILED", width/2, height/2)
            if (this.paused) {
                textSize(50)
                textAlign(LEFT, TOP)
                text("PAUSED", 0, 0)
            }
        }

        // display how many lines left until random blocks spawn if in the
        // Random mode
        fill(0, 0, 100)
        if (this.linesUntilRandomBlocks) {
            textSize(20)
            textAlign(LEFT, TOP)
            text(this.linesUntilRandomBlocks + "/" +
                 this.linesUntilRandomBlocksDefault + " lines left until",
                 10, 400)
            text("random blocks spawn",
                 10, 425)
        }
    }

    moveLeft() {
        // make a copy of the current piece in case the move doesn't work
        let currentPiecePosCopy = [...this.currentPiecePos]

        // moves the center position one to the left
        this.currentPiecePos[0]--

        // although usually it moves right to counteract, if this doesn't work,
        // we can always just revert to the original position
        if (!this.checkBorders()) {
            this.currentPiecePos = currentPiecePosCopy
        }
    }

    moveRight() {
        // make a copy of the current piece in case the move doesn't work
        let currentPiecePosCopy = [...this.currentPiecePos]

        // moves the center position one to the right
        this.currentPiecePos[0]++

        // although usually it moves left to counteract, if this doesn't work,
        // we can always just revert to the original position
        if (!this.checkBorders()) {
            this.currentPiecePos = currentPiecePosCopy
        }
    }

    /* Description: Swaps the current piece with the holded piece.
     */
    hold() {
        // switch pieces and reset current piece position
        let temp = JSON.parse(JSON.stringify(this.currentPiece))
        this.currentPiece = JSON.parse(JSON.stringify(this.holdedPiece))
        this.holdedPiece = temp
        this.currentPiecePos = [floor(this.boardWidth/2), 1]

        // switch the colors as well
        temp = JSON.parse(JSON.stringify(this.currentPieceColor))
        this.currentPieceColor = JSON.parse(JSON.stringify(this.holdedPieceColor))
        this.holdedPieceColor = temp
    }

    // returns true of piece is allowed; returns false if not
    checkBorders() {
        for (let cell of this.currentPiece) {
            // the y-pos is the y-pos of the piece minus the y-pos of the offset
            let colIndex = this.currentPiecePos[1] - cell[1]

            // the x-pos is the x-pos of the piece plus the x-pos of the offset
            let rowIndex = this.currentPiecePos[0] + cell[0]

            // if the cell goes to one of the borders...
            // left: just move right
            if (rowIndex < 0) {
                this.moveRight()
                return this.checkBorders()
            }

            // right: just move left
            if (rowIndex > this.boardWidth - 1) {
                this.moveLeft()
                return this.checkBorders()
            }

            // down: there's really nothing we can do
            if (colIndex > this.boardHeight - 1) {
                return false
            }

            // up: simple, just move down once!
            if (colIndex < 0) {
                this.currentPiecePos[1]++
                return this.checkBorders()
            }

            // if the playing field intersects with the piece, the move is not
            // valid
            if (this.playingField[colIndex][rowIndex][0]) {
                return false
            }
        }

        // if each cell has passed each check (borders and intersection)
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

        // the current piece is no longer there so now it has to be the next
        // piece (same for the color)
        this.currentPiece = this.nextPiece
        this.currentPieceColor = this.nextPieceColor

        // reset the position
        this.currentPiecePos = [4, 1] // x-pos, y-pos

        // define the next piece
        this.nextPiece = JSON.parse(JSON.stringify(random(this.piecesList)))
        this.nextPieceColor = this.nextPiece.pop()

        // there's an extra list casing!
        this.nextPiece = this.nextPiece[0]

        // if the piece isn't acceptable, the game has been failed
        if (!this.checkBorders()) {
            game.failed = true
            game.paused = true

        }
    }

    rotateLeft() {
        // make a deep copy of the current piece
        let currentPieceCopy =
            JSON.parse(JSON.stringify(this.currentPiece))

        // initialize the rotation process
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

        // if the piece either intersects with the figure or goes out of
        // bounds and cannot be fixed, then we un-rotate the piece
        if (!this.checkBorders()) {
            this.currentPiece = currentPieceCopy
        }
    }

    rotateRight() {
        // make a deep copy of the current piece
        let currentPieceCopy =
            JSON.parse(JSON.stringify(this.currentPiece))

        let i = 0
        // initialize the rotation process
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

    /* rotates twice. may come in handy when filling in holes. */
    rotateTwice() {
        // create a deep copy of the piece
        let currentPieceCopy =
            JSON.parse(JSON.stringify(this.currentPiece))
        let i = 0
        for (let cell of this.currentPiece) {
            // up rotates to down
            let cellY = cell[1]
            // right rotates to left
            let cellX = cell[0]

            this.currentPiece[i][1] = -cellY
            this.currentPiece[i][0] = -cellX
            i++
        }
        if (!this.checkBorders()) {
            this.currentPiece = currentPieceCopy
        }
    }

    /* toggles the pause. */
    pause() {
        this.paused = !this.paused
    }
}