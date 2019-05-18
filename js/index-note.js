function noteModuleFile () {

    let noteInfoIncache = noteModule.noteInfoIncache;
    noteInfoIncache     = noteInfoIncache?noteInfoIncache:" ";
    let len             = noteInfoIncache.length;
    try {
        for ( let i = 0; i < len; i++ ) {

            let element = noteInfoIncache[i];
            let title   = element[ "titile" ];
            let content = element[ "content" ] ? element[ "content" ] : " ";
            let noteId  = element[ "id" ];
            if ( title.length > 9 ) {
                title = title.slice( 0, 9 );
            }

            if ( content.length > 60 ) {
                content = content.slice( 0, 60 );
            }

            let str = `
                   <div class="note_item" data=`+noteId+`>
                        <div class="item_title">
                            <h5>`+ title +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                `+ content +`
                            </p>
                        </div>
                   </div>
                `;

            $( ".note_items" ).append( str );
        }

        if( $( ".note_item" ).length < 6 ) {
            let len = $( ".note_item" ).length;

            for ( let i = 0; i < 6 - len; i++ ) {
                $( ".note_items" ).append( "<div class='note_item' style='opacity: 0'></div>" );
            }
        }


    }catch ( e ) {
        console.log( e );
    }

    //长按事件
    function timeEvent () {

        var timeOutEvent = null;
        $( ".note_item" ).on( {

            touchstart: function ( e ) {
                // 长按事件触发
                let self = this;
                timeOutEvent = setTimeout( function () {
                    timeOutEvent = 0;
                    let nodeId = $( self ).attr( "data");
                    if( nodeId ) {

                        $.confirm( {
                            title   : '提示',
                            text    : '确定删除？',
                            onOK    : function () {
                                //点击确认
                                noteModule.delteNoteInfoById( nodeId, function ( err, res ) {
                                    if( err ) {
                                        loger( err );
                                        return;
                                    }
                                    $( self ).remove();

                                    if( $( ".note_item" ).length < 6 ) {
                                        let len = $( ".note_item" ).length;

                                        for ( let i = 0; i < 6 - len; i++ ) {
                                            $( ".note_items" ).append( "<div class='note_item' style='opacity: 0'></div>" );
                                        }
                                    }

                                    //删除后没有让首页盒子的消失
                                    //写两部分，第一如果存在id和type的话，就删除 如果不存在 是不是新添加的
                                    //$( self ).attr( "data") 是当前id

                                    if( $( ".home_items>div[id="+nodeId+"][data-type='note']" ) ) {

                                        try {
                                            $( ".home_items>div[id="+nodeId+"][data-type='note']" ).remove();
                                        }catch ( e ) {
                                            console.log( "remove home_item fail" );
                                            console.log( e );
                                        }

                                    }else if( $( ".home_items>div[data-id='hide'][data-type='note']" ) ){
                                        //如果是新增加的 是没有id的，
                                        try {
                                            $( ".home_items>div[data-id='hide'][data-type='note']" ).remove();
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
                let self = this;
                clearTimeout( timeOutEvent );
                if ( timeOutEvent != 0 ) {
                    // 点击事件
                    //显示到记事本
                    if( $(self).attr("data") || $(self).attr("data-id") ){
                        $(".note_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() );
                        editor1.txt.text( $( this ).children("div").eq(1).children("p").eq(0).html() );

                        $(".save_notes_btn").attr( "submit-type", "put" );
                        $(".save_notes_btn").attr( "id", $( self ).attr( "data" )  );
                        GoHashUrl( "note_input" );
                    }

                }
                return false;
            }
        } )

    }
    timeEvent();


    //点击保存
    $(".save_notes_btn").click( function () {
        //点击保存
        //是否有声音
        let self = this;
        if( !$(".note_title").val() ) {
            loger( "请填写备忘录标题" );
            return;
        }

        if( !editor1.txt.text() ) {
            loger( "请填写内容" );
            return;
        }


        let changeData = {
            "title"    : $(".note_title").val(),
            "content"  : editor1.txt.text(),

        };

        if( $(this).attr( "submit-type" ) === "put" ) {

            if( !$( this ).attr( "id" ) ) {
                loger( "无法获取id修改" );
                return;
            }
            let id = $(self).attr( "id" );

            noteModule.putNoteInfoById( id, changeData, function ( err, res ) {

                if( err ){
                    loger(err);
                    return;
                }

                $(".note_title").val("");
                $(".note_item[data='"+id+"']").find("h5").html( changeData[ "title" ] );
                $(".note_item[data='"+id+"']").find(".item_content").children("p").eq(0).html( changeData[ "content" ] );
                editor1.txt.text( "" );
                GoHashUrl( "notes" );
            } )
            return;
        }

        noteModule.postNoteInfo( changeData, function (err, res) {
            if( err ) {
                loger( err );
                return;
            }

            //将最新的数据写入到html上
            let content = editor1.txt.text();
            content.length > 60?content.slice( 0, 60 ): content;

            let str = `
                   <div class="note_item" data=`+ res.id +` data-id="hide" data-type="note">
                        <div class="item_title">
                            <h5>`+ $(".note_title").val() +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                `+ content +`
                            </p>
                        </div>
                   </div>
                `;
            $(".note_add").after( str );
            //加了几行辣鸡代码 用来添加到首页html
            if( $( ".home_items>div[data-type='note']" ).length >= 1 ) {
                $( ".home_items>div[data-type='note']" ).eq(0).before( str );
            }else{
                $( ".home_items>div[data-type='hide']" ).eq(0).before( str );
            }
            timeEvent();

            //得删除掉一个隐藏的div
            if( $( ".home_items>div[data-type='hide']" ).length >= 1 ) {
                $( ".home_items>div[data-type='hide']" ).eq(0).remove();
            }

            loger( res["errmsg"] );
            GoHashUrl( "notes" );

        })
    })

    $(".note_add").click( function () {
        $(".save_notes_btn").attr( "submit-type", "post" );

    })

};

export { noteModuleFile }