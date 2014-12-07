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
		hatStand: HatStand
		clothesStand: ClothesStand
		woods: Woods

		toAdd: Array<any>

		create() {
			this.game.add.sprite(32, 32, 'moon')

			this.createBackground()

			this.snowman = new Snowman(this.game, 400 + Game.left, 232 + Game.top, this)
			this.hatStand = new HatStand(this.game, 98 + Game.left, 260 + Game.top, this.snowman)
			this.clothesStand = new ClothesStand(this.game, 232 + Game.left, 260 + Game.top, this.snowman)

			this.createForground()

			new BucketCarrot(this.game, 282 + Game.left, 515 + Game.top, this.snowman)
			new BucketRed(this.game, 202 + Game.left, 535 + Game.top, this.snowman)

			this.woods = new Woods(this.game, 500 + Game.left, 490 + Game.top, this.snowman)
			new Cloud(this.game, 400 + Game.left, 162 + Game.top, this.snowman)

			this.createSnow()
			
			this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
				this.newOrder(true)
			}, this)

			this.toAdd = [
				this.hatStand, this.hatStand.addFlat,
				this.clothesStand, this.clothesStand.addClothe,
				this.woods, this.woods.addWood,
				this.hatStand, this.hatStand.addMelon,
			]
		}

		createSnow() {
			var back_emitter = this.game.add.emitter(Game.left + 400, -32, 500)
			back_emitter.makeParticles('snowflakes', [0, 1])
			back_emitter.maxParticleScale = 0.5
			back_emitter.minParticleScale = 0.2
			back_emitter.setYSpeed(20, 100)
			back_emitter.gravity = 0
			back_emitter.width = Game.fullWidth * 1.5
			back_emitter.minRotation = 0
			back_emitter.maxRotation = 40
			back_emitter.start(false, 14000, 30);
		}

		createForground() {
			var shape = this.game.add.graphics(0, 0)
			shape.beginFill(0xBCDBE7)
			shape.drawRect(0, 474 + Game.top, Game.fullWidth, 226 + Game.top)
			shape.y = Game.fullHeight
			this.game.add.tween(shape).to({y: 0}, 1000, Phaser.Easing.Bounce.Out).delay(100).start()

			var forest = this.game.add.sprite(Game.left - 100, Game.fullHeight, 'forest')
			forest.anchor.x = 1
			this.game.add.tween(forest).to({y: Game.top + 80}, 1000, Phaser.Easing.Bounce.Out).delay(900).start()
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

		newOrder(first?: boolean) {
			this.orders.push(new Order(this.game, Game.fullWidth - 174, 262 + Game.top, first))
		}

		checkOrder(hatKey: string, noseKey: string, clotheKey: string, woodKey: string) {
			for (var i in this.orders) {
				if (this.orders[i].verify(hatKey, noseKey, clotheKey, woodKey)) {
					this.orders[i].valid()
					delete this.orders[i]
					this.snowman.liveeeee()

					if (this.toAdd.length > 0) {
						var func = this.toAdd.pop()
						var name = this.toAdd.pop()
						func.call(name)
					}

					// New order
					this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
						this.newOrder()
					}, this)
				}
			}
		}

	}

}