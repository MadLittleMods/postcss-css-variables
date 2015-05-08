import React from 'react';
import PlaygroundApp from './components/PlaygroundApp';
import * as PlaygroundPersistentSettingsDAO from './services/PlaygroundPersistentSettingsDAO';

PlaygroundPersistentSettingsDAO.init();

React.render(<PlaygroundApp />, document.querySelector('.playground-app-entry-point'));

