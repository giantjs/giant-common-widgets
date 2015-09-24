/*global giant */
$oop.postpone(giant, 'PasswordInput', function (ns, className) {
    "use strict";

    var base = giant.TextInput,
        self = base.extend(className);

    /**
     * Creates a PasswordInput instance.
     * PasswordInput instance may also be created by instantiating `giant.Input` with the type 'password'.
     * @name giant.PasswordInput.create
     * @function
     * @returns {giant.PasswordInput}
     */

    /**
     * The PasswordInput extends TextInput with the option that its input type will be set to 'password'.
     * Supports revealing and obscuring the entered password.
     * Also delegates surrogate to Input: instantiating an Input with 'type'='password' will yield a PasswordInput instance.
     * @class
     * @extends giant.TextInput
     */
    giant.PasswordInput = self
        .addMethods(/** @lends giant.PasswordInput# */{
            /** @ignore */
            init: function () {
                base.init.call(this, 'password');
            },

            /**
             * Reveals password by changing the input type to 'text', and re-rendering the widget.
             * @returns {giant.PasswordInput}
             */
            revealPassword: function () {
                if (this.htmlAttributes.getItem('type') === 'password') {
                    this.addAttribute('type', 'text');

                    if (this.getElement()) {
                        this.reRender();
                    }
                }
                return this;
            },

            /**
             * Obscures password by changing the input type to 'password', and re-rendering the widget.
             * @returns {giant.PasswordInput}
             */
            obscurePassword: function () {
                if (this.htmlAttributes.getItem('type') !== 'password') {
                    this.addAttribute('type', 'password');

                    if (this.getElement()) {
                        this.reRender();
                    }
                }
                return this;
            },

            /**
             * Determines whether the password input is currently revealed.
             * @returns {boolean}
             */
            isPasswordRevealed: function () {
                return this.htmlAttributes.getItem('type') !== 'password';
            }
        });
});

$oop.amendPostponed(giant, 'Input', function () {
    "use strict";

    giant.Input
        .addSurrogate(giant, 'PasswordInput', function (inputType) {
            return inputType === 'password';
        });
});
