/// <reference path='d/phaser' />
/// <reference path='Boot' />
/// <reference path='Loader' />
/// <reference path='Play' />

module Winter {

	export class Game extends Phaser.Game {

		static fullWidth: number
		static fullHeight: number
		static top: number
		static left: number

		constructor() {
			Game.fullWidth = document.body.clientWidth
			Game.fullHeight = document.body.clientHeight
			if (Game.fullWidth < 800) { Game.fullWidth = 800 }
			if (Game.fullHeight < 600) { Game.fullHeight = 600 }
			Game.top = Math.ceil((Game.fullHeight - 600) / 2)
			Game.left = Math.ceil((Game.fullWidth - 800) / 2)

			super(Game.fullWidth, Game.fullHeight, Phaser.AUTO, 'game', null, true, true)

			this.state.add('boot', Boot)
			this.state.add('loader', Loader)
			this.state.add('play', Play)
			this.state.start('boot')
		}

	}

}
