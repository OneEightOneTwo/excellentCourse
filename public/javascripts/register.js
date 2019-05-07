$(() => {
    //用户名、密码、验证码开关
    $userisok = false;
    $pswisok = false;
    $codeisok = false;

    //注册的用户名输入框失去焦点时拿到用户名传给后端ajax验证
    $('#regname').blur(() => {
        $username = $('#regname').val().trim();
        //非空判断
        if ($username) {
            //请求判断数据库中是否有该用户名
            $.ajax({
                url: "http://localhost:3000/reg",
                type: "post",
                data: {
                    'm': 'exist',
                    'user': $username
                }
            }).done((data) => {
                console.log(data);
                // data=1时用户不存在，开关打开
                if (data == 1) {
                    $userisok = true
                } else {
                    //用户名不可用
                    alert('用户名已存在');
                }
            })
        } else {
            //为空时提示
            alert('用户名不能为空');
        }
    })

    //注册的密码处理
    $('#regpsw').blur(() => {
        $userpsw = $('#regpsw').val().trim();
        //非空判断
        if ($userpsw) {
            $pswneed = /^[a-zA-Z].{5,}$/
            //正则判断
            if ($pswneed.test($userpsw)) {
                //正则通过 可用
                $pswisok = true;
            } else {
                //正则错误不可用
                alert('密码不符合要求');
            }

        } else {
            //为空时
        }
    })

    //产生四位数随机验证码ranNum() 并渲染到页面
    $ranCode = ranNum();
    $('#yzCodeOut').html($ranCode + $('#yzCodeOut').html());

    //看不清楚 点击时 更新验证码
    $('#yzCodeOut').click(() => {
        $ranCode = ranNum();
        $('#yzCodeOut').html($ranCode + '<a href="#">看不清楚，更换一张</a>');
    })
    //判断验证码输入是否正确
    $('#yzCodeIn').blur(() => {
        $InCode = $('#yzCodeIn').val();
        if ($InCode.toLowerCase() == $ranCode.toLowerCase()) {
            //输入的验证码与随机验证码相同时，验证码开关打开
            $codeisok = true;
        } else {
            //输入的验证码与随机验证码不同时，提示并重置随机验证码
            alert('验证码错误');
            $ranCode = ranNum();
            $('#yzCodeOut').html($ranCode + '<a href="#">看不清楚，更换一张</a>');
        }
    })
    //密码输入框聚焦时重置
    $('#regpsw').focus(() => {
        $pswisok = false;
    })
    //用户名输入框聚焦时重置
    $('#regname').focus(() => {
        $userisok = false;
    })
    //点击验证码输入框时重置
    $('#yzCodeIn').focus(() => {
        //验证码开关关闭
        $codeisok = false;
    })

    $('#regBtn').click(() => {
        //判断开关是否全开
        if ($codeisok && $pswisok && $userisok) {
            $username = $('#regname').val().trim();
            $userpsw = $('#regpsw').val().trim();
            //验证均通过
            $.ajax({
                type: "post",
                url: "http://localhost:3000/reg",
                data: {
                    'm': "reg",
                    'user': $username,
                    'psw': $userpsw
                }
            }).done((data) => {
                if(data){
                    alert('注册成功，返回首页');
                    $lasttime=new Date();
						$endtime=$lasttime.getDate() + 1;
						//1天后失效的cookie,并存入本次登录时间
						cookie.set('username',$username,{
							expires:$endtime,
							path:'/'
						});
						location.href='index.html';
                }else{
                    alert('注册失败')
                }
            })
        } else {
            //开关为全开
            alert('验证错误')
        }

    })
})