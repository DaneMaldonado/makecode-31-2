function foodcollision() {
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function on_overlap(projectile: Sprite, food: Sprite) {
        food.destroy()
        let distance = Math.abs(food.y - hero.y)
        let addscore = Math.max(1, Math.idiv(Math.trunc(100 - distance), 10))
        info.changeScoreBy(addscore)
    })
}

function startprojectile() {
    controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
        
        projectile2 = sprites.createProjectileFromSprite(img`
                . . 5 . .
                . 5 5 5 .
                . . 5 . .
                `, hero, 0, -100)
    })
}

//  Functions
function herocreate() {
    
    hero = sprites.create(img`
            . . . . . . 5 . 5 . . . . . . .
            . . . . . f 5 5 5 f f . . . . .
            . . . . f 1 5 2 5 1 6 f . . . .
            . . . f 1 6 6 6 6 6 1 6 f . . .
            . . . f 6 6 f f f f 6 1 f . . .
            . . . f 6 f f d d f f 6 f . . .
            . . f 6 f d f d d f d f 6 f . .
            . . f 6 f d 3 d d 3 d f 6 f . .
            . . f 6 6 f d d d d f 6 6 f . .
            . f 6 6 f 3 f f f f 3 f 6 6 f .
            . . f f d 3 5 3 3 5 3 d f f . .
            . . f d d f 3 5 5 3 f d d f . .
            . . . f f 3 3 3 3 3 3 f f . . .
            . . . f 3 3 5 3 3 5 3 3 f . . .
            . . . f f f f f f f f f f . . .
            . . . . . f f . . f f . . . . .
            `, SpriteKind.Player)
    hero.setPosition(80, 100)
    controller.moveSprite(hero)
}

function enemygrid() {
    let y: number;
    let enemy: Sprite;
    
    x = 37
    while (x < 140) {
        y = 20
        while (y < 50) {
            enemy = sprites.create(img`
                    . . . . . . .
                    . . f f f . .
                    . f 1 1 1 f .
                    f 1 f 1 f 1 f
                    f 1 1 1 1 1 f
                    . f f f f f .
                    . . . . . . .
                    `, SpriteKind.Enemy)
            enemy.setPosition(x, y)
            y += 20
        }
        x += 30
    }
}

function foodspawner() {
    game.onUpdateInterval(2200, function dropfood() {
        let food2 = sprites.create(img`
                . . 2 2 . .
                . 3 1 1 3 .
                2 1 1 1 1 2
                2 1 1 1 1 2
                . 3 1 1 3 .
                . . 2 2 . .
                `, SpriteKind.Food)
        food2.setPosition(randint(10, 150), 0)
        food2.setVelocity(0, 30)
    })
}

let x = 0
let projectile2 : Sprite = null
//  Global variables
let hero : Sprite = null
//  Main Program
herocreate()
startprojectile()
enemygrid()
foodspawner()
foodcollision()
