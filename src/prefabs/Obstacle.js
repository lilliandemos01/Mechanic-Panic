class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.add.existing(this);

        this.setGravityY(200);
        //this.speed = 0;
    }

    // setSpeed(speed) {
    //     this.speed = speed;
    // }

    // update() {
    //     this.x += this.speed;
    // }
}