$( document ).ready(function() {

    // Utility
    function concatValues( obj ) {
        var value = '';
        for ( var prop in obj ) {
            value += obj[ prop ];
        }
        return value;
    }
 
    function debounce( fn, threshold ) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout( timeout );
            var args = arguments;
            var _this = this;
            function delayed() {
            fn.apply( _this, args );
            }
            timeout = setTimeout( delayed, threshold );
        };
    }


    // Filters
    var filters = {};
    var searchRegex;

    function search() {
        // String of associated terms
        let searchTerms = $(this).attr('class').replace('grid-item','');
        searchTerms += $(this).text().trim();
    
        console.log("Query: " + searchRegex ? searchTerms.match( searchRegex ) : true);
        return searchRegex ? searchTerms.match( searchRegex ) : true;
    }

    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        // filter: search
    });

    // Filters
    var filters = {};
    var searchRegex;

    $('.filters').on( 'click', '.button', function( event ) {
        var $button = $( event.currentTarget );
        // get group key
        var $buttonGroup = $button.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[ filterGroup ] = $button.attr('data-filter');
   
        // Combine filters
        if (filterGroup == 'category') {
            // If category, show all in category
            var filterValue = $(this).attr('data-filter');
        } else {
            // If tag, show tagged within category
            var filterValue = concatValues( filters );
        }
   
        // set filter for Isotope
        $grid.isotope({ filter: filterValue });
    });

    // Current filter state
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', '.button', function( event ) {
            $buttonGroup.find('.filter-category').removeClass('is-checked');
            var $button = $( event.currentTarget );
            $button.addClass('is-checked');
        });
    });

    // Search Filters
    var $searchFilter = $('#search-filter').keyup( debounce(
        function() {
            searchRegex = new RegExp( $searchFilter.val(), 'i' );
            $grid.isotope({
                filter: search
            });
        }, 200
    ));

    // Reset
    $(".reset").click(function() {
        filters = {};
        $grid.isotope({
            filter: '*'
        });

         $('#search-filter').val('');
         $('#search-filter').keyup();

    });

});


// Filter by Category
function filterGridItemsByCat(category) {
    let lesson_list_item = document.querySelectorAll(".lesson-grid > li");
    let filter = category.toUpperCase();
    
    for (let i = 0; i < lesson_list_item.length; i++) {
        let lesson_item = lesson_list_item[i].getElementsByTagName("a")[0];

        if (category == "all") {
             lesson_list_item[i].classList.remove("hide");
        } else {
            if (lesson_item.getAttribute("data-category").toUpperCase().includes(filter)) {
                lesson_list_item[i].classList.remove("hide");
            } else {
                lesson_list_item[i].classList.add("hide");
            }
        }
    }
    
}

// Category Filter
function filterCategory(category) {

    let list_item_class = "filter-tag-" + category;
    let list_nav_item_list = document.querySelectorAll(".lesson-nav-tags > li");
    
    for (let i = 0; i < list_nav_item_list.length; i++) {

        if (list_nav_item_list[i].classList.contains(list_item_class)) {
             list_nav_item_list[i].classList.remove('hide');
        } else {
            list_nav_item_list[i].classList.add('hide');
        }
    }

    // filterGridItemsByCat(category);
}

// Filter by Tag
function filterGridItemsByTag(tag) {
    let lesson_list_item = document.querySelectorAll(".lesson-grid > li");
    let filter = tag.toUpperCase();

     for (let i = 0; i < lesson_list_item.length; i++) {
        let lesson_item = lesson_list_item[i].getElementsByTagName("a")[0];

        if (lesson_item.getAttribute("data-tags").toUpperCase().includes(filter)) {
            lesson_list_item[i].classList.remove("hide");
        } else {
            lesson_list_item[i].classList.add("hide");
        }
    }
}
