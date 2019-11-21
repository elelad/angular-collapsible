import {
  AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit,
  Renderer2, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {
  NgCollapsibleArrowSide, NgCollapsibleCloseAttribute, NgCollapsibleDefaultOptions, NgCollapsibleOptions,
  ionicCloseIcon, ionicOpenIcon, NgCollapsibleIconSet, mdCloseIcon, mdOpenIcon, plusMinusCloseIcon, plusMinusOpenIcon
} from './ng-collapsible.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[ngCollapsible]',
  template: `
  <style>
    .ngCollapseHeaderBox{display: flex;flex-direction: row;align-items: center;cursor: pointer;}
    .ngCollapseHeader{flex: 1;}
    .ngCollapseIcon{width: 24px;height: 24px;margin-left: 16px;margin-right: 16px;}
    .ngCollapseIcon svg{fill: inherit;font-size: inherit;background: inherit;}
    .ngCollapseItems{}
  </style>
  <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class NgCollapsibleComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private id: number;
  // tslint:disable-next-line: variable-name
  private _ngCollapseOptions: NgCollapsibleOptions = { ...NgCollapsibleDefaultOptions };
  @Input() set ngCollapseOptions(inputOptions: NgCollapsibleOptions) {
    this._ngCollapseOptions = { ...NgCollapsibleDefaultOptions };
    for (const key in inputOptions) {
      if (inputOptions.hasOwnProperty(key) && this.ngCollapseOptions.hasOwnProperty(key)) {
        this._ngCollapseOptions[key] = inputOptions[key];
      }
    }
  }
  get ngCollapseOptions() {
    return this._ngCollapseOptions;
  }
  items: any;
  header: HTMLElement;
  headerBox: HTMLElement;
  itemsBox: HTMLElement;
  openIcon: HTMLElement;
  closeIcon: HTMLElement;
  @Input() isOpen = false;
  htmlObserver: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.id = Math.floor(Math.random() * 10000000);
  }

  ngAfterViewInit() {
    this.el.nativeElement.className += ' ' + this.id;
    this.initCollapsible();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpen && !changes.isOpen.firstChange && changes.isOpen.currentValue !== changes.isOpen.previousValue) {
      this.hideItems();
      this.changeIcon();
    }
  }

  ngOnDestroy(): void {
    if (this.htmlObserver) {
      this.htmlObserver.disconnect();
    }
    if (this.headerBox) {
      this.headerBox.removeEventListener('click', this.clickListener);
      this.headerBox.removeEventListener('keydown', this.keydownListener);
    }
  }


  initCollapsible() {
    if (this.el.nativeElement.children.length <= 0) { return; }
    this.header = this.el.nativeElement.children.item(0);
    if (this.el.nativeElement.children.length < 1) { return; }
    this.items = this.el.nativeElement.children;
    this.buildHeader();
    this.buildIcon();
    this.buildItems();
    this.changeIcon();
    this.hideItems();
    this.registerListeners();
    this.addAccessibility();


  }

  registerListeners() {
    this.headerBox.addEventListener('click', this.clickListener);
    this.headerBox.addEventListener('keydown', this.keydownListener);
    if (this.ngCollapseOptions.accordion) {
      this.htmlObserver = new MutationObserver(this.onHtmlChange);
      this.htmlObserver.observe(this.el.nativeElement, { attributes: true });
    }
  }

  onHtmlChange = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === NgCollapsibleCloseAttribute) {
        this.isOpen = false;
        this.changeIcon();
        this.hideItems();
        this.addAccessibility();
      }
    }
  }

  clickListener = () => {
    this.toggleCollapse();
  }

  keydownListener = (e) => {
    if (e.code.includes('Enter')) {
      this.headerBox.click();
    }
  }

  buildHeader() {
    this.headerBox = this.renderer.createElement('div');
    this.renderer.addClass(this.headerBox, 'ngCollapseHeaderBox');
    this.renderer.insertBefore(this.el.nativeElement, this.headerBox, this.header);
    this.renderer.appendChild(this.headerBox, this.header);
    this.renderer.addClass(this.header, 'ngCollapseHeader');
  }

  buildIcon() {
    const iconChild = this.renderer.createElement('div');
    iconChild.className += 'ngCollapseIcon';
    const icons = this.getIcon();
    iconChild.innerHTML = `
        <span [hidden]="!isOpen" class="ngCollapseCloseIcon">${icons.closeIcon}</span>
        <span [hidden]="isOpen" class="ngCollapseOpenIcon">${icons.openIcon}</span>
      `;
    if (this.ngCollapseOptions.arrowSide === NgCollapsibleArrowSide.start && this.ngCollapseOptions.showArrow) {
      this.renderer.insertBefore(this.headerBox, iconChild, this.header);
    } else if (this.ngCollapseOptions.arrowSide === NgCollapsibleArrowSide.end && this.ngCollapseOptions.showArrow) {
      this.renderer.appendChild(this.headerBox, iconChild);
    } else {
      // this.renderer.appendChild(this.headerBox, this.header);
    }
    this.closeIcon = this.headerBox.getElementsByClassName('ngCollapseCloseIcon').item(0) as HTMLElement;
    this.openIcon = this.headerBox.getElementsByClassName('ngCollapseOpenIcon').item(0) as HTMLElement;
  }

  getIcon() {
    switch (this.ngCollapseOptions.iconSet) {
      case NgCollapsibleIconSet.ionic:
        return { closeIcon: ionicCloseIcon, openIcon: ionicOpenIcon };
        break;
      case NgCollapsibleIconSet.md:
        return { closeIcon: mdCloseIcon, openIcon: mdOpenIcon };
        break;
      case NgCollapsibleIconSet.plusMinus:
        return { closeIcon: plusMinusCloseIcon, openIcon: plusMinusOpenIcon };
        break;
      default:
        return { closeIcon: ionicCloseIcon, openIcon: ionicOpenIcon };
        break;
    }
  }

  buildItems() {
    if (this.items <= 1) { return; }
    this.itemsBox = this.renderer.createElement('div');
    this.renderer.addClass(this.itemsBox, 'ngCollapseItems');
    for (const i = 1; i < this.items.length;) {
      this.renderer.appendChild(this.itemsBox, this.items.item(i));
    }
    this.renderer.appendChild(this.el.nativeElement, this.itemsBox);
  }

  hideItems() {
    if (this.isOpen) {
      this.itemsBox.style.display = '';
    } else {
      this.itemsBox.style.display = 'none';
    }
  }

  changeIcon() {
    if (!this.ngCollapseOptions.showArrow) { return; }
    if (this.isOpen) {
      this.closeIcon.style.display = 'none';
      this.openIcon.style.display = '';
    } else {
      this.openIcon.style.display = 'none';
      this.closeIcon.style.display = '';
    }
  }

  toggleCollapse() {
    this.isOpen = !this.isOpen;
    this.changeIcon();
    this.hideItems();
    if (this.ngCollapseOptions.accordion) {
      const allNgCollapseElements: HTMLElement[] = document.querySelectorAll('[ngCollapsible]') as any as Array<HTMLElement>;
      allNgCollapseElements.forEach(el => {
        if (!el.classList.contains(this.id.toString())) {
          el.setAttribute(NgCollapsibleCloseAttribute, '');
        }
      });
    }
    this.addAccessibility();
  }

  addAccessibility() {
    if (this.ngCollapseOptions.accessibility) {
      this.headerBox.setAttribute('tabindex', '0');
      this.headerBox.setAttribute('aria-expanded', this.isOpen.toString());
      this.itemsBox.setAttribute('aria-hidden', (!this.isOpen).toString());
    }
  }

  fixHeaderAngularNgContentCss() { // no need if ViewEncapsulation.None
    // const attrs = this.header.attributes;
    // let newAtt = '';
    // let attToRemove = '';
    // // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < attrs.length; i++) {
    //   const at = attrs[i];
    //   if (at.name.startsWith('_ngcontent')) {
    //     attToRemove = at.name;
    //     const atName = at.name.replace('=""', '');
    //     const indexOf = atName.lastIndexOf('-') + 1;
    //     const atStart = atName.substring(0, indexOf + 1);
    //     const atNum = +atName.substring(indexOf + 1);
    //     newAtt = atStart + (atNum + 1);
    //   }
    // }
    // if (newAtt !== '') {
    //   this.header.setAttribute(newAtt, '');
    //   this.header.removeAttribute(attToRemove);
    // }
  }

}
