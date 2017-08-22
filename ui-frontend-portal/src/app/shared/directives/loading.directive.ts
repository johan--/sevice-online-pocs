import {Directive, Input, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Component} from '@angular/core';

@Component({
  selector: 'loading-progress-view',
  template: `<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated"
         role="progressbar" aria-valuenow="100"
         aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
  </div>`
})
export class LoadingComponent {}


@Directive({
  selector: '[loadingProgress]'
})
export class LoadingDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private componentFactory: ComponentFactoryResolver
  ) { }

  @Input('loadingProgress') set loadingState(state: boolean) {
    if (state) {
      this.viewContainer.clear();
      this.viewContainer.createComponent(this.componentFactory.resolveComponentFactory(LoadingComponent));
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }

  }

}
