class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio("music", "./assets/industrial_loop.wav");
        this.load.image("gear", "./assets/gear.png");
    }

    create() {
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.gearLeft = this.add.image(this.game.config.width / 5, 200, "gear").setOrigin(0.5).setScale(0.5);
        this.gearRight = this.add.image(this.game.config.width * 4 / 5, 200, "gear").setOrigin(0.5).setScale(0.5);

        let menuConfig = {
            fontFamily: "Kanit",
            fontSize: "32px",
            color: "#e3cc1e",
            align: "center",
            stroke: "#2b2b2b",
            strokeThickness: 20
        };
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, "How to Play: Press UP", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 200, "Credits: Press DOWN", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "48px";
        this.playButton = this.add.text(game.config.width / 2, game.config.height / 2 + 150, "Press SPACE to Start", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "92px";
        menuConfig.strokeThickness = 40;
        this.add.text(game.config.width / 2, 200, "MECHANIC\nPANIC!", menuConfig).setOrigin(0.5);

        if(highScore > 0) {
            menuConfig.color = "#ae1ee3"
            menuConfig.fontSize = "32px";
            menuConfig.strokeThickness = 10;
            this.add.text(game.config.width / 2, 40, `HIGH SCORE: ${highScore} SECONDS`, menuConfig).setOrigin(0.5);
        }

        this.scaleCounter = 0;
    }

    update() {
        //fluctuate play button
        if(this.scaleCounter >= 0 && this.scaleCounter < 75) {
            this.playButton.setScale(this.playButton.scale + 0.001);
            this.scaleCounter++;
        }
        else if(this.scaleCounter >= 75 && this.scaleCounter < 150) {
            this.playButton.setScale(this.playButton.scale - 0.001);
            this.scaleCounter++;
        }
        else if(this.scaleCounter == 150) {
            this.scaleCounter = 0;
        }

        this.gearLeft.angle += 0.5;
        this.gearRight.angle -= 0.5;

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start("playScene");
        }
    }
}