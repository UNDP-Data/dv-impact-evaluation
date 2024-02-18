/* eslint-disable @typescript-eslint/no-shadow */
import { useRef, useState } from 'react';
import { geoEqualEarth } from 'd3-geo';
import styled from 'styled-components';
import World from '../MapData/worldMap.json';
import { ChoroplethMapDataType } from '../../../../Types';
import { Tooltip } from '../../../Elements/Tooltip';

interface Props {
  width: number;
  height: number;
  data: ChoroplethMapDataType[];
  scale: number;
  tooltip?: (_d: any) => JSX.Element;
  onSeriesMouseOver?: (_d: any) => void;
}

const Label = styled.text`
  font-size: 14px;
  font-weight: 400;
  font-family: var(--fontFamily) !important;
`;

export function Graph(props: Props) {
  const { data, height, width, scale, tooltip, onSeriesMouseOver } = props;
  const [mouseOverData, setMouseOverData] = useState<any>(undefined);
  const [eventX, setEventX] = useState<number | undefined>(undefined);
  const [eventY, setEventY] = useState<number | undefined>(undefined);
  const svgWidth = 960;
  const svgHeight = 678;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth()
    .rotate([0, 0])
    .scale(scale)
    .translate([svgWidth / 2 - 30, svgHeight / 2]);
  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={mapSvg}
      >
        <g ref={mapG}>
          {(World as any).features.map((d: any, i: number) => {
            const index = data.findIndex(
              el => el.countryCode === d.properties.ISO3,
            );
            if (index !== -1 || d.properties.NAME === 'Antarctica') return null;
            return (
              <g key={i} opacity={1}>
                {d.geometry.type === 'MultiPolygon'
                  ? d.geometry.coordinates.map((el: any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== geo.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill='var(--gray-200)'
                        />
                      );
                    })
                  : d.geometry.coordinates.map((el: any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [
                          number,
                          number,
                        ];
                        if (k !== el.length - 1)
                          path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill='var(--gray-200)'
                        />
                      );
                    })}
              </g>
            );
          })}
          {data.map((d, i) => {
            const index = (World as any).features.findIndex(
              (el: any) => d.countryCode === el.properties.ISO3,
            );
            return (
              <g
                key={i}
                onMouseEnter={event => {
                  setMouseOverData(d);
                  setEventY(event.clientY);
                  setEventX(event.clientX);
                  if (onSeriesMouseOver) {
                    onSeriesMouseOver(d);
                  }
                }}
                onMouseMove={event => {
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
                {index === -1 || d.countryCode === 'ATA'
                  ? null
                  : (World as any).features[index].geometry.type ===
                    'MultiPolygon'
                  ? (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: any) => {
                        let masterPath = '';
                        el.forEach((geo: number[][]) => {
                          let path = ' M';
                          geo.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [
                              number,
                              number,
                            ];
                            if (k !== geo.length - 1)
                              path = `${path}${point[0]} ${point[1]}L`;
                            else path = `${path}${point[0]} ${point[1]}`;
                          });
                          masterPath += path;
                        });
                        return (
                          <a
                            key={j}
                            target='_blank'
                            href={`https://data.undp.org/insights/evidence-informed-interventions/${d.countryCode}`}
                            rel='noreferrer'
                          >
                            <path
                              key={j}
                              d={masterPath}
                              stroke='#AAA'
                              strokeWidth={0.25}
                              fill='var(--gray-200)'
                            />
                          </a>
                        );
                      },
                    )
                  : (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: number) => {
                        let path = 'M';
                        el.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== el.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        return (
                          <a
                            key={j}
                            target='_blank'
                            href={`https://data.undp.org/insights/evidence-informed-interventions/${d.countryCode}`}
                            rel='noreferrer'
                          >
                            <path
                              key={j}
                              d={path}
                              stroke='#AAA'
                              strokeWidth={0.25}
                              fill='var(--gray-200)'
                            />
                          </a>
                        );
                      },
                    )}
              </g>
            );
          })}
          {data.map((d, i) => {
            const countryFeature = (World as any).features.find(
              (el: any) => d.countryCode === el.properties.ISO3,
            );
            if (!countryFeature || d.countryCode === 'ATA') return null; // Skip if country not found or is Antarctica

            // Use the LON and LAT properties directly
            const lon = countryFeature.properties.LON;
            const lat = countryFeature.properties.LAT;
            const point = projection([lon, lat]) as [number, number];

            return (
              <g
                key={i}
                onMouseEnter={event => {
                  setMouseOverData(d);
                  setEventY(event.clientY);
                  setEventX(event.clientX);
                  if (onSeriesMouseOver) {
                    onSeriesMouseOver(d);
                  }
                }}
                onMouseMove={event => {
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
                <a
                  key={`link-${i}`}
                  target='_blank'
                  href={`https://data.undp.org/insights/evidence-informed-interventions/${d.countryCode}`}
                  rel='noreferrer'
                >
                  <circle
                    key={`circle-${i}`}
                    cx={point[0]}
                    cy={point[1]}
                    r='7'
                    fill={
                      d.status === 'In progress' ? '#E8862E80' : '#006EB580'
                    }
                    stroke={d.status === 'In progress' ? '#E8862E' : '#006EB5'}
                  />
                  <Label
                    key={`text-${i}`}
                    x={
                      d.countryCode === 'IND' || d.countryCode === 'ZMB'
                        ? point[0] - 14
                        : point[0] + 14
                    }
                    y={point[1] + 1}
                    textAnchor={
                      d.countryCode === 'IND' || d.countryCode === 'ZMB'
                        ? 'end'
                        : 'start'
                    }
                    alignmentBaseline='middle'
                  >
                    {countryFeature.properties.NAME}
                  </Label>
                </a>
              </g>
            );
          })}
          {mouseOverData
            ? (World as any).features
                .filter(
                  (d: { properties: { ISO3: any } }) =>
                    d.properties.ISO3 === mouseOverData.countryCode,
                )
                .map((d: any, i: number) => {
                  return (
                    <g key={i}>
                      {d.geometry.type === 'MultiPolygon'
                        ? d.geometry.coordinates.map((el: any, j: any) => {
                            let masterPath = '';
                            el.forEach((geo: number[][]) => {
                              let path = ' M';
                              geo.forEach((c: number[], k: number) => {
                                const point = projection([c[0], c[1]]) as [
                                  number,
                                  number,
                                ];
                                if (k !== geo.length - 1)
                                  path = `${path}${point[0]} ${point[1]}L`;
                                else path = `${path}${point[0]} ${point[1]}`;
                              });
                              masterPath += path;
                            });
                            return (
                              <path
                                key={j}
                                d={masterPath}
                                style={{
                                  stroke: 'var(--gray-700)',
                                  fill: 'none',
                                  fillOpacity: 0,
                                  strokeWidth: '0.5',
                                }}
                              />
                            );
                          })
                        : d.geometry.coordinates.map((el: any, j: number) => {
                            let path = 'M';
                            el.forEach((c: number[], k: number) => {
                              const point = projection([c[0], c[1]]) as [
                                number,
                                number,
                              ];
                              if (k !== el.length - 1)
                                path = `${path}${point[0]} ${point[1]}L`;
                              else path = `${path}${point[0]} ${point[1]}`;
                            });
                            return (
                              <path
                                key={j}
                                d={path}
                                style={{
                                  stroke: 'var(--gray-700)',
                                  fill: 'none',
                                  fillOpacity: 0,
                                  strokeWidth: '0.5',
                                }}
                              />
                            );
                          })}
                    </g>
                  );
                })
            : null}
        </g>
      </svg>
      {mouseOverData && tooltip && eventX && eventY ? (
        <Tooltip body={tooltip(mouseOverData)} xPos={eventX} yPos={eventY} />
      ) : null}
    </>
  );
}
