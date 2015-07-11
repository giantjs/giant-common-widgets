/*global giant, giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'HtmlLabel', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = giant.Label,
        self = base.extend(className);

    /**
     * Creates an HtmlLabel instance.
     * @name giant.HtmlLabel.create
     * @function
     * @returns {giant.HtmlLabel}
     */

    /**
     * Label that is able to display HTML markup.
     * @class
     * @extends giant.Label
     * @deprecated
     * Use giant.Label with htmlEscaped set to false.
     */
    giant.HtmlLabel = self
        .addMethods(/** @lends giant.HtmlLabel# */{
            /** @ignore */
            init: function () {
                base.init.call(this);
                this.htmlEscaped = false;
            }
        });
}, jQuery);
