/**
 * Created by patry on 03.01.2017.
 */

(function() {
    "use strict";

    function onload() {

        (function() {
            var pass1 = document.getElementById("password"),
                pass2 = document.getElementById("repassword");

            function validatePasswordMatch() {
                if (pass1.value !== pass2.value) {
                    pass2.setCustomValidity("Hasła nie pasują do siebie!");
                } else {
                    pass2.setCustomValidity("");
                }
            }

            pass1.addEventListener("change", validatePasswordMatch);
            pass2.addEventListener("change", validatePasswordMatch);
        })();

        var input = document.getElementById('login');

        function checkLogin(){
            var text = this.value;

            Utils.ajax( {
                type: "GET",
                url: "lib/test.php?msg="+text,
                dataType: "application/x-www-form-urlencoded",
                onError: function(msg) {
                    console.warn(msg)
                },
                onSuccess: function(msg) {
                    console.log("das");
                    console.log("msg: "+msg);
                    var nowy = document.createElement('div');
                    nowy.appendChild(document.createTextNode(msg));
                    nowy.className = 'msg';
                    document.getElementById("register-form").appendChild(nowy);
                    setTimeout(function () {
                        document.getElementById("register-form").removeChild(nowy);
                    }, 5000);

                }
            })

        }

        input.addEventListener('blur', checkLogin);
    }

    document.addEventListener("DOMContentLoaded", onload, false);
})();