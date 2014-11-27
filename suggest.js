$(function(){
    // bind key up event and try get suggestion
    $('#suggest').keyup(function(){
        var self = this;
        var key = self.value;
        if (key && key.length > 0){
            key = encodeURIComponent(key);
            // send out ajax request to server
            $.getJSON('sugg.php?key=' + key, function(data){
                if (data['key'] == key && data['sugg'].length>0){
                    // show sugg if reqId sent out is the same as recv
                    var suggArr=[], suggTxt;
                    $(data['sugg']).each(function(idx,v){
                        suggArr.push('<div><p>'+v+'</p></div>');
                    })
                    suggArr.push('');
                    $('#suggestList').html(suggArr.join(''));
                }
            });
        }
    });
})
