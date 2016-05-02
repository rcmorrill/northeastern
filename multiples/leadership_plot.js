(function() {
/////////////////////////////////////////////////////////////////
//define sizes///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


var main_m = {t:50,r:100,b:50,l:50};
    main_w = $('#leadership_plot').width() - main_m.r - main_m.l,
    main_h = $('#leadership_plot').height() - main_m.t - main_m.b,

    // multi_m = {t:20,r:10,b:50,l:50},
    // multi_w = $('.multi').width(),
    // multi_h = $('.multi').height(),

    map_m = {t:20,r:10,b:50,l:50},
    map_w = $('.map').width(),
    map_h = $('.map').height();




var plot1 = d3.select('#leadership_plot')
    .append('svg')
    .attr('width',main_w  +main_m.r + main_m.l)
    .attr('height',main_h + main_m.t + main_m.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+main_m.l+','+main_m.t+')');




  // var scales= {};
  // scales.mainX =
  // scales.mainY =
  // scales.multiX =
  // scales.multiY =
  // scales.color =


  // var NUPrepGen = d3.area()
  // var GenPrepGen = d3.area()

  // var NULeadGen = d3.area()
  // var GenLeadGen = d3.area()

  // var MultiNUGen = d3.area()
  // var MultiGenGen = d3.area()


/////////////////////////////////////////////////////////////////
//define plots///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


  
// var prep_plot = d3.select('#prep_plot')
// var leadership = d3.select('#leadership')
// var skill_plot = d3.select("#skill_plot")
// var attr_plot = d3.select("#attr_plot")
// var us_map = d3.select("#us_map")
// var treemap = d3.select("#treemap")

/////////////////////////////////////////////////////////////////
//Create ButtonController////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// $(function() { 
//     $('.mypagination li').each(function() { 
//         if ($(this).children('a').attr('href') == window.location.pathname)
//         {
//             $(this).addClass('active');
//         }
//     });
// })





//page 6////////////////////////////////////////

$(document).ready(function(){
    $("#btn-6").on('click', function(){
    $(".scene").hide(); 
    $("#scene-6").show();

var text = d3.select('.rightbottom')
            text.select('p').html("");

var text = d3.select('.righttop')
            text.select('p').html("This is going to explain what was specifically asked in the attributes questions. This is going to explain what was specifically asked in the attributes questions");
 

$('#leadership_plot path').remove();

    init_visual();   
       $("#btn-7").css({'opacity': .5,});   

})});
//end page ////////////////////////////////////////
//page 7////////////////////////////////////////

$(document).ready(function(){
    $("#btn-7").on('click', function(){
    $(".scene").hide(); 
    $("#scene-6").show();
    var text = d3.select('.rightbottom')
                text.select('p').html("");

    var text = d3.select('.righttop')
                text.select('p').html("This is going to explain what was specifically asked in the attributes questions. This is going to explain what was specifically asked in the attributes questions");
      
    init_visual2();      

   $("#btn-7").css({'opacity': 1,});

  })});
//end page ////////////////////////////////////////



var percentFormat = d3.format(".0%");

var scaleY = d3.scale.linear().domain([0,.50]).range([main_h,0]),
  scaleX = d3.scale.linear().domain([1,6]).range([0,main_w]);

var xAxis = d3.svg.axis()
 .ticks(6)
    .scale(scaleX)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .ticks(5)
    .tickFormat(percentFormat)
    .orient("right");

var NullGen = d3.svg.area()
  .x(function(d) { return scaleX(d.label); })
  .y0(main_h)
  .y1(main_h);

var NeuAreaGenerator = d3.svg.area()
  .x(function(d){return scaleX(d.label);})
  .y0(main_h)
  .y1(function(d){return scaleY(d.NEU)});

var GradAreaGenerator = d3.svg.area()
  .x(function(d){return scaleX(d.label);})
  .y0(main_h)
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
              .attr("transform", "translate(0," + main_h + ")")
              .call(xAxis);
        plot1.append("g")
              .attr("class", "y axis")
               .attr("transform", "translate(" + (main_w+8) + " ,0)")   
              .call(yAxis);        
      }
      //---------------------------------------------------------------------
        d3.csv ('multiples/data/leadership_plot.csv',parse,dataLoaded);
        function parse(d){
          return{
            label: +d.label,
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
        plot1.append('path')
          .attr('class','Neu-grads')
          .datum(data)
          .attr('d',NullGen)
          .transition().duration(1500)
          .attr("d", NeuAreaGenerator);
      }
      //---------------------------------------------------------------------
        d3.csv ('multiples/data/leadership_plot.csv',parse,dataLoaded);
        function parse(d){
          return{
            label: +d.label,
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


}).call(this);