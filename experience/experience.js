(function() {


d3.select(window).on('resize', resize);

function resize(){
//adjust when window changes
    w = parseInt(d3.select('#nac').style('width'));
    h = w*.85;
//update
    svg
    .attr("width", (w+ m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
}


var m = {t:30,r:100,b:50,l:50},
    w = parseInt(d3.select('#nac').style('width')),
    pieRatio = .5,
    h = w*.85;

var svg = d3.select("#nac")
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + w + " " + h)
  .attr("preserveAspectRatio", "xMinYMin");


var color = d3.scale.ordinal().domain([0,1])
    .range(["rgba(173,192,180,1)","rgba(0,167,167,0)"]);

var color2 = d3.scale.ordinal().domain([0,1])
    .range(["rgba(102,162,166,1)","rgba(203,0,0,0)"]);

var stroke = d3.scale.ordinal().domain([0,1])
    .range(["white","null"]);

var data = [90,10];

var data2 = [64,36];

var data3 = [100,0];

var radius = h*.45;

var ringW = h/15;

console.log(data);

var arc = d3.svg.arc()
  .outerRadius(radius - 20)
  .innerRadius(radius - 20 - ringW);

var arc2 = d3.svg.arc()
  .outerRadius(radius - 20- ringW)
  .innerRadius(radius - 20 - ringW - ringW);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 10);


  function tweenPie(finish) {
      var start = {
          startAngle: 0,
          endAngle: 0
      };
      var i = d3.interpolate(start, finish);
      return function(d) { return arc(i(d)); };
  }

  function tweenPie2(finish) {
      var start = {
          startAngle: 0,
          endAngle: 0
      };
      var i = d3.interpolate(start, finish);
      return function(d) { return arc2(i(d)); };
  }

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d){return d});

  //var g = svg.selectAll('.arc')
   // .data(pie(data3))
   // .enter()
   // .append('g')
   // .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
   // .attr('class','arc');

 // g.append ('path')
   // .attr('d',arc)
   // .style('fill', "rgba(167,167,167,.2)")
    //.style('stroke','rgb(250,250,250)')
   // .style('stroke-width','2px')

  var g1 = svg.selectAll('.arc1')
    .data(pie(data))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc1');

  g1.append ('path')
    .style('fill', function(d,i){return color(i)})
    .style('stroke',function(d,i){return stroke(i)})
    .style('stroke-width','2px')
    .transition().delay(100).duration(1500)
    .attrTween('d',tweenPie)

  var g2 = svg.selectAll('.arc2')
    .data(pie(data2))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc2');

  g2.append ('path')
    .style('fill', function(d,i){return color2(i)})
    .style('stroke',function(d,i){return stroke(i)})
    .style('stroke-width','2px')
    .transition().delay(1500).duration(1500)
    .attrTween('d',tweenPie2)

var textPosX = w/2 - radius*.60;
var textPosY = h/2 + radius*.3 ;



/// animating the text on page 3    

d3.select('#text-1').style('opacity',0).transition().delay(300).duration(1000).style('opacity',1);
d3.select('#text-2').style('opacity',0).transition().delay(2000).duration(1000).style('opacity',1);





}).call(this);
