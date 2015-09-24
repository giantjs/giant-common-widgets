/*global giant, jQuery */
$oop.postpone(giant, 'Page', function (ns, className, /**jQuery*/$) {
    "use strict";

    var base = $widget.Widget,
        self = base.extend(className)
            .addTraitAndExtend(giant.BinaryStateful)
            .addTrait(giant.Disableable);

    /**
     * Creates a Page instance.
     * @name giant.Page.create
     * @function
     * @returns {giant.Page}
     */

    /**
     * The Page class endows all pages with basic features, such as
     * adding relevant CSS classes to the <em>body</em> element.
     * Subclass to create page classes, and add them to he hierarchy as root.
     * @example
     * MyPage.create().setRootWidget();
     * @class
     * @extends $widget.Widget
     * @extends giant.BinaryStateful
     * @extends giant.Disableable
     */
    giant.Page = self
        .addPrivateMethods(/** @lends giant.Page# */{
            /**
             * @returns {$data.Collection}
             * @private
             */
            _getPageCssClasses: function () {
                return this.getBase().htmlAttributes.cssClasses
                    .mapValues(function (refCount, className) {
                        return 'page-' + className;
                    });
            }
        })
        .addMethods(/** @lends giant.Page# */{
            /** @ignore */
            init: function () {
                base.init.call(this);
                giant.BinaryStateful.init.call(this);
                giant.Disableable.init.call(this);
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);
                giant.BinaryStateful.afterAdd.call(this);

                var documentBody = giant.DocumentBody.create();

                this._getPageCssClasses()
                    .passEachItemTo(documentBody.addCssClass, documentBody);
            },

            /** @ignore */
            afterRemove: function () {
                base.afterRemove.call(this);
                giant.BinaryStateful.afterRemove.call(this);

                var documentBody = giant.DocumentBody.create();

                this._getPageCssClasses()
                    .passEachItemTo(documentBody.decreaseCssClassRefCount, documentBody);
            }
        });
}, jQuery);
