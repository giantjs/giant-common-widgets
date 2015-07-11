/*global giant, giant, giant, giant, giant */
/*global module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, notDeepEqual, raises */
(function () {
    "use strict";

    module("Disableable");

    var base = giant.Widget,
        Disableable = base.extend('Disableable')
            .addTraitAndExtend(giant.BinaryStateful)
            .addTraitAndExtend(giant.Disableable)
            .addMethods({
                init: function () {
                    base.init.call(this);
                    giant.BinaryStateful.init.call(this);
                    giant.Disableable.init.call(this);
                },

                afterAdd: function () {
                    base.afterAdd.call(this);
                    giant.BinaryStateful.afterAdd.call(this);
                },

                afterRemove: function () {
                    base.afterRemove.call(this);
                    giant.BinaryStateful.afterRemove.call(this);
                }
            });

    test("Instantiation", function () {
        Disableable.addMocks({
            addBinaryState: function (stateName) {
                equal(stateName, giant.Disableable.STATE_NAME_DISABLEBABLE,
                    "should add disableable state to instance");
            }
        });

        Disableable.create();

        Disableable.removeMocks();
    });

    test("State on handler", function () {
        expect(1);

        var disableable = Disableable.create();

        disableable.addMocks({
            _updateEnabledStyle: function () {
                ok(true, "should update disabled style");
            }
        });

        disableable.afterStateOn('foo');

        disableable.afterStateOn(giant.Disableable.STATE_NAME_DISABLEBABLE);
    });

    test("State off handler", function () {
        expect(1);

        var disableable = Disableable.create();

        disableable.addMocks({
            _updateEnabledStyle: function () {
                ok(true, "should update disabled style");
            }
        });

        disableable.afterStateOff('foo');

        disableable.afterStateOff(giant.Disableable.STATE_NAME_DISABLEBABLE);
    });

    test("Disabling", function () {
        expect(3);

        var disableable = Disableable.create();

        disableable.addMocks({
            addBinaryStateSource: function (stateName, sourceId) {
                equal(stateName, giant.Disableable.STATE_NAME_DISABLEBABLE,
                    "should add to state by specified name");
                equal(sourceId, 'foo', "should pass specified source ID to state");
            }
        });

        strictEqual(disableable.disableBy('foo'), disableable, "should be chainable");
    });

    test("Disabling", function () {
        expect(3);

        var disableable = Disableable.create();

        disableable.addMocks({
            removeBinaryStateSource: function (stateName, sourceId) {
                equal(stateName, giant.Disableable.STATE_NAME_DISABLEBABLE,
                    "should remove from state by specified name");
                equal(sourceId, 'foo', "should pass specified source ID to state");
            }
        });

        strictEqual(disableable.enableBy('foo'), disableable, "should be chainable");
    });

    test("Force enable", function () {
        expect(3);

        var disableable = Disableable.create();

        disableable.addMocks({
            removeBinaryStateSource: function (stateName, sourceId) {
                equal(stateName, giant.Disableable.STATE_NAME_DISABLEBABLE,
                    "should remove from state by specified name");
                equal(typeof sourceId, 'undefined', "should pass undefined as source ID");
            }
        });

        strictEqual(disableable.forceEnable(), disableable, "should be chainable");
    });

    test("Disabled state tester", function () {
        expect(2);

        var disableable = Disableable.create(),
            result;

        disableable.addMocks({
            isStateOn: function (stateName) {
                equal(stateName, giant.Disableable.STATE_NAME_DISABLEBABLE,
                    "should remove from state by specified name");
                return result;
            }
        });

        strictEqual(
            disableable.isDisabled(),
            result,
            "should return value returned by isStateOn");
    });
}());
