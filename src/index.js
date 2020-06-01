import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import App from './App';

let root = document.querySelector('#embed-ui');
if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'embed-ui');
    root.classList.add('antd-ns');
    document.body.appendChild(root);
}

ReactDOM.render(
    // <React.StrictMode>
    <RecoilRoot>
        <App/>
    </RecoilRoot>
    // </React.StrictMode>
    , root,
);
