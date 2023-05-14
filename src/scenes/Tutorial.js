class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        this.menu_sfx = this.sound.add("menu_sfx", {volume: 0.3});

        var cam = this.cameras.main;
        var targetScene = this.scene.get("menuScene");
        var targetCam = targetScene.cameras.main;
        var defaultHeight = this.cameras.default.height;

        //sliding scene transition back to menu
        this.input.keyboard.on(
            "keydown-DOWN",
            function() {
                this.menu_sfx.play();
                this.scene.transition({
                    target: "menuScene",
                    sleep: true,
                    duration: 750,
                    onUpdate: function (progress) {
                        const t = Phaser.Math.Easing.Quadratic.InOut(progress);
                        cam.setViewport(0, -t * defaultHeight, cam.width, (1 + t) * defaultHeight);
                        targetCam.setViewport(0, 0, targetCam.width, 0);
                        targetCam.setScroll(0, -(1 - t) * defaultHeight);   
                    }
                });
            },this);

        let tutorialConfig = {
            fontFamily: "Kanit",
            fontSize: "30px",
            color: "#e3cc1e",
            align: "center",
            stroke: "#2b2b2b",
            strokeThickness: 20
        }
        this.add.text(game.config.width / 2, 100, "CONGRATULATIONS [EMPLOYEE],\nYOU HAVE BEEN CHOSEN FOR THIS YEARS SACRIFICE.\nMAY YOUR ASHES BRING US PROSPERITY.", tutorialConfig).setOrigin(0.5);
        tutorialConfig.fontSize = "24px";
        tutorialConfig.strokeThickness = 10;
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, "Avoid the Crates \nto postpone your demise", tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 60, "Press UP and DOWN\nto move between conveyor belts", tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 160, "Press SPACE\nto jump over crates", tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height - 40, "Press DOWN to Return to Title Screen", tutorialConfig).setOrigin(0.5);
    }
}