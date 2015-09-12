/*global giant */
giant.postpone(giant, 'List', function (ns, className) {
    "use strict";

    var base = giant.Widget,
        self = base.extend(className);

    /**
     * Creates a List instance.
     * @name giant.List.create
     * @function
     * @returns {giant.List}
     */

    /**
     * The List is an aggregation of other widgets.
     * By default, it maps to the <em>ul</em> and <em>li</em> HTML elements, but that can be changed by subclassing.
     * Item order follows the normal ordering child widgets, ie. in the order of their names.
     * @class
     * @extends giant.Widget
     */
    giant.List = self
        .addConstants(/** @lends giant.List */{
            /** @constant */
            EVENT_LIST_ITEMS_CHANGE: 'list-items-change'
        })
        .addMethods(/** @lends giant.List# */{
            /** @ignore */
            init: function () {
                base.init.call(this);
                this.setTagName('ul');
            },

            /**
             * Adds a widget to the list as its item.
             * Changes the specified widget's tag name to 'li'.
             * @param itemWidget
             * @returns {giant.List}
             */
            addItemWidget: function (itemWidget) {
                itemWidget
                    .setTagName('li')
                    .addToParent(this);

                return this;
            }
        });
});
