import { Cube } from "../Cube.js";

export class Scene01 extends Phaser.Scene {

    constructor(){
        super("scene01")
    }


    //==========================================================================
    //                            FONCTION PRELOAD
    //==========================================================================

    preload()

    {

        // Chargement des tuiles de jeu 

        this.load.image("Background", "tiled/Tileset_PNG.png");
        
        //Chargement de la carte 
        this.load.tilemapTiledJSON("map", "tiled/game_Map.json");



        //Chargement du personnage
        this.load.spritesheet('chara_Idle','assets/chara_Idle1.png',
            { frameWidth: 520, frameHeight: 840 });

        this.load.spritesheet('chara_Run_Right','assets/chara_Run_Right.png',
            { frameWidth: 860, frameHeight: 830 });

        this.load.spritesheet('chara_Run_Left','assets/chara_Run_Left.png',
            { frameWidth: 860, frameHeight: 830 });

        this.load.spritesheet('chara_Jump','assets/chara_jump.png',
            { frameWidth: 1000, frameHeight: 980 });

        this.load.spritesheet('perso','assets/perso.png',
            { frameWidth: 32, frameHeight: 48 });
        
        //Chargement des ennemis
        this.load.spritesheet('ennemi','assets/Ennemi.png',
            { frameWidth: 32, frameHeight: 32 });

        
        //Chargement des videos
        this.load.video('video1', 'assets/video1.mp4');
        this.load.audio('music1', 'assets/Summertime - George Gershwin.mp3');
    }

    //==========================================================================
    //                            FONCTION CREATE
    //==========================================================================
    
    create(){


        this.keys = this.input.keyboard.addKeys("Z,Q,S,D");
        console.log("keys", this.dkeys);

        this.platforms;
        this.player;
        this.xspeed = 700;
        this.yspeed = 1500;
        this.slowMotion = false
        this.click = false;
        this.game_over
        

        this.timer = 0;

       
        this.cubeGroup = this.physics.add.staticGroup();
        
        
        var mx = this.input.mousePointer.x;
        var my = this.input.mousePointer.y;
        
        // ===== Chargement de la carte ===== //
        const carteDuNiveau = this.add.tilemap("map");
        const tileset = carteDuNiveau.addTilesetImage(
            "Tileset", 
            "Background"
            );
 

        // ===== Chargement des Tilesets ===== //
        const calque1 = carteDuNiveau.createLayer(
        "calque1",
        tileset
        );
              
        
    
        this.platforms = this.physics.add.staticGroup();
        
    
        this.player = this.physics.add.sprite(100, 100, 'chara_Idle',).setGravity(0,300).setDepth(5).setScale(0.15).setSize(700,700)
        
        console.log(this.player)

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.cubeGroup);
            
        calque1.setCollisionByProperty({ is_Solid: true });
        this.physics.add.collider(this.player, calque1);

        
        // ====== CREATION DES TP ====== //  
        // ====== CREATION DES TP ====== // 
        
        this.trigger1 = this.add.rectangle(2500, 10, 200, 50);
        this.physics.add.existing(this.trigger1);
        this.trigger1.body.setAllowGravity(false);
        this.trigger1.body.setImmovable(true)

        this.trigger2 = this.add.rectangle(3750, 950, 30, 30);
        this.physics.add.existing(this.trigger2);
        this.trigger2.body.setAllowGravity(false);
        this.trigger2.body.setImmovable(true)

        this.trigger3 = this.add.rectangle(2480, 1640, 150, 50);
        this.physics.add.existing(this.trigger3);
        this.trigger3.body.setAllowGravity(false);
        this.trigger3.body.setImmovable(true)

        this.trigger4 = this.add.rectangle(4690, 950, 30, 30);
        this.physics.add.existing(this.trigger4);
        this.trigger4.body.setAllowGravity(false);
        this.trigger4.body.setImmovable(true)

        this.trigger5 = this.add.rectangle(5550, 1600, 200, 80);
        this.physics.add.existing(this.trigger5);
        this.trigger5.body.setAllowGravity(false);
        this.trigger5.body.setImmovable(true)

        this.trigger6 = this.add.rectangle(5540, 950, 30, 30);
        this.physics.add.existing(this.trigger6);
        this.trigger6.body.setAllowGravity(false);
        this.trigger6.body.setImmovable(true)

        this.trigger7 = this.add.rectangle(1300, 2540, 1850, 150);
        this.physics.add.existing(this.trigger7);
        this.trigger7.body.setAllowGravity(false);
        this.trigger7.body.setImmovable(true)
        this.physics.add.collider(this.trigger7, this.player);


        this.musicStarted = false;
        this.detection_musique = this.add.rectangle(100, 2500, 150, 150);
        this.physics.add.existing(this.detection_musique);
        this.detection_musique.body.setAllowGravity(false);
        this.detection_musique.body.setImmovable(true)


