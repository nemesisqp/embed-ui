import React, {useEffect, useState} from 'react';
import {Modal, List, InputItem} from 'antd-mobile';
import {useRecoilValue} from 'recoil';
import {customerCodeAtom} from '../state';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

const onWrapTouchStart  = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
        e.preventDefault();
    }
};
const TEST_PRODUCT_INFO = {
    name:     'Đại Dịch! Tim Không Đập Thình Thịch',
    author:   'bác sĩ Trương Hữu Khanh',
    hotLine:  '0961490505',
    website:  'http://www.anbooks.vn/',
    facebook: 'https://www.facebook.com/AnBooks.vn/',
};

function renderInfo(name, value) {
    return <InputItem key={name}
        value={value}
        type={'text'}
        editable={false}
    >{name}</InputItem>;
}

export default function ProductInfo({animationType, visible, onClose, title}) {
    const customerCode                  = useRecoilValue(customerCodeAtom);
    const [productInfo, setProductInfo] = useState({});
    // chi lay info khi visible va co customerCode
    useEffect(() => {
        if (visible && customerCode) {
            console.debug('start fetch product info');
        }
    }, [visible]);
    return <>
        <Modal popup
               animationType={animationType || 'slide-up'}
               visible={visible}
               transparent
               maskClosable={true}
               onClose={onClose}
               title={title}
               footer={[{text: 'Đóng', onPress: onClose}]}
               wrapProps={{onTouchStart: onWrapTouchStart}}
            // afterClose={}
        >
            <div
                // style={{height: 100, overflow: 'scroll'}}
            >
                <List>
                    {Object.entries(TEST_PRODUCT_INFO).map(([key, value]) => {
                        return renderInfo(key, value);
                    })}
                </List>
            </div>
        </Modal>
    </>;
}
