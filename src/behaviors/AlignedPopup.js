/*global giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'AlignedPopup', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = giant.Popup,
        self = base.extend();

    /**
     * The AlignedPopup trait extends the Popup trait with aligning the widget's DOM to the DOM of its parent.
     * Relies on jQuery UI's positioning.
     * @class
     * @extends giant.Popup
     * @link http://api.jqueryui.com/position
     */
    giant.AlignedPopup = self
        .addPrivateMethods(/** @lends giant.AlignedPopup# */{
            /** @private */
            _alignPopup: function () {
                var element = this.getElement();
                if (element) {
                    $(element).position(this.positionOptions.items);
                }
            },

            /** @private */
            _updateOfPositionOption: function () {
                var parentElement = this.parent.getElement();
                if (parentElement) {
                    this.setPositionOption('of', $(parentElement));
                }
                return this;
            }
        })
        .addMethods(/** @lends giant.AlignedPopup# */{
            /** Call from host class' init. */
            init: function () {
                base.init.call(this);

                this.elevateMethod('onResize');

                /**
                 * Options for positioning the select list popup around its parent.
                 * @type {giant.Collection}
                 */
                this.positionOptions = giant.Collection.create({
                    my: 'left top',
                    at: 'left bottom'
                });
            },

            /** Call from host class' afterAdd. */
            afterAdd: function () {
                base.afterAdd.call(this);
                this.subscribeTo(giant.ResizeWatcher.EVENT_WINDOW_RESIZE_DEBOUNCED, this.onResize);
            },

            /** Call from host class' afterRender. */
            afterRender: function () {
                base.afterRender.call(this);
                this._updateOfPositionOption();
            },

            /**
             * Sets jQuery UI position option. Accepts any options combination that jQuery UI's .position() does.
             * @param {string} optionName
             * @param {*} [optionValue]
             * @returns {giant.AlignedPopup}
             * @link http://api.jqueryui.com/position/
             */
            setPositionOption: function (optionName, optionValue) {
                if (typeof optionValue === 'undefined') {
                    this.positionOptions.deleteItem(optionName);
                } else {
                    this.positionOptions.setItem(optionName, optionValue);
                }
                this._alignPopup();
                return this;
            },

            /** @ignore */
            onResize: function () {
                this._alignPopup();
            }
        });
}, jQuery);