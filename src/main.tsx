import React from 'react';
import ReactDOM from 'react-dom/client';
import AppVizAssessments from './AppVizAssessments';
import AppVizMap from './AppVizMap';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
      // eslint-disable-next-line no-console
      console.error(`No div matching selector "${embedSelector}"`);
      return null;
    }
    return el;
  }
  return embedSelector;
};

const vizAssessments = getEl('[data-viz-assessments]');
const vizMap = getEl('[data-viz-map]');

if (vizAssessments) {
  const rootEmbed = ReactDOM.createRoot(vizAssessments);
  rootEmbed.render(
    <React.StrictMode>
      <AppVizAssessments />
    </React.StrictMode>,
  );
} else if (vizMap) {
  const rootEmbed = ReactDOM.createRoot(vizMap);
  rootEmbed.render(
    <React.StrictMode>
      <AppVizMap />
    </React.StrictMode>,
  );
}
