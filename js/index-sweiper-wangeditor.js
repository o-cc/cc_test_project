
<!--weiper特效-->
    //创建编辑器
    const E       = window.wangEditor;
    const editor  = new E( '#editor' );
    const editor1 = new E( '#editor_notes' );
    editor.create();
    editor1.create();
    $( ".w-e-toolbar" ).html( "" );


    var menuButton = document.querySelector( '.menu-button' );
    var swiper     = new Swiper( '.swiper-container', {
        slidesPerView      : 'auto',
        initialSlide       : 1,
        resistanceRatio    : 0,
        slideToClickedSlide: true,
        on                 : {
            init       : function () {
                var slider = this;
                menuButton.addEventListener( 'click', function () {
                    if ( slider.activeIndex === 0 ) {
                        slider.slideNext();
                    } else {
                        slider.slidePrev();
                    }
                }, true );
            },
            slideChange: function () {
                var slider = this;
                if ( slider.activeIndex === 0 ) {
                    menuButton.classList.add( 'cross' );
                } else {
                    menuButton.classList.remove( 'cross' );
                }
            },
        }
    } );


