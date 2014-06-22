var
getSubuser=function(){
    $.get(checkApi('/api/user/subuser'),{
        //userId:window.userId,
        status:0
    },function(r){
        if(r.code==0){
            console.log(r.data);
            //var tbl=document.getElementById('newMembers');
            renderNewMembers(r.data);
        }
    });
},updateUser=function(data,cb){
    $.post(checkApi('/api/user/updateuser'),data,function(r){
        if(r.code==0){
            console.log(r.data);
            cb&&cb(r);
            //var tbl=document.getElementById('newMembers');
           // renderNewMembers(r.data);
        }
    });
},
getTickets=function(){

    $.get(checkApi('/api/ticket/query'),{
        //userId:window.userId,

        //status:0
    },function(r){
        if(r.code==0){
            console.log(r.data);
            //var tbl=document.getElementById('newMembers');
            renderTickets(r.data);
        }
    });
},
ticketDataAdapt=function(n){

    var st={
        '1':'有效',
        '2':'已验'

    };
    switch (n.status-0){
        case 1:
            st='有效';
            break;
    }
    if(n.status==1){

        if(n.expire*1000<(new Date).getTime()){
            st='过期';

        }else{
            st='有效';
            //console.log(n.expire*1000,(new Date).getTime(),n.expire*1000<(new Date).getTime())
        }
    }else if(n.status==2){
        st='已验'
    }
    n.status=st;
    n.expire=formatTS(n.expire*1000,1);
    n.createTime=formatTS(n.createTime*1000);

    return n;

},
renderTickets=function(list){
    var tbl=document.getElementById('myTickets'),
        tbd=tbl.tBodies[0],
        fields='createTime,tradeNo,headCount,price,buyer,expire,status,comment'.split(','),
        theadcount=0,tprice=0;
    if(list.length){
        tbl.parentNode.style.display='block';
    }

    for(var i= 0,n;n=list[i];i++){
        n=ticketDataAdapt(n);
        //tcount++;
        tprice+= n.price;
        theadcount+= n.headCount;
        var tr=tbd.insertRow(tbd.rows.length),td;
        for(var j= 0,m;m=fields[j];j++){
            td=tr.insertCell(tr.cells.length);
            td.innerHTML=n[m];

        }
        tr.setAttribute('data-id', n.id);

    }
    document.getElementById('tHeadCount').innerHTML=theadcount;
    document.getElementById('tPrice').innerHTML=tprice;
    document.getElementById('tCount').innerHTML=list.length;
},

renderNewMembers=function(list){
    var tbl=document.getElementById('newMembers');
    if(list.length){
        tbl.parentNode.style.display='block';
    }

    for(var i= 0,n;n=list[i];i++){

        /*
        * <tr>
         <td>xinyy</td>
         <td>2014/5/12 12:34</td>
         <td>无</td>
         <td>
         <button>通过</button>
         <button>驳回</button>
         </td>
         </tr>
        * */
        var tr=tbl.insertRow(),
            td0=tr.insertCell(tr.cells.length),
            td1=tr.insertCell(tr.cells.length),
            td2=tr.insertCell(tr.cells.length),
            td3=tr.insertCell(tr.cells.length);
        td0.innerHTML= n.name;
        td1.innerHTML= n.time;
        td2.innerHTML= n.brief;
        td3.innerHTML=
            '<button onclick="accept(this,'+ n.userId+')">通过</button>'+
            '<button onclick="reject(this,'+ n.userId+')">驳回</button>'
        tr.setAttribute('data-id', n.userId);

    }
}

function accept(el,uid){
    updateUser({
        status:1,
        role:1,
        uid:uid
    },function(){
        $(el).closest('tr').remove()
    });

}
function reject(el,uid){
    updateUser({
        status:8,
        role:0,
        uid:uid
    },function(){
        $(el).closest('tr').remove();
    });
}


!function main(){
    getTickets();
    getSubuser();
}();

