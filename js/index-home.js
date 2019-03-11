$( function () {


    $( ".fix" ).click( function () {
        $.actions( {
            actions:
                [
                    {
                        text     : "添加备忘",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "memo" );
                        }
                    },
                    {
                        text     : "记事本",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "notes" );
                        }
                    },
                    {
                        text     : "添加计划",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "plan" );
                        }
                    },
                    {
                    text     : "准备记账",
                    className: "alert_action",
                    onClick  : function () {
                        //do something
                        GoHashUrl( "bill" );
                    }
                }
                ]
        } );
    } );


    $( ".home_items" )

    function GoHashUrl ( hashValue ) {
        window.location.href = "#" + hashValue;
    };
    //长按事件
    var timeOutEvent = null;
    $( ".memo_item" ).on( {
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

} )