import { memoModlueFile } from "./index-memo.js"
import { noteModuleFile } from "./index-note.js"
import { planModuleFile } from "./index-plan.js"
import { billModuleFile } from "./index-bill.js"

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
                            $( ".menu_title" ).html ( "备忘录" );

                        }
                    },
                    {
                        text     : "记事本",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "notes" );
                            $( ".menu_title" ).html ( "记事本" );

                        }
                    },
                    {
                        text     : "添加计划",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "plan" );
                            $( ".menu_title" ).html ( "计划表" );

                        }
                    },
                    {
                        text     : "准备记账",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "bill" );
                            $( ".menu_title" ).html ( "记账本" );
                        }
                    }
                ]
        } );
    } );

    $( "#signout" ).click( function () {

        $.confirm( {
            title   : '提示',
            text    : '确定退出吗',
            onOK    : function () {
                //点击确认
                window.localStorage.setItem( "token", "" );
                window.location.href = "./login.html";
            }
        } );

    } )
    //点击左边侧栏修改标题
    $( ".bom_menu" ).on( "click", "a", function () {
        $( ".menu_title" ).html ( this.innerHTML );

    } )
    //首页默认10条 5条备忘录
    Promise.all([
        memoModule.getAllMemoInfo(),
        noteModule.getAllNoteInfo(),
        planModule.getAllPlanInfo(),
        //getUserInfo()
    ])
        .then( data => {
            let memoInfo = data[ 0 ];
            let noteInfo = data[ 1 ];
            let userInfo = data[ 3 ];

            if( typeof userInfo !== "string" ){
                loger( "用户名出错联系管理员" );
            }

            try {

                $( ".head_img" ).html( userInfo["username"].charAt(0) );
                $( ".persion_info" ).children("p").eq(0).html( userInfo["username"] );
                $( ".persion_info" ).children("p").eq(1).html( userInfo["email"] );

            }catch ( e ) {

            }

            try {

                let len = memoInfo.length;
                len     = len > 5? 5 : len;

                for ( let i = 0; i < len; i++ ) {

                    let element = memoInfo[i];
                    let title   = element[ "title" ];
                    let content = element[ "content" ] ? element[ "content" ] : " ";

                    if ( title.length > 9 ) {
                        title = title.slice( 0, 9 );
                    }

                    if ( content.length > 60 ) {
                        content = content.slice( 0, 60 );
                    }

                    let str = `
                    <div class="home_item" id=`+element["id"]+` data-type="memo">
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

                let noteInfoLen = noteInfo.length;
                noteInfoLen     = noteInfoLen > 5? 5 : noteInfoLen;
                for ( let i = 0; i < noteInfoLen; i++ ) {
                    let element = noteInfo[i];
                    let title   = element[ "titile" ];
                    let content = element[ "content" ] ? element[ "content" ] : " ";

                    if ( title.length > 9 ) {
                        title = title.slice( 0, 9 );
                    }

                    if ( content.length > 60 ) {
                        content = content.slice( 0, 60 );
                    }

                    let str = `
                        <div class="home_item" id=`+ element["id"] +` data-type="note">
                            <div class="item_title">
                                <h5>` + title + `</h5>
                            </div>
                            <div class="item_content">
                                <p>
                                   ` + content + `
                                </p>
                            </div>
                        </div>`;

                    $( ".home_items" ).append( str );
                }

                if( $( ".home_item" ).length < 7 ) {
                    let len = $( ".home_item" ).length;
                    for ( let i = 0; i < 7 - len; i++ ) {
                        $( ".home_items" ).append( "<div class='home_item' data-type='hide' style='opacity: 0'></div>" );
                    }
                }

                //长按事件
                var timeOutEvent = null;
                $( ".home_item" ).on( {
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
                            let moduleType = $( this ).attr( "data-type" );
                            if( moduleType === "memo" ) {
                                $(".memo_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() )
                                editor.txt.text( $( this ).children("div").eq(1).children("p").eq(0).html() );

                                //判断是不是要修改的
                                $(".save_memo_btn").attr( "submit-type", "put" );
                                $(".save_memo_btn").attr( "id", $( this ).attr( "id" )  );
                                GoHashUrl( "memo_input" );
                            }

                            if( moduleType === "note" ) {
                                $(".note_title").val( $( this ).children("div").eq(0).children("h5").eq(0).html() )
                                editor1.txt.text( $( this ).children("div").eq(1).children("p").eq(0).html() );

                                //判断是不是要修改的
                                $(".save_notes_btn").attr( "submit-type", "put" );
                                $(".save_notes_btn").attr( "id", $( this ).attr( "id" )  );
                                GoHashUrl( "note_input" );
                            }

                        }
                        return false;
                    }
                } )

                //加载各个页面
                memoModlueFile();
                noteModuleFile();
                planModuleFile();
                billModuleFile();
            }catch ( e ) {
                console.log( e );
            }

        } )
        .catch( err => {
            loger( err );
        } )

} )