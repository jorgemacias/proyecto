var geocoder = null;
var map = null;
var gmarkers = [];
var closest = [];



module.exports = class NerbyRestaurants {
    constructor() {
        this.googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyDAKgM8G41K3GDGYlpUvLCA2FRBJw14wJg',
            Promise: Promise
        });
    }

    findByAddress(address) {
        this.googleMapsClient.geocode({ address: address })
            .asPromise()
            .then((response) => {
                return response.json.results[0];
            })
            .catch((err) => {
                return false;
            });
    }

    findClosest(pt,numberOfResults) {
        this.closest = findClosestN(pt, numberOfResults);

        this.closest = this.closest.splice(0, numberOfResults);
        calculateDistances(pt, closest, numberOfDrivingResults);
    }

}

exports.initialize = function () {
    // alert("init");
    geocoder = new google.maps.Geocoder();
    var marker, i;
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
        var coordStr = locations[i][4];
        var coords = coordStr.split(",");
        var pt = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
        bounds.extend(pt);
        marker = new google.maps.Marker({
            position: pt,
            map: map,
            icon: locations[i][5],
            address: locations[i][2],
            title: locations[i][0],
            html: locations[i][0] + "<br>" + locations[i][2]
        });
        gmarkers.push(marker);
    }

};

exports.codeAddress = function (address) {
    var numberOfResults = 25;
    var numberOfDrivingResults = 5;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            closest = findClosestN(results[0].geometry.location, numberOfResults);
            // get driving distance
            closest = closest.splice(0, numberOfResults);
            calculateDistances(results[0].geometry.location, closest, numberOfDrivingResults);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

exports.findClosestN = function (pt, numberOfResults) {
    var closest = [];
    for (var i = 0; i < gmarkers.length; i++) {
        gmarkers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, gmarkers[i].getPosition());
        closest.push(gmarkers[i]);
    }
    closest.sort(sortByDist);
    return closest;
}

exports.sortByDist = function (a, b) {
    return (a.distance - b.distance)
}

exports.calculateDistances = function (pt, closest, numberOfResults) {
    var service = new google.maps.DistanceMatrixService();
    var request = {
        origins: [pt],
        destinations: [],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    };
    for (var i = 0; i < closest.length; i++) {
        request.destinations.push(closest[i].getPosition());
    }
    service.getDistanceMatrix(request, function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            console.log('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            var results = response.rows[0].elements;
            // save title and address in record for sorting
            for (var i = 0; i < closest.length; i++) {
                results[i].title = closest[i].title;
                results[i].address = closest[i].address;
                results[i].idx_closestMark = i;
            }
            results.sort(sortByDistDM);

        }
    });
}

exports.sortByDistDM = function (a, b) {
    return (a.distance.value - b.distance.value)
}

// Store Name[0],delivery[1],Address[2],Delivery Zone[3],Coordinates[4] data from FusionTables pizza stores example
var locations = [
    ["John's Pizza", "no", "400 University Ave, Palo Alto, CA", "", "37.447038,-122.160575", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["JJs Express", "yes", "1000 Santa Cruz Ave, Menlo Park, CA", "", "37.448638,-122.187176", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["John Paul's Pizzeria", "no", "1100 El Camino Real, Belmont, CA", "", "http://maps.google.com/mapfiles/ms/icons/red.png"],
    ["JJs Express", "yes", "300 E 4th Ave, San Mateo, CA", "", "37.564435,-122.322080", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["John's Pizza", "yes", "1400 Broadway Ave, Burlingame, CA", "", "37.584935,-122.366182", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["JJs Express", "yes", "700 San Bruno Ave, San Bruno, CA", "", "37.630934,-122.406883", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["JJs Express", "yes", "300 Beach St, San Francisco, CA", "", "37.807628,-122.413782", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["JJs Express", "yes", "1400 Haight St, San Francisco, CA", "", "37.770129,-122.445082", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["JJs Express", "yes", "2400 Mission St, San Francisco, CA", "", "37.758630,-122.419082", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["JJs Express", "yes", "500 Castro St, Mountain View, CA", "", "37.390040,-122.081573", "http://maps.google.com/mapfiles/ms/icons/green.png"],
    ["John's Pizza", "no", "100 S Murphy Ave, Sunnyvale, CA", "", "37.377441,-122.030071", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["John's Pizza", "no", "1200 Curtner Ave, San Jose, CA", "", "37.288742,-121.890765", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["John's Pizza", "yes", "700 Blossom Hill Rd, San Jose, CA", "", "37.250543,-121.846563", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["John's Pizza", "yes", "100 N Milpitas Blvd, Milpitas, CA", "", "37.434113,-121.901139", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    ["John's Pizza", "yes", "3300 Mowry Blvd, Fremont, CA", "", "37.552773,-121.985153", "http://maps.google.com/mapfiles/ms/icons/blue.png"],
    //New York, NY, USA (40.7127837, -74.00594130000002)  
    ["New York, NY, USA", "no", "New York City Hall, New York, NY 10007, USA", "", "40.7127837, -74.0059413", "http://maps.google.com/mapfiles/ms/icons/yellow.png"],
    // Newark, NJ, USA (40.735657, -74.1723667)  
    ["Newark, NJ, USA", "no", "169 Market St, Newark, NJ 07102, USA", "", "40.735657, -74.1723667", "http://maps.google.com/mapfiles/ms/icons/yellow.png"],
    // Baltimore, MD, USA (39.2903848, -76.6121893
    ["Baltimore, MD, USA", "no", "201-211 E Fayette St, Baltimore, MD 21202, USA", "", "39.2903848, -76.6121893", "http://maps.google.com/mapfiles/ms/icons/yellow.png"],
    // Boston, MA, USA (42.3600825, -71.05888
    ["Boston, MA, USA", "no", "City Hall Plaza, Boston, MA 02203, USA", "", "42.3600825, -71.05888", "http://maps.google.com/mapfiles/ms/icons/yellow.png"],
    // Philadelphia, PA, USA (39.9525839, -75.16522150000003)
    ["Philadelphia, PA, USA", "no", "1414 PA-611, Philadelphia, PA 19102, USA", "", "39.9525839, -75.1652215", "http://maps.google.com/mapfiles/ms/icons/yellow.png"]
];