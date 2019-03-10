$( function () {

    (function () {
        $("#date").calendar();
        //全部按钮
        $( ".show_all_date" ).click( function () {

        } );

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

            if ( $( "#weekNum>span" ).eq( i ).attr( "data" ) === nowDate.getDay().toString() )
            {
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

        //只需要显示本周的日期就好了 不用麻烦
        //$( ".rightBtn" ).click( function () {
        //    //计数器++
        //    boo++;
        //
        //    let weekLastDay = $( "#dateNum > span" ).eq( $( "#weekNum > span" ).length - 1 ).html();
        //    weekLastDay     = parseInt( weekLastDay );
        //
        //    for ( let i = 0; i < $( "#weekNum > span" ).length; i++ ) {
        //        let weekDayHtml = $( "#dateNum > span" ).eq( i ).html();
        //        weekDayHtml     = parseInt( weekDayHtml );
        //
        //        if ( weekDayHtml >= monthDays ) {
        //            thisMonth++;
        //            let nextMonthDays = getMonthdays( year, thisMonth );
        //            monthDays         = nextMonthDays;
        //
        //        }
        //
        //        //说明要进入下个月的日期
        //        if ( weekLastDay >= monthDays ) {
        //            weekLastDay = 0;
        //
        //        }
        //
        //        //当前的日期大于这个月的天数  上月的31号  大于下个月的30号
        //        weekLastDay++;
        //        $( "#dateNum > span" ).eq( i ).html( weekLastDay );
        //
        //        if ( thisMonth > 12 ) {
        //            thisMonth = 1;
        //            year      = year + 1;
        //        }
        //    }
        //
        //    //给每个日期绑定一个month属性
        //    bindMonthForWeekDay( thisMonth, $( "#dateNum>span" ), monthDays );
        //
        //} );
        //
        //$( ".leftBtn" ).click( function () {
        //
        //    if( boo > 0 ){
        //
        //        boo--;
        //
        //        let weekFirstDay = $( "#dateNum > span" ).eq( 0 ).html();
        //        weekFirstDay     = parseInt( weekFirstDay );
        //        //从最后一个开始赋值
        //        for ( let i = $( "#weekNum > span" ).length - 1; i >= 0; i-- ) {
        //
        //            let weekDayHtml = $( "#dateNum > span" ).eq( i ).html();
        //            weekDayHtml     = parseInt( weekDayHtml );
        //
        //            if ( weekFirstDay <= 1 ) {
        //                thisMonth--;
        //                let prevMonthDays = getMonthdays( year, thisMonth );
        //                monthDays         = prevMonthDays;
        //
        //            }
        //
        //            if ( thisMonth <= 0 ) {
        //                thisMonth = 12;
        //                year      = year - 1;
        //            }
        //
        //            if ( weekFirstDay <= monthDays ) {
        //                if ( weekFirstDay <= 1 ) {
        //                    weekFirstDay = getMonthdays( year, thisMonth );
        //                    $( "#dateNum > span" ).eq( i ).html( weekFirstDay );
        //                    continue;
        //                }
        //
        //                weekFirstDay--;
        //                $( "#dateNum > span" ).eq( i ).html( weekFirstDay );
        //                continue;
        //            }
        //        }
        //
        //        //给每个日期绑定一个month属性
        //        bindMonthForWeekDay( thisMonth, $( "#dateNum>span" ), monthDays );
        //
        //    }
        //
        //} );


        //选择日期
        $( "#dateNum>span" ).click( function () {

            $( this ).css( "color", "#00ac2f" ).siblings().css( "color", "#000" );

        } );


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

    $(".plan_datetime-picker").picker({
        title: "请选择开始时间",
        cols: [
            {
                values: (function () {
                    var hours = [];
                    for (var i=0; i<24; i++){
                        if( i >= new Date().getHours() ) {
                            hours.push(i > 9 ? i : '0'+i);
                        }
                    }
                    return hours;
                })()
            },
            {
                divider: true,  // 这是一个分隔符
                content: '时'
            },
            {
                values: (function () {
                    var minutes = [];
                    for (var i=0; i<59; i++) {
                        if( i > new Date().getMinutes() ) {
                            minutes.push(i > 9 ? i : '0'+i);
                        }
                    }
                    return minutes;
                })()
            },
            {
                divider: true,  // 这是一个分隔符
                content: '分'
            }
        ],
        onClose : function( value ) {
            //value type is array
            $(".plan_datetime-picker").val( value.value.join(":") );
        }
    });

    $(".plan_end-datetime-picker").picker({
        title: "请选择结束时间",
        cols: [
            {
                values: (function () {
                    var hours = [];
                    for (var i=0; i<24; i++){
                        if( i >= new Date().getHours() ) {
                            hours.push(i > 9 ? i : '0'+i);
                        }
                    }
                    return hours;
                })()
            },
            {
                divider: true,  // 这是一个分隔符
                content: '时'
            },
            {
                values: (function () {
                    var minutes = [];
                    for (var i=0; i<59; i++) {
                        if( i > new Date().getMinutes() ) {
                            minutes.push(i > 9 ? i : '0'+i);
                        }
                    }
                    return minutes;
                })()
            },
            {
                divider: true,  // 这是一个分隔符
                content: '分'
            }
        ],
        onClose : function( value ) {
            //value type is array
            $(".plan_end-datetime-picker").val( value.value.join(":") );
        }
    });

    $(".plan_item").click( function () {
        let self = this;
        if( $(self).prop("checked") ) {
            $.confirm({
                title: '提示',
                text: '完成计划啦？',
                onOK: function () {
                    //点击确认
                },
                onCancel: function () {
                    $(self).attr("checked",false);
                }
            });
            return;
        }

        $.confirm({
            title: '提示',
            text: '要修改状态吗？',
            onOK: function () {
                //点击确认
            },
            onCancel: function () {
                $(self).attr("checked","checked");
            }
        });



    })

})