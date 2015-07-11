/*global giant, giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'Link', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = giant.Widget,
        self = base.extend(className);

    /**
     * Creates a Link instance.
     * @name giant.Link.create
     * @function
     * @returns {giant.Link}
     */

    /**
     * The Link implements a basic hyperlink.
     * @class
     * @extends giant.Widget
     */
    giant.Link = self
        .addMethods(/** @lends giant.Link# */{
            /** @ignore */
            init: function () {
                base.init.call(this);
                this.setTagName('a');

                this.spawnLabelWidget()
                    .setChildName('link-label')
                    .addToParent(this);
            },

            /**
             * Creates Label widget to be used inside the link.
             * Override to specify custom widget.
             * @returns {giant.Label}
             */
            spawnLabelWidget: function () {
                return giant.Label.create();
            },

            /**
             * Retrieves the label widget contained within the link.
             * @returns {giant.Label}
             */
            getLabelWidget: function () {
                return this.getChild('link-label');
            },

            /**
             * Sets URL for the link.
             * @param {string} targetUrl
             * @returns {giant.Link}
             */
            setTargetUrl: function (targetUrl) {
                giant.isString(targetUrl, "Invalid target URL");

                var element = this.getElement();
                if (element) {
                    $(element).attr('href', targetUrl);
                }

                this.addAttribute('href', targetUrl);

                return this;
            },

            /**
             * Sets the link's caption.
             * Expects the caption widget to be a Label.
             * Override when caption widget is something other than Label.
             * @param {string} caption
             * @returns {giant.Link}
             */
            setCaption: function (caption) {
                this.getLabelWidget()
                    .setLabelText(caption);
                return this;
            }
        });
}, jQuery);
