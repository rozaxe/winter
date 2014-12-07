/// <reference path='d/phaser' />

module Winter {
	export class Boot extends Phaser.State {
		preload() {
			this.game.load.image('moon', 'assets/moon.png')
		}
		create() {
			this.game.state.start('loader')
		}
	}
}
