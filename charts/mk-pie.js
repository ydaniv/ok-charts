(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['d3'], function () {
            return factory(root);
        });
    } else {
        // if not using an AMD library set the global `uijet` namespace
        root.MKPieChart = factory(root);
    }
}(this, function () {
    function MKPieChart (element, options) {
        var op;

        this.options = {
            width       : 300,
            height      : 300,
            padding     : 10,
            line_width  : 5,
            radius      : 300 / 2,
            classes     : {
                yes     : 'good',
                no      : 'bad',
                didnt   : 'no-vote'
            },
            sort        : null,
            value       : function (d) { return d.votes; }
        };
        this.$element = d3.select(element);

        if ( options ) {
            for ( op in options ) {
                this.options[op] = options[op];
            }
            if ( ! ('radius' in options) ) {
                this.options.radius = Math.min(this.options.width, this.options.height) / 2;
            }
        }

        var line_width = this.options.line_width,
            line_width_factor = line_width / 2;
        this.options.width = this.options.width + line_width;
        this.options.height = this.options.height + line_width;

        // arc object definition
        this.arc = d3.svg.arc()
            .outerRadius(this.options.radius - this.options.padding + line_width_factor)
            .innerRadius(this.options.radius - this.options.padding - line_width_factor);

        // pie layout
        this.pie = d3.layout.pie()
            .sort(this.options.sort)
            .value(this.options.value);

        // canvas
        this.canvas = this.$element.append('svg')
            .attr('width', this.options.width)
            .attr('height', this.options.height)
            .style('position', 'relative')
            .style('top', -line_width_factor + 'px')
            .style('left', line_width_factor + 'px')
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
                classes = this.options.classes;

            // arcs
            g.append('path')
                .attr('d', this.arc)
                .classed('good', function(d) { return classes[d.data.type] == 'good'; })
                .classed('bad', function(d) { return classes[d.data.type] == 'bad'; })
                .classed('no-vote', function(d) { return classes[d.data.type] == 'no-vote'; });
            return this;
        }
    };

    return MKPieChart;
}));