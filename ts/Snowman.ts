/// <reference path='d/phaser' />

module Winter {
	export class Snowman extends Phaser.Group {

		state: Play
		snowman: Phaser.Sprite
		hat: Phaser.Sprite
		nose: Phaser.Sprite
		clothe: Phaser.Sprite
		wood: Phaser.Sprite
		hatKey: string = ''
		noseKey: string = ''
		clotheKey: string = ''
		woodKey: string = ''

		constructor(game: Phaser.Game, x: number, y: number, state: Play) {
			super(game)
			this.state = state
			this.x = x
			this.y = Game.fullHeight

			this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this)
			this.snowman.anchor.x = 0.5

			this.hat = this.game.add.sprite(0, 0)
			this.nose = this.game.add.sprite(0, 0)
			this.clothe = this.game.add.sprite(0, 0)
			this.wood = this.game.add.sprite(0, 0)

			this.game.add.tween(this).to({y: y}, 1000, Phaser.Easing.Bounce.Out).delay(1200).start()
		}

		changeHat(key: string) {
			this.hat.destroy()
			this.hat = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.hat.anchor.x = 0.5

			this.hatKey = key

			this.check()
		}

		changeNose(key: string) {
			this.nose.destroy()
			this.nose = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.nose.anchor.x = 0.5

			this.noseKey = key

			this.check()
		}

		changeClothe(key: string) {
			this.clothe.destroy()
			this.clothe = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.clothe.anchor.x = 0.5

			this.clotheKey = key

			this.check()
		}

		changeWood(key: string) {
			this.wood.destroy()
			this.wood = this.game.add.sprite(0, 0, key + '_weared', null, this)
			this.wood.anchor.x = 0.5

			this.woodKey = key

			this.check()
		}

		clean() {
			[this.hat, this.nose, this.clothe, this.wood].forEach((x:Phaser.Sprite) => {
				var tween = this.game.add.tween(x).to({alpha: 0}, 100)
				tween.onComplete.add(() => {
					x.destroy()
				}, this)
				tween.start()
			})

			this.hatKey = ''
			this.noseKey = ''
			this.clotheKey = ''
			this.woodKey = ''
		}

		reset() {
			this.hat.destroy()
			this.nose.destroy()
			this.clothe.destroy()
			this.wood.destroy()

			this.hatKey = ''
			this.noseKey = ''
			this.clotheKey = ''
			this.woodKey = ''
		}

		check() {
			this.state.checkOrder(this.hatKey, this.noseKey, this.clotheKey, this.woodKey)
		}

	}
}
