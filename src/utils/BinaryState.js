/*global giant */
giant.postpone(giant, 'BinaryState', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * Creates a BinaryState instance.
     * @name giant.BinaryState.create
     * @function
     * @param {string} stateName Identifies the binary state.
     * @returns {giant.BinaryState}
     * @see String#toBinaryState
     */

    /**
     * The BinaryState implements a named state that can take two values: true or false,
     * but which value depends on the number of sources contributing the state.
     * The value is false when no source contributes the state, true otherwise.
     * TODO: Remove .addStateAsSource.
     * @class
     * @extends giant.Base
     */
    giant.BinaryState = self
        .addMethods(/** @lends giant.BinaryState# */{
            /**
             * @param {string} stateName
             * @ignore
             */
            init: function (stateName) {
                giant.isString(stateName, "Invalid state name");

                /**
                 * Name of the state. Eg. "expandable".
                 * @type {string}
                 */
                this.stateName = stateName;

                /**
                 * Lookup of source identifiers contributing the state.
                 * @type {giant.Collection}
                 */
                this.stateSources = giant.Collection.create();

                /**
                 * Whether state can cascade, ie. be influenced by other states.
                 * @type {boolean}
                 */
                this.isCascading = false;
            },

            /**
             * @param {boolean} isCascading
             * @returns {giant.BinaryState}
             */
            setIsCascading: function (isCascading) {
                this.isCascading = isCascading;
                return this;
            },

            /**
             * Adds the specified source to the state.
             * @param {string} sourceId Identifies the contributing source.
             * @returns {giant.BinaryState}
             */
            addSource: function (sourceId) {
                this.stateSources.setItem(sourceId, true);
                return this;
            },

            /**
             * Removes the specified source.
             * @param {string} [sourceId] Identifies the contributing source.
             * @returns {giant.BinaryState}
             */
            removeSource: function (sourceId) {
                if (typeof sourceId === 'string') {
                    this.stateSources.deleteItem(sourceId);
                } else {
                    this.stateSources.clear();
                }
                return this;
            },

            /**
             * Tells whether the specified state contributes to the state.
             * @param {string} sourceId
             * @returns {boolean}
             */
            hasSource: function (sourceId) {
                return this.stateSources.getItem(sourceId);
            },

            /**
             * Retrieves the identifiers of all contributing sources.
             * @returns {string[]}
             */
            getSourceIds: function () {
                return this.stateSources.getKeys();
            },

            /**
             * Determines the number of contributing sources.
             * @returns {number}
             */
            getSourceCount: function () {
                return this.stateSources.getKeyCount();
            },

            /**
             * Determines whether the state value is true, ie. there is at leas one source
             * contributing.
             * @returns {boolean}
             */
            isStateOn: function () {
                return this.stateSources.getKeyCount() > 0;
            },

            /**
             * Adds another state as contributing source.
             * Takes effect only if state is cascading.
             * TODO: Remove, and place logic in classes that use BinaryState.
             * @param {giant.BinaryState} binaryState
             * @param {string} sourceId
             * @returns {giant.BinaryState}
             */
            addStateAsSource: function (binaryState, sourceId) {
                giant.isBinaryState(binaryState, "Invalid binary state");
                if (this.isCascading && binaryState.isStateOn()) {
                    this.addSource(sourceId);
                }
                return this;
            }
        });
});

(function () {
    "use strict";

    giant.addTypes(/** @lends giant */{
        /** @param {giant.BinaryState} expr */
        isBinaryState: function (expr) {
            return giant.BinaryState.isBaseOf(expr);
        },

        /** @param {giant.BinaryState} [expr] */
        isBinaryStateOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   giant.BinaryState.isBaseOf(expr);
        }
    });

    giant.Properties.addProperties.call(
        String.prototype,
        /** @lends String# */{
            /**
             * @returns {giant.BinaryState}
             */
            toBinaryState: function () {
                return giant.BinaryState.create(this.valueOf());
            }
        },
        false, false, false
    );
}());
