/*global giant */
giant.postpone(giant, 'OptionList', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * The OptionList trait modifies List classes so that they can be used in dropdowns.
     * Should only accept widgets as list items that implement the Option trait.
     * Whatever uses the OptionList should take care of initializing the focused and selected states in afterAdd.
     * The OptionList returns to its neutral state after being removed from the hierarchy.
     * @class
     * @extends giant.Base
     * @extends giant.List
     */
    giant.OptionList = self
        .addConstants(/** @lends giant.OptionList */{
            /** @constant */
            EVENT_OPTION_SELECT: 'option-select',

            /** @constant */
            EVENT_OPTIONS_ESCAPE: 'options-escape'
        })
        .addPrivateMethods(/** @lends giant.OptionList# */{
            /**
             * @param {string} optionName
             * @param {*} optionValue
             * @private
             */
            _triggerSelectEvent: function (optionName, optionValue) {
                this.spawnEvent(this.EVENT_OPTION_SELECT)
                    .setPayloadItems({
                        optionName : optionName,
                        optionValue: optionValue
                    })
                    .triggerSync();
            },

            /**
             * @param {string} newFocusedOptionName
             * @private
             */
            _setFocusedOptionName: function (newFocusedOptionName) {
                var oldFocusedOptionName = this.focusedOptionName,
                    oldFocusedOption;
                if (oldFocusedOptionName !== newFocusedOptionName) {
                    oldFocusedOption = this.getChild(oldFocusedOptionName);
                    if (oldFocusedOption) {
                        // old focused option might not be a child anymore
                        oldFocusedOption.markAsBlurred();
                    }
                    this.focusedOptionName = newFocusedOptionName;
                }
            },

            /**
             * @param {string} newActiveOptionName
             * @private
             */
            _setActiveOptionName: function (newActiveOptionName) {
                var oldActiveOptionName = this.activeOptionName,
                    oldActiveOption;
                if (oldActiveOptionName !== newActiveOptionName) {
                    oldActiveOption = this.getChild(oldActiveOptionName);
                    if (oldActiveOption) {
                        // old active option might not be a child anymore
                        oldActiveOption.markAsInactive();
                    }
                    this.activeOptionName = newActiveOptionName;
                }
            },

            /**
             * Looks into current options and sets active option name.
             * @private
             */
            _updateFocusedOptionName: function () {
                var focusedOption = this.getFocusedOption();
                if (focusedOption) {
                    this.focusedOptionName = focusedOption.childName;
                }
            },

            /**
             * Looks into current options and sets active option name.
             * @private
             */
            _updateActiveOptionName: function () {
                var selectedOption = this.getSelectedOption();
                if (selectedOption) {
                    this.activeOptionName = selectedOption.childName;
                }
            },

            /**
             * Focuses on the first available option.
             * @private
             */
            _focusOnOption: function () {
                var focusedOption = this.getFocusedOption() ||
                                    this.getSelectedOption() ||
                                    this.children.getFirstValue();

                if (focusedOption) {
                    // there is a suitable option to focus on
                    focusedOption.markAsFocused();
                }
            }
        })
        .addMethods(/** @lends giant.OptionList# */{
            /** Call from host's init. */
            init: function () {
                this
                    .elevateMethod('onItemsChange')
                    .elevateMethod('onHotKeyPress')
                    .elevateMethod('onOptionFocus')
                    .elevateMethod('onOptionActive')
                    .elevateMethod('onOptionSelect');

                /**
                 * Identifier of option in focus.
                 * Name of corresponding child (item) widget.
                 * @type {string}
                 */
                this.focusedOptionName = undefined;

                /**
                 * Identifier of active option.
                 * Name of corresponding child widget.
                 * @type {string}
                 */
                this.activeOptionName = undefined;
            },

            /** Call from host's afterAdd. */
            afterAdd: function () {
                this
                    .subscribeTo(giant.List.EVENT_LIST_ITEMS_CHANGE, this.onItemsChange)
                    .subscribeTo(giant.HotKeyWatcher.EVENT_HOT_KEY_DOWN, this.onHotKeyPress)
                    .subscribeTo(giant.Option.EVENT_OPTION_FOCUS, this.onOptionFocus)
                    .subscribeTo(giant.Option.EVENT_OPTION_ACTIVE, this.onOptionActive)
                    .subscribeTo(giant.OptionList.EVENT_OPTION_SELECT, this.onOptionSelect);

                this._focusOnOption();
                this._updateFocusedOptionName();
                this._updateActiveOptionName();
            },

            /** @ignore */
            afterRemove: function () {
                // destructing widget state
                var focusedOption = this.getFocusedOption(),
                    selectedOption = this.getSelectedOption();

                if (focusedOption) {
                    focusedOption.markAsBlurred();
                }
                if (selectedOption) {
                    selectedOption.markAsInactive();
                }

                this.focusedOptionName = undefined;
                this.activeOptionName = undefined;
            },

            /**
             * Fetches option widget based on its option value.
             * TODO: maintain an lookup of option values -> option widgets.
             * @param {*} optionValue
             * @returns {giant.Option}
             */
            getOptionByValue: function (optionValue) {
                return this.children
                    .filterBySelector(function (option) {
                        return option.optionValue === optionValue;
                    })
                    .getFirstValue();
            },

            /**
             * Fetches currently focused option, or an arbitrary option if none focused.
             * @returns {giant.Option}
             */
            getFocusedOption: function () {
                return this.children.filterBySelector(
                    function (option) {
                        return option.isFocused();
                    })
                    .getFirstValue();
            },

            /**
             * Fetches option that is currently selected, or undefined.
             * @returns {giant.Option}
             */
            getSelectedOption: function () {
                return this.children.filterBySelector(
                    function (option) {
                        return option.isActive();
                    })
                    .getFirstValue();
            },

            /**
             * Selects an option on the list.
             * @param {string} optionName
             * @returns {giant.OptionList}
             */
            selectOption: function (optionName) {
                var option = this.getChild(optionName);
                giant.assert(!!option, "Invalid option name");
                option.markAsActive();

                return this;
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onItemsChange: function (event) {
                var link = giant.pushOriginalEvent(event);
                this._focusOnOption();
                this._updateFocusedOptionName();
                link.unlink();
            },

            /**
             * TODO: break up into smaller methods
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onHotKeyPress: function (event) {
                var charCode = event.payload.charCode,
                    children = this.children,
                    sortedChildNames = children.getKeys().sort(),
                    currentChildIndex = sortedChildNames.indexOf(this.focusedOptionName),
                    link = giant.pushOriginalEvent(event),
                    newFocusedOptionName;

                switch (charCode) {
                case 38: // up
                    currentChildIndex = Math.max(currentChildIndex - 1, 0);
                    newFocusedOptionName = sortedChildNames[currentChildIndex];
                    this.getChild(newFocusedOptionName)
                        .markAsFocused();
                    break;

                case 40: // down
                    currentChildIndex = Math.min(currentChildIndex + 1, sortedChildNames.length - 1);
                    newFocusedOptionName = sortedChildNames[currentChildIndex];
                    this.getChild(newFocusedOptionName)
                        .markAsFocused();
                    break;

                case 27: // esc
                    this.triggerSync(this.EVENT_OPTIONS_ESCAPE);
                    break;

                case 13: // enter
                    this.getChild(this.focusedOptionName)
                        .markAsActive();
                    break;
                }

                link.unlink();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onOptionFocus: function (event) {
                var newFocusedOptionName = event.senderWidget.childName,
                    link = giant.pushOriginalEvent(event);

                this._setFocusedOptionName(newFocusedOptionName);

                link.unlink();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onOptionActive: function (event) {
                var optionWidget = event.senderWidget,
                    link = giant.pushOriginalEvent(event);

                this._triggerSelectEvent(optionWidget.childName, optionWidget.optionValue);
                link.unlink();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onOptionSelect: function (event) {
                var link = giant.pushOriginalEvent(event),
                    optionName = event.payload.optionName;

                this._setActiveOptionName(optionName);

                link.unlink();
            }
        });
});
