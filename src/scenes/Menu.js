class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio("music", "./assets/industrial_loop.wav");
    }

    create() {
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let menuConfig = {
            fontFamily: "Kanit",
            fontSize: "32px",
            color: "#e3cc1e",
            align: "center",
            stroke: "#707070",
            strokeThickness: 20
        };
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, "How to Play: Press UP", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 200, "Credits: Press DOWN", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "48px";
        this.add.text(game.config.width / 2, game.config.height / 2 + 150, "Press SPACE to Start", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "92px";
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start("playScene");
        }
    }
}