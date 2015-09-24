/*global giant */
$oop.postpone(giant, 'DataLabel', function (ns, className) {
    "use strict";

    var base = giant.Label,
        self = base.extend(className)
            .addTrait(giant.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataLabel instance.
     * @name giant.DataLabel.create
     * @function
     * @param {giant.FieldKey} textFieldKey Key to a text field.
     * @returns {giant.DataLabel}
     */

    /**
     * The DataLabel displays text based on the value of a field in the cache.
     * Keeps the text in sync with the changes of the corresponding field.
     * @class
     * @extends giant.Label
     * @extends giant.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataLabel = self
        .addMethods(/** @lends giant.DataLabel# */{
            /**
             * @param {giant.FieldKey} fieldKey
             * @ignore
             */
            init: function (fieldKey) {
                $assertion.isFieldKey(fieldKey, "Invalid field key");

                base.init.call(this);
                giant.EntityBound.init.call(this);
                giant.EntityWidget.init.call(this, fieldKey);
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
             * @param {*} fieldValue
             * @returns {giant.DataLabel}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setLabelText(fieldValue);
                return this;
            }
        });
});
