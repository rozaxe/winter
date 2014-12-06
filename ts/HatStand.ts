/// <reference path='d/phaser' />
/// <reference path='Hat' />

module Winter {
	export class HatStand extends Phaser.Group {
		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x
			this.y = y

			var stand = this.game.add.sprite(0, 0, 'hat_stand')
			stand.anchor.x = 0.5

			this.add(stand)

			this.add(new Hat(this.game, 15, 'high_hat', 0, snowman))
			this.add(new Hat(this.game, 45, 'christmas_hat', 1, snowman))
			//this.add(new Hat(this.game, 75, 'melon_hat', 0, snowman))
			//this.add(new Hat(this.game, 105, 'flat_hat', 1, snowman))
		}
	}
}
