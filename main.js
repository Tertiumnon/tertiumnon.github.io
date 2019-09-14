(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-sidenav-container class=\"sidenav-container\">\n  <mat-sidenav-content>\n\n    <app-top-menu></app-top-menu>\n\n    <main>\n      <div class=\"container\">\n        <app-projects></app-projects>\n      </div>\n    </main>\n\n    <app-footer></app-footer>\n\n  </mat-sidenav-content>\n</mat-sidenav-container>\n\n<router-outlet></router-outlet>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/footer/footer.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/footer/footer.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <div class=\"social-links\">\n        <a href=\"https://github.com/Tertiumnon\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <fa-icon [icon]=\"['fab', 'github']\"></fa-icon>\n        </a>\n        <a href=\"https://www.hackerrank.com/tertiumnon\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <fa-icon [icon]=\"['fab', 'hackerrank']\"></fa-icon>\n        </a>\n    </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/nav/nav.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/nav/nav.component.html ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav>\n  <span>Projects</span>\n</nav>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-card-dialog/project-card-dialog.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-card-dialog/project-card-dialog.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 mat-dialog-title class=\"mat-card-title\">{{data.title}}</h1>\n<div mat-dialog-content class=\"project-card-dialog-content\">\n  <img mat-card-image class=\"project-card-dialog-image\" src={{data.image}}>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">Close</button>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-card/project-card.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-card/project-card.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card class=\"project-card\">\n  <mat-card-header>\n    <mat-card-title>{{title}}</mat-card-title>\n    <mat-card-subtitle>{{year}}, {{type}}</mat-card-subtitle>\n  </mat-card-header>\n  <img mat-card-image src={{image}}>\n  <mat-card-content>\n      <mat-chip-list>\n        <mat-chip *ngFor=\"let category of categories\">{{category}}</mat-chip>\n      </mat-chip-list>\n  </mat-card-content>\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div fxLayout=\"row\" fxLayoutGap=\"10px\" gdGap=\"20px\" gdColumns=\"32% 32% 32%\">\n  <div\n    fxFlex\n    *ngFor=\"let project of projects\"\n    class=\"card-item\"\n    (click)=\"onSelect(project)\"\n  >\n    <app-project-card\n      *ngIf=\"project.active\"\n      [title]=\"project.title\"\n      [year]=\"project.year\"\n      [type]=\"project.type\"\n      [image]=\"project.imagePreview\"\n      [categories]=\"project.categories\"\n    ></app-project-card>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-project-list></app-project-list>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/top-menu/top-menu.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/top-menu/top-menu.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar class=\"top-menu\">\n  <div class=\"container\">\n    <span class=\"logo\">Tertiumnon</span>\n    <app-nav></app-nav>\n    <span class=\"about\">Software Designer</span>\n  </div>\n</mat-toolbar>\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Tertiumnon';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")).default]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projects/projects.component */ "./src/app/projects/projects.component.ts");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./project-card/project-card.component */ "./src/app/project-card/project-card.component.ts");
/* harmony import */ var _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./project-list/project-list.component */ "./src/app/project-list/project-list.component.ts");
/* harmony import */ var _top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./top-menu/top-menu.component */ "./src/app/top-menu/top-menu.component.ts");
/* harmony import */ var _project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./project-card-dialog/project-card-dialog.component */ "./src/app/project-card-dialog/project-card-dialog.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_18__["NavComponent"],
                _projects_projects_component__WEBPACK_IMPORTED_MODULE_19__["ProjectsComponent"],
                _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_20__["ProjectCardComponent"],
                _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_21__["ProjectListComponent"],
                _top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_22__["TopMenuComponent"],
                _project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_23__["ProjectCardDialogComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_24__["FooterComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_13__["MatToolbarModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_12__["MatSidenavModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_14__["MatGridListModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCardModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__["MatChipsModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_17__["FontAwesomeModule"]
            ],
            exports: [
                _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"]
            ],
            entryComponents: [_project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_23__["ProjectCardDialogComponent"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.less":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.less ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".social-links {\n  font-size: 1.6em;\n  margin: 5px 20px;\n  display: flex;\n  justify-content: right;\n  gap: 10px;\n}\n.social-links a {\n  color: #666;\n  padding: 4px;\n}\n.social-links a:hover {\n  color: #333;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9vdGVyL0Q6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQ0NGO0FETkE7RUFPSSxXQUFBO0VBQ0EsWUFBQTtBQ0VKO0FEREk7RUFDRSxXQUFBO0FDR04iLCJmaWxlIjoic3JjL2FwcC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnNvY2lhbC1saW5rcyB7XG4gIGZvbnQtc2l6ZTogMS42ZW07XG4gIG1hcmdpbjogNXB4IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogcmlnaHQ7XG4gIGdhcDogMTBweDtcbiAgYSB7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgcGFkZGluZzogNHB4O1xuICAgICY6aG92ZXIge1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuICB9XG59IiwiLnNvY2lhbC1saW5rcyB7XG4gIGZvbnQtc2l6ZTogMS42ZW07XG4gIG1hcmdpbjogNXB4IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogcmlnaHQ7XG4gIGdhcDogMTBweDtcbn1cbi5zb2NpYWwtbGlua3MgYSB7XG4gIGNvbG9yOiAjNjY2O1xuICBwYWRkaW5nOiA0cHg7XG59XG4uc29jaWFsLWxpbmtzIGE6aG92ZXIge1xuICBjb2xvcjogIzMzMztcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");





var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_2__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faCoffee"], _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faGithub"], _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faHackerrank"]);
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/footer/footer.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./footer.component.less */ "./src/app/footer/footer.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/mock-projects.ts":
/*!**********************************!*\
  !*** ./src/app/mock-projects.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var PROJECTS = [
    {
        id: '1',
        title: 'Kvartal 2000',
        type: 'web-site',
        description: 'Realty Agency',
        imagePreview: '/assets/images/projects/kvartal2000-web/2008-kvartal2000-web-preview.png',
        image: '/assets/images/projects/kvartal2000-web/2008-kvartal2000-web.png',
        link: '',
        year: 2008,
        categories: ['design', 'layout'],
        active: true
    },
    {
        id: '2',
        title: 'Kvartal 2000',
        type: 'web-site',
        description: 'Realty Agency',
        imagePreview: '/assets/images/projects/kvartal2000-web/2009-kvartal2000-web-preview.png',
        image: '/assets/images/projects/kvartal2000-web/2009-kvartal2000-web.png',
        link: '',
        year: 2009,
        categories: ['design', 'layout'],
        active: true
    },
    {
        id: '3',
        title: 'Locman Kvartir',
        type: 'web-site',
        description: 'Realty Search Engine',
        imagePreview: '/assets/images/projects/locman-kvartir-web/2008-locman-kvartir-web-preview.png',
        image: '/assets/images/projects/locman-kvartir-web/2008-locman-kvartir-web.png',
        link: '',
        year: 2010,
        categories: ['design', 'layout'],
        active: true
    },
    {
        id: '4',
        title: 'Arsenal SB',
        type: 'web-site',
        description: 'CCTV sales company',
        imagePreview: '/assets/images/projects/arsenal-sb-web/2011-arsenal-sb-web-preview.png',
        image: '/assets/images/projects/arsenal-sb-web/2011-arsenal-sb-web.png',
        link: '',
        year: 2011,
        categories: ['design', 'layout'],
        active: true
    },
    {
        id: '4',
        title: 'PROvision',
        type: 'web-site',
        description: 'CCTV manufacturing company',
        imagePreview: '/assets/images/projects/provision-web/2012-provision-web-preview.png',
        image: '/assets/images/projects/provision-web/2012-provision-web.png',
        link: '',
        year: 2012,
        categories: ['design', 'layout', 'coding'],
        active: true
    },
    {
        id: '4',
        title: 'Alert CCTV',
        type: 'web-site',
        description: 'CCTV manufacturing company',
        imagePreview: '/assets/images/projects/alert-cctv-web/2012-alert-cctv-web-preview.png',
        image: '/assets/images/projects/alert-cctv-web/2012-alert-cctv-web.png',
        link: '',
        year: 2012,
        categories: ['design', 'layout', 'coding'],
        active: true
    },
    {
        id: '4',
        title: 'Katerinafee',
        type: 'web-site',
        description: 'Fashion designer',
        imagePreview: '/assets/images/projects/katerinafee-web/2013-katerinafee-web-preview.png',
        image: '/assets/images/projects/katerinafee-web/2013-katerinafee-web.png',
        link: '',
        year: 2013,
        categories: ['design', 'layout'],
        active: true
    },
    {
        id: '4',
        title: 'Enso Photo',
        type: 'web-site',
        description: 'Photographer web-site',
        imagePreview: '/assets/images/projects/enso-photo-web/2014-enso-photo-web-preview.png',
        image: '/assets/images/projects/enso-photo-web/2014-enso-photo-web.png',
        link: '',
        year: 2014,
        categories: ['design', 'layout', 'coding'],
        active: true
    },
    {
        id: '4',
        title: 'Butterfly Browser',
        type: 'web-browser',
        description: 'Ligthweigth web-browser',
        imagePreview: '/assets/images/projects/butterfly-browser-app/2016-butterfly-browser-app-preview.png',
        image: '/assets/images/projects/butterfly-browser-app/2016-butterfly-browser-app.png',
        link: '',
        year: 2016,
        categories: ['design'],
        active: true
    },
    {
        id: '4',
        title: 'Yandex App',
        type: 'web-browser',
        description: 'Web browser',
        imagePreview: '/assets/images/projects/yandex-browser-app/2017-yandex-browser-app-preview.png',
        image: '/assets/images/projects/yandex-browser-app/2017-yandex-browser-app.png',
        link: '',
        year: 2017,
        categories: ['design'],
        active: true
    },
];
/* harmony default export */ __webpack_exports__["default"] = (PROJECTS);


/***/ }),

/***/ "./src/app/nav/nav.component.less":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.less ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("nav {\n  display: inline-block;\n  vertical-align: middle;\n}\nnav span {\n  font-weight: normal;\n  color: #5c5c5c;\n  text-transform: uppercase;\n  font-size: 0.9em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2L0Q6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL25hdi9uYXYuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL25hdi9uYXYuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtFQUNBLHNCQUFBO0FDQ0Y7QURIQTtFQUlJLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL25hdi9uYXYuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJuYXYge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHNwYW4ge1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY29sb3I6ICM1YzVjNWM7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IC45ZW07XG4gIH1cbn0iLCJuYXYge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5uYXYgc3BhbiB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGNvbG9yOiAjNWM1YzVjO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXNpemU6IDAuOWVtO1xufVxuIl19 */");

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var NavComponent = /** @class */ (function () {
    function NavComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset$ = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) { return result.matches; }));
    }
    NavComponent.ctorParameters = function () { return [
        { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["BreakpointObserver"] }
    ]; };
    NavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nav.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/nav/nav.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./nav.component.less */ "./src/app/nav/nav.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["BreakpointObserver"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/project-card-dialog/project-card-dialog.component.less":
