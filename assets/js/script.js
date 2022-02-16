// function to add active class to nav link at top of page
// Source code https://stackoverflow.com/a/26383047
$(window).scroll(function(){
    let scrollTop = $(document).scrollTop();
    
    // Changed source code to use OR in the selector
    // Source code https://stackoverflow.com/a/10687171
    let elementsList = document.querySelectorAll("#intro, #howtoplay, #game, #contact");

    for (let i = 0; i < elementsList.length; i++){
        if (scrollTop > $(elementsList[i]).offset().top && scrollTop < $(elementsList[i]).offset().top + $(elementsList[i]).height()) {
            $('#top-nav a[href="#' + $(elementsList[i]).attr('id') + '"]').addClass('active');
        } else {
            $('#top-nav a[href="#' + $(elementsList[i]).attr('id') + '"]').removeClass('active');
        }
    }
});