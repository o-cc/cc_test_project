$( function () {

    $("#register").click(function () {
        $(".second").hide(1000);
        $(".third").show(100);
    });

    $("#login").click(function () {
        $(".third").hide(1000);
        $(".second").show(1000);
    });

})
