$(function(){
    function SUG(){
        var self = this;
        self.domInput = $('input#textSe');
        self.domSug = $('div#sugs');
        self.sugShown = false;
        self.rawVal = '';
        self.init = function(){
            // bind query on dom
            self.domInput.keyup(function(e){
                // support up and down
                if (self.sugShown && [38, 40].indexOf(e.which)!=-1){
                    e.preventDefault();
                    self.selSug(e.which==40);
                    return false;
                }
                // close if type enter
                if (e.which == 13){
                    self.sugShown = false;
                    self.domSug.html('').toggle(false);
                    return;
                }
                var q = self.domInput.val();
                if(q.length == 0)
                    return;
                if (self.lastReq && new Date().getTime() - self.lastReq < 100){
                    return;
                }
                self.lastReq = new Date().getTime();
                self.rawVal = q;
                $.getJSON('/sug?query='+encodeURIComponent(q), self.show);
            });
        };
        self.show = function(d){
            if(d.sug.length == 0)return;
            var ps = ['<ul>'];
            $(d.sug).each(function(idx,v){
                ps.push('<li>'+v+'</li>');
            });
            ps.push('</ul>');
            var pos = self.domInput.position();
            self.domSug.html(ps.join('')).css({
                'left': pos.left-1,
                'top': pos.top + self.domInput.outerHeight() + 10,
            }).toggle(true);
            self.sugShown = true;
            $('ul li', self.domSug).on('click', function(){
                self.domInput.val($(this).html());
                self.sugShown = false;
                self.domSug.html('').toggle(false);
                $('#hdForm').submit();
            });
        };
        self.selSug = function(isDown){
            if (!self.sugShown)return;
            var domCur, domNext;
            if ($('li.s-a', self.domSug).length == 0){
                // no selection
                if (isDown){
                    //choose first
                    $('li', self.domSug).first().addClass('s-a');
                }else{
                    $('li', self.domSug).last().addClass('s-a');
                }
            }else{
                var domCur = $('li.s-a', self.domSug).removeClass('s-a');
                (isDown ? domCur.next() : domCur.prev()).addClass('s-a');
            }
            // set html to input
            var hasSel = $('li.s-a', self.domSug).length > 0;
            self.domInput.val(hasSel ? $('li.s-a', self.domSug).html() : self.rawVal);
        }
    };
    var sug = new SUG();
    sug.init();
});

