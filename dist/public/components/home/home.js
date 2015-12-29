var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var HomeCmp = (function () {
    function HomeCmp() {
    }
    HomeCmp = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <h1>Howdy!</h1>\n\n    <h2>\n      Gratz! <smile></smile>\n    </h2>\n\n    <p class=\"note\">\n      Your deployment of Angular 2 Seed worked perfectly!\n      Click <em>about (above)</em> to get your reward!\n    </p>\n  ",
            styles: ["\n    .note {\n      color: #a8a8a8;\n    }\n    smile {\n      width: 32px;\n      height: 32px;\n      display: inline-block;\n      vertical-align: bottom;\n      background: url(\"./assets/img/smile.png\");\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeCmp);
    return HomeCmp;
})();
exports.HomeCmp = HomeCmp;

//# sourceMappingURL=home.js.map
