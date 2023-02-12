(function ($) {
  "use strict"; // Start of use strict
  //line Morris
  var lineMorris = new Morris.Line({
    element: 'lineMorris',
    resize: true,
    data: [
      { y: '2016 Q1', Appointments: 20 },
      { y: '2016 Q2', Appointments: 15 },
      { y: '2016 Q3', Appointments: 34 },
      { y: '2016 Q4', Appointments: 7 },
      { y: '2017 Q1', Appointments: 31 },
      { y: '2017 Q2', Appointments: 18 },
      { y: '2017 Q3', Appointments: 70 },
      { y: '2017 Q4', Appointments: 32 },
      { y: '2018 Q1', Appointments: 15 },
      { y: '2018 Q2', Appointments: 53 }
    ],
    xkey: 'y',
    ykeys: ['Appointments'],
    labels: ['Appointments'],
    gridLineColor: '#eef0f2',
    lineColors: ['#E57498'],
    lineWidth: 2,
    hideHover: 'auto'
  });
  //barmorris
  var ctx = document.getElementById("barMorris");
  if (ctx === null) return;

  var chart = Morris.Bar({
    element: 'barMorris',
    data: [{
      y: '2012',
      a: 20
    }, {
      y: '2013',
      a: 45
    }, {
      y: '2014',
      a: 56
    }, {
      y: '2015',
      a: 35
    }, {
      y: '2016',
      a: 18
    }, {
      y: '2017',
      a: 28
    }, {
      y: '2018',
      a: 20
    }],
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Patients'],
    barColors: ['#FF7D00'],
    barOpacity: 1,
    barSizeRatio: 0.5,
    hideHover: 'auto',
    gridLineColor: '#eef0f2',
    resize: true
  });
  // morris donut charts
  if($("#donutMorris").length == 1){
   var $donutData = [
    { label: "Pending", value: 30 },
    { label: "Completed", value: 29 },
    { label: "Cancelled", value: 45 }
  ];
  Morris.Donut({
    element: 'donutMorris',
    data: $donutData,
    barSize: 0.1,
    labelColor: '#3e5569',
    resize: true, //defaulted to true
    colors: ['#FFAA2A', '#ef6e6e', '#22c6ab']
  });
  }
  
  // visit chart
  if($("#visitMorris").length == 1){
  var chart = Morris.Area({
    element: 'visitMorris',
    data: [{
      period: '2010',
      SiteA: 0,
      SiteB: 0,

    }, {
      period: '2011',
      SiteA: 130,
      SiteB: 100,

    }, {
      period: '2012',
      SiteA: 60,
      SiteB: 80,

    }, {
      period: '2013',
      SiteA: 180,
      SiteB: 200,

    }, {
      period: '2014',
      SiteA: 280,
      SiteB: 100,

    }, {
      period: '2015',
      SiteA: 170,
      SiteB: 150,
    },
    {
      period: '2016',
      SiteA: 200,
      SiteB: 80,

    }, {
      period: '2017',
      SiteA: 0,
      SiteB: 0,

    }],
    xkey: 'period',
    ykeys: ['SiteA', 'SiteB'],
    labels: ['Site A', 'Site B'],
    pointSize: 0,
    fillOpacity: 1,
    pointStrokeColors: ['#5867c3', '#00c5dc'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 0,
    smooth: false,
    hideHover: 'auto',
    lineColors: ['#5867c3', '#00c5dc'],
    resize: true
  });
}
  
})(jQuery);
