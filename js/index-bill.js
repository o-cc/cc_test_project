
$( function () {
    //这个是长按触发事件 事件的定义应该在数据添加之后
    var timeOutEvent = null;
    $( ".bill_item" ).on( {
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


    billModule.getAllBillAccount()
        .then( res =>{
            //所有的账户的数组，需要显示所有的账户的info?
            if( res.length <= 0 ) {
                return;
            }

            res.forEach( ( value, key ) => {
                /*
                *  {
                      "add_time": "2019-02-25 14:53:24",  # 添加时间
                      "account_id": "123456789123456781",   # 账户id
                      "name": "中国银行",  # 银行名称
                      "remarks": "wwfwef",  # 备注
                      "total_money": 6000  # 余额
                    },
                * */
                if( key < 5 ) {
                    //请求获得到收入和支出的
                    billModule.getBillAccountById( value[ "account_id" ] )
                        .then( res => {
                            /*
                            * {
                                  "errmsg": "请求成功",
                                  "errno": "0",
                                  "records": [
                                    {
                                      "id": 2,
                                      "money": 600,
                                      "remarks": "",
                                      "type": "收入"
                                    }
                                  ]
                                }
                            * */

                        })
                        .catch( err => {
                            loger( err );

                        })
                }

                //显示所有的账户
                let str = `
                            <div class="bill_account_item">
                                <div class="bill_item_center">
                                    <p><span style="font-size: 2rem">中国银行</span></p>
                                    <p class="account_id">
                                        <span>账户:</span>
                                        <span>12312312312312321</span>
                                    </p>
                                    <p><span style="color: #ccc">我是备注</span></p>
                                    <p><span style="font-size: 2rem; color: #4fd2c2;">0.00</span></p>
                                </div>
                            </div>
                            `;

                $( ".bill_account_items" ).append( str );

            })

        })
        .catch( err => {

        })
    //这个是点击nav切换class
    $( ".nav_flag" ).eq(0).click( function () {
        $(this).addClass("weui_bar__item_on").siblings("div").eq(0).removeClass("weui_bar__item_on");
    });

    $( ".nav_flag" ).eq(1).click( function () {
        $(this).addClass("weui_bar__item_on").siblings("div").eq(0).removeClass("weui_bar__item_on");
    });

    //应该是一个action
    $( ".bill_add" ).click( function () {

        $.actions( {
            actions:
                [
                    {
                        text     : "我的账户",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "bill_account" );
                        }
                    },
                    {
                        text     : "添加收入",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "bill_input" );
                        }
                    },
                    {
                        text     : "添加支出",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            GoHashUrl( "bill_output" );
                        }
                    }
                ]
        } );
    } )

    $( ".my_account" ).click( function () {
        let self = this;
        //获取到所有账户。
        $.actions( {
            actions:
                [
                    {
                        text     : "我的账户",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            $(self).val( this.text );
                        }
                    },
                    {
                        text     : "添加收入",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            $(self).val( this.text );

                        }
                    },
                    {
                        text     : "添加支出",
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            $(self).val( this.text );

                        }
                    }
                ]
        } );
    } )

    $("#bill_type").click( function () {
        let self = this;
        $.actions({
            actions: [
                {
                    text: "个人日常消费",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );
                    }
                },
                {
                    text: "装修",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "旅游",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "教育",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "医疗",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                },
                {
                    text: "散布爱心",
                    onClick: function() {
                        //do something
                        $(self).val( this.text );

                    }
                }
            ]
        });

    })

} )
