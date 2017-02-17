'use strict'
            
            fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
                .then(function(response) { 
	           // Convert to JSON
	           return response.json();
               }).then(function(j) {//j is the returned JavaScript object 
                    const myArr = j.data ;
                    const newDataSet = myArr.map(function(elem){
                    return  elem[1];
                })
                
                const newDates = myArr.map(function(elem){
                    switch(elem[0].slice(5,7)){
                        case '01':
                            var month = 'Jan. ' ;
                            break;
                        case '04':
                            var month = 'Apr. ' ;
                            break;
                        case '07':
                            var month = 'Jul. ' ;
                            break;
                        case '10':
                            var month = 'Oct. ' ;
                            break;
                    }
                    return month + elem[0].slice(0,4) + '\n'
                })
                
                console.log(newDates);
                const w = 800;
                const h = 600;
                const padding = 100;
                //scales for the data
                const yScale = d3.scaleLinear()
                                 .domain([0,d3.max(newDataSet)])//input min max of gdp values
                                 .range([h - padding, padding])//output
                
                const xScale = d3.scaleLinear()
                                 .domain([0,(newDataSet.length)])//input min max of gdp values
                                 .range([padding, w - padding])//output
                
                const svg = d3.select("#container")
                              .append("svg")
                              .attrs({"width":w, "height":h})

                svg.selectAll("rect")
                   .data(newDataSet)
                   .enter()
                   .append("rect")
                   .attrs({"x"     : (d, i) => xScale(i),
                           "y"     : d =>  yScale(d),
                           "width" : w/newDataSet.length,
                           "height": (d, i) => h - yScale(d) - padding,
                           "fill"  :"steelblue",
                            "class":"bar"})
                    .append('title')  //TOOLTIPS
                    .text( (d,i)=>
                      {
                        if ((myArr[i][1]+'').indexOf('.')==-1){ myArr[i][1] = myArr[i][1]+'.0'  }
        
                        if ((myArr[i][1]+'').length > 5){
                            var formattedGdp = (myArr[i][1]+'').slice(0,-5)  +','  +(myArr[i][1]+'').slice(-5)}    
                        else { var formattedGdp = (myArr[i][1]+'').slice(-5) }    
                
                    return newDates[i] + '$' +formattedGdp + ' Billions'
                        })
                //Axes
                const yAxis = d3.axisLeft(yScale);
                svg.append("g").attr("transform", "translate(100," + (0) + ")").call(yAxis);
                //xAxis Years
                const xAxisScale = d3.scaleLinear()
                                 .domain([1947,2015])
                                 .range([padding, w - padding])
                
                const xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format("d")) ;
                svg.append("g").attr("transform",  "translate(0," + (h - padding) + ")").call(xAxis);  
         
                //Graph texts
                svg.append('text').text('Gross Domestic Product')
                    .styles({"font-size":"40px" ,"font-weight":"600" })
                    .attrs({ "text-anchor":"middle" , "x":w/2 , "y":40 , "fill":"steelblue" });
                
                svg.append("text")
                    .attrs({"transform":"rotate(-90)" , "y":padding+15 , "x":-100})
                      .style("text-anchor", "end")
                      .text("Gross Domestic Product, USA");

                svg.append("text")
                      .attrs({ "x":w/2 , "y":(h)-padding/2 })
                      .styles({"text-anchor":"middle", "font-size":"12px"})
                      .text("Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National ");

                       svg.append("text")
                      .attr("y", (h+15)-padding/2 )
                      .attr("x",w/2)
                      .style("text-anchor", "middle").style('font-size','12px')
                       .text("Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)");
});
            