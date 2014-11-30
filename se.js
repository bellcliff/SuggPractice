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
            var qUrl = '/se?query='+encodeURIComponent(q)+'&s=0&n=10';
            $.getJSON(qUrl, self.show);
        };

        /**
         * insert result list and show in content list
         * TODO split later to content list and page list
         */
        self.show = function(d){
            var cnts = ['<ol>'];
            $(d.res).each(function(idx, v){
                cnts.push('<li class="result c-container">'
                        +'<p>'+v.content+'</p>'
                        +'<span><a href="'+v.title+'" target="blank">'+v.url+'</a></span>'
                        +'</li>');
            });
            cnts.push('</ol>');
            self.domCnts.html(cnts.join(''));
            self.afterShown();
        };
        self.afterShown = function(){
            window.history.pushState("search " + self.domInput.val(),
                    "Title",
                    "/static/index.html?query="+self.domInput.val()
            );
        };

        /**
         * bind key event, bind click, bind page list
         */
        self.init = function(){
            // bind q on form
            self.domForm.submit(function(e){
                e.preventDefault();
                self.query();
            });
            // bind q with url
            var q = getUrlParameter('query');
            if ( !!q && q.length > 0){
                self.domInput.val(decodeURIComponent(q));
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
