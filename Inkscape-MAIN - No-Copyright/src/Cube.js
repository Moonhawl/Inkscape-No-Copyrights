export class Cube extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y);

        this.texture = "cube";
        this.setTexture(this.texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(4);
        this.setImmovable(true);
        this.body.allowGravity = false;
        this.setGravity(0)

        this.scene.physics.add.collider(this.scene.player, this);

        setTimeout(() => {
            this.destroy();
        }, 1000)
    }
}