
    app.directive('wmImageSwitcher', function() {
            return function(scope, element, attrs) {

                var current = $(element);
                current.bind('click',function(e) {
                    var imageURL = current.attr('wm-image-switcher-image');
                    current.parent().siblings('.hauptbilder').find('img').attr('src',imageURL);
                });

                //@TODO: PhotoSwipe
                //$('#vorschaubilder a, .objektbild a').photoSwipe({backButtonHideEnabled: false});
            };
    });