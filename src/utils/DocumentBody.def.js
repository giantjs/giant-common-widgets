/*global giant */
$oop.postpone(giant, 'DocumentBody', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend()
            .addTraitAndExtend($widget.Renderable);

    /**
     * @name giant.DocumentBody.create
     * @function
     * @returns {giant.DocumentBody}
     */

    /**
     * @class
     * @extends $oop.Base
     * @extends $widget.Renderable
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
                $widget.Renderable.init.call(this);
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