        this.physics.add.overlap(this.player, this.trigger1, this.tptrigger1, null, this)
        this.physics.add.overlap(this.player, this.trigger2, this.tptrigger2, null, this)
        this.physics.add.overlap(this.player, this.trigger3, this.tptrigger3, null, this)
        this.physics.add.overlap(this.player, this.trigger4, this.tptrigger4, null, this)
        this.physics.add.overlap(this.player, this.trigger5, this.tptrigger5, null, this)
        this.physics.add.overlap(this.player, this.trigger6, this.tptrigger6, null, this)
        this.physics.add.overlap(this.player, this.detection_musique, this.activation_musique, null, this)

        
        // ===== DETECTION PAR LES ENNEMIS ===== //
        // ===== DETECTION PAR LES ENNEMIS ===== //


        // ZONES VLC //
        // ZONES VLC //

        this.detection_ennemi1 = this.add.rectangle(850, 2400, 550, 600);
        this.physics.add.existing(this.detection_ennemi1);
        this.detection_ennemi1.body.setAllowGravity(false);
        this.detection_ennemi1.body.setImmovable(true)

        this.detection_ennemi2 = this.add.rectangle(1800, 2400, 600, 800);
        this.physics.add.existing(this.detection_ennemi2);
        this.detection_ennemi2.body.setAllowGravity(false);
        this.detection_ennemi2.body.setImmovable(true)


        // ZONES TILED //
        // ZONES TILED //

        this.detection_ennemi3 = this.add.rectangle(4400, 2400, 450, 1500);
        this.physics.add.existing(this.detection_ennemi3);
        this.detection_ennemi3.body.setAllowGravity(false);
        this.detection_ennemi3.body.setImmovable(true)

        this.detection_ennemi4 = this.add.rectangle(3800, 2000, 680, 1500);
        this.physics.add.existing(this.detection_ennemi4);
        this.detection_ennemi4.body.setAllowGravity(false);
        this.detection_ennemi4.body.setImmovable(true)

        this.detection_ennemi5 = this.add.rectangle(5000, 2000, 680, 1500);
        this.physics.add.existing(this.detection_ennemi5);
        this.detection_ennemi5.body.setAllowGravity(false);
        this.detection_ennemi5.body.setImmovable(true)




        
        // ====== CREATION DES ENNEMIS ====== //
        // ====== CREATION DES ENNEMIS ====== //

        var ennemis = this.physics.add.group({
            collideWorldBounds: true
            }); 
        

        // ENNEMIS VLC//
        // ENNEMIS VLC//

