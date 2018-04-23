suite('Basic chart making sure px-vis-bar-chart is working', () => {
  let histo;
  suiteSetup(done => {
    histo = fixture('px-vis-histogram-fixture');

    const width = 1000;
    const height = 500;
    const preventResize  =  true;
    const margin = {
      left: 100,
      top: 10,
      bottom: 50,
      right: 30
    };
    const chartData = [{
      ord: 1,
      val: 10
    },{
      ord: 2,
      val: 15
    },{
      ord: 3,
      val: 22
    },{
      ord: 4,
      val: 10
    },{
      ord: 5,
      val: 5
    }];
    const seriesConfig = {
      histo: {
        x:"ord",
        y:"val"
      }
    };
    let renderingCB = function() {
      histo.removeEventListener('px-data-vis-colors-applied', colorAppliedCB);
      histo.removeEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
      setTimeout(() => {
        done();
      },100);
    };

    let colorAppliedCB = function() {
      histo.addEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
    };

    histo.addEventListener('px-data-vis-colors-applied', colorAppliedCB);

    histo.setProperties({
      width: width,
      height: height,
      preventResize:preventResize,
      margin: margin,
      chartData: chartData,
      seriesConfig: seriesConfig
    });

  });

  test('axis types', () => {
    assert.equal(histo.xAxisType, 'scaleBand');
    assert.equal(histo.yAxisType, 'linear');
  });

  test('completeSeriesConfig', () => {
    const csc = {
      histo: {
        color: "rgb(90,191,248)",
        name: "histo",
        type:"bar",
        x: "ord",
        y: "val"
      }
    };
    assert.deepEqual(histo.completeSeriesConfig, csc);
  });

  test('_stackedChartData', () => {
    const scd = [
      [
        [0,10],
        [0,15],
        [0,22],
        [0,10],
        [0,5]
      ]
    ];

    assert.deepEqual(JSON.parse(JSON.stringify(histo._stackedChartData)), scd);
    assert.equal(histo._stackedChartData[0].key, "val");
    assert.equal(histo._stackedChartData[0].index, 0);
    assert.deepEqual(histo._stackedChartData[0][0]['data'], {ord:1,val:10});
    assert.deepEqual(histo._stackedChartData[0][4]['data'], {ord:5,val:5});
  });

  test('_ordinalKey', () => {
    assert.equal(histo._ordinalKey, 'ord');
  });

  test('dataExtents', () => {
    const de = {
      x: [],
      y: [0,22]
    };

    assert.deepEqual(histo.dataExtents, de);
  });

  test('scales', () => {
    const x = [1,2,3,4,5];
    const y = [0,22]

    assert.deepEqual(histo.x.domain(), x);
    assert.deepEqual(histo.y.domain(), y);
  });

  test('baseline', () => {
    assert.isUndefined(histo._baseline);
  });

  test('_groupScale', () => {
    assert.isUndefined(histo._groupScale);
  });
});

suite('Overlay chart', () => {
  let histo;
  suiteSetup(done => {
    histo = fixture('px-vis-histogram-fixture');

    const width = 1000;
    const height = 500;
    const preventResize  =  true;
    const margin = {
      left: 100,
      top: 10,
      bottom: 50,
      right: 30
    };
    const chartData = [{
      ord: 1,
      val: 10
    },{
      ord: 2,
      val: 15,
      val2: 8
    },{
      ord: 3,
      val: 22,
      val2: 18
    },{
      ord: 4,
      val: 10,
      val2: 27
    },{
      ord: 5,
      val: 5,
      val2: 16
    },{
      ord: 6,
      val2: 12
    }];
    const seriesConfig = {
      histo: {
        x:"ord",
        y:"val"
      },
      overlap: {
        x:"ord",
        y:"val2"
      }
    };
    const overlapingHistograms = true;
    let renderingCB = function() {
      histo.removeEventListener('px-data-vis-colors-applied', colorAppliedCB);
      histo.removeEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
      setTimeout(() => {
        done();
      },100);
    };

    let colorAppliedCB = function() {
      histo.addEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
    };

    histo.addEventListener('px-data-vis-colors-applied', colorAppliedCB);

    histo.setProperties({
      width: width,
      height: height,
      preventResize: preventResize,
      margin: margin,
      chartData: chartData,
      seriesConfig: seriesConfig,
      overlapingHistograms: overlapingHistograms
    });

  });

  test('axis types', () => {
    assert.equal(histo.xAxisType, 'scaleBand');
    assert.equal(histo.yAxisType, 'linear');
  });

  test('completeSeriesConfig', () => {
    const csc = {
      histo: {
        color: "rgb(90,191,248)",
        name: "histo",
        type:"bar",
        x: "ord",
        y: "val"
      },
      overlap: {
        color: "rgb(226,141,23)",
        name: "overlap",
        type:"bar",
        x: "ord",
        y: "val2"
      }
    };
    assert.deepEqual(histo.completeSeriesConfig, csc);
  });

  test('_stackedChartData', () => {
    const scd = [];

    assert.deepEqual(histo._stackedChartData, scd);
  });

  test('_ordinalKey', () => {
    assert.equal(histo._ordinalKey, 'ord');
  });

  test('scales', () => {
    const x = [1,2,3,4,5,6];
    const y = [0,27]

    assert.deepEqual(histo.x.domain(), x);
    assert.deepEqual(histo.y.domain(), y);
  });

  test('baseline', () => {
    assert.isUndefined(histo._baseline);
  });

  test('_groupScale', () => {
    assert.isUndefined(histo._groupScale);
  });

  test('_overlapData', () => {
    const od = {
      histo: [[
        [0,10],
        [0,15],
        [0,22],
        [0,10],
        [0,5]
      ]],
      overlap: [[
        [0,8],
        [0,18],
        [0,27],
        [0,16],
        [0,12]
      ]]
    };

    assert.deepEqual(JSON.parse(JSON.stringify(histo._overlapData)), od);
    assert.equal(histo._overlapData.histo[0].key, "val");
    assert.equal(histo._overlapData.histo[0].index, 0);
    assert.deepEqual(histo._overlapData.histo[0][0]['data'], {ord:1,val:10});
    assert.deepEqual(histo._overlapData.histo[0][4]['data'], {ord:5,val:5,val2:16});

    assert.equal(histo._overlapData.overlap[0].key, "val2");
    assert.equal(histo._overlapData.overlap[0].index, 0);
    assert.deepEqual(histo._overlapData.overlap[0][0]['data'], {ord:2,val:15,val2:8});
    assert.deepEqual(histo._overlapData.overlap[0][4]['data'], {ord:6,val2:12});
  });

});
