"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=873,exports.ids=[873],exports.modules={45873:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ProfileSettingsdModule:()=>ProfileSettingsdModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3),help_service=__webpack_require__(43250),configuration_service=__webpack_require__(74937),dynamic_forms_component=__webpack_require__(92829);class ChangePasswordComponent{constructor(helpService,configurationService){this.helpService=helpService,this.configurationService=configurationService,this.path="/settings/setting-items",this.file="change-password.json"}ngOnInit(){this.helpService.getLanguage()?this.language=this.helpService.getLanguage():this.configurationService.getLanguage().subscribe(data=>{this.language=data})}}__name(ChangePasswordComponent,"ChangePasswordComponent"),ChangePasswordComponent.\u0275fac=__name(function(t){return new(t||ChangePasswordComponent)(core.Y36(help_service.s),core.Y36(configuration_service.e))},"ChangePasswordComponent_Factory"),ChangePasswordComponent.\u0275cmp=core.Xpm({type:ChangePasswordComponent,selectors:[["app-change-password"]],decls:9,vars:4,consts:[[1,"main"],[1,"responsive-wrapper"],[1,"horizontal-tabs"],["routerLink","/dashboard/settings/change-personal-info"],["routerLink","/dashboard/settings/change-password",1,"active"],[1,"content"],[3,"path","file"]],template:__name(function(rf,ctx){1&rf&&(core.TgZ(0,"main",0)(1,"div",1)(2,"div",2)(3,"a",3),core._uU(4),core.qZA(),core.TgZ(5,"a",4),core._uU(6),core.qZA()(),core.TgZ(7,"div",5),core._UZ(8,"app-dynamic-forms",6),core.qZA()()()),2&rf&&(core.xp6(4),core.Oqu(ctx.language.myDetails),core.xp6(2),core.Oqu(ctx.language.changePassword),core.xp6(2),core.Q6J("path",ctx.path)("file",ctx.file))},"ChangePasswordComponent_Template"),dependencies:[router.yS,dynamic_forms_component.b],styles:[".main-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.75rem;font-weight:600;line-height:1.25}@media (max-width: 550px){.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:1rem}}.horizontal-tabs[_ngcontent-%COMP%]{margin-top:1.5rem;display:flex;align-items:center;overflow-x:auto}@media (max-width: 1000px){.horizontal-tabs[_ngcontent-%COMP%]{scrollbar-width:none;position:relative}.horizontal-tabs[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;flex-shrink:0;align-items:center;height:48px;padding:0 .25rem;font-weight:500;color:inherit;border-bottom:3px solid transparent;text-decoration:none;transition:.15s ease}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .horizontal-tabs[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{color:var(--c-accent-primary);border-bottom-color:var(--c-accent-primary)}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] + *[_ngcontent-%COMP%]{margin-left:1rem}.content-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding-top:2rem;margin-top:-1px;border-top:1px solid var(--c-border-primary)}.content-header-intro[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600}.content-header-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--c-text-secondary);margin-top:.25rem;font-size:.875rem;margin-bottom:1rem}@media (min-width: 800px){.content-header-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child{display:none}}.content[_ngcontent-%COMP%]{border-top:1px solid var(--c-border-primary);display:flex;align-items:flex-start}.content-panel[_ngcontent-%COMP%]{display:none;max-width:280px;width:25%;padding:2rem 1rem 2rem 0;margin-right:3rem}@media (min-width: 800px){.content-panel[_ngcontent-%COMP%]{display:block}}.content-main[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:6rem;flex-grow:1}"]});class ChangePersonalInfoComponent{constructor(helpService,configurationService){this.helpService=helpService,this.configurationService=configurationService,this.path="/settings/setting-items",this.file="change-personal-info.json"}ngOnInit(){this.helpService.getLanguage()?this.language=this.helpService.getLanguage():this.configurationService.getLanguage().subscribe(data=>{this.language=data})}}__name(ChangePersonalInfoComponent,"ChangePersonalInfoComponent"),ChangePersonalInfoComponent.\u0275fac=__name(function(t){return new(t||ChangePersonalInfoComponent)(core.Y36(help_service.s),core.Y36(configuration_service.e))},"ChangePersonalInfoComponent_Factory"),ChangePersonalInfoComponent.\u0275cmp=core.Xpm({type:ChangePersonalInfoComponent,selectors:[["app-change-personal-info"]],decls:9,vars:4,consts:[[1,"main"],[1,"responsive-wrapper"],[1,"horizontal-tabs"],["routerLink","/dashboard/settings/change-personal-info",1,"active"],["routerLink","/dashboard/settings/change-password"],[1,"content"],[3,"path","file"]],template:__name(function(rf,ctx){1&rf&&(core.TgZ(0,"main",0)(1,"div",1)(2,"div",2)(3,"a",3),core._uU(4),core.qZA(),core.TgZ(5,"a",4),core._uU(6),core.qZA()(),core.TgZ(7,"div",5),core._UZ(8,"app-dynamic-forms",6),core.qZA()()()),2&rf&&(core.xp6(4),core.Oqu(ctx.language.myDetails),core.xp6(2),core.Oqu(ctx.language.changePassword),core.xp6(2),core.Q6J("path",ctx.path)("file",ctx.file))},"ChangePersonalInfoComponent_Template"),dependencies:[router.yS,dynamic_forms_component.b],styles:[".main-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.75rem;font-weight:600;line-height:1.25}@media (max-width: 550px){.main-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:1rem}}.horizontal-tabs[_ngcontent-%COMP%]{margin-top:1.5rem;display:flex;align-items:center;overflow-x:auto}@media (max-width: 1000px){.horizontal-tabs[_ngcontent-%COMP%]{scrollbar-width:none;position:relative}.horizontal-tabs[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;flex-shrink:0;align-items:center;height:48px;padding:0 .25rem;font-weight:500;color:inherit;border-bottom:3px solid transparent;text-decoration:none;transition:.15s ease}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .horizontal-tabs[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{color:var(--c-accent-primary);border-bottom-color:var(--c-accent-primary)}.horizontal-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] + *[_ngcontent-%COMP%]{margin-left:1rem}.content-header[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding-top:2rem;margin-top:-1px;border-top:1px solid var(--c-border-primary)}.content-header-intro[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600}.content-header-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--c-text-secondary);margin-top:.25rem;font-size:.875rem;margin-bottom:1rem}@media (min-width: 800px){.content-header-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:first-child{display:none}}.content[_ngcontent-%COMP%]{border-top:1px solid var(--c-border-primary);display:flex;align-items:flex-start}.content-panel[_ngcontent-%COMP%]{display:none;max-width:280px;width:25%;padding:2rem 1rem 2rem 0;margin-right:3rem}@media (min-width: 800px){.content-panel[_ngcontent-%COMP%]{display:block}}.content-main[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:6rem;flex-grow:1}"]});class ProfileSettingsComponent{constructor(){}ngOnInit(){}}__name(ProfileSettingsComponent,"ProfileSettingsComponent"),ProfileSettingsComponent.\u0275fac=__name(function(t){return new(t||ProfileSettingsComponent)},"ProfileSettingsComponent_Factory"),ProfileSettingsComponent.\u0275cmp=core.Xpm({type:ProfileSettingsComponent,selectors:[["app-profile-settings"]],decls:1,vars:0,template:__name(function(rf,ctx){1&rf&&core._UZ(0,"router-outlet")},"ProfileSettingsComponent_Template"),dependencies:[router.lC]});const routes=[{path:"",component:ProfileSettingsComponent},{path:"change-personal-info",component:ChangePersonalInfoComponent},{path:"change-password",component:ChangePasswordComponent}];class ProfileSettingsRouting{}__name(ProfileSettingsRouting,"ProfileSettingsRouting"),ProfileSettingsRouting.\u0275fac=__name(function(t){return new(t||ProfileSettingsRouting)},"ProfileSettingsRouting_Factory"),ProfileSettingsRouting.\u0275mod=core.oAB({type:ProfileSettingsRouting}),ProfileSettingsRouting.\u0275inj=core.cJS({imports:[router.Bz.forChild(routes),router.Bz]});var dynamic_module=__webpack_require__(28700);class ProfileSettingsdModule{}__name(ProfileSettingsdModule,"ProfileSettingsdModule"),ProfileSettingsdModule.\u0275fac=__name(function(t){return new(t||ProfileSettingsdModule)},"ProfileSettingsdModule_Factory"),ProfileSettingsdModule.\u0275mod=core.oAB({type:ProfileSettingsdModule}),ProfileSettingsdModule.\u0275inj=core.cJS({imports:[common.ez,ProfileSettingsRouting,dynamic_module.w]})}};