'use strict';

var Emitter = require('emitter-component');
var debounce = require('debounce');

var resize = module.exports = {
    applyResize: function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.halfWidth = 0.5 * this.width;
        this.halfHeight = 0.5 * this.height;
        this.emit('resize');
    },
    addListener: function(listener) {
        this.on('resize', listener);
    },
    removeListener: function(listener) {
        if(listener) this.off('resize', listener);
    },
    removeAllListeners: function() {
        this.off('resize');
    }
};

Emitter(resize);
resize.debouncedResize = debounce(resize.applyResize, 150);
resize.applyResize();
window.addEventListener('resize', resize.debouncedResize.bind(resize));
