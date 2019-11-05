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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/helpers/helpers.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/helpers/helpers.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>helpers works!</p>\n");

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
/* harmony default export */ __webpack_exports__["default"] = ("<h1 mat-dialog-title class=\"project-card-dialog-header\">{{data.title}}</h1>\n<div *ngIf=\"data.image != ''\" mat-dialog-content class=\"project-card-dialog-content\">\n  <img mat-card-image class=\"project-card-dialog-image\" src={{data.image}}>\n</div>\n<div mat-dialog-content class=\"project-card-dialog-description\">\n  {{data.description}}\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">Close</button>\n  <a *ngIf=\"data.link != ''\" mat-button href={{data.link}} target=\"_blank\">\n    <mat-icon>link</mat-icon>\n  </a>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-card/project-card.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-card/project-card.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card class=\"project-card\">\n  <mat-card-header class=\"project-header\">\n    <mat-card-title>{{title}}</mat-card-title>\n    <mat-card-subtitle>{{year}}, {{type}}</mat-card-subtitle>\n  </mat-card-header>\n  <div class=\"preview\">\n    <img mat-card-image src={{image}}>\n    <div class=\"description\">{{description}}</div>\n  </div>\n  <mat-card-content>\n      <mat-chip-list>\n        <mat-chip *ngFor=\"let category of categories\">{{category}}</mat-chip>\n      </mat-chip-list>\n  </mat-card-content>\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-control-panel/project-control-panel.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-control-panel/project-control-panel.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"project-control-panel\">\n  <div class=\"filters\">\n    <div class=\"filter filter-by-status hide\">\n      <label>Status</label>\n      <select\n        [(ngModel)]=\"filterByStatus\"\n        [ngStyle]=\"{ 'width.px': filterByStatusWidth }\"\n        (change)=\"onStatusChange()\"\n      >\n        <option *ngFor=\"let item of filterStatuses\" [value]=\"item.value\">\n          {{ item.viewValue }}\n        </option>\n      </select>\n    </div>\n    <div class=\"filter filter-by-type\">\n      <label>Type of Work</label>\n      <select\n        [(ngModel)]=\"filterByType\"\n        [ngStyle]=\"{ 'width.px': filterByTypeWidth }\"\n        (change)=\"onTypeChange()\"\n      >\n        <option *ngFor=\"let item of filterTypes\" [value]=\"item.value\">\n          {{ item.viewValue }}\n        </option>\n      </select>\n    </div>\n    <div class=\"filter sort-by-attr\">\n      <label>Sort by</label>\n      <select\n        [(ngModel)]=\"sortByAttr\"\n        [ngStyle]=\"{ 'width.px': sortByAttrWidth }\"\n        (change)=\"onAttrChange()\"\n      >\n        <option *ngFor=\"let item of sortAttrs\" [value]=\"item.value\">\n          {{ item.viewValue }}\n        </option>\n      </select>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div\n  fxLayout=\"row\"\n  fxLayoutGap=\"10px\"\n  gdGap=\"20px\"\n  gdColumns=\"32% 32% 32%\"\n  >\n  <div\n    fxFlex\n    *ngFor=\"let project of projects\"\n    class=\"card-item\"\n    (click)=\"onSelect(project)\"\n    [ngClass]=\"project.visibility ? '' : 'hide'\"\n  >\n    <app-project-card\n      [title]=\"project.title\"\n      [year]=\"project.year\"\n      [type]=\"project.type\"\n      [description]=\"project.description\"\n      [image]=\"project.imagePreview !== '' ? project.imagePreview : defaultImagePreview\"\n      [categories]=\"project.categories\"\n    ></app-project-card>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-project-control-panel></app-project-control-panel>\n<app-project-list></app-project-list>\n");

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
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./projects/projects.component */ "./src/app/projects/projects.component.ts");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./project-card/project-card.component */ "./src/app/project-card/project-card.component.ts");
/* harmony import */ var _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./project-list/project-list.component */ "./src/app/project-list/project-list.component.ts");
/* harmony import */ var _top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./top-menu/top-menu.component */ "./src/app/top-menu/top-menu.component.ts");
/* harmony import */ var _project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./project-card-dialog/project-card-dialog.component */ "./src/app/project-card-dialog/project-card-dialog.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _pipes_order_by_pipe__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pipes/order-by.pipe */ "./src/app/pipes/order-by.pipe.ts");
/* harmony import */ var _project_control_panel_project_control_panel_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./project-control-panel/project-control-panel.component */ "./src/app/project-control-panel/project-control-panel.component.ts");
/* harmony import */ var _helpers_helpers_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./helpers/helpers.component */ "./src/app/helpers/helpers.component.ts");








