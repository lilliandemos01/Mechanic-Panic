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
        this.maxConveyorSpeed = 8;

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

        //collision detection
        this.physics.add.collider(this.player, this.conveyorGroup, () => {this.player.isJumping = false});
        this.physics.add.overlap(this.player, this.obstacleGroup, () => {this.player.destroy()});

        // let scoreConfig = {
            
        // };

        //timer set ups
        this.speedTimer = 0;
        this.spawnTimer = 0;
        this.spawnBuffer = 1000;
        // this.pointsTimer = 0;
        // this.score = 0;
    }

    update(time, delta) {
        this.conveyor1.update();
        this.conveyor2.update();
        this.conveyor3.update();
        this.player.update();
        this.obstacleGroup.preUpdate();

        //increase conveyor belt speed every 10 seconds
        this.speedTimer += delta;
        if(this.conveyor1.surfaceSpeed < this.maxConveyorSpeed) {
            while(this.speedTimer >= 10000) {
                this.conveyor1.increaseSpeed();
                this.conveyor2.increaseSpeed();
                this.conveyor3.increaseSpeed();
                this.obstacleGroup.getChildren().forEach(function(obstacle) {obstacle.increaseSpeed();});
                this.speedTimer = 0;
            }
        }

        //rate that obstacles spawn
        this.spawnTimer += delta;
        while(this.spawnTimer >= this.spawnBuffer) {
            this.obstacle = new Obstacle(this, 700, this.conveyor1.y - 25, "obstacle", 0, this.conveyor1.surfaceSpeed);
            this.obstacleGroup.add(this.obstacle);
            this.spawnTimer = 0;
        }
        // //increase score every second
        // this.pointsTimer += delta;
        // while(this.pointsTimer > 1000) {
        //     this.score += 1;
        //     this.pointsTimer = 0;
        // }
    }
}