var tree = {
    name: "tree",
    children: [
        { name: "Business", size: 110, label: "Business" },
        { name: "Health Care and Social Assistance", size: 83, label: "Health Care and Social Assistance" },
        { name: "Construction", size: 81, label: "Construction" },
        { name: "Professional, Scientific, and Technical Services", size: 79},
        { name: "Manufacturing", size: 69 },
        { name: "Other", size: 63 },
        { name: "Educational Services", size: 59 },
        { name: "Retail Trade", size: 51 },
        { name: "Finance and Insurance", size: 50 },
        { name: "Arts, Entertainment, and Recreation", size: 47 },
        { name: "Science/Technology", size: 46 },
        { name: "Information", size: 38 },
        { name: "Accommodation and Food Services", size: 36 },
        { name: "Administrative and Support and Waste Management and Remediation Services", size: 27 },
        { name: "Non-profit", size: 25 },
        { name: "Transportation and Warehousing", size: 25 },
        { name: "Real Estate Rental and Leasing", size: 22 },
        { name: "Public Administration/Government", size: 20 },
        { name: "Agriculture, Forestry, Fishing and Hunting", size: 17 },
        { name: "Wholesale Trade", size: 16 },
        { name: "Other Services (except Public Administration/Government)", size: 12 },
        { name: "Media/Communications", size: 10 },
        { name: "Utilities", size: 9 },
        { name: "Management of Companies and Enterprises", size: 8 },
        { name: "Mining", size: 4 }
      
      //reference new column for labels
    ]
};
var tree_m = {t:0,r:10,b:50,l:50},
    tree_w = $('#treemap').width(),
    tree_h = $('#treemap').height(),



  color = d3.scale.linear().domain([4, 110]).range(['#e9e9e9', '#e9e9e9']);

    div = d3.select("#treemap").append("div")
       .style("position", "relative");

var treemap = d3.layout.treemap()
    .size([tree_w, tree_h])
    .sticky(true)
    .value(function(d) { return d.size; });
 
var node = div.datum(tree).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background-color", function(d) {
          return d.name == 'tree' ? '#fff' :  color(d.size); })
      
      .style("font-size", function(d) {
          return Math.max(0, 0.12*Math.sqrt(d.area))+'px'; })

   
      .on("mouseover", treetip)
      .on("mousemove", tipmove)
      .on("mouseout", tipoff)
      .append('div');
      
 node.append("text").text(function(d) { return d.children ? null : d.label; });

////////////////////////////////////////////////
//tool tip /////////////////////////////////////
////////////////////////////////////////////////

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}
function treetip(d){
    var tooltip = d3.select('.treetip')
        .style('visibility','visible');
    tooltip
    .select('p').html(d["name"]);
}
function tipoff(d){
 var tooltip = d3.select('.treetip')
    .style('visibility','hidden'); 
  tooltip
    .select('p').html("");
}
function tipmove(d){
 var xy = d3.mouse(document.getElementById('treemap'));
          d3.select('.treetip').style('opacity',1);
          var left = xy[0], top = xy[1];
          d3.select('.treetip')
              .style('left', left + +40 + 'px')
              .style('top', top - 50+ 'px');
}

