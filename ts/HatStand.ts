/// <reference path='d/phaser' />
/// <reference path='Hat' />

module Winter {
	export class HatStand extends Phaser.Group {

		snowman: Snowman
		static available: string[] = ['', 'high_hat', 'christmas_hat']

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.snowman = snowman
			this.x = x
			this.y = Game.fullHeight

			var stand = this.game.add.sprite(0, 0, 'hat_stand')
			stand.anchor.x = 0.5

			this.add(stand)

			this.add(new Hat(this.game, 15, 'high_hat', 0, snowman))
			this.add(new Hat(this.game, 45, 'christmas_hat', 1, snowman))

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1300).start()
		}

		addMelon() {
			this.add(new Hat(this.game, 75, 'melon_hat', 0, this.snowman))
			HatStand.available.push('melon_hat')

			var emitter = this.game.add.emitter(16, 85, 20)
			emitter.makeParticles('confetti', [0, 1, 2, 3])
			emitter.start(false, 3000, 20)
			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => { emitter.on = false }, this)
			this.add(emitter)
		}

		addFlat() {
			this.add(new Hat(this.game, 105, 'flat_hat', 1, this.snowman))
			HatStand.available.push('flat_hat')

			var emitter = this.game.add.emitter(-32, 120, 20)
			emitter.makeParticles('confetti', [0, 1, 2, 3])
			emitter.start(false, 3000, 20)
			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => { emitter.on = false }, this)
			this.add(emitter)
		}
	}
}
