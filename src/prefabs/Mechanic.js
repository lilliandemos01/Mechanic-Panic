class Mechanic extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.add.existing(this);

        this.moveSpeed = 3;
        this.highest = true;
        this.lowest = false;
        this.isJumping = false;

        this.setGravityY(300);
        this.setAccelerationY(500);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUp)) {
            this.y -= 190;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown)) {
            this.y += 190;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace) && !this.isJumping) {
            this.isJumping = true;
            this.setVelocityY(-300);
        }
    }
}