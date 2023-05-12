/* Lily Demos
 * Endless Runner
 * Hours Spent: 5
 * Creative Tilt: first time making music :O
 * 
 * to add to credits (delete here later): 
 * https://fonts.google.com/specimen/Kanit?category=Serif,Sans+Serif,Display,Monospace&subset=latin&noto.script=Latn
*/

let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    autoCenter: true,
    backgroundColor: "4b3e8a",
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