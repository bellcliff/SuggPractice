
$(function(){
    function enableSugg(inputId, suggId, suggUri){
        var self = this;
        var domInput = $('#'+inputId);
        self.suggInited = false;
        var initSugg = function(){
            if (!self.suggInited){
                self.suggInited = true;
                var domSugg = $('#' + suggId);
                if ($(domSugg).length == 0){
                    $(document.body).append('<div id="'+suggId+'" />');
                    domSugg = $('#'+suggId);
                }
                domSugg.css({
                    'display': 'none',
                    'position': 'absolute',
                    'border': 'solid 1px blue',
                    'top': domInput.outerHeight(true) + domInput.position().top,
                    'left': domInput.position().left
                }).width(domInput.outerWidth(true));
            }else{
                console.log('inited');
            }
        };
        var getSugg = function(){
            // get value from input and do encode
            var key = encodeURIComponent(this.value);
            $.getJSON(suggUri+'?key='+key, function(data){
                if (data['key'] != key){
                    console.log('key not equal, ' + key);
                    return;
                }
                if (data['sugg'].length == 0){
                    console.log('sugg length is 0');
                    return;
                }
                showSugg(data);
            });
        };
        var showSugg = function(data){
            var suggArr = [];
            $(data['sugg']).each(function(idx,v){
                suggArr.push('<p>'+v+'</p>');
            });
            $('#'+suggId).html(suggArr.join('')).toggle(true);
            $('p', '#'+suggId).css({'padding': '0 10 0 0', 'margin':0});
        };
        initSugg();
        domInput.keyup(getSugg);
    };
    enableSugg('input', 'sugg', '/sugg.php');
});
