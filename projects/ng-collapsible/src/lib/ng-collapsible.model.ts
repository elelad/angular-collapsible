// tslint:disable: max-line-length

export interface NgCollapsibleOptions {
    showArrow?: boolean; // choose if to add an icon to the header. default true
    arrowSide?: NgCollapsibleArrowSide; // choose the side of the icon. default `start`
    accessibility?: boolean; // choose to add an accessibility attributes to the clickable header and the collapse items. default true
    iconSet?: NgCollapsibleIconSet; // choose an icon set. default 'ionic'
    accordion?: boolean; // declare the element as a part of accordion, to close it when other accordion element will open. default false
}

export enum NgCollapsibleArrowSide {
    start = 'start',
    end = 'end'
}

export enum NgCollapsibleIconSet {
    ionic = 'ionic',
    md = 'md',
    plusMinus = 'plus-minus'
}


export const NgCollapsibleDefaultOptions: NgCollapsibleOptions = {
    showArrow: true,
    arrowSide: NgCollapsibleArrowSide.start,
    accessibility: true,
    iconSet: NgCollapsibleIconSet.ionic,
    accordion: false
};

export const ionicCloseIcon = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>`;
export const ionicOpenIcon = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="max-width: 24px;max-height:24px"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg>`;
export const mdCloseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
export const mdOpenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
export const plusMinusCloseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
export const plusMinusOpenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;

export const NgCollapsibleCloseAttribute = 'close-ng-collapsible';
