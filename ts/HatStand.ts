/// <reference path='d/phaser' />
/// <reference path='hat' />

module Winter {
	export class HatStand extends Phaser.Group {
		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x
			this.y = y

			var stand = this.game.add.sprite(0, 0, 'hat_stand')
			stand.anchor.x = 0.5

			this.add(stand)

			this.add(new Hat(this.game, 16, 16, 'melon_hat', 0, snowman))
			this.add(new Hat(this.game, 0, 0, 'christmas_hat', 1, snowman))
		}
	}
}
