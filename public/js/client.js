"use strict";

(function() {
    var url = "https://query.yahooapis.com/v1/public/yql?q=";
    var consKey = "dj0yJmk9bUlLZ09jUE5IUm1SJmQ9WVdrOVFtaEdXbVpuTnpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD03Mg--";
    var location = "phoenix,az";
    var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "')&format=json";
    var httpRequest;

    function makeReq() {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = resMethod;
        httpRequest.open('GET', url + query, + '&consKey=' + consKey);
        httpRequest.send();
    }

    function resMethod() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                updateUI(httpRequest.responseText);
            } else {
                updateUIError();
            }
            console.log(httpRequest.responseText);
        }
    }

    function updateUI(responseText) {
        var response = JSON.parse(responseText);
        var city = response.query.results.channel.location.city;
        var country = response.query.results.channel.location.country;
        var region = response.query.results.channel.location.region;
        
        
        function upadateLocation() {
            var resBox = document.getElementById("resBox");
                resBox.innerHTML = "<p>" + city + "," + region + "," + country + "</p>"                  
        }

        


        upadateLocation();

    }

    function updateUIError() {
        var resBox = document.getElementById("resBox");
        resBox.className = "hidden";
    }

    makeReq();
})();
