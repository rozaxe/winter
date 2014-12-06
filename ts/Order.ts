/// <reference path='d/phaser' />

module Winter {
	export class Order extends Phaser.Sprite {

		hatKey: string

		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'bubble')

			this.randomOrder()
			this.show()

			this.game.add.existing(this)
		}

		randomOrder() {
			this.hatKey = 'melon_hat'
		}

		show() {
			var hat = this.game.add.sprite(0, 0, this.hatKey)
			hat.position.setTo(8)
			hat.scale.setTo(0.5)
			this.addChild(hat)
		}
	}
}