// material











// icons

// import { library } from '@fortawesome/fontawesome-svg-core';
// components










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_20__["NavComponent"],
                _projects_projects_component__WEBPACK_IMPORTED_MODULE_21__["ProjectsComponent"],
                _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_22__["ProjectCardComponent"],
                _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_23__["ProjectListComponent"],
                _top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_24__["TopMenuComponent"],
                _project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_25__["ProjectCardDialogComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_26__["FooterComponent"],
                _pipes_order_by_pipe__WEBPACK_IMPORTED_MODULE_27__["OrderByPipe"],
                _project_control_panel_project_control_panel_component__WEBPACK_IMPORTED_MODULE_28__["ProjectControlPanelComponent"],
                _helpers_helpers_component__WEBPACK_IMPORTED_MODULE_29__["HelpersComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__["MatCheckboxModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_14__["MatToolbarModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__["MatSidenavModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_16__["MatCardModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__["MatChipsModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_18__["MatSelectModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__["FontAwesomeModule"]
            ],
            exports: [
                _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__["MatCheckboxModule"]
            ],
            entryComponents: [_project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_25__["ProjectCardDialogComponent"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
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
/* harmony default export */ __webpack_exports__["default"] = (".social-links {\n  font-size: 1.6em;\n  margin: 2px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n.social-links a {\n  color: #666;\n  padding: 4px;\n}\n.social-links a:hover {\n  color: #333;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9vdGVyL0U6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtBQ0NGO0FETkE7RUFPSSxXQUFBO0VBQ0EsWUFBQTtBQ0VKO0FEREk7RUFDRSxXQUFBO0FDR04iLCJmaWxlIjoic3JjL2FwcC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnNvY2lhbC1saW5rcyB7XG4gIGZvbnQtc2l6ZTogMS42ZW07XG4gIG1hcmdpbjogMnB4IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGdhcDogMTBweDtcbiAgYSB7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgcGFkZGluZzogNHB4O1xuICAgICY6aG92ZXIge1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuICB9XG59XG4iLCIuc29jaWFsLWxpbmtzIHtcbiAgZm9udC1zaXplOiAxLjZlbTtcbiAgbWFyZ2luOiAycHggMjBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgZ2FwOiAxMHB4O1xufVxuLnNvY2lhbC1saW5rcyBhIHtcbiAgY29sb3I6ICM2NjY7XG4gIHBhZGRpbmc6IDRweDtcbn1cbi5zb2NpYWwtbGlua3MgYTpob3ZlciB7XG4gIGNvbG9yOiAjMzMzO1xufVxuIl19 */");

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

/***/ "./src/app/helpers/helpers.component.less":
/*!************************************************!*\
  !*** ./src/app/helpers/helpers.component.less ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlbHBlcnMvaGVscGVycy5jb21wb25lbnQubGVzcyJ9 */");

/***/ }),

/***/ "./src/app/helpers/helpers.component.ts":
/*!**********************************************!*\
  !*** ./src/app/helpers/helpers.component.ts ***!
  \**********************************************/
/*! exports provided: HelpersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpersComponent", function() { return HelpersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HelpersComponent = /** @class */ (function () {
    function HelpersComponent() {
    }
    HelpersComponent.orderBy = function (list) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var direction = args[0][0];
        var column = direction === '-' ? args[0].slice(1) : args[0];
        var newList = list.slice();
        newList.sort(function (a, b) {
            if (a[column] < b[column]) {
                return (direction === '-' ? -1 : 1);
            }
            else if (a[column] > b[column]) {
                return (direction === '-' ? 1 : -1);
            }
            else {
                return 0;
            }
        });
        return newList;
    };
    HelpersComponent.filterBy = function (list, param, val) {
        var sParam;
        var sVal;
        var newList = list.slice();
        if (param === 'status') {
            sParam = 'active';
            sVal = val === 'inactive' ? false : true;
            newList.forEach(function (item) {
                if (sVal === 'all') {
                    item.visibility = true;
                }
                else {
                    if (item[sParam] === sVal) {
                        item.visibility = true;
                    }
                    else {
                        item.visibility = false;
                    }
                }
            });
        }
        else if (param === 'type') {
            sParam = 'categories';
            sVal = val;
            newList.forEach(function (item) {
                if (sVal === 'all') {
                    item.visibility = true;
                }
                else {
                    if (item.categories.includes(sVal)) {
                        item.visibility = true;
                    }
                    else {
                        item.visibility = false;
                    }
                }
            });
        }
        return newList;
    };
    HelpersComponent.prototype.ngOnInit = function () {
    };
    HelpersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-helpers',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./helpers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/helpers/helpers.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./helpers.component.less */ "./src/app/helpers/helpers.component.less")).default]
        })
    ], HelpersComponent);
    return HelpersComponent;
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
        title: 'Kvartal 2000',
        type: 'Website',
        description: 'Website for real estate agency',
        imagePreview: '/assets/images/projects/kvartal2000-web/2008-kvartal2000-web-preview.png',
        image: '/assets/images/projects/kvartal2000-web/2008-kvartal2000-web.png',
        link: '',
        year: 2008,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'Kvartal 2000',
        type: 'Website',
        description: 'Website for real estate agency',
        imagePreview: '/assets/images/projects/kvartal2000-web/2009-kvartal2000-web-preview.png',
        image: '/assets/images/projects/kvartal2000-web/2009-kvartal2000-web.png',
        link: '',
        year: 2009,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'Locman Kvartir',
        type: 'Website',
        description: 'Website for real estate listing',
        imagePreview: '/assets/images/projects/locman-kvartir-web/2008-locman-kvartir-web-preview.png',
        image: '/assets/images/projects/locman-kvartir-web/2008-locman-kvartir-web.png',
        link: '',
        year: 2010,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'Arsenal SB',
        type: 'Website',
        description: 'Website for CCTV sales company',
        imagePreview: '/assets/images/projects/arsenal-sb-web/2011-arsenal-sb-web-preview.png',
        image: '/assets/images/projects/arsenal-sb-web/2011-arsenal-sb-web.png',
        link: '',
        year: 2011,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'PROvision',
        type: 'Website',
        description: 'Website for CCTV manufacturing company',
        imagePreview: '/assets/images/projects/provision-web/2012-provision-web-preview.png',
        image: '/assets/images/projects/provision-web/2012-provision-web.png',
        link: '',
        year: 2012,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Alert CCTV',
        type: 'Website',
        description: 'Website for CCTV manufacturing company',
        imagePreview: '/assets/images/projects/alert-cctv-web/2012-alert-cctv-web-preview.png',
        image: '/assets/images/projects/alert-cctv-web/2012-alert-cctv-web.png',
        link: '',
        year: 2012,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Katerinafee Shop',
        type: 'Website',
        description: 'Online shop for fashion designer',
        imagePreview: '/assets/images/projects/katerinafee-web/2013-katerinafee-web-preview.png',
        image: '/assets/images/projects/katerinafee-web/2013-katerinafee-web.png',
        link: '',
        year: 2013,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'Katerinafee',
        type: 'Website',
        description: 'Website for fashion designer',
        imagePreview: '/assets/images/projects/katerinafee-web/2013-katerinafee-web-preview.png',
        image: '/assets/images/projects/katerinafee-web/2013-katerinafee-web.png',
        link: 'http://www.katerinafee.com',
        year: 2014,
        categories: ['design', 'layout'],
        active: false,
        visibility: true
    },
    {
        title: 'Enso Photo',
        type: 'Website',
        description: 'Photographer portfolio website',
        imagePreview: '/assets/images/projects/enso-photo-web/2014-enso-photo-web-preview.png',
        image: '/assets/images/projects/enso-photo-web/2014-enso-photo-web.png',
        link: '',
        year: 2014,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Yandex Browser',
        type: 'Web browser',
        description: 'Concept of Yandex Browser',
        imagePreview: '/assets/images/projects/yandex-browser-app/2017-yandex-browser-app-preview.png',
        image: '/assets/images/projects/yandex-browser-app/2017-yandex-browser-app.png',
        link: '',
        year: 2017,
        categories: ['concept-design'],
        active: false,
        visibility: true
    },
    {
        title: 'Butterfly Browser',
        type: 'Web browser',
        description: 'Concept of ligthweight web browser',
        imagePreview: '/assets/images/projects/butterfly-browser-app/2016-butterfly-browser-app-preview.png',
        image: '/assets/images/projects/butterfly-browser-app/2016-butterfly-browser-app.png',
        link: '',
        year: 2016,
        categories: ['concept-design'],
        active: false,
        visibility: true
    },
    {
        title: 'JKH Service',
        type: 'Website',
        description: 'One-page website for a building company',
        imagePreview: '',
        image: '',
        link: '',
        year: 2018,
        categories: ['design'],
        active: false,
        visibility: true
    },
    {
        title: 'Tertium Cheatsheets',
        type: 'Website',
        description: 'Cheatsheets for programmers',
        imagePreview: '',
        image: '',
        link: 'http://cheatsheets.origin-creative-studio.com',
        year: 2017,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Send Text To Form',
        type: 'Web extension',
        description: 'Chrome extension for sending text to a web page with form',
        imagePreview: '',
        image: '/assets/images/projects/send-text-to-form-web-ext/2017-send-text-to-form-web-ext.png',
        link: 'https://chrome.google.com/webstore/detail/send-text-to-form/oapmpchdbmlmblgeambfmcmmoalbgooi',
        year: 2017,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Bookmarks Manager',
        type: 'Web extension',
        description: 'Firefox extension for organizing bookmarks',
        imagePreview: '',
        image: '',
        link: 'https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/',
        year: 2017,
        categories: ['design', 'layout', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'Tertium JS Snippets',
        type: 'App extension',
        description: 'Visual Studio Code extension for JavaScript autocompletion',
        imagePreview: '',
        image: '',
        link: 'https://marketplace.visualstudio.com/items?itemName=vittertiumnon.tertium-js-snippets',
        year: 2019,
        categories: ['design', 'coding'],
        active: false,
        visibility: true
    },
    {
        title: 'TASS Wiki',
        type: 'Website',
        description: 'Information agency documentation platform',
        imagePreview: '',
        image: '',
        link: '',
        year: 2015,
        categories: ['design', 'layout', 'coding'],
        active: true,
        visibility: true
    },
    {
        title: 'TASS HRStat',
        type: 'Website',
        description: 'Information agency productivity statistics website',
        imagePreview: '',
        image: '',
        link: '',
        year: 2016,
        categories: ['layout', 'coding'],
        active: true,
        visibility: true
    },
    {
        title: 'JSON All to One',
        type: 'NodeJS package',
        description: 'NodeJS script for concatenation JSON files',
        imagePreview: '',
        image: '',
        link: 'https://www.npmjs.com/package/json-all-to-one',
        year: 2019,
        categories: ['design', 'coding'],
        active: true,
        visibility: true
    },
    {
        title: 'JSON to SQL script',
        type: 'NodeJS package',
        description: 'NodeJS script for creation SQL script from JSON file',
        imagePreview: '',
        image: '',
        link: 'https://www.npmjs.com/package/json-to-sql-script',
        year: 2019,
        categories: ['design', 'coding'],
        active: true,
        visibility: true
    },
    {
        title: 'Tertium Icons',
        type: 'NodeJS package',
        description: 'SVG and font icons',
        imagePreview: '',
        image: '',
        link: 'https://www.npmjs.com/package/tertium.icons',
        year: 2017,
        categories: ['design', 'coding'],
        active: true,
        visibility: true
    }
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
/* harmony default export */ __webpack_exports__["default"] = ("nav {\n  display: inline-block;\n}\nnav span {\n  font-weight: lighter;\n  color: #000;\n  text-transform: uppercase;\n  font-size: 0.9em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2L0U6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL25hdi9uYXYuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL25hdi9uYXYuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtBQ0NGO0FERkE7RUFHSSxvQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9uYXYvbmF2LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsibmF2IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBzcGFuIHtcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICBjb2xvcjojMDAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgfVxufVxuIiwibmF2IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxubmF2IHNwYW4ge1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgY29sb3I6ICMwMDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtc2l6ZTogMC45ZW07XG59XG4iXX0= */");

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

/***/ "./src/app/pipes/order-by.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/order-by.pipe.ts ***!
  \****************************************/
/*! exports provided: OrderByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderByPipe", function() { return OrderByPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_helpers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/helpers.component */ "./src/app/helpers/helpers.component.ts");



