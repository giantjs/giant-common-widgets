/*global giant */
giant.postpone(giant, 'DataTextInput', function (ns, className) {
    "use strict";

    var base = giant.TextInput,
        self = base.extend(className)
            .addTrait(giant.EntityBound)
            .addTrait(giant.EntityWidget)
            .addTraitAndExtend(giant.FieldBound);

    /**
     * Creates a DataTextInput instance.
     * @name giant.DataTextInput.create
     * @function
     * @param {giant.FieldKey} inputFieldKey
     * @returns {giant.DataTextInput}
     */

    /**
     * The DataTextInput adds data binding to TextInput, reflecting the value of a field in the cache.
     * Keeps the value of the input field in sync with the changes of the cache field.
     * @class
     * @extends giant.TextInput
     * @extends giant.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.FieldBound
     */
    giant.DataTextInput = self
        .addMethods(/** @lends giant.DataTextInput# */{
            /**
             * @param {giant.FieldKey} inputFieldKey
             * @ignore
             */
            init: function (inputFieldKey) {
                base.init.call(this);
                giant.EntityBound.init.call(this);
                giant.EntityWidget.init.call(this, inputFieldKey);
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
             * @returns {giant.DataTextInput}
             * @ignore
             */
            setFieldValue: function (fieldValue) {
                this.setInputValue(typeof fieldValue === 'undefined' ? fieldValue : String(fieldValue), true);
                return this;
            }
        });
});
