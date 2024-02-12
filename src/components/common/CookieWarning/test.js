var cookieSeen = localStorage.getItem("cookieSeen");

if (typeof (cookieSeen) === "undefined" || cookieSeen === null || cookieSeen === "") {
        document.getElementById("cookieWarning").style.display = "unset";
}
        })

function disableCookiePopup() {
        localStorage.setItem("cookieSeen", "true");
        document.getElementById("cookieWarning").style.display = "none";
}