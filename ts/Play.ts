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
			this.createBackground()

			this.snowman = new Snowman(this.game, 400 + Game.left, 232 + Game.top, this)
			new HatStand(this.game, 98 + Game.left, 260 + Game.top, this.snowman)
			new ClothesStand(this.game, 232 + Game.left, 260 + Game.top, this.snowman)

			this.createForground()

			new BucketCarrot(this.game, 282 + Game.left, 515 + Game.top, this.snowman)
			new BucketRed(this.game, 202 + Game.left, 535 + Game.top, this.snowman)

			new Woods(this.game, 500 + Game.left, 490 + Game.top, this.snowman)
			new Cloud(this.game, 400 + Game.left, 162 + Game.top, this.snowman)

			this.newOrder()
		}

		createForground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0xBCDBE7)
			shape.drawRect(0, 474 + Game.top, Game.fullWidth, 226 + Game.top)
		}

		createBackground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0x496586)
			shape.drawRect(0, 426 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.beginFill(0x6984A2)
			shape.drawRect(0, 436 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.beginFill(0x8EB5C4)
			shape.drawRect(0, 450 + Game.top, Game.fullWidth, 226 + Game.top)
		}

		newOrder() {
			this.orders.push(new Order(this.game, Game.fullWidth - 174, 262 + Game.top))
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