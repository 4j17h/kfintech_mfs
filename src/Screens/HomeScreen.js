import * as React from 'react';
import {View} from 'react-native';
import {AreaChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import moment from 'moment';
import {FONTS} from '../Common/Constants';
import {Area, Chart, Line, Tooltip} from 'react-native-responsive-linechart';

export default function HomeScreen({navigation}) {
  const chartData = require('../../assets/chartData.json');

  const lineChart = chartData.Table1.map(e => e.fn_nav);
  const xAxisLabels = chartData.Table1.map(e => e.fn_fromdt);

  const newChartData = chartData.Table1.map((a, i) => {
    return {
      x: i,
      y: a.fn_nav,
    };
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          borderWidth: 1.5,
          borderColor: 'white',
        }}>
        <View style={{height: '50%'}}>
          <Chart
            style={{height: '100%', marginLeft: 30, width: '90%'}}
            data={newChartData}>
            <Area
              theme={{
                gradient: {
                  from: {color: '#66a3ff'},
                  to: {
                    color: '#66a3ff',
                    opacity: 1,
                  },
                },
              }}
              smoothing="cubic-spline"
            />
            <Line
              theme={{
                stroke: {color: '#0047b3', width: 2},
                scatter: {
                  selected: {color: 'red', width: 10, height: 10, rx: 7},
                },
              }}
              onTooltipSelect={(val, i) => {
                console.log(val, i);
              }}
              initialTooltipIndex={500}
              hideTooltipOnDragEnd
              smoothing="cubic-spline"
              tooltipComponent={
                <Tooltip
                  theme={{
                    label: {
                      color: 'black',
                      fontSize: 18,
                      opacity: 1,
                      dx: 0,
                      dy: 75,
                      fontFamily: FONTS.Bold,
                    },
                    shape: {
                      width: 180,
                      height: 40,
                      dx: 0,
                      dy: 80,
                      rx: 7,
                      color: 'white',
                    },
                    formatter: v => {
                      return String(
                        v.y + '   ' + chartData.Table1[v.x].fn_fromdt,
                      );
                    },
                  }}
                />
              }
            />
          </Chart>
        </View>
        <View style={{height: '50%'}}>
          <YAxis
            data={[20, 30, 40, 50]}
            numberOfTicks={4}
            contentInset={{left: 5, right: 5, top: 18, bottom: 20}}
            svg={{fill: 'white', fontSize: 18, fontFamily: FONTS.Bold}}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              marginLeft: 5,
            }}
          />
          <AreaChart
            animate={true}
            animationDuration={700}
            showGrid={true}
            style={{
              marginLeft: 30,
              bottom: 1,
              height: '100%',
              width: '90%',
            }}
            data={lineChart}
            curve={shape.curveNatural}
            svg={{fill: '#66a3ff', stroke: '#0047b3', strokeWidth: 2}}
            contentInset={{top: 20, bottom: 0}}
          />
          <XAxis
            data={xAxisLabels}
            contentInset={{left: 15, right: 5, top: 5, bottom: 20}}
            xAccessor={({item}) => new Date(item).getTime()}
            numberOfTicks={3}
            formatLabel={v => moment(new Date(v)).format('DD/MM')}
            svg={{
              fill: 'white',
              fontSize: 18,
              fontFamily: FONTS.Bold,
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </View>
      </View>
    </>
  );
}
