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
        let initialConveyorSpeed = -3;
        let maxConveyorSpeed = 8;

        this.conveyor1 = new Conveyor(this, 0, 150, "conveyor", 0, initialConveyorSpeed, maxConveyorSpeed);
        this.conveyor2 = new Conveyor(this, 0, 340, "conveyor", 0, initialConveyorSpeed, maxConveyorSpeed);
        this.conveyor3 = new Conveyor(this, 0, 530, "conveyor", 0, initialConveyorSpeed, maxConveyorSpeed);
        this.player = new Mechanic(this, 100, this.conveyor1.y - 50, "mechanic");

        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //group for conveyor belts
        this.conveyorGroup = this.add.group();
        this.conveyorGroup.addMultiple([this.conveyor1, this.conveyor2, this.conveyor3]);
        this.physics.add.collider(this.player, this.conveyorGroup, () => {this.player.isJumping = false});

        this.obstacleGroup = this.add.group();
        this.physics.add.collider(this.obstacleGroup, this.conveyorGroup, this.updateObstacleSpeed);
        this.physics.add.overlap(this.player, this.obstacleGroup, () => {this.player.destroy()});

        // let scoreConfig = {
            
        // };

        this.speedTimer = 0;
        this.spawnTimer = 0;
        // this.pointsTimer = 0;
        // this.score = 0;
    }

    update(time, delta) {
        this.conveyor1.update();
        this.conveyor2.update();
        this.conveyor3.update();
        this.player.update();

        //increase conveyor belt speed every 10 seconds
        this.speedTimer += delta;
        while(this.speedTimer >= 10000) {
            this.conveyor1.increaseSpeed();
            this.conveyor2.increaseSpeed();
            this.conveyor3.increaseSpeed();
            this.speedTimer = 0;
        }

        //rate that obstacles spawn
        this.spawnTimer += delta;
        while(this.spawnTimer >= 1000) {
            this.test_obstacle = new Obstacle(this, 700, this.conveyor1.y - 25, "obstacle");
            this.obstacleGroup.add(this.test_obstacle);
            this.spawnTimer = 0;
        }
        // //increase score every second
        // this.pointsTimer += delta;
        // while(this.pointsTimer > 1000) {
        //     this.score += 1;
        //     this.pointsTimer = 0;
        // }
    }

    updateObstacleSpeed(obstacle, conveyor) {
        console.log(conveyor.surfaceSpeed);
        obstacle.x += conveyor.surfaceSpeed;
    }
}