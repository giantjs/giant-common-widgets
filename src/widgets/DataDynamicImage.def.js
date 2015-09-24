/*global giant */
giant.postpone(giant, 'DataDynamicImage', function (ns, className) {
    "use strict";

    var base = giant.DynamicImage,
        self = base.extend(className)
            .addTrait(giant.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataDynamicImage instance.
     * @name giant.DataDynamicImage.create
     * @function
     * @param {giant.FieldKey} urlFieldKey Field holding image URL.
     * @returns {giant.DataDynamicImage}
     */

    /**
     * The DataDynamicImage is the data bound version of the DynamicImage.
     * Displays an image image based on the URL stored in a field in the cache.
     * Keeps the image in sync with the changes of the corresponding field.
     * @class
     * @extends giant.DynamicImage
     * @extends giant.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataDynamicImage = self
        .addMethods(/** @lends giant.DataDynamicImage# */{
            /**
             * @param {giant.FieldKey} urlFieldKey
             * @ignore
             */
            init: function (urlFieldKey) {
                $assertion.isFieldKey(urlFieldKey, "Invalid field key");

                base.init.call(this);
                giant.EntityBound.init.call(this);
                giant.EntityWidget.init.call(this, urlFieldKey);
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
             * @param {string} fieldValue
             * @returns {giant.DataDynamicImage}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setImageUrl(fieldValue.toImageUrl());
                return this;
            }
        });
});
