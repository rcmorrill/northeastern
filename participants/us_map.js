(function() {


d3.select(window).on('resize', resize);

function resize(){
//adjust when window changes
    w = parseInt(d3.select('#us_map').style('width'));
    h = w * mapRatio;
//update
    projection
    .translate([w/2+(w/8), h/2])
    .scale(w);
    map
        .style('width', w + 'px')
        .style('height', h + 'px');

}



var w = parseInt(d3.select('#us_map').style('width')),
    mapRatio = 0.5,
    h = w * mapRatio;

var goodCircleWidth = 800;    

var map = d3.select('#us_map')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("preserveAspectRatio", "xMinYMin")

var projection = d3.geo.albersUsa()
    .translate([w/2+(w/8), h/2])
    .scale(w);


var map_path = d3.geo.path()
 .projection(projection);



function draw_map(state, data) {

var states = map.selectAll('.states')
        .data(state.features)
        .enter()
        .append('path')
        .attr('class', 'state_path')
        .attr('d', map_path)


    var geoPoints = map.selectAll('.geo_points')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'map_circles')
        .attr('r',0)
        .attr("transform", function(d) {
      return "translate(" + projection([
        d.lng,
        d.lat
      ]) + ")"})

    geoPoints.attr('r',0).transition().duration(500).attr("r", 2 * (w / goodCircleWidth))

};




//---------------------------------------------------------------------
function dataLoaded(err, state, data) {
    if (err) console.error(err);

    draw_map(state, data);
}
//-----------------------------------------------------------QUEUE
queue()
.defer(d3.json, "participants/data/gz_2010_us_040_00_5m.json")
.defer(d3.csv, "participants/data/survey.csv", parse)
.await(dataLoaded)

function parse(d){
    return {
        lat: (+d["LocationLatitude"] == "#NULL!" ? undefined: +d["LocationLatitude"]),
        lng: (+d["LocationLongitude"] == "#NULL!" ? undefined: +d["LocationLongitude"]),
        industry: (d["INDUSTRY"] == "#NULL!" ? undefined: d["INDUSTRY"]),
        lngLat: ([+d.LocationLongitude, +d.LocationLatitude] =="#NULL!" ? undefined: [+d.LocationLongitude, +d.LocationLatitude]),
        }
}

}).call(this);