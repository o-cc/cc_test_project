
const billModule = {
    billAccountIncache : "",
};
const noteModule = {
    noteInfoIncache : ""
};
const memoModule = {
    memoInfoIncache : ""
};
const planModule = {
    planInfoIncache : ""
};

function loger( txt ) {
    $.alert( {
        title: '提示',
        text : txt,
    } );
};


function GoHashUrl( hashValue ) {
    window.location.href = "#" + hashValue;
};
/*
* {
      "errmsg": "请求成功",
      "errno": "0",
      "memos": [
        {
          "addtime": "2019-02-19 22:52:24",  # 备忘录添加时间
          "content": "人那个in仍而给您热ingi仍in日恩",
          "id": 2,
          "title": "哇哈哈"
        },
        {
          "addtime": "2019-02-20 09:36:37",  # 备忘录添加时间
          "content": "人那个in仍而给您热ingi仍in日恩",
          "id": 3,
          "title": "哇哈哈"
        }
      ]
    }
* */
/*
* callback( err, memos )
*
* return 一个备忘录数组
* */
memoModule.getAllMemoInfo = function ( callback ) {
    $.ajax( {
        url: globalUrl.httpServerUrl.memo,
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },

        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            memoModule.memoInfoIncache = res[ "memo" ];
            return callback( null, res[ "memo" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* {
  "errmsg": "请求成功",
  "errno": "0",
  "memo": {
    "addtime": "2019-02-19 22:52:24",
    "content": "人那个in仍而给您热ingi仍in日恩",
    "id": 2,
    "title": "哇哈哈"
  }
}
@param1 memoId，备忘录id [String]
@param2 callback，回调函数 [ Function]
* */
memoModule.getMemoInfoById = function ( memoId, callback ) {
    $.ajax( {
        url: globalUrl.httpServerUrl.memo + memoId + "/",
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },

        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "memo" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 memoId [String] 备忘录id
* param2 changeData [Object] 修改数据
* param3 callback [Function] 回调函数
* */
memoModule.putMemoInfoById = function ( memoId, changeData, callback ) {

    if( !changeData.title || !changeData.content ) {
        return callback( "参数传递错误" + JSON.stringify(changeData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.memo + memoId + "/",
        method: "PUT",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( changeData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, true );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 memoData [Object] 添加备忘录内容
{
    "title":"哇哈哈",  # 备忘录标题  必须参数
    "content":"人那个in仍而给您热ingi仍in日恩"  # 备忘录内容 必须参数
    "is_warn": true  # 可选参数 为boolen类型
    "warn_time": "2018-5-12 08:15:30"  # 提醒时间  必须为DateTime类型  可选参数 在is_warn为true的时候为必须参数
}
* param2 callback [Function] 回调函数
* */
memoModule.postMemoInfo = function ( changeData, callback ) {

    if( !changeData.title || !changeData.content ) {
        return callback( "参数传递错误" + JSON.stringify(changeData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.memo,
        method: "POST",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( changeData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};

/*
* param1 memoId [Object] 备忘录id
* param2 callback [Function] 回调函数
* */
memoModule.delteMemoInfoById = function ( memoId, callback ) {

    if( !memoId ) {
        return callback( "不存在备忘录id",null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.memo + memoId + "/",
        method: "DELETE",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {
            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};

billModule.getAllBillIncomeInfo = function ( accountId ) {

    let pre = new Promise( (resolve, reject) => {

        $.ajax( {
            url: globalUrl.httpServerUrl.income + accountId + "/",
            method: "GET",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },

            success: function ( res ) {
                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                return resolve( res[ "records" ] );

            },
            error: function ( err ) {

                return reject( "返回" + err.status + "信息为:" + err.responseText, null );
            }

        } )


    });

    return pre;

};


/*
* param1 noteData [Object] 添加备忘录内容
{
    "title":"哇efwef侮辱人格我哈",  # 必须参数
    "content":"人那个iwgwrgr问过我如果n日恩"  # 必须参数
}
* param2 callback [Function] 回调函数
* */
noteModule.postNoteInfo = function ( noteData, callback ) {

    if( !noteData.title || !noteData.content ) {
        return callback( "参数传递错误" + JSON.stringify(noteData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.note,
        method: "POST",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( noteData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};

/*
* callback( err, note_list )
*
* return 一个noteArr数组
* */
noteModule.getAllNoteInfo = function ( callback ) {

    $.ajax( {
        url: globalUrl.httpServerUrl.note,
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            noteModule.noteInfoIncache = res[ "notes_list" ];
            return callback( null, res[ "notes_list" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )


};


/*
* {
  "errmsg": "请求成功",
  "errno": "0",
  "notes": {
    "addtime": "2019-02-20 14:43:26",
    "content": "人那个in仍而给您热ingi仍in日恩",
    "id": 2,
    "title": "哇哈哈"
  }
}
@param1 noteId [String]
@param2 callback，回调函数 [ Function]
* */
noteModule.getNoteInfoById = function ( noteId, callback ) {
    $.ajax( {
        url: globalUrl.httpServerUrl.note + noteId + "/",
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },

        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "notes" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 noteId [String] 笔记本id
* param2 changeData [Object] 修改数据
* param3 callback [Function] 回调函数
* */
noteModule.putNoteInfoById = function ( noteId, changeData, callback ) {

    if( !changeData.title || !changeData.content ) {
        return callback( "参数传递错误" + JSON.stringify(changeData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.note + noteId + "/",
        method: "PUT",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( changeData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 noteId [Object] 笔记本id
* param2 callback [Function] 回调函数
* */
noteModule.delteNoteInfoById = function ( noteId, callback ) {

    if( !noteId ) {
        return callback( "不存在备忘录id",null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.memo + noteId + "/",
        method: "DELETE",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {
            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};


/*
* param1 planData [Object] 添加备忘录内容
{
    "content": "wefgwefwe",  # 必须
    "is_finish": false,  # 必须 布尔类型
    "warn_time": "2019-3-1 12:50:00"  # 必须
}
* param2 callback [Function] 回调函数
* */
planModule.postPlanInfo = function ( planData, callback ) {

    if( !planData.content || !planData.warn_time ) {
        return callback( "参数传递错误" + JSON.stringify(planData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.plan,
        method: "POST",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( planData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};

/*
* callback( err, planList )
*
* return 一个noteArr数组
* */
planModule.getAllPlanInfo = function ( callback ) {

    $.ajax( {
        url: globalUrl.httpServerUrl.plan,
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            planModule.planInfoIncache = res[ "schedules" ];
            return callback( null, res[ "schedules" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )


};


/*
* {
  "errmsg": "请求成功",
  "errno": "0",
  "notes": {
    "addtime": "2019-02-20 14:43:26",
    "content": "人那个in仍而给您热ingi仍in日恩",
    "id": 2,
    "title": "哇哈哈"
  }
}
@param1 planId [String]
@param2 callback，回调函数 [ Function]
* */
planModule.getPlanInfoById = function ( planId, callback ) {
    $.ajax( {
        url: globalUrl.httpServerUrl.plan + planId + "/",
        method: "GET",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },

        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "schedule" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 planId [String] 计划id
* param2 changeData [Object] 修改数据
* param3 callback [Function] 回调函数
* */
planModule.putPlanInfoById = function ( planId, changeData, callback ) {

    if( !changeData.title || !changeData.content ) {
        return callback( "参数传递错误" + JSON.stringify(changeData), null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.plan + planId + "/",
        method: "PUT",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        data: JSON.stringify( changeData ),
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {

            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }

    } )

};

/*
* param1 planId [Object] 计划id
* param2 callback [Function] 回调函数
* */
planModule.deltePlanInfoById = function ( planId, callback ) {

    if( !planId ) {
        return callback( "不存在备忘录id",null );
    }

    $.ajax( {
        url: globalUrl.httpServerUrl.plan + planId + "/",
        method: "DELETE",
        headers: {
            "Authorization" : window.localStorage.getItem("token")
        },
        success: function ( res ) {
            if( res.errno !== "0" ) {
                return callback( res[ "errmsg" ], null );
            }
            return callback( null, res[ "errmsg" ] );

        },
        error: function ( err ) {
            return callback( "返回" + err.status + "信息为:" + err.responseText, null );
        }
    } )

};



/*添加账户
* param1 accountData [Object] 账户数据
    * {
        "account_id": "123456789123456781",  # 账户 必须
        "name": "中国银行",  # 银行名称 必须
        "total_money": 6000,  # 余额 必须
        "remarks": "wwfwef"  # 备注 非必须
    }*
* */
billModule.postBillAccount = function ( accountData ) {

    let pre = new Promise( (resolve, reject ) => {

        if( !accountData[ "account_id" ] || !accountData[ "name" ] || !accountData[ "total_money" ] ) {

            return reject( "参数有误: "+ JSON.stringify( accountData ) );
        }

        $.ajax( {
            url: globalUrl.httpServerUrl.accounts,
            method: "POST",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },
            data: JSON.stringify( accountData ),
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                return resolve( res[ "errmsg" ] );

            },
            error: function ( err ) {
                return reject( "返回" + err.status + "信息为:" + err.responseText );
            }
        } )
    });

    return pre;
};

/* 查询账户列表
* */
billModule.getAllBillAccount = function () {

    let pre = new Promise( (resolve, reject ) => {

        $.ajax( {
            url: globalUrl.httpServerUrl.accounts,
            method: "GET",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                billModule.billAccountIncache = res[ "accounts" ];
                return resolve( res[ "accounts" ] );

            },
            error: function ( err ) {
                return reject( "返回" + err.status + "信息为:" + err.responseText );
            }
        } )
    });

    return pre;
};

/*查询某个账户信息
* param1 accountId [String] 账户Id
* */
billModule.getBillAccountById = function ( accountId ) {

    let pre = new Promise( (resolve, reject ) => {

        if( !accountId ) {
            return reject( "不存在accountId : "+ accountId );
        }

        $.ajax( {
            url: globalUrl.httpServerUrl.accounts + accountId +"/",
            method: "GET",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                return resolve( res[ "account" ] );

            },
            error: function ( err ) {
                return reject( "返回" + err.status + "信息为:" + err.responseText );
            }
        } )
    });

    return pre;
};


/*修改某个账户信息
* param1 accountData [ Object ] 账户修改的数据
* */
billModule.putBillAccountById = function ( accountData ) {

    let pre = new Promise( (resolve, reject ) => {

        if( !accountData[ "account_id" ] || !accountData[ "name" ] || !accountData[ "total_money" ] ) {

            return reject( "参数有误: "+ JSON.stringify( accountData ) );
        }

        $.ajax( {
            url: globalUrl.httpServerUrl.accounts + accountData[ "account_id" ] + "/",
            method: "PUT",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },
            data: JSON.stringify( accountData ),
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                return resolve( res[ "errmsg" ] );

            },
            error: function ( err ) {
                return reject( "返回" + err.status + "信息为:" + err.responseText );
            }
        } )
    });

    return pre;
};

/*修改某个账户信息
* param1 accountId [ String ] 账户Id
* */
billModule.deleteBillAccountById = function ( accountId ) {

    let pre = new Promise( (resolve, reject ) => {

        if( !accountId ) {

            return reject( "参数有误: "+ accountId );
        }

        $.ajax( {
            url: globalUrl.httpServerUrl.accounts + accountId + "/",
            method: "DELETE",
            headers: {
                "Authorization" : window.localStorage.getItem("token")
            },
            success: function ( res ) {

                if( res.errno !== "0" ) {
                    return reject( res[ "errmsg" ] );
                }
                return resolve( res[ "errmsg" ] );

            },
            error: function ( err ) {
                return reject( "返回" + err.status + "信息为:" + err.responseText );
            }
        } )
    });

    return pre;
};
