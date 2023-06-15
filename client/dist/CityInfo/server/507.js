"use strict";
exports.id = 507;
exports.ids = [507];
exports.modules = {

/***/ 12841:
/*!**********************************************************************************************************!*\
  !*** ./src/app/components/dashboard/pages/profile-settings/change-password/change-password.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangePasswordComponent": () => (/* binding */ ChangePasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_services_help_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/help.service */ 59993);
/* harmony import */ var src_app_services_configuration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/configuration.service */ 74937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _dynamic_component_dynamic_forms_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dynamic-component/dynamic-forms/dynamic-forms.component */ 51171);





class ChangePasswordComponent {
    constructor(helpService, configurationService) {
        this.helpService = helpService;
        this.configurationService = configurationService;
        this.path = '/settings/setting-items';
        this.file = 'change-password.json';
    }
    ngOnInit() {
        if (this.helpService.getLanguage()) {
            this.language = this.helpService.getLanguage();
        }
        else {
            this.configurationService.getLanguage().subscribe((data) => {
                this.language = data;
            });
        }
    }
}
ChangePasswordComponent.ɵfac = function ChangePasswordComponent_Factory(t) { return new (t || ChangePasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_help_service__WEBPACK_IMPORTED_MODULE_0__.HelpService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_configuration_service__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService)); };
ChangePasswordComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ChangePasswordComponent, selectors: [["app-change-password"]], decls: 9, vars: 4, consts: [[1, "main"], [1, "responsive-wrapper"], [1, "horizontal-tabs"], ["routerLink", "/dashboard/settings/change-personal-info"], ["routerLink", "/dashboard/settings/change-password", 1, "active"], [1, "content"], [3, "path", "file"]], template: function ChangePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "main", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "app-dynamic-forms", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.language.myDetails);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.language.changePassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("path", ctx.path)("file", ctx.file);
    } }, dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _dynamic_component_dynamic_forms_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_2__.DynamicFormsComponent], styles: [".main-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n}\n.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  line-height: 1.25;\n}\n@media (max-width: 550px) {\n  .main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n}\n.horizontal-tabs[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  display: flex;\n  align-items: center;\n  overflow-x: auto;\n}\n@media (max-width: 1000px) {\n  .horizontal-tabs[_ngcontent-%COMP%] {\n    scrollbar-width: none;\n    position: relative;\n  }\n  .horizontal-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  height: 48px;\n  padding: 0 0.25rem;\n  font-weight: 500;\n  color: inherit;\n  border-bottom: 3px solid transparent;\n  text-decoration: none;\n  transition: 0.15s ease;\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .horizontal-tabs[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: var(--c-accent-primary);\n  border-bottom-color: var(--c-accent-primary);\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n.content-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 2rem;\n  margin-top: -1px;\n  border-top: 1px solid var(--c-border-primary);\n}\n.content-header-intro[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.content-header-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--c-text-secondary);\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n}\n@media (min-width: 800px) {\n  .content-header-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child {\n    display: none;\n  }\n}\n.content[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--c-border-primary);\n  display: flex;\n  align-items: flex-start;\n}\n.content-panel[_ngcontent-%COMP%] {\n  display: none;\n  max-width: 280px;\n  width: 25%;\n  padding: 2rem 1rem 2rem 0;\n  margin-right: 3rem;\n}\n@media (min-width: 800px) {\n  .content-panel[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.content-main[_ngcontent-%COMP%] {\n  padding-top: 2rem;\n  padding-bottom: 6rem;\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUFDRjtBQUNFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0o7QUFBSTtFQUpGO0lBS0ksbUJBQUE7RUFHSjtBQUNGO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBRUY7QUFERTtFQUxGO0lBTUkscUJBQUE7SUFDQSxrQkFBQTtFQUlGO0VBSEU7SUFDRSxhQUFBO0VBS0o7QUFDRjtBQUZFO0VBQ0Usb0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxvQ0FBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7QUFJSjtBQUhJO0VBR0UsOEJBQUE7RUFDQSw0Q0FBQTtBQUdOO0FBQUk7RUFDRSxpQkFBQTtBQUVOO0FBR0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkNBQUE7QUFBRjtBQUlFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQURKO0FBSUU7RUFDRSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUZKO0FBUUk7RUFERjtJQUVJLGFBQUE7RUFKSjtBQUNGO0FBUUE7RUFDRSw2Q0FBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQUxGO0FBT0E7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQUpGO0FBS0U7RUFORjtJQU9JLGNBQUE7RUFGRjtBQUNGO0FBS0E7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQUZGO0FBS0EsZUFBQSIsImZpbGUiOiJjaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlNFVFRJTkdTKi9cclxuLm1haW4taGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcbiAgaDEge1xyXG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjI1O1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDU1MHB4KSB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uaG9yaXpvbnRhbC10YWJzIHtcclxuICBtYXJnaW4tdG9wOiAxLjVyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xyXG4gICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYSB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGZsZXgtc2hyaW5rOiAwO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNDhweDtcclxuICAgIHBhZGRpbmc6IDAgMC4yNXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIHRyYW5zaXRpb246IDAuMTVzIGVhc2U7XHJcbiAgICAmOmhvdmVyLFxyXG4gICAgJjpmb2N1cyxcclxuICAgICYuYWN0aXZlIHtcclxuICAgICAgY29sb3I6IHZhcigtLWMtYWNjZW50LXByaW1hcnkpO1xyXG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1jLWFjY2VudC1wcmltYXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICAmICsgKiB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmNvbnRlbnQtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nLXRvcDogMnJlbTtcclxuICBtYXJnaW4tdG9wOiAtMXB4O1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1jLWJvcmRlci1wcmltYXJ5KTtcclxufVxyXG5cclxuLmNvbnRlbnQtaGVhZGVyLWludHJvIHtcclxuICBoMiB7XHJcbiAgICBmb250LXNpemU6IDEuMjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBjb2xvcjogdmFyKC0tYy10ZXh0LXNlY29uZGFyeSk7XHJcbiAgICBtYXJnaW4tdG9wOiAwLjI1cmVtO1xyXG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgfVxyXG59XHJcblxyXG4uY29udGVudC1oZWFkZXItYWN0aW9ucyB7XHJcbiAgYTpmaXJzdC1jaGlsZCB7XHJcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogODAwcHgpIHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tYy1ib3JkZXItcHJpbWFyeSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxufVxyXG4uY29udGVudC1wYW5lbCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBtYXgtd2lkdGg6IDI4MHB4O1xyXG4gIHdpZHRoOiAyNSU7XHJcbiAgcGFkZGluZzogMnJlbSAxcmVtIDJyZW0gMDtcclxuICBtYXJnaW4tcmlnaHQ6IDNyZW07XHJcbiAgQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbn1cclxuXHJcbi5jb250ZW50LW1haW4ge1xyXG4gIHBhZGRpbmctdG9wOiAycmVtO1xyXG4gIHBhZGRpbmctYm90dG9tOiA2cmVtO1xyXG4gIGZsZXgtZ3JvdzogMTtcclxufVxyXG5cclxuLypFTkQgU0VUVElOR1MqL1xyXG4iXX0= */"] });


