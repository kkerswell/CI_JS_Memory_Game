// function to add active class to nav link at top of page
// Source code https://stackoverflow.com/a/26383047
$(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    
    // Changed source code to use OR in the selector
    // Source code https://stackoverflow.com/a/10687171
    var anchors = $('main').find('[id="intro"],[id="how_to_play"],[id="game"]');
    
    for (var i = 0; i < anchors.length; i++){
        if (scrollTop > $(anchors[i]).offset().top && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height()) {
            $('.head_links li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
        } else {
            $('.head_links li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
        }
    }
});