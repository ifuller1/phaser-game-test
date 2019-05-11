import { AUTO, Game } from 'phaser'

const config = {
    type: AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

const game = new Game(config)

function preload() {
    this.load.setBaseURL('http://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
    this.load.image('ground', 'assets/sprites/platform.png')
    this.load.image('car', 'assets/sprites/parsec.png')
}

let exo
let speedy
let emitter

function create() {
    this.add.image(400, 300, 'sky')

    const particles = this.add.particles('red')

    emitter = particles.createEmitter({
        speed: 120,
        scale: { start: 0.7, end: 0 },
        blendMode: 'ADD'
    })

    const stairs = this.physics.add.staticGroup()

    stairs.create(300, 500, 'ground')
    stairs.create(320, 480, 'ground')
    stairs.create(340, 460, 'ground')

    speedy = this.physics.add.sprite(100, 20, 'car')
    speedy.setFlipX(true)

    exo = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(speedy, stairs)

    emitter.startFollow(speedy)

    // var logo = this.physics.add.image(400, 100, 'logo')

    // logo.setVelocity(100, 200)
    // logo.setBounce(1, 1)
    // logo.setCollideWorldBounds(true)
}

function update() {
    if (exo.right.isDown) {
        speedy.setVelocityX(100)
        speedy.setFlipX(true)
    } else if (exo.left.isDown) {
        speedy.setVelocityX(-100)
        speedy.setFlipX(false)
    } else {
        speedy.setVelocityX(0)
    }

    if (exo.up.isDown) {
        speedy.setVelocityY(-100)
        emitter.on = true
    } else {
        emitter.on = false
    }
}
