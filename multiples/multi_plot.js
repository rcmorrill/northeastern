(function() {
var multi_m = {t:20,r:30,b:40,l:30},
    multi_w = $('#skill_plot').width()/4 - multi_m.l - multi_m.r
    multi_h = 200;

var y = d3.scale.linear().range([multi_h,0]).domain([0,60]),
	x = d3.scale.linear().domain([1,6]).range([0,multi_w]);

var formatxAxis = d3.format('.0f');
var axisX = d3.svg.axis()
      .orient('bottom')
      .scale(x)
      .tickFormat(formatxAxis)
      .tickValues([1,2,3,4,5,6]);

var NeuAreaGenerator = d3.svg.area()
	.x(function(d){return x(d.label);})
	.y0(multi_h)
	.y1(function(d){return y(d.NEU)});

var GradAreaGenerator = d3.svg.area()
	.x(function(d){return x(d.label);})
	.y0(multi_h)
	.y1(function(d){return y(d.GRAD)});

var NullGen = d3.svg.area()
	.x(function(d){return x(d.label);})
	.y0(multi_h)
	.y1(multi_h);

		function drawskill(skill_data){

		var draw = d3.select('#skill_plot').selectAll('svg')
			.data(attributetypes)
			.enter()
			.append('svg').attr('class','multSvg')
			.attr('width',multi_w + multi_m.r + multi_m.l)
			.attr('height',multi_h + multi_m.t + multi_m.b)
			.append('g')
			.attr('transform','translate('+multi_m.l+','+multi_m.t+')');

		var anchor = draw.append('g').attr('class','anchor')

				anchor.append('text')
					.text('Very Unprepared')
					.attr('x',0)
					.attr('y',multi_h+multi_m.b*.8);


				anchor.append('text')
					.text('Very Prepared')
					.attr('x',multi_w)
					.style("text-anchor", "end")
					.attr('y',multi_h+multi_m.b*.8);


		draw.append('path')
			.attr('class','Grads')
			.attr('d', function(d){ return NullGen(d.values);})
			.transition().duration(1500)
			.attr('d', function(d){ return GradAreaGenerator(d.values);});

		draw.append('path')
			.attr('class','Neu-grads')
			.attr('d', function(d){ return NullGen(d.values);})
			.transition().duration(1500).delay(1500)
			.attr('d', function(d){ return NeuAreaGenerator(d.values);})

	draw.call(tooltip);

		draw.append('text')
			.attr("x", multi_m.l)
		     .attr("y", 15)
		     .attr('class','multText')
		     .style("text-anchor", "start")
		     .text(function(d) { return d.key; });


		draw.selectAll(".multText")
		      .call(wrap, multi_w);


		      //append axis
		draw.append('g').attr('class','multAxis')
		    .attr('transform','translate(0,'+multi_h+')')
			.call(axisX).attr('opacity',0);

/////////////////////////////////////////////////////
///////// tooltip setup /////////////////////////////
/////////////////////////////////////////////////////

var tipW = 200;
    tipH = 100;
var mt = 15;


scaleTipX = d3.scale.linear().domain([0,100]).range([0,tipW-(mt*2)]);//scale for tooltip


var plot2 = d3.select('.skill-tooltip')
				.append('svg')
				.attr('width',tipW)
				.attr('height',tipH)

//percentage and label neu

	plot2.append('text')
					.attr('x',mt)
					.attr('y',10)
					.attr('class','tooltip_percent_NEU')

	plot2.append('text')
					.attr('x',mt+35)
					.attr('y',10)
					.attr('class','tooltip_text_NEU2')


//neu rectangle
	//remainder bar
	plot2.append('rect')
					.attr('fill','rgba(160,160,160,.6)')
					.attr('x',mt)
					.attr('y',20)
					.attr('width',scaleTipX (100))
					.attr('height',10);

	//fill
	plot2.append('rect').attr('class','tooltip_rect_NEU')

//percentage and label grad

	plot2.append('text')
					.attr('x',mt)
					.attr('y',50)
					.attr('class','tooltip_percent_GRAD')
	plot2.append('text')
					.attr('x',mt+35)
					.attr('y',50)
					.attr('class','tooltip_text_GRAD2')



//grad rectangle
	//remainder bar
	plot2.append('rect')
					.attr('fill','rgba(160,160,160,.6)')
					.attr('x',mt)
					.attr('y',60)
					.attr('width',scaleTipX (100))
					.attr('height',10);
	//fill
	plot2.append('rect').attr('class','tooltip_rect_GRAD')

d3.selectAll('.anchor').attr('opacity',0)


	//--------------note: tooltip function had to be placed within the dataloaded function--------------
	function tooltip(tip){

	    tip.on('mouseenter',function(d){

	    	var tooltip = d3.select('.skill-tooltip');
	        	tooltip.classed('hide', false)//reveals toolip by assigning class with display = none

	        tooltip.transition()
	               .style('opacity',1);

	    	d3.select(this).select('.anchor').attr('opacity',1)
	    	d3.select(this).select('.multAxis').attr('opacity',1)

	         var gradNum = Math.round((d.values[4].GRAD)+(d.values[5].GRAD));
	         var neuNum = Math.round((d.values[4].NEU)+(d.values[5].NEU));



            tooltip.select('p').html("Percent of employers who feel"+"<br>"+" graduates are prepared (5 or 6)"+ "<br>" + "with respect to:" +"<br><br>" + "<strong>" + d.key + "</strong>");



	   
			tooltip.select('.tooltip_percent_NEU')
							.text(neuNum+'%')

			tooltip.select('.tooltip_text_NEU2')
				.text('Northeastern graduates')

			tooltip.select('.tooltip_percent_GRAD')
							.text(gradNum+'%')

					tooltip.select('.tooltip_text_GRAD2')
						.text('graduates in general')

	    	d3.select(this).classed('hover', true)

			tooltip.select('.tooltip_rect_GRAD')
							.transition()
							.attr('x',mt)
							.attr('y',60)
							.attr('width',scaleTipX(gradNum))
							.attr('height',10)
							.style('fill','rgb(100,100,100)')

			tooltip.select('.tooltip_rect_NEU')
							.transition()
							.attr('x',mt)
							.attr('y',20)
							.attr('width',scaleTipX(neuNum))
							.attr('height',10)
							.style('fill','rgb(231,108,100)');

	    })
	    .on('mouseleave', function(d){
	            d3.select('.skill-tooltip')
	                .classed('hide', true)
	    		
	    		d3.select(this).classed('hover', false)
	    		d3.select(this).select('.anchor').attr('opacity',0)
	    	d3.select(this).select('.multAxis').attr('opacity',0)
	    		// d3.select('.axis') .classed('hide', true);

	     })
	    .on('mousemove', function(d){
	            var xy = d3.mouse(document.getElementById('skill_plot'));
	            //this finds the xy of the mouse in relation to this element
	            d3.select('.skill-tooltip').style('opacity',1);

	            var left = xy[0], top = xy[1];

	            d3.select('.skill-tooltip')
	                .style('left', left + +40 + 'px')
	                .style('top', top - 50+ 'px');
	     })

	}// end tooltip function


		function wrap(text, width) {
		  text.each(function() {
		    var text = d3.select(this),
		        words = text.text().split(/\s+/).reverse(),
		        word,
		        line = [],
		        lineNumber = 0,
		        lineHeight = 1.1, // ems
		        y = text.attr("y"),
		        dy = parseFloat(text.attr("dy")),
		        tspan = text.text(null).append("tspan").attr("x", multi_m.l).attr("y", y).attr("dy", dy + "em");
		    while (word = words.pop()) {
		      line.push(word);
		      tspan.text(line.join(" "));
		      if (tspan.node().getComputedTextLength() > width) {
		        line.pop();
		        tspan.text(line.join(" "));
		        line = [word];
		        tspan = text.append("tspan").attr("x", multi_m.l).attr("y", y).attr("dy", ++lineNumber * lineHeight + .1 + "em").text(word);
		      }
		    }
		  });
		}
}
		d3.csv ('multiples/data/skill_plot.csv',parse,dataLoaded);

		function parse(d){
			return{
				question: d.question,
				label: +d.label,
				NEU: +d.NEU,
				GRAD: +d.GRADS,
			}
		}

		function dataLoaded(err, skill_data){

		attributetypes = d3.nest()
			.key(function(d) {return d.question})
			.entries(skill_data);

		drawskill(skill_data);

		}


}).call(this);


