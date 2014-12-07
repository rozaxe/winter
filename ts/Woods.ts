/// <reference path='d/phaser' />
/// <reference path='Wood' />

module Winter {
	export class Woods extends Phaser.Group {

		snowman: Snowman
		static available: string[] = ['', 'wood_3', 'wood_1']

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.snowman = snowman
			this.x = x
			this.y = Game.fullHeight

			this.add(new Wood(this.game, 15, 0, 'wood_3', snowman))
			this.add(new Wood(this.game, 0, 40, 'wood_1', snowman))

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1111).start()
		}

		addWood() {
			this.add(new Wood(this.game, 50, 25, 'wood_2', this.snowman))
			Woods.available.push('wood_2')

			var emitter = this.game.add.emitter(75, 25, 20)
			emitter.makeParticles('confetti', [0, 1, 2, 3])
			emitter.start(false, 3000, 20)
			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => { emitter.on = false }, this)
			this.add(emitter)
		}
	}
}
