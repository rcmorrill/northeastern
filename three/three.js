

(function() {
  // var multi_m = {t:20,r:30,b:40,l:30},
  //   width = $('#three').width(),
  //   height = $('#three').height();
  var g,
      colorId,
      numNodes = 3000,
      nodes = [],
      width = 475,
      height = 500,
      padding = 10,
      minR = 2.5,
      maxR = 2.5,
      position = "positive",
      scales = {
        x: d3.scale.linear()
                  .domain([0, numNodes])
                  .range([(width/25)*-1, width/40]),
        y: d3.scale.linear()
                  .domain([0, numNodes])
                  .range([(height/25)*-1, height/35]),
        r: d3.scale.sqrt()
                  .domain([1, 10])
                  .range([minR, maxR])
      };

  function randomRadius() {
    return scales.r(Math.floor(Math.random() * 10) + 1);
  }

  for (i=0; i<numNodes; i++) {
    colorId = Math.random() * 10;
    nodes.push({
      id: i,
      r: randomRadius(),
      cx: scales.x(i),
      cy: scales.y(Math.floor(Math.random()*numNodes)),
    });
  }

  var svg = d3.select("#three").append("svg")
                .attr({
                  width: width,
                  height: height
                }),

      force = d3.layout.force()
                    .nodes(nodes)
                    .links([])
                    .size([width, height])
                    .charge(function(d) {
                      return -1 * (Math.pow(d.r * 5.0, 2.0) / 8);
                    })
                    .gravity(2.75)
                    .on("tick", tick);

  function update(nodes) {
    g = svg.selectAll("g.node")
              .data(nodes, function(d, i) {
                return d.id;
              });

    g.enter().append("g")
                .attr({
                  "class": "node"
                });


    if (g.selectAll("circle").empty()) {
      circle = g.append("circle")
                  .attr({
                    r: function(d) {
                      return d.r;
                    }
                  })
                  .style('fill','rgba(231,108,100,.3)');


    } else {
      circle.transition()
          .duration(1000)
          .attr({
            r: function(d) {
              return d.r;
            }
          })
    }

    g.exit().remove();

    force.nodes(nodes).start();
  }

  // Adapted from http://bl.ocks.org/3116713
  function collide(alpha, nodes, scale) {
    quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      r = d.r + scale.domain()[1] + padding
      nx1 = d.x - r;
      nx2 = d.x + r;
      ny1 = d.y - r;
      ny2 = d.y + r;
      return quadtree.visit(function(quad, x1, y1, x2, y2) {
        var l, x, y;
        if (quad.point && quad.point !== d) {
          x = d.x - quad.point.x;
          y = d.y - quad.point.y;
          l = Math.sqrt(x * x + y * y);
          r = d.r + quad.point.r + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  };

  // See https://github.com/mbostock/d3/wiki/Force-Layout
  function tick(e) {
    k = 10 * e.alpha;
    nodes.forEach(function(d, i) {
      d.x += k * d.cx;
      d.y += k * d.cy;
    });

    g.each(collide(.1, nodes, scales.r))
      .attr({
        transform: function(d, i) {
          return "translate(" + d.x + "," + d.y + ")";
        }
      });
  };

  update(nodes);

  d3.selectAll("button").on("click", function() {
    var sort = this.getAttribute("value");
    nodes.forEach(function(node) {
      if (sort === "positive") {
        node.cx = scales.x(node.id);
      }
      else if (sort === "negative") {
        node.cx = scales.x(numNodes-node.id);
      }
      else if (sort === "color") {
        node.cx = scales.colorX(node.colorId);
      }
      node.r = randomRadius();
    });
    update(nodes);
  });

}());
