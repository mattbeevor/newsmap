import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middleware)
));



render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
)