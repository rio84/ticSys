var f=document.getElementById('form');


//with(regform){
f.onsubmit=function(){
    if(checkform(f)){
        $.post('../mock/create.json',$(f).serialize(),function(r){
            if(r.code==0){
                $('#result').show();
                alert('成功。'+ r.validCode);

                $('#validCode').val(r.validCode);
                $('#qrcode').qrcode({width: 128,height: 128,text: r.validCode})
                //location.href='index.html';
            }else{
                alert(r.errMsg);
            }
        });

    }

    return false;
};


//}