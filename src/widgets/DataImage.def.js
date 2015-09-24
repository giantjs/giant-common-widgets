/*global giant */
$oop.postpone(giant, 'DataImage', function (ns, className) {
    "use strict";

    var base = giant.Image,
        self = base.extend(className)
            .addTrait($entity.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataImage instance.
     * @name giant.DataImage.create
     * @function
     * @param {$entity.FieldKey} urlFieldKey Field holding image URL.
     * @returns {giant.DataImage}
     */

    /**
     * The DataImage displays an image based on the URL stored in a field in the cache.
     * Keeps the image in sync with the changes of the corresponding field.
     * @class
     * @extends giant.Image
     * @extends $entity.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataImage = self
        .addMethods(/** @lends giant.DataImage# */{
            /**
             * @param {$entity.FieldKey} urlFieldKey
             * @ignore
             */
            init: function (urlFieldKey) {
                $assertion.isFieldKey(urlFieldKey, "Invalid field key");

                base.init.call(this);
                $entity.EntityBound.init.call(this);
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
             * @returns {giant.DataImage}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setImageUrl(fieldValue.toImageUrl());
                return this;
            }
        });
});
