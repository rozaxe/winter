/// <reference path='d/phaser' />
/// <reference path='Snowman' />

module Winter {
	export class Hat extends Phaser.Sprite {
		
		snowman: Snowman
		drag: Phaser.Sprite

		constructor(game: Phaser.Game, x: number, y: number, key:string, anchor: number, snowman: Snowman) {
			super(game, x, y, key + '_hanging')

			this.snowman = snowman

			this.anchor.x = anchor

			this.drag = this.game.add.sprite(0, 0, key)
			this.drag.anchor.x = anchor
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
				this.snowman.changeHat(this.drag.key)
				this.drag.position.set(0, 0)
				this.drag.alpha = 0
			}
		}
	}
}
