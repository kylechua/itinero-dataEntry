document.addEventListener("DOMContentLoaded", function(event) {
    var errorMsgs = document.getElementsByClassName("invalid-feedback");
    if (typeof errorMsgs !== 'undefined') {
        for (var i=0; i<errorMsgs.length; i++) {
        errorMsgs[i].style.display = "block";
        }
    }
});
