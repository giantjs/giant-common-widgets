/*global giant */
giant.postpone(giant, 'DataLink', function (ns, className) {
    "use strict";

    var base = giant.Link,
        self = base.extend(className)
            .addTrait(giant.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataLink instance.
     * @name giant.DataLink.create
     * @function
     * @param {giant.FieldKey} urlKey Points to the link's URL.
     * @param {giant.FieldKey} textKey Points to the link's text.
     * @returns {giant.DataLink}
     */

    /**
     * The DataLink displays a link based on the value of a field in the cache.
     * Keeps the target URL in sync with the changes of the corresponding field.
     * This is a general implementation with independent fields for URL and text.
     * For data links where the two fields are connected (eg. by being in the same document)
     * it might be a better idea to subclass Link directly than using DataLink.
     * @class
     * @extends giant.Link
     * @extends giant.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataLink = self
        .addMethods(/** @lends giant.DataLink# */{
            /**
             * @param {giant.FieldKey} urlKey
             * @param {giant.FieldKey} textKey
             * @ignore
             */
            init: function (urlKey, textKey) {
                giant
                    .isFieldKey(urlKey, "Invalid URL field key")
                    .isFieldKey(textKey, "Invalid text field key");

                /**
                 * Field key that identifies the text
                 * @type {giant.FieldKey}
                 */
                this.textKey = textKey;

                base.init.call(this);
                giant.EntityBound.init.call(this);
                giant.EntityWidget.init.call(this, urlKey);
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);
                giant.FieldBound.afterAdd.call(this);
            },

            /** @ignore */
            afterRemove: function () {
                base.afterRemove.call(this);
                giant.FieldBound.afterRemove.call(this);
            },

            /**
             * Creates default data bound Label widget based on the textKey provided at instantiation.
             * Override to specify custom widget.
             * @returns {giant.DataLabel}
             */
            spawnLabelWidget: function () {
                return giant.DataLabel.create(this.textKey);
            },

            /**
             * @param {string} fieldValue
             * @returns {giant.DataLink}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setTargetUrl(fieldValue);
                return this;
            }
        });
});
