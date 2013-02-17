(function() {
	var dom = $j.namespace('dom')

	$jdom = $j.dom = {
		id: function(arg) {
			return document.getElementById(arg);
		},
		getClass: function(arg) {
			var name = arg.trim(),
			 	elem;
			if(document.querySelector) {
				if(name.charAt(0) !== '.') {
					elem = document.querySelector('.' + name);
				} else {
					elem = document.querySelector(name);
				}
			} else {
				// TO DO
			}
			return elem;
		},
		prev: function(elem) {
			var el = elem;
			do {
				el = el.previousSibling;
			} while(el && el.nodeType !== 1);
			return el;
		},
		next: function(elem) {
			var el = elem;
			do {
				el = el.nextSibling;
			} while(el && el.nodeType !== 1);
			return el;
		},
		child: function(elem) {
			elem = elem.childNodes,
			len = elem.length,
			i = 0,
			result = [];
			for(; i < len; i += 1) {
				if(elem[i].nodeType === 1) {
					result.push(elem[i])
				}
			}
			return result;
		},
		css: function(arg, st, prop) {
			var elem = null;

			if(typeof arg === 'string') {
				if(arg.charAt(0) === '#') {
					elem = this.id(arg.slice(1));
				}
				if(arg.charAt(0) === '.') {
					elem = this.getClass(arg);
				}
			} else {
				return false;
			}

			if(elem !== null) {
				if(arguments.length === 2 && typeof st === 'string') {
					var params = st.split(':');
					elem.style[params[0]] = params[1];
				}

				if(arguments.length === 2 && typeof st === 'object') {
					var i;
					for(i in st) {
						elem.style[i] = st[i];
					}
				}

				if(arguments.length === 3) {
					elem.style[st] = prop;
				}
			}
		}
	}
}());