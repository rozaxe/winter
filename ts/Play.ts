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

		create() {
			this.game.add.sprite(32, 32, 'moon')

			this.createBackground()

			this.snowman = new Snowman(this.game, 400 + Game.left, 232 + Game.top, this)
			new HatStand(this.game, 98 + Game.left, 260 + Game.top, this.snowman)
			new ClothesStand(this.game, 232 + Game.left, 260 + Game.top, this.snowman)

			this.createForground()

			new BucketCarrot(this.game, 282 + Game.left, 515 + Game.top, this.snowman)
			new BucketRed(this.game, 202 + Game.left, 535 + Game.top, this.snowman)

			new Woods(this.game, 500 + Game.left, 490 + Game.top, this.snowman)
			new Cloud(this.game, 400 + Game.left, 162 + Game.top, this.snowman)

			this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
				this.newOrder()
			}, this)
		}

		createForground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0xBCDBE7)
			shape.drawRect(0, 474 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.y = Game.fullHeight
			this.game.add.tween(shape).to({y: 0}, 1000, Phaser.Easing.Bounce.Out).delay(100).start()
		}

		createBackground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0x496586)
			shape.drawRect(0, 426 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.beginFill(0x6984A2)
			shape.drawRect(0, 436 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.beginFill(0x8EB5C4)
			shape.drawRect(0, 450 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.y = Game.fullHeight
			this.game.add.tween(shape).to({y: 0}, 1000, Phaser.Easing.Bounce.Out).start()
		}

		newOrder() {
			this.orders.push(new Order(this.game, Game.fullWidth - 174, 262 + Game.top))
		}

		checkOrder(hatKey: string, noseKey: string, clotheKey: string, woodKey: string) {
			for (var i in this.orders) {
				if (this.orders[i].verify(hatKey, noseKey, clotheKey, woodKey)) {
					//return console.log('victory !')
					//this.orders[i].destroy()
					this.orders[i].valid()
					delete this.orders[i]
					this.snowman.liveeeee()

					// Destroy all !
					this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
						//this.snowman.reset()
						this.newOrder()
					}, this)
				}
			}
		}

	}

}