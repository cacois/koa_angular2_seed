import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

@Directive({
    selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
    publicRoutes:any;
    private parentRouter:Router;

    constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
                _parentRouter:Router,  @Attribute('name') nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };
    }

    activate(instruction:ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
            this.parentRouter.navigateByUrl('/login'); // TODO: Preserve target to deep-link post-login?
        }
        return super.activate(instruction);
    }
}
