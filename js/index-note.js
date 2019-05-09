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
    var timeOutEvent = null;
    $( ".note_item" ).on( {

        touchstart: function ( e ) {
            // 长按事件触发
            let self = this;
            timeOutEvent = setTimeout( function () {
                timeOutEvent = 0;

                if( $( self ).attr( "data") ) {

                    $.confirm( {
                        title   : '提示',
                        text    : '确定删除？',
                        onOK    : function () {
                            //点击确认
                            noteModule.delteNoteInfoById( $( self ).attr( "data"), function ( err, res ) {
                                if( err ) {
                                    loger( err );
                                    return;
                                }
                                $( self ).remove();

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
                if( $(self).attr("data") ) {

                    $(".memo_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() );
                    editor.txt.html( $( this ).children("div").eq(1).children("p").eq(0).html() );
                    GoHashUrl( "memo_input" );
                }

            }
            return false;
        }
    } )



    //点击保存
    $(".save_notes_btn").click( function () {
        //点击保存
        //是否有声音
        if( !$(".note_title").val() ) {
            loger( "请填写备忘录标题" );
            return;
        }

        if( !editor1.txt.html() ) {
            loger( "请填写内容" );
            return;
        }


        let changeData = {
            "title"    : $(".note_title").val(),
            "content"  : editor1.txt.html(),

        };
        noteModule.postNoteInfo( changeData, function (err, res) {
            if( err ) {
                loger( err );
                return;
            }

            //将最新的数据写入到html上
            let content = editor1.txt.html();
            content.length > 60?content.slice( 0, 60 ): content;

            let str = `
                   <div class="memo_item">
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
            loger( res );
            GoHashUrl( "notes" );

        })
    })

};

export { noteModuleFile }