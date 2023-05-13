class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.atlas("mechanic", "./assets/mechanics.png", "./assets/mechanics.json");
        this.load.image("conveyor", "./assets/conveyor.png");
        this.load.image("wheel", "./assets/wheel.png");
        this.load.image("crate", "./assets/crate.png");
        this.load.image("furnace", "./assets/furnace.png");
        this.load.image("furnace door", "./assets/furnace_door.png");
    }

    create() {
        //music
        let musicConfig = {
            rate: 0.6,
            loop: true
        };
        this.rate = musicConfig.rate;
        this.music = this.sound.add("music", musicConfig);
        this.music.play();

        //speed variables
        let initialConveyorSpeed = -1;
        this.maxConveyorSpeed = -5;

        //create animations
        this.animsConfig = {
            key: "run",
            frames: this.anims.generateFrameNames("mechanic", {
                prefix: "mechanic_",
                start: 1,
                end: 4
            }),
            frameRate: 4,
            repeat: -1
        }
        this.initialAnims = this.anims.create(this.animsConfig);

        //add images to scene
        this.gear = this.add.image(game.config.width / 2, game.config.height / 2, "gear").setOrigin(0.5).setDepth(-4).setAlpha(0.4);
        this.conveyor1 = new Conveyor(this, this.game.config.width, 150, "conveyor", 0, initialConveyorSpeed);
        this.conveyor2 = new Conveyor(this, this.game.config.width, 340, "conveyor", 0, initialConveyorSpeed);
        this.conveyor3 = new Conveyor(this, this.game.config.width, 530, "conveyor", 0, initialConveyorSpeed);
        this.player = new Mechanic(this, 130, this.conveyor1.y - 50, "mechanic");
        this.player.play("run");
        this.furnace1 = this.add.image(0, this.conveyor1.y - 100, "furnace").setOrigin(0);
        this.furnace2 = this.add.image(0, this.conveyor2.y - 100, "furnace").setOrigin(0);
        this.furnace3 = this.add.image(0, this.conveyor3.y - 100, "furnace").setOrigin(0);
        this.add.image(70, this.conveyor1.y - 70, "furnace door").setOrigin(0, 0).setDepth(-1);
        this.add.image(70, this.conveyor2.y - 70, "furnace door").setOrigin(0, 0).setDepth(-2);
        this.add.image(70, this.conveyor3.y - 70, "furnace door").setOrigin(0, 0).setDepth(-3);

        //define input
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //groups
        this.conveyorGroup = this.add.group();
        this.conveyorGroup.addMultiple([this.conveyor1, this.conveyor2, this.conveyor3]);
        this.crateGroup = this.add.group();
        this.crateGroup.runChildUpdate = true;

        //timer and scoring set ups
        this.speedTimer = 0;
        this.spawnTimer = 0;
        this.spawnBuffer = 1500;
        this.pointsTimer = 0;
        this.score = 0;

        //collision detection
        this.physics.add.collider(this.player, this.conveyorGroup, () => {this.player.isJumping = false;}, null, this);
        this.physics.add.overlap(this.player, this.crateGroup, () => this.death(), null, this);

        //UI
        let scoreConfig = {
            fontFamily: "Kanit",
            fontSize: "24px",
            color: "#e3cc1e",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4
        };
        this.scoreDisplay = this.add.text(game.config.width / 2, 15, `TIME\n${this.score}`, scoreConfig).setOrigin(0.5, 0);

        this.gameOver = false;
    }

    update(time, delta) {
        if(!this.gameOver) {
            this.rainbowBackground();
            this.conveyor1.update();
            this.conveyor2.update();
            this.conveyor3.update();
            this.player.update();

            this.gear.angle += this.conveyor1.surfaceSpeed / 2;

            //increase conveyor belt speed every 10 seconds
            this.speedTimer += delta;
            if(this.conveyor1.surfaceSpeed > this.maxConveyorSpeed) {
                while(this.speedTimer >= 10000) {
                    this.conveyor1.increaseSpeed();
                    this.conveyor2.increaseSpeed();
                    this.conveyor3.increaseSpeed();
                    this.crateGroup.getChildren().forEach(function(crate) {crate.increaseSpeed();});

                    //increase difficulty
                    this.spawnBuffer -= 50;
                    difficulty += 1;

                    //increase speed of music
                    this.music.setRate(this.rate + 0.025);
                    this.rate += 0.025;

                    //increase animation fps
                    this.initialAnims.destroy();
                    this.animsConfig.frameRate += 1;
                    this.initialAnims = this.anims.create(this.animsConfig);
                    this.player.play("run");

                    this.speedTimer = 0;
                }
            }

            //rate that crates spawn
            this.spawnTimer += delta;
            while(this.spawnTimer >= this.spawnBuffer) {
                this.spawnCrate();
                this.spawnTimer = 0;
            }

            //increase score every second
            this.pointsTimer += delta;
            while(this.pointsTimer > 1000) {
                this.score += 1;
                this.scoreDisplay.text = `TIME\n${this.score}`;
                this.pointsTimer = 0;
            }
        }
    }

    death() {
        this.gameOver = true;
        this.crateGroup.runChildUpdate = false;
        this.player.destroy();
        this.music.stop();
        
        if(this.score > highScore) {
            highScore = this.score;
        }
    }

    spawnCrate() {
        let spawnLevel = Math.floor(Math.random() * 3);
        this.crate = new Crate(this, 775, this.conveyorGroup.children.entries[spawnLevel].y - 25, "crate", 0, this.conveyor1.surfaceSpeed);
        this.crateGroup.add(this.crate);
        this.updateFurnaceDepth(this.crate);

        //spawn 2 crates
        if(difficulty >= 2){
            spawnLevel = Math.floor(Math.random() * 3);
            this.crate = new Crate(this, 975, this.conveyorGroup.children.entries[spawnLevel].y - 25, "crate", 0, this.conveyor1.surfaceSpeed);
            this.crateGroup.add(this.crate);
            this.updateFurnaceDepth(this.crate);
        }
        
        //spawn 3 crates
        if(difficulty >= 8) {
            spawnLevel = Math.floor(Math.random() * 3);
            this.crate = new Crate(this, 1175, this.conveyorGroup.children.entries[spawnLevel].y - 25, "crate", 0, this.conveyor1.surfaceSpeed);
            this.crateGroup.add(this.crate);
            this.updateFurnaceDepth(this.crate);
        }
    }

    //makes sure new crates are drawn behind the furnaces
    updateFurnaceDepth (crate) {
        this.furnace1.depth = this.crate.depth + 1;
        this.furnace2.depth = this.crate.depth + 1;
        this.furnace3.depth = this.crate.depth + 1;
    }

    rainbowBackground() {
        this.tweens.add({
            targets: this.backgroundColor,
            tint: Math.random() * 0xFFFFFF,
            duration: 1000,
            ease: "linear"
        });
    }
}