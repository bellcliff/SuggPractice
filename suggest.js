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
                        suggArr.push('<p><span>'+v+'</span></p>');
                    })
                    suggArr.push('');
                    $('#suggestList').html(suggArr.join(''));
                    changePosition(self, '#suggestList');
                }
            });
        }
    });
    function changePosition(input, sugg){
        var pTop = $(input).position().top + $(input).outerHeight(true);
        var pLeft = $(input).position().left;
        var pRight = $(input).position().right;
        $(sugg).css({
            'position': 'absolute',
            'border': 'solid 1px',
            'width': $(input).outerWidth(true),
            'left': $(input).position().left-1,
            'top': $(input).position().top + $(input).outerHeight(true)
        }).toggle(true);
        $('p', sugg).css({
            'margin': 0,
            'padding': 0
        });
    }
})
