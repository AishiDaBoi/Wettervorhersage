$(document).ready(function () {
    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        $(".personen li").each(function () {
            let name = $(this).find(".name").text().toLowerCase();
            if (name.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    let savedSearch = getCookie("searchInput");
    if (savedSearch) {
        $("#searchInput").val(savedSearch);
        performSearch(savedSearch);
    }

    $('#searchInput').on('input', function () {
        let searchValue = $(this).val();
        setCookie("searchInput", searchValue, 365);
        performSearch(searchValue);
    });
});
