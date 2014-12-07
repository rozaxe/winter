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
            this.y = Winter.Game.fullHeight;
            this.initX = x;
            this.initY = y;
            this.snowman = this.game.add.sprite(0, 0, 'snowman', null, this);
            this.snowman.anchor.x = 0.5;
            this.hat = this.game.add.sprite(0, 0);
            this.nose = this.game.add.sprite(0, 0);
            this.clothe = this.game.add.sprite(0, 0);
            this.wood = this.game.add.sprite(0, 0);
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1200).start();
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
        Snowman.prototype.clean = function () {
            var _this = this;
            [this.hat, this.nose, this.clothe, this.wood].forEach(function (x) {
                var tween = _this.game.add.tween(x).to({ alpha: 0 }, 100);
                tween.onComplete.add(function () {
                    x.destroy();
                }, _this);
                tween.start();
            });
            this.hatKey = '';
            this.noseKey = '';
            this.clotheKey = '';
            this.woodKey = '';
        };
        Snowman.prototype.reset = function () {
            this.y = Winter.Game.fullHeight;
            this.x = this.initX;
            this.hat.destroy();
            this.nose.destroy();
            this.clothe.destroy();
            this.wood.destroy();
            this.hatKey = '';
            this.noseKey = '';
            this.clotheKey = '';
            this.woodKey = '';
            this.game.add.tween(this).to({ y: this.initY }, 1000, Phaser.Easing.Bounce.Out).start();
        };
        Snowman.prototype.check = function () {
            this.state.checkOrder(this.hatKey, this.noseKey, this.clotheKey, this.woodKey);
        };
        Snowman.prototype.liveeeee = function () {
            var _this = this;
            // Eye
            var eyes = this.game.add.sprite(-2, 94, 'eyes', null, this);
            eyes.anchor.setTo(0.5);
            eyes.scale.y = 0;
            this.game.add.tween(eyes.scale).to({ y: 1 }, 200).start();
            // Jump
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
                var vanHalen = function (v) {
                    return Math.sin(v * Math.PI) * 0.3;
                };
                var move = _this.game.add.tween(_this);
                var jump = _this.game.add.tween(_this);
                move.to({ x: Winter.Game.fullWidth + 200 }, 1500);
                move.onComplete.add(function () {
                    jump.stop();
                    eyes.destroy();
                    _this.reset();
                }, _this);
                jump.to({ y: 30 }, 500, vanHalen, true, 0, Number.MAX_VALUE, false);
                move.start();
            }, this);
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
            this.snowman = snowman;
            this.x = x;
            this.y = Winter.Game.fullHeight;
            var stand = this.game.add.sprite(0, 0, 'hat_stand');
            stand.anchor.x = 0.5;
            this.add(stand);
            this.add(new Winter.Hat(this.game, 15, 'high_hat', 0, snowman));
            this.add(new Winter.Hat(this.game, 45, 'christmas_hat', 1, snowman));
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1300).start();
        }
        HatStand.prototype.addMelon = function () {
            this.add(new Winter.Hat(this.game, 75, 'melon_hat', 0, this.snowman));
            HatStand.available.push('melon_hat');
            var emitter = this.game.add.emitter(16, 85, 20);
            emitter.makeParticles('confetti', [0, 1, 2, 3]);
            emitter.start(false, 3000, 20);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                emitter.on = false;
            }, this);
            this.add(emitter);
        };
        HatStand.prototype.addFlat = function () {
            this.add(new Winter.Hat(this.game, 105, 'flat_hat', 1, this.snowman));
            HatStand.available.push('flat_hat');
            var emitter = this.game.add.emitter(-32, 120, 20);
            emitter.makeParticles('confetti', [0, 1, 2, 3]);
            emitter.start(false, 3000, 20);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                emitter.on = false;
            }, this);
            this.add(emitter);
        };
        HatStand.available = ['', 'high_hat', 'christmas_hat'];
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
            this.snowman = snowman;
            this.x = x;
            this.y = Winter.Game.fullHeight;
            var stand = this.game.add.sprite(0, 0, 'clothes_stand');
            stand.anchor.x = 0.5;
            this.add(stand);
            this.add(new Winter.Clothe(this.game, 15, 'blue_scarf', snowman));
            this.add(new Winter.Clothe(this.game, 45, 'red_scarf', snowman));
            this.add(new Winter.Clothe(this.game, 75, 'purple_scarf', snowman));
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1100).start();
        }
        ClothesStand.prototype.addClothe = function () {
            this.add(new Winter.Clothe(this.game, 105, 'green_scarf', this.snowman));
            ClothesStand.available.push('green_scarf');
            var emitter = this.game.add.emitter(0, 120, 20);
            emitter.makeParticles('confetti', [0, 1, 2, 3]);
            emitter.start(false, 3000, 20);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                emitter.on = false;
            }, this);
            this.add(emitter);
        };
        ClothesStand.available = ['', 'blue_scarf', 'red_scarf', 'purple_scarf'];
        return ClothesStand;
    })(Phaser.Group);
    Winter.ClothesStand = ClothesStand;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
