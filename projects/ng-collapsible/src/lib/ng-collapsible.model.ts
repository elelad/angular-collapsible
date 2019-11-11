


export interface NgCollapsibleOptions {
    showArrow?: boolean;
    arrowSide?: NgCollapsibleArrowSide;
    accessibility?: boolean;
    iconSet?: NgCollapsibleIconSet;
    accordion?: boolean;
}

export enum NgCollapsibleArrowSide {
    start = 'start',
    end = 'end'
}

export enum NgCollapsibleIconSet {
    ionic = 'ionic',
    md = 'md'
}


export const NgCollapsibleDefaultOptions: NgCollapsibleOptions = {
    showArrow: true,
    arrowSide: NgCollapsibleArrowSide.start,
    accessibility: true,
    iconSet: NgCollapsibleIconSet.ionic,
    accordion: false
};

// console.log(NgCollapsibleDefaultOptions);


// tslint:disable-next-line: max-line-length
export const ionicForwardIcon = `<svg width="100%" hieght="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>`;
// tslint:disable-next-line: max-line-length
export const ionicDownIcon = `<svg width="100%" hieght="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="max-width: 24px;max-height:24px"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg>`;

export const NgCollapsibleCloseAttribute = 'close-ng-collapsible';
