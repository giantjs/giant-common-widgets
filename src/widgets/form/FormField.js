/*global giant, giant, giant, giant, giant, jQuery, giant */
giant.postpone(giant, 'FormField', function (ns, className) {
    "use strict";

    var base = giant.Widget,
        self = base.extend(className);

    /**
     * Creates a FormField instance.
     * @name giant.FormField.create
     * @function
     * @param {string} [inputType] Corresponds to the input tag's type argument. Defaults to 'text'.
     * @returns {giant.FormField}
     */

    /**
     * Represents a single field inside the form, with input and other accompanying controls,
     * such as comment and warning.
     * Supports enabling/disabling TAB keys.
     * TODO: add create... methods for comment and warning, too
     * @class
     * @extends giant.Widget
     */
    giant.FormField = self
        .addMethods(/** @lends giant.FormField# */{
            /**
             * @param {string} [inputType]
             * @ignore
             */
            init: function (inputType) {
                giant.isInputTypeOptional(inputType, "Invalid input type");

                base.init.call(this);

                this
                    .elevateMethod('onInputBlur')
                    .elevateMethod('onInputTab')
                    .elevateMethod('onInputValid')
                    .elevateMethod('onFormReset');

                /**
                 * Whether the field allows to move to the next tab index.
                 * @type {boolean}
                 */
                this.allowsTabForwards = true;

                /**
                 * Whether the field allows to move to the previous tab index.
                 * @type {boolean}
                 */
                this.allowsTabBackwards = true;

                /**
                 * Type attribute of the input field.
                 * @type {string}
                 */
                this.inputType = inputType || 'text';

                /**
                 * Widget that optionally displays a comment associated with the input field.
                 * @type {giant.Label}
                 */
                this.commentLabel = giant.Label.create()
                    .setChildName('field-comment');

                /**
                 * Widget that displays a warning message whenever input validation fails.
                 * @type {giant.Label}
                 */
                this.warningLabel = giant.Label.create()
                    .setChildName('field-warning');

                this.spawnInputWidget()
                    .setChildName('field-input')
                    .addToParent(this);
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);
                this
                    .subscribeTo(giant.Input.EVENT_INPUT_BLUR, this.onInputBlur)
                    .subscribeTo(giant.Input.EVENT_INPUT_TAB, this.onInputTab)
                    .subscribeTo(giant.Input.EVENT_INPUT_VALID, this.onInputValid)
                    .subscribeTo(giant.Form.EVENT_FORM_RESET, this.onFormReset);
            },

            /**
             * Creates input widget.
             * Override to specify custom input field.
             * With the input type-based surrogates in place, overriding this method is rarely needed.
             * @returns {giant.Input}
             */
            spawnInputWidget: function () {
                return giant.Input.create(this.inputType);
            },

            /**
             * Fetches input widget.
             * @returns {giant.Input}
             */
            getInputWidget: function () {
                return this.getChild('field-input');
            },

            /**
             * Fetches current input value on input widget.
             * @returns {*}
             */
            getInputValue: function () {
                return this.getInputWidget().inputValue;
            },

            /**
             * Sets value on input widget.
             * @param {*} inputValue
             * @param {boolean} [updateDom]
             * @returns {giant.FormField}
             */
            setInputValue: function (inputValue, updateDom) {
                this.getInputWidget()
                    .setInputValue(inputValue, updateDom);
                return this;
            },

            /**
             * Clears value on input widget.
             * @param {boolean} [updateDom]
             * @returns {giant.FormField}
             */
            clearInputValue: function (updateDom) {
                this.getInputWidget()
                    .clearInputValue(updateDom);
                return this;
            },

            /**
             * Allows TAB to take effect on the input.
             * @returns {giant.FormField}
             */
            allowTabForwards: function () {
                this.allowsTabForwards = true;
                return this;
            },

            /**
             * Prevents TAB to take effect on the input.
             * @returns {giant.FormField}
             */
            preventTabForwards: function () {
                this.allowsTabForwards = false;
                return this;
            },

            /**
             * Allows Shift+TAB to take effect on the input.
             * @returns {giant.FormField}
             */
            allowTabBackwards: function () {
                this.allowsTabBackwards = true;
                return this;
            },

            /**
             * Prevents Shift+TAB to take effect on the input.
             * @returns {giant.FormField}
             */
            preventTabBackwards: function () {
                this.allowsTabBackwards = false;
                return this;
            },

            /**
             * Sets warning message and sets the field to invalid state.
             * @param {string} warningMessage
             * @returns {giant.FormField}
             */
            setWarningMessage: function (warningMessage) {
                this.warningLabel
                    .setLabelText(warningMessage)
                    .addToParent(this);

                this
                    .removeCssClass('field-valid')
                    .addCssClass('field-invalid');

                return this;
            },

            /**
             * Clears warning message and restores valid state of the field.
             * @returns {giant.FormField}
             */
            clearWarningMessage: function () {
                this.warningLabel
                    .removeFromParent();

                this
                    .removeCssClass('field-invalid')
                    .addCssClass('field-valid');

                return this;
            },

            /**
             * Sets comment string.
             * @param {string} comment
             * @returns {giant.FormField}
             */
            setComment: function (comment) {
                this.commentLabel
                    .setLabelText(comment)
                    .addToParent(this);
                return this;
            },

            /**
             * Clears comment string.
             * @returns {giant.FormField}
             */
            clearComment: function () {
                this.commentLabel
                    .removeFromParent();
                return this;
            },

            /**
             * Sets focus on the current field. (More precisely, on the current field's input widget.)
             * @returns {giant.FormField}
             */
            focusOnField: function () {
                this.getInputWidget()
                    .focusOnInput();
                return this;
            },

            /**
             * Updates warning message to the last warning if there was one, clears it otherwise.
             * @returns {giant.FormField}
             */
            updateWarningMessage: function () {
                var inputWidget = this.getInputWidget();

                if (inputWidget.isValid()) {
                    this.clearWarningMessage();
                } else {
                    this.setWarningMessage(inputWidget.lastValidationError);
                }

                return this;
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onInputBlur: function (event) {
                var link = giant.pushOriginalEvent(event);
                this.updateWarningMessage();
                link.unLink();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onInputTab: function (event) {
                var originalEvent = event.getOriginalEventByType(jQuery.Event);
                if (!originalEvent.shiftKey && !this.allowsTabForwards ||
                    originalEvent.shiftKey && !this.allowsTabBackwards
                    ) {
                    originalEvent.preventDefault();
                }
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onInputValid: function (event) {
                var link = giant.pushOriginalEvent(event);
                this.updateWarningMessage();
                link.unLink();
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onFormReset: function (event) {
                var link = giant.pushOriginalEvent(event);
                this.clearWarningMessage();
                link.unLink();
            }
        });
});

(function () {
    "use strict";

    giant.addTypes(/** @lends giant */{
        /** @param {giant.FormField} expr */
        isFormField: function (expr) {
            return giant.FormField.isBaseOf(expr);
        },

        /** @param {giant.FormField} [expr] */
        isFormFieldOptional: function (expr) {
            return expr === undefined ||
                   giant.FormField.isBaseOf(expr);
        }
    });
}());
