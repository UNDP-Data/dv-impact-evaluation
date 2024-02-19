import UNDPColorModule from 'undp-viz-colors';
import { useState, useRef, useEffect } from 'react';
import { Graph } from './Graph';
import { DumbbellChartDataType } from '../../../Types';
import { GraphHeader } from '../../Elements/GraphHeader';
import { GraphFooter } from '../../Elements/GraphFooter';

interface Props {
  data: DumbbellChartDataType[];
  colors?: string[];
  graphTitle?: string;
  graphDescription?: string;
  footNote?: string;
  sourceLink?: string;
  width?: number;
  height?: number;
  suffix?: string;
  prefix?: string;
  source?: string;
  barPadding?: number;
  showDotValue?: boolean;
  showXTicks?: boolean;
  leftMargin?: number;
  rightMargin?: number;
  topMargin?: number;
  bottomMargin?: number;
  truncateBy?: number;
  backgroundColor?: string | boolean;
  padding?: string;
  dotRadius?: number;
  tooltip?: (_d: any) => JSX.Element;
  onSeriesMouseOver?: (_d: any) => void;
}

export function DumbbellChart(props: Props) {
  const {
    data,
    graphTitle,
    colors,
    suffix,
    source,
    prefix,
    graphDescription,
    sourceLink,
    barPadding,
    showDotValue,
    showXTicks,
    leftMargin,
    rightMargin,
    topMargin,
    bottomMargin,
    truncateBy,
    height,
    width,
    footNote,
    padding,
    backgroundColor,
    dotRadius,
    tooltip,
    onSeriesMouseOver,
  } = props;

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight || 480);
      setSvgWidth(graphDiv.current.clientWidth || 620);
    }
  }, [graphDiv?.current]);

  const dotColors = colors || UNDPColorModule.categoricalColors.colors;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexGrow: width ? 0 : 1,
        padding: backgroundColor
          ? padding || 'var(--spacing-05)'
          : padding || 0,
        backgroundColor: !backgroundColor
          ? 'transparent'
          : backgroundColor === true
          ? 'var(--gray-200)'
          : backgroundColor,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 'var(--spacing-05)',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {graphTitle || graphDescription ? (
          <GraphHeader
            graphTitle={graphTitle}
            graphDescription={graphDescription}
          />
        ) : null}
        <div
          style={{
            flexGrow: 1,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--spacing-04)',
            width: '100%',
          }}
        >
          <div
            style={{
              flexGrow: 1,
              width: '100%',
              lineHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            ref={graphDiv}
          >
            <div
              className='flex-div flex-row margin-bottom-04'
              style={{
                lineHeight: 0,
              }}
            >
              <div className='flex-div gap-03 flex-vert-align-center'>
                <div
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '1rem',
                    backgroundColor: 'var(--blue-600)',
                  }}
                />
                <p className='undp-typography margin-bottom-00 small-font'>
                  Standardized Effect
                </p>
              </div>
              <div className='flex-div gap-03 flex-vert-align-center'>
                <div
                  style={{
                    width: '1.25rem',
                    height: '0.75rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1px',
                      height: '0.75rem',
                      backgroundColor: 'var(--gray-600)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1px',
                      height: '0.75rem',
                      backgroundColor: 'var(--gray-600)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: '50%',
                      transform: 'translateY(50%)',
                      height: '1px',
                      backgroundColor: 'var(--gray-600)',
                    }}
                  />
                </div>
                <p className='undp-typography margin-bottom-00 small-font'>
                  90% confidence interval
                </p>
              </div>
            </div>
            {(width || svgWidth) && (height || svgHeight) ? (
              <Graph
                data={data}
                dotColors={dotColors}
                width={width || svgWidth}
                height={height || svgHeight}
                suffix={suffix || ''}
                prefix={prefix || ''}
                barPadding={barPadding === undefined ? 0.25 : barPadding}
                dotRadius={!dotRadius ? 3 : dotRadius}
                showDotValue={showDotValue === undefined ? true : showDotValue}
                showXTicks={showXTicks === undefined ? true : showXTicks}
                leftMargin={leftMargin === undefined ? 100 : leftMargin}
                rightMargin={rightMargin === undefined ? 40 : rightMargin}
                topMargin={topMargin === undefined ? 20 : topMargin}
                bottomMargin={bottomMargin === undefined ? 10 : bottomMargin}
                truncateBy={truncateBy === undefined ? 999 : truncateBy}
                tooltip={tooltip}
                onSeriesMouseOver={onSeriesMouseOver}
              />
            ) : null}
          </div>
        </div>
        {source || footNote ? (
          <GraphFooter
            source={source}
            sourceLink={sourceLink}
            footNote={footNote}
          />
        ) : null}
      </div>
    </div>
  );
}
