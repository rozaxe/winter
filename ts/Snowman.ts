/// <reference path='d/phaser' />

module Winter {
	export class Snowman extends Phaser.Group {

		state: Play
		snowman: Phaser.Sprite
		hat: Phaser.Sprite

		constructor(game: Phaser.Game, x: number, y: number, state: Play) {
			super(game)
			this.state = state
			this.x = x
			this.y = y

			this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this)
			this.snowman.anchor.x = 0.5

			this.hat = this.game.add.sprite(0, 0)
		}

		changeHat(key: string) {
			this.hat.destroy()
			this.hat = this.game.add.sprite(0, 0, key, null, this)
			this.hat.anchor.x = 0.5

			this.state.checkOrder(this.hat.key)
		}
	}
}
