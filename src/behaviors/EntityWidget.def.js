/*global giant */
giant.postpone(giant, 'EntityWidget', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * Expects to be added to widget classes.
     * @class
     * @extends giant.Base
     * @extends giant.Widget
     */
    giant.EntityWidget = self
        .addConstants(/** @lends giant.EntityWidget */{
            /** @constant */
            ATTRIBUTE_NAME_ENTITY_KEY: 'data-entity-key'
        })
        .addMethods(/** @lends giant.EntityWidget# */{
            /**
             * @param {giant.EntityKey} entityKey
             */
            init: function (entityKey) {
                /** @type {giant.EntityKey} */
                this.entityKey = entityKey;
            },

            /**
             * @returns {giant.EntityWidget}
             */
            revealKey: function () {
                this.addAttribute(self.ATTRIBUTE_NAME_ENTITY_KEY, this.entityKey.toString());
                return this;
            },

            /**
             * @returns {giant.EntityWidget}
             */
            hideKey: function () {
                this.removeAttribute(self.ATTRIBUTE_NAME_ENTITY_KEY);
                return this;
            }
        });
});

giant.postpone(giant, 'revealKeys', function () {
    "use strict";

    /**
     * Reveals entity keys on all widgets that have the EntityWidget trait.
     * Entity key strings will be added to widget elements as 'data-entity-key' attribute.
     * @type {function}
     */
    giant.revealKeys = function () {
        giant.Widget.rootWidget.getAllDescendants()
            .callOnEachItem('revealKey');
    };
});

giant.postpone(giant, 'hideKeys', function () {
    "use strict";

    /**
     * Removes 'data-entity-key' attribute from the DOM of all widgets that have the EntityWidget trait.
     * @type {function}
     */
    giant.hideKeys = function () {
        giant.Widget.rootWidget.getAllDescendants()
            .callOnEachItem('hideKey');
    };
});
