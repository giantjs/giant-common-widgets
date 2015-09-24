/*global giant */
$oop.postpone(giant, 'DataHyperlink', function (ns, className) {
    "use strict";

    var base = giant.Hyperlink,
        self = base.extend(className)
            .addTrait($entity.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataHyperlink instance.
     * @name giant.DataHyperlink.create
     * @function
     * @param {$entity.FieldKey} urlKey Points to the link's URL.
     * @param {$entity.FieldKey} textKey Points to the link's text.
     * @returns {giant.DataHyperlink}
     */

    /**
     * The DataHyperlink displays a link based on the value of a field in the cache.
     * Keeps the target URL in sync with the changes of the corresponding field.
     * This is a general implementation with independent fields for URL and text.
     * For data links where the two fields are connected (eg. by being in the same document)
     * it might be a better idea to subclass Hyperlink directly than using DataHyperlink.
     * @class
     * @extends giant.Hyperlink
     * @extends $entity.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataHyperlink = self
        .addMethods(/** @lends giant.DataHyperlink# */{
            /**
             * @param {$entity.FieldKey} urlKey
             * @param {$entity.FieldKey} textKey
             * @ignore
             */
            init: function (urlKey, textKey) {
                $assertion
                    .isFieldKey(urlKey, "Invalid URL field key")
                    .isFieldKey(textKey, "Invalid text field key");

                /**
                 * Field key that identifies the text
                 * @type {$entity.FieldKey}
                 */
                this.textKey = textKey;

                base.init.call(this);
                $entity.EntityBound.init.call(this);
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
             * @returns {giant.DataHyperlink}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setTargetUrl(fieldValue);
                return this;
            }
        });
});
