def foodcollision():
    
    def on_overlap(projectile, food):
        food.destroy()
        distance = abs(food.y - hero.y)
        addscore = max(1, Math.idiv(int(100 - distance), 10))
        info.change_score_by(addscore)
    sprites.on_overlap(SpriteKind.projectile, SpriteKind.food, on_overlap)
    
def startprojectile():
    
    def on_a_pressed():
        global projectile2
        projectile2 = sprites.create_projectile_from_sprite(img("""
                . . 5 . .
                . 5 5 5 .
                . . 5 . .
                """),
            hero,
            0,
            -100)
    controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
    
# Functions
def herocreate():
    global hero
    hero = sprites.create(img("""
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
            """),
        SpriteKind.player)
    hero.set_position(80, 100)
    controller.move_sprite(hero)
def enemygrid():
    global x
    x = 37
    while x < 140:
        y = 20
        while y < 50:
            enemy = sprites.create(img("""
                    . . . . . . .
                    . . f f f . .
                    . f 1 1 1 f .
                    f 1 f 1 f 1 f
                    f 1 1 1 1 1 f
                    . f f f f f .
                    . . . . . . .
                    """),
                SpriteKind.enemy)
            enemy.set_position(x, y)
            y += 20
        x += 30
def foodspawner():
    
    def dropfood():
        food2 = sprites.create(img("""
                . . 2 2 . .
                . 3 1 1 3 .
                2 1 1 1 1 2
                2 1 1 1 1 2
                . 3 1 1 3 .
                . . 2 2 . .
                """),
            SpriteKind.food)
        food2.set_position(randint(10, 150), 0)
        food2.set_velocity(0, 30)
    game.on_update_interval(2200, dropfood)
    
x = 0
projectile2: Sprite = None
# Global variables
hero: Sprite = None
# Main Program
herocreate()
startprojectile()
enemygrid()
foodspawner()
foodcollision()