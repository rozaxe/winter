/// <reference path='d/phaser' />

module Winter {
	export class Snowman extends Phaser.Sprite {
		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'box2')

			game.add.existing(this)
		}
	}
}
