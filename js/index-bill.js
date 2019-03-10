
$( function () {
    //这个是长按触发事件 事件的定义应该在数据添加之后
    var timeOutEvent = null;
    $( ".bill_item" ).on( {
        touchstart: function ( e ) {
            // 长按事件触发
            timeOutEvent = setTimeout( function () {
                timeOutEvent = 0;
                console.log( '你长按了' );
            }, 1000 );
            //长按400毫秒
            // e.preventDefault();
        },
        touchmove : function () {
            clearTimeout( timeOutEvent );
            timeOutEvent = 0;
        },
        touchend  : function () {
            clearTimeout( timeOutEvent );
            if ( timeOutEvent != 0 ) {
                // 点击事件
                // location.href = '/a/live-rooms.html';
                console.log( '你点击了' );
            }
            return false;
        }
    } )


    //这个是点击nav切换class
    $( ".nav_flag" ).eq(0).click( function () {
        $(this).addClass("weui_bar__item_on").siblings("div").eq(0).removeClass("weui_bar__item_on");
    });

    $( ".nav_flag" ).eq(1).click( function () {
        $(this).addClass("weui_bar__item_on").siblings("div").eq(0).removeClass("weui_bar__item_on");
    });


    $("#bill_type").click( function () {
        let self = this;
        $.actions({
            actions: [
                {
                    text: "个人日常消费",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );
                    }
                },
                {
                    text: "装修",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "旅游",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "教育",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "医疗",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "散布爱心",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                }
            ]
        });

    })

} )
