var f=document.getElementById('form');


//with(regform){
f.onsubmit=function(){
    if(checkform(f)){

        var data=$(f).serialize();
        console.log(data)
        //return false;
        $.post(checkApi('/api/ticket/create'),data,function(r){
            if(r.code==0){
                /*
                *
                * "data": {
                 "price": "35",
                 "comment": "哈哈",
                 "headCount": "1",
                 "checkCode": "24756103",
                 "expire": 1404086400
                 }
                 */
                $('#result').show();
                alert('成功。'+ r.data.checkCode);

                $('#validCode').val(r.data.checkCode);
                $('#qrcode').qrcode({width: 128,height: 128,text: r.data.checkCode})
                //location.href='index.html';
            }else{
                alert(r.errMsg);
            }
        });

    }

    return false;
};


//}