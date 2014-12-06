/// <reference path='d/phaser' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Winter;
(function (Winter) {
    var Snowman = (function (_super) {
        __extends(Snowman, _super);
        function Snowman(game, x, y, state) {
            _super.call(this, game);
            this.hatKey = '';
            this.clotheKey = '';
            this.state = state;
            this.x = x;
            this.y = y;
            this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this);
            this.snowman.anchor.x = 0.5;
            this.hat = this.game.add.sprite(0, 0);
            this.clothe = this.game.add.sprite(0, 0);
        }
        Snowman.prototype.changeClothe = function (key) {
            this.clothe.destroy();
            this.clothe = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.clothe.anchor.x = 0.5;
            this.clotheKey = key;
            this.state.checkOrder(this.hatKey);
        };
        Snowman.prototype.changeHat = function (key) {
            this.hat.destroy();
            this.hat = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.hat.anchor.x = 0.5;
            this.hatKey = key;
            this.state.checkOrder(this.hatKey);
        };
        return Snowman;
    })(Phaser.Group);
    Winter.Snowman = Snowman;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Snowman' />
var Winter;
(function (Winter) {
    var Hat = (function (_super) {
        __extends(Hat, _super);
        function Hat(game, y, key, anchor, snowman) {
            _super.call(this, game, 0, 0, key + '_hanging');
            this.snowman = snowman;
            this.disY = y;
            this.anchor.x = 0.5;
            this.drag = this.game.add.sprite(0, y, key);
            this.drag.anchor.x = anchor;
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
        }
        Hat.prototype.dragStart = function () {
            this.drag.alpha = 1;
        };
        Hat.prototype.dragStop = function () {
            if (this.drag.overlap(this.snowman)) {
                this.snowman.changeHat(this.drag.key);
            }
            this.drag.position.set(0, this.disY);
            this.drag.alpha = 0;
        };
        return Hat;
    })(Phaser.Sprite);
    Winter.Hat = Hat;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Hat' />
var Winter;
(function (Winter) {
    var HatStand = (function (_super) {
        __extends(HatStand, _super);
        function HatStand(game, x, y, snowman) {
            _super.call(this, game);
            this.x = x;
            this.y = y;
            var stand = this.game.add.sprite(0, 0, 'hat_stand');
            stand.anchor.x = 0.5;
            this.add(stand);
            this.add(new Winter.Hat(this.game, 15, 'high_hat', 0, snowman));
            this.add(new Winter.Hat(this.game, 45, 'christmas_hat', 1, snowman));
            //this.add(new Hat(this.game, 75, 'melon_hat', 0, snowman))
            //this.add(new Hat(this.game, 105, 'flat_hat', 1, snowman))
        }
        return HatStand;
    })(Phaser.Group);
    Winter.HatStand = HatStand;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Snowman' />
var Winter;
(function (Winter) {
    var Clothe = (function (_super) {
        __extends(Clothe, _super);
        function Clothe(game, y, key, snowman) {
            _super.call(this, game, 0, 0, key + '_hanging');
            this.snowman = snowman;
            this.disY = y;
            this.anchor.x = 0.5;
            this.drag = this.game.add.sprite(0, y + 16, key);
            this.drag.anchor.x = 0.5;
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
        }
        Clothe.prototype.dragStart = function () {
            this.drag.alpha = 1;
        };
        Clothe.prototype.dragStop = function () {
            if (this.drag.overlap(this.snowman)) {
                this.snowman.changeClothe(this.drag.key);
            }
            this.drag.position.set(0, this.disY + 16);
            this.drag.alpha = 0;
        };
        return Clothe;
    })(Phaser.Sprite);
    Winter.Clothe = Clothe;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Clothe' />
var Winter;
(function (Winter) {
    var ClothesStand = (function (_super) {
        __extends(ClothesStand, _super);
        function ClothesStand(game, x, y, snowman) {
            _super.call(this, game);
            this.x = x;
            this.y = y;
            var stand = this.game.add.sprite(0, 0, 'clothes_stand');
            stand.anchor.x = 0.5;
            this.add(stand);
            this.add(new Winter.Clothe(this.game, 15, 'blue_scarf', snowman));
            this.add(new Winter.Clothe(this.game, 45, 'red_scarf', snowman));
            this.add(new Winter.Clothe(this.game, 75, 'purple_scarf', snowman));
            //this.add(new Clothe(this.game, 105, 'green_scarf', snowman))
        }
        return ClothesStand;
    })(Phaser.Group);
    Winter.ClothesStand = ClothesStand;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
var Winter;
(function (Winter) {
    var Order = (function (_super) {
        __extends(Order, _super);
        function Order(game, x, y) {
            _super.call(this, game, x, y, 'bubble');
            this.randomOrder();
            this.show();
            this.game.add.existing(this);
        }
        Order.prototype.randomOrder = function () {
            this.hatKey = 'melon_hat';
        };
        Order.prototype.show = function () {
            var hat = this.game.add.sprite(0, 0, this.hatKey);
            hat.position.setTo(8);
            hat.scale.setTo(0.5);
            this.addChild(hat);
        };
        return Order;
    })(Phaser.Sprite);
    Winter.Order = Order;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='ClothesStand' />
/// <reference path='Snowman' />
/// <reference path='Order' />
var Winter;
(function (Winter) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.orders = [];
        }
        Play.prototype.preload = function () {
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
            ];
            for (var i in ress) {
                this.load.image(ress[i], 'assets/' + ress[i] + '.png');
            }
        };
        Play.prototype.create = function () {
            this.game.stage.backgroundColor = 0x011C40;
            this.createBackground();
            var snowman = new Winter.Snowman(this.game, 400, 232, this);
            new Winter.HatStand(this.game, 98, 260, snowman);
            new Winter.ClothesStand(this.game, 232, 260, snowman);
            this.createForground();
            this.newOrder();
        };
        Play.prototype.createForground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0xBCDBE7);
            shape.drawRect(0, 474, 800, 300);
        };
        Play.prototype.createBackground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0x496586);
            shape.drawRect(0, 426, 800, 300);
            shape.beginFill(0x6984A2);
            shape.drawRect(0, 436, 800, 300);
            shape.beginFill(0x8EB5C4);
            shape.drawRect(0, 450, 800, 300);
        };
        Play.prototype.newOrder = function () {
            this.orders.push(new Winter.Order(this.game, 626, 262));
        };
        Play.prototype.checkOrder = function (hatKey) {
            for (var i in this.orders) {
                if (this.orders[i].hatKey == hatKey) {
                    return console.log("victory !");
                }
            }
            console.log("Nop !");
        };
        return Play;
    })(Phaser.State);
    Winter.Play = Play;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Play' />
var Winter;
(function (Winter) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            // constructor(width?: number, height?: number, renderer?: number, parent?: any, state?: any, transparent?: boolean, antialias?: boolean, physicsConfig?: any);
            _super.call(this, 800, 600, Phaser.AUTO, 'game', null, false, true);
            this.state.add('play', Winter.Play);
            this.state.start('play');
        }
        return Game;
    })(Phaser.Game);
    Winter.Game = Game;
})(Winter || (Winter = {}));
/// <reference path='Game' />
window.onload = function () {
    new Winter.Game();
};
//# sourceMappingURL=app.js.map