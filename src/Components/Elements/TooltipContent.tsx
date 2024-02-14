import UNDPColorModule from 'undp-viz-colors';
import { MultiLineChartDataType } from '../../Types';
import { numberFormattingFunction } from '../../Utils/numberFormattingFunction';

interface Props {
  colors: string[];
  data: MultiLineChartDataType[];
  colorDomain: string[];
}

export function TooltipContent(props: Props) {
  const { colorDomain, colors, data } = props;
  return (
    <>
      <div>
        <div className='flex-div margin-bottom-00 flex-wrap'>
          {colorDomain.map((d, i) => (
            <div className='flex-div gap-03 flex-vert-align-center' key={i}>
              <div
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '1rem',
                  backgroundColor: colors[i],
                }}
              />
              <p className='undp-typography margin-bottom-00 small-font'>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex-div margin-bottom-00 flex-wrap'>
        {data.map((d: any, i) => (
          <div className='flex-div gap-03 flex-vert-align-center' key={i}>
            <div
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '1rem',
                backgroundColor: colors
                  ? colors[i]
                  : UNDPColorModule.categoricalColors.colors[i],
              }}
            />
            <p className='undp-typography margin-bottom-00 small-font'>
              <span className='bold'>
                {numberFormattingFunction(d.data[i])}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
