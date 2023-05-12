class Crate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setOrigin(1, 0);
        scene.physics.add.existing(this);

        this.speed = speed;
    }

    update() {
        this.x += this.speed;

        if(this.x < 0) {
            this.destroy;
        }
    }

    increaseSpeed() {
        this.speed -= 0.25;
    }
}