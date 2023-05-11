class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("conveyor", "./assets/conveyor.png");
        this.load.image("wheel", "./assets/wheel.png");
        this.load.image("mechanic", "./assets/mechanic.png");
        this.load.image("obstacle", "./assets/obstacle.png");
    }

    create() {
        let initialConveyorSpeed = -1;
        this.maxConveyorSpeed = 5;

        //add stuff to scene
        this.conveyor1 = new Conveyor(this, 0, 150, "conveyor", 0, initialConveyorSpeed);
        this.conveyor2 = new Conveyor(this, 0, 340, "conveyor", 0, initialConveyorSpeed);
        this.conveyor3 = new Conveyor(this, 0, 530, "conveyor", 0, initialConveyorSpeed);
        this.player = new Mechanic(this, 100, this.conveyor1.y - 50, "mechanic");

        //define input
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //groups
        this.conveyorGroup = this.add.group();
        this.conveyorGroup.addMultiple([this.conveyor1, this.conveyor2, this.conveyor3]);
        this.obstacleGroup = this.add.group();
        this.obstacleGroup.runChildUpdate = true;

        //timer and scoring set ups
        this.speedTimer = 0;
        this.spawnTimer = 0;
        this.spawnBuffer = 1500;
        this.pointsTimer = 0;
        this.score = 0;

        //collision detection
        this.physics.add.collider(this.player, this.conveyorGroup, () => {this.player.isJumping = false;}, null, this);
        this.physics.add.overlap(this.player, this.obstacleGroup, () => this.death(), null, this);

        //UI
        let scoreConfig = {
            align: "center"
        };
        this.scoreDisplay = this.add.text(game.config.width / 2, 15, `Time\n${this.score}`, scoreConfig);

        this.gameOver = false;
    }

    update(time, delta) {
        if(!this.gameOver) {
            console.log("going");
            this.conveyor1.update();
            this.conveyor2.update();
            this.conveyor3.update();
            this.player.update();

            //increase conveyor belt speed every 10 seconds
            this.speedTimer += delta;
            if(this.conveyor1.surfaceSpeed < this.maxConveyorSpeed) {
                while(this.speedTimer >= 15000) {
                    this.conveyor1.increaseSpeed();
                    this.conveyor2.increaseSpeed();
                    this.conveyor3.increaseSpeed();
                    this.obstacleGroup.getChildren().forEach(function(obstacle) {obstacle.increaseSpeed();});
                    this.spawnBuffer -= 50;
                    difficulty += 1;
                    this.speedTimer = 0;
                }
            }

            //rate that obstacles spawn
            this.spawnTimer += delta;
            while(this.spawnTimer >= this.spawnBuffer) {
                this.spawnObstacle();
                this.spawnTimer = 0;
            }

            //increase score every second
            this.pointsTimer += delta;
            while(this.pointsTimer > 1000) {
                this.score += 1;
                this.scoreDisplay.text = `Time\n${this.score}`;
                this.pointsTimer = 0;
            }
        }
    }

    death() {
        this.gameOver = true;
        this.obstacleGroup.runChildUpdate = false;
        this.player.destroy();
        
        if(this.score > highScore) {
            highScore = this.score;
        }
    }

    spawnObstacle() {
        let spawnLevel = Math.floor(Math.random() * 3);
        this.obstacle = new Obstacle(this, 700, this.conveyorGroup.children.entries[spawnLevel].y - 25, "obstacle", 0, this.conveyor1.surfaceSpeed);
        this.obstacleGroup.add(this.obstacle);

        if(difficulty >= 2){
            spawnLevel = Math.floor(Math.random() * 3);
            this.obstacle = new Obstacle(this, 900, this.conveyorGroup.children.entries[spawnLevel].y - 25, "obstacle", 0, this.conveyor1.surfaceSpeed);
            this.obstacleGroup.add(this.obstacle);
        }
        
        if(difficulty >= 8) {
            spawnLevel = Math.floor(Math.random() * 3);
            this.obstacle = new Obstacle(this, 1100, this.conveyorGroup.children.entries[spawnLevel].y - 25, "obstacle", 0, this.conveyor1.surfaceSpeed);
            this.obstacleGroup.add(this.obstacle);
        }
    }
}