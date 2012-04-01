			var $g;
			(function() {
				// Универсальня функция создания пространства имен
				var GOROD = GOROD || {};
				GOROD.namespace = function(ns_string) {
					var parts = ns_string.split('.'),
					parent = GOROD,
					i = 0;

					if(parts[0]  === 'GOROD') {
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

				GOROD.form = (function() {

					var errMsg = {

						// Проверка обязательности определенного поля
						required: {
							msg: function(msg) {
								return msg || 'Это обязательное поле';   
							},
							test: function(obj) {
								// Обеспечение отсутствия в поле введенного текста
								// и задержки начала работы на загружаемой странице
								// (демонстрация сообщения 'Это обязательное поле' при загрузке
								// страницы будет только раздражать пользователя)
								return obj.value.length > 0 || obj.value === obj.defaultValue;
							}
						},

						// Определение наличия в поле приемлемого адреса электронной почты
						email: {
							msg: function(msg) {
								return msg || 'Email is not a valid email address';
							},
							test: function(obj) {
								// Определение, что в поле что-то введено, и что введенное
								// значение похоже на адрес электронной почты
								return obj.value.length > 0 && /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(obj.value);
							}
						},

						// Определение, что поле содержит телефонный номер, и
						// его автоформатирование в случае положительного результата
						phone: {
							msg:  function(msg) {
								return msg || 'Введенный номер неприемлем';
							},
							test: function(obj) {
								// Определение, что введенное значение  похоже
								// на приемлемый телефонный номер
								var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec(obj.value);

								// Если похоже на то, что, номер приемлем, приведение
								// его к определенному желаемому формату: (123) 456-7890
								if ( m ) {
									obj.value = "(" + m[1]+") " + m[2]+"-"+m[3];
								}

								return !obj.value || m;
							}
						},

						// Определение, что поле содержит приемлемую дату
						// формата ММ/ДД/ГГГГ
						date: {
							msg: function(msg) {
								return msg || 'The format of Дата рождения is invalid';
							},
							test: function(obj) {
								// Определение, что в поле что-то введено, и что введенное
								// значение похоже на приемлемую дату формата ММ/ДД/ГГГГ
								return obj.value && /^\d{2,4}\-\d{2}\-\d{2}$/.test(obj.value);
							}
						},

						// Определение, что поле содержит приемлемый URL
						url: {
							msg:  function(msg) {
								return msg || 'URL неприемлем';
							},
							test: function(obj) {
								// Определение, что в поле введен какой-нибудь текст, и он
								// отличается от уже введенного по умолчанию текста
								// http://
								return !obj.value || obj.value == 'http://' ||
									// Определение, что введенное значение похоже на
								// приемлемый URL
									/^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test(obj.value);
							}
						},

						gender: {
							msg:  function(msg) {
								return msg || 'Пол is not in the list';
							},
							test: function(obj) {
								var pat = /male|famele/i;
								return pat.test(obj.value);
							}
						},

						password: {
							msg:  function(msg) {
								return msg || 'Неверный пароль';
							},
							test: function(obj) {
								var pat = /[\w\d]/i;
								return pat.test(obj.value) && obj.value.length >= 6;
							}
						},

						name: {
							msg:  function(msg) {
								return msg || 'Неверное имя';
							},
							test: function(obj) {
								var pat = /\w*/i;
								return pat.test(obj.value) && obj.value.length > 3;
							}
						}
					};

					return {
						validate: function(field, elem, e, msg) {
							if(!errMsg[field].test(elem[0])) {
								if(!elem.next().hasClass('err')) {
									elem.after('<p class="err">' + errMsg[field].msg(msg) + '</p>');
								}
								e.preventDefault();
								return false;
							} else {
								if(elem.next().hasClass('err')) {
									elem.next().empty();
								}
							}
						}         
					}

				}());

				// http://www.dustindiaz.com/top-ten-javascript/
				var gen = {
	    
					addEvent: function(elm, evType, fn, useCapture) {
		
						if (elm.addEventListener) {
		    
							elm.addEventListener(evType, fn, useCapture);
							return true;
		
						} else if (elm.attachEvent) {
		    
							return elm.attachEvent('on' + evType, fn);
		    
						} else {
		    
							elm['on' + evType] = fn;
		    
						}
					}
				},

				dom = {
	    
					id: function(elem) {
		
						return document.getElementById(elem);
		
					},
	    
					css: function(elem, prop, param) {
		
						elem.style[prop] = param;
		
					},
	    
					next: function(elem) {
						do {
		    
							elem = elem.nextSibling;
		    
						} while (elem && elem.nodeType != 1);
		
						return elem;
					},
	    
					prev: function(elem) {
		
						do {
		    
							elem = elem.previousSibling;
		    
						} while (elem && elem.nodeType != 1);
		
						return elem;
	    
					},
	    
					getClass: function(tag, name) {
		
						var allTag = document.getElementsByTagName(tag) || document.getElementsByTagName('*'),
						len = allTag.length,
						i, j, arr = [];
		    
						for (i = 0; i < len; i++) {
		    
							for (j in allTag[i].className.split(' ')) {
								if (allTag[i].className.split(' ')[j] == name)
									arr.push(allTag[i]);
							}
		    
						}
						return arr;
	    
					}
				}

				Interface = function(name, methods) {
					var i = 0, len = methods.length;

					if(arguments.length !== 2) {
						throw new Error("Interface constructor called with " + arguments.length + " arguments, but expected exatly 2");
					}

					this.name = name;
					this.methods = [];

					for(; i < len; i++) {
						if(typeof methods[i] !== 'string') {
							throw new Error("Interface constructor expects method name to be passed in a string");
						}
						this.methods.push(methods[i]);
					}
				};

				Interface.ensureImplements = function(obj) {
					var i = 1, j = 0, len = methods.length, counter = 0;

					if(arguments.length < 2) {
						throw new Error("Interface constructor called with " + arguments.length + " arguments, but expected exatly 2");
					}
					
					for(var j = 0, mLen = arguments[1].length; j < mLen; j++) {
						for(var x in arguments[0].prototype) {
							if(x === arguments[1][j]) {
								++counter;
							}
						}
					}
					
					if(counter !== arguments[1].length) {
						throw new Error("Function Interface.ensureImplements: object does not implement the interface.name interface. Method " + arguments[1][i] + " was not found");
					}

				}

				$g = GOROD;
			}());
		

		 
//			var id = function() {};
//			id.prototype.Test1 = function() {};
//			id.prototype.Test2 = function() {};
//			id.prototype.Test3 = function() {};
//		 
//			var test = Interface("id", ['Test1', 'Test2']);
//			test = Interface.ensureImplements(id, ['Test1', 'Test2', 'Test3']);
