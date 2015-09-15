/*global giant */
giant.postpone(giant, 'DataDropdownButton', function (ns, className) {
    "use strict";

    var base = giant.DropdownButton,
        self = base.extend(className)
            .addTrait(giant.EntityBound)
            .addTrait(giant.EntityWidget);

    /**
     * @name giant.DataDropdownButton.create
     * @function
     * @param {giant.FieldKey} labelKey
     * @param {giant.FieldKey} optionsKey
     * @returns {giant.DataDropdownButton}
     */

    /**
     * TODO: Add documentation
     * @class
     * @extends giant.DropdownButton
     * @extends giant.EntityWidget
     */
    giant.DataDropdownButton = self
        .addPrivateMethods(/** @lends giant.DataDropdownButton# */{
            /** @private */
            _updateSelectedOption: function () {
                var optionValue = this.entityKey.toField().getValue(),
                    optionWidget = this.dropdown.getListWidget().getOptionByValue(optionValue),
                    dropdownWidget = this.getDropdownWidget();

                if (optionWidget && dropdownWidget) {
                    dropdownWidget.getListWidget()
                        .selectOption(optionWidget.childName);
                }
            }
        })
        .addMethods(/** @lends giant.DataDropdownButton# */{
            /**
             * @param {giant.FieldKey} selectedKey
             * @param {giant.FieldKey} optionsKey
             * @ignore
             */
            init: function (selectedKey, optionsKey) {
                giant
                    .isFieldKey(selectedKey, "Invalid 'selected' field key")
                    .isFieldKey(optionsKey, "Invalid options field key");

                /**
                 * Field key that identifies the options
                 * @type {giant.FieldKey}
                 */
                this.optionsKey = optionsKey;

                giant.EntityWidget.init.call(this, selectedKey);
                base.init.call(this);
                giant.EntityBound.init.call(this);

                this
                    .elevateMethod('onOptionSelect')
                    .elevateMethod('onListItemsChange');
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);

                this._updateSelectedOption();

                this
                    .bindToEntityChange(this.entityKey, 'onSelectedChange')
                    .subscribeTo(giant.EVENT_LIST_ITEMS_CHANGE, this.onListItemsChange)
                    .subscribeTo(giant.EVENT_OPTION_SELECT, this.onOptionSelect);
            },

            /** @ignore */
            afterRemove: function () {
                base.afterRemove.call(this);
                this.unbindAll();
            },

            /** @returns {giant.DataLabel} */
            spawnLabelWidget: function () {
                return giant.DataLabel.create(this.entityKey);
            },

            /** @returns {giant.DataDropdown} */
            spawnDropdownWidget: function () {
                return giant.DataDropdown.create(this.optionsKey);
            },

            /**
             * @ignore
             */
            onSelectedChange: function () {
                this._updateSelectedOption();
            },

            /**
             * @ignore
             */
            onListItemsChange: function () {
                this._updateSelectedOption();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onOptionSelect: function (event) {
                var optionValue = event.payload.optionValue;
                this.entityKey.toField()
                    .setValue(optionValue);
            }
        });
});