        this.antibody1 = ennemis.create(450, 2540, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody1);
        this.antibody1.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody1, this.kill_player, null, this);

        this.antibody2 = ennemis.create(600, 2000, "ennemi").setScale(2).setDepth(6);
        this.physics.add.existing(this.antibody2);
        this.antibody2.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody2, this.kill_player, null, this);

        this.antibody3 = ennemis.create(1400, 2540, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody3);
        this.antibody3.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody3, this.kill_player, null, this);

        this.antibody4 = ennemis.create(1750, 2350, "ennemi").setScale(2).setDepth(6);
        this.physics.add.existing(this.antibody4);
        this.antibody4.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody4, this.kill_player, null, this);

        this.physics.add.overlap(this.player, this.detection_ennemi1, this.ennemi_detect1, null, this)
        this.physics.add.overlap(this.player, this.detection_ennemi2, this.ennemi_detect2, null, this)

        
        
        
        



        //ENNEMIS TILED//
        //ENNEMIS TILED//

        this.antibody5 = ennemis.create(3550, 1730, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody5);
        this.antibody5.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody5, this.kill_player, null, this);

        this.antibody6 = ennemis.create(3850, 2550, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody6);
        this.antibody6.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody6, this.kill_player, null, this);

        this.antibody7 = ennemis.create(4430, 2400, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody7);
        this.antibody7.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody7, this.kill_player, null, this);

        this.antibody8 = ennemis.create(4850, 1800, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody8);
        this.antibody8.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody8, this.kill_player, null, this);

        this.antibody9 = ennemis.create(5200, 2000, "ennemi").setScale(2).setDepth(6); 
        this.physics.add.existing(this.antibody9);
        this.antibody9.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.antibody9, this.kill_player, null, this);


        this.physics.add.overlap(this.player, this.detection_ennemi3, this.ennemi_detect3, null, this)
        this.physics.add.overlap(this.player, this.detection_ennemi4, this.ennemi_detect4, null, this)
        this.physics.add.overlap(this.player, this.detection_ennemi5, this.ennemi_detect5, null, this)

        
        
        
        
        



        this.anims.create({
            key: 'left',
            frames: this.player.anims.generateFrameNumbers('chara_Run_Left', {start:0,end:11}),
            frameRate: 30,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: this.player.anims.generateFrameNumbers('chara_Idle', {start:0,end:75}),
            frameRate: 30,
            repeat: -1
        });
    
        this.anims.create({
            key: 'right',
            frames: this.player.anims.generateFrameNumbers('chara_Run_Right', {start:0,end:11}),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.player.anims.generateFrameNumbers('chara_Jump', {start:0,end:15}),
            frameRate: 10,
            repeat: -1
        });



        this.music1 = this.sound.add("music1", { loop: true });
        this.music1.play()
        this.music1.setVolume(0.3)

    
        this.cursors = this.input.keyboard.createCursorKeys();


        this.input.on('pointerdown', () => {this.click = true;});
        this.input.on('pointerup', () => {this.click = false;});

        this.physics.world.setBounds(0,0, 10000, 10000 );
        this.cameras.main.setBounds(0,0, 10000, 10000);
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.zoom = 1.75;
        this.cameras.main.zoom = 0.7


        
        

    
    }
    
    update(){
        



    
        if (this.keys.Q.isDown){ //si la touche gauche est appuyée
            this.player.setVelocityX(-this.xspeed); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
        }
    
        else if (this.keys.D.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(this.xspeed); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => droite
        }
    
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle
            this.player.anims.play('turn', true); //animation fait face caméra
        }
        
        if (this.keys.Z.isDown){ //&& this.player.body.blocked.down){
            //si touche haut appuyée ET que le perso touche le sol
            this.player.setVelocityY(-this.yspeed);
            this.player.anims.play('up', true);

        }
    
        else if (this.keys.S.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityY(this.yspeed); //alors vitesse positive en X
            
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift)) {
            this.slowMotion = true
            this.timer = 1;
        }
        if (this.cursors.shift.isDown && this.slowMotion){
            this.player.body.velocity.x = this.player.body.velocity.x/4
            this.player.body.velocity.y = this.player.body.velocity.y/2
            this.timer++;
            
            const mx = this.input.mousePointer.x;
            const my = this.input.mousePointer.y;

            if (this.click ){
                this.cubeGroup.add(new Cube(this, mx, my));
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

            }

            /*if (this.input.on('pointerdown',(this.pointer))) {
                this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }
            }*/

            /*if(this.pointer.isDown == true){
                this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

            }*/

        }

        else {
            this.slowMotion = false
            this.xspeed= 250
            this.yspeed= 370
            
        }


        if (this.playerIsDetected1 === true){
            this.physics.moveToObject(this.antibody1,this.player,100);
            this.physics.moveToObject(this.antibody2,this.player,125);
        }

        if (this.playerIsDetected2 === true){
            this.physics.moveToObject(this.antibody3,this.player,150);
            this.physics.moveToObject(this.antibody4,this.player,175);
        }
        
        if (this.playerIsDetected4 === true){
            this.physics.moveToObject(this.antibody5,this.player,150);
            this.physics.moveToObject(this.antibody6,this.player,175);
        }

        if (this.playerIsDetected3 === true){
            this.physics.moveToObject(this.antibody7,this.player,150);
        }

        if (this.playerIsDetected5 === true){
            this.physics.moveToObject(this.antibody8,this.player,150);
            this.physics.moveToObject(this.antibody9,this.player,175);
        }
    }

    createCube(mx,my){
        this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

    }

    tptrigger1(){
        this.player.x = 3300;
        this.player.y = 900;
    }

    tptrigger2(){
        this.player.x = 100;
        this.player.y = 2500;
    }

    tptrigger3(){
        this.player.x = 4000;
        this.player.y = 900;
        if (this.musicStarted){
            this.video.stop()
        }
        this.playerIsDetected2 = false
        this.playerIsDetected1 = false
        this.physics.moveToObject(this.antibody3,this.player,0);
        this.physics.moveToObject(this.antibody4,this.player,0);
        this.physics.moveToObject(this.antibody1,this.player,0);
        this.physics.moveToObject(this.antibody2,this.player,0);
        
    }
    
    tptrigger4(){
        this.player.x = 3100;
        this.player.y = 2500;
    }

    tptrigger5(){
        this.player.x = 4900;
        this.player.y = 900;
        this.playerIsDetected3 = false
        this.playerIsDetected4 = false
        this.playerIsDetected5 = false
        this.physics.moveToObject(this.antibody5,this.player,0);
        this.physics.moveToObject(this.antibody6,this.player,0);
        this.physics.moveToObject(this.antibody7,this.player,0);
        this.physics.moveToObject(this.antibody8,this.player,0);
        this.physics.moveToObject(this.antibody9,this.player,0);
    }

    tptrigger6(){
        this.player.x = 7500;
        this.player.y = 2500;
    }

    activation_musique(){
        if (!this.musicStarted){
            this.musicStarted = true;
            this.video = this.add.video(1300, 2100, 'video1',).setScale(3.2,1);
            this.video.play();
            this.video.setVolume(0);
            this.video.setLoop();
            
        }


    }

    ennemi_detect1(){
        this.playerIsDetected1 = true
    }

    ennemi_detect2(){
        this.playerIsDetected2 = true
    }

    ennemi_detect3(){
        this.playerIsDetected3 = true
    }

    ennemi_detect4(){
        this.playerIsDetected4 = true
    }

    ennemi_detect5(){
        this.playerIsDetected5 = true
    }

    kill_player()
    {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.game_over = true;
    }

    reload()
    {
        if(this.game_over){
            return;
        }

    }

}

