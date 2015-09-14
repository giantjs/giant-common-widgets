/*global giant, jQuery */
giant.postpone(giant, 'Option', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * The Option trait allows widgets to behave like option items in a dropdown or select list.
     * Add this trait to classes aimed to be used as options in a dropdown.
     * Expects host to have the Highlightable trait.
     * @class
     * @extends giant.Base
     * @extends giant.Widget
     * @extends giant.BinaryStateful
     * @extends giant.Highlightable
     */
    giant.Option = self
        .addConstants(/** @lends giant.Option */{
            /** @constant */
            EVENT_OPTION_FOCUS: 'giant.Option.focus',

            /** @constant */
            EVENT_OPTION_BLUR: 'giant.Option.blur',

            /** @constant */
            EVENT_OPTION_ACTIVE: 'giant.Option.active',

            /** @constant */
            EVENT_OPTION_INACTIVE: 'giant.Option.inactive',

            /** @constant */
            HIGHLIGHTED_FOCUS: 'highlighted-focus',

            /** @constant */
            HIGHLIGHTED_ACTIVE: 'highlighted-active'
        })
        .addMethods(/** @lends giant.Option# */{
            /**
             * Call from host's init.
             * @param {*} [optionValue]
             */
            init: function (optionValue) {
                this
                    .elevateMethod('onOptionClick')
                    .elevateMethod('onOptionHover');

                /**
                 * Value carried by option.
                 * This is not what's displayed in the option, but the logical value associated with it.
                 * This is the value that will be passed back along the event when the option is selected.
                 * @type {*}
                 */
                this.optionValue = optionValue;
            },

            /** Call from host's afterRender. */
            afterRender: function () {
                var element = this.getElement();
                if (element) {
                    $(element)
                        .on('click', this.onOptionClick)
                        .on('mouseenter', this.onOptionHover);
                }
            },

            /**
             * Sets option value.
             * @param {*} optionValue
             * @returns {giant.Option}
             */
            setOptionValue: function (optionValue) {
                this.optionValue = optionValue;
                return this;
            },

            /**
             * Marks current option as focused.
             * @returns {giant.Option}
             */
            markAsFocused: function () {
                if (!this.isFocused()) {
                    this.highlightOn(self.HIGHLIGHTED_FOCUS)
                        .spawnEvent(self.EVENT_OPTION_FOCUS)
                        .setPayloadItems({
                            optionName : this.childName,
                            optionValue: this.optionValue
                        })
                        .triggerSync();
                }
                return this;
            },

            /**
             * Marks current option as no longer focused.
             * @returns {giant.Option}
             */
            markAsBlurred: function () {
                if (this.isFocused()) {
                    this.highlightOff(self.HIGHLIGHTED_FOCUS)
                        .spawnEvent(self.EVENT_OPTION_BLUR)
                        .setPayloadItems({
                            optionName : this.childName,
                            optionValue: this.optionValue
                        })
                        .triggerSync();
                }
                return this;
            },

            /**
             * Tells whether the current option is focused.
             * @returns {boolean}
             */
            isFocused: function () {
                return this.isHighlighted(self.HIGHLIGHTED_FOCUS);
            },

            /**
             * Marks current option as active.
             * @returns {giant.Option}
             */
            markAsActive: function () {
                if (!this.isActive()) {
                    this.highlightOn(self.HIGHLIGHTED_ACTIVE)
                        .spawnEvent(self.EVENT_OPTION_ACTIVE)
                        .setPayloadItems({
                            optionName : this.childName,
                            optionValue: this.optionValue
                        })
                        .triggerSync();
                }
                return this;
            },

            /**
             * Marks current option as inactive.
             * @returns {giant.Option}
             */
            markAsInactive: function () {
                if (this.isActive()) {
                    this.highlightOff(self.HIGHLIGHTED_ACTIVE)
                        .spawnEvent(self.EVENT_OPTION_INACTIVE)
                        .setPayloadItems({
                            optionName : this.childName,
                            optionValue: this.optionValue
                        })
                        .triggerSync();
                }
                return this;
            },

            /**
             * Tells whether the current option is active.
             * @returns {boolean}
             */
            isActive: function () {
                return this.isHighlighted(self.HIGHLIGHTED_ACTIVE);
            },

            /**
             * @ignore
             */
            onOptionClick: function () {
                this.markAsActive();
            },

            /**
             * @ignore
             */
            onOptionHover: function () {
                this.markAsFocused();
            }
        });
}, jQuery);
