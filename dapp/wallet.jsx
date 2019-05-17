import React                     from 'react'
import ReactDOM                  from 'react-dom'
import { Provider }              from 'react-redux'
import { init }                  from 'lib/init'
import ViewManager               from './view_manager'
import Frame                     from './frame'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './wallet.css'

init((store) => {
  ReactDOM.render(
    <Provider store={store}>
        <Frame>
          <ViewManager/>
          <ToastContainer className="toast-container"
                          toastClassName="toast"
                          bodyClassName="toast-body"
                          hideProgressBar={true}
                          position={toast.POSITION.BOTTOM_LEFT} />
        </Frame>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
