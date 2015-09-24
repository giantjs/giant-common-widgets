/*global giant, jQuery */
$oop.postpone(giant, 'DataListItem', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * The DataListItem trait associates widgets with an item key.
     * Any widget that to be used as an item in a DataList is expected to have tgis trait.
     * @class
     * @extends $oop.Base
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
                $assertion.isItemKey(itemKey, "Invalid item key");
                this.itemKey = itemKey;
                return this;
            },

            /**
             * TODO: Is this necessary? DataList should always be in sync w/ cache.
             * @param {giant.Widget} parentWidget
             * @returns {giant.DataListItem}
             */
            addToParent: function (parentWidget) {
                var childName = this.childName,
                    currentChild = parentWidget.children.getItem(childName);

                giant.Widget.addToParent.call(this, parentWidget);

                if (currentChild !== this) {
                    // triggering event about being added
                    parentWidget
                        .spawnEvent(giant.EVENT_DATA_LIST_ITEM_ADD)
                        .setPayloadItem('childWidget', this)
                        .triggerSync();
                }

                return this;
            },

            /**
             * TODO: Is this necessary? DataList should always be in sync w/ cache.
             * @returns {giant.DataListItem}
             */
            removeFromParent: function () {
                var parent = this.parent;

                giant.Widget.removeFromParent.call(this);

                if (parent) {
                    // triggering event about removal
                    parent
                        .spawnEvent(giant.EVENT_DATA_LIST_ITEM_REMOVE)
                        .setPayloadItem('childWidget', this)
                        .triggerSync();
                }

                return this;
            }
        });
}, jQuery);

$oop.addGlobalConstants.call(giant, /** @lends giant */{
    /**
     * Signals tha a Widget has been added as child.
     * @constant
     */
    EVENT_DATA_LIST_ITEM_ADD: 'widget.list.item.add.data',

    /**
     * Signals that a Widget was removed from its current parent.
     * @constant
     */
    EVENT_DATA_LIST_ITEM_REMOVE: 'widget.list.item.remove.data'
});
