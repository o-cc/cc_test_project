function memoModlueFile(){


    function timeEvent() {
        var timeOutEvent = null;
        $( ".memo_item" ).on( {

            touchstart: function ( e ) {
                // 长按事件触发
                let self = this;
                timeOutEvent = setTimeout( function () {
                    timeOutEvent = 0;
                    let memoId = $( self ).attr( "data" );
                    if( memoId && memoId !== "undefined" ) {

                        $.confirm( {
                            title   : '提示',
                            text    : '确定删除？',
                            onOK    : function () {
                                //点击确认
                                memoModule.delteMemoInfoById( memoId, function ( err, res ) {
                                    if( err ) {
                                        loger( err );
                                        return;
                                    }

                                    $( self ).remove();

                                    if( $( ".memo_item" ).length < 6 ) {
                                        let len = $( ".memo_item" ).length;
                                        for ( let i = 0; i < 6 - len; i++ ) {
                                            $( ".memo_items" ).append( "<div class='memo_item' style='opacity: 0'></div>" );
                                        }
                                    }
                                    //删除后没有让首页盒子的消失
                                    //写两部分，第一如果存在id和type的话，就删除 如果不存在 是不是新添加的
                                    //$( self ).attr( "data") 是当前id

                                    if( $( ".home_items>div[id="+memoId+"][data-type='memo']" ) ) {

                                        try {
                                            $( ".home_items>div[id="+memoId+"][data-type='memo']" ).remove();
                                        }catch ( e ) {
                                            console.log( "remove home_item fail" );
                                            console.log( e );
                                        }

                                    }else if( $( ".home_items>div[data-id='hide'][data-type='memo']" ) ){
                                        //如果是新增加的 是没有id的，
                                        try {
                                            $( ".home_items>div[data-id='hide'][data-type='memo']" ).remove();
                                        }catch ( e ) {
                                            console.log( "remove home_item data-id=hide fail" );
                                            console.log( e );
                                        }
                                    }


                                    if( $( ".home_item" ).length < 7 ) {
                                        let len = $( ".home_item" ).length;
                                        for ( let i = 0; i < 7 - len; i++ ) {
                                            $( ".home_items" ).append( "<div class='home_item' data-type='hide' style='opacity: 0'></div>" );
                                        }
                                    }


                                } )

                            }
                        } );
                    }


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
                let self = this;
                if ( timeOutEvent != 0 ) {
                    // 点击事件
                    //显示到记事本
                    if( $( self ).attr( "data" ) || $(self).attr("data-id") ) {
                        $(".memo_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() );
                        editor.txt.text( $( this ).children("div").eq(1).children("p").eq(0).html() );

                        //判断是不是要修改的
                        $(".save_memo_btn").attr( "submit-type", "put" );
                        $(".save_memo_btn").attr( "id", $( self ).attr( "data" )  );
                        GoHashUrl( "memo_input" );
                    }

                }
                return false;
            }
        } )

    }


    let memoInfoIncache = memoModule.memoInfoIncache;
    memoInfoIncache     = memoInfoIncache?memoInfoIncache:" ";
    let len             = memoInfoIncache.length;

    try {

        for ( let i = 0; i < len; i++ ) {
            let element = memoInfoIncache[ i ];
            let title   = element[ "title" ];
            let content = element[ "content" ] ? element[ "content" ] : "";
            let memoId  = element[ "id" ];

            let warnTime = element[ "warn_time" ];
            if( warnTime ) {

                let warnDate = new Date( warnTime );
                let timeOut  = warnDate - new Date();
                if( warnDate.toString() !== "Invalid Date" ) {
                    if( warnDate - new Date() > 0 ) {
                        showTimeWarning( timeOut );
                    }
                }
            }

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
                        </div>`;

            $( ".memo_items" ).append( str );
        }

        if( $( ".memo_item" ).length < 6 ) {
            let len = $( ".memo_item" ).length;
            for ( let i = 0; i < 6 - len; i++ ) {
                $( ".memo_items" ).append( "<div class='memo_item' style='opacity: 0'></div>" );
            }
        }

        //长按事件
        timeEvent();

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

    $( ".memo_a" ).click( function () {
        //是post操作
        $(".save_memo_btn").attr( "submit-type", "post" );
    } )
    //点击保存
    $(".save_memo_btn").click( function () {
        //点击保存
        //是否有声音
        if( !$(".memo_title").val() ) {
            loger( "请填写备忘录标题" );
            return;
        }

        if( !editor.txt.text() ) {
            loger( "请填写内容" );
            return;
        }
        choseDate += ":00";

        let boo = $( ".audio_click" ).prop( "checked" )?true:false;
        let changeData = {
            "title"    : $(".memo_title").val(),
            "content"  : editor.txt.text(),
            "is_warn"  : boo,
            "warn_time": boo?choseDate: null,
        };

        if( !boo ) {
            delete changeData[ "warn_time" ]
        }

        //如果存在一个属性，说明是修改的 否则是添加
        if( $(this).attr( "submit-type" ) === "put" ) {

            if( !$(this).attr("id") ) {
                loger( "无法获取id修改" );
                return;
            }
            let changeData = {
                "title"    : $(".memo_title").val(),
                "content"  : editor.txt.text()
            }
            let id = $(this).attr( "id" );

            memoModule.putMemoInfoById( $(this).attr("id"), changeData, function ( err, tf ) {

                if( err ) {
                    loger( err );
                    return;
                }

                $(".memo_item[data='"+id+"']").find("h5").html( changeData[ "title" ] );
                $(".memo_item[data='"+id+"']").find(".item_content").children("p").eq(0).html( changeData[ "content" ] );
                $( ".memo_title" ).val( "" );
                editor.txt.text( "" );
                $(".audio_click").prop( "checked", false );
                $("#datetime-picker").val("");
                GoHashUrl( "memo" );

            } )
            return;
        }

        memoModule.postMemoInfo( changeData )
            .then( res => {

                //将最新的数据写入到html上
                let content = editor.txt.text();
                content.length > 60 ? content.slice( 0, 60 ) : content;

                let str = `
                        <div class="memo_item" data=`+ res.id +` data-id="hide" data-type="memo">
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

                //控制声音
                if( choseDate ) {
                    let warningTime = new Date(choseDate) - new Date();
                    if( warningTime > 0 ) {
                        showTimeWarning( warningTime, $( ".memo_title" ).val(), content );
                    }
                }
                //加了一行辣鸡代码 用来添加到首页html
                $( ".home_items" ).prepend( str );
                //欸这里会影响性能！
                if( $( ".home_items>div[data-type='hide']" ).length >= 1 ) {
                    $( ".home_items>div[data-type='hide']" ).eq(0).remove();
                }

                timeEvent();
                loger( res[ "errmsg" ] );
                $( ".memo_title" ).val( "" );
                editor.txt.text( "" );
                $(".audio_click").prop( "checked", false );
                $("#datetime-picker").val("");
                GoHashUrl( "memo" );

            } )
            .catch( err => {

                loger( err );
            } )

    } )

};

export { memoModlueFile }