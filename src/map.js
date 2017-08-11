var map = L.map('map', {scrollWheelZoom: false, tap: false}).setView([42.32, -71.066], 11.5);
var lineStyle = {
    "fillColor": "none",
    "color": "gray",
    "weight": 1.5,
    "opacity": 1,
}


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA', {
    id: 'mapbox.light',
}).addTo(map);



L.geoJson(licenseZip).addTo(map);


// // control that shows state info on hover
// 	var info = L.control();

// 	info.onAdd = function (map) {
// 		this._div = L.DomUtil.create('div', 'info');
// 		this.update();
// 		return this._div;
// 	};

// 	info.update = function (props) {
// 		this._div.innerHTML = '<h4>Liquor licenses by ZIP code</h4>' +  (props ?
// 			'<span style="font-weight:bold">' + props.ZIP5 + '</span><br />' + props.licenses_number + ' licenses <br>' + props.licenses_neighborhood 
// 			: 'Hover over a ZIP code');
// 	};

// 	info.addTo(map);

function getColor(d) {
    return d > 119  ? 'rgba(18, 32, 127, 1)' :
           d > 89  ? 'rgba(8, 81, 156, 1)' :
           d > 59   ? 'rgba(49, 130, 189, 1)' :
           d > 29   ? 'rgba(107, 174, 214, 1)' :
           d > 1   ? 'rgba(189, 215, 231, 1)' :
              'rgba(255, 255, 255, 1)';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.licenses_number),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
    };
}

L.geoJson(licenseZip, {style: style}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
        info.update(layer.feature.properties);

}



var geojson;
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


geojson = L.geoJson(licenseZip, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [1, 29, 59, 89, 119],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

L.geoJSON(zipOutline, {
	style: lineStyle 
}).addTo(map);



function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.licenses_number) {
        layer.bindPopup('<span style="font-weight:bold">' + feature.properties.licenses_number + ' licenses</span><br>' + feature.properties.ZIP5 + ' ' + feature.properties.licenses_neighborhood);
    }
}

var myStyle = {
    "color": "#ff7800",
    "fillColor": "none",
    "weight": 0,
    "opacity": 0
};

L.geoJSON(zipOutline, {
    onEachFeature: onEachFeature,
    style: myStyle,

}).addTo(mymap);

