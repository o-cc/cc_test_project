$( function () {

    $( ".sign_in" ).click( function () {
        //用户名、密码

        let username = $("#username").val().trim(),
            password= $("#password").val().trim();

        if( username.length < 5 ) {
            $.alert("用户名长度不能小于5");
            return;
        }

        if( password.length < 6 ) {
            $.alert("密码长度不能小于6");
            return;
        }

        let data = {
            "username": username,
            "password": password
        };

        $.ajax({
            url        : globalUrl.httpServerUrl + "authorizations/",
            method     : "POST",
            data       : JSON.stringify( data ),
            contentType: "application/json",
            success    : function ( res ) {

                if( res.errno !== "0" ) {
                    $.alert({
                        title: '提示',
                        text: res["errmsg"],
                    });
                    return;
                }

                window.localStorage.setItem( "token", "JWT " + res["token"])
                window.location.href = "./index.html";
            },
            error      : function ( err ) {
                $.alert({
                    title: '提示',
                    text: err,
                });
            }
        })

    } );

    $( ".register_btn" ).click( function () {

        let data = {
            "username": $(".register_username").val().trim(),
            "password": $(".register_password").val().trim(),
            "repwd"   : $(".register_email").val().trim(),
            "question": "我的生日",
            "answer"  : "8月3日",
            "gender"  : "MAN",
            "email"   : $(".register_email").val().trim()
        };
        $.ajax( {
            url        : globalUrl.httpServerUrl + "authorizations/",
            method     : "POST",
            data       : JSON.stringify( data ),
            contentType: "application/json",
            success    : function ( res ) {

                if( res.errno !== "0" ) {
                    $.alert({
                        title: '提示',
                        text: res["errmsg"],
                    });
                    return;
                }

                window.localStorage.setItem( "token", "JWT " + res["token"])
                window.location.href = "./index.html";
            },
            error      : function ( err ) {
                $.alert({
                    title: '提示',
                    text: err,
                });
            }
        })

    } );

    $("#register").click(function () {
        $(".second").hide(1000);
        $(".third").show(100);
    });

    $("#login").click(function () {
        $(".third").hide(1000);
        $(".second").show(1000);
    });

})