var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _helpers_helpers_component__WEBPACK_IMPORTED_MODULE_2__["HelpersComponent"].orderBy.apply(_helpers_helpers_component__WEBPACK_IMPORTED_MODULE_2__["HelpersComponent"], [value].concat(args));
    };
    OrderByPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'orderBy'
        })
    ], OrderByPipe);
    return OrderByPipe;
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
/* harmony default export */ __webpack_exports__["default"] = (".project-card-dialog-header {\n  margin-bottom: 10px;\n}\n.project-card-dialog-image {\n  margin: 0 -8px -4px 0;\n  width: calc(100% + 24px);\n}\n.project-card-dialog-content {\n  border-width: 4px 0;\n  display: block;\n  margin: 0 -24px;\n  padding: 0 24px 0 0;\n  max-height: 65vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n  border-style: solid;\n  border-color: #e6e6e6;\n}\n.project-card-dialog-description {\n  margin-top: 16px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jYXJkLWRpYWxvZy9FOi9SZXBvc2l0b3JpZXMvdGVydGl1bW5vbi53ZWIvc3JjL2FwcC9wcm9qZWN0LWNhcmQtZGlhbG9nL3Byb2plY3QtY2FyZC1kaWFsb2cuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtY2FyZC1kaWFsb2cvcHJvamVjdC1jYXJkLWRpYWxvZy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLHFCQUFBO0VBQ0Esd0JBQUE7QUNBRjtBREdBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQ0RGO0FESUE7RUFDRSxnQkFBQTtBQ0ZGIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdC1jYXJkLWRpYWxvZy9wcm9qZWN0LWNhcmQtZGlhbG9nLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2plY3QtY2FyZC1kaWFsb2ctaGVhZGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnByb2plY3QtY2FyZC1kaWFsb2ctaW1hZ2Uge1xuICBtYXJnaW46IDAgLThweCAtNHB4IDA7XG4gIHdpZHRoOiBjYWxjKDEwMCUgKyAyNHB4KTtcbn1cblxuLnByb2plY3QtY2FyZC1kaWFsb2ctY29udGVudCB7XG4gIGJvcmRlci13aWR0aDogNHB4IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgLTI0cHg7XG4gIHBhZGRpbmc6IDAgMjRweCAwIDA7XG4gIG1heC1oZWlnaHQ6IDY1dmg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiNlNmU2ZTY7XG59XG5cbi5wcm9qZWN0LWNhcmQtZGlhbG9nLWRlc2NyaXB0aW9uIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbiIsIi5wcm9qZWN0LWNhcmQtZGlhbG9nLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG4ucHJvamVjdC1jYXJkLWRpYWxvZy1pbWFnZSB7XG4gIG1hcmdpbjogMCAtOHB4IC00cHggMDtcbiAgd2lkdGg6IGNhbGMoMTAwJSArIDI0cHgpO1xufVxuLnByb2plY3QtY2FyZC1kaWFsb2ctY29udGVudCB7XG4gIGJvcmRlci13aWR0aDogNHB4IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgLTI0cHg7XG4gIHBhZGRpbmc6IDAgMjRweCAwIDA7XG4gIG1heC1oZWlnaHQ6IDY1dmg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjZTZlNmU2O1xufVxuLnByb2plY3QtY2FyZC1kaWFsb2ctZGVzY3JpcHRpb24ge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuIl19 */");

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
/* harmony default export */ __webpack_exports__["default"] = (".mat-chip.mat-standard-chip {\n  font-size: small;\n  padding: 12px 11px;\n  min-height: 24px;\n  color: grey;\n  background-color: #efefef !important;\n  font-weight: normal;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jYXJkL0U6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL3Byb2plY3QtY2FyZC9wcm9qZWN0LWNhcmQuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtY2FyZC9wcm9qZWN0LWNhcmQuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdC1jYXJkL3Byb2plY3QtY2FyZC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcCB7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHBhZGRpbmc6IDEycHggMTFweDtcbiAgbWluLWhlaWdodDogMjRweDtcbiAgY29sb3I6IGdyZXk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWYgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbiIsIi5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcCB7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHBhZGRpbmc6IDEycHggMTFweDtcbiAgbWluLWhlaWdodDogMjRweDtcbiAgY29sb3I6IGdyZXk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWYgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbiJdfQ== */");

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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ProjectCardComponent.prototype, "description", void 0);
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

