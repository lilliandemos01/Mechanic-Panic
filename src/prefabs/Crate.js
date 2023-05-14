class Crate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setOrigin(1, 0);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.sfx_sizzle = scene.sound.add("sizzle");
        this.scene = scene;
    }

    update() {
        this.x += this.speed;

        if(this.x < 80) {
            this.sfx_sizzle.play();
            this.emberParticles = this.scene.add.particles(0, 0, "ember", {
                emitZone: {
                    source: new Phaser.Geom.Line(this.x, this.y, this.x, this.y + 25),
                    type: "random",
                    quantity: 1500
                },
                speedX: {min: 70, max: 100},
                speedY: {min: -30, max: -50},
                accelerationX: {random: [40, 75]},
                accelerationY: {random: [10, 15]},
                lifeSpan: {min: 250, max: 750},
                scale: { random: [0.5, 1]},
                gravityY: 200,
                frequency: 10,
                blendMode: "ADD",
            });
            this.scene.time.delayedCall(1000, () => {
                this.emberParticles.stop();
            });
            this.destroy();
        }
    }

    increaseSpeed() {
        this.speed -= 0.25;
    }
}