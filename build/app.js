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
            this.noseKey = '';
            this.clotheKey = '';
            this.woodKey = '';
            this.state = state;
            this.x = x;
            this.y = y;
            this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this);
            this.snowman.anchor.x = 0.5;
            this.hat = this.game.add.sprite(0, 0);
            this.nose = this.game.add.sprite(0, 0);
            this.clothe = this.game.add.sprite(0, 0);
            this.wood = this.game.add.sprite(0, 0);
        }
        Snowman.prototype.changeHat = function (key) {
            this.hat.destroy();
            this.hat = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.hat.anchor.x = 0.5;
            this.hatKey = key;
            this.check();
        };
        Snowman.prototype.changeNose = function (key) {
            this.nose.destroy();
            this.nose = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.nose.anchor.x = 0.5;
            this.noseKey = key;
            this.check();
        };
        Snowman.prototype.changeClothe = function (key) {
            this.clothe.destroy();
            this.clothe = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.clothe.anchor.x = 0.5;
            this.clotheKey = key;
            this.check();
        };
        Snowman.prototype.changeWood = function (key) {
            this.wood.destroy();
            this.wood = this.game.add.sprite(0, 0, key + '_weared', null, this);
            this.wood.anchor.x = 0.5;
            this.woodKey = key;
            this.check();
        };
        Snowman.prototype.reset = function () {
            this.hat.destroy();
            this.nose.destroy();
            this.clothe.destroy();
            this.wood.destroy();
            this.hatKey = '';
            this.noseKey = '';
            this.clotheKey = '';
            this.woodKey = '';
        };
        Snowman.prototype.check = function () {
            this.state.checkOrder(this.hatKey, this.noseKey, this.clotheKey, this.woodKey);
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
            do {
                this.hatKey = this.game.rnd.pick(['', 'high_hat', 'christmas_hat']);
                this.noseKey = this.game.rnd.pick(['', 'carrot', 'pouet_pouet']);
                this.clotheKey = this.game.rnd.pick(['', 'blue_scarf', 'red_scarf', 'purple_scarf']);
                this.woodKey = this.game.rnd.pick(['', 'wood_1', 'wood_2', 'wood_3']);
            } while (this.hatKey == '' && this.noseKey == '' && this.clotheKey == '' && this.woodKey == '');
        };
        Order.prototype.show = function () {
            var hat = this.game.add.sprite(0, 0, this.hatKey);
            hat.position.setTo(16, 8);
            hat.scale.setTo(0.5);
            this.addChild(hat);
            var nose = this.game.add.sprite(0, 0, this.noseKey);
            nose.position.setTo(70, -8);
            this.addChild(nose);
            var clothe = this.game.add.sprite(0, 0, this.clotheKey);
            clothe.position.setTo(70, 64);
            clothe.scale.setTo(0.5);
            this.addChild(clothe);
            var wood = this.game.add.sprite(0, 0, this.woodKey);
            wood.position.setTo(16, 64);
            wood.scale.setTo(0.5);
            this.addChild(wood);
        };
        Order.prototype.verify = function (hatKey, noseKey, clotheKey, woodKey) {
            if (this.hatKey == hatKey && this.noseKey == noseKey && this.clotheKey == clotheKey && this.woodKey == woodKey) {
                return true;
            }
            return false;
        };
        return Order;
    })(Phaser.Sprite);
    Winter.Order = Order;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Snowman' />
