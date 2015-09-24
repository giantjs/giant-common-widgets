/*global giant */
$oop.postpone(giant, 'DropdownButton', function (ns, className) {
    "use strict";

    var base = giant.TextButton,
        self = base.extend(className);

    /**
     * Creates a DropdownButton instance.
     * @name giant.DropdownButton.create
     * @function
     * @returns {giant.DropdownButton}
     */

    /**
     * The DropdownButton, when activated, pops up a dropdown, from which the user may select an option,
     * and the selected option will be set as the dropdown button's current caption.
     * The DropdownButton changes its state as the dropdown opens and closes.
     * @class
     * @extends giant.TextButton
     */
    giant.DropdownButton = self
        .addPrivateMethods(/** @lends giant.DropdownButton# */{
            /** @private */
            _updateOpenStyle: function () {
                var dropdown = this.dropdown;
                if (dropdown && dropdown.isOpen) {
                    this
                        .removeCssClass('dropdown-closed')
                        .addCssClass('dropdown-open');
                } else {
                    this
                        .removeCssClass('dropdown-open')
                        .addCssClass('dropdown-closed');
                }
            }
        })
        .addMethods(/** @lends giant.DropdownButton# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this
                    .elevateMethod('onDropdownOpen')
                    .elevateMethod('onDropdownClose');

                /**
                 * Dropdown widget for showing the options.
                 * Must have instance-level reference to it since this widget will be removed and re-added
                 * to the widget hierarchy.
                 * @type {giant.Dropdown}
                 */
                this.dropdown = this.spawnDropdownWidget()
                    .setChildName('dropdown-popup');
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);

                this._updateOpenStyle();

                this
                    .subscribeTo(giant.EVENT_POPUP_OPEN, this.onDropdownOpen)
                    .subscribeTo(giant.EVENT_POPUP_CLOSE, this.onDropdownClose);
            },

            /**
             * Creates dropdown widget.
             * Override to specify custom dropdown.
             * @returns {giant.Dropdown}
             */
            spawnDropdownWidget: function () {
                return giant.Dropdown.create();
            },

            /**
             * Retrieves Dropdown instance associated with DropdownButton.
             * @returns {giant.Dropdown}
             */
            getDropdownWidget: function () {
                return this.getChild('dropdown-popup');
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onDropdownOpen: function (event) {
                if (event.sender === this.dropdown) {
                    this._updateOpenStyle();
                }
            },

            /**
             * @param {giant.WidgetEvent} event
             * @ignore
             */
            onDropdownClose: function (event) {
                if (event.sender === this.dropdown) {
                    this._updateOpenStyle();
                }
            },

            /**
             * @param {jQuery.Event} event
             * @ignore
             */
            onClick: function (event) {
                base.onClick.call(this);

                var dropdown = this.dropdown,
                    link = $event.pushOriginalEvent(event);

                if (dropdown.isOpen) {
                    dropdown
                        .closePopup();
                } else {
                    dropdown
                        .addToParent(this)
                        .openPopup();
                }

                link.unlink();
            }
        });
});