/*!************************************************************************!*\
  !*** ./src/app/project-card-dialog/project-card-dialog.component.less ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".project-card-dialog-image {\n  margin: 0 -8px -4px;\n}\n.project-card-dialog-content {\n  box-shadow: 1px 1px 10px gray;\n  display: block;\n  margin: 0 -24px;\n  padding: 0 24px 0 0;\n  max-height: 65vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jYXJkLWRpYWxvZy9EOi9SZXBvc2l0b3JpZXMvdGVydGl1bW5vbi53ZWIvc3JjL2FwcC9wcm9qZWN0LWNhcmQtZGlhbG9nL3Byb2plY3QtY2FyZC1kaWFsb2cuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtY2FyZC1kaWFsb2cvcHJvamVjdC1jYXJkLWRpYWxvZy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLDZCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdC1jYXJkLWRpYWxvZy9wcm9qZWN0LWNhcmQtZGlhbG9nLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2plY3QtY2FyZC1kaWFsb2ctaW1hZ2Uge1xuICBtYXJnaW46IDAgLThweCAtNHB4O1xufVxuXG4ucHJvamVjdC1jYXJkLWRpYWxvZy1jb250ZW50IHtcbiAgYm94LXNoYWRvdzogMXB4IDFweCAxMHB4IGdyYXk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgLTI0cHg7XG4gIHBhZGRpbmc6IDAgMjRweCAwIDA7XG4gIG1heC1oZWlnaHQ6IDY1dmg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbn1cbiIsIi5wcm9qZWN0LWNhcmQtZGlhbG9nLWltYWdlIHtcbiAgbWFyZ2luOiAwIC04cHggLTRweDtcbn1cbi5wcm9qZWN0LWNhcmQtZGlhbG9nLWNvbnRlbnQge1xuICBib3gtc2hhZG93OiAxcHggMXB4IDEwcHggZ3JheTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMCAtMjRweDtcbiAgcGFkZGluZzogMCAyNHB4IDAgMDtcbiAgbWF4LWhlaWdodDogNjV2aDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuIl19 */");

