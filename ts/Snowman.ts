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

		initX: number
		initY: number

		constructor(game: Phaser.Game, x: number, y: number, state: Play) {
			super(game)
			this.state = state
			this.x = x
			this.y = Game.fullHeight

			this.initX = x
			this.initY = y

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
			this.y = Game.fullHeight
			this.x = this.initX

			this.hat.destroy()
			this.nose.destroy()
			this.clothe.destroy()
			this.wood.destroy()

			this.hatKey = ''
			this.noseKey = ''
			this.clotheKey = ''
			this.woodKey = ''

			this.game.add.tween(this).to({y: this.initY}, 1000, Phaser.Easing.Bounce.Out).start()
		}

		check() {
			this.state.checkOrder(this.hatKey, this.noseKey, this.clotheKey, this.woodKey)
		}

		liveeeee() {
			// Eye
			var eyes = this.game.add.sprite(-2, 94, 'eyes', null, this)
			eyes.anchor.setTo(0.5)
			eyes.scale.y = 0
			this.game.add.tween(eyes.scale).to({y: 1}, 200).start()

			// Jump
			this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
				var vanHalen: Function = (v:number): number => {
					return Math.sin(v * Math.PI) * 0.3
				}

				var move = this.game.add.tween(this)
				var jump = this.game.add.tween(this)
				move.to({x: Game.fullWidth + 200}, 1500)
				move.onComplete.add(() => {
					jump.stop()
					eyes.destroy()
					this.reset()
				}, this)
				jump.to({y: 30}, 500, vanHalen, true, 0, Number.MAX_VALUE, false)
				move.start()
			}, this)
		}
	}
}
