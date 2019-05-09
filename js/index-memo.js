function memoModlueFile(){


    let memoInfoIncache = memoModule.memoInfoIncache;
    memoInfoIncache     = memoInfoIncache?memoInfoIncache:" ";
    let len             = memoInfoIncache.length;

    try {
        for ( let i = 0; i < len; i++ ) {

        let element = memoInfoIncache[ i ];
        let title   = element[ "title" ];
        let content = element[ "content" ] ? element[ "content" ] : "";
        let memoId  = element[ "id" ];
        if ( title.length > 9 ) {
            title = title.slice( 0, 9 );
        }

        if ( content.length > 60 ) {
            content = content.slice( 0, 60 );
        }

        let str = `
                    <div class="memo_item" data=`+ memoId + `>
                        <div class="item_title">
                            <h5>`+title+`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                               `+content+`
                            </p>
                        </div>
                    </div>
                `;

        $( ".memo_items" ).append( str );
    }

    if( $( ".memo_item" ).length < 6 ) {
        let len = $( ".memo_item" ).length;
        for ( let i = 0; i < 6 - len; i++ ) {
            $( ".memo_items" ).append( "<div class='memo_item' style='opacity: 0'></div>" );
        }
    }

        //长按事件
        var timeOutEvent = null;
        $( ".memo_item" ).on( {

            touchstart: function ( e ) {
                // 长按事件触发
                let self = this;
                timeOutEvent = setTimeout( function () {
                    timeOutEvent = 0;

                    memoModule.delteMemoInfoById( $( self ).attr( "data"), function ( err, res ) {
                        if( err ) {
                            loger( err );
                            return;
                        }

                        $.confirm( {
                            title   : '提示',
                            text    : '确定删除？',
                            onOK    : function () {
                                //点击确认
                                $( self ).remove();
                            }
                        } );
                    } )


                }, 1000 );
                //长按400毫秒
                 e.preventDefault();
            },
            touchmove : function () {
                clearTimeout( timeOutEvent );
                timeOutEvent = 0;
            },
            touchend  : function () {
                clearTimeout( timeOutEvent );
                if ( timeOutEvent != 0 ) {
                    // 点击事件
                    //显示到记事本
                    $(".memo_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() );
                    editor.txt.html( $( this ).children("div").eq(1).children("p").eq(0).html() );
                    GoHashUrl( "memo_input" );
                }
                return false;
            }
        } )


    }catch ( e ) {
        console.log( e );
    }

    let choseDate = "";
    //点击声音开关
    $( ".audio_click" ).click( function () {

        if ( $( this ).prop( "checked" ) ) {
            $( ".controll_date" ).show();
            return;
        }

        $( ".controll_date" ).hide();

    } )

    let date = new Date();
    let str  = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    $( "#datetime-picker" ).datetimePicker( {
        min    : str,
        max    : (date.getFullYear() + 1) + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        onClose: function ( picker ) {
            //2019-03-01-10-45

            let value    = picker.value.join( ":" );
            let newValue = value.replace( /[:]/, "-" ).replace( /[:]/, "-" ).replace( /[:]/, " " );
            let date    = new Date( newValue );
            //设置全局选择的时间 post
            choseDate   = newValue;
            let nowDate = new Date();
            if ( nowDate > date ) {
                $( "#datetime-picker" ).val( "" );
                return;
            }

            let min   = (date - nowDate) / 1000 / 60;
            let hours = min / 60;
            let day   = Math.floor( hours / 24 );
            min       = Math.ceil( min > 60 ? (Math.ceil( min / 60 ) - (min / 60)) * 60 : min ) + "分";
            hours     = Math.floor( hours > 24 ? (Math.ceil( hours / 24 ) - (hours / 24)) * 24 : hours ) + "时";
            day       = (day > 1 ? day + "天" : " ");
            $( "#datetime-picker" ).val( day + hours + min + "后响铃" );
        }
    } );

    //点击保存
    $(".save_memo_btn").click( function () {
        //点击保存
        //是否有声音
        if( !$(".memo_title").val() ) {
            loger( "请填写备忘录标题" );
            return;
        }

        if( !editor.txt.html() ) {
            loger( "请填写内容" );
            return;
        }
        choseDate += ":00";
        let boo = $( ".audio_click" ).prop( "checked" )?true:false;
        let changeData = {
            "title"    : $(".memo_title").val(),
            "content"  : editor.txt.html(),
            "is_warn"  : boo,
            "warn_time": boo?choseDate: null,
        };

        if( !boo ) {
            delete changeData[ "warn_time" ]
        }
        memoModule.postMemoInfo( changeData )
            .then( res => {

                //将最新的数据写入到html上
                let content = editor.txt.html();
                content.length > 60 ? content.slice( 0, 60 ) : content;

                let str = `
                        <div class="memo_item">
                            <div class="item_title">
                                <h5>` + $( ".memo_title" ).val() + `</h5>
                            </div>
                            <div class="item_content">
                                <p>
                                   ` + content + `
                                </p>
                            </div>
                        </div>
                    `;
                $( ".memo_a" ).after( str );

                loger( res );
                $( ".memo_title" ).val( "" );
                editor.txt.html( "" );
                GoHashUrl( "memo" );

            } )
            .catch( err => {

                loger( err );
            } )

    } )

};

export { memoModlueFile }