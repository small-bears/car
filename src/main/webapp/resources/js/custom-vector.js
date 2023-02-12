(function ($) {
    "use strict"; // Start of use strict
    // World Map
    $('#world-map-maker').vectorMap({
        map: 'world_mill',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderOpacity: 0.9,
        borderWidth: 1,
        zoomOnScroll: false,
        color: '#ddd',
        regionStyle: {
            initial: {
                fill: '#fff',
                'stroke-width': 1,
                'stroke': '#a6b7bf'
            }
        },
        markerStyle: {
            initial: {
                r: 5,
                'fill': '#26c6da',
                'fill-opacity': 1,
                'stroke': '#fff',
                'stroke-width': 1,
                'stroke-opacity': 1
            },
        },
        enableZoom: true,
        hoverColor: '#79e580',
        markers: [{
            latLng: [21.00, 78.00],
            name: 'Hyderabad : 5',
            style: { fill: '#24d2b5' }
        },
        {
            latLng: [-33.00, 151.00],
            name: 'Melborne : 250',
            style: { fill: '#ff9040' }
        },
        {
            latLng: [36.77, -119.41],
            name: 'New Jersey : 12',
            style: { fill: '#20aee3' }
        },
        {
            latLng: [55.37, -3.41],
            name: 'London   : 250',
            style: { fill: '#6772e5' }
        },
        {
            latLng: [25.20, 55.27],
            name: 'Dubai : 250',
            style: { fill: '#24d2b5' }
        }
        ],
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#fff', '#ccc'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        showTooltip: true,
        onRegionClick: function (element, code, region) {
            var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
            alert(message);
        }
    });
    // United States Map
    if($("#vmap-usa").length == 1){
    $('#vmap-usa').vectorMap({
        map: 'usa_en',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderOpacity: 0.9,
        borderWidth: 1,
        zoomOnScroll: false,
        color: '#ddd',
        regionStyle: {
            initial: {
                fill: '#007FFF',
                'stroke-width': 1,
                'stroke': '#fff'
            }
        }
    });
    }
    // India Map
    if($("#vmap-india").length == 1){
    $('#vmap-india').vectorMap({
        map: 'india_en',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderOpacity: 0.9,
        borderWidth: 1,
        zoomOnScroll: false,
        color: '#ddd',
        regionStyle: {
            initial: {
                fill: '#19406D',
                'stroke-width': 1,
                'stroke': '#fff'
            }
        }
    });
    }
})(jQuery);
