interface SourceProps {
  text: string;
  link?: string;
  text2?: string;
  link2?: string;
}

export function Source(props: SourceProps) {
  const { text, link, text2, link2 } = props;
  return (
    <p
      className='undp-typography margin-bottom-00'
      style={{
        color: 'var(--gray-600)',
        fontSize: '0.875rem',
      }}
    >
      Source:{' '}
      {link ? (
        <a
          className='undp-style small-font'
          style={{ color: 'var(--gray-600)' }}
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          {text}
        </a>
      ) : (
        text
      )}
      {link2 ? (
        <a
          className='undp-style small-font'
          style={{ color: 'var(--gray-600)' }}
          href={link2}
          target='_blank'
          rel='noreferrer'
        >
          {text2}
        </a>
      ) : (
        text2
      )}
    </p>
  );
}
