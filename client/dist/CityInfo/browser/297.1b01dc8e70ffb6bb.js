"use strict";(self.webpackChunkCityInfo=self.webpackChunkCityInfo||[]).push([[297],{6297:(T,c,s)=>{s.r(c),s.d(c,{SuperadminModule:()=>w});var r=s(6895),l=s(9071),p=s(3693),n=s(8274),a=s(2673);let d=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="all-ads.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-all-ads"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})(),m=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="all-events.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-all-events"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})(),u=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="all-invoices.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-all-invoices"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})(),f=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="cities.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-cities"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})(),h=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="districts.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-district"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})(),C=(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="position_price.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-position-price"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})();var g=s(6209),v=s(8027),y=s(3250);let A=(()=>{class t{constructor(e){this.helpService=e}ngOnInit(){this.language=this.helpService.getLanguage()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(y.s))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-not-found"]],decls:6,vars:1,consts:[[1,"outer"],[1,"middle"],[1,"inner"],["src","../../../assets/images/no-data.jpg","alt","no-data",2,"width","310px"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2),n._UZ(3,"img",3),n.TgZ(4,"h4"),n._uU(5),n.qZA()()()()),2&e&&(n.xp6(5),n.Oqu(o.language.noDataFound))}}),t})();function I(t,i){if(1&t&&n._UZ(0,"app-ad-card",4),2&t){const e=n.oxw();n.Q6J("data",e.data)("additionalInformation",e.additionalInformation)}}function P(t,i){1&t&&n._UZ(0,"app-not-found")}const U=[{path:"",redirectTo:"users",pathMatch:"full"},{path:"cities",component:f},{path:"users",component:(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="users.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-users"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})()},{path:"districts",component:h},{path:"position-prices",component:C},{path:"request-ads",component:(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="request-ads.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-request-ads"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})()},{path:"all-ads",component:d},{path:"all-events",component:m},{path:"preview-ad/:id",component:(()=>{class t{constructor(e,o){this.router=e,this.service=o}ngOnInit(){console.log(this.router.snapshot.params.id),this.service.callGetMethod("/api/getRequestAdById",this.router.snapshot.params.id).subscribe(e=>{if(e&&e.length>0){const o=e[0];this.data=o,this.additionalInformation={city:o.city,position:o.position,buyer:o.firstname,start_date:o.start_date,expired_date:o.expired_date}}})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(p.gz),n.Y36(g.f))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-preview-ad"]],decls:5,vars:2,consts:[[1,"container","mt-4","col-md-3"],[1,"text-center","mb-5"],[3,"data","additionalInformation",4,"ngIf"],[4,"ngIf"],[3,"data","additionalInformation"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"h4",1),n._uU(2,"Request for ad"),n.qZA(),n.YNc(3,I,1,2,"app-ad-card",2),n.YNc(4,P,1,0,"app-not-found",3),n.qZA()),2&e&&(n.xp6(3),n.Q6J("ngIf",o.data),n.xp6(1),n.Q6J("ngIf",!o.data||0==o.data.lenght))},dependencies:[r.O5,v.v,A]}),t})()},{path:"all-invoices",component:u},{path:"all-places",component:(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="all-places.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-all-places"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})()},{path:"categories",component:(()=>{class t{constructor(){this.path="/grids/superadmin",this.file="categories.json"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-categories"]],decls:1,vars:2,consts:[[3,"path","file"]],template:function(e,o){1&e&&n._UZ(0,"app-dynamic-grid",0),2&e&&n.Q6J("path",o.path)("file",o.file)},dependencies:[a.d]}),t})()}];let F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[p.Bz.forChild(U),p.Bz]}),t})();var Z=s(3356);let w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[r.ez,F,l.w,Z.p]}),t})()}}]);