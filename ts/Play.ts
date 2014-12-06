/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='Snowman' />
/// <reference path='Order' />

module Winter {

	export class Play extends Phaser.State {

		orders: Order[] = []

		preload() {
			this.load.image('hat_stand', 'assets/hat_stand.png')
			this.load.image('christmas_hat', 'assets/christmas_hat.png')
			this.load.image('melon_hat', 'assets/melon_hat.png')
			this.load.image('christmas_hat_hanging', 'assets/christmas_hat_hanging.png')
			this.load.image('melon_hat_hanging', 'assets/melon_hat_hanging.png')
			this.load.image('snowman', 'assets/snowman.png')
			this.load.image('bubble', 'assets/bubble.png')
		}

		create() {
			this.game.stage.backgroundColor = 0x011C40

			this.createBackground()

			var snowman = new Snowman(this.game, 400, 280, this)
			new HatStand(this.game, 98, 260, snowman)

			this.createForground()

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