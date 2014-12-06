/// <reference path='d/phaser' />
/// <reference path='Snowman' />

module Winter {
	export class Hat extends Phaser.Sprite {
		
		snowman: Snowman

		constructor(game: Phaser.Game, x: number, y: number, key:string, snowman: Snowman) {
			super(game, x, y, key)

			this.snowman = snowman

			this.inputEnabled = true
			this.input.enableDrag()
			this.events.onDragStop.add(this.dragStop, this)
		}

		dragStop() {
			if (this.overlap(this.snowman)) {
				console.log("Overlap !")
			}
		}
	}
}

