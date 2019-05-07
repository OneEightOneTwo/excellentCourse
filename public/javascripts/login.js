$(() => {
    //用户名、密码、验证码开关
    $userisok = false;
    $codeisok = false;

    //登录的用户名输入框失去焦点时非空判断
    $('#logname').blur(() => {
        $username = $('#logname').val().trim();
        if ($username) {
            $userisok=true;
        } else {
            //为空时提示
            alert('用户名不能为空');
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
  
    //用户名输入框聚焦时重置
    $('#logname').focus(() => {
        $userisok = false;
    })
    //点击验证码输入框时重置
    $('#yzCodeIn').focus(() => {
        $codeisok = false;
    })

    $('#logBtn').click(() => {
        //判断开关是否全开
        if ($codeisok && $userisok) {
            $username = $('#logname').val().trim();
            $userpsw = $('#logpsw').val().trim();
            //验证均通过
            $.ajax({
                type: "post",
                url: "http://localhost:3000/reg",
                data: {
                    'm': "login",
                    'user': $username,
                    'psw': $userpsw
                }
            }).done((data) => {
                if(data){
                    alert('登录成功，返回首页');
                    $lasttime=new Date();
						$endtime=$lasttime.getDate() + 1;
						//1天后失效的cookie,并存入本次登录时间
						cookie.set('username',$username,{
							expires:$endtime,
							path:'/'
						});
						location.href='index.html';
                }else{
                    alert('登录失败')
                }
            })
        } else {
            //开关未全开
            alert('验证错误')
        }

    })
})