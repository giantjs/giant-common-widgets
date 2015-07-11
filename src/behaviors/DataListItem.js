/*global giant, jQuery */
giant.postpone(giant, 'DataListItem', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * The DataListItem trait associates widgets with an item key.
     * Any widget that to be used as an item in a DataList is expected to have tgis trait.
     * @class
     * @extends giant.Base
     * @extends giant.Widget
     */
    giant.DataListItem = self
        .addMethods(/** @lends giant.DataListItem# */{
            /**
             * Call from host's init.
             * @param {giant.ItemKey} [itemKey]
             */
            init: function (itemKey) {
                /** @type {giant.ItemKey} */
                this.itemKey = itemKey;
            },

            /**
             * Associates item widget with an item key.
             * @param {giant.ItemKey} itemKey
             * @returns {giant.DataListItem}
             */
            setItemKey: function (itemKey) {
                giant.isItemKey(itemKey, "Invalid item key");
                this.itemKey = itemKey;
                return this;
            }
        });
}, jQuery);
