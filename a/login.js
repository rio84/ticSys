var f=document.getElementById('form');


//with(regform){
    f.onsubmit=function(){
        if(checkform(f)){
            $.post('../mock/login.json',$(f).serialize(),function(r){
                if(r.code==0){
                    //alert('注册成功。')
                    location.href='index.html';
                }else{
                    alert(r.errMsg);
                }
            });

        }

        return false;
    };


//}