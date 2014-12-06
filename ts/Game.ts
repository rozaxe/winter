/// <reference path='d/phaser' />
/// <reference path='Play' />

module Winter {

	export class Game extends Phaser.Game {

		constructor() {
			super(800, 600, Phaser.AUTO, 'game', null)

			this.state.add('play', Play)
			this.state.start('play')
		}

	}

}
