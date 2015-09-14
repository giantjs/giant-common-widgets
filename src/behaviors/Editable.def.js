/*global giant */
giant.postpone(giant, 'Editable', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * The Editable trait provides a simple way to manage state changes for widgets that may operate
     * in two modes: display mode, and edit mode, each mode implementing a different markup.
     * TODO: Refactor .editMarkup() and .displayMarkup() into .editTemplate and .displayTemplate.
     * @class
     * @extends giant.Base
     * @extends giant.BinaryStateful
     */
    giant.Editable = self
        .addConstants(/** @lends giant.Editable */{
            /** @constant */
            STATE_NAME_EDITABLE: 'state-editable',

            /**
             * Signals that the host has changed to edit mode.
             * @constant
             */
            EVENT_EDIT_MODE: 'giant.Editable.editMode',

            /**
             * Signals that the host has changed to display mode.
             * @constant
             */
            EVENT_DISPLAY_MODE: 'giant.Editable.displayMode'
        })
        .addPrivateMethods(/** @lends giant.Editable# */{
            /** @private */
            _updateEditableState: function () {
                var eventName;

                // applying appropriate CSS classes
                if (this.isStateOn(self.STATE_NAME_EDITABLE)) {
                    eventName = self.EVENT_EDIT_MODE;

                    this.removeCssClass('display-mode')
                        .addCssClass('edit-mode');
                } else {
                    eventName = self.EVENT_DISPLAY_MODE;

                    this.removeCssClass('edit-mode')
                        .addCssClass('display-mode');
                }

                if (this.editMarkup || this.displayMarkup) {
                    // when host implements different markups for display and edit mode
                    // re-rendering appropriate content markup
                    this.reRenderContents();
                }

                // triggering event about state change
                this.spawnEvent(eventName)
                    .allowBubbling(false)
                    .triggerSync();
            }
        })
        .addMethods(/** @lends giant.Editable# */{
            /** Call from host's .init */
            init: function () {
                // expansion is not cascading (by default)
                this.addBinaryState(self.STATE_NAME_EDITABLE);
            },

            /** Call from host's .afterAdd */
            afterAdd: function () {
                this._updateEditableState();
            },

            /**
             * Call from host's .contentMarkup, and implement .editMarkup and .displayMarkup
             * if the host changes its markup between 'edit' and 'display' modes.
             * @returns {string}
             */
            contentMarkup: function () {
                return this.isStateOn(self.STATE_NAME_EDITABLE) ?
                    this.editMarkup() :
                    this.displayMarkup();
            },

            /**
             * Call from host's .afterStateOn.
             * @param {string} stateName
             */
            afterStateOn: function (stateName) {
                if (stateName === self.STATE_NAME_EDITABLE) {
                    this._updateEditableState();
                }
            },

            /**
             * Call from host's .afterStateOff.
             * @param {string} stateName
             */
            afterStateOff: function (stateName) {
                if (stateName === self.STATE_NAME_EDITABLE) {
                    this._updateEditableState();
                }
            },

            /**
             * Sets the host to edit mode.
             * @returns {giant.Editable}
             */
            toEditMode: function () {
                this.addBinaryStateSource(self.STATE_NAME_EDITABLE, 'default');
                return this;
            },

            /**
             * Sets the host to display mode.
             * @returns {giant.Editable}
             */
            toDisplayMode: function () {
                this.removeBinaryStateSource(self.STATE_NAME_EDITABLE, 'default');
                return this;
            },

            /**
             * Tells whether host is in edit mode.
             * @returns {boolean}
             */
            isInEditMode: function () {
                return this.isStateOn(self.STATE_NAME_EDITABLE);
            },

            /**
             * Tells whether host is in display mode.
             * @returns {boolean}
             */
            isInDisplayMode: function () {
                return !this.isStateOn(self.STATE_NAME_EDITABLE);
            }
        });

    /**
     * @name giant.Editable#editMarkup
     * @function
     * @returns {string}
     */

    /**
     * @name giant.Editable#displayMarkup
     * @function
     * @returns {string}
     */
});
