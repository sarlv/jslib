(function() {
	
	'use strict';
	
	window.JW = function () {};
	
	JW.is = function(type, obj) {
		var clas = Object.prototype.toString.call(obj).slice(8, -1);
		return obj !== undefined && obj !== null && clas === type;
	}
	
	return var $j = new JW();
	
}());


