requirejs.config({
    paths   : {
        d3  : '../lib/d3'
    }
});
requirejs([
    '../charts/mk-pie'
], function (MKPieChart) {

    var chart = document.getElementById('chart'),
        data_attrs = chart.dataset,
        pie_data = [],
        pie_order = ['for', 'noVote', 'abstain', 'against'],
        k;
    
    for (k in data_attrs) {
        pie_data.push({type: k, votes: data_attrs[k]});
    }
    pie_data.sort(function (a, b) {
        return pie_order.indexOf(a.type) - pie_order.indexOf(b.type);
    });
    new MKPieChart(chart, {
        width       : 90,
        height      : 89,
        padding     : 0,
        line_width  : 6
    }).render(pie_data);
});
