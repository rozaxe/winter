/// <reference path='d/phaser' />

module Winter {
	export class Order extends Phaser.Sprite {

		hatKey: string
		noseKey: string
		clotheKey: string
		woodKey: string

		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'bubble')

			this.randomOrder()
			this.show()

			this.game.add.existing(this)
		}

		randomOrder() {
			do {
				this.hatKey = this.game.rnd.pick(['', 'high_hat', 'christmas_hat'])
				this.noseKey = this.game.rnd.pick(['', 'carrot', 'pouet_pouet'])
				this.clotheKey = this.game.rnd.pick(['', 'blue_scarf', 'red_scarf', 'purple_scarf'])
				this.woodKey = this.game.rnd.pick(['', 'wood_1', 'wood_2', 'wood_3'])

				/*
				this.hatKey = 'high_hat'
				this.clotheKey = 'green_scarf'
				this.noseKey = 'carrot'
				this.woodKey = 'wood_2'
				//*/

			} while (this.hatKey == '' && this.noseKey == '' && this.clotheKey == '' && this.woodKey == '')
		}

		show() {
			var hat = this.game.add.sprite(0, 0, this.hatKey)
			hat.position.setTo(16, 8)
			hat.scale.setTo(0.5)
			this.addChild(hat)

			var nose = this.game.add.sprite(0, 0, this.noseKey)
			nose.position.setTo(70, -8)
			this.addChild(nose)

			var clothe = this.game.add.sprite(0, 0, this.clotheKey)
			clothe.position.setTo(70, 64)
			clothe.scale.setTo(0.5)
			this.addChild(clothe)

			var wood = this.game.add.sprite(0, 0, this.woodKey)
			wood.position.setTo(16, 64)
			wood.scale.setTo(0.5)
			this.addChild(wood)
		}

		verify(hatKey: string, noseKey: string, clotheKey: string, woodKey: string) {
			if (this.hatKey == hatKey && this.noseKey == noseKey && this.clotheKey == clotheKey && this.woodKey == woodKey) {
				return true
			}
			return false
		}
	}
}
