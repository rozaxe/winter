/// <reference path='d/phaser' />

module Winter {
	export class Boot extends Phaser.State {
		preload() {
			this.load.image('moon', 'assets/moon.png')
			this.load.spritesheet('snowflakes', 'assets/snowflakes.png', 16, 16)
		}
		create() {
			this.game.state.start('loader')
		}
	}
}
