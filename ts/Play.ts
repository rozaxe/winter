/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='ClothesStand' />
/// <reference path='Snowman' />
/// <reference path='Order' />
/// <reference path='BucketCarrot' />
/// <reference path='BucketRed' />
/// <reference path='Woods' />
/// <reference path='Cloud' />

module Winter {

	export class Play extends Phaser.State {

		orders: Order[] = []
		snowman: Snowman

		preload() {
			var ress = [
				'blue_scarf',
				'red_scarf',
				'green_scarf',
				'purple_scarf',

				'blue_scarf_hanging',
				'red_scarf_hanging',
				'green_scarf_hanging',
				'purple_scarf_hanging',

				'blue_scarf_weared',
				'red_scarf_weared',
				'green_scarf_weared',
				'purple_scarf_weared',

				'carrot',
				'pouet_pouet',

				'bucket_carrot',
				'bucket_red',

				'carrot_weared',
				'pouet_pouet_weared',

				'christmas_hat',
				'high_hat',
				'melon_hat',
				'flat_hat',

				'christmas_hat_hanging',
				'high_hat_hanging',
				'melon_hat_hanging',
				'flat_hat_hanging',

				'christmas_hat_weared',
				'high_hat_weared',
				'melon_hat_weared',
				'flat_hat_weared',

				'wood_1',
				'wood_2',
				'wood_3',

				'wood_1_sorted',
				'wood_2_sorted',
				'wood_3_sorted',

				'wood_1_weared',
				'wood_2_weared',
				'wood_3_weared',

				'clothes_stand',
				'hat_stand',
				'bubble',
				'cloud',
				'eyes',
				'snow',
				'snowman'

			]
			for (var i in ress) {
				this.load.image(ress[i], 'assets/' + ress[i] + '.png')
			}
		}

		create() {
			this.game.stage.backgroundColor = 0x011C40

			this.createBackground()

			this.snowman = new Snowman(this.game, 400, 232, this)
			new HatStand(this.game, 98, 260, this.snowman)
			new ClothesStand(this.game, 232, 260, this.snowman)

			this.createForground()

			new BucketCarrot(this.game, 282, 515, this.snowman)
			new BucketRed(this.game, 202, 535, this.snowman)

			new Woods(this.game, 500, 490, this.snowman)
			new Cloud(this.game, 400, 162, this.snowman)

			this.newOrder()
		}

		createForground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0xBCDBE7)
			shape.drawRect(0, 474, 800, 300)
		}

		createBackground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0x496586)
			shape.drawRect(0, 426, 800, 300)
			shape.beginFill(0x6984A2)
			shape.drawRect(0, 436, 800, 300)
			shape.beginFill(0x8EB5C4)
			shape.drawRect(0, 450, 800, 300)
		}

		newOrder() {
			this.orders.push(new Order(this.game, 626, 262))
		}

		checkOrder(hatKey: string, noseKey: string, clotheKey: string, woodKey: string) {
			for (var i in this.orders) {
				if (this.orders[i].verify(hatKey, noseKey, clotheKey, woodKey)) {
					//return console.log('victory !')
					this.orders[i].destroy()
					delete this.orders[i]

					// Destroy all !
					this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
						this.snowman.reset()
						this.newOrder()
					}, this)
				}
			}
		}

	}

}