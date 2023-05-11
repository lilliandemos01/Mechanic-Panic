/* Lily Demos
 * Endless Runner
 * Hours Spent: 5
 * Creative Tilt: first time making music :O
*/

let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    autoCenter: true,
    physics: {
        default: "arcade",
        debug: false,
        gravity: {
            x: 0,
            y: 0
        }
    },
    scene: [Menu, Play]
};

let game = new Phaser.Game(config)

//keyboard vars
let keyUp, keyDown, keySpace;

let highScore = 0;
let difficulty = 0;