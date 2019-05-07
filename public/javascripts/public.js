$(() => {
    //判断cookie中是否有登录记录：有就渲染 没有就请登录
    $nowuser = getCookie('username');
    if ($nowuser) {
        //非空 为登录状态 渲染
        $('.LogOrReg>p').css('display', 'block');
        $('.toReg').css('display', 'none');
        $('.toLog').css('display', 'none');

        //登录用户、时间渲染
        $('#loginUser').html($nowuser);
    } else {
        //空 为 未登录状态
        $('.LogOrReg>p').css('display', 'none');
        $('.toReg').css('display', 'block');
        $('.toLog').css('display', 'block');

    }

    //点击退出时 显示注册登录 隐藏登录面 并 清空cookie
    $('#exit').click(() => {
        $('.toReg').css('display', 'block');
        $('.LogOrReg>p').css('display', 'none');
        $('.toLog').css('display', 'block');
        //清空cookie
        cookie.remove('username');
    })

    //主体部分初始化
    $('.bodyCon').css('display', 'none');
    $('.bodyCon').eq(0).css('display', 'block');
    //主体区域的选项卡（事件委托）
    $('.choseCard>ul').on('click', 'li', function () {
        //排他
        $(this).parent().children().removeClass('choseActive');
        $('.bodyCon').css('display', 'none');
        //选项卡高亮
        $(this).addClass('choseActive');
        //选项卡内容改变
        var pageIndex = $(this).attr('data-page');
        $('.bodyCon').eq(pageIndex).css('display', 'block');
        //选项卡标题改变
        $('.bodyRight>h2').html($('.choseCard>ul>li').eq(pageIndex).html());

    })


})