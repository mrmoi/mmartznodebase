"use strict";

(function() {
    var url = "https://query.yahooapis.com/v1/public/yql?q=";
    var consKey = "dj0yJmk9bUlLZ09jUE5IUm1SJmQ9WVdrOVFtaEdXbVpuTnpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD03Mg--";
    var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='phoenix,az')&format=json";
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
        var count = response.query.results.channel.lastBuildDate;
        var resBox = document.getElementById("resBox");
        resBox.innerHTML = "<p>" + count + "</p>"
    }

    function updateUIError() {
        var resBox = document.getElementById("resBox");
        resBox.className = "hidden";
    }

    makeReq();
})();
