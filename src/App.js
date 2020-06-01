import React, {useState, useEffect} from 'react';
import styled, {keyframes, css} from 'styled-components';
import {ActionSheet, Toast} from 'antd-mobile';
import request from 'umi-request';
import {useRecoilState} from 'recoil';
import ProductInfo from './components/ProductInfo';

import {customerCodeAtom, productInfoAtom, showProductInfoPanelAtom, showSendFeedbackPanelAtom, showWarrantyPanelAtom} from './state';

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const pulse = keyframes`
  to {
    box-shadow: 0 0 0 10px rgba(232, 76, 61, 0);
  }  
`;

const pulseAnim = props => css`
  ${pulse} ${props.animationLength || 1.25}s infinite cubic-bezier(0.66, 0, 0, 1)
`;

const FloatActionButtonContainer = styled.div`
  position: fixed;
  bottom: 1em;
  //right: 1em;
  left: 50%;
  margin-left: -1em ;
  text-align: center;
`;

const FloatActionButton = styled.button`
  height: 3em;
  width: 3em;
  border-radius: 50%;
  border: 0 none;
  background: #72ab59;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.26);
  transform: scale(1);
  transition: all 200ms ease;
  font-size: 1em;
  
  animation: ${pulseAnim};
  
  &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
    outline: 0;
    animation-play-state: paused;
  }
  
  &.expanded {
    opacity: 0;
    //transform: scale(0.7);
    //color: rgba(255, 255, 255, 0.5);
    //background: #ffaa00;    
    animation-play-state: paused;
  }
`;

function getUrlQuery(key) {
    return (new URL(document.location)).searchParams.get(key);
}

function App() {
    const [customerCode, setCustomerCode]                   = useRecoilState(customerCodeAtom);
    const [productInfoPanelVisible, showProductInfoPanel]   = useRecoilState(showProductInfoPanelAtom);
    const [warrantyPanelVisible, showWarrantyPanel]         = useRecoilState(showWarrantyPanelAtom);
    const [sendFeedbackPanelVisible, showSendFeedbackPanel] = useRecoilState(showSendFeedbackPanelAtom);
    const [expanded, setExpanded]                           = useState(false);
    const [productInfo, setProductInfo]                     = useRecoilState(productInfoAtom);

    // get customer code from browser location
    useEffect(() => {
        const curCustomerCode = getUrlQuery('customerCode');
        if (curCustomerCode) {
            console.debug('detected customerCode', curCustomerCode);
            setCustomerCode(curCustomerCode);
        }
    }, []);

    const actions = [
        {title: 'Thông tin sản phẩm', handler: () => showProductInfoPanel(true)},
        {
            title: 'Kích hoạt bảo hành', handler: () => {
                // showWarrantyPanel(true);
                Toast.info('Tính năng chưa hoàn thiện', 1);
            },
        },
        {
            title: 'Gửi đánh giá', handler: () => {
                // showSendFeedbackPanel(true)
                Toast.info('Tính năng chưa hoàn thiện', 1);
            },
        },
        {title: 'Đóng'},
    ];

    const showActionSheet = () => {
        const actionNameList = actions.map(e => e.title);
        ActionSheet.showActionSheetWithOptions({
                options:                actionNameList,
                cancelButtonIndex:      actionNameList.length - 1,
                destructiveButtonIndex: actionNameList.length - 1,
                title:                  'Dịch vụ khách hàng',
                maskClosable:           true,
                'data-seed':            'actionSheet',
                wrapProps,
            },
            (buttonIndex) => {
                setExpanded(false); // show float button
                // exec action if exists
                const action = actions[buttonIndex];
                if (action && action.handler)
                    action.handler();
            });
    };
    return (<>
        <ProductInfo visible={productInfoPanelVisible}
                     onClose={() => {
                         showProductInfoPanel(false);
                         // show main menu
                         setExpanded(true);
                         showActionSheet();
                     }}
        />

        <FloatActionButtonContainer>
            <FloatActionButton
                animationLength={2}
                className={expanded ? 'expanded' : ''}
                onClick={() => {
                    setExpanded(true);
                    showActionSheet();
                }}
            >
                ✓
            </FloatActionButton>
        </FloatActionButtonContainer>
    </>);
}

export default App;
