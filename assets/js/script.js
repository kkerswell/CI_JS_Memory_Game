// function to add active class to nav link at top of page
// Source code https://stackoverflow.com/a/26383047
$(window).scroll(function(){
    let scrollTop = $(document).scrollTop();
    
    // Changed source code to use OR in the selector
    // Source code https://stackoverflow.com/a/10687171
    let anchors = $('main').find('[id="intro"],[id="howtoplay"],[id="game"]');
    
    for (let i = 0; i < anchors.length; i++){
        if (scrollTop > $(anchors[i]).offset().top && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height()) {
            $('.head_links li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
        } else {
            $('.head_links li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
        }
    }
});

// Function to fade out any element with class="tag" on sroll down and then fade back in on scroll up by adding .hidden css style
$(window).scroll(function() {
    let pageTop = $(document).scrollTop();
    let tags = $('main').find('.tag');    
    
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];

        if (pageTop > $(tags[i]).offset().top - 50 && pageTop < $(tags[i]).offset().top + $(tags[i]).height() - 50) {
            $(tag).addClass('hidden');
        }  
    }

    for (let i = 0; i < tags.length; i++) {
        let tagHidden = tags[i];

        if (pageTop < $(tags[i]).offset().top && pageTop > $(tags[i]).offset().top - $(tags[i]).height()) {
            $(tagHidden).removeClass('hidden');
        }  
    }
    
});
 