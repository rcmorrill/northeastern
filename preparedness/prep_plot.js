(function() {

// -------------- onClick ----------------------------------//


// this fuction makes forward arrow draw the nu graph the first time is clicked and go to page 5 the second time is clicked
$(document).ready(function(click){
  $("#front-special")
   .on('click', function(){

if ($(this).hasClass("first-click")) 
        window.location.href='pg-5.html';
      else
        draw_nu();   
        $("#front-special").addClass('first-click');
  })
});

// this fuction makes btn-6 draw the nu graph the first time is clicked and go to page 5 the second time is clicked
$(document).ready(function(click){
  $("#btn-6-special")
   .on('click', function(){

if ($(this).hasClass("first-click2")) 
        window.location.href='pg-5.html';
      else
        draw_nu();   
        $("#btn-6-special").addClass('first-click2');
  })
});

// $(document).ready(function(click){
//   $("#back-special")
//    .on('click', function(){

// if ($(this).hasClass("first-click3")) 
//         window.location.href='pg-3.html';
//       else
//         draw_nu();  //this needs to undraw the fuction/ make it false? !!!!!!!
//         $("#back-special").addClass('first-click3');
//   })
// });

//-------------resize -----------------------------------------------//

d3.select(window).on('resize', resize);

function resize(){
//adjust when window changes
    w = parseInt(d3.select('.prep_plot').style('width')),
    w = w - m.l - m.r,
    h = w * Ratio;
//update
    plot1
    .attr("width", (w + m.l + m.r) + 'px')
    .attr("height", (h + m.t + m.b) + 'px')
}


var m = {t:60,r:50,b:50,l:50},
    w = parseInt(d3.select('.prep_plot').style('width')),
    w = w - m.l - m.r,
    Ratio = .5,
    h = w * Ratio;

var plot1 = d3.select('#prep_plot')
  .append("svg")
  .attr("width", w + m.l + m.r)
  .attr("height", h + m.t + m.b)
  .append('g')
  .attr("transform", "translate(" + m.l + "," + m.t + ")")
  .attr("viewBox", "0 0 " + (w+m.l) + " " + (h+m.t))
  .attr("preserveAspectRatio", "xMinYMin");
//------------------------------------------------------------------------------//




// d3.select('#text-1').style('opacity',0).transition().delay(300).duration(1000).style('opacity',1);




var percentFormat = d3.format(".0%");

var scaleY = d3.scale.linear().domain([0,.50]).range([h,0]),
    scaleX = d3.scale.linear().domain([1,5]).range([0,w]);
    scaleX = d3.scale.ordinal().rangeRoundPoints([0, w]).domain(["Not at all", "Minimally", "Somewhat", "Very", "Highly"]);

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .ticks(5)
    .tickFormat(percentFormat)
    .orient("right");

var NullGen = d3.svg.area()
  .x(function(d) { return scaleX(d.label); })
  .y0(h)
  .y1(h);

var NeuAreaGenerator = d3.svg.area()
  .x(function(d){return scaleX(d.label);})
  .y0(h)
  .y1(function(d){return scaleY(d.NEU)});

var GradAreaGenerator = d3.svg.area()
  .x(function(d){return scaleX(d.label);})
  .y0(h)
  .y1(function(d){return scaleY(d.GRAD)});

//start wrapper ------------------------------------------------------//

      function drawPlot1(data){
        plot1.append('path')
          .attr('class','Grads')
          .datum(data)
          .attr('d',NullGen)
          .transition().duration(1500)
          .attr("d", GradAreaGenerator);
        plot1.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + h + ")")
              .call(xAxis);
        plot1.append("g")
              .attr("class", "y axis")
               .attr("transform", "translate(" + (w+8) + " ,0)")   
              .call(yAxis);        
      }
      //---------------------------------------------------------------------
        d3.csv ('preparedness/data/prep_plot.csv',parse,dataLoaded);
        function parse(d){
          return{
            label: d.text,
            NEU: +d.NEU,
            GRAD: +d.GRADS,
          }
        }
      function dataLoaded(err, data) {
          if (err) console.error(err);
        drawPlot1(data);
      }
 
//end wrapper------------------------------------------------------//

//d3.selectAll('.text-2').classed('hide',true);


//-----------------------------------------------------------------//
function draw_nu(){
      function drawPlot1(data){

        plot1.append('path')
          .attr('class','Neu-grads')
          .datum(data)
          .attr('d',NullGen)
          .transition().duration(1500)
          .attr("d", NeuAreaGenerator);
        d3.selectAll('.text-2').classed('hide',false).style('opacity',0).transition().delay(300).duration(1000).style('opacity',1);
        d3.selectAll('.text-1').classed('hide',true)

      }
      //---------------------------------------------------------------------
        d3.csv ('preparedness/data/prep_plot.csv',parse,dataLoaded);
        function parse(d){
          return{
            label: d.text,
            NEU: +d.NEU,
            GRAD: +d.GRADS,
          }
        }
      function dataLoaded(err, data) {
          // if (err) console.error(err);
        drawPlot1(data);
      }
} 
//-------------------------------------------------------------------//


}).call(this);