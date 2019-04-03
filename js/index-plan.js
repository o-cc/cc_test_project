function planModuleFile () {

    let choseDay = new Date();
    (function () {
        $( "#date" ).calendar({

            onChange ( p, value, displayValue ) {
                //console.log( p, value, displayValue );
                //console.log( value );

                let thisDayStr = value[0];
                //全局表示选择的日期
                let thisDay    = new Date( thisDayStr );

                let planInfoIncache = planModule.planInfoIncache;
                planInfoIncache     = planInfoIncache ? planInfoIncache : " ";
                let len             = planInfoIncache.length;

                let str = "";
                try {

                    for ( let i = 0; i < len; i++ ) {

                        let element   = planInfoIncache[ i ];
                        let content   = element[ "content" ];
                        let wranDay   = new Date( element[ "warn_time" ] );
                        let planId    = element[ "id" ];
                        let is_finish = element[ "is_finish" ] ? "checked" : "";
                        //判断是否是今天的日期
                        if ( wranDay.getFullYear() === thisDay.getFullYear()
                            &&
                            wranDay.getMonth() === thisDay.getMonth()
                            &&
                            wranDay.getDate() === thisDay.getDate()
                        ) {

                            str += ` <label class="weui-cell weui-check__label" for=` + planId + `>
                                    <div class="weui-cell__hd">
                                        <input type="checkbox" name="checkbox1" ` + is_finish + ` data-time=` + element[ "warn_time" ] + ` class="weui-check plan_item" id=` + planId + `>
                                        <i class="weui-icon-checked"></i>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p>
                                            <span>` + content + `</span>
                                        <span class="item_time">` + wranDay.getHours() + `:` + wranDay.getMinutes() + `</span>
                                        </p>
                                    </div>
                                </label>`;
                        }
                    }

                    $( ".plan_items" ).html( str );
                    planItemClick();

                } catch ( e ) {
                    console.log( e );
                }

            }

        });

        //定义计数器 控制上一页什么时候不能上翻
        //var boo = 0;

        //获取当天  这个是服务器的时间最为准确  服务器的时间，当前发起的时间，
        let nowDate = new Date();

        let date = formatDate( nowDate );
        $( ".today" ).html( date );

        let year      = nowDate.getFullYear();
        //本月
        let thisMonth = getWeek( nowDate, 0 ).month;

        let monthDays = getMonthdays( year, thisMonth );
        let nextMonth = nowDate.getMonth() + 2;
        let today     = nowDate.getDate();

        //获取下个月的1号
        let dateTemp = new Date();
        dateTemp.setDate( 1 );
        dateTemp.setMonth( nextMonth );

        //显示本周日期  这里的性能应该可以优化
        for ( let i = 0; i < $( "#weekNum>span" ).length; i++ ) {

            if ( $( "#weekNum>span" ).eq( i ).attr( "data" ) === nowDate.getDay().toString() ) {
                //和日历的周几对应,并给默认颜色
                $( "#dateNum>span" ).eq( i ).attr( "month", thisMonth ).html( nowDate.getDate() )
                    .css( "color", "#00ac2f" );

                //动态形成前几天的日期
                let prevAllDay = $( "#dateNum>span" ).eq( i ).prevAll();
                for ( let j = 0; j < prevAllDay.length; j++ ) {
                    //从今天的日期 减----
                    if ( today <= 1 ) {
                        today = getMonthdays( year, thisMonth ) + 1; //下边today--
                    }

                    if ( today > 1 ) {
                        today--;
                        prevAllDay.eq( j ).html( today );
                    }

                }

                //动态形成后几天的日期
                let nextAllDay = $( "#dateNum>span" ).eq( i ).nextAll();
                let fristDay   = 1;
                for ( let j = 0; j < nextAllDay.length; j++ ) {
                    if ( nowDate.getDate() + (j + 1) <= monthDays ) {
                        nextAllDay.eq( j ).html( nowDate.getDate() + (j + 1) );
                    }

                    //如果超过了这个月最后一天，从1开始 更新下个月的天数
                    if ( nowDate.getDate() + (j + 1) > monthDays ) {
                        monthDays = getMonthdays( year, nextMonth );
                        nextAllDay.eq( j ).html( fristDay++ );
                    }
                }
            }
        }

        //给绑定月份属性
        bindMonthForWeekDay( thisMonth, $( "#dateNum>span" ), monthDays );

        /*只需要显示本周的日期就好了 不用麻烦
        $( ".rightBtn" ).click( function () {
            //计数器++
            boo++;

            let weekLastDay = $( "#dateNum > span" ).eq( $( "#weekNum > span" ).length - 1 ).html();
            weekLastDay     = parseInt( weekLastDay );

            for ( let i = 0; i < $( "#weekNum > span" ).length; i++ ) {
                let weekDayHtml = $( "#dateNum > span" ).eq( i ).html();
                weekDayHtml     = parseInt( weekDayHtml );

                if ( weekDayHtml >= monthDays ) {
                    thisMonth++;
                    let nextMonthDays = getMonthdays( year, thisMonth );
                    monthDays         = nextMonthDays;

                }

                //说明要进入下个月的日期
                if ( weekLastDay >= monthDays ) {
                    weekLastDay = 0;

                }

                //当前的日期大于这个月的天数  上月的31号  大于下个月的30号
                weekLastDay++;
                $( "#dateNum > span" ).eq( i ).html( weekLastDay );

                if ( thisMonth > 12 ) {
                    thisMonth = 1;
                    year      = year + 1;
                }
            }

            //给每个日期绑定一个month属性
            bindMonthForWeekDay( thisMonth, $( "#dateNum>span" ), monthDays );

        } );

        $( ".leftBtn" ).click( function () {

            if( boo > 0 ){

                boo--;

                let weekFirstDay = $( "#dateNum > span" ).eq( 0 ).html();
                weekFirstDay     = parseInt( weekFirstDay );
                //从最后一个开始赋值
                for ( let i = $( "#weekNum > span" ).length - 1; i >= 0; i-- ) {

                    let weekDayHtml = $( "#dateNum > span" ).eq( i ).html();
                    weekDayHtml     = parseInt( weekDayHtml );

                    if ( weekFirstDay <= 1 ) {
                        thisMonth--;
                        let prevMonthDays = getMonthdays( year, thisMonth );
                        monthDays         = prevMonthDays;

                    }

                    if ( thisMonth <= 0 ) {
                        thisMonth = 12;
                        year      = year - 1;
                    }

                    if ( weekFirstDay <= monthDays ) {
                        if ( weekFirstDay <= 1 ) {
                            weekFirstDay = getMonthdays( year, thisMonth );
                            $( "#dateNum > span" ).eq( i ).html( weekFirstDay );
                            continue;
                        }

                        weekFirstDay--;
                        $( "#dateNum > span" ).eq( i ).html( weekFirstDay );
                        continue;
                    }
                }

                //给每个日期绑定一个month属性
                bindMonthForWeekDay( thisMonth, $( "#dateNum>span" ), monthDays );

            }

        } );
        */
        //选择日期
        $( "#dateNum>span" ).click( function () {

            $( this ).css( "color", "#00ac2f" ).siblings().css( "color", "#000" );
            //year 有个bug 如果这周是2018年最后一周，获取到的年份却是2019年

            let thisDayStr = year + "-" +$(this).attr("month") +"-" + $(this).html();
            //全局表示选择的日期
            choseDay       = thisDayStr;
            let thisDay    = new Date(thisDayStr);

            let planInfoIncache = planModule.planInfoIncache;
            planInfoIncache     = planInfoIncache?planInfoIncache:" ";
            let len             = planInfoIncache.length;

            let str = "";
            try {

                for ( let i = 0; i < len; i++ ) {

                    let element = planInfoIncache[i];
                    let content = element[ "content" ];
                    let wranDay = new Date( element[ "warn_time" ] );
                    let planId  = element[ "id" ];
                    let is_finish  = element[ "is_finish" ]?"checked":"";
                    //判断是否是今天的日期
                    if( wranDay.getFullYear() === thisDay.getFullYear()
                        &&
                        wranDay.getMonth() === thisDay.getMonth()
                        &&
                        wranDay.getDate() === thisDay.getDate()
                    ) {

                        str += ` <label class="weui-cell weui-check__label" for=`+planId+`>
                                    <div class="weui-cell__hd">
                                        <input type="checkbox" name="checkbox1" `+is_finish+` data-time=`+element["warn_time"]+` class="weui-check plan_item" id=`+planId+`>
                                        <i class="weui-icon-checked"></i>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p>
                                            <span>` +content+ `</span>
                                        <span class="item_time">`+ wranDay.getHours() +`:`+wranDay.getMinutes() +`</span>
                                        </p>
                                    </div>
                                </label>`;
                    }
                }

                $( ".plan_items" ).html( str );
                planItemClick();

            }catch ( e ) {
                console.log( e );
            }

        } );

        //默认加载今天的计划
        ( function () {

            let thisDay         = new Date();
            let planInfoIncache = planModule.planInfoIncache;
            planInfoIncache     = planInfoIncache?planInfoIncache:" ";
            let len             = planInfoIncache.length;

            let str = "";
            try {
                //console.log( planInfoIncache );
                for ( let i = 0; i < len; i++ ) {

                    let element = planInfoIncache[i];
                    let content = element[ "content" ];
                    let wranDay = new Date( element[ "warn_time" ] );
                    let planId  = element[ "id" ];
                    let is_finish  = element[ "is_finish" ]?"checked":"";
                    //判断是否是今天的日期
                    if( wranDay.getFullYear() === thisDay.getFullYear()
                        &&
                        wranDay.getMonth() === thisDay.getMonth()
                        &&
                        wranDay.getDate() === thisDay.getDate()
                    ) {

                        str += `
                                   <label class="weui-cell weui-check__label" for=`+planId+`>
                                        <div class="weui-cell__hd">
                                            <input type="checkbox" name="checkbox1" `+is_finish+` data-time=`+element[ "warn_time" ]+` class="weui-check plan_item" id=`+planId+`>
                                            <i class="weui-icon-checked"></i>
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p>
                                                <span>` +content+ `</span>
                                            <span class="item_time">`+ wranDay.getHours() +`:`+wranDay.getMinutes() +`</span>
                                            </p>
                    
                                        </div>
                                    </label>
                                    `;

                    }

                }

                $( ".plan_items" ).html( str );
                planItemClick();


            }catch ( e ) {
                console.log( e );
            }

        })()


        /*给每一周日期绑定对应的月份属性
        * param1 { Number } thisMonth
        * param2 { array }  html数组，这里是每个日期span
        * param3 { Number } 月份的总天数
        * */
        function bindMonthForWeekDay( thisMonth, spanArr, monthDays ) {
            let mon = thisMonth;

            for ( let i = 0; i < spanArr.length; i++ ) {

                if ( Number( spanArr.eq( i ).html() ) === monthDays ) {

                    //这个月的最后一天是这个月的 特殊处理
                    spanArr.eq( i ).attr( "month", mon );

                    mon++;
                    if ( mon > 12 ) {
                        mon = 1;
                    }
                    //给每一个span绑定月份
                    for ( let j = 0; j < spanArr.eq( i ).nextAll().length; j++ ) {

                        spanArr.eq( i ).nextAll().eq( j ).attr( "month", mon );
                    }
                    return;
                }

                spanArr.eq( i ).attr( "month", mon );
            }
        };

        function getMonthdays( year, month ) {

            let now      = new Date( year, month, 0 );
            let dayCount = now.getDate();
            return dayCount;
        };

        function formatDate( date ) {

            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let week  = date.getDay();
            switch ( week ) {
                case 0:
                    week = "星期日";
                    break;
                case 1:
                    week = "星期一";
                    break;
                case 2:
                    week = "星期二";
                    break;
                case 3:
                    week = "星期三";
                    break;
                case 4:
                    week = "星期四";
                    break;
                case 5:
                    week = "星期五";
                    break;
                case 6:
                    week = "星期六";
                    break;
                default:
                    week = "未知";
                    break;
            }
            let str = "今天是" + year + "年" + month + "月" + day + "日" + week + "";

            return str;

        };

        function getWeek( date, weekDay ) {

            //当今天是星期天的时候，获取到的是下周的
            let getWeek  = {};
            let firstDay = null;

            if ( Number( date.getDay() ) === 0 ) {
                firstDay = new Date( date - (date.getDay() + 6) * 86400000 );
            }

            if ( Number( date.getDay() ) !== 0 ) {
                firstDay = new Date( date - (date.getDay() - 1) * 86400000 );
            }

            firstDay.setDate( firstDay.getDate() + weekDay );
            let mon       = Number( firstDay.getMonth() ) + 1;
            getWeek.year  = firstDay.getFullYear();
            getWeek.month = mon;
            getWeek.date  = firstDay.getDate();
            return getWeek;
        };

    })()

    let choseDate = "";
    let date      = new Date();
    let str       = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    $( ".plan_end-datetime-picker" ).datetimePicker( {
        min    : str,
        max    : (date.getFullYear() + 1) + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        onClose: function ( picker ) {
            //2019-03-01-10-45
            let value    = picker.value.join( ":" );
            let newValue = value.replace( /[:]/, "-" ).replace( /[:]/, "-" ).replace( /[:]/, " " );
            let date     = new Date( newValue );
            //设置全局选择的时间 post
            choseDate    = newValue;
            let nowDate  = new Date();
            if ( nowDate > date ) {
                $( ".plan_end-datetime-picker" ).val( "" );
                return;
            }

            let min   = (date - nowDate) / 1000 / 60;
            let hours = min / 60;
            let day   = Math.floor( hours / 24 );
            min       = Math.ceil( min > 60 ? (Math.ceil( min / 60 ) - (min / 60)) * 60 : min ) + "分";
            hours     = Math.floor( hours > 24 ? (Math.ceil( hours / 24 ) - (hours / 24)) * 24 : hours ) + "时";
            day       = (day > 1 ? day + "天" : " ");
            $( ".plan_end-datetime-picker" ).val( day + hours + min + "后响铃" );
        }
    } );

    $( ".save_plan_btn" ).click( function () {

        if( $(".plan_title").val().length < 1 ) {
            loger( "请输入计划" );
            return;
        }

        if( !choseDate ) {
            loger( "请选择时间" );
            return;
        }

        let data = {
            "content"  : $( ".plan_title" ).val(),
            "is_finish": $( ".is_finish" ).prop( "checked" ),
            "warn_time": choseDate + ":00"
        };
        planModule.postPlanInfo( data, function ( err, res ) {

            if( err ) {
                loger( err );
                return;
            }
            loger( res );
            //完了之后需要重新更新一个下module_incache,并且更新当天的计划
            planModule.getAllPlanInfo()
                .then( res => {

                //我得知道今天是第几天 又要设置一个全局变量？
                let thisDay         = new Date( choseDay );
                let planInfoIncache = planModule.planInfoIncache;
                planInfoIncache     = planInfoIncache?planInfoIncache:" ";
                let len             = planInfoIncache.length;

                let str = "";
                try {

                    for ( let i = 0; i < len; i++ ) {

                        let element = planInfoIncache[i];
                        let content = element[ "content" ];
                        let wranDay = new Date( element[ "warn_time" ] );
                        let planId  = element[ "id" ];
                        //判断是否是今天的日期
                        if( wranDay.getFullYear() === thisDay.getFullYear()
                            &&
                            wranDay.getMonth() === thisDay.getMonth()
                            &&
                            wranDay.getDate() === thisDay.getDate()
                        ) {

                            str += `
                                   <label class="weui-cell weui-check__label" for=`+planId+`>
                                        <div class="weui-cell__hd">
                                            <input type="checkbox" name="checkbox1" class="weui-check plan_item" id=`+planId+`>
                                            <i class="weui-icon-checked"></i>
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p>
                                                <span>` +content+ `</span>
                                            <span class="item_time">`+ wranDay.getHours() +`:`+wranDay.getMinutes() +`</span>
                                            </p>
                                        </div>
                                    </label>
                                    `;

                        }

                    }

                    $( ".plan_items" ).html( str );
                    planItemClick();


                }catch ( e ) {
                    console.log( e );
                }


            } )
            GoHashUrl( "node_input" );

        } )

    } )

    function planItemClick () {

        $( ".plan_item" ).click( function () {
            let self = this;
            if ( $( self ).prop( "checked" ) ) {
                $.confirm( {
                    title   : '提示',
                    text    : '完成计划啦？',
                    onOK    : function () {
                        //点击确认
                        let data = {
                            "content"  : $( self ).val(),
                            "is_finish": $( self ).prop( "checked" ),
                            "warn_time": $( self ).attr( "data-time" ) + " 00:00:00"
                        };
                        planModule.putPlanInfoById( $( self ).attr( "id" ), data, function ( err, res ) {
                            if( err ) {
                                loger( err );
                                $( self ).prop( "checked", "checked" );
                                return;
                            }

                            loger( res );
                        })
                    },
                    onCancel: function () {
                        $( self ).prop( "checked", false );
                    }
                } );
                return;
            }

            $.confirm( {
                title   : '提示',
                text    : '要修改状态吗？',
                onOK    : function () {
                    //点击确认修改状态
                    let data = {
                        "content"  : $( self ).val(),
                        "is_finish": $( self ).prop( "checked" ),
                        "warn_time": $( self ).attr( "data-time" ) + " 00:00:00"
                    };
                    //console.log( $( self ).attr( "data-time" ) );
                    planModule.putPlanInfoById( $( self ).attr( "id" ), data, function ( err, res ) {
                        if( err ) {
                            loger( err );
                            $( self ).prop( "checked", "checked" );
                            return;
                        }

                        loger( res );
                    })
                },
                onCancel: function () {
                    $( self ).prop( "checked", "checked" );
                }
            } );
        } )

    }


};

export { planModuleFile }