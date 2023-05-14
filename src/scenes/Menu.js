class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio("music", "./assets/industrial_loop.wav");
        this.load.image("gear", "./assets/gear.png");
    }

    create() {
        //sliding scene transition set up
        this.scene.launch("tutorialScene").sleep("tutorialScene");
        this.scene.launch("creditsScene").sleep("creditsScene");

        var cam = this.cameras.main;
        var targetScene1 = this.scene.get("tutorialScene");
        var targetScene2 = this.scene.get("creditsScene");
        var targetCam1 = targetScene1.cameras.main;
        var targetCam2 = targetScene2.cameras.main;
        var defaultHeight = this.cameras.default.height;
        
        //sliding scene transition to tutorial
        this.input.keyboard.on(
            "keydown-UP",
            function () {
              this.scene.transition({
                target: "tutorialScene",
                sleep: true,
                duration: 2000,
                onUpdate: function (progress) {
                  const t = Phaser.Math.Easing.Quadratic.InOut(progress);
                  cam.setViewport(0, t * defaultHeight, cam.width, (1 - t) * defaultHeight);
                  targetCam1.setViewport(0, 0, targetCam1.width, t * defaultHeight);
                  targetCam1.setScroll(0, (1 - t) * defaultHeight);
                }
              });
            },
            this);

          //sliding scene transition to credits
          this.input.keyboard.on(
            "keydown-DOWN",
            function () {
              this.scene.transition({
                target: "creditsScene",
                sleep: true,
                duration: 2000,
                onUpdate: function (progress) {
                  const t = Phaser.Math.Easing.Quadratic.InOut(progress);
                  
                  cam.setViewport(0, -t * defaultHeight, cam.width, (1 + t) * defaultHeight);
                  targetCam2.setViewport(0, 0, targetCam2.width, 0);
                  targetCam2.setScroll(0, -(1 - t) * defaultHeight);
                }
              });
            },
            this);

        //define input
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //menu graphics - through high score
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

        this.camera = new Phaser.Cameras.Scene2D.Camera(0, 0, game.config.width, game.config.height);
        this.camera.scrollY = -500;
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