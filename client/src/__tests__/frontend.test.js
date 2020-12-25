import React from 'react';
import ReactDOM from 'react-dom';
import AbsencesManager from '../components/pages/AbsencesManager';
import App from '../App';

describe("Renders without crashing", () => {
  it('renders App crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders AbsencesManager crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AbsencesManager />, div);
  });
});
