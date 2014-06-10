$.get('../mock/tradelog.json',{},function(r){
    if(r.code==0){
        var d= r.data,list= r.data.log;
        $('#bi').html(d.bi);
        $('#amount').html(d.amount);
        $('#tcount').html(d.tcount);
        $('#vcount').html(d.vcount);
        var logs=$('#logs')[0],tb=logs.tBodies[0];
        for(var i= 0,n;n=list[i];i++){
           var row= tb.insertRow(tb.rows.length);
            for(var k in n){
                var td=row.insertCell(row.cells.length);
                td.innerHTML=n[k];

            }

        }
    }else{
        alert(r.errMsg);
    }
})