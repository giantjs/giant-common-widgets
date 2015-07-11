/*global giant, giant, giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'TextButton', function (ns, className) {
    "use strict";

    var base = giant.Button,
        self = base.extend(className);

    /**
     * Creates a TextButton instance.
     * @name giant.TextButton.create
     * @function
     * @returns {giant.TextButton}
     */

    /**
     * The TextButton extends the Button with a Label that stores text, so the button might have text on it.
     * @class
     * @extends giant.Button
     */
    giant.TextButton = self
        .addMethods(/** @lends giant.TextButton# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this.spawnLabelWidget()
                    .setChildName('button-label')
                    .addToParent(this);
            },

            /**
             * Creates Label widget to be used inside the button.
             * Override to specify custom widget.
             * @returns {giant.Label}
             */
            spawnLabelWidget: function () {
                return giant.Label.create();
            },

            /**
             * Retrieves the label widget contained within the button.
             * @returns {giant.Label}
             */
            getLabelWidget: function () {
                return this.getChild('button-label');
            },

            /**
             * Sets button caption.
             * Expects the caption widget to be a Label.
             * Override when caption widget is something other than Label.
             * @param {string} caption
             * @returns {giant.TextButton}
             */
            setCaption: function (caption) {
                this.getChild('button-label')
                    .setLabelText(caption);

                return this;
            }
        });
});
