class Conveyor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.add.existing(this);
        this.surfaceSpeed = speed;

        this.wheels = []
        for(let i = 0; i < game.config.width; i += 48) {
            let wheel = scene.add.sprite(i, y + 20, "wheel", 0, speed);
            this.wheels.push(wheel);
        }
    }

    update() {
        for (let wheel of this.wheels) {
            wheel.angle += this.surfaceSpeed;
        }
    }

    increaseSpeed() {
        this.surfaceSpeed -= 0.5;
    }
}