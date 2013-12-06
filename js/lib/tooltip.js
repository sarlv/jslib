;(function() {
    // Tooltip
    var Tooltip = function(opt) {
        this.link = opt.link;
        this.popup = opt.popup;
        this.speed = opt.speed || 70;
    }

    Tooltip.params = {};

    Tooltip.setParams = function(elems) {
        var i;
        for(i in elems) {
            Tooltip.params[i] = {
                w:      elems[i].width(),
                h:      elems[i].height(),
                pos:    elems[i].position(),
                offset: elems[i].offset()
            };
        }
    };

    Tooltip.pos = function(l, p) {
        var link = l, popup = p,
            clink = Tooltip.params.link,
            cpopup = Tooltip.params.popup;
            tp     = cpopup.offset.top - clink.offset.top - clink.h,
            lf     = clink.offset.top - clink.pos.top - (cpopup.w / 2);
        popup.css({
            marginTop: -tp + 'px',
            left: lf + 'px'
        });
    };

    Tooltip.prototype = {

        enter: function() {
            var b = $('body'),
                popup = this.popup;

            popup.stop().fadeIn(function() {
                $(this).css({
                    'opacity': 1,
                    'z-index': 100
                });
            });

            Tooltip.pos(this.link, this.popup);

            b.unbind('mousemove');
        },

        leave: function(evt) {
            var b      = $('body'),
                link   = this.link,
                popup  = this.popup,
                pclass = popup.attr('class'),
                lclass = link.attr('class'),
                speed  = this.speed;

            b.on('mousemove', function(e) {
                if(!($(e.target)
                        .hasClass(pclass)|| 
                     $(e.target)
                        .parents().hasClass(pclass) ||
                     $(e.target)
                        .hasClass(pclass) ||
                     $(e.target)
                        .parents().hasClass(pclass))) {
                    
                    popup.stop().fadeOut(speed);

                }
            })
        },

        init: function() {
            var self = this, link = this.link;

            Tooltip.setParams({
                    'link': this.link,
                    'popup': this.popup
                });

            link.on('mouseover', function(e) {
                    self.enter();
                })
                .on('mouseout', function(e) {
                    self.leave(e);
                })
                .on('click', function(e) {
                    e.preventDefault();
                })

        }
    }

    var tooltip = new Tooltip({
        link: $('.likes-num_wrap'),
        popup: $('.popup-likes_wrap'),
        speed: 100
    });
    tooltip.init();

}());