/***/ }),

/***/ 61597:
/*!********************************************************************************************************************!*\
  !*** ./src/app/components/dashboard/pages/profile-settings/change-personal-info/change-personal-info.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangePersonalInfoComponent": () => (/* binding */ ChangePersonalInfoComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_services_help_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/help.service */ 59993);
/* harmony import */ var src_app_services_configuration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/configuration.service */ 74937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _dynamic_component_dynamic_forms_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dynamic-component/dynamic-forms/dynamic-forms.component */ 51171);





class ChangePersonalInfoComponent {
    constructor(helpService, configurationService) {
        this.helpService = helpService;
        this.configurationService = configurationService;
        this.path = '/settings/setting-items';
        this.file = 'change-personal-info.json';
    }
    ngOnInit() {
        if (this.helpService.getLanguage()) {
            this.language = this.helpService.getLanguage();
        }
        else {
            this.configurationService.getLanguage().subscribe((data) => {
                this.language = data;
            });
        }
    }
}
ChangePersonalInfoComponent.ɵfac = function ChangePersonalInfoComponent_Factory(t) { return new (t || ChangePersonalInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_help_service__WEBPACK_IMPORTED_MODULE_0__.HelpService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_configuration_service__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService)); };
ChangePersonalInfoComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ChangePersonalInfoComponent, selectors: [["app-change-personal-info"]], decls: 9, vars: 4, consts: [[1, "main"], [1, "responsive-wrapper"], [1, "horizontal-tabs"], ["routerLink", "/dashboard/settings/change-personal-info", 1, "active"], ["routerLink", "/dashboard/settings/change-password"], [1, "content"], [3, "path", "file"]], template: function ChangePersonalInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "main", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "app-dynamic-forms", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.language.myDetails);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.language.changePassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("path", ctx.path)("file", ctx.file);
    } }, dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _dynamic_component_dynamic_forms_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_2__.DynamicFormsComponent], styles: [".main-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n}\n.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  line-height: 1.25;\n}\n@media (max-width: 550px) {\n  .main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n}\n.horizontal-tabs[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  display: flex;\n  align-items: center;\n  overflow-x: auto;\n}\n@media (max-width: 1000px) {\n  .horizontal-tabs[_ngcontent-%COMP%] {\n    scrollbar-width: none;\n    position: relative;\n  }\n  .horizontal-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  height: 48px;\n  padding: 0 0.25rem;\n  font-weight: 500;\n  color: inherit;\n  border-bottom: 3px solid transparent;\n  text-decoration: none;\n  transition: 0.15s ease;\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .horizontal-tabs[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: var(--c-accent-primary);\n  border-bottom-color: var(--c-accent-primary);\n}\n.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n.content-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 2rem;\n  margin-top: -1px;\n  border-top: 1px solid var(--c-border-primary);\n}\n.content-header-intro[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.content-header-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--c-text-secondary);\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n}\n@media (min-width: 800px) {\n  .content-header-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child {\n    display: none;\n  }\n}\n.content[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--c-border-primary);\n  display: flex;\n  align-items: flex-start;\n}\n.content-panel[_ngcontent-%COMP%] {\n  display: none;\n  max-width: 280px;\n  width: 25%;\n  padding: 2rem 1rem 2rem 0;\n  margin-right: 3rem;\n}\n@media (min-width: 800px) {\n  .content-panel[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.content-main[_ngcontent-%COMP%] {\n  padding-top: 2rem;\n  padding-bottom: 6rem;\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZS1wZXJzb25hbC1pbmZvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtBQUNGO0FBQ0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDSjtBQUFJO0VBSkY7SUFLSSxtQkFBQTtFQUdKO0FBQ0Y7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQURFO0VBTEY7SUFNSSxxQkFBQTtJQUNBLGtCQUFBO0VBSUY7RUFIRTtJQUNFLGFBQUE7RUFLSjtBQUNGO0FBRkU7RUFDRSxvQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG9DQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtBQUlKO0FBSEk7RUFHRSw4QkFBQTtFQUNBLDRDQUFBO0FBR047QUFBSTtFQUNFLGlCQUFBO0FBRU47QUFHQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2Q0FBQTtBQUFGO0FBSUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBREo7QUFJRTtFQUNFLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBRko7QUFRSTtFQURGO0lBRUksYUFBQTtFQUpKO0FBQ0Y7QUFRQTtFQUNFLDZDQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBTEY7QUFPQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBSkY7QUFLRTtFQU5GO0lBT0ksY0FBQTtFQUZGO0FBQ0Y7QUFLQTtFQUNFLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0FBRkY7QUFLQSxlQUFBIiwiZmlsZSI6ImNoYW5nZS1wZXJzb25hbC1pbmZvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypTRVRUSU5HUyovXHJcbi5tYWluLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMS43NXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1NTBweCkge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmhvcml6b250YWwtdGFicyB7XHJcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcclxuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGEge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICBwYWRkaW5nOiAwIDAuMjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6IGluaGVyaXQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjE1cyBlYXNlO1xyXG4gICAgJjpob3ZlcixcclxuICAgICY6Zm9jdXMsXHJcbiAgICAmLmFjdGl2ZSB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1jLWFjY2VudC1wcmltYXJ5KTtcclxuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0tYy1hY2NlbnQtcHJpbWFyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgJiArICoge1xyXG4gICAgICBtYXJnaW4tbGVmdDogMXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5jb250ZW50LWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZy10b3A6IDJyZW07XHJcbiAgbWFyZ2luLXRvcDogLTFweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tYy1ib3JkZXItcHJpbWFyeSk7XHJcbn1cclxuXHJcbi5jb250ZW50LWhlYWRlci1pbnRybyB7XHJcbiAgaDIge1xyXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgY29sb3I6IHZhcigtLWMtdGV4dC1zZWNvbmRhcnkpO1xyXG4gICAgbWFyZ2luLXRvcDogMC4yNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIH1cclxufVxyXG5cclxuLmNvbnRlbnQtaGVhZGVyLWFjdGlvbnMge1xyXG4gIGE6Zmlyc3QtY2hpbGQge1xyXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uY29udGVudCB7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWMtYm9yZGVyLXByaW1hcnkpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuLmNvbnRlbnQtcGFuZWwge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgbWF4LXdpZHRoOiAyODBweDtcclxuICB3aWR0aDogMjUlO1xyXG4gIHBhZGRpbmc6IDJyZW0gMXJlbSAycmVtIDA7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzcmVtO1xyXG4gIEBtZWRpYSAobWluLXdpZHRoOiA4MDBweCkge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG59XHJcblxyXG4uY29udGVudC1tYWluIHtcclxuICBwYWRkaW5nLXRvcDogMnJlbTtcclxuICBwYWRkaW5nLWJvdHRvbTogNnJlbTtcclxuICBmbGV4LWdyb3c6IDE7XHJcbn1cclxuXHJcbi8qRU5EIFNFVFRJTkdTKi9cclxuIl19 */"] });


