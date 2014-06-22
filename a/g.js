function toptip(s){
    var div=document.createElement('div');
    div.className='toptip';
    div.innerHTML=s;
    $('body').prepend(div);
}

function errtip(el,s){
    if(s){
        var tip=el.errtip
        if(!tip){

            tip=document.createElement('span');
            el.parentNode.appendChild(tip);
            tip.className='errtip';

            el.errtip=tip;
        }
        tip.innerHTML=s;
    }else{
        if(el.errtip){
            el.errtip.parentNode.removeChild(el.errtip);
            delete el.errtip;
        }
    }
}
function checkform(f){
    var r=true;
    for(var i= 0,el;el=f.elements[i];i++){
        if(el.name&&!el.getAttribute('empty')){
            if(!el.value){
                errtip(el,'此项必填');
                r=false;
            }
            // else errtip(el);
        }

    }
    return r;
}
function formatTS(ts,noTime){
    var date=new Date(ts-0);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+(noTime?'':' '
    +date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
}
var userId=sessionStorage.getItem('userId'),
    _token_=sessionStorage.getItem('_token_'),
    checkApi=function(api){
        return 'http://localhost:8008'+api+(_token_?'?userId='+userId+'&_token_='+_token_:'');
    };