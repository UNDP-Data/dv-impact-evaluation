/* eslint-disable no-irregular-whitespace */
import UNDPColorModule from 'undp-viz-colors';
import { MultiLineChart } from './Components/Graphs/LineCharts/MultiLineChart';

function AppVizAssessments() {
  const labels = [
    'Environment',
    'Energy',
    'Poverty',
    'Health',
    'Governance',
    'Resilience',
    'Gender',
  ];

  const tooltip = (d: any) => {
    return (
      <div>
        <div
          style={{
            borderBottom: '1px solid #D4D6D8',
            padding: '1rem 1.5rem 0 1.5rem',
          }}
        >
          <h6 className='undp-typography margin-bottom-00'>
            impact evaluation studies according to UNDP Signature Solutions{' '}
          </h6>
          <p
            className='
undp-typography small-font'
          >
            {d.date.getFullYear().toString()}
          </p>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          {labels.map((label, i) => (
            <div key={label}>
              <div className='flex-div flex-row gap-045 flex-vert-align-center margin-bottom-04'>
                <div
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '1rem',
                    backgroundColor:
                      UNDPColorModule.categoricalColors.colors[i],
                  }}
                />
                <div
                  style={{ width: '100%' }}
                  className='flex-div flex-row flex-space-between'
                >
                  <p
                    className='undp-typography margin-bottom-00'
                    style={{ fontSize: '1rem', padding: 0, margin: 0 }}
                  >
                    {label}
                  </p>
                  <p
                    className='undp-typography margin-bottom-00'
                    style={{
                      textTransform: 'uppercase',
                      fontSize: '1rem',
                      fontWeight: 700,
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {d.data[i]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className='undp-container flex-div flex-wrap flex-hor-align-center'>
      <MultiLineChart
        data={[
          {
            date: '2003',
            y: [4, 0, 7, 45, 2, 0, 2],
            data: [4, 0, 7, 45, 2, 0, 2],
          },
          {
            date: '2004',
            y: [11, 1, 9, 47, 2, 0, 5],
            data: [11, 1, 9, 47, 2, 0, 5],
          },
          {
            date: '2005',
            y: [5, 1, 8, 63, 2, 2, 2],
            data: [5, 1, 8, 63, 2, 2, 2],
          },
          {
            date: '2006',
            y: [7, 0, 14, 75, 2, 1, 2],
            data: [7, 0, 14, 75, 2, 1, 2],
          },
          {
            date: '2007',
            y: [11, 2, 16, 89, 9, 1, 10],
            data: [11, 2, 16, 89, 9, 1, 10],
          },
          {
            date: '2008',
            y: [10, 0, 26, 114, 10, 0, 9],
            data: [10, 0, 26, 114, 10, 0, 9],
          },
          {
            date: '2009',
            y: [24, 3, 41, 156, 15, 0, 18],
            data: [24, 3, 41, 156, 15, 0, 18],
          },
          {
            date: '2010',
            y: [29, 3, 47, 160, 18, 4, 12],
            data: [29, 3, 47, 160, 18, 4, 12],
          },
          {
            date: '2011',
            y: [47, 5, 68, 189, 22, 3, 25],
            data: [47, 5, 68, 189, 22, 3, 25],
          },
          {
            date: '2012',
            y: [64, 2, 90, 213, 29, 7, 26],
            data: [64, 2, 90, 213, 29, 7, 26],
          },
          {
            date: '2013',
            y: [69, 8, 88, 233, 40, 7, 35],
            data: [69, 8, 88, 233, 40, 7, 35],
          },
          {
            date: '2014',
            y: [76, 4, 114, 235, 41, 7, 33],
            data: [76, 4, 114, 235, 41, 7, 33],
          },
          {
            date: '2015',
            y: [113, 6, 134, 312, 48, 9, 53],
            data: [113, 6, 134, 312, 48, 9, 53],
          },
          {
            date: '2016',
            y: [106, 15, 142, 308, 33, 20, 39],
            data: [106, 15, 142, 308, 33, 20, 39],
          },
          {
            date: '2017',
            y: [131, 17, 144, 504, 62, 19, 68],
            data: [131, 17, 144, 504, 62, 19, 68],
          },
          {
            date: '2018',
            y: [182, 20, 198, 532, 78, 27, 93],
            data: [182, 20, 198, 532, 78, 27, 93],
          },
          {
            date: '2019',
            y: [227, 24, 180, 612, 78, 19, 92],
            data: [227, 24, 180, 612, 78, 19, 92],
          },
          {
            date: '2020',
            y: [285, 41, 198, 619, 116, 31, 103],
            data: [285, 41, 198, 619, 116, 31, 103],
          },
          {
            date: '2021',
            y: [351, 62, 207, 382, 117, 36, 107],
            data: [351, 62, 207, 382, 117, 36, 107],
          },
          {
            date: '2022',
            y: [545, 104, 133, 118, 141, 36, 50],
            data: [545, 104, 133, 118, 141, 36, 50],
          },
        ]}
        graphTitle='Evolution of impact evaluation studies according to UNDP Signature Solutions'
        source='3ie development evidence portal'
        sourceLink='https://developmentevidence.3ieimpact.org/'
        labels={labels}
        source2=', UNDP Impact Evaluations'
        // eslint-disable-next-line react/no-unstable-nested-components
        tooltip={tooltip}
      />
    </div>
  );
}

export default AppVizAssessments;
