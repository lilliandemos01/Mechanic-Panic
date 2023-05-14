class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        this.add.text(400 , 300, "tutorial");
    }
}