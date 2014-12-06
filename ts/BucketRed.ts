/// <reference path='d/phaser' />
/// <reference path='Snowman' />

module Winter {
	export class BucketRed extends Phaser.Sprite {

		snowman: Snowman
		drag: Phaser.Sprite
		disY: number

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game, x, y, 'bucket_red')

			this.snowman = snowman
			this.disY = y

			this.anchor.setTo(0.5)

			this.drag = this.game.add.sprite(0, 0, 'pouet_pouet')
			this.drag.anchor.setTo(0.5)
			this.addChild(this.drag)
			this.drag.alpha = 0

			this.drag.inputEnabled = true
			this.drag.input.enableDrag()
			this.drag.events.onDragStart.add(this.dragStart, this)
			this.drag.events.onDragStop.add(this.dragStop, this)

			this.game.add.existing(this)
		}

		dragStart() {
			this.drag.alpha = 1
		}

		dragStop() {
			if (this.drag.overlap(this.snowman)) {
				this.snowman.changeClothe(this.drag.key)
			}
			this.drag.position.set(0,0)
			this.drag.alpha = 0
		}
	}
}

