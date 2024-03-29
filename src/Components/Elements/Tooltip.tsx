import styled from 'styled-components';

interface Props {
  body: JSX.Element;
  xPos: number;
  yPos: number;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 8;
  max-width: 25rem;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${props =>
    props.verticalAlignment === 'bottom' ? props.y - 10 : props.y + 10}px;
  left: ${props =>
    props.horizontalAlignment === 'left' ? props.x - 10 : props.x + 10}px;
  transform: ${props =>
    `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${
      props.verticalAlignment === 'top' ? '-100%' : '0%'
    })`};
`;

export function Tooltip(props: Props) {
  const { body, xPos, yPos } = props;
  return (
    <TooltipEl
      x={xPos}
      y={yPos}
      verticalAlignment={yPos > window.innerHeight / 2 ? 'top' : 'bottom'}
      horizontalAlignment={xPos > window.innerWidth / 2 ? 'left' : 'right'}
    >
      {body}
    </TooltipEl>
  );
}
