import {atom} from 'recoil';

export const customerCodeAtom          = atom({key: 'customerCode', default: ''});
export const showProductInfoPanelAtom  = atom({key: 'showProductInfoPanel', default: false});
export const showWarrantyPanelAtom     = atom({key: 'showWarrantyPanel', default: false});
export const showSendFeedbackPanelAtom = atom({key: 'showSendFeedbackPanel', default: false});
export const productInfoAtom           = atom({key: 'productInfo', default: {}});