/***/ }),

/***/ 23626:
/*!************************************************************************************************************!*\
  !*** ./src/app/components/dashboard/pages/profile-settings/profile-settings/profile-settings.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileSettingsComponent": () => (/* binding */ ProfileSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 52816);


class ProfileSettingsComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProfileSettingsComponent.ɵfac = function ProfileSettingsComponent_Factory(t) { return new (t || ProfileSettingsComponent)(); };
ProfileSettingsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileSettingsComponent, selectors: [["app-profile-settings"]], decls: 1, vars: 0, template: function ProfileSettingsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLXNldHRpbmdzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 74416:
/*!********************************************************************************************************!*\
  !*** ./src/app/components/dashboard/pages/profile-settings/routing-module/profile-settings-routing.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileSettingsRouting": () => (/* binding */ ProfileSettingsRouting)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../change-password/change-password.component */ 12841);
/* harmony import */ var _change_personal_info_change_personal_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../change-personal-info/change-personal-info.component */ 61597);
/* harmony import */ var _profile_settings_profile_settings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../profile-settings/profile-settings.component */ 23626);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);






const routes = [
    {
        path: '',
        component: _profile_settings_profile_settings_component__WEBPACK_IMPORTED_MODULE_2__.ProfileSettingsComponent
    },
    {
        path: 'change-personal-info',
        component: _change_personal_info_change_personal_info_component__WEBPACK_IMPORTED_MODULE_1__.ChangePersonalInfoComponent
    },
    {
        path: 'change-password',
        component: _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_0__.ChangePasswordComponent,
    },
];
class ProfileSettingsRouting {
}
ProfileSettingsRouting.ɵfac = function ProfileSettingsRouting_Factory(t) { return new (t || ProfileSettingsRouting)(); };
ProfileSettingsRouting.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ProfileSettingsRouting });
ProfileSettingsRouting.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ProfileSettingsRouting, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 25507:
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/dashboard/pages/profile-settings/routing-module/profile-settings.module.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileSettingsdModule": () => (/* binding */ ProfileSettingsdModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _profile_settings_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-settings-routing */ 74416);
/* harmony import */ var _profile_settings_profile_settings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../profile-settings/profile-settings.component */ 23626);
/* harmony import */ var src_app_components_dynamic_component_dynamic_module_dynamic_dynamic_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module */ 99879);
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-password/change-password.component */ 12841);
/* harmony import */ var _change_personal_info_change_personal_info_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../change-personal-info/change-personal-info.component */ 61597);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);







class ProfileSettingsdModule {
}
ProfileSettingsdModule.ɵfac = function ProfileSettingsdModule_Factory(t) { return new (t || ProfileSettingsdModule)(); };
ProfileSettingsdModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: ProfileSettingsdModule });
ProfileSettingsdModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _profile_settings_routing__WEBPACK_IMPORTED_MODULE_0__.ProfileSettingsRouting, src_app_components_dynamic_component_dynamic_module_dynamic_dynamic_module__WEBPACK_IMPORTED_MODULE_2__.DynamicModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProfileSettingsdModule, { declarations: [_profile_settings_profile_settings_component__WEBPACK_IMPORTED_MODULE_1__.ProfileSettingsComponent,
        _change_personal_info_change_personal_info_component__WEBPACK_IMPORTED_MODULE_4__.ChangePersonalInfoComponent,
        _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_3__.ChangePasswordComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _profile_settings_routing__WEBPACK_IMPORTED_MODULE_0__.ProfileSettingsRouting, src_app_components_dynamic_component_dynamic_module_dynamic_dynamic_module__WEBPACK_IMPORTED_MODULE_2__.DynamicModule] }); })();


/***/ })

};
;
//# sourceMappingURL=507.js.map