
function billModuleFile () {
    //这个是长按触发事件 事件的定义应该在数据添加之后
    function billItemEvent () {

        var timeOutEvent = null;
        $( ".bill_item" ).on( {
            touchstart: function ( e ) {
                // 长按事件触发
                timeOutEvent = setTimeout( function () {
                    timeOutEvent = 0;
                    console.log( '你长按了' );
                }, 500 );
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

    };

    //账户的长按时间
    let accountPutPostFlag = "post";
    function billAccountEvent () {

        var timeOutEvent = null;
        $( ".bill_account_item" ).on( {

            touchstart: function ( e ) {

                let self = this;
                // 长按事件触发
                timeOutEvent = setTimeout( function () {
                    timeOutEvent = 0;

                    //是否需要删除
                    $.confirm( {
                        title   : '提示',
                        text    : '确定删除该账户吗？',
                        onOK    : function () {
                            //点击确认
                            let accountId = $( self ).find( "p.account_id" ).children( "span" )
                                .eq( 1 ).html();
                            billModule.deleteBillAccountById( accountId )
                                .then( res => {

                                loger( res );
                                //删除dom
                                $( self ).remove();
                            })
                                .catch( err => {
                                    loger(err)

                                } )
                        }
                    } );

                }, 500 );
                //长按400毫秒
                // e.preventDefault();
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
                    //修改信息
                    accountPutPostFlag = "put";
                    //显示

                    let bankName = $( self ).find( ".bill_item_center" )
                        .children( "p" ).eq( 0 ).children( "span" ).eq(0).html();

                    let accountId = $( self ).find( "p.account_id" )
                        .children( "span" ).eq(1).html();

                    let remark = $( self ).find( ".bill_item_center" )
                        .children( "p" ).eq( 2 ).children( "span" ).eq(0).html();

                    let account_over = $( self ).find( ".bill_item_center" )
                        .children( "p" ).eq( 3 ).children( "span" ).eq(0).html();

                    $( ".account_name" ).val( accountId );
                    $( ".bank_name" ).val( bankName );
                    $( ".account_over" ).val( account_over );
                    $( ".account_remark" ).val( remark );

                    $( ".add_bill_account" ).removeClass( "hide" );

                }
                return false;
            }
        } )

    };

    billModule.getAllBillAccount()
        .then( res =>{
            //所有的账户的数组，需要显示所有的账户的info?
            if( res.length <= 0 ) {
                return;
            }
            res.forEach( ( value, key ) => {
                Promise.all([
                    billModule.getBillExpensesInfoByAccountId( value[ "account_id" ] ),
                    billModule.getBillIncomeInfoByAccountId( value[ "account_id" ] ) ])
                    .then( dataArr => {
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
                        dataArr[1].forEach( (value, key) => {
                          //默认写入收入信息
                            let str = `
                                    <div class="bill_item">
                                        <div class="item_content">
                                            <p>
                                                `+ value[ "remarks" ]+`
                                            </p>
                                        </div>
                                        <div class="item_dollar">
                                           ￥ `+ value[ "money" ]+`
                                        </div>
                                    </div>
                            `;
                            $( ".bill_content" ).append( str );

                        } )
                        billItemEvent();
                    })
                    .catch( err => {
                        loger( err );

                    })


                //显示所有的账户
                let str = `
                            <div class="bill_account_item">
                                <div class="bill_item_center">
                                    <p><span style="font-size: 2rem">`+value[ "name" ]+`</span></p>
                                    <p class="account_id">
                                        <span>账户id:</span>
                                        <span>`+value[ "account_id" ]+`</span>
                                    </p>
                                    <p><span style="color: #ccc">`+ value[ "remarks" ] +`</span></p>
                                    <p><span style="font-size: 2rem; color: #4fd2c2;"> `+ value[ "total_money" ] +` </span></p>
                                </div>
                            </div>
                            `;

                $( ".bill_account_items" ).append( str );
                billAccountEvent();
            })

            billItemEvent();

        })
        .catch( err => {
            loger( err );
        })
    //这个是点击nav切换class
    $( ".nav_flag" ).eq( 0 ).click( function () {

        $( this ).addClass( "weui_bar__item_on" ).siblings( "div" ).eq( 0 ).removeClass( "weui_bar__item_on" );
        let str = `
                <div class="add_plan">
                    <div class="weui-uploader__input-box add_btn">
                        <a class="bill_add" style="display:inline-block;width: 100%;height: 100%;"></a>
                    </div>
                </div>
                `;
        billModule.billIncomeInfoIncache.forEach( ( value, key ) => {
            //默认写入收入信息
            str += `<div class="bill_item">
                        <div class="item_title">
                            <h5> `+ value[ "type" ] +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                ` + value[ "remarks" ] + `
                            </p>
                        </div>
                        <div class="item_dollar">
                           ￥ ` + value[ "money" ] + `
                        </div>
                    </div>`;
        } )
        $( ".bill_content" ).html( str );
        billAdd();
        billItemEvent();

    } );

    $( ".nav_flag" ).eq( 1 ).click( function () {

        $(this).addClass("weui_bar__item_on").siblings("div").eq(0).removeClass("weui_bar__item_on");
        let str = `
                <div class="add_plan">
                    <div class="weui-uploader__input-box add_btn">
                        <a class="bill_add" style="display:inline-block;width: 100%;height: 100%;"></a>
                    </div>
                </div>
                `;
        billModule.billExpensesInfoIncache.forEach( ( value, key ) => {
            //默认写入收入信息
            str += `<div class="bill_item">
                        <div class="item_title">
                            <h5> `+ value[ "type" ] +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                ` + value[ "remarks" ] + `
                            </p>
                        </div>
                        <div class="item_dollar">
                           ￥ ` + value[ "money" ] + `
                        </div>
                    </div>`;
        } )
        $( ".bill_content" ).html( str );
        billItemEvent();
        billAdd();


    });

    //应该是一个action
    function billAdd() {
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
    }
    billAdd();

    $( ".my_account" ).click( function () {
        let self = this;
        //获取到所有账户。

        billModule.getAllBillAccount()
            .then( res =>{
                //所有的账户的数组，需要显示所有的账户的info?
                if( res.length <= 0 ) {
                    return;
                }
                let arr =[];
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
                    let temp = {
                        text     : value[ "account_id" ] + " " + value[ "name" ],
                        className: "alert_action",
                        onClick  : function () {
                            //do something
                            $(self).val( value[ "account_id" ] );
                        }
                    };
                    arr.push( temp );
                })

                $.actions( {
                    actions: arr
                } );


            })
            .catch( err => {
                loger( err );
            })


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

    });

    $("#output_type").click( function () {
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

    //添加收入
    $( ".add_bill_income" ).click( function () {

        if( !$( "#bill_type" ).val() || !$( ".income_account" ).val() || !$( ".income_num" ).val() ) {
            loger( "不允许存在空值" );
            return;
        }
        let incomeData = {
            "money": Number( $( ".income_num" ).val() ),
            "remarks": $( "#bill_type" ).val()
        };

        billModule.postBillIncome( $( ".income_account" ).val().trim(), incomeData )
            .then( res => {
                loger( res );
                //添加到首页上
                billModule.billAccountIncache.forEach( ( value ) => {

                    Promise.all([
                    //billModule.getBillExpensesInfoByAccountId( value[ "account_id" ] ),
                    billModule.getBillIncomeInfoByAccountId( value[ "account_id" ] ) ])
                    .then( dataArr => {
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
                        let str = `
                                <div class="add_plan">
                                    <div class="weui-uploader__input-box add_btn">
                                        <a class="bill_add" style="display:inline-block;width: 100%;height: 100%;"></a>
                                    </div>
                                </div>
                        `;

                        dataArr[0].forEach( (value, key) => {
                            //写入收入信息
                           str += `
                                    <div class="bill_item">
                                        <div class="item_content">
                                            <p>
                                                `+ value[ "remarks" ]+`
                                            </p>
                                        </div>
                                        <div class="item_dollar">
                                           ￥ `+ value[ "money" ]+`
                                        </div>
                                    </div>
                            `;

                        } )

                        $( ".bill_content" ).html( str );
                        //tab应该是打开了[收入]
                        $( ".income_nav" ).addClass( "weui_bar__item_on" ).siblings( "div" ).eq( 0 ).removeClass( "weui_bar__item_on" );

                        billModule.getAllBillAccount()
                            .then( res =>{
                                //所有的账户的数组，需要显示所有的账户的info?
                                if( res.length <= 0 ) {
                                    return;
                                }
                                let str = "";
                                res.forEach( ( value, key ) => {
                                    //显示所有的账户
                                    str += `
                                        <div class="bill_account_item">
                                            <div class="bill_item_center">
                                                <p><span style="font-size: 2rem">`+value[ "name" ]+`</span></p>
                                                <p class="account_id">
                                                    <span>账户id:</span>
                                                    <span>`+value[ "account_id" ]+`</span>
                                                </p>
                                                <p><span style="color: #ccc">`+ value[ "remarks" ] +`</span></p>
                                                <p><span style="font-size: 2rem; color: #4fd2c2;"> `+ value[ "total_money" ] +` </span></p>
                                            </div>
                                        </div>`;

                                })
                                $( ".bill_account_items" ).html( str );
                                billAccountEvent();
                                billItemEvent();
                                billAdd();
                            })
                            .catch( err => {
                                loger( err );
                            })

                    })
                    .catch( err => {
                        loger( err );

                    })
                })

            } )
            .catch( err => {
                loger( err );
            } )
    } );
    //添加支出
    $( ".save_bill_btn_out" ).click( function () {

        if( !$( "#output_type" ).val() || !$( ".output_account" ).val() || !$( ".output_num" ).val() ) {
            loger( "不允许存在空值" );
            return;
        }
        let outputData = {
            "money": Number( $( ".output_num" ).val() ),
            "remarks": $( "#output_type" ).val()
        };

        billModule.postBillOutput( $( ".output_account" ).val(), outputData )
            .then( res => {
                loger( res );
                //添加到首页上
                billModule.billAccountIncache.forEach( ( value ) => {
                    Promise.all([
                        billModule.getBillExpensesInfoByAccountId( value[ "account_id" ] )
                        //billModule.getBillIncomeInfoByAccountId( value[ "account_id" ] )
                        ])
                        .then( dataArr => {
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
                            let str = `
                                <div class="add_plan">
                                    <div class="weui-uploader__input-box add_btn">
                                        <a class="bill_add" style="display:inline-block;width: 100%;height: 100%;"></a>
                                    </div>
                                </div>
                        `;

                            dataArr[0].forEach( (value, key) => {
                                //写入收入信息
                                str += `
                                    <div class="bill_item">
                                        <div class="item_content">
                                            <p>
                                                `+ value[ "remarks" ]+`
                                            </p>
                                        </div>
                                        <div class="item_dollar">
                                           ￥ `+ value[ "money" ]+`
                                        </div>
                                    </div>
                            `;

                            } )

                            $( ".bill_content" ).html( str );
                            //tab应该是打开了[支出]
                            $( ".output_nav" ).addClass( "weui_bar__item_on" ).siblings( "div" ).eq( 0 ).removeClass( "weui_bar__item_on" );

                            billModule.getAllBillAccount()
                                .then( res =>{
                                    //所有的账户的数组，需要显示所有的账户的info?
                                    if( res.length <= 0 ) {
                                        return;
                                    }
                                    let str = "";
                                    res.forEach( ( value, key ) => {
                                        //显示所有的账户
                                        str += `
                                        <div class="bill_account_item">
                                            <div class="bill_item_center">
                                                <p><span style="font-size: 2rem">`+value[ "name" ]+`</span></p>
                                                <p class="account_id">
                                                    <span>账户id:</span>
                                                    <span>`+value[ "account_id" ]+`</span>
                                                </p>
                                                <p><span style="color: #ccc">`+ value[ "remarks" ] +`</span></p>
                                                <p><span style="font-size: 2rem; color: #4fd2c2;"> `+ value[ "total_money" ] +` </span></p>
                                            </div>
                                        </div>`;

                                    })
                                    $( ".bill_account_items" ).html( str );
                                    billAccountEvent();
                                    billItemEvent();
                                    billAdd();
                                })
                                .catch( err => {
                                    loger( err );
                                })
                        })
                        .catch( err => {
                            loger( err );

                        })
                })

            } )
            .catch( err => {
                loger( err );
            } )

    } );


    //添加账户模块
    $( ".save_bill_btn_accounts" ).click( function () {

        let data = {
            "account_id" : $( ".account_name" ).val(),
            "name"       : $( ".bank_name" ).val(),
            "total_money": $( ".account_over" ).val(),
            "remarks"    : $( ".account_remark" ).val()
        };
        if( !$( ".account_remark" ).val() ) {
            delete data[ "remarks" ];
        }

        if( accountPutPostFlag === "post" ) {
            billModule.postBillAccount( data )
                .then( res => {
                    loger(res);
                    //清空input

                    //新添加的数据需要写入
                    let str = `
                            <div class="bill_account_item">
                                <div class="bill_item_center">
                                    <p><span style="font-size: 2rem">`+ $( ".bank_name" ).val() +`</span></p>
                                    <p class="account_id">
                                        <span>账户:</span>
                                        <span>` +$( ".account_name" ).val()+ `</span>
                                    </p>
                                    <p><span style="color: #ccc">` +$( ".account_remark" ).val()+ `</span></p>
                                    <p><span style="font-size: 2rem; color: #4fd2c2;">`+$( ".account_over" ).val()+`</span></p>
                                </div>
                            </div>
                `;
                    $( ".bill_account_items" ).append( str );
                    billAccountEvent();
                    //隐藏

                    $( ".add_bill_account" ).addClass( "hide" );

                } )
                .catch( err => {
                    loger( err );
                } )

        }
        else {

            billModule.putBillAccountById( data )
                .then( res => {
                    loger(res);
                    //需要修改原始的数据哦
                    billModule.getAllBillAccount()
                        .then( res =>{
                            //所有的账户的数组，需要显示所有的账户的info?
                            if( res.length <= 0 ) {
                                return;
                            }
                            let str = "";
                            res.forEach( ( value, key ) => {

                                //显示所有的账户
                                str += `
                                        <div class="bill_account_item">
                                            <div class="bill_item_center">
                                                <p><span style="font-size: 2rem">`+value[ "name" ]+`</span></p>
                                                <p class="account_id">
                                                    <span>账户id:</span>
                                                    <span>`+value[ "account_id" ]+`</span>
                                                </p>
                                                <p><span style="color: #ccc">`+ value[ "remarks" ] +`</span></p>
                                                <p><span style="font-size: 2rem; color: #4fd2c2;"> `+ value[ "total_money" ] +` </span></p>
                                            </div>
                                        </div>
                                        `;
                            })
                            $( ".bill_account_items" ).html( str );
                            billAccountEvent();

                            billItemEvent();
                        })
                        .catch( err => {
                            loger( err );
                        })
                    $( ".add_bill_account" ).addClass( "hide" );

                } )
                .catch( err => {
                    loger( err );
                } )
        }
    } );

    $( ".cancel_bill_btn_accounts" ).click( function () {
        $( ".add_bill_account" ).addClass( "hide" );
    } );

    $( ".add_bill_btn_accounts" ).click( function () {
        $( ".account_name" ).val( "" );
        $( ".bank_name" ).val( "" );
        $( ".account_over" ).val( "" );
        $( ".account_remark" ).val( "" );

        accountPutPostFlag = "post";

        $( ".add_bill_account" ).removeClass( "hide" );
    } );
}

export { billModuleFile }