var Winter;
(function (Winter) {
    var Order = (function (_super) {
        __extends(Order, _super);
        function Order(game, x, y, first) {
            _super.call(this, game, Winter.Game.fullWidth, y, 'bubble');
            if (first) {
                this.firstOrder();
            }
            else {
                this.randomOrder();
            }
            this.show();
            this.game.add.existing(this);
            this.game.add.tween(this).to({ x: x }, 200, Phaser.Easing.Linear.None).start();
        }
        Order.prototype.firstOrder = function () {
            this.hatKey = 'high_hat';
            this.clotheKey = '';
            this.noseKey = 'carrot';
            this.woodKey = '';
        };
        Order.prototype.randomOrder = function () {
            do {
                this.hatKey = this.game.rnd.pick(Winter.HatStand.available);
                this.noseKey = this.game.rnd.pick(['', 'carrot', 'pouet_pouet']);
                this.clotheKey = this.game.rnd.pick(Winter.ClothesStand.available);
                this.woodKey = this.game.rnd.pick(Winter.Woods.available);
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
        Order.prototype.valid = function () {
            var _this = this;
            var valid = this.game.add.sprite(0, 0, 'valid');
            valid.alpha = 0;
            this.addChild(valid);
            var anim = this.game.add.tween(valid);
            anim.onComplete.add(function () {
                var kill = _this.game.add.tween(_this);
                kill.onComplete.add(function () {
                    _this.destroy();
                }, _this);
                kill.to({ x: Winter.Game.fullWidth }, 200).start();
            }, this);
            anim.to({ alpha: 1 }, 100).start();
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
            _super.call(this, game, x, Winter.Game.fullHeight, 'bucket_carrot');
            this.snowman = snowman;
            this.anchor.setTo(0.5, 0);
            this.drag = this.game.add.sprite(0, 0, 'carrot');
            this.drag.anchor.setTo(0.5);
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
            this.game.add.existing(this);
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1200).start();
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
            _super.call(this, game, x, Winter.Game.fullHeight, 'bucket_red');
            this.snowman = snowman;
            this.anchor.setTo(0.5, 0);
            this.drag = this.game.add.sprite(0, 0, 'pouet_pouet');
            this.drag.anchor.setTo(0.5);
            this.addChild(this.drag);
            this.drag.alpha = 0;
            this.drag.inputEnabled = true;
            this.drag.input.enableDrag();
            this.drag.events.onDragStart.add(this.dragStart, this);
            this.drag.events.onDragStop.add(this.dragStop, this);
            this.game.add.existing(this);
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1300).start();
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
            this.snowman = snowman;
            this.x = x;
            this.y = Winter.Game.fullHeight;
            this.add(new Winter.Wood(this.game, 15, 0, 'wood_3', snowman));
            this.add(new Winter.Wood(this.game, 0, 40, 'wood_1', snowman));
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1111).start();
        }
        Woods.prototype.addWood = function () {
            this.add(new Winter.Wood(this.game, 50, 25, 'wood_2', this.snowman));
            Woods.available.push('wood_2');
            var emitter = this.game.add.emitter(75, 25, 20);
            emitter.makeParticles('confetti', [0, 1, 2, 3]);
            emitter.start(false, 3000, 20);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                emitter.on = false;
            }, this);
            this.add(emitter);
        };
        Woods.available = ['', 'wood_3', 'wood_1'];
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
            this.x = x + 16;
            this.y = 0;
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
            // Float
            this.game.add.tween(this).to({ x: x - 16 }, 10000).to({ x: x + 16 }, 10000).loop().start();
            // Appear
            this.game.add.tween(this).to({ y: y }, 1000, Phaser.Easing.Bounce.Out).delay(1100).start();
        }
        Cloud.prototype.reset = function () {
            var _this = this;
            this.snow.visible = true;
            var tween = this.game.add.tween(this.snow.scale);
            tween.to({ y: (500 + Winter.Game.top) / 100 }, 200);
            tween.onComplete.add(function () {
                _this.snowman.clean();
                var tween = _this.game.add.tween(_this.snow);
                tween.to({ y: Winter.Game.fullHeight }, 200);
                tween.delay(300);
                tween.onComplete.add(function () {
                    _this.snow.visible = false;
                    _this.snow.scale.y = 0;
                    _this.snow.y = 0;
                }, _this);
                tween.start();
            }, this);
            tween.start();
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
        Play.prototype.create = function () {
            var _this = this;
            this.game.add.sprite(32, 32, 'moon');
            this.createBackground();
            this.snowman = new Winter.Snowman(this.game, 400 + Winter.Game.left, 232 + Winter.Game.top, this);
            this.hatStand = new Winter.HatStand(this.game, 98 + Winter.Game.left, 260 + Winter.Game.top, this.snowman);
            this.clothesStand = new Winter.ClothesStand(this.game, 232 + Winter.Game.left, 260 + Winter.Game.top, this.snowman);
            this.createForground();
            new Winter.BucketCarrot(this.game, 282 + Winter.Game.left, 515 + Winter.Game.top, this.snowman);
            new Winter.BucketRed(this.game, 202 + Winter.Game.left, 535 + Winter.Game.top, this.snowman);
            this.woods = new Winter.Woods(this.game, 500 + Winter.Game.left, 490 + Winter.Game.top, this.snowman);
            new Winter.Cloud(this.game, 400 + Winter.Game.left, 162 + Winter.Game.top, this.snowman);
            this.createSnow();
            this.game.time.events.add(Phaser.Timer.SECOND * 3, function () {
                _this.newOrder(true);
            }, this);
            this.toAdd = [
                this.hatStand,
                this.hatStand.addFlat,
                this.clothesStand,
                this.clothesStand.addClothe,
                this.woods,
                this.woods.addWood,
                this.hatStand,
                this.hatStand.addMelon,
            ];
        };
        Play.prototype.createSnow = function () {
            var back_emitter = this.game.add.emitter(Winter.Game.left + 400, -32, 500);
            back_emitter.makeParticles('snowflakes', [0, 1]);
            back_emitter.maxParticleScale = 0.5;
            back_emitter.minParticleScale = 0.2;
            back_emitter.setYSpeed(20, 100);
            back_emitter.gravity = 0;
            back_emitter.width = Winter.Game.fullWidth * 1.5;
            back_emitter.minRotation = 0;
            back_emitter.maxRotation = 40;
            back_emitter.start(false, 14000, 30);
        };
        Play.prototype.createForground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0xBCDBE7);
            shape.drawRect(0, 474 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.y = Winter.Game.fullHeight;
            this.game.add.tween(shape).to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out).delay(100).start();
            var forest = this.game.add.sprite(Winter.Game.left - 100, Winter.Game.fullHeight, 'forest');
            forest.anchor.x = 1;
            this.game.add.tween(forest).to({ y: Winter.Game.top + 80 }, 1000, Phaser.Easing.Bounce.Out).delay(900).start();
        };
        Play.prototype.createBackground = function () {
            var shape = this.game.add.graphics(0, 0);
            shape.beginFill(0x496586);
            shape.drawRect(0, 426 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.beginFill(0x6984A2);
            shape.drawRect(0, 436 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.beginFill(0x8EB5C4);
            shape.drawRect(0, 450 + Winter.Game.top, Winter.Game.fullWidth, 226 + Winter.Game.top);
            shape.y = Winter.Game.fullHeight;
            this.game.add.tween(shape).to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out).start();
        };
        Play.prototype.newOrder = function (first) {
            this.orders.push(new Winter.Order(this.game, Winter.Game.fullWidth - 174, 262 + Winter.Game.top, first));
        };
        Play.prototype.checkOrder = function (hatKey, noseKey, clotheKey, woodKey) {
            var _this = this;
            for (var i in this.orders) {
                if (this.orders[i].verify(hatKey, noseKey, clotheKey, woodKey)) {
                    this.orders[i].valid();
                    delete this.orders[i];
                    this.snowman.liveeeee();
                    if (this.toAdd.length > 0) {
                        var func = this.toAdd.pop();
                        var name = this.toAdd.pop();
                        func.call(name);
                    }
                    // New order
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
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
var Winter;
(function (Winter) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('moon', 'assets/moon.png');
            this.load.spritesheet('snowflakes', 'assets/snowflakes.png', 16, 16);
        };
        Boot.prototype.create = function () {
            this.game.state.start('loader');
        };
        return Boot;
    })(Phaser.State);
    Winter.Boot = Boot;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
var Winter;
(function (Winter) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            _super.apply(this, arguments);
        }
        Loader.prototype.loadAssets = function () {
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
                'forest',
                'bubble',
                'valid',
                'cloud',
                'eyes',
                'snow',
                'snowman'
            ];
            for (var i in ress) {
                this.load.image(ress[i], 'assets/' + ress[i] + '.png');
            }
            this.load.spritesheet('confetti', 'assets/confetti.png', 4, 4);
            this.load.start();
        };
        Loader.prototype.create = function () {
            this.mask = this.game.add.graphics(32, 32);
            this.mask.beginFill(0);
            this.mask.drawRect(0, 0, 100, 100);
            this.mask.scale.y = 0;
            var moon = this.game.add.sprite(32, 32, 'moon');
            moon.mask = this.mask;
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);
            this.loadAssets();
        };
        Loader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.mask.scale.y = progress / 100;
        };
        Loader.prototype.loadComplete = function () {
            this.game.state.start('play');
        };
        return Loader;
    })(Phaser.State);
    Winter.Loader = Loader;
})(Winter || (Winter = {}));
/// <reference path='d/phaser' />
/// <reference path='Boot' />
/// <reference path='Loader' />
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
            this.state.add('boot', Winter.Boot);
            this.state.add('loader', Winter.Loader);
            this.state.add('play', Winter.Play);
            this.state.start('boot');
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