/***/ }),

/***/ "./src/app/project-card-dialog/project-card-dialog.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/project-card-dialog/project-card-dialog.component.ts ***!
  \**********************************************************************/
/*! exports provided: ProjectCardDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectCardDialogComponent", function() { return ProjectCardDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var ProjectCardDialogComponent = /** @class */ (function () {
    function ProjectCardDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ProjectCardDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ProjectCardDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ProjectCardDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-card-dialog',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-card-dialog.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-card-dialog/project-card-dialog.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-card-dialog.component.less */ "./src/app/project-card-dialog/project-card-dialog.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], ProjectCardDialogComponent);
    return ProjectCardDialogComponent;
}());



/***/ }),

/***/ "./src/app/project-card/project-card.component.less":
/*!**********************************************************!*\
  !*** ./src/app/project-card/project-card.component.less ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-chip.mat-standard-chip {\n  font-size: small;\n  padding: 12px 11px;\n  min-height: 24px;\n  color: grey;\n  background-color: #efefef !important;\n  font-weight: normal;\n}\n.mat-card.project-card {\n  box-shadow: 1px 1px 8px black;\n  border-radius: 3px;\n  cursor: pointer;\n}\n.mat-card.project-card:hover {\n  box-shadow: 1px 1px 14px black;\n}\n.mat-card.project-card .mat-card-header-text {\n  margin: 0 6px;\n}\n.mat-card.project-card .mat-card-image {\n  border-top: 1px solid #dadada;\n  border-bottom: 1px solid #dadada;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jYXJkL0Q6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL3Byb2plY3QtY2FyZC9wcm9qZWN0LWNhcmQuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtY2FyZC9wcm9qZWN0LWNhcmQuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQ0NGO0FERUE7RUFDRSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0FGO0FERUU7RUFDRSw4QkFBQTtBQ0FKO0FETkE7RUFVSSxhQUFBO0FDREo7QURUQTtFQWNJLDZCQUFBO0VBQ0EsZ0NBQUE7QUNGSiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3QtY2FyZC9wcm9qZWN0LWNhcmQuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWNoaXAubWF0LXN0YW5kYXJkLWNoaXAge1xuICBmb250LXNpemU6IHNtYWxsO1xuICBwYWRkaW5nOiAxMnB4IDExcHg7XG4gIG1pbi1oZWlnaHQ6IDI0cHg7XG4gIGNvbG9yOiBncmV5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi5tYXQtY2FyZC5wcm9qZWN0LWNhcmQge1xuICBib3gtc2hhZG93OiAxcHggMXB4IDhweCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpob3ZlciB7XG4gICAgYm94LXNoYWRvdzogMXB4IDFweCAxNHB4IGJsYWNrO1xuICB9XG5cbiAgLm1hdC1jYXJkLWhlYWRlci10ZXh0IHtcbiAgICBtYXJnaW46IDAgNnB4O1xuICB9XG5cbiAgLm1hdC1jYXJkLWltYWdlIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RhZGFkYTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGFkYTtcbiAgfVxufVxuIiwiLm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwIHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbiAgcGFkZGluZzogMTJweCAxMXB4O1xuICBtaW4taGVpZ2h0OiAyNHB4O1xuICBjb2xvcjogZ3JleTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZiAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLm1hdC1jYXJkLnByb2plY3QtY2FyZCB7XG4gIGJveC1zaGFkb3c6IDFweCAxcHggOHB4IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5tYXQtY2FyZC5wcm9qZWN0LWNhcmQ6aG92ZXIge1xuICBib3gtc2hhZG93OiAxcHggMXB4IDE0cHggYmxhY2s7XG59XG4ubWF0LWNhcmQucHJvamVjdC1jYXJkIC5tYXQtY2FyZC1oZWFkZXItdGV4dCB7XG4gIG1hcmdpbjogMCA2cHg7XG59XG4ubWF0LWNhcmQucHJvamVjdC1jYXJkIC5tYXQtY2FyZC1pbWFnZSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGFkYWRhO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RhZGFkYTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/project-card/project-card.component.ts":
/*!********************************************************!*\
  !*** ./src/app/project-card/project-card.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectCardComponent", function() { return ProjectCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ProjectCardComponent = /** @class */ (function () {
    function ProjectCardComponent() {
    }
    ProjectCardComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ProjectCardComponent.prototype, "title", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ProjectCardComponent.prototype, "year", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ProjectCardComponent.prototype, "image", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ProjectCardComponent.prototype, "type", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ProjectCardComponent.prototype, "categories", void 0);
    ProjectCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-card',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-card.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-card/project-card.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-card.component.less */ "./src/app/project-card/project-card.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ProjectCardComponent);
    return ProjectCardComponent;
}());



