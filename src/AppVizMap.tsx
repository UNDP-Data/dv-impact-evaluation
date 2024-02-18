/* eslint-disable no-irregular-whitespace */
import { PanelTop } from 'lucide-react';
import { ChoroplethMap } from './Components/Graphs/Maps/CircleMap';
import World from './Components/Graphs/Maps/MapData/worldMap.json';

const tooltip = (d: any) => {
  const countryFeature = World.features.find(
    (feature: any) => feature.properties.ISO3 === d.countryCode,
  );
  const countryName = countryFeature
    ? countryFeature.properties.NAME
    : 'Unknown Country';
  return (
    <div>
      <div
        style={{
          borderBottom: '1px solid #D4D6D8',
          padding: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <h6 className='undp-typography margin-bottom-00'>{countryName}</h6>
      </div>
      <div style={{ padding: '1rem 1.5rem' }}>
        <div key={d.countryCode}>
          <div className='flex-div flex-column gap-02 flex-vert-align-center margin-bottom-00'>
            <div
              style={{ width: '100%' }}
              className='flex-div flex-row flex-space-between'
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{ fontSize: '1rem', padding: 0, margin: 0 }}
              >
                Assessment status:
              </p>
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: 0,
                  margin: 0,
                }}
              >
                {d.status}
              </p>
            </div>
            {d.x !== undefined ? (
              <div
                style={{ width: '100%' }}
                className='flex-div flex-row flex-space-between'
              >
                <p
                  className='undp-typography margin-bottom-00'
                  style={{ fontSize: '1rem', padding: 0, margin: 0 }}
                >
                  Interviewed households:
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
                  {d.x}
                </p>
              </div>
            ) : null}
            <div
              className='margin-top-06 padding-top-02 gap-03 margin-bottom-00 flex-div flex-row flex-vert-align-center'
              style={{ borderTop: '1px solid var(--gray-400)' }}
            >
              <PanelTop size={48} strokeWidth={1} color='var(--gray-600)' />
              <p
                className='undp-typography small-font margin-bottom-00'
                style={{
                  color: 'var(--gray-600)',
                  lineHeight: '110%',
                }}
              >
                Access a country&apos;s assessment page by clicking
                on the corresponding dot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppVizMap() {
  return (
    <ChoroplethMap
      data={[
        { countryCode: 'MWI', x: 1642, status: 'Completed' },
        { countryCode: 'KHM', x: 1193, status: 'Completed' },
        { countryCode: 'BGD', x: 3120, status: 'Completed' },
        { countryCode: 'BTN', x: 1681, status: 'In progress' },
        { countryCode: 'VNM', x: 2008, status: 'In progress' },
        { countryCode: 'UGA', x: 1136, status: 'In progress' },
        { countryCode: 'GEO', x: 2103, status: 'In progress' },
        { countryCode: 'ZWE', x: 4185, status: 'In progress' },
        { countryCode: 'ZMB', x: 2508, status: 'In progress' },
        { countryCode: 'LBR', x: undefined, status: 'In progress' },
        { countryCode: 'MNG', x: undefined, status: 'In progress' },
        { countryCode: 'IND', x: undefined, status: 'In progress' },
      ]}
      graphDescription='Hover over the dots to explore details'
      height={780}
      scale={250}
      tooltip={tooltip}
    />
  );
}

export default AppVizMap;
