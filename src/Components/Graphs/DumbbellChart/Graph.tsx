import { scaleLinear, scaleBand } from 'd3-scale';
import max from 'lodash.max';
import min from 'lodash.min';
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import UNDPColorModule from 'undp-viz-colors';
import { DumbbellChartDataType } from '../../../Types';
import { numberFormattingFunction } from '../../../Utils/numberFormattingFunction';
import { Tooltip } from '../../Elements/Tooltip';

const Label = styled.text`
  font-weight: 400;
  font-family: var(--fontFamily) !important;
`;

interface Props {
  data: DumbbellChartDataType[];
  dotColors: string[];
  suffix: string;
  prefix: string;
  barPadding: number;
  showDotValue: boolean;
  showXTicks: boolean;
  leftMargin: number;
  rightMargin: number;
  topMargin: number;
  bottomMargin: number;
  truncateBy: number;
  width: number;
  height: number;
  dotRadius: number;
  tooltip?: (_d: any) => JSX.Element;
  onSeriesMouseOver?: (_d: any) => void;
}

const G = styled.g`
  opacity: 0.8;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

export function Graph(props: Props) {
  const {
    data,
    dotColors,
    suffix,
    prefix,
    barPadding,
    showDotValue,
    showXTicks,
    leftMargin,
    truncateBy,
    width,
    height,
    rightMargin,
    topMargin,
    bottomMargin,
    dotRadius,
    tooltip,
    onSeriesMouseOver,
  } = props;
  const margin = {
    top: topMargin,
    bottom: bottomMargin,
    left: leftMargin,
    right: rightMargin,
  };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;
  const [mouseOverData, setMouseOverData] = useState<any>(undefined);
  const [eventX, setEventX] = useState<number | undefined>(undefined);
  const [eventY, setEventY] = useState<number | undefined>(undefined);

  const xMaxValue = Math.max(...data.map(d => max(d.x) || 0));
  const xMinValue =
    Math.min(...data.map(d => min(d.x) || 0)) > 0
      ? 0
      : Math.min(...data.map(d => min(d.x) || 0));

  const x = scaleLinear()
    .domain([xMinValue, xMaxValue])
    .range([0, graphWidth])
    .nice();
  const y = scaleBand()
    .domain(data.map(d => `${d.label}`))
    .range([0, graphHeight])
    .paddingInner(barPadding);
  const xTicks = x.ticks(5);

  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {showXTicks
            ? xTicks.map((d, i) => (
                <g key={i}>
                  <Label
                    x={x(d)}
                    y={-12.5}
                    fill='#AAA'
                    textAnchor='middle'
                    fontSize={10}
                  >
                    {numberFormattingFunction(d)}
                  </Label>
                  <line
                    x1={x(d)}
                    x2={x(d)}
                    y1={-2.5}
                    y2={graphHeight + margin.bottom}
                    stroke='var(--gray-400)'
                    strokeWidth={1}
                    strokeDasharray='4,8'
                    opacity={d === 0 ? 0 : 1}
                  />
                </g>
              ))
            : null}
          {data.map((d: DumbbellChartDataType, i) => (
            <G
              key={i}
              transform={`translate(0,${
                (y(`${d.label}`) as number) + y.bandwidth() / 2
              })`}
              onMouseEnter={(event: {
                clientY: SetStateAction<number | undefined>;
                clientX: SetStateAction<number | undefined>;
              }) => {
                setMouseOverData(d);
                setEventY(event.clientY);
                setEventX(event.clientX);
                if (onSeriesMouseOver) {
                  onSeriesMouseOver(d);
                }
              }}
              onMouseMove={(event: {
                clientY: SetStateAction<number | undefined>;
                clientX: SetStateAction<number | undefined>;
              }) => {
                setMouseOverData(d);
                setEventY(event.clientY);
                setEventX(event.clientX);
              }}
              onMouseLeave={() => {
                setMouseOverData(undefined);
                setEventX(undefined);
                setEventY(undefined);
                if (onSeriesMouseOver) {
                  onSeriesMouseOver(undefined);
                }
              }}
            >
              {d.title ? (
                <Label
                  style={{
                    fill: 'var(--gray-700)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textAnchor: 'end',
                  }}
                  x={0}
                  y={0}
                  dx={-10}
                  dy={4}
                >
                  {d.label.length < truncateBy
                    ? d.label
                    : `${d.label.substring(0, truncateBy)}...`}
                </Label>
              ) : (
                <Label
                  style={{
                    fill: 'var(--gray-700)',
                    fontSize: '0.75rem',
                    textAnchor: 'end',
                  }}
                  x={0}
                  y={0}
                  dx={-10}
                  dy={4}
                >
                  {d.label.length < truncateBy
                    ? d.label
                    : `${d.label.substring(0, truncateBy)}...`}
                </Label>
              )}
              {d.title ? null : (
                <line
                  x1={0}
                  x2={graphWidth}
                  y1={0}
                  y2={0}
                  stroke='var(--gray-400)'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                />
              )}
              <line
                x1={x(min(d.x) as number)}
                x2={x(max(d.x) as number)}
                y1={0}
                y2={0}
                style={{
                  stroke: 'var(--gray-600)',
                  strokeWidth: 1,
                }}
              />
              {d.x !== undefined &&
                d.x.map((el, j) => (
                  <g key={j}>
                    {j === 0 ? (
                      <circle
                        cx={x(el)}
                        cy={0}
                        r={dotRadius}
                        style={{
                          fill: UNDPColorModule.categoricalColors.colors[0],
                          fillOpacity: 1,
                          stroke: UNDPColorModule.categoricalColors.colors[0],
                          strokeWidth: 1,
                        }}
                      />
                    ) : (
                      <line
                        x1={x(el)}
                        x2={x(el)}
                        y1={-5}
                        y2={5}
                        stroke='var(--gray-600)'
                        strokeWidth={1}
                      />
                    )}
                    {showDotValue ? (
                      <text
                        x={x(el)}
                        y={0}
                        style={{
                          fill: dotColors[j],
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          textAnchor: 'middle',
                        }}
                        dx={0}
                        dy={0 - dotRadius - 3}
                      >
                        {prefix}
                        {numberFormattingFunction(el)}
                        {suffix}
                      </text>
                    ) : null}
                  </g>
                ))}
            </G>
          ))}
        </g>
      </svg>
      {mouseOverData && tooltip && eventX && eventY ? (
        <Tooltip body={tooltip(mouseOverData)} xPos={eventX} yPos={eventY} />
      ) : null}
    </>
  );
}
