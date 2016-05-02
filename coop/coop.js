(function() {


d3.select(window).on('resize', resize);

function resize(){
//adjust when window changes
    w = parseInt(d3.select('#coop').style('width'));
    h = w*.85;
//update
    svg
    .attr("width", (w+ m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
}


var m = {t:30,r:100,b:50,l:50},
    w = parseInt(d3.select('#coop').style('width')),
    pieRatio = .5,
    h = w*.85;

var svg = d3.select("#coop")
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + w + " " + h)
  .attr("preserveAspectRatio", "xMinYMin");


var color = d3.scale.ordinal().domain([0,1,2])
    .range(["rgba(231,108,100,1)","rgba(231,108,100,.5)","rgba(0,167,167,0)"]);

var color2 = d3.scale.ordinal().domain([0,1])
    .range(["rgba(102,162,166,1)","rgba(203,0,0,0)"]);

var stroke = d3.scale.ordinal().domain([0,1,2])
    .range(["white","white","null"]);

var data = [76,18,6];

var data3 = [100,0];

var labels = [{num:76, label:"2-3 co-ops", value:" 76%"}, {num:18, label:"1 co-op", value:"18%"},{num:6, label:"",value:""}];

console.log(labels);

var radius = h*.45;

var radius2 = h*.40;

var ringW = h/15;

console.log(data);

var arc = d3.svg.arc()
  .outerRadius(radius - 20)
  .innerRadius(radius - 20 - ringW);


var labelArc = d3.svg.arc()
    .outerRadius(radius2-50- ringW)
    .innerRadius(radius2-50- ringW);


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
      .value(function(d){return d.num;});

  var pie2 = d3.layout.pie()
      .sort(null)
      .value(function(d){return d;});

  var g = svg.selectAll('.arc')
    .data(pie2(data3))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc');

  g.append ('path')
    .attr('d',arc)
    .style('fill', "rgba(167,167,167,.2)")
    //.style('stroke','rgb(250,250,250)')
    //.style('stroke-width','2px')

  var g1 = svg.selectAll('.arc1')
    .data(pie(labels))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc1');

  g1.append ('path')
    .style('fill', function(d,i){return color(i)})
    //.style('stroke',function(d,i){return stroke(i)})
    //.style('stroke-width','2px')
    .transition().delay(100).duration(1500)
    .attrTween('d',tweenPie)

var g2 = svg.selectAll('.arc2')
    .data(pie(labels))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
    .attr('class','arc2');

var g3 = svg.selectAll('.arc3')
    .data(pie(labels))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w*.42 + "," + h/2 + ")")
    .attr('class','arc3');

g3.append ('text')
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr('class','pie_label')
    .attr('opacity',0).transition().delay(1200).attr('opacity',1)
    .attr('fill',function(d,i) {return color(labels[i].label)})
    .text(function(d,i) {return labels[i].label;})

var g4 = svg.selectAll('.arc4')
    .data(pie(labels))
    .enter()
    .append('g')
    .attr("transform", "translate(" + w*.42 + "," + h*.55 + ")")
    .attr('class','arc4');

g4.append ('text')
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr('class','pie_label')
    .attr('opacity',0).transition().delay(1200).attr('opacity',1)
    .attr('fill',function(d,i) {return color(labels[i].value)})
    .text(function(d,i) {return labels[i].value;})

var textPosX = w/2 - radius*.60;
var textPosY = h/2 + radius*.3 ;



/// animating the text on page 3    

d3.select('#text-1').style('opacity',0).transition().delay(300).duration(1000).style('opacity',1);
d3.select('#text-2').style('opacity',0).transition().delay(2000).duration(1000).style('opacity',1);





}).call(this);