var Winter;
(function (Winter) {
    var BucketCarrot = (function (_super) {
        __extends(BucketCarrot, _super);
        function BucketCarrot(game, x, y, snowman) {
            _super.call(this, game, x, y, 'bucket_carrot');
            this.snowman = snowman;
            this.disY = y;
            this.anchor.setTo(0.5);
            this.drag = this.game.add.sprite(0, 0, 'carrot');
            this.drag.anchor.setTo(0.5);
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
            this.game.add.existing(this);
        }
        BucketCarrot.prototype.dragStart = function () {
            this.drag.alpha = 1;
        };
        BucketCarrot.prototype.dragStop = function () {
            if (this.drag.overlap(this.snowman)) {
                this.snowman.changeNose(this.drag.key);
            }
            this.drag.position.set(0, 0);
            this.drag.alpha = 0;
        };
        return BucketCarrot;
    })(Phaser.Sprite);
    Winter.BucketCarrot = BucketCarrot;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Snowman' />
var Winter;
(function (Winter) {
    var BucketRed = (function (_super) {
        __extends(BucketRed, _super);
        function BucketRed(game, x, y, snowman) {
            _super.call(this, game, x, y, 'bucket_red');
            this.snowman = snowman;
            this.disY = y;
            this.anchor.setTo(0.5);
            this.drag = this.game.add.sprite(0, 0, 'pouet_pouet');
            this.drag.anchor.setTo(0.5);
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
            this.game.add.existing(this);
        }
        BucketRed.prototype.dragStart = function () {
            this.drag.alpha = 1;
        };
        BucketRed.prototype.dragStop = function () {
            if (this.drag.overlap(this.snowman)) {
                this.snowman.changeNose(this.drag.key);
            }
            this.drag.position.set(0, 0);
            this.drag.alpha = 0;
        };
        return BucketRed;
    })(Phaser.Sprite);
    Winter.BucketRed = BucketRed;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Snowman' />
var Winter;
(function (Winter) {
    var Wood = (function (_super) {
        __extends(Wood, _super);
        function Wood(game, x, y, key, snowman) {
            _super.call(this, game, 0, 0, key + '_sorted');
            this.snowman = snowman;
            this.disX = x;
            this.disY = y;
            this.drag = this.game.add.sprite(this.disX, this.disY, key);
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
        }
        Wood.prototype.dragStart = function () {
            this.drag.alpha = 1;
        };
        Wood.prototype.dragStop = function () {
            if (this.drag.overlap(this.snowman)) {
                this.snowman.changeWood(this.drag.key);
            }
            this.drag.position.set(this.disX, this.disY);
            this.drag.alpha = 0;
        };
        return Wood;
    })(Phaser.Sprite);
    Winter.Wood = Wood;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Wood' />
var Winter;
(function (Winter) {
    var Woods = (function (_super) {
        __extends(Woods, _super);
        function Woods(game, x, y, snowman) {
            _super.call(this, game);
            this.x = x;
            this.y = y;
            this.add(new Winter.Wood(this.game, 15, 0, 'wood_3', snowman));
            this.add(new Winter.Wood(this.game, 50, 25, 'wood_2', snowman));
            this.add(new Winter.Wood(this.game, 0, 40, 'wood_1', snowman));
        }
        return Woods;
    })(Phaser.Group);
    Winter.Woods = Woods;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
var Winter;
(function (Winter) {
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud(game, x, y, snowman) {
            _super.call(this, game);
            this.x = x;
            this.y = y;
            this.snowman = snowman;
            var cloud = this.game.add.sprite(0, 0, 'cloud');
            cloud.anchor.setTo(0.5, 1);
            cloud.inputEnabled = true;
            cloud.input.useHandCursor = true;
            cloud.events.onInputDown.add(this.reset, this);
            this.add(cloud);
            this.snow = this.game.add.sprite(0, 0, 'snow');
            this.snow.anchor.x = 0.5;
            this.snow.scale.y = 0;
            this.snow.visible = false;
            this.add(this.snow);
            this.game.add.existing(this);
        }
        Cloud.prototype.reset = function () {
            this.snowman.reset();
        };
        return Cloud;
    })(Phaser.Group);
    Winter.Cloud = Cloud;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='HatStand' />
/// <reference path='ClothesStand' />
/// <reference path='Snowman' />
/// <reference path='Order' />
/// <reference path='BucketCarrot' />
/// <reference path='BucketRed' />
/// <reference path='Woods' />
/// <reference path='Cloud' />
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
                'cloud',
                'eyes',
                'snow',
                'snowman'
            ];
            for (var i in ress) {
                this.load.image(ress[i], 'assets/' + ress[i] + '.png');
            }
        };
        Play.prototype.create = function () {
            this.createBackground();
            this.snowman = new Winter.Snowman(this.game, 400 + Winter.Game.left, 232 + Winter.Game.top, this);
            new Winter.HatStand(this.game, 98 + Winter.Game.left, 260 + Winter.Game.top, this.snowman);
            new Winter.ClothesStand(this.game, 232 + Winter.Game.left, 260 + Winter.Game.top, this.snowman);
            this.createForground();
            new Winter.BucketCarrot(this.game, 282 + Winter.Game.left, 515 + Winter.Game.top, this.snowman);
            new Winter.BucketRed(this.game, 202 + Winter.Game.left, 535 + Winter.Game.top, this.snowman);
            new Winter.Woods(this.game, 500 + Winter.Game.left, 490 + Winter.Game.top, this.snowman);
            new Winter.Cloud(this.game, 400 + Winter.Game.left, 162 + Winter.Game.top, this.snowman);
            this.newOrder();
        };
        Play.prototype.createForground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0xBCDBE7);
            shape.drawRect(0, 474 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
        };
        Play.prototype.createBackground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0x496586);
            shape.drawRect(0, 426 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.beginFill(0x6984A2);
            shape.drawRect(0, 436 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.beginFill(0x8EB5C4);
            shape.drawRect(0, 450 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
        };
        Play.prototype.newOrder = function () {
            this.orders.push(new Winter.Order(this.game, Winter.Game.fullWidth - 174, 262 + Winter.Game.top));
        };
        Play.prototype.checkOrder = function (hatKey, noseKey, clotheKey, woodKey) {
            var _this = this;
            for (var i in this.orders) {
                if (this.orders[i].verify(hatKey, noseKey, clotheKey, woodKey)) {
                    //return console.log('victory !')
                    this.orders[i].destroy();
                    delete this.orders[i];
                    // Destroy all !
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                        _this.snowman.reset();
                        _this.newOrder();
                    }, this);
                }
            }
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
            Game.fullWidth = document.body.clientWidth;
            Game.fullHeight = document.body.clientHeight;
            if (Game.fullWidth < 800) {
                Game.fullWidth = 800;
            }
            if (Game.fullHeight < 600) {
                Game.fullHeight = 600;
            }
            Game.top = Math.ceil((Game.fullHeight - 600) / 2);
            Game.left = Math.ceil((Game.fullWidth - 800) / 2);
            _super.call(this, Game.fullWidth, Game.fullHeight, Phaser.AUTO, 'game', null, true, true);
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