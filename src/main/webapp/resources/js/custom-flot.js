(function ($) {
  "use strict"; // Start of use strict
  //flot charts
  var container = $("#movingLineFlot");
  // Determine how many data points to keep based on the placeholder's initial size;
  // this gives us a nice high-res plot while avoiding more than one point per pixel.
  var maximum = container.outerWidth() / 2 || 300;
  var data = [];
  function getRandomData() {
    if (data.length) {
      data = data.slice(1);
    }
    while (data.length < maximum) {
      var previous = data.length ? data[data.length - 1] : 50;
      var y = previous + Math.random() * 10 - 5;
      data.push(y < 0 ? 0 : y > 100 ? 100 : y);
    }
    // zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }
    return res;
  }
  var series = [{
    data: getRandomData(),
    lines: {
      fill: true
    }
  }];

  var plot = null;

  var FlotFunc = function () {
    plot = $.plot(container, series, {
      colors: ["#e6614f"],
      grid: {
        borderWidth: 0,
        minBorderMargin: 20,
        labelMargin: 10,
        backgroundColor: {
          colors: ["#fff", "#fff"]
        },
        margin: {
          top: 8,
          bottom: 20,
          left: 0
        },

        markings: function (axes) {
          var markings = [];
          var xaxis = axes.xaxis;
          for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 1) {
            markings.push({
              xaxis: {
                from: x,
                to: x + xaxis.tickSize
              },
              color: "#fff"
            });
          }
          return markings;
        }
      },
      xaxis: {
        show: false,
        tickFormatter: function () {
          return "";
        }
      },
      yaxis: {
        min: 0,
        max: 110
      },
      legend: {
        show: true
      }
    });

  }

  FlotFunc();

  // Update the random dataset at 25FPS for a smoothly-animating chart
  setInterval(function updateRandom() {
    series[0].data = getRandomData();
    plot.setData(series);
    plot.draw();
  }, 40);
  //line charts

  var offset = 0;

  var sin = [],
    cos = [];
  for (var i = 0; i < 7; i += 0.2) {
    sin.push([i, Math.sin(i + offset)]);
    cos.push([i, Math.cos(i + offset)]);
  }

  var options = {
    series: {
      lines: {
        show: true
      },
      points: {
        show: true
      }
    },
    grid: {
      hoverable: true, //IMPORTANT! this is needed for tooltip to work
      color: "#AFAFAF",
      borderWidth: 0,
      backgroundColor: '#FFF'
    },
    yaxis: {
      min: -1.2,
      max: 1.2
    },
    colors: ["#007bb6", "#f0ad4e"],
    tooltip: true,
    tooltipOpts: {
      content: "'%s' of %x.1 is %y.4",
      shifts: {
        x: -60,
        y: 25
      }
    }
  };

  var plotObj = function () {
    $.plot($("#lineFlot"), [{
      data: sin,
      label: "&nbsp; sin(x)",
    }, {
      data: cos,
      label: "&nbsp; cos(x)"
    }],
      options);
  }

  plotObj();

  //bar flot charts
  var barOptions = {
    series: {
      bars: {
        show: true,
        barWidth: 0.5
      }
    },
    xaxis: {
      mode: "time",
      timeformat: "%m/%d",
      minTickSize: [2, "day"]
    },
    grid: {
      hoverable: true,
      color: "#AFAFAF",
      borderWidth: 0,
      backgroundColor: '#FFF'
    },
    legend: {
      show: false
    },
    tooltip: true,
    tooltipOpts: {
      content: "x: %x, y: %y"
    }
  };
  var barData = {
    label: "bar",
    color: "#51d2b7",
    data: [
      [1, 5000],
      [2, 3000],
      [3, 6000],
      [4, 2000],
      [5, 4000],
      [6, 7000]
    ]
  };
  $.plot($("#barFlot"), [barData], barOptions);

  //sales bars charts
  var d1 = [];
  var i = 0;
  // for (i = 0; i <= 5; i += 1)
  // d1.push([i, parseInt(Math.random() * 60)]);

  var d2 = [];
  for (i = 0; i <= 5; i += 1)
    d2.push([i, parseInt(Math.random() * 60)]);

  var d3 = [];
  for (i = 0; i <= 5; i += 1)
    d3.push([i, parseInt(Math.random() * 40)]);

  var ds = [];

  ds.push({
    label: "Data One",
    data: d2,
    bars: {
      order: 2
    }
  });
  ds.push({
    label: "Data Two",
    data: d3,
    bars: {
      order: 3
    }
  });

  var stack = 0,
    bars = true,
    lines = true,
    steps = true;

  var options = {
    bars: {
      show: true,
      barWidth: 0.4,
      fill: 1
    },
    grid: {
      show: true,
      aboveData: false,
      labelMargin: 5,
      axisMargin: 0,
      borderWidth: 1,
      minBorderMargin: 5,
      clickable: true,
      hoverable: true,
      autoHighlight: false,
      mouseActiveRadius: 20,
      borderColor: '#f5f5f5'
    },
    series: {
      stack: stack
    },
    legend: {
      position: "ne",
      margin: [0, 0],
      noColumns: 0,
      labelBoxBorderColor: null,
      labelFormatter: function (label, series) {
        // just add some space to labes
        return '&nbsp;' + label + '&nbsp;&nbsp;&nbsp;';
      },
      width: 30,
      height: 5
    },
    yaxis: {
      tickColor: '#f5f5f5',
      font: {
        color: '#bdbdbd'
      }
    },
    xaxis: {
      tickColor: '#f5f5f5',
      font: {
        color: '#bdbdbd'
      }
    },
    colors: ["#5867c3", "#00c5dc"],
    tooltip: true, //activate tooltip
    tooltipOpts: {
      content: "%s : %y.0",
      shifts: {
        x: -30,
        y: -50
      },
    }
  };

  $.plot($("#salesBarFlot"), ds, options);
})(jQuery);
