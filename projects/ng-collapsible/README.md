# Ng-Collapsible
Simple Angular component (as directive) for collapse. No dependencies, no need for Bootstrap or jQuery.

## How to Use
* Install: `npm i ng-collapsible --save`
* Import to your @NgModule or any other module file : `import { NgCollapsibleModule } from 'ng-collapsible';`
* Add to the module import sections: `imports: [ BrowserModule, NgCollapsibleModule]`
* Add the attribute ngCollapsible to your element:
    ```html
    <div ngCollapsible>
        <h4>Simple Collapsible: </h4>
        <li *ngFor="let item of items">{{item}}</li>
    </div>
    ```
    > Note: ngCollapsible will use the first element as a clickable header and the other as the collapsible items.


## Component Inputs
### isOpen
Use `[isOpen]` to programmatically close or open the collapse items:
```html
<div ngCollapsible [isOpen]="true">
    <h4>Start Open Collapsible:</h4>
    <div *ngFor="let item of items">{{item}}</div>
</div>
```
### ngCollapseOptions
Pass an object of type `NgCollapsibleOptions` to `[ngCollapseOptions]` in order to customize some behavior:
```typescript
interface NgCollapsibleOptions {
    showArrow?: boolean;
    arrowSide?: NgCollapsibleArrowSide;
    accessibility?: boolean;
    iconSet?: NgCollapsibleIconSet;
    accordion?: boolean;
}
```
#### Options
- showArrow: boolean - choose if to add an icon to the header. default `true`
- arrowSide: NgCollapsibleArrowSide - choose the side of the icon. default `start`
- accessibility: boolean - choose to add an accessibility attributes to the clickable header and the collapse items. default `true`
- iconSet: NgCollapsibleIconSet - choose an icon set. default `ionic`
- accordion: boolean - declare the element as a part of accordion, to close it when other accordion element will open. default `false`

#### Helpers
You have few interfaces and enums to help you fill `NgCollapsibleOptions`, all importable:
```typescript
export enum NgCollapsibleArrowSide {
    start = 'start',
    end = 'end'
}

export enum NgCollapsibleIconSet {
    ionic = 'ionic',
    md = 'md',
    plusMinus = 'plus-minus'
}
```


## Style
For compatibility the encapsulation of the component sets to `ViewEncapsulation.None`
This way you can apply any style to any element even from your global css file. The component uses few css classes, you can override them and set your own style: 
```css
.ngCollapseHeaderBox, .ngCollapseHeader, .ngCollapseIcon, .ngCollapseItems
```
To change the style of the icon change `.ngCollapseIcon svg` style.


## Compatibility
Tested with Angular 8 and Ionic with Angular 5.


## Licence 
MIT
