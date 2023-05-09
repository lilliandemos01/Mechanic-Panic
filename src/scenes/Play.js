class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("conveyor", "./assets/conveyor.png");
        this.load.image("wheel", "./assets/wheel.png");
        this.load.image("mechanic", "./assets/mechanic.png");
    }

    create() {
        this.conveyor1 = new Conveyor(this, 0, 150, "conveyor", 0, -0.5);
        this.conveyor2 = new Conveyor(this, 0, 340, "conveyor", 0, -0.5);
        this.conveyor3 = new Conveyor(this, 0, 530, "conveyor", 0, -0.5);
        this.player = this.add.sprite(400, 100, "mechanic").setOrigin(0, 0);

        this.timer = 0;
    }

    update(time, delta) {
        this.conveyor1.update();
        this.conveyor2.update();
        this.conveyor3.update();

        //increase conveyor belt speed every 10 seconds
        // this.timer += delta;
        // while(this.timer > 10000) {
        //     this.conveyor1.increaseSpeed();
        //     this.timer = 0;
        // }
    }
}