'use strict';

var Emitter = require('component-emitter');
var debounce = require('debounce');

var resize = module.exports = {
  onGlobalResize: function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.halfWidth = 0.5 * this.width;
    this.halfHeight = 0.5 * this.height;

    this.applyResize();
    this.debouncedResize();
  },
  applyResizeDebounce: function() {
    this.emit('resizeDebounce');
  },
  applyResize: function() {
    this.emit('resize');
  },
  addListener: function(listener, noDebounce) {
    this.on(noDebounce ? 'resize' : 'resizeDebounce', listener);
  },
  removeListener: function(listener) {
    if (listener) {
        this.off('resize', listener);
        this.off('resizeDebounce', listener);
    }
  },
  removeAllListeners: function() {
    this.off();
  }
};

Emitter(resize);
resize.debouncedResize = debounce(resize.applyResizeDebounce.bind(resize), 50);
resize.onGlobalResize();

window.addEventListener('resize', resize.onGlobalResize.bind(resize));
