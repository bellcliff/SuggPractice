$(function(){
    /**
     * query and show
     * 1. start query by type enter, click search, click page number
     * 2. show search results
     * 3. show page number
     */
    function SE(){
        var self = this;
        self.domCnts = $('div#cnts');
        self.domForm = $('form#hdForm');
        self.domInput = $('input#textSe');
        self.domSearch = $('input#btnSe');

        /**
         * q is the query key word
         * s is start index
         * n is page number
         */
        self.query = function(){
            var q = self.domInput.val();
            if (q.length == 0) return;
            var qUrl = '/se?'+self.getQueryString(false);
            $.getJSON(qUrl, self.show);
        };

        /**
         * insert result list and show in content list
         * TODO split later to content list and page list
         */
        self.show = function(d){
            self.total = parseInt(d.totalnum);
            var cnts = ['<ol>'];
            $(d.res).each(function(idx, v){
                cnts.push('<li class="result c-container">'
                        +'<p>'+(v.content.length>50?(v.content.substring(0,60)+'...'):v.content)+'</p>'
                        +'<span><a href="'+v.title+'" target="blank">'+v.url+'</a></span>'
                        +'</li>');
            });
            cnts.push('</ol>');
            self.domCnts.html(cnts.join(''));
            self.showPager();
            self.afterShown();
        };
        /**
         */
        self.showPager = function(){
            var ps = ['<div id="foot">'];
            var total = self.total;
            if(self.s != 0){
                ps.push('<a s="'+(-1+self.s/self.n)+'" class="f-c f-c-p">&lt; Previous</a>');
            }
            // if x < 5, left = 1, if x > total-9 left = total -9, else-
            // if x > total -9 right = total else y = x + 9
            var left = self.s/self.n - 4;
            if (left < 1) left = 1;
            else if(left > self.total / self.n -9) left = self.total/self.n - 9;
            var right = left + 9;
            if (right > self.total / self.n) right = self.total / self.n;
            var i = left;
            for (; i<=right; i++){
                if (i-1 != self.s/self.n){
                    ps.push('<a s="'+(i-1)+'"class="f-c f-c-i">'+i+'</a>');
                }else{
                    ps.push('<strong s="'+(i-1)+'" class="f-cur f-c f-c-i">'+i+'</strong>');
                }
            }
            if ( self.s + self.n < total){
                ps.push('<a class="f-c f-c-n" s="'+(1+self.s/self.n)+'">Next &gt;</a>');
            }
            ps.push('</div>');
            self.domCnts.append(ps.join(''));
            $('a', '#foot').on('click', function(e){
                self.s = parseInt($(this).attr('s')) * 10;
                self.n = 10;
                self.query();
            });
        };
        self.afterShown = function(){
            window.history.pushState("search " + self.domInput.val(),
                    "Title",
                    "/static/index.html?"+self.getQueryString(true)
                    );
        };
        self.getQueryString = function(forShow){
            var q = self.domInput.val();
            if (!forShow){q = encodeURIComponent(q);}
            return 'query='+q+'&s='+self.s+'&n='+self.n;
        };

        /**
         * bind key event, bind click, bind page list
         */
        self.init = function(){
            // bind q on form
            self.domForm.submit(function(e){
                e.preventDefault();
                self.s = 0;
                self.n = 10;
                self.query();
            });
            // bind q with url
            var q = getUrlParameter('query');
            if ( !!q && q.length > 0){
                self.domInput.val(decodeURIComponent(q));
                self.s = parseInt(getUrlParameter('s')) || 0;
                self.n = parseInt(getUrlParameter('n')) || 10;
                self.query();
            }
        };

        /**
         * get parameter from cur url
         */
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }
    }
    var se = new SE();
    se.init();
});

