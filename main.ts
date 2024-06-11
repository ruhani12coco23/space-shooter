controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . 9 9 9 9 9 9 9 9 9 9 9 . . . . 
        . . . . . 9 5 9 9 9 5 9 . . . . 
        . . . . . 9 9 9 9 5 9 9 . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.createSong(assets.song`destroyy`), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.createSong(hex`0078000408020304001c00100500640000041e000004000000000000000000000000000a040004070000000400021d2a07001c00020a006400f401640000040000000000000000000000000000000003060000000400012408001c000e050046006603320000040a002d0000006400140001320002010002070000000400022027`), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let enemy_ship: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . 4 4 . . . . . 
    . . . . . . . . 4 d d 4 . . . . 
    . . . . . . 6 6 4 d 2 4 2 . . . 
    . . . . . 6 6 6 4 d d 4 2 5 5 . 
    . . . . 6 6 6 6 4 d 2 4 2 5 . . 
    . . . 6 6 6 6 6 4 d d 4 2 . . . 
    . . 6 6 6 6 6 6 4 d 2 4 2 . . . 
    . 6 6 6 6 6 6 6 4 d d 4 2 5 5 . 
    . . 6 1 6 6 6 6 4 d 2 4 2 . . . 
    . . . 6 1 6 6 6 4 d d 4 2 . . . 
    . . . . 6 6 1 6 4 d 2 4 2 5 . . 
    . . . . . 6 6 6 4 d d 4 2 5 5 . 
    . . . . . . 6 6 4 d 2 4 2 . . . 
    . . . . . . . . 4 d d 4 . . . . 
    . . . . . . . . . 4 4 . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
info.setLife(5)
game.onUpdate(function () {
    game.setGameOverEffect(false, effects.dissolve)
    game.setGameOverMessage(false, "GAME OVER!")
})
game.onUpdateInterval(2000, function () {
    enemy_ship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 5 2 . . . . . . . 2 5 . . . 
        . . 2 2 . . . . . . . 2 2 . . . 
        . . . . 2 . . . . . 2 . . . . . 
        . . . . . 2 . 2 . 2 . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . 2 2 f 2 f 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . . 2 f 2 f 2 f 2 . . . . . 
        . . . . 2 2 f 2 f 2 2 . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemy_ship.x = scene.screenWidth()
    enemy_ship.vx = -20
    enemy_ship.y = randint(10, scene.screenWidth() - 10)
})
