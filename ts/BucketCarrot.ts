/// <reference path='d/phaser' />
/// <reference path='Snowman' />

module Winter {
	export class BucketCarrot extends Phaser.Sprite {

		snowman: Snowman
		drag: Phaser.Sprite
		disY: number

		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game, x, Game.fullHeight, 'bucket_carrot')

			this.snowman = snowman

			this.anchor.setTo(0.5, 0)

			this.drag = this.game.add.sprite(0, 0, 'carrot')
			this.drag.anchor.setTo(0.5)
			this.addChild(this.drag)
			this.drag.alpha = 0

			this.drag.inputEnabled = true
			this.drag.input.useHandCursor = true
			this.drag.input.enableDrag()
			this.drag.events.onDragStart.add(this.dragStart, this)
			this.drag.events.onDragStop.add(this.dragStop, this)

			this.game.add.existing(this)

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1200).start()
		}

		dragStart() {
			this.drag.alpha = 1
		}

		dragStop() {
			if (this.drag.overlap(this.snowman)) {
				this.snowman.changeNose(this.drag.key)
			}
			this.drag.position.set(0, 0)
			this.drag.alpha = 0
		}
	}
}

