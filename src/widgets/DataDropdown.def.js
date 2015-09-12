/*global giant */
giant.postpone(giant, 'DataDropdown', function (ns, className) {
    "use strict";

    var base = giant.Dropdown,
        self = base.extend(className)
            .addTrait(giant.EntityWidget);

    /**
     * Creates a DataDropdown instance.
     * @name giant.DataDropdown.create
     * @function
     * @param {giant.FieldKey} fieldKey
     * @returns {giant.DataDropdown}
     */

    /**
     * The DataDropdown extends the functionality of the Dropdown with a List that is bound to a field in the cache.
     * @class
     * @extends giant.Dropdown
     * @extends giant.EntityWidget
     */
    giant.DataDropdown = self
        .addMethods(/** @lends giant.DataDropdown# */{
            /**
             * @param {giant.FieldKey} fieldKey
             * @ignore
             */
            init: function (fieldKey) {
                giant.EntityWidget.init.call(this, fieldKey);
                base.init.call(this);
            },

            /**
             * Creates a DataList for the dropdown to use as its internal option list.
             * To specify a custom DataList, you don't necessarily have to override the DataDropdown class,
             * only delegate a surrogate definition to giant.DataList that points to your implementation.
             * @example
             * giant.DataList.addSurrogate(myNameSpace, 'MyDataList', function (fieldKey) {
             *     return myCondition === true;
             * })
             * @returns {giant.DataList}
             * @see giant.Dropdown#spawnListWidget
             */
            spawnListWidget: function () {
                return giant.DataList.create(this.entityKey);
            }
        });
});
