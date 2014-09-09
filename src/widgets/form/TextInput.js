troop.postpone(candystore, 'TextInput', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = candystore.Input,
        self = base.extend(className)
            .addTrait(shoeshine.JqueryWidget);

    /**
     * @name candystore.TextInput.create
     * @function
     * @param {string} [textInputType]
     * @returns {candystore.TextInput}
     */

    /**
     * @class
     * @extends candystore.Input
     * @extends shoeshine.JqueryWidget
     */
    candystore.TextInput = self
        .addConstants(/** @lends candystore.Input */{
            /** @constant */
            inputTypes: {
                // basic input types
                password: 'password',
                text    : 'text',

                // HTML 5 types
                email   : 'email',
                search  : 'search',
                tel     : 'tel',
                url     : 'url'
            }
        })
        .addMethods(/** @lends candystore.TextInput# */{
            /**
             * @param {string} textInputType
             * @ignore
             */
            init: function (textInputType) {
                dessert.isTextInputType(textInputType, "Invalid text input type");

                base.init.call(this, textInputType || 'text');

                this
                    .elevateMethod('onFocusIn')
                    .elevateMethod('onFocusOut');
            },

            /** @ignore */
            afterRender: function () {
                base.afterRender.call(this);

                // TODO: use JqueryWidget based subscription when it's fixed
                var $element = $(this.getElement());
                $element
                    .on('focusin', this.onFocusIn)
                    .on('focusout', this.onFocusOut);
            },

            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onKeyDown: function (event) {
                switch (event.which) {
                case 13:
                    if (this.canSubmit) {
                        // signaling that the input is attempting to submit the form
                        this
                            .setNextOriginalEvent(event)
                            .triggerSync(this.EVENT_INPUT_SUBMIT)
                            .clearNextOriginalEvent();
                    }
                    break;

                case 9:
                    this
                        .setNextOriginalEvent(event)
                        .triggerSync(this.EVENT_INPUT_TAB)
                        .clearNextOriginalEvent();
                    break;
                }
            },

            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onInput: function (event) {
                var $element = $(this.getElement()),
                    newInputValue = $element.val();

                this
                    .setNextOriginalEvent(event)
                    .setInputValue(newInputValue)
                    .clearNextOriginalEvent();
            },

            /**
             * @param {shoeshine.WidgetEvent} event
             * @ignore
             */
            onFocusIn: function (event) {
                this
                    .setNextOriginalEvent(event)
                    .triggerSync(this.EVENT_INPUT_FOCUS)
                    .clearNextOriginalEvent();
            },

            /**
             * @param {shoeshine.WidgetEvent} event
             * @ignore
             */
            onFocusOut: function (event) {
                this
                    .setNextOriginalEvent(event)
                    .triggerSync(this.EVENT_INPUT_BLUR)
                    .clearNextOriginalEvent();
            }
        });

    self
        .on('keydown', '', 'onKeyDown')
        .on('input', '', 'onInput');
}, jQuery);

troop.amendPostponed(candystore, 'Input', function () {
    "use strict";

    candystore.Input
        .addSurrogate(candystore, 'TextInput', function (inputType) {
            return inputType === 'text';
        });
});

(function () {
    "use strict";

    dessert.addTypes(/** @lends dessert */{
        isTextInputType: function (expr) {
            return candystore.TextInput.inputTypes[expr] === expr;
        },

        isTextInputTypeOptional: function (expr) {
            return expr === undefined ||
                candystore.TextInput.inputTypes[expr] === expr;
        }
    });
}());
