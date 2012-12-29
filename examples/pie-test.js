require([
    '../charts/mk-pie'
], function (MKPieChart) {
    var testdata = [{
        label   : 'Yes',
        type    : 'yes',
        votes   : 5
    }, {
        label   : "Didn't Vote",
        type    : 'didnt',
        votes   : 10
    }, {
        label   : 'No',
        type    : 'no',
        votes   : 8
    }];

    var chart = new MKPieChart('#chart').render(testdata);
});