/***/ }),

/***/ "./src/app/project-list/project-list.component.less":
/*!**********************************************************!*\
  !*** ./src/app/project-list/project-list.component.less ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3QtbGlzdC9wcm9qZWN0LWxpc3QuY29tcG9uZW50Lmxlc3MifQ== */");

/***/ }),

/***/ "./src/app/project-list/project-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/project-list/project-list.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListComponent", function() { return ProjectListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../project-card-dialog/project-card-dialog.component */ "./src/app/project-card-dialog/project-card-dialog.component.ts");
/* harmony import */ var _mock_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mock-projects */ "./src/app/mock-projects.ts");





var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(dialog) {
        this.dialog = dialog;
        this.projects = _mock_projects__WEBPACK_IMPORTED_MODULE_4__["default"];
        this.projects.sort(function (a, b) {
            if (a.year < b.year) {
                return 1;
            }
            else if (a.year > b.year) {
                return -1;
            }
            else {
                return 0;
            }
        });
    }
    ProjectListComponent.prototype.onSelect = function (project) {
        // console.log(project);
        var dialogRef = this.dialog.open(_project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_3__["ProjectCardDialogComponent"], {
            width: '99%',
            data: { title: project.title, image: project.image }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ProjectListComponent.prototype.ngOnInit = function () {
    };
    ProjectListComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    ProjectListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-list',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-list.component.less */ "./src/app/project-list/project-list.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/projects/projects.component.less":
/*!**************************************************!*\
  !*** ./src/app/projects/projects.component.less ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-card-image {\n  border-top: 1px solid #dadada;\n  border-bottom: 1px solid #dadada;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvRDovUmVwb3NpdG9yaWVzL3RlcnRpdW1ub24ud2ViL3NyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3RzLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQUE7RUFDQSxnQ0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWNhcmQtaW1hZ2Uge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RhZGFkYTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYWRhZGE7XG59XG4iLCIubWF0LWNhcmQtaW1hZ2Uge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RhZGFkYTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYWRhZGE7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/projects/projects.component.ts":
/*!************************************************!*\
  !*** ./src/app/projects/projects.component.ts ***!
  \************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent() {
    }
    ProjectsComponent.prototype.ngOnInit = function () {
    };
    ProjectsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-projects',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./projects.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./projects.component.less */ "./src/app/projects/projects.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ProjectsComponent);
    return ProjectsComponent;
}());



/***/ }),

