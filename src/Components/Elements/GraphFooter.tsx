import { FootNote } from '../Typography/FootNote';
import { Source } from '../Typography/Source';

interface Props {
  sourceLink?: string;
  sourceLink2?: string;
  footNote?: string;
  source?: string;
  source2?: string;
}

export function GraphFooter(props: Props) {
  const { source, footNote, sourceLink, source2, sourceLink2 } = props;

  return (
    <div className='flex-div gap-03' style={{ flexDirection: 'column' }}>
      {source ? (
        <Source
          text={source}
          link={sourceLink}
          text2={source2}
          link2={sourceLink2}
        />
      ) : null}
      {footNote ? <FootNote text={footNote} /> : null}
    </div>
  );
}
