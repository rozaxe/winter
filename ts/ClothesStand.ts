/// <reference path='d/phaser' />
/// <reference path='Clothe' />

module Winter {
	export class ClothesStand extends Phaser.Group {
		constructor(game: Phaser.Game, x: number, y: number, snowman: Snowman) {
			super(game)

			this.x = x
			this.y = y

			var stand = this.game.add.sprite(0, 0, 'clothes_stand')
			stand.anchor.x = 0.5

			this.add(stand)

			this.add(new Clothe(this.game, 15, 'blue_scarf', snowman))
			this.add(new Clothe(this.game, 45, 'red_scarf', snowman))
			this.add(new Clothe(this.game, 75, 'purple_scarf', snowman))
			this.add(new Clothe(this.game, 105, 'green_scarf', snowman))
		}
	}
}
