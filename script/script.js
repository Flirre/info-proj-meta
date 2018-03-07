var lineChart, test;
var svgLine = dimple.newSvg("#theftsContainer", 590, 410);
var timesec = 3000;

$('#totalnr').animateNumber({ number: 977 }, timesec);
$('#theftnr').animateNumber({ number: 541 }, timesec*0.554);
$('#accessnr').animateNumber({ number: 154 }, timesec*0.4);
$('#othersnr').animateNumber({ number: 94 }, timesec*0.4);
$('#lossnr').animateNumber({ number: 86 }, timesec*0.4);
$('#hacknr').animateNumber({ number: 64 }, timesec*0.4);
$('#dissnr').animateNumber({ number: 38 }, timesec*0.4);


function drawTheftsPlot() {
  d3.tsv("https://dl.dropbox.com/s/m616ci5b4y8dqhb/breaches%20%283%29.xlsx%20-%20Taul1.tsv?dl=0", function (data) {
    lineChart = new dimple.chart(svgLine, data);
    lineChart.setBounds(60, 70, 505, 305);

    var x = lineChart.addCategoryAxis("x", "Year");
    x.addOrderRule("Date");
    x.overrideMax = 500;
    x.overrideMin = 0;

    lineChart.assignColor('Theft', '#1b9e77');
    lineChart.assignColor('Loss', '#d95f02');
    lineChart.assignColor('Other / Unknown', '#7570b3');
    lineChart.assignColor('Hacking/IT Incident', '#e7298a');
    lineChart.assignColor('Unauthorized Access/Disclosure', '#66a61e');
    lineChart.assignColor('Improper Disposal', '#e6ab02');

    lineChart.addMeasureAxis("y", "Incidents");
    lineChart.addSeries("Type", dimple.plot.line);

    lineChart.addLegend(0, 10, 700, 200, "right");

    lineChart.draw(750);
  });
}

function filterType(event) {
    d3.tsv("https://dl.dropbox.com/s/m616ci5b4y8dqhb/breaches%20%283%29.xlsx%20-%20Taul1.tsv?dl=0", function (data) {
        if (event.target.value !== 'Type') {
            lineChart.data = dimple.filterData(data, "Type", event.target.value);
        } else {
            lineChart.data = data;
        }

        lineChart.draw(750);
    });
}

document.querySelector("#type-filter").addEventListener('change', filterType);


function drawBarChart () {
    var svg = dimple.newSvg("#barChartContainer", 690, 500);

    d3.tsv("https://dl.dropbox.com/s/6pzken4xjnpgmf2/breaches%20%283%29.xlsx%20-%20Blad1.tsv?dl=0", function (data) {
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 45, 510, 315)
        console.log(data);
        var x = myChart.addCategoryAxis("x", "Type_of_Breach");
        x.colors = ['red', 'yellow'];
        myChart.addMeasureAxis("y", "Affected Individuals");
        myChart.addSeries("Type_of_Breach", dimple.plot.bar);

        myChart.assignColor("Theft", "red");

        myChart.assignColor('Theft', '#1b9e77');
        myChart.assignColor('Loss', '#d95f02');
        myChart.assignColor('Other / Unknown', '#7570b3');
        myChart.assignColor('Hacking/IT Incident', '#e7298a');
        myChart.assignColor('Unauthorized Access/Disclosure', '#66a61e');
        myChart.assignColor('Improper Disposal', '#e6ab02');

        myChart.draw();

        x.shapes.selectAll('text').attr('transform', function () {
                var transformAttributeValue = d3.select(this).attr('transform');

                if (transformAttributeValue) {
                    transformAttributeValue = transformAttributeValue.replace('rotate(90,', 'rotate(45,');
                }

                return transformAttributeValue;
        });
    });
}

var damaged_csv = "https://dl.dropbox.com/s/7koek9msjpybdgq/infovisdata.csv?dl=0";
const stateCSV = "https://dl.dropbox.com/s/vnh8oyl7d5pl37b/breaches-ByState.csv?dl=0";

