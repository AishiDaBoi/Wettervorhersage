$(document).ready(function () {


    $('#expand_all').click(function () {
        $('.phone').slideDown();
    });


    $('#close_all').click(function () {
        $('.phone').slideUp();
    });


    function toggleOnePersonPhoneNumber() {
        $('li .name').click(function () {
            $(this).siblings('.phone').slideToggle();
        });
    }


    toggleOnePersonPhoneNumber();


    function searchForName() {
        let searchField = $("#searchInput").val().toLowerCase();

        // Durchlaufe jede Listeneintrag
        $('li').each(function () {
            let name = $(this).find('.name').text().toLowerCase();
            if (name.includes(searchField)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }


    $('#searchInput').on('input', function () {
        searchForName();
    });






});
