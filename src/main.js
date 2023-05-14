/* Lily Demos
 * Mechanic Panic
 * Hours Spent: 20
 * Creative Tilt: Something technical: 
 *                I figured out how to do a sliding scene transitions here https://codepen.io/samme/pen/RwoBGjZ?editors=0010
 *                I went through the (uncommented) code to figure out how it worked and then adjusted it for my specific needs.
 *                It works a lot differently to the tilemap scroll that Nathan showed, due to scrolling between seperate scenes.
 *                Located at the start of the start of the create functions for Menu.js, Credits.js, and Tutorial.js
 *                Something artistic:
 *                
 *                 
 * 
 * to add to credits (delete here later): 
 * https://fonts.google.com/specimen/Kanit?category=Serif,Sans+Serif,Display,Monospace&subset=latin&noto.script=Latn
*/

let config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    autoCenter: true,
    backgroundColor: "#7d4651",
    physics: {
        default: "arcade",
        debug: false,
        gravity: {
            x: 0,
            y: 0
        }
    },
    scene: [Menu, Play, Tutorial, Credits]
};

let game = new Phaser.Game(config)

//keyboard vars
let keyUp, keyDown, keySpace;

let highScore = 0;
let difficulty = 0;