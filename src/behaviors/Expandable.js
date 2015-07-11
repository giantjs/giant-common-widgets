/*global giant, giant, giant, giant */
giant.postpone(giant, 'Expandable', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * @class
     * @extends giant.Base
     * @extends giant.BinaryStateful
     * @extends giant.Widget
     */
    giant.Expandable = self
        .addConstants(/** @lends giant.Expandable */{
            /** @constant */
            STATE_NAME_EXPANDABLE: 'state-expandable',

            /** @constants */
            EVENT_EXPAND: 'expand',

            /** @constants */
            EVENT_RETRACT: 'retract'
        })
        .addPrivateMethods(/** @lends giant.Expandable# */{
            /** @private */
            _updateExpandedState: function () {
                if (this.isStateOn(this.STATE_NAME_EXPANDABLE)) {
                    this
                        .removeCssClass('widget-retracted')
                        .addCssClass('widget-expanded');
                } else {
                    this
                        .removeCssClass('widget-expanded')
                        .addCssClass('widget-retracted');
                }
            }
        })
        .addMethods(/** @lends giant.Expandable# */{
            /** Call from host's init. */
            init: function () {
                // expansion is not cascading (by default)
                this.addBinaryState(this.STATE_NAME_EXPANDABLE);
            },

            /** @ignore */
            afterStateOn: function (stateName) {
                if (stateName === this.STATE_NAME_EXPANDABLE) {
                    this._updateExpandedState();
                    this.triggerSync(this.EVENT_EXPAND);
                }
            },

            /** @ignore */
            afterStateOff: function (stateName) {
                if (stateName === this.STATE_NAME_EXPANDABLE) {
                    this._updateExpandedState();
                    this.triggerSync(this.EVENT_RETRACT);
                }
            },

            /** @returns {giant.Expandable} */
            expandWidget: function () {
                this.addBinaryStateSource(this.STATE_NAME_EXPANDABLE, 'default');
                return this;
            },

            /** @returns {giant.Expandable} */
            contractWidget: function () {
                this.removeBinaryStateSource(this.STATE_NAME_EXPANDABLE, 'default');
                return this;
            },

            /** @returns {boolean} */
            isExpanded: function () {
                return this.isStateOn(this.STATE_NAME_EXPANDABLE);
            }
        });
});