/***/ "./src/app/top-menu/top-menu.component.less":
/*!**************************************************!*\
  !*** ./src/app/top-menu/top-menu.component.less ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".top-menu {\n  box-shadow: 0 1px 14px black;\n  height: 80px;\n}\n.top-menu .logo {\n  float: left;\n  text-transform: uppercase;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: xx-large;\n  vertical-align: middle;\n  margin: 3px 28px 0 0;\n}\n.top-menu .about {\n  float: right;\n  font-size: 0.8em;\n  font-weight: normal;\n  color: grey;\n  display: block;\n  margin: 4px 20px 0 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdG9wLW1lbnUvRDovUmVwb3NpdG9yaWVzL3RlcnRpdW1ub24ud2ViL3NyYy9hcHAvdG9wLW1lbnUvdG9wLW1lbnUuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3RvcC1tZW51L3RvcC1tZW51LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNEJBQUE7RUFDQSxZQUFBO0FDQ0Y7QURIQTtFQUtJLFdBQUE7RUFDQSx5QkFBQTtFQUNBLG1FQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0FDQ0o7QURYQTtFQWNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvdG9wLW1lbnUvdG9wLW1lbnUuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9wLW1lbnUge1xuICBib3gtc2hhZG93OiAwIDFweCAxNHB4IGJsYWNrO1xuICBoZWlnaHQ6IDgwcHg7XG5cbiAgLmxvZ28ge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC1mYW1pbHk6IENlbnR1cnkgR290aGljLCBDZW50dXJ5R290aGljLCBBcHBsZUdvdGhpYywgc2Fucy1zZXJpZjtcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgbWFyZ2luOiAzcHggMjhweCAwIDA7XG4gIH1cblxuICAuYWJvdXQge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY29sb3I6IGdyZXk7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiA0cHggMjBweCAwIDA7XG4gIH1cbn1cbiIsIi50b3AtbWVudSB7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDE0cHggYmxhY2s7XG4gIGhlaWdodDogODBweDtcbn1cbi50b3AtbWVudSAubG9nbyB7XG4gIGZsb2F0OiBsZWZ0O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LWZhbWlseTogQ2VudHVyeSBHb3RoaWMsIENlbnR1cnlHb3RoaWMsIEFwcGxlR290aGljLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IHh4LWxhcmdlO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW46IDNweCAyOHB4IDAgMDtcbn1cbi50b3AtbWVudSAuYWJvdXQge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGNvbG9yOiBncmV5O1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiA0cHggMjBweCAwIDA7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/top-menu/top-menu.component.ts":
/*!************************************************!*\
  !*** ./src/app/top-menu/top-menu.component.ts ***!
  \************************************************/
/*! exports provided: TopMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopMenuComponent", function() { return TopMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TopMenuComponent = /** @class */ (function () {
    function TopMenuComponent() {
    }
    TopMenuComponent.prototype.ngOnInit = function () {
    };
    TopMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-top-menu',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./top-menu.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/top-menu/top-menu.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./top-menu.component.less */ "./src/app/top-menu/top-menu.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TopMenuComponent);
    return TopMenuComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_5__);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Repositories\tertiumnon.web\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map