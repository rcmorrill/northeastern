(function() {
/////////////////////////////////////////////////////////////////
//define sizes///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


var m = {t:50,r:100,b:50,l:50};
    w = $('.prep_plot').width() - m.r - m.l,
    h = $('.prep_plot').height() - m.t - m.b;

var plot1 = d3.select('#prep_plot_gen')
    .append('svg')
    .attr('width',w  +m.r + m.l)
    .attr('height',h + m.t + m.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+m.l+','+m.t+')');

var plot2 = d3.select('#prep_plot_nu')
    .append('svg')
    .attr('width',w  +m.r + m.l)
    .attr('height',h + m.t + m.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+m.l+','+m.t+')');

//page 6////////////////////////////////////////

$(document).ready(function(){
    $("#btn-6").on('click', function(){
    $(".scene").hide(); 
    $("#scene-6").show();

var text = d3.select('.rightbottom')
            text.select('p').html("");

var text = d3.select('.righttop')
            text.select('p').html("This is going to explain what was specifically asked in the attributes questions. This is going to explain what was specifically asked in the attributes questions");
 

$('#prep_plot_gen path').remove();
$('#prep_plot_gen text').remove();
    init_visual();   
       // $("#btn-7").css({'opacity': .5,});   

})});
//end page ////////////////////////////////////////
//page 7////////////////////////////////////////

$(document).ready(function(){
    $("#btn-7").on('click', function(){
    $(".scene").hide(); 
    $("#scene-7").show();
    var text = d3.select('.rightbottom')
                text.select('p').html("");

    var text = d3.select('.righttop')
                text.select('p').html("This is going to explain what was specifically asked in the attributes questions. This is going to explain what was specifically asked in the attributes questions");
    
    $('#prep_plot_nu path').remove();
    $('#prep_plot_nu text').remove();
    init_visual2();      

   // $("#btn-7").css({'opacity': 1,});

  })});
//end page ////////////////////////////////////////



var percentFormat = d3.format(".0%");

var scaleY = d3.scale.linear().domain([0,.50]).range([h,0]),
  scaleX = d3.scale.linear().domain([1,5]).range([0,w]);
  scaleX = d3.scale.ordinal().rangeRoundPoints([0, w]).domain(["Not at all", "Minimally", "Somewhat", "Very", "Highly"]);

var xAxis = d3.svg.axis()
    // .ticks(5)
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

//start wrapper ///////////////////////////////////////////////////
function init_visual(){
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
} 
//end wrapper ///////////////////////////////////////////////////
//start wrapper ///////////////////////////////////////////////////
function init_visual2(){
      function drawPlot1(data){
        plot2.append('path')
          .attr('class','Grads')
          .datum(data)
          .attr("d", GradAreaGenerator);

        plot2.append('path')
          .attr('class','Neu-grads')
          .datum(data)
          .attr('d',NullGen)
          .transition().duration(1500)
          .attr("d", NeuAreaGenerator);

        plot2.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + h + ")")
              .call(xAxis);
        plot2.append("g")
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
          // if (err) console.error(err);
        drawPlot1(data);
      }
} 
//end wrapper ///////////////////////////////////////////////////


}).call(this);