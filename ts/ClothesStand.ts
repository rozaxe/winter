/// <reference path='d/phaser' />
/// <reference path='Clothe' />

module Winter {
	export class ClothesStand extends Phaser.Group {

		snowman: Snowman
		static available: string[] = ['', 'blue_scarf', 'red_scarf', 'purple_scarf']

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.snowman = snowman
			this.x = x
			this.y = Game.fullHeight

			var stand = this.game.add.sprite(0, 0, 'clothes_stand')
			stand.anchor.x = 0.5

			this.add(stand)

			this.add(new Clothe(this.game, 15, 'blue_scarf', snowman))
			this.add(new Clothe(this.game, 45, 'red_scarf', snowman))
			this.add(new Clothe(this.game, 75, 'purple_scarf', snowman))

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1100).start()
		}

		addClothe() {
			this.add(new Clothe(this.game, 105, 'green_scarf', this.snowman))
			ClothesStand.available.push('green_scarf')

			var emitter = this.game.add.emitter(0, 120, 20)
			emitter.makeParticles('confetti', [0, 1, 2, 3])
			emitter.start(false, 3000, 20)
			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => { emitter.on = false }, this)
			this.add(emitter)
		}
	}
}
