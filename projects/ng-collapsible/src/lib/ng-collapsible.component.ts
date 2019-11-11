import {
  OnInit, Directive, ElementRef, AfterViewInit, Input, Renderer2,
  SimpleChanges, OnChanges, OnDestroy, Component, ViewEncapsulation
} from '@angular/core';
import {
  ionicForwardIcon, ionicDownIcon,
  NgCollapsibleOptions,
  NgCollapsibleDefaultOptions,
  NgCollapsibleArrowSide,
  NgCollapsibleCloseAttribute
} from './ng-collapsible.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[ngCollapsible]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./ng-collapsible.component.scss'],
  // encapsulation: ViewEncapsulation.None
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
    console.log('directive works');
  }

  ngAfterViewInit() {
    this.id = Math.floor(Math.random() * 10000000);
    this.el.nativeElement.className += this.id;
    this.initCollapsible();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpen && !changes.isOpen.firstChange && changes.isOpen.currentValue !== changes.isOpen.previousValue) {
      console.log('isOpen changed');
      this.hideItems();
      this.changeIcon();
    }
  }

  ngOnDestroy(): void {
    this.htmlObserver.disconnect();
    this.headerBox.removeEventListener('click', this.clickListener);
    this.headerBox.removeEventListener('keydown', this.keydownListener);
  }


  initCollapsible() {
    this.items = this.el.nativeElement.children;
    this.buildHeader();
    this.buildItems();
    this.changeIcon();
    this.hideItems();
    this.registerListners();

  }

  registerListners() {
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
    this.header = this.items.item(0);
    this.headerBox = this.renderer.createElement('div');
    if (this._ngCollapseOptions.accessibility) {
      this.headerBox.setAttribute('tabindex', '0');
    }
    this.renderer.addClass(this.headerBox, 'ngCollapseHeaderBox');
    this.renderer.insertBefore(this.el.nativeElement, this.headerBox, this.header);
    this.renderer.appendChild(this.headerBox, this.header);
    this.renderer.addClass(this.header, 'ngCollapseHeader');
    // this.renderer.setStyle(this.header, 'flex-grow', 1);
    const iconChild = this.renderer.createElement('div');
    iconChild.className += 'ngCollapseIcon';
    iconChild.innerHTML = `
        <span [hidden]="!isOpen" class="ngCollapseCloseIcon">${ionicForwardIcon}</span>
        <span [hidden]="isOpen" class="ngCollapseOpenIcon">${ionicDownIcon}</span>
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

  buildItems() {
    this.itemsBox = this.renderer.createElement('div');
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
      const allNgCollapseElements: NodeListOf<Element> = document.querySelectorAll('[ngCollapsible]');
      allNgCollapseElements.forEach(el => {
        if (!el.classList.contains(this.id.toString())) {
          el.setAttribute(NgCollapsibleCloseAttribute, '');
        }
      });
    }
  }

}
