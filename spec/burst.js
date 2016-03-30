(function() {
  var Burst, Swirl, Transit, Tunable, h, t;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  Tunable = mojs.Tunable;

  Tunable = mojs.Tunable;

  t = mojs.tweener;

  h = mojs.h;

  describe('Burst ->', function() {
    beforeEach(function() {
      return t.removeAll();
    });
    describe('extension ->', function() {
      return it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Tunable).toBe(true);
      });
    });
    describe('_defaults ->', function() {
      return it('should have Burst\'s defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst._defaults.count).toBe(5);
        expect(burst._defaults.degree).toBe(360);
        expect(burst._defaults.radius).toEqual({
          0: 50
        });
        expect(burst._defaults.radiusX).toEqual(null);
        expect(burst._defaults.radiusY).toEqual(null);
        return expect(burst._defaults.isSwirl).toEqual(false);
      });
    });
    describe('_render method', function() {
      it('should create master swirl', function() {
        var burst;
        burst = new Burst;
        burst.masterSwirl = void 0;
        burst._render();
        return expect(burst.masterSwirl instanceof Swirl).toBe(true);
      });
      it('should pass options to master swirl', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        burst.masterSwirl = void 0;
        burst._render();
        return expect(burst.masterSwirl._o).toBe(opts);
      });
      it('should pass isWithShape option to master swirl', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        return expect(burst.masterSwirl._o.isWithShape).toBe(false);
      });
      it('should pass radius option to master swirl', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        return expect(burst.masterSwirl._o.radius).toBe(0);
      });
      it('should call _renderSwirls method', function() {
        var burst, opts;
        opts = {};
        burst = new Burst(opts);
        spyOn(burst, '_renderSwirls');
        burst._render();
        return expect(burst._renderSwirls).toHaveBeenCalled();
      });
      it('should create _masterSwirls object', function() {
        var burst;
        burst = new Burst;
        expect(burst._masterSwirls[0]).toBe(burst.masterSwirl);
        expect(typeof burst._masterSwirls).toBe('object');
        return expect(burst._masterSwirls).toBe(burst._masterSwirls);
      });
      return it('should add optional properties to option', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, '_addOptionalProperties');
        burst._renderSwirls();
        return expect(burst._addOptionalProperties.calls.count()).toBe(5);
      });
    });
    describe('_renderSwirls method', function() {
      it('should create _swirls object', function() {
        var burst;
        burst = new Burst;
        expect(typeof burst._swirls).toBe('object');
        return expect(burst._swirls).toBe(burst._swirls);
      });
      it('should create _swirls pack', function() {
        var burst, count, pack;
        count = 5;
        burst = new Burst({
          count: count
        });
        pack = burst._swirls[0];
        expect(h.isArray(pack)).toBe(true);
        expect(pack.length).toBe(count);
        expect(pack[0] instanceof Swirl).toBe(true);
        expect(pack[1] instanceof Swirl).toBe(true);
        expect(pack[2] instanceof Swirl).toBe(true);
        expect(pack[3] instanceof Swirl).toBe(true);
        return expect(pack[4] instanceof Swirl).toBe(true);
      });
      it('should pass options to swirls', function() {
        var burst, count, fills, pack;
        count = 5;
        fills = ['cyan', 'yellow', 'blue'];
        burst = new Burst({
          count: count,
          childOptions: {
            fill: fills
          }
        });
        pack = burst._swirls[0];
        expect(pack[0]._o.fill).toBe(fills[0]);
        expect(pack[1]._o.fill).toBe(fills[1]);
        expect(pack[2]._o.fill).toBe(fills[2]);
        expect(pack[3]._o.fill).toBe(fills[0]);
        return expect(pack[4]._o.fill).toBe(fills[1]);
      });
      return it('should parent to swirls', function() {
        var burst, count, pack;
        count = 5;
        burst = new Burst({
          count: count
        });
        pack = burst._swirls[0];
        expect(pack[0]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[1]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[2]._o.parent).toBe(burst.masterSwirl.el);
        expect(pack[3]._o.parent).toBe(burst.masterSwirl.el);
        return expect(pack[4]._o.parent).toBe(burst.masterSwirl.el);
      });
    });
    describe('_getChildOption method ->', function() {
      return it('should get options from childOptions', function() {
        var b, o, result;
        b = new Burst({
          count: 2
        });
        o = {
          childOptions: {
            fill: ['yellow', 'cyan', 'blue']
          }
        };
        result = b._getChildOption(o, 1);
        expect(result.fill).toBe('cyan');
        return it('should not throw if there is no childOptions', function() {
          b = new Burst({
            count: 2
          });
          o = {};
          result = b._getChildOption(o, 1);
          return expect(result).toEqual({});
        });
      });
    });
    describe('_getPropByMod method ->', function() {
      it('should fallback to empty object', function() {
        var burst, opt0;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0);
        return expect(opt0).toBe(void 0);
      });
      it('should return the prop from passed object based on index ->', function() {
        var burst, opt0, opt1, opt2, opt8;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt2 = burst._getPropByMod('radius', 2, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, from, opt0, opt1, opt8;
        burst = new Burst({
          fill: 'cyan',
          childOptions: {
            radius: 20
          }
        });
        from = burst._o;
        opt0 = burst._getPropByMod('fill', 0, from);
        opt1 = burst._getPropByMod('fill', 1, from);
        opt8 = burst._getPropByMod('fill', 8, from);
        expect(opt0).toBe('cyan');
        expect(opt1).toBe('cyan');
        return expect(opt8).toBe('cyan');
      });
    });
    describe('_makeTween method ->', function() {
      return it('should override parent', function() {
        var bs;
        bs = new Burst;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        bs._makeTween();
        return expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
      });
    });
    describe('_makeTimeline method ->', function() {
      it('should call super', function() {
        var bs;
        bs = new Burst;
        spyOn(mojs.Tweenable.prototype, '_makeTimeline');
        bs._makeTimeline();
        return expect(mojs.Tweenable.prototype._makeTimeline).toHaveBeenCalled();
      });
      it('should add masterSwirl to the timeline', function() {
        var bs;
        bs = new Burst;
        return expect(bs.timeline._timelines[0]).toBe(bs.masterSwirl.timeline);
      });
      return it('should add swirls to the timeline', function() {
        var bs;
        bs = new Burst({
          count: 5
        });
        expect(bs.timeline._timelines[1]).toBe(bs._swirls[0][0].timeline);
        expect(bs.timeline._timelines[2]).toBe(bs._swirls[0][1].timeline);
        expect(bs.timeline._timelines[3]).toBe(bs._swirls[0][2].timeline);
        expect(bs.timeline._timelines[4]).toBe(bs._swirls[0][3].timeline);
        return expect(bs.timeline._timelines[5]).toBe(bs._swirls[0][4].timeline);
      });
    });
    describe('_addOptionalProperties method ->', function() {
      it('should return the passed object', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        return expect(result).toBe(obj);
      });
      it('should add parent, index', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.index).toBe(0);
        return expect(result.parent).toBe(burst.masterSwirl.el);
      });
      it('should set isSiwrl to false by default', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.isSwirl).toBe(false);
        obj = {
          isSwirl: true
        };
        result = burst._addOptionalProperties(obj, 0);
        return expect(result.isSwirl).toBe(true);
      });
      it('should hard rewrite `left` and `top` properties to 50%', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.left).toBe('50%');
        return expect(result.top).toBe('50%');
      });
      it('should add x/y ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          isIt: 1,
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.x[0]).toBeCloseTo(0, 5);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        expect(obj1.x[0]).toBeCloseTo(0, 5);
        return expect(obj1.y[0]).toBeCloseTo(100, 5);
      });
      return it('should add angles ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2
        });
        obj0 = {
          angle: 0
        };
        obj1 = {
          angle: 0
        };
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.angle).toBe(90);
        return expect(obj1.angle).toBe(270);
      });
    });
    describe('_getBitAngle method ->', function() {
      it('should get angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(0, 0)).toBe(90);
        expect(burst._getBitAngle(0, 1)).toBe(162);
        expect(burst._getBitAngle(0, 2)).toBe(234);
        expect(burst._getBitAngle(90, 2)).toBe(234 + 90);
        expect(burst._getBitAngle(0, 3)).toBe(306);
        expect(burst._getBitAngle(90, 3)).toBe(306 + 90);
        expect(burst._getBitAngle(0, 4)).toBe(378);
        return expect(burst._getBitAngle(50, 4)).toBe(378 + 50);
      });
      it('should fallback to 0', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(void 0, 0)).toBe(90);
        expect(burst._getBitAngle(void 0, 1)).toBe(162);
        return expect(burst._getBitAngle(void 0, 2)).toBe(234);
      });
      it('should get delta angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle({
          180: 0
        }, 0)[270]).toBe(90);
        expect(burst._getBitAngle({
          50: 20
        }, 3)[356]).toBe(326);
        return expect(burst._getBitAngle({
          50: 20
        }, 4)[428]).toBe(398);
      });
      it('should work with `stagger` values', function() {
        var burst;
        burst = new Burst({
          count: 2
        });
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 0)[110]).toBe(90);
        expect(burst._getBitAngle({
          'stagger(20, 10)': 0
        }, 1)[300]).toBe(270);
        return expect(burst._getBitAngle({
          0: 'stagger(20, 10)'
        }, 1)[270]).toBe(300);
      });
      return it('should work with `random` values', function() {
        var angle, baseAngle, burst, key, value, _i, _j, _k, _len, _len1, _len2, _results;
        burst = new Burst({
          count: 2
        });
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 0);
        for (value = _i = 0, _len = angle.length; _i < _len; value = ++_i) {
          key = angle[value];
          baseAngle = 90;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          'rand(10, 20)': 0
        }, 1);
        for (value = _j = 0, _len1 = angle.length; _j < _len1; value = ++_j) {
          key = angle[value];
          baseAngle = 270;
          expect(parseInt(key)).toBeGreaterThan(baseAngle + 10);
          expect(parseInt(key)).not.toBeGreaterThan(baseAngle + 20);
          expect(parseInt(value)).toBe(baseAngle);
        }
        angle = burst._getBitAngle({
          0: 'rand(10, 20)'
        }, 1);
        _results = [];
        for (value = _k = 0, _len2 = angle.length; _k < _len2; value = ++_k) {
          key = angle[value];
          baseAngle = 270;
          expect(parseInt(key)).toBe(baseAngle);
          expect(parseInt(value)).toBeGreaterThan(baseAngle + 10);
          _results.push(expect(parseInt(value)).not.toBeGreaterThan(baseAngle + 20));
        }
        return _results;
      });
    });
    describe('_getSidePoint method ->', function() {
      return it('should return the side\'s point', function() {
        var burst, point;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        point = burst._getSidePoint('start', 0);
        expect(point.x).toBeDefined();
        return expect(point.y).toBeDefined();
      });
    });
    describe('_getSideRadius method ->', function() {
      return it('should return the side\'s radius, radiusX and radiusY', function() {
        var burst, sides;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        sides = burst._getSideRadius('start');
        expect(sides.radius).toBe(5);
        expect(sides.radiusX).toBe(10);
        return expect(sides.radiusY).toBe(30);
      });
    });
    describe('_getRadiusByKey method ->', function() {
      return it('should return the key\'s radius', function() {
        var burst, radius, radiusX, radiusY;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 20
          }
        });
        radius = burst._getRadiusByKey('radius', 'start');
        radiusX = burst._getRadiusByKey('radiusX', 'start');
        radiusY = burst._getRadiusByKey('radiusX', 'end');
        expect(radius).toBe(5);
        expect(radiusX).toBe(10);
        return expect(radiusY).toBe(20);
      });
    });
    return describe('_getDeltaFromPoints method ->', function() {
      it('should return the delta', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 20,
          y: 40
        });
        return expect(delta[10]).toBe(20);
      });
      return it('should return one value if start and end positions are equal', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 10,
          y: 40
        });
        return expect(delta).toBe(10);
      });
    });
  });

}).call(this);
