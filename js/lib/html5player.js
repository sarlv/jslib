var Html5Player = function(args) {

    var Model, View, Controller, errorMsg = '',

    PARENT_ELEM  = args.elem,
    URL          = args.url || '',
    PLAY_BUT     = (args.play)  ? args.play  : true,
    PAUSE_BUT    = (args.pause) ? args.pause : true,
    STOP_BUT     = (args.stop)  ? args.stop  : true,
    WIDTH_ELEM   = (args.width) ? args.width : false;

    Model = {
        mediaSource: function(arg) {
            if(typeof arg !== 'string' || arg.trim() == '') {
                Controller.error('Unknown source');
            }
            return arg;
        }
    };

    View = {
        _newElem: function(etype, ename) {
            var but = document.createElement(etype);
                but.innerHTML = ename;
                but.className = ename;
            return but;
        },
        playButton: function() {
            return this._newElem('button', 'play');
        },
        pauseButton: function() {
            return this._newElem('button', 'pause');
        },
        stopButton: function() {
            return this._newElem('button', 'stop');
        },
        cssElem: function(elem, param) {
            //TO DO
        },
        assemble: function(elem) {
             var videoElem = document.createElement('video');
                 videoElem.src = Model.mediaSource(URL);
                 videoElem.className = 'html5player';
                 elem.appendChild(videoElem);
             return elem;
        }
    };

    Controller = {
        _handler: function(cname, evt) {
            function func(e) {
                if(e.target.className === cname) {
                        elem = PARENT_ELEM.getElementsByTagName('video')[0];
                        elem[evt]();
                    return elem;
                }
            }
            elem.addEventListener('click', func, false);
        },
        play: function() {
            this._handler('play', 'play');
        },
        pause: function() {
            this._handler('pause', 'pause');
        },
        stop: function() {
            this._handler('stop', 'pause');
        },
        error: function(arg) {
            return errorMsg += arg + '\n';
        },
        init: function() {

            var parent = View.assemble(args.elem);

            if(PLAY_BUT) {
                this.play(args.elem);
                parent.appendChild(View.playButton());
            }
            if(PAUSE_BUT) {
                this.pause(args.elem);
                parent.appendChild(View.pauseButton());
            }
            if(STOP_BUT) {
                this.stop(args.elem);
                parent.appendChild(View.stopButton());
            }
            if(WIDTH_ELEM) {
                View.cssElem(PARENT_ELEM, WIDTH_ELEM);
            }
            if(errorMsg !== '') {
                console.log(errorMsg);
            }
        }
    };

    return {
        init: Controller.init(args)
    }

};
