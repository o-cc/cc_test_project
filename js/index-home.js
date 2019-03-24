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

    //首页默认10条 5条备忘录
    memoModule.getAllMemoInfo( function ( err, res ) {

        if ( err ) {
            loger( err );
            return;
        }

        let len = res.length;
        len > 5? 5 : len;
        for ( let i = 0; i < len; i++ ) {

            let element = res[i];
            let title   = element[ "title" ];
            let content = element[ "content" ];

            if ( title.length > 9 ) {
                title = title.slice( 0, 9 );
            }

            if ( content.length > 60 ) {
                content = content.slice( 0, 60 );
            }

            let str = `
                    <div class="home_item">
                        <div class="item_title">
                            <h5>` + title + `</h5>
                        </div>
                        <div class="item_content">
                            <p>
                               ` + content + `
                            </p>
                        </div>
                    </div>
                `;

            $( ".home_items" ).append( str );
        }
    } )


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