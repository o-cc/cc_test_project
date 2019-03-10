$( function () {

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
    $(".save_btn").click( function () {
        //点击保存
        //是否有声音

        //editor.txt.html()
        // $( ".audio_click" ).prop( "checked" )
    })


} )