import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import Core from './core/App';

render(<Core />, document.getElementById('container'));
