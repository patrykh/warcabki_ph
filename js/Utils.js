
var Utils = Utils || {};

Utils = function() {
    "use strict";

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }

    function changeCSS() {
        var colors = document.querySelectorAll(".colors .color");

        console.log("das");
        console.log(colors);

        Array.prototype.forEach.call(colors, function(color) {
            color.addEventListener("click", setCookie, false);
        });

        function setCookie(event) {
            var target = event.target,
                color = target.getAttribute("data-color"),
                msg;

            Utils.setCookie("color", color, 30);

            switch (color) {
                case "black":
                    msg = "Wybrano kolor czarny, strona zostanie przeładowana!";
                    break;
                case "white":
                    msg = "Wybrano kolor biały, strona zostanie przeładowana!";
                    break;
            }

            alert(msg);

            document.location = document.location;
        }
    }

    function ajax( options ) {
        options = {
            type: options.type || "POST",
            url: options.url || "",
            onComplete: options.onComplete || function(){},
            onError: options.onError || function(){},
            onSuccess: options.onSuccess || function(){},
            dataType: options.dataType || "text"
        };

        var xml = new XMLHttpRequest();
        xml.open(options.type, options.url, true);

        xml.onreadystatechange = function(){
            if ( xml.readyState == 4) {
                if ( httpSuccess( xml ) ) {
                    var returnData = (options.dataType=="xml")? xml.responseXML : xml.responseText
                    options.onSuccess( returnData );
                } else {
                    options.onError();
                }
                options.onComplete();
                xml = null;
            }
        };

        xml.send();

        function httpSuccess(r) {
            try {
                return ( r.status >= 200 && r.status < 300 || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined")
            } catch(e) {
                return false;
            }
        }
    }

    return {
        ajax: ajax,
        setCookie: setCookie,
        getCookie: getCookie,
        checkCookie: checkCookie,
        changeCSS: changeCSS,
    }
}();
