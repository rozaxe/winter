/// <reference path='d/phaser' />
/// <reference path='Snowman' />

module Winter {
	export class Wood extends Phaser.Sprite {

		snowman: Snowman
		drag: Phaser.Sprite
		disX: number
		disY: number

		constructor(game: Phaser.Game, x: number, y: number, key:string, snowman: Snowman) {
			super(game, 0, 0, key + '_sorted')

			this.snowman = snowman
			this.disX = x
			this.disY = y

			this.drag = this.game.add.sprite(this.disX, this.disY, key)
			this.addChild(this.drag)
			this.drag.alpha = 0

			this.drag.inputEnabled = true
			this.drag.input.enableDrag()
			this.drag.events.onDragStart.add(this.dragStart, this)
			this.drag.events.onDragStop.add(this.dragStop, this)
		}

		dragStart() {
			this.drag.alpha = 1
		}

		dragStop() {
			if (this.drag.overlap(this.snowman)) {
				this.snowman.changeWood(this.drag.key)
			}
			this.drag.position.set(this.disX, this.disY)
			this.drag.alpha = 0
		}
	}
}

