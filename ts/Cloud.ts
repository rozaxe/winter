/// <reference path='d/phaser' />

module Winter {
	export class Cloud extends Phaser.Group {

		snow: Phaser.Sprite
		snowman: Snowman

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x + 16
			this.y = 0

			this.snowman = snowman

			var cloud = this.game.add.sprite(0, 0, 'cloud')

			cloud.anchor.setTo(0.5, 1)
			cloud.inputEnabled = true
			cloud.input.useHandCursor = true

			cloud.events.onInputDown.add(this.reset, this)

			this.add(cloud)

			this.snow = this.game.add.sprite(0, 0, 'snow')
			this.snow.anchor.x = 0.5
			this.snow.scale.y = 0
			this.snow.visible = false

			this.add(this.snow)

			this.game.add.existing(this)

			// Float
			this.game.add.tween(this)
				.to({x: x - 16}, 10000)
				.to({x: x + 16}, 10000)
				.loop()
				.start()

			// Appear
			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1100).start()
		}

		reset() {
			this.snow.visible = true
			var tween = this.game.add.tween(this.snow.scale)
			tween.to({y: (500 + Game.top) / 100}, 200)
			tween.onComplete.add(() => {
				this.snowman.clean()
				var tween = this.game.add.tween(this.snow)
				tween.to({y: Game.fullHeight}, 200)
				tween.delay(300)
				tween.onComplete.add(() => {
					this.snow.visible = false
					this.snow.scale.y = 0
					this.snow.y = 0
				}, this)
				tween.start()
			}, this)
			tween.start()
		}
	}
}
