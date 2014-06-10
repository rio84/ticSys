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
        if(el.name&&el.name!='words'){
            if(!el.value){
                errtip(el,'此项必填');
                r=false;
            }
            // else errtip(el);
        }

    }
    return r;
}