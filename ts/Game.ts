/// <reference path='d/phaser' />
/// <reference path='Play' />

module Winter {

	export class Game extends Phaser.Game {

		constructor() {
			// constructor(width?: number, height?: number, renderer?: number, parent?: any, state?: any, transparent?: boolean, antialias?: boolean, physicsConfig?: any);
			super(800, 600, Phaser.AUTO, 'game', null, false, true)

			this.state.add('play', Play)
			this.state.start('play')
		}

	}

}
