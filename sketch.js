/**
 *  @author
 *  @date 2023.
 *
 */

let font
let fixedWidthFont
let variableWidthFont
let instructions
let debugCorner /* output debug text in the bottom left corner of the canvas */
let startingX /* the x-position of the leftmost line */
let startingY /* the y-position of the topmost line */
let tileSize /* the size of each Tetris tile. */
let game /* what are we going to be displaying? a game. */
let direction /* what direction are we currently travelling? */


function preload() {
    font = loadFont('data/consola.ttf')
    fixedWidthFont = loadFont('data/consola.ttf')
    variableWidthFont = loadFont('data/meiryo.ttf')
}


function setup() {
    let cnv = createCanvas(800, 700)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        numpad 1 → freeze sketch
        . → rotate left
        , → rotate right
        ↑ → hard drop
        ↓ → soft drop
        → → move right
        ← → move left</pre>`)

    debugCorner = new CanvasDebugCorner(5)

    // start a game of any mode (random)
    game = new Game(20, random(["tetris", "tritis", "pentis", "all", "random"]))
}


function draw() {
    background(234, 34, 24)

    // display the game
    game.display()

    // reset the frames until down
    game.framesUntilDown = game.framesUntilDownDefault

    // if the direction is left, move left every 7 frames
    if (direction === 'left' &&
        frameCount % 7 === 0) {
        game.moveLeft()
    }

    // if the direction is right, move right every 7 frames
    if (direction === 'right' &&
        frameCount % 7 === 0) {
        game.moveRight()
    }

    // if the direction is down, then set the frames until down to 7 and use
    // it for the next frame
    if (direction === 'down') {
        game.framesUntilDown = 7
    }

    /* debugCorner needs to be last so its z-index is highest */
    debugCorner.setText(`frameCount: ${frameCount}`, 2)
    debugCorner.setText(`fps: ${frameRate().toFixed(0)}`, 1)
    debugCorner.showBottom()

    if (frameCount > 30000) /* stop refreshing the screen after 30s */
        noLoop()
}


function mousePressed() {
    // create a game for Tritis
    if (mouseX > 30 &&
        mouseX < 150 &&
        mouseY > 50 &&
        mouseY < 90) {
        game = new Game(20, "tritis")
    }

    // create a game for Tetris
    if (mouseX > 30 &&
        mouseX < 150 &&
        mouseY > 120 &&
        mouseY < 160) {
        game = new Game(20, "tetris")
    }

    // create a game for Pentis
    if (mouseX > 30 &&
        mouseX < 150 &&
        mouseY > 190 &&
        mouseY < 230) {
        game = new Game(20, "pentis")
    }

    // create a game for All
    if (mouseX > 30 &&
        mouseX < 150 &&
        mouseY > 260 &&
        mouseY < 300) {
        game = new Game(20, "all")
    }

    // create a game for Random
    if (mouseX > 30 &&
        mouseX < 150 &&
        mouseY > 330 &&
        mouseY < 370) {
        game = new Game(20, "random")
    }
}

function keyPressed() {
    /* stop sketch */
    if (keyCode === 97) { /* numpad 1 */
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }

    // only if the game is not paused are the keys registered
    if (!game.paused) {
        /* move left */
        if (keyCode === LEFT_ARROW) {
            direction = 'left'
        }

        /* move right */
        if (keyCode === RIGHT_ARROW) {
            direction = 'right'
        }

        /* move down */
        if (keyCode === DOWN_ARROW) {
            direction = 'down'
        }

        /* drops every frame */
        if (keyCode === UP_ARROW) {
            game.setInPlace()
        }

        /* rotates left */
        if (key === '.') {
            game.rotateLeft()
        }

        /* rotates right */
        if (key === ',') {
            game.rotateRight()
        }

        /* holds the piece */
        if (key === '\\') {
            game.hold()
        }

        /* rotates twice instantly */
        if (key === ';') {
            game.rotateTwice()
        }
    }

    /* toggles pause */
    if (keyCode === 27) {
        game.pause()
    }

    if (key === '`') { /* toggle debug corner visibility */
        debugCorner.visible = !debugCorner.visible
        console.log(`debugCorner visibility set to ${debugCorner.visible}`)
    }
}

function keyReleased() {
    // if a key has been released, then there should be no direction.
    direction = 'none'
}


/** 🧹 shows debugging info using text() 🧹 */
class CanvasDebugCorner {
    constructor(lines) {
        this.visible = true
        this.size = lines
        this.debugMsgList = [] /* initialize all elements to empty string */
        for (let i in lines)
            this.debugMsgList[i] = ''
    }

    setText(text, index) {
        if (index >= this.size) {
            this.debugMsgList[0] = `${index} ← index>${this.size} not supported`
        } else this.debugMsgList[index] = text
    }

    showBottom() {
        if (this.visible) {
            noStroke()
            textFont(fixedWidthFont, 14)

            const LEFT_MARGIN = 10
            const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
            const LINE_SPACING = 2
            const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING

            /* semi-transparent background */
            fill(0, 0, 0, 10)
            rectMode(CORNERS)
            const TOP_PADDING = 3 /* extra padding on top of the 1st line */
            rect(
                0,
                height,
                width,
                DEBUG_Y_OFFSET - LINE_HEIGHT * this.debugMsgList.length - TOP_PADDING
            )

            fill(0, 0, 100, 100) /* white */
            strokeWeight(0)

            for (let index in this.debugMsgList) {
                const msg = this.debugMsgList[index]
                text(msg, LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT * index)
            }
        }
    }

    showTop() {
        if (this.visible) {
            noStroke()
            textFont(fixedWidthFont, 14)

            const LEFT_MARGIN = 10
            const TOP_PADDING = 3 /* extra padding on top of the 1st line */

            /* offset from top of canvas */
            const DEBUG_Y_OFFSET = textAscent() + TOP_PADDING
            const LINE_SPACING = 2
            const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING

            /* semi-transparent background, a console-like feel */
            fill(0, 0, 0, 10)
            rectMode(CORNERS)

            rect( /* x, y, w, h */
                0,
                0,
                width,
                DEBUG_Y_OFFSET + LINE_HEIGHT*this.debugMsgList.length/*-TOP_PADDING*/
            )

            fill(0, 0, 100, 100) /* white */
            strokeWeight(0)

            textAlign(LEFT)
            for (let i in this.debugMsgList) {
                const msg = this.debugMsgList[i]
                text(msg, LEFT_MARGIN, LINE_HEIGHT*i + DEBUG_Y_OFFSET)
            }
        }
    }
}