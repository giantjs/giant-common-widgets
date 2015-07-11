/*global giant, giant, giant, giant, giant */
giant.postpone(giant, 'Highlightable', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * The Highlightable trait adds switchable highlight to widgets.
     * Expects to be added to Widget instances.
     * Expects the host to have the BinaryStateful trait applied.
     * Overrides BinaryStateful's methods, must be added *after* BinaryStateful, and on a different
     * prototype level (using addTraitAndExtend()).
     * @class
     * @extends giant.Base
     * @extends giant.BinaryStateful
     * @extends giant.Widget
     */
    giant.Highlightable = self
        .addConstants(/** @lends giant.Highlightable */{
            /** @constant */
            STATE_NAME_HIGHLIGHTABLE: 'state-highlightable'
        })
        .addPrivateMethods(/** @lends giant.Highlightable# */{
            /**
             * TODO: Refactor to use Set.
             * @private
             */
            _updateHighlightedState: function () {
                // removing all previous highlights
                this.highlightIds
                    .passEachItemTo(this.removeCssClass, this);

                var highlightIds = this.getBinaryState(this.STATE_NAME_HIGHLIGHTABLE)
                    .getSourceIds()
                    .toCollection();

                // adding current highlights
                highlightIds.passEachItemTo(this.addCssClass, this);

                this.highlightIds = highlightIds;
            }
        })
        .addMethods(/** @lends giant.Highlightable# */{
            /** Call from host's init. */
            init: function () {
                // highlightable state does not cascade
                this.addBinaryState(this.STATE_NAME_HIGHLIGHTABLE);

                /**
                 * Lookup of highlight identifiers currently assigned to the instance.
                 * @type {giant.Collection}
                 */
                this.highlightIds = giant.Collection.create();
            },

            /**
             * @param {string} stateName
             * @param {string} sourceId
             * @returns {giant.Highlightable}
             */
            addBinaryStateSource: function (stateName, sourceId) {
                giant.BinaryStateful.addBinaryStateSource.call(this, stateName, sourceId);
                if (stateName === this.STATE_NAME_HIGHLIGHTABLE) {
                    this._updateHighlightedState();
                }
                return this;
            },

            /**
             * @param {string} stateName
             * @returns {giant.Highlightable}
             */
            addImposedStateSource: function (stateName) {
                giant.BinaryStateful.addImposedStateSource.call(this, stateName);
                if (stateName === this.STATE_NAME_HIGHLIGHTABLE) {
                    this._updateHighlightedState();
                }
                return this;
            },

            /**
             * @param {string} stateName
             * @param {string} sourceId
             * @returns {giant.Highlightable}
             */
            removeBinaryStateSource: function (stateName, sourceId) {
                giant.BinaryStateful.removeBinaryStateSource.call(this, stateName, sourceId);
                if (stateName === this.STATE_NAME_HIGHLIGHTABLE) {
                    this._updateHighlightedState();
                }
                return this;
            },

            /**
             * @param {string} stateName
             * @returns {giant.Highlightable}
             */
            removeImposedStateSource: function (stateName) {
                giant.BinaryStateful.removeImposedStateSource.call(this, stateName);
                if (stateName === this.STATE_NAME_HIGHLIGHTABLE) {
                    this._updateHighlightedState();
                }
                return this;
            },

            /**
             * Dummy handler.
             * @param {string} stateName
             */
            afterStateOn: function (stateName) {
            },

            /**
             * Dummy handler.
             * @param {string} stateName
             */
            afterStateOff: function (stateName) {
            },

            /**
             * Marks widget as highlighted.
             * @param {string} [highlightId]
             * @returns {giant.Highlightable}
             */
            highlightOn: function (highlightId) {
                giant.isStringOptional(highlightId, "Invalid highlight ID");
                this.addBinaryStateSource(
                    this.STATE_NAME_HIGHLIGHTABLE,
                    highlightId || 'highlighted');
                return this;
            },

            /**
             * Marks widget as non-highlighted.
             * @param {string} [highlightId]
             * @returns {giant.Highlightable}
             */
            highlightOff: function (highlightId) {
                giant.isStringOptional(highlightId, "Invalid highlight ID");
                this.removeBinaryStateSource(
                    this.STATE_NAME_HIGHLIGHTABLE,
                    highlightId || 'highlighted');
                return this;
            },

            /**
             * Tells whether the widget is currently highlighted.
             * @param {string} [highlightId]
             * @returns {boolean}
             */
            isHighlighted: function (highlightId) {
                giant.isStringOptional(highlightId, "Invalid highlight ID");
                return highlightId ?
                       this.getBinaryState(this.STATE_NAME_HIGHLIGHTABLE)
                           .hasSource(highlightId) :
                       this.isStateOn(this.STATE_NAME_HIGHLIGHTABLE);
            }
        });
});