/***/ "./src/app/project-control-panel/project-control-panel.component.less":
/*!****************************************************************************!*\
  !*** ./src/app/project-control-panel/project-control-panel.component.less ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".hide-arrow-mixin {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.hide-arrow-mixin::-ms-expand {\n  display: none;\n}\n.project-control-panel {\n  display: flex;\n  justify-content: flex-end;\n  margin: 0 10px 10px;\n  color: #c4c4c4;\n}\n.project-control-panel .filters {\n  display: flex;\n}\n.project-control-panel .filters .filter {\n  margin: 0 0 0 20px;\n}\n.project-control-panel .filters .filter label {\n  display: inline-block;\n  font-size: 0.9em;\n  margin-right: 4px;\n}\n.project-control-panel .filters .filter select {\n  display: inline-block;\n  background: none;\n  border: none;\n  color: white;\n  background-color: #3b4148;\n  font-size: 0.9em;\n  border-bottom: 1px dashed;\n  text-align: center;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.project-control-panel .filters .filter select::-ms-expand {\n  display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jb250cm9sLXBhbmVsL0U6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL3Byb2plY3QtY29udHJvbC1wYW5lbC9wcm9qZWN0LWNvbnRyb2wtcGFuZWwuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtY29udHJvbC1wYW5lbC9wcm9qZWN0LWNvbnRyb2wtcGFuZWwuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7QUNDRjtBREFFO0VBQ0UsYUFBQTtBQ0VKO0FERUE7RUFDRSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUNBRjtBREpBO0VBTUksYUFBQTtBQ0NKO0FEUEE7RUFRTSxrQkFBQTtBQ0VOO0FEVkE7RUFVUSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUNHUjtBRGZBO0VBZVEscUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBL0JOLHdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQ21DRjtBRGxDRTtFQUNFLGFBQUE7QUNvQ0oiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0LWNvbnRyb2wtcGFuZWwvcHJvamVjdC1jb250cm9sLXBhbmVsLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmhpZGUtYXJyb3ctbWl4aW4ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgJjo6LW1zLWV4cGFuZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG4ucHJvamVjdC1jb250cm9sLXBhbmVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgbWFyZ2luOiAwIDEwcHggMTBweDtcbiAgY29sb3I6ICNjNGM0YzQ7XG4gIC5maWx0ZXJzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC5maWx0ZXIge1xuICAgICAgbWFyZ2luOiAwIDAgMCAyMHB4O1xuICAgICAgbGFiZWwge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogLjllbTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gICAgICB9XG4gICAgICBzZWxlY3Qge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2I0MTQ4O1xuICAgICAgICBmb250LXNpemU6IC45ZW07XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQ7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAuaGlkZS1hcnJvdy1taXhpbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuIiwiLmhpZGUtYXJyb3ctbWl4aW4ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5oaWRlLWFycm93LW1peGluOjotbXMtZXhwYW5kIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5wcm9qZWN0LWNvbnRyb2wtcGFuZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBtYXJnaW46IDAgMTBweCAxMHB4O1xuICBjb2xvcjogI2M0YzRjNDtcbn1cbi5wcm9qZWN0LWNvbnRyb2wtcGFuZWwgLmZpbHRlcnMge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLnByb2plY3QtY29udHJvbC1wYW5lbCAuZmlsdGVycyAuZmlsdGVyIHtcbiAgbWFyZ2luOiAwIDAgMCAyMHB4O1xufVxuLnByb2plY3QtY29udHJvbC1wYW5lbCAuZmlsdGVycyAuZmlsdGVyIGxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDAuOWVtO1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbn1cbi5wcm9qZWN0LWNvbnRyb2wtcGFuZWwgLmZpbHRlcnMgLmZpbHRlciBzZWxlY3Qge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2I0MTQ4O1xuICBmb250LXNpemU6IDAuOWVtO1xuICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG4ucHJvamVjdC1jb250cm9sLXBhbmVsIC5maWx0ZXJzIC5maWx0ZXIgc2VsZWN0OjotbXMtZXhwYW5kIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/project-control-panel/project-control-panel.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/project-control-panel/project-control-panel.component.ts ***!
  \**************************************************************************/
