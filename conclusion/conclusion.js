(function() {


d3.select(window).on('resize', resize);

function resize(){
//adjust when window changes
    w = parseInt(d3.select('.pie').style('width'));
    h = w*.5;
//update
    svg
    .attr("width", (w+ m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
    svg2
    .attr("width", (w+ m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
    svg3
    .attr("width", (w+ m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
}


var m = {t:20,r:100,b:10,l:50},
    w = parseInt(d3.select('.pie').style('width')),
    pieRatio = .5,
    h = w*.5;


var color = d3.scale.ordinal().domain([0,1])
    .range(['rgba(231,108,100,1)',"rgba(0,167,167,0)"]);

var dataGray = [100,0];
var data = [90,10];
var data2 = [89,11];
var data3 = [50,50];

var radius = h*.6;

var ringW = h/10;

var arc = d3.svg.arc()
  .outerRadius(radius - 20)
  .innerRadius(radius - 20 - ringW);

  function tweenPie(finish) {
      var start = {
          startAngle: 0,
          endAngle: 0
      };
      var i = d3.interpolate(start, finish);
      return function(d) { return arc(i(d)); };
  }

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d){return d});

////first pie chart /////

var svg = d3.select("#pie1")
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + w + " " + h)
  .attr("preserveAspectRatio", "xMinYMin");

  var g = svg.selectAll('.arc')
   .data(pie(dataGray))
   .enter()
   .append('g')
   .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
   .attr('class','arc');

 g.append ('path')
   .attr('d',arc)
   .style('fill', "rgba(167,167,167,.2)")
   .style('stroke-width','2px')


  var g1 = svg.selectAll('.arc1')
    .data(pie(data))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc1');

  g1.append ('path')
    .style('fill', function(d,i){return color(i)})
    .transition().delay(100).duration(1500)
    .attrTween('d',tweenPie)


////second pie chart /////


var svg2 = d3.select("#pie2")
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + w + " " + h)
  .attr("preserveAspectRatio", "xMinYMin");

  var g2 = svg2.selectAll('.arc')
   .data(pie(dataGray))
   .enter()
   .append('g')
   .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
   .attr('class','arc');

 g2.append ('path')
   .attr('d',arc)
   .style('fill', "rgba(167,167,167,.2)")
   .style('stroke-width','2px')


  var g3 = svg2.selectAll('.arc1')
    .data(pie(data2))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc1');

  g3.append ('path')
    .style('fill', function(d,i){return color(i)})
    .transition().delay(100).duration(1500)
    .attrTween('d',tweenPie)


////third pie chart /////


var svg3 = d3.select("#pie3")
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + w + " " + h)
  .attr("preserveAspectRatio", "xMinYMin");

  var g4 = svg3.selectAll('.arc')
   .data(pie(dataGray))
   .enter()
   .append('g')
   .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
   .attr('class','arc');

 g4.append ('path')
   .attr('d',arc)
   .style('fill', "rgba(167,167,167,.2)")
   .style('stroke-width','2px')


  var g5 = svg3.selectAll('.arc1')
    .data(pie(data3))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc1');

  g5.append ('path')
    .style('fill', function(d,i){return color(i)})
    .transition().delay(100).duration(1500)
    .attrTween('d',tweenPie)

}).call(this);
