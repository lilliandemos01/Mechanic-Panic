class Mechanic extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.add.existing(this);

        this.moveSpeed = 3;
        this.highest = false;
        this.lowest = false;
        this.isJumping = false;

        this.setGravityY(300);
        this.setAccelerationY(500);
        this.body.setSize(1);
    }

    update() {
        if(this.y < 200)
            this.highest = true;
        else
            this.highest = false;
        if(this.y > 350)
            this.lowest = true;
        else
            this.lowest = false;

        if(Phaser.Input.Keyboard.JustDown(keyUp) && !this.isJumping && !this.highest) {
            this.y -= 190;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDown) && !this.isJumping && !this.lowest) {
            this.y += 190;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace) && !this.isJumping) {
            this.isJumping = true;
            this.setVelocityY(-300);
        }
    }
}