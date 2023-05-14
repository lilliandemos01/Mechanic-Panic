class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        var cam = this.cameras.main;
        var targetScene = this.scene.get("menuScene");
        var targetCam = targetScene.cameras.main;
        var defaultHeight = this.cameras.default.height;

        //sliding scene transition back to menu
        this.input.keyboard.on(
            "keydown-UP",
            function () {
              this.scene.transition({
                target: "menuScene",
                sleep: true,
                duration: 2000,
                onUpdate: function (progress) {
                  const t = Phaser.Math.Easing.Quadratic.InOut(progress);
                  cam.setViewport(0, t * defaultHeight, cam.width, (1 - t) * defaultHeight);
                  targetCam.setViewport(0, 0, targetCam.width, t * defaultHeight);
                  targetCam.setScroll(0, (1 - t) * defaultHeight);
                }
              });
            },
            this);

        let creditsConfig = {
            fontFamily: "Kanit",
            fontSize: "48px",
            color: "#e3cc1e",
            align: "center",
            stroke: "#2b2b2b",
            strokeThickness: 10
        }
        this.add.text(game.config.width / 2, 240, "CREDITS", creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height - 100, "THANKS FOR PLAYING!", creditsConfig).setOrigin(0.5);
        creditsConfig.fontSize = "24px";
        this.add.text(game.config.width / 2, game.config.height - 40, "Press UP to Return to Title Screen", creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 340, "Mechanic Panic is by Lily Demos including all art and music\nFont is Kanit-Bold by Cadson Demak from Google Fonts", 
                      creditsConfig).setOrigin(0.5);
    }
}