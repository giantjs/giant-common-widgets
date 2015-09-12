/*global giant */
giant.postpone(giant, 'DocumentBody', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend()
            .addTraitAndExtend(giant.Renderable);

    /**
     * @name giant.DocumentBody.create
     * @function
     * @returns {giant.DocumentBody}
     */

    /**
     * @class
     * @extends giant.Base
     * @extends giant.Renderable
     */
    giant.DocumentBody = self
        .setInstanceMapper(function () {
            return 'singleton';
        })
        .addPrivateMethods(/** @lends giant.DocumentBody# */{
            /**
             * @returns {HTMLElement}
             * @private
             */
            _getBodyElementProxy: function () {
                return document && document.body;
            }
        })
        .addMethods(/** @lends giant.DocumentBody# */{
            /** @ignore */
            init: function () {
                giant.Renderable.init.call(this);
                this.setTagName('body');

                /**
                 * @type {string}
                 * @private
                 */
                this._contentMarkup = '';
            },

            /**
             * @param {string} contentMarkup
             * @returns {giant.DocumentBody}
             */
            setContentMarkup: function (contentMarkup) {
                this._contentMarkup = contentMarkup;
                return this;
            },

            /**
             * Fetches body element from document.
             * @returns {HTMLElement}
             */
            getElement: function () {
                return this._getBodyElementProxy();
            },

            /**
             * @returns {string}
             */
            contentMarkup: function () {
                return this._contentMarkup;
            }
        });
});
