var dom = $j.namespace('dom')

$jdom = $j.dom = {
	id: function(arg) {
		return document.getElementById(arg);
	},
	prev: function(elem) {
		do {
			elem = elem.previousSibling;
		} while(elem && elem.nodeType !== 1);
		return elem;
	},
	next: function(elem) {
		do {
			elem = elem.nextSibling;
		} while(elem && elem.nodeType !== 1);
		return elem;
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
	}
}