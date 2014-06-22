var f=document.getElementById('form');


//with(regform){
    f.onsubmit=function(){
        if(checkform(f)){
            $.post('http://localhost:8008/api/user/login',$(f).serialize(),function(r){
                if(r.code==0){
                    //alert('注册成功。')
                    switch (r.data.status-0){
                        case 0:
                            toptip('您的账号还没有激活，请等待管理员审核。')
                            break;
                        case 1:
                            window.userId= r.data.userId;
                            window._token_=r._token_.token;
                            sessionStorage.setItem('userId',window.userId);
                            sessionStorage.setItem('_token_', r._token_.token);
                            location.href='index.html';
                            break;
                        case 8:
                            toptip('您的账号申请被管理员驳回。')
                            break;
                        case 9:
                            toptip('此账号已经被禁用。')
                            break;
                    }


                }else{
                    alert(r.errCode);
                }
            });

        }

        return false;
    };


//}