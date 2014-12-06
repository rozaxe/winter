/// <reference path='d/phaser' />
/// <reference path='hat' />

module Winter {
	export class HatStand extends Phaser.Group {
		constructor(game: Phaser.Game, snowman: Snowman) {
			super(game)

			this.add(new Hat(game, 76, 296, 'box1', snowman))
		}
	}
}
