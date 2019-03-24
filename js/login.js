$( function () {

    $( ".sign_in" ).click( function () {
        //用户名、密码

        let username = $( "#username" ).val().trim(),
            password = $( "#password" ).val().trim();

        if ( username.length < 3 ) {
            $.alert( "用户名长度不能小于3" );
            return;
        }

        if ( password.length < 6 ) {
            $.alert( "密码长度不能小于6" );
            return;
        }

        let data = {
            "username": username,
            "password": password
        };

        $.ajax( {
            url        : globalUrl.httpServerUrl.signIn,
            method     : "POST",
            data       : JSON.stringify( data ),
            contentType: "application/json",
            success    : function ( res ) {

                if ( res.errno !== "0" ) {
                    $.alert( {
                        title: '提示',
                        text : res[ "errmsg" ],
                    } );
                    return;
                }

                window.localStorage.setItem( "token", "JWT " + res[ "token" ] )
                window.location.href = "./index.html";
            },
            error      : function ( err ) {
                console.log( JSON.stringify( err ) );
                $.alert( {
                    title: '提示',
                    text : "返回" + err.status + "信息为:" + err.responseText,
                } );
            }
        } )

    } );

    $( ".question" ).click( function () {
        let self = this;

        $.actions( {
            actions: [ {
                text   : "我的生日",
                onClick: function () {
                    //do something
                    $( self ).val( this.text );
                }
            }, {
                text   : "我的小名",
                onClick: function () {
                    //do something
                    $( self ).val( this.text );
                }
            }, {
                text   : "我的大名",
                onClick: function () {
                    //do something
                    $( self ).val( this.text );
                }
            }, {
                text   : "我最喜欢的动物是猫咪",
                onClick: function () {
                    //do something
                    $( self ).val( this.text );
                }
            } ]
        } );

    } );

    $( ".register_btn" ).click( function () {

        if ( $( ".register_password" ).val().trim().length < 6 ) {
            $.alert( {
                title: '提示',
                text : "密码长度不能小于6",
            } );
            return;
        }

        if ( $( ".register_password" ).val().trim() !== $( ".register_comfirmpassword" ).val().trim() ) {
            $.alert( {
                title: '提示',
                text : "密码不一致",
            } );
            return;
        }

        let data = {
            "username": $( ".register_username" ).val().trim(),
            "password": $( ".register_password" ).val().trim(),
            "repwd"   : $( ".register_comfirmpassword" ).val().trim(),
            "question": $( ".question" ).val().trim(),
            "answer"  : $( ".answer" ).val().trim(),
            "gender"  : "MAN",
            "email"   : $( ".register_email" ).val().trim()
        };

        for ( let i in data ) {

            if ( data[ i ].length < 1 ) {
                $.alert( {
                    title: '提示',
                    text : i + "不能为空",
                } );
                return;
            }
        }

        $.ajax( {
            url        : globalUrl.httpServerUrl.register,
            method     : "POST",
            data       : JSON.stringify( data ),
            contentType: "application/json",
            success    : function ( res ) {

                if ( res.errno !== "0" ) {
                    $.alert( {
                        title: '提示',
                        text : res[ "errmsg" ],
                    } );
                    return;
                }
                $.alert( {
                    title: '提示',
                    text : "注册成功，请登录",
                    onOK: function () {

                        window.location.href = "./login.html";
                    }
                } );

            },
            error      : function ( err ) {
                console.log( JSON.stringify( err ) );
                $.alert( {
                    title: '提示',
                    text : "返回" + err.status + "信息为:" + err.responseText,
                } );
                return;
            }
        } )

    } );

    $( ".forgot_btn" ).click( function () {

        let self  = this;
        //1 获取到data-value属性 默认是1 说明获取问题 2 验证问题 3 修改
        let flag  = $( self ).attr( "data-value" );

        if( flag === "1" ) {

            getUserQustion( $( ".forgot_username" ).val() , function ( err, question ) {

                if( err ) {
                    return;
                }

                $( ".forgot" ).removeClass( "hide" );
                $(".forgot_question").val( question );
                $( self ).attr( "data-value", "2" );
            } );
            return;
        }

        if( flag === "2" ) {

            let data = {
                "username": $( ".forgot_username" ).val().trim(),
                "password": $( ".forgot_password" ).val().trim(),
                "repwd"   : $( ".forgot_comfirmpassword" ).val().trim(),
            };

            for( let i in data ) {
                if( data[ i ].length < 3 ) {
                    $.alert( {
                        title: '提示',
                        text : i+"的长度不能小于5",
                    } );
                    return;
                }
            }

            data[ "answer" ] = $( ".forgot_answer" ).val().trim();

            putUserPassword( data, function ( err, res ) {

                if( err ) {
                    return;
                }

                //需要跳转到login了
                loger( "修改成功" );
                $( ".forgot" ).addClass( "hide" );
                $( self ).attr( "data-value", "1" );
                window.location.href = "#login";
            } );
            return;
        }

    } );

    //切换效果
    $( ".to_register" ).click( function () {
        $( ".second" ).hide( 1000 );
        $( ".third" ).show( 100 );
    } );
    $( ".to_login" ).click( function () {
        $( ".third" ).hide( 1000 );
        $( ".second" ).show( 1000 );
    } );

    /*
        * @params1 [String] 用户名
          @params2: [Function] 回调函数
        * */
    function getUserQustion ( username, callback ) {

        let data = {
            "username": username
        };

        $.ajax( {
            url: globalUrl.httpServerUrl.password,
            method: "POST",
            data: JSON.stringify( data ),
            contentType: "application/json",
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    $.alert( {
                        title: '提示',
                        text : res["errmsg"],
                    } );

                    return callback( true, null );
                }

                return callback( null, res.question );

            },
            error: function ( err ) {
                console.log( JSON.stringify( err ) );
                $.alert( {
                    title: '提示',
                    text : "返回" + err.status + "信息为:" + err.responseText,
                } );
                return callback( true, null );

            }
        } )

    }

    /*
    * @params1 [Object] 新密码
        * {
                "username": "ouzhenxi",
                "answer"  : "8月3日",
                "password": "123456",
                "repwd"   : "123456"
            };
       @params2: [Function] 回调函数
    * */
    function putUserPassword ( newPasswordInfo, callback ) {

        let data = newPasswordInfo;
        $.ajax( {
            url: globalUrl.httpServerUrl.password,
            method: "PUT",
            data: JSON.stringify( data ),
            contentType: "application/json",
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    $.alert( {
                        title: '提示',
                        text : res["errmsg"],
                    } );

                    return callback( true, null );
                }

                return callback( null, true );

            },
            error: function ( err ) {
                console.log( JSON.stringify( err ) );
                $.alert( {
                    title: '提示',
                    text : "返回" + err.status + "信息为:" + err.responseText,
                } );
                return callback( true, null );

            }
        } )

    }

} )
