/*global giant */
$oop.postpone(giant, 'Expandable', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @class
     * @extends $oop.Base
     * @extends giant.BinaryStateful
     * @extends giant.Widget
     */
    giant.Expandable = self
        .addConstants(/** @lends giant.Expandable */{
            /** @constant */
            STATE_NAME_EXPANDABLE: 'state-expandable'
        })
        .addPrivateMethods(/** @lends giant.Expandable# */{
            /** @private */
            _updateExpandedState: function () {
                if (this.isStateOn(self.STATE_NAME_EXPANDABLE)) {
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
                this.addBinaryState(self.STATE_NAME_EXPANDABLE);
            },

            /** @ignore */
            afterStateOn: function (stateName) {
                if (stateName === self.STATE_NAME_EXPANDABLE) {
                    this._updateExpandedState();
                    this.triggerSync(giant.EVENT_EXPANDABLE_EXPAND);
                }
            },

            /** @ignore */
            afterStateOff: function (stateName) {
                if (stateName === self.STATE_NAME_EXPANDABLE) {
                    this._updateExpandedState();
                    this.triggerSync(giant.EVENT_EXPANDABLE_RETRACT);
                }
            },

            /** @returns {giant.Expandable} */
            expandWidget: function () {
                this.addBinaryStateSource(self.STATE_NAME_EXPANDABLE, 'default');
                return this;
            },

            /** @returns {giant.Expandable} */
            contractWidget: function () {
                this.removeBinaryStateSource(self.STATE_NAME_EXPANDABLE, 'default');
                return this;
            },

            /** @returns {boolean} */
            isExpanded: function () {
                return this.isStateOn(self.STATE_NAME_EXPANDABLE);
            }
        });
});

(function () {
    "use strict";

    $oop.addGlobalConstants.call(giant, /** @lends giant */{
        /**
         * Signals that an Expandable has expanded.
         * @constants
         */
        EVENT_EXPANDABLE_EXPAND: 'widget.expanded.on',

        /**
         * Signals that an Expandable has retracted.
         * @constants
         */
        EVENT_EXPANDABLE_RETRACT: 'widget.expanded.off'
    });
}());
