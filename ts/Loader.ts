/// <reference path='d/phaser' />

module Winter {
	export class Loader extends Phaser.State {

		mask: Phaser.Graphics

		loadAssets() {
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
			this.load.start()
		}
		create() {
			this.mask = this.game.add.graphics(32, 32)
			this.mask.beginFill(0)
			this.mask.drawRect(0, 0, 100, 100)
			this.mask.scale.y = 0

			var moon = this.game.add.sprite(32, 32, 'moon')
			moon.mask = this.mask

			this.game.load.onFileComplete.add(this.fileComplete, this)
			this.game.load.onLoadComplete.add(this.loadComplete, this)
			this.loadAssets()
		}
		fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
			this.mask.scale.y = progress / 100
		}
		loadComplete() {
			this.game.state.start('play')
		}
	}
}
