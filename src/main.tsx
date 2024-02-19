import React from 'react';
import ReactDOM from 'react-dom/client';
import AppVizAssessments from './AppVizAssessments';
import AppVizMap from './AppVizMap';
import AppVizBangladesh from './AppVizBangladesh';

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
if (vizAssessments) {
  const rootEmbed = ReactDOM.createRoot(vizAssessments);
  rootEmbed.render(
    <React.StrictMode>
      <AppVizAssessments />
    </React.StrictMode>,
  );
}

const vizMap = getEl('[data-viz-map]');
if (vizMap) {
  const rootEmbed = ReactDOM.createRoot(vizMap);
  rootEmbed.render(
    <React.StrictMode>
      <AppVizMap />
    </React.StrictMode>,
  );
}
const vizBangladesh = getEl('[data-viz-bangladesh]');
if (vizBangladesh) {
  const rootEmbed = ReactDOM.createRoot(vizBangladesh);
  rootEmbed.render(
    <React.StrictMode>
      <AppVizBangladesh />
    </React.StrictMode>,
  );
}
