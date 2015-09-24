/*jshint node:true */

/** @namespace */
var giant = giant || require('giant-namespace');

/** @namespace */
var $assertion = $assertion || require('giant-assertion');

/** @namespace */
var $oop = $oop || require('giant-oop');

/**
 * Whether to poll input values at a regular interval.
 * Set to true when change/input events do not get fired on form autofill, etc.
 * @type {boolean}
 */
giant.pollInputValues = false;
if (typeof require === 'function') {
    require('giant-data');
    require('giant-event');
    require('giant-templating');
    require('giant-entity');
    require('giant-utils');
    require('giant-widget');
}

/**
 * @function
 * @see http://api.jquery.com
 */
var jQuery = jQuery || require('jquery');

if (typeof window === 'undefined') {
    /**
     * Built-in global window object.
     * @type {Window}
     */
    window = undefined;
}

if (typeof document === 'undefined') {
    /**
     * Built-in global document object.
     * @type {Document}
     */
    document = undefined;
}

/**
 * Native number class.
 * @name Number
 * @class
 */

/**
 * Native string class.
 * @name String
 * @class
 */

/**
 * Native array class.
 * @name Array
 * @class
 */

/**
 * @name giant.Hash
 * @class
 */
