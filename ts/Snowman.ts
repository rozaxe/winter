/// <reference path='d/phaser' />

module Winter {
	export class Snowman extends Phaser.Group {

		state: Play
		snowman: Phaser.Sprite
		hat: Phaser.Sprite
		clothe: Phaser.Sprite
		hatKey: string = ''
		clotheKey: string = ''

		constructor(game: Phaser.Game, x: number, y: number, state: Play) {
			super(game)
			this.state = state
			this.x = x
			this.y = y

			this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this)
			this.snowman.anchor.x = 0.5

			this.hat = this.game.add.sprite(0, 0)
			this.clothe = this.game.add.sprite(0, 0)
		}

		changeClothe(key: string) {
			this.clothe.destroy()
			this.clothe = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.clothe.anchor.x = 0.5

			this.clotheKey = key

			this.state.checkOrder(this.hatKey)
		}

		changeHat(key: string) {
			this.hat.destroy()
			this.hat = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.hat.anchor.x = 0.5

			this.hatKey = key

			this.state.checkOrder(this.hatKey)
		}
	}
}