function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
	"<tr><td>Hacking</td><td>"+(d.hacking)+"</td></tr>"+
	"<tr><td>Disposal</td><td>"+(d.improper)+"</td></tr>"+
	"<tr><td>Loss</td><td>"+(d.loss)+"</td></tr>"+
	"<tr><td>Other</td><td>"+(d.other)+"</td></tr>"+
	"<tr><td>Theft</td><td>"+(d.theft)+"</td></tr>"+
	"<tr><td>Unauth. access</td><td>"+(d.disclosure)+"</td></tr>"+
	"<tr><td>Breach factor</td><td>"+(((d.sum/d.population)*100000).toFixed(3))+"</td></tr>"+
	"<tr><td>Total</td><td>"+(d.sum)+"</td></tr>"+
	"</table>";
}


d3.csv(stateCSV, function(data) {
    data.forEach(function(d) {
	var state = d["State"],
	    hacking = d["Hacking/IT Incident"],
	    improper = d["Improper Disposal"],
	    loss = d["Loss"],
	    other = d["Other / Unknown"],
	    theft = d["Theft"],
	    disclosure = d["Unauthorized Access/Disclosure"],
	    population = d["Population"],
	    sum = d["Totalsumma"];
	data[state]={hacking:hacking, improper:improper, loss:loss, other:other, theft:theft, disclosure:disclosure, population:population, sum:sum, color:d3.interpolate("#ffffcc", "#800026")((sum/population)*100000)};
    }),
    loaded_stateData = data;
    uStates.draw("#statesvg", data, tooltipHtml);
    drawTheftsPlot();
    drawBarChart();
});
// US state sins end here



document.addEventListener('DOMContentLoaded', function() {
    var sets = [
        { sets: [0], label: "Desktop Computer",	size: 144 },
        { sets: [1], label: "E-mail", size: 57 },
        { sets: [2], label: "E-Medical Record", size: 36 },
        { sets: [3], label: "Laptop", size: 244 },
        { sets: [4], label: "Network Server", size: 125 },
        { sets: [5], label: "Paper", size: 235 },
        { sets: [6], label: "Other Portable  e-Device",	size: 122 },
        { sets: [7], label: "Other", size: 176 },

        { sets: [0, 1],	size: 1 },
        { sets: [0, 2],	size: 2 },
        { sets: [0, 4],	size: 8 },
        { sets: [0, 4, 1, 2, 5], size: 1 },
        { sets: [0, 4, 2],	size: 1 },
        { sets: [0, 4, 6, 7], size: 1 },
        { sets: [0, 7],	size: 2 },
        { sets: [0, 6],	size: 1 },
        { sets: [0, 6, 7],	size: 1 },
        { sets: [0, 5],	size: 4 },

        { sets: [1, 7],	size: 1 },
        { sets: [1, 6],	size: 2 },

        { sets: [2, 5],	size: 3 },

        { sets: [3, 0],	size: 7 },
        { sets: [3, 0, 4, 1],	size: 6 },
        { sets: [3, 0, 4, 1, 6, 7, 2],	size: 1 },
        { sets: [3, 0, 4, 1, 6, 7, 2, 5],	size: 1 },
        { sets: [3, 0, 6, 7],	size: 1 },
        { sets: [3, 2],	size: 1 },
        { sets: [3, 4],	size: 2 },
        { sets: [3, 4, 1],	size: 1 },
        { sets: [3, 6],	size: 7 },
        { sets: [3, 6, 5],	size: 1 },
        { sets: [3, 5],	size: 5 },

        { sets: [4, 1],	size: 2 },
        { sets: [4, 2],	size: 2 },
        { sets: [4, 7],	size: 1 },

        { sets: [6, 7],	size: 53 },
        { sets: [6, 7, 2],	size: 2 },

        { sets: [7, 2],	size: 1 },
        { sets: [7, 5],	size: 4 },
    ];

    var chart = venn.VennDiagram();
    var vennElem = d3.select('#venn');
    vennElem.datum(sets).call(chart);

    // add a tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    // add listeners to all the groups to display tooltip on mouseover
    vennElem.selectAll("g")
        .on("mouseover", function(d, i) {
            // sort all the areas relative to the current item
            venn.sortAreas(vennElem, d);

            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", .9);
            tooltip.text(d.size + " cases");

            // highlight the current path
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 3)
                .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                .style("stroke-opacity", 1);
        })

        .on("mousemove", function() {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })

        .on("mouseout", function(d, i) {
            tooltip.transition().duration(400).style("opacity", 0);
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 0)
                .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                .style("stroke-opacity", 0);
        });
});