/*! exports provided: ProjectControlPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectControlPanelComponent", function() { return ProjectControlPanelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/project.service */ "./src/app/services/project.service.ts");



var ProjectControlPanelComponent = /** @class */ (function () {
    function ProjectControlPanelComponent(projectService) {
        this.projectService = projectService;
        this.filterStatuses = [
            { value: 'all', viewValue: 'All' },
            { value: 'active', viewValue: 'Active' },
            { value: 'inactive', viewValue: 'Inactive' },
        ];
        this.filterTypes = [
            { value: 'all', viewValue: 'All' },
            { value: 'design', viewValue: 'Design' },
            { value: 'concept-design', viewValue: 'Concept Design' },
            { value: 'coding', viewValue: 'Coding' },
            { value: 'layout', viewValue: 'Layout' },
        ];
        this.sortAttrs = [
            { value: 'year', viewValue: 'Year (newer)' },
            { value: '-year', viewValue: 'Year (older)' },
        ];
    }
    ProjectControlPanelComponent_1 = ProjectControlPanelComponent;
    ProjectControlPanelComponent.getTextWidth = function (txt) {
        var span = document.createElement('span');
        span.setAttribute('style', 'display: hidden;');
        span.innerHTML = txt;
        document.body.appendChild(span);
        var res = span.offsetWidth;
        span.remove();
        return res;
    };
    ProjectControlPanelComponent.prototype.getFilterByStatusWidth = function () {
        var _this = this;
        return ProjectControlPanelComponent_1.getTextWidth(this.filterStatuses.filter(function (item) { return item.value === _this.filterByStatus; })[0].viewValue);
    };
    ProjectControlPanelComponent.prototype.getFilterByTypeWidth = function () {
        var _this = this;
        return ProjectControlPanelComponent_1.getTextWidth(this.filterTypes.filter(function (item) { return item.value === _this.filterByType; })[0].viewValue);
    };
    ProjectControlPanelComponent.prototype.getSortByAttrWidth = function () {
        var _this = this;
        return ProjectControlPanelComponent_1.getTextWidth(this.sortAttrs.filter(function (item) { return item.value === _this.sortByAttr; })[0].viewValue);
    };
    ProjectControlPanelComponent.prototype.onStatusChange = function () {
        var filterByStatus = this.filterByStatus;
        this.filterByStatusWidth = this.getFilterByStatusWidth();
        this.projectService.setState({ filterByStatus: filterByStatus });
    };
    ProjectControlPanelComponent.prototype.onTypeChange = function () {
        var filterByType = this.filterByType;
        this.filterByTypeWidth = this.getFilterByTypeWidth();
        this.projectService.setState({ filterByType: filterByType });
    };
    ProjectControlPanelComponent.prototype.onAttrChange = function () {
        var sortByAttr = this.sortByAttr;
        this.sortByAttrWidth = this.getSortByAttrWidth();
        this.projectService.setState({ sortByAttr: sortByAttr });
    };
    ProjectControlPanelComponent.prototype.ngOnInit = function () {
        this.filterByStatus = 'all';
        this.filterByStatusWidth = this.getFilterByStatusWidth();
        this.filterByType = 'all';
        this.filterByTypeWidth = this.getFilterByTypeWidth();
        this.sortByAttr = 'year';
        this.sortByAttrWidth = this.getSortByAttrWidth();
        this.projectService.setState({
            filterByStatus: 'all',
            filterByType: 'all',
            sortByAttr: 'year',
        });
    };
    var ProjectControlPanelComponent_1;
    ProjectControlPanelComponent.ctorParameters = function () { return [
        { type: _services_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"] }
    ]; };
    ProjectControlPanelComponent = ProjectControlPanelComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-control-panel',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-control-panel.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-control-panel/project-control-panel.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-control-panel.component.less */ "./src/app/project-control-panel/project-control-panel.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"]])
    ], ProjectControlPanelComponent);
    return ProjectControlPanelComponent;
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
/* harmony default export */ __webpack_exports__["default"] = (".card-item {\n  flex: 1 1 0%;\n  box-sizing: border-box;\n  margin-right: 10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1saXN0L0U6L1JlcG9zaXRvcmllcy90ZXJ0aXVtbm9uLndlYi9zcmMvYXBwL3Byb2plY3QtbGlzdC9wcm9qZWN0LWxpc3QuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3QtbGlzdC9wcm9qZWN0LWxpc3QuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQWMsc0JBQUE7RUFBd0Isa0JBQUE7QUNHeEMiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0LWxpc3QvcHJvamVjdC1saXN0LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtaXRlbSB7XG4gIGZsZXg6IDEgMSAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuIiwiLmNhcmQtaXRlbSB7XG4gIGZsZXg6IDEgMSAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuIl19 */");

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
/* harmony import */ var _services_project_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/project.service */ "./src/app/services/project.service.ts");





