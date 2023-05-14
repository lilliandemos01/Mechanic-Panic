/* Lily Demos
 * Mechanic Panic
 * Hours Spent: 28
 * Creative Tilt: Something technical: 
 *                I figured out how to do a sliding scene transitions here https://codepen.io/samme/pen/RwoBGjZ?editors=0010
 *                I went through the (uncommented) code to figure out how it worked and then adjusted it for my specific needs.
 *                It works a lot differently to the tilemap scroll that Nathan showed, due to scrolling between seperate scenes.
 *                Located at the start of the start of the create functions for Menu.js, Credits.js, and Tutorial.js
 *                
 *                Something artistic:
 *                Overall I think I created a a lot of feelings of anxiety and dread thanks to the music that i made as well as
 *                the speedup of said music along with the speed of the crates and gear in the background. I would also like to
 *                mention the death animation because I think it turned out well and it makes me really uncomfortable (good!)
 *                The speedup is loacted in multiple places including near the start of Play.js update, Conveyor.js update, 
 *                and Crate.js update. Death stuff happens in the death function in Play.js
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