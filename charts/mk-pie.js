define([
    '../lib/d3'
], function () {
    function MKPieChart (element, options) {
        var op;

        this.options = {
            width       : 300,
            height      : 300,
            padding     : 10,
            line_width  : 5,
            radius      : 300 / 2,
            colors      : {
                yes     : 'green',
                no      : 'red',
                didnt   : 'transparent'
            },
            sort        : null,
            value       : function (d) { return d.votes; }
        };

        if ( options ) {
            for ( op in options ) {
                this.options[op] = options[op];
            }
        }

        // arc object definition
        this.arc = d3.svg.arc()
                        .outerRadius(this.options.radius - this.options.padding)
                        .innerRadius(this.options.radius - this.options.line_width);

        // pie layout
        this.pie = d3.layout.pie()
                        .sort(this.options.sort)
                        .value(this.options.value);

        // canvas
        this.canvas = d3.select(element).append('svg')
                .attr('width', this.options.width)
                .attr('height', this.options.height)
                .append('g')
                    .attr('transform', 'translate(' + this.options.width / 2 + ',' + this.options.height / 2 + ')');
    }

    MKPieChart.prototype = {
        constructor : MKPieChart,
        render      : function (data) {
            // arc containers
            var g = this.canvas.selectAll('.arc')
                                .data(this.pie(data))
                                .enter().append('g')
                                .attr('class', 'arc'),
                colors = this.options.colors;

            // arcs
            g.append('path')
                .attr('d', this.arc)
                .style('fill', function(d) { return colors[d.data.type]; });

            return this;
        }
    };

    return MKPieChart;
});