var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(dialog, projectService) {
        this.dialog = dialog;
        this.projectService = projectService;
        this.defaultImagePreview = '/assets/images/projects/default/default.png';
    }
    ProjectListComponent.prototype.onSelect = function (project) {
        var dialogRef = this.dialog.open(_project_card_dialog_project_card_dialog_component__WEBPACK_IMPORTED_MODULE_3__["ProjectCardDialogComponent"], {
            width: '99%',
            data: {
                title: project.title,
                image: project.image,
                link: project.link,
                description: project.description,
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ProjectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.projects$
            .subscribe(function (projects) { return _this.projects = projects; });
        this.projectService.getState()
            .subscribe(function (state) { return _this.state = state; });
    };
    ProjectListComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ProjectListComponent.prototype, "defaultImagePreview", void 0);
    ProjectListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-list',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/project-list/project-list.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-list.component.less */ "./src/app/project-list/project-list.component.less")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"]])
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
/* harmony default export */ __webpack_exports__["default"] = (".mat-card-image {\n  border-top: 1px solid #dadada;\n  border-bottom: 1px solid #dadada;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvRTovUmVwb3NpdG9yaWVzL3RlcnRpdW1ub24ud2ViL3NyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3RzLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQUE7RUFDQSxnQ0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWNhcmQtaW1hZ2Uge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RhZGFkYTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYWRhZGE7XG59XG4iLCIubWF0LWNhcmQtaW1hZ2Uge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RhZGFkYTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYWRhZGE7XG59XG4iXX0= */");

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
    ProjectsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-projects',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./projects.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./projects.component.less */ "./src/app/projects/projects.component.less")).default]
        })
    ], ProjectsComponent);
    return ProjectsComponent;
}());



