(function($) {
    $.fn.ndAccordion = function(options) {
        var settings = $.extend({
            'ratio': '16:9',
            'width': '50',
            'height': null,
            'waitInterval': 2000,
            'animationInterval': 300,
            'randomStart': true,
            'onOpen': function(item) {},
            'onClose': function(item) {}
        }, options);

        return this.each(function(i) {
            var accordion = $(this);
            var accordionItems = accordion.children('div');

            accordion.hide();

            accordion.addClass('ndAccordion');
            accordionItems.addClass('ndAccordion-Item');
            accordionItems.wrapAll( "<div class='ndAccordion-ItemsHolder'/>");

            if (settings.height!=null) {
                accordion.css({
                    'height': settings.height,
                    'padding-top': 0
                })
            } else if (settings.ratio != null) {
                var ratio = settings.ratio.split(':');
                accordion.css({
                    'height': 'auto',
                    'padding-top': (((100-settings.width)*ratio[1])/ratio[0])+'%'
                });
            } else {
                accordion.css({
                    'height': '100%',
                    'padding-top': 0
                })
            }

            if (accordionItems.length==1) {
                accordionItems.css('width', settings.width+'%');
                settings.onOpen(accordionItems.eq(start));
            } else if (accordionItems.length>1) {
                var start = settings.randomStart ? Math.floor(Math.random()*accordionItems.length) : 0;
                var itemWidth = ((100-settings.width)/(accordionItems.length-1));
                var selectedItemWidth = settings.width;

                accordionItems.css('width', itemWidth+'%');
                accordionItems.eq(start).css('width', selectedItemWidth+'%');
                settings.onOpen(accordionItems.eq(start));

                accordion.on('click', '.ndAccordion-Item', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    cycler.change($(this).index());
                });

                var cycler = new ndCycler(
                    accordionItems.length,
                    start,
                    settings.waitInterval,
                    function(fromValue, toValue) {
                        if (fromValue == toValue)
                            return;

                        var fromEl = accordionItems.eq(fromValue);
                        var toEl = accordionItems.eq(toValue);

                        settings.onClose(fromEl);

                        fromEl.animate(
                            {'width': itemWidth+'%'},
                            {
                                duration: settings.animationInterval,
                                step: function( now, fx ) {
                                    toEl.css('width', (100 - now - (accordionItems.length-2)*itemWidth)+'%');
                                },
                                complete: function() {
                                    settings.onOpen(toEl);
                                }
                            });
                    });

                cycler.start();
            }

            accordion.show();
            return $(this);
        });
    };
})(jQuery);