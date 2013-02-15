(function() {
	// Универсальня функция создания пространства имен
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

	window.$j = JW;

}());


