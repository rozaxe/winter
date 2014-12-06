/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='Snowman' />

module Winter {

	export class Play extends Phaser.State {

		preload() {
			this.load.image('world', 'assets/sample.png')
			this.load.image('box1', 'assets/box1.png')
			this.load.image('box2', 'assets/box2.png')
		}

		create() {
			this.add.sprite(0, 0, 'world')
			var snowman = new Snowman(this.game, 240, 240)
			new HatStand(this.game, snowman)
		}

	}

}