/***/ }),

/***/ "./src/app/services/project.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/project.service.ts ***!
  \*********************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _helpers_helpers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/helpers.component */ "./src/app/helpers/helpers.component.ts");
/* harmony import */ var _mock_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mock-projects */ "./src/app/mock-projects.ts");





var ProjectService = /** @class */ (function () {
    function ProjectService() {
        this.projects = _mock_projects__WEBPACK_IMPORTED_MODULE_4__["default"];
        this.projects$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](_mock_projects__WEBPACK_IMPORTED_MODULE_4__["default"]);
        this.state$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            filterByStatus: 'all',
            filterByType: 'all',
            sortByAttr: 'year',
        });
    }
    ProjectService.prototype.setState = function (state) {
        this.state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.state, state);
        this.filterProjects();
        this.sortProjects();
    };
    ProjectService.prototype.getState = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.state);
    };
    ProjectService.prototype.getProjects = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.projects);
    };
    ProjectService.prototype.filterProjects = function () {
        this.projects$.next(_helpers_helpers_component__WEBPACK_IMPORTED_MODULE_3__["HelpersComponent"].filterBy(this.projects, 'type', this.state.filterByType));
    };
    ProjectService.prototype.sortProjects = function () {
        this.projects$.next(_helpers_helpers_component__WEBPACK_IMPORTED_MODULE_3__["HelpersComponent"].orderBy.apply(_helpers_helpers_component__WEBPACK_IMPORTED_MODULE_3__["HelpersComponent"], [this.projects].concat([this.state.sortByAttr])));
    };
    ProjectService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], ProjectService);
    return ProjectService;
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
/* harmony default export */ __webpack_exports__["default"] = (".top-menu {\n  box-shadow: 0 1px 14px black;\n  height: 80px;\n}\n.top-menu .logo {\n  float: left;\n  text-transform: uppercase;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: xx-large;\n  vertical-align: middle;\n  margin: 0 28px 0 0;\n}\n.top-menu .about {\n  float: right;\n  font-size: 0.7em;\n  color: #bbb;\n  display: block;\n  margin: 3px 20px 0 0;\n  font-weight: lighter;\n  text-transform: uppercase;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdG9wLW1lbnUvRTovUmVwb3NpdG9yaWVzL3RlcnRpdW1ub24ud2ViL3NyYy9hcHAvdG9wLW1lbnUvdG9wLW1lbnUuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3RvcC1tZW51L3RvcC1tZW51LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNEJBQUE7RUFDQSxZQUFBO0FDQ0Y7QURIQTtFQUtJLFdBQUE7RUFDQSx5QkFBQTtFQUNBLG1FQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0o7QURYQTtFQWNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtFQUNBLHlCQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC90b3AtbWVudS90b3AtbWVudS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b3AtbWVudSB7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDE0cHggYmxhY2s7XG4gIGhlaWdodDogODBweDtcblxuICAubG9nbyB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LWZhbWlseTogQ2VudHVyeSBHb3RoaWMsIENlbnR1cnlHb3RoaWMsIEFwcGxlR290aGljLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBtYXJnaW46IDAgMjhweCAwIDA7XG4gIH1cblxuICAuYWJvdXQge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBmb250LXNpemU6IDAuN2VtO1xuICAgIGNvbG9yOiNiYmI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAzcHggMjBweCAwIDA7XG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxufVxuIiwiLnRvcC1tZW51IHtcbiAgYm94LXNoYWRvdzogMCAxcHggMTRweCBibGFjaztcbiAgaGVpZ2h0OiA4MHB4O1xufVxuLnRvcC1tZW51IC5sb2dvIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtZmFtaWx5OiBDZW50dXJ5IEdvdGhpYywgQ2VudHVyeUdvdGhpYywgQXBwbGVHb3RoaWMsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIG1hcmdpbjogMCAyOHB4IDAgMDtcbn1cbi50b3AtbWVudSAuYWJvdXQge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtc2l6ZTogMC43ZW07XG4gIGNvbG9yOiAjYmJiO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiAzcHggMjBweCAwIDA7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuIl19 */");

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

module.exports = __webpack_require__(/*! E:\Repositories\tertiumnon.web\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map