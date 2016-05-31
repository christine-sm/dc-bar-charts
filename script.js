var data = [{
    Category: "A",
    ID: "1"
}, {
    Category: "A",
    ID: "1"
}, {
    Category: "A",
    ID: "1"
}, {
    Category: "A",
    ID: "2"
}, {
    Category: "A",
    ID: "2"
}, {
    Category: "B",
    ID: "1"
}, {
    Category: "B",
    ID: "1"
}, {
    Category: "B",
    ID: "1"
}, {
    Category: "B",
    ID: "2"
}, {
    Category: "B",
    ID: "3"
}, {
    Category: "B",
    ID: "3"
}, {
    Category: "B",
    ID: "3"
}, {
    Category: "B",
    ID: "4"
}, {
    Category: "C",
    ID: "1"
}, {
    Category: "C",
    ID: "2"
}, {
    Category: "C",
    ID: "3"
}, {
    Category: "C",
    ID: "4"
}, {
    Category: "C",
    ID: "4"
}, {
    Category: "C",
    ID: "5"
}];

var ndx = crossfilter(data);

var XDimension = ndx.dimension(function (d) {
    return d.Category;
});

var YDimension = XDimension.group().reduceCount(function (d) {
    return d.value;
});


dc.barChart("#Chart")
    .width(480).height(300)
    .dimension(XDimension)
    .group(YDimension)
    .transitionDuration(500)
    .xUnits(dc.units.ordinal)
    .x(d3.scale.ordinal().domain(XDimension))
    .renderlet(function (chart) {

    var barsData = [];
    var bars = chart.selectAll('.bar').each(function (d) {
        barsData.push(d);
    });
    console.log(bars);

    //Remove old values (if found)
    d3.select(bars[0][0].parentNode).select('#inline-labels').remove();
    //Create group for labels
    var gLabels = d3.select(bars[0][0].parentNode).append('g').attr('id', 'inline-labels');

    console.log(gLabels);

    for (var i = bars[0].length - 1; i >= 0; i--) {

        var b = bars[0][i];
        //Only create label if bar height is tall enough
        if (+b.getAttribute('height') < 18) continue;

        gLabels.append("text")
            .text(barsData[i].data.value)
            .attr('x', +b.getAttribute('x') + (b.getAttribute('width') / 2))
            .attr('y', +b.getAttribute('y') + 15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white');
            console.log(barsData[i].data.value);
    }

})


dc.renderAll();
