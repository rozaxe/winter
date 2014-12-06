/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='ClothesStand' />
/// <reference path='Snowman' />
/// <reference path='Order' />
/// <reference path='BucketCarrot' />
/// <reference path='BucketRed' />

module Winter {

	export class Play extends Phaser.State {

		orders: Order[] = []

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
				'eyes',
				'snowman'

			]
			for (var i in ress) {
				this.load.image(ress[i], 'assets/' + ress[i] + '.png')
			}
		}

		create() {
			this.game.stage.backgroundColor = 0x011C40

			this.createBackground()

			var snowman = new Snowman(this.game, 400, 232, this)
			new HatStand(this.game, 98, 260, snowman)
			new ClothesStand(this.game, 232, 260, snowman)

			this.createForground()

			new BucketCarrot(this.game, 282, 515, snowman)
			new BucketRed(this.game, 202, 535, snowman)

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

		checkOrder(hatKey: string) {
			for (var i in this.orders) {
				if (this.orders[i].hatKey == hatKey) {
					return console.log("victory !")
				}
			}
			console.log("Nop !")
		}

	}

}