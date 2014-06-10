var regform=document.getElementById('regform');


//with(regform){
    regform.onsubmit=function(){
        if(checkform(f)){
            $.post('../mock/register.json',$(regform).serialize(),function(r){
                if(r.code==0){
                    alert('申请已发送！请牢记用户名与密码，等待管理员审核。')
                    location.href='login.html';
                }else{
                    alert(r.errMsg);
                }
            });

        }

        return false;
    };

    regform.passwd2.onblur=function(){
        if(!regform.passwd2.value){
            return;
        }
        if(regform.passwd2.value!=regform.passwd.value){
            errtip(regform.passwd2,'两次输入密码不一致');
        }else{
            errtip(regform.passwd2);
        }
    }
//}