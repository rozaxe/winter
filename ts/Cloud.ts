/// <reference path='d/phaser' />

module Winter {
	export class Cloud extends Phaser.Group {

		snow: Phaser.Sprite
		snowman: Snowman

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x
			this.y = y

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
		}

		reset() {
			this.snowman.reset()
		}
	}
}
