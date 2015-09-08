/*global giant */
giant.postpone(giant, 'FieldBound', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * Effectuates field value change on widget.
     * Implement in host class.
     * @name giant.FieldBound#setFieldValue
     * @function
     * @param {*} fieldValue
     * @returns {giant.FieldBound}
     */

    /**
     * The FieldBound trait adds a callback method to the host class that is invoked each time the value at
     * the field key associated with the host class changes.
     * Expects to be added to widgets that also have the EntityBound and EntityWidget traits.
     * @class
     * @extends giant.Base
     * @extends giant.EntityBound
     * @extends giant.EntityWidget
     * @extends giant.Widget
     */
    giant.FieldBound = self
        .addPrivateMethods(/** @lends giant.FieldBound# */{
            /** @private */
            _updateFieldValue: function () {
                var fieldValue = this.entityKey.toField().getValue();
                this.setFieldValue(fieldValue);
            }
        })
        .addMethods(/** @lends giant.FieldBound# */{
            /** Call from host's afterAdd. */
            afterAdd: function () {
                this._updateFieldValue();
                // TODO: Use .bindToFieldChange().
                this
                    .bindToEntityChange(this.entityKey.documentKey, 'onDocumentReplace')
                    .bindToEntityChange(this.entityKey, 'onFieldChange');
            },

            /** Call from host's afterRemove. */
            afterRemove: function () {
                this
                    .unbindFromEntityChange(this.entityKey.documentKey, 'onDocumentReplace')
                    .unbindFromEntityChange(this.entityKey, 'onFieldChange');
            },

            /**
             * @param {giant.EntityChangeEvent} event
             * @ignore
             */
            onDocumentReplace: function (event) {
                var link = giant.pushOriginalEvent(event);
                this._updateFieldValue();
                link.unlink();
            },

            /**
             * @param {giant.EntityChangeEvent} event
             * @ignore
             */
            onFieldChange: function (event) {
                var link = giant.pushOriginalEvent(event);
                this._updateFieldValue();
                link.unlink();
            }
        });
});
