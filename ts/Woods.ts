/// <reference path='d/phaser' />
/// <reference path='Wood' />

module Winter {
	export class Woods extends Phaser.Group {
		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x
			this.y = Game.fullHeight

			this.add(new Wood(this.game, 15, 0, 'wood_3', snowman))
			this.add(new Wood(this.game, 50, 25, 'wood_2', snowman))
			this.add(new Wood(this.game, 0, 40, 'wood_1', snowman))

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1111).start()
		}
	}
}
