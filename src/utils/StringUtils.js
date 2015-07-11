/*global giant, app */
giant.postpone(giant, 'StringUtils', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * @class
     * @extends giant.Base
     */
    giant.StringUtils = self
        .addMethods(/** @lends giant.StringUtils */{
            /**
             * @param {number} value
             * @param {number} targetLength
             * @returns {string}
             */
            padLeft: function (value, targetLength) {
                var asString = value.toString(),
                    length = asString.length;

                return length < targetLength ?
                    new Array(targetLength - length + 1).join('0') + asString :
                    asString.substr(-targetLength);
            }
        });
});