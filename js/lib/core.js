(function() {
	// Универсальня функция создания пространства имен
	// позаимствованная у Стояна Стефанова
	var JW = JW || {};
	JW.namespace = function(ns_string) {
		var parts = ns_string.split('.'),
		parent = JW,
		i = 0;

		if(parts[0]  === 'JW') {
			parts = parts.slice(1);
		}

		for(; i < parts.length; i += 1) {
			if(typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	JW.console = function() {
		if(!window.console) {
			window.console = {};
		}
		var opt = [
			"log", "info", "warn", "error", "debug", "trace", "dir", "group",
	    	"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
	    	"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
		], i = 0, len = opt.length;

		for(; i < len; i += 1) {
			if(!window.console[opt[i]]) {
				window.console[opt[i]] = function() {};
			}
		}
	}();

	window.$j = JW;

}());


