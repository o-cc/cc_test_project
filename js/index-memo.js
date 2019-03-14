$( function () {

    let memoInfoIncache = memoModule.memoInfoIncache;
    memoInfoIncache?memoInfoIncache:"";
    let len = memoInfoIncache.length;

    for ( let i = 0; i < len; i++ ) {

        let element = memoInfoIncache[i];
        let title   = element[ "title" ];
        let content = element[ "content" ];

        if ( title.length > 9 ) {
            title = title.slice( 0, 9 );
        }

        if ( content.length > 60 ) {
            content = content.slice( 0, 60 );
        }

        let str = `
                    <div class="memo_item">
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

        let boo = $( ".audio_click" ).prop( "checked" );

        let changeData = {
            "title"    : $(".memo_title").val(),
            "centent"  : editor.txt.html(),
            "is_warn"  : boo,
            "warn_time": boo?$("#datetime-picker").val(): "",
        };
        memoModule.postMemoInfo( changeData, function (err, res) {


        })
    })


} )