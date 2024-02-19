/* eslint-disable no-irregular-whitespace */
import { DumbbellChart } from './Components/Graphs/DumbbellChart';

const tooltip = (d: any) => {
  return (
    <div>
      <div
        style={{
          borderBottom: '1px solid #D4D6D8',
          padding: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <h6 className='undp-typography margin-bottom-00'>{d.label}</h6>
      </div>
      <div style={{ padding: '1rem 1.5rem' }}>
        <div key={d.label}>
          <div className='flex-div flex-column gap-02 flex-vert-align-center margin-bottom-00'>
            {d.x !== undefined ? (
              <>
                <div
                  style={{ width: '100%' }}
                  className='flex-div flex-row flex-space-between'
                >
                  <p
                    className='undp-typography margin-bottom-00'
                    style={{ fontSize: '1rem', padding: 0, margin: 0 }}
                  >
                    Standardized Effect:
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
                    {d.x[0]}
                  </p>
                </div>
                <div
                  style={{ width: '100%' }}
                  className='flex-div flex-row flex-space-between'
                >
                  <p
                    className='undp-typography margin-bottom-00'
                    style={{ fontSize: '1rem', padding: 0, margin: 0 }}
                  >
                    90% confidence interval:
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
                    {`${d.x[1]}–${d.x[2]}`}
                  </p>
                </div>
                <div
                  style={{ width: '100%' }}
                  className='flex-div flex-row flex-space-between'
                >
                  <p
                    className='undp-typography margin-bottom-00'
                    style={{ fontSize: '1rem', padding: 0, margin: 0 }}
                  >
                    P-value:
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
                    {d.p}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

function AppVizBangladesh() {
  return (
    <DumbbellChart
      data={[
        { label: 'Household Welfare', x: undefined, title: true },
        { label: 'Total income, p.c.', x: [0.81, 0.38, 1.25], p: 0.039 },
        {
          label: 'Total income last month, p.c.',
          x: [0.25, 0.05, 0.44],
          p: 0.039,
        },
        { label: 'Total expenditure, p.c.', x: [0.58, 0.24, 0.93], p: 0.039 },
        { label: 'Household Food Security', x: undefined, title: true },
        { label: 'FCS [0-112]', x: [0.31, 0.19, 0.44], p: 0.039 },
        { label: 'Acceptable high FCS (>52)', x: [0.14, 0.09, 0.19], p: 0.039 },
        { label: 'HFIAS [0-27]', x: [-0.39, -0.54, -0.23], p: 0.039 },
        { label: 'Food secure (y/n)', x: [0.23, 0.15, 0.31], p: 0.039 },
        {
          label: 'Mildly food insecure access (y/n)',
          x: [-0.15, -0.2, -0.09],
          p: 0.039,
        },
        {
          label: 'Moderately food insecure access (y/n)',
          x: [-0.08, -0.11, -0.04],
          p: 0.039,
        },
        {
          label: 'Severely food insecure access (y/n)',
          x: [0.0, -0.01, 0.0],
          p: 0.039,
        },
        {
          label: 'Household Preparedness to Shocks',
          x: undefined,
          title: true,
        },
        {
          label:
            'HH is (somewhat) prepared against extreme weather events (self-perception)',
          x: [0.04, 0.01, 0.08],
          p: 0.039,
        },
        { label: 'Income diversification', x: [0.64, 0.38, 0.89], p: 0.039 },
        {
          label: 'Women Empowerment – Income Generation',
          x: undefined,
          title: true,
        },
        {
          label: 'Beneficiary engages in at least one IGA',
          x: [0.08, 0.02, 0.15],
          p: 0.039,
        },
        {
          label: 'Beneficiary - # of IGA engaged in',
          x: [0.22, 0.07, 0.37],
          p: 0.039,
        },
        {
          label: '# of IGA - Women in HH solely responsible',
          x: [0.13, 0.01, 0.26],
          p: 0.039,
        },
        {
          label:
            'Beneficiary - Share of IGA engaged in alone/with other women in HH',
          x: [-0.04, -0.08, 0.0],
          p: 0.039,
        },
        {
          label: 'Women in HH solely responsible for at least one adaptive LH',
          x: [0.34, 0.25, 0.44],
          p: 0.039,
        },
        {
          label: '# of adaptive LH women in HH solely responsible for',
          x: [1.38, 0.94, 1.83],
          p: 0.039,
        },
        {
          label: 'Women Empowerment – Decision-making',
          x: undefined,
          title: true,
        },
        {
          label: 'Beneficiary solely decides on income from crop production',
          x: [-0.12, -0.24, 0.0],
          p: 0.039,
        },
        {
          label:
            'Beneficiary solely decides on income from fish/prawn/crab production',
          x: [-0.1, -0.16, -0.05],
          p: 0.039,
        },
        {
          label:
            'Beneficiary solely decides on income from livestock production',
          x: [-0.09, -0.17, 0.0],
          p: 0.039,
        },
        {
          label:
            'Beneficiary solely decides on income from agricultural wage employment',
          x: [0.01, -0.07, 0.08],
          p: 0.039,
        },
        {
          label:
            'Beneficiary solely decides on income from non-agricultural wage employment',
          x: [-0.07, -0.17, 0.03],
          p: 0.039,
        },
        {
          label:
            'Beneficiary solely decides on income from HH non-farm enterprise',
          x: [-0.04, -0.15, 0.07],
          p: 0.039,
        },
        {
          label:
            'Beneficiary sole decision-maker for income from at least one source',
          x: [-0.05, -0.12, 0.02],
          p: 0.039,
        },
        {
          label: 'Decision-making involvement index [1-5]',
          x: [-0.09, -0.27, 0.08],
          p: 0.039,
        },
        { label: 'Household Expenditures', x: undefined, title: true },
        { label: 'Food expenditure, p.c.', x: [0.16, -0.03, 0.35], p: 0.039 },
        { label: 'Non-food expenditure, p.c.', x: [0.8, 0.37, 1.22], p: 0.039 },
        {
          label: 'Education expenditure, p.c.',
          x: [0.22, 0.04, 0.4],
          p: 0.039,
        },
        {
          label: 'Clothing expenditure, p.c.',
          x: [0.52, 0.24, 0.79],
          p: 0.039,
        },
        { label: 'Health expenditure, p.c.', x: [0.42, 0.18, 0.66], p: 0.039 },
        {
          label: 'Communication expenditure, p.c.',
          x: [0.29, 0.1, 0.47],
          p: 0.039,
        },
        {
          label: 'Social Events expenditure, p.c.',
          x: [0.49, 0.16, 0.82],
          p: 0.039,
        },
        {
          label: 'Refreshments expenditure, p.c.',
          x: [0.21, 0.02, 0.41],
          p: 0.039,
        },
        {
          label: 'Miscellaneous expenditure, p.c.',
          x: [0.58, 0.22, 0.93],
          p: 0.039,
        },
      ]}
      graphTitle='Impact estimates for different indicators'
      showDotValue={false}
      source='Impact Evaluation Report, 2024'
      dotRadius={4}
      height={800}
      truncateBy={40}
      leftMargin={250}
      tooltip={tooltip}
      backgroundColor
    />
  );
}

export default AppVizBangladesh;
