"use strict";(self.webpackChunktertiumnon_github_io=self.webpackChunktertiumnon_github_io||[]).push([[127],{127:(Un,ut,p)=>{p.r(ut),p.d(ut,{ProjectsModule:()=>Gn});var f=p(814),Ae=p(770),o=p(25),dt=p(253),be=p(699),ht=p(280),pt=p(124),De=p(755);function E(t,e){return new be.y(r=>{const n=t.length;if(0===n)return void r.complete();const i=new Array(n);let s=0,a=0;for(let l=0;l<n;l++){const h=(0,dt.D)(t[l]);let g=!1;r.add(h.subscribe({next:_=>{g||(g=!0,a++),i[l]=_},error:_=>r.error(_),complete:()=>{s++,(s===n||!g)&&(a===n&&r.next(e?e.reduce((_,In,Hn)=>(_[In]=i[Hn],_),{}):i),r.complete())}}))}})}let ft=(()=>{var t;class e{constructor(n,i){this._renderer=n,this._elementRef=i,this.onChange=s=>{},this.onTouched=()=>{}}setProperty(n,i){this._renderer.setProperty(this._elementRef.nativeElement,n,i)}registerOnTouched(n){this.onTouched=n}registerOnChange(n){this.onChange=n}setDisabledState(n){this.setProperty("disabled",n)}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(o.Qsj),o.Y36(o.SBq))},t.\u0275dir=o.lG2({type:t}),e})(),V=(()=>{var t;class e extends ft{}return(t=e).\u0275fac=function(){let r;return function(i){return(r||(r=o.n5z(t)))(i||t)}}(),t.\u0275dir=o.lG2({type:t,features:[o.qOj]}),e})();const m=new o.OlP("NgValueAccessor"),Se={provide:m,useExisting:(0,o.Gpc)(()=>U),multi:!0},Fe=new o.OlP("CompositionEventMode");let U=(()=>{var t;class e extends ft{constructor(n,i,s){super(n,i),this._compositionMode=s,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function Ee(){const t=(0,f.q)()?(0,f.q)().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}())}writeValue(n){this.setProperty("value",n??"")}_handleInput(n){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(n)}_compositionStart(){this._composing=!0}_compositionEnd(n){this._composing=!1,this._compositionMode&&this.onChange(n)}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(o.Qsj),o.Y36(o.SBq),o.Y36(Fe,8))},t.\u0275dir=o.lG2({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,i){1&n&&o.NdJ("input",function(a){return i._handleInput(a.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(a){return i._compositionEnd(a.target.value)})},features:[o._Bn([Se]),o.qOj]}),e})();const c=new o.OlP("NgValidators"),v=new o.OlP("NgAsyncValidators");function Dt(t){return null!=t}function wt(t){return(0,o.QGY)(t)?(0,dt.D)(t):t}function Ot(t){let e={};return t.forEach(r=>{e=null!=r?{...e,...r}:e}),0===Object.keys(e).length?null:e}function St(t,e){return e.map(r=>r(t))}function Et(t){return t.map(e=>function xe(t){return!t.validate}(e)?e:r=>e.validate(r))}function W(t){return null!=t?function Ft(t){if(!t)return null;const e=t.filter(Dt);return 0==e.length?null:function(r){return Ot(St(r,e))}}(Et(t)):null}function R(t){return null!=t?function Pt(t){if(!t)return null;const e=t.filter(Dt);return 0==e.length?null:function(r){return function we(...t){if(1===t.length){const e=t[0];if((0,ht.k)(e))return E(e,null);if((0,De.K)(e)&&Object.getPrototypeOf(e)===Object.prototype){const r=Object.keys(e);return E(r.map(n=>e[n]),r)}}if("function"==typeof t[t.length-1]){const e=t.pop();return E(t=1===t.length&&(0,ht.k)(t[0])?t[0]:t,null).pipe((0,pt.U)(r=>e(...r)))}return E(t,null)}(St(r,e).map(wt)).pipe((0,pt.U)(Ot))}}(Et(t)):null}function xt(t,e){return null===t?[e]:Array.isArray(t)?[...t,e]:[t,e]}function q(t){return t?Array.isArray(t)?t:[t]:[]}function P(t,e){return Array.isArray(t)?t.includes(e):t===e}function Bt(t,e){const r=q(e);return q(t).forEach(i=>{P(r,i)||r.push(i)}),r}function kt(t,e){return q(e).filter(r=>!P(t,r))}class Tt{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=W(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=R(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,r){return!!this.control&&this.control.hasError(e,r)}getError(e,r){return this.control?this.control.getError(e,r):null}}class d extends Tt{get formDirective(){return null}get path(){return null}}class C extends Tt{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class Gt{constructor(e){this._cd=e}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}let It=(()=>{var t;class e extends Gt{constructor(n){super(n)}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(C,2))},t.\u0275dir=o.lG2({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,i){2&n&&o.ekj("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)},features:[o.qOj]}),e})();const D="VALID",N="INVALID",A="PENDING",w="DISABLED";function j(t){return null!=t&&!Array.isArray(t)&&"object"==typeof t}class Rt{constructor(e,r){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(r)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get valid(){return this.status===D}get invalid(){return this.status===N}get pending(){return this.status==A}get disabled(){return this.status===w}get enabled(){return this.status!==w}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(Bt(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(Bt(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(kt(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(kt(e,this._rawAsyncValidators))}hasValidator(e){return P(this._rawValidators,e)}hasAsyncValidator(e){return P(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){this.touched=!0,this._parent&&!e.onlySelf&&this._parent.markAsTouched(e)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(e=>e.markAllAsTouched())}markAsUntouched(e={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}markAsDirty(e={}){this.pristine=!1,this._parent&&!e.onlySelf&&this._parent.markAsDirty(e)}markAsPristine(e={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(r=>{r.markAsPristine({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}markAsPending(e={}){this.status=A,!1!==e.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!e.onlySelf&&this._parent.markAsPending(e)}disable(e={}){const r=this._parentMarkedDirty(e.onlySelf);this.status=w,this.errors=null,this._forEachChild(n=>{n.disable({...e,onlySelf:!0})}),this._updateValue(),!1!==e.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...e,skipPristineCheck:r}),this._onDisabledChange.forEach(n=>n(!0))}enable(e={}){const r=this._parentMarkedDirty(e.onlySelf);this.status=D,this._forEachChild(n=>{n.enable({...e,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors({...e,skipPristineCheck:r}),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(e){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===D||this.status===A)&&this._runAsyncValidator(e.emitEvent)),!1!==e.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(e)}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(r=>r._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?w:D}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e){if(this.asyncValidator){this.status=A,this._hasOwnPendingAsyncValidator=!0;const r=wt(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(n=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(n,{emitEvent:e})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(e,r={}){this.errors=e,this._updateControlsErrors(!1!==r.emitEvent)}get(e){let r=e;return null==r||(Array.isArray(r)||(r=r.split(".")),0===r.length)?null:r.reduce((n,i)=>n&&n._find(i),this)}getError(e,r){const n=r?this.get(r):this;return n&&n.errors?n.errors[e]:null}hasError(e,r){return!!this.getError(e,r)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(e)}_initObservables(){this.valueChanges=new o.vpe,this.statusChanges=new o.vpe}_calculateStatus(){return this._allControlsDisabled()?w:this.errors?N:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(A)?A:this._anyControlsHaveStatus(N)?N:D}_anyControlsHaveStatus(e){return this._anyControls(r=>r.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e={}){this.pristine=!this._anyControlsDirty(),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}_updateTouched(e={}){this.touched=this._anyControlsTouched(),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){j(e)&&null!=e.updateOn&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=function Te(t){return Array.isArray(t)?W(t):t||null}(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=function Ge(t){return Array.isArray(t)?R(t):t||null}(this._rawAsyncValidators)}}const b=new o.OlP("CallSetDisabledState",{providedIn:"root",factory:()=>B}),B="always";function O(t,e,r=B){(function Z(t,e){const r=function Nt(t){return t._rawValidators}(t);null!==e.validator?t.setValidators(xt(r,e.validator)):"function"==typeof r&&t.setValidators([r]);const n=function jt(t){return t._rawAsyncValidators}(t);null!==e.asyncValidator?t.setAsyncValidators(xt(n,e.asyncValidator)):"function"==typeof n&&t.setAsyncValidators([n]);const i=()=>t.updateValueAndValidity();G(e._rawValidators,i),G(e._rawAsyncValidators,i)})(t,e),e.valueAccessor.writeValue(t.value),(t.disabled||"always"===r)&&e.valueAccessor.setDisabledState?.(t.disabled),function Ue(t,e){e.valueAccessor.registerOnChange(r=>{t._pendingValue=r,t._pendingChange=!0,t._pendingDirty=!0,"change"===t.updateOn&&qt(t,e)})}(t,e),function Re(t,e){const r=(n,i)=>{e.valueAccessor.writeValue(n),i&&e.viewToModelUpdate(n)};t.registerOnChange(r),e._registerOnDestroy(()=>{t._unregisterOnChange(r)})}(t,e),function We(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,"blur"===t.updateOn&&t._pendingChange&&qt(t,e),"submit"!==t.updateOn&&t.markAsTouched()})}(t,e),function He(t,e){if(e.valueAccessor.setDisabledState){const r=n=>{e.valueAccessor.setDisabledState(n)};t.registerOnDisabledChange(r),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(r)})}}(t,e)}function G(t,e){t.forEach(r=>{r.registerOnValidatorChange&&r.registerOnValidatorChange(e)})}function qt(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function Jt(t,e){const r=t.indexOf(e);r>-1&&t.splice(r,1)}function $t(t){return"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"value"in t&&"disabled"in t}const zt=class extends Rt{constructor(e=null,r,n){super(function J(t){return(j(t)?t.validators:t)||null}(r),function $(t,e){return(j(e)?e.asyncValidators:t)||null}(n,r)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(r),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),j(r)&&(r.nonNullable||r.initialValueIsDefault)&&(this.defaultValue=$t(e)?e.value:e)}setValue(e,r={}){this.value=this._pendingValue=e,this._onChange.length&&!1!==r.emitModelToViewChange&&this._onChange.forEach(n=>n(this.value,!1!==r.emitViewToModelChange)),this.updateValueAndValidity(r)}patchValue(e,r={}){this.setValue(e,r)}reset(e=this.defaultValue,r={}){this._applyFormState(e),this.markAsPristine(r),this.markAsUntouched(r),this.setValue(this.value,r),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Jt(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Jt(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(e){$t(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}},Qe={provide:C,useExisting:(0,o.Gpc)(()=>et)},Xt=(()=>Promise.resolve())();let et=(()=>{var t;class e extends C{constructor(n,i,s,a,l,h){super(),this._changeDetectorRef=l,this.callSetDisabledState=h,this.control=new zt,this._registered=!1,this.name="",this.update=new o.vpe,this._parent=n,this._setValidators(i),this._setAsyncValidators(s),this.valueAccessor=function K(t,e){if(!e)return null;let r,n,i;return Array.isArray(e),e.forEach(s=>{s.constructor===U?r=s:function Ye(t){return Object.getPrototypeOf(t.constructor)===V}(s)?n=s:i=s}),i||n||r||null}(0,a)}ngOnChanges(n){if(this._checkForErrors(),!this._registered||"name"in n){if(this._registered&&(this._checkName(),this.formDirective)){const i=n.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in n&&this._updateDisabled(n),function X(t,e){if(!t.hasOwnProperty("model"))return!1;const r=t.model;return!!r.isFirstChange()||!Object.is(e,r.currentValue)}(n,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(n){this.viewModel=n,this.update.emit(n)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){O(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(n){Xt.then(()=>{this.control.setValue(n,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(n){const i=n.isDisabled.currentValue,s=0!==i&&(0,o.VuI)(i);Xt.then(()=>{s&&!this.control.disabled?this.control.disable():!s&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(n){return this._parent?function k(t,e){return[...e.path,t]}(n,this._parent):[n]}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(d,9),o.Y36(c,10),o.Y36(v,10),o.Y36(m,10),o.Y36(o.sBO,8),o.Y36(b,8))},t.\u0275dir=o.lG2({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[o._Bn([Qe]),o.qOj,o.TTD]}),e})(),te=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({}),e})();const cn={provide:m,useExisting:(0,o.Gpc)(()=>H),multi:!0};function ae(t,e){return null==t?`${e}`:(e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let H=(()=>{var t;class e extends V{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(n){this._compareWith=n}writeValue(n){this.value=n;const s=ae(this._getOptionId(n),n);this.setProperty("value",s)}registerOnChange(n){this.onChange=i=>{this.value=this._getOptionValue(i),n(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(n){for(const i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i),n))return i;return null}_getOptionValue(n){const i=function un(t){return t.split(":")[0]}(n);return this._optionMap.has(i)?this._optionMap.get(i):n}}return(t=e).\u0275fac=function(){let r;return function(i){return(r||(r=o.n5z(t)))(i||t)}}(),t.\u0275dir=o.lG2({type:t,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(n,i){1&n&&o.NdJ("change",function(a){return i.onChange(a.target.value)})("blur",function(){return i.onTouched()})},inputs:{compareWith:"compareWith"},features:[o._Bn([cn]),o.qOj]}),e})(),le=(()=>{var t;class e{constructor(n,i,s){this._element=n,this._renderer=i,this._select=s,this._select&&(this.id=this._select._registerOption())}set ngValue(n){null!=this._select&&(this._select._optionMap.set(this.id,n),this._setElementValue(ae(this.id,n)),this._select.writeValue(this._select.value))}set value(n){this._setElementValue(n),this._select&&this._select.writeValue(this._select.value)}_setElementValue(n){this._renderer.setProperty(this._element.nativeElement,"value",n)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(H,9))},t.\u0275dir=o.lG2({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),e})();const dn={provide:m,useExisting:(0,o.Gpc)(()=>it),multi:!0};function ce(t,e){return null==t?`${e}`:("string"==typeof e&&(e=`'${e}'`),e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let it=(()=>{var t;class e extends V{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(n){this._compareWith=n}writeValue(n){let i;if(this.value=n,Array.isArray(n)){const s=n.map(a=>this._getOptionId(a));i=(a,l)=>{a._setSelected(s.indexOf(l.toString())>-1)}}else i=(s,a)=>{s._setSelected(!1)};this._optionMap.forEach(i)}registerOnChange(n){this.onChange=i=>{const s=[],a=i.selectedOptions;if(void 0!==a){const l=a;for(let h=0;h<l.length;h++){const _=this._getOptionValue(l[h].value);s.push(_)}}else{const l=i.options;for(let h=0;h<l.length;h++){const g=l[h];if(g.selected){const _=this._getOptionValue(g.value);s.push(_)}}}this.value=s,n(s)}}_registerOption(n){const i=(this._idCounter++).toString();return this._optionMap.set(i,n),i}_getOptionId(n){for(const i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i)._value,n))return i;return null}_getOptionValue(n){const i=function hn(t){return t.split(":")[0]}(n);return this._optionMap.has(i)?this._optionMap.get(i)._value:n}}return(t=e).\u0275fac=function(){let r;return function(i){return(r||(r=o.n5z(t)))(i||t)}}(),t.\u0275dir=o.lG2({type:t,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(n,i){1&n&&o.NdJ("change",function(a){return i.onChange(a.target)})("blur",function(){return i.onTouched()})},inputs:{compareWith:"compareWith"},features:[o._Bn([dn]),o.qOj]}),e})(),ue=(()=>{var t;class e{constructor(n,i,s){this._element=n,this._renderer=i,this._select=s,this._select&&(this.id=this._select._registerOption(this))}set ngValue(n){null!=this._select&&(this._value=n,this._setElementValue(ce(this.id,n)),this._select.writeValue(this._select.value))}set value(n){this._select?(this._value=n,this._setElementValue(ce(this.id,n)),this._select.writeValue(this._select.value)):this._setElementValue(n)}_setElementValue(n){this._renderer.setProperty(this._element.nativeElement,"value",n)}_setSelected(n){this._renderer.setProperty(this._element.nativeElement,"selected",n)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(it,9))},t.\u0275dir=o.lG2({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),e})(),Vn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[te]}),e})(),An=(()=>{var t;class e{static withConfig(n){return{ngModule:e,providers:[{provide:b,useValue:n.callSetDisabledState??B}]}}}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[Vn]}),e})(),bn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[f.ez,An]}),e})(),Dn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[f.ez]}),e})(),wn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[f.ez,Dn]}),e})();var Ce=p(125),u=function(t){return t.Inactive="0",t.Active="1",t}(u||{});const at=[{name:"cheatsheets",title:"Cheatsheets",type:"Knowledge base",description:"Cheatsheets for programmers",imagePreview:"",image:"",link:"https://github.com/Tertiumnon/cheatsheets",year:2017,status:u.Active},{name:"send-text-to-form",title:"Send Text To Form",type:"Web extension",description:"Chrome extension for sending text to form on any page",imagePreview:"",image:"/assets/images/projects/send-text-to-form-web-ext/2017-send-text-to-form-web-ext.png",link:"https://chrome.google.com/webstore/detail/send-text-to-form/oapmpchdbmlmblgeambfmcmmoalbgooi",year:2017,status:u.Inactive},{name:"mw-deploy",title:"MediaWiki Deploy",type:"NodeJS application",description:"NodeJS application for deploying MediaWiki pages",imagePreview:"",image:"",link:"https://github.com/Tertiumnon/mw-deploy",year:2017,status:u.Inactive},{name:"bookmarks-manager",title:"Bookmarks Manager",type:"Web extension",description:"Firefox extension for bookmarks organizing",imagePreview:"",image:"",link:"https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/",year:2017,status:u.Active},{name:"tertium-js-snippets",title:"Tertium JS Snippets",type:"App extension",description:"Visual Studio Code extension for JavaScript autocompletion",imagePreview:"",image:"",link:"https://marketplace.visualstudio.com/items?itemName=tertiumnon.tertium-js-snippets",year:2019,status:u.Active},{name:"json-all-to-one",title:"JSON All to One",type:"NodeJS package",description:"NodeJS script for JSON files concatenation",imagePreview:"",image:"",link:"https://www.npmjs.com/package/json-all-to-one",year:2019,status:u.Inactive},{name:"json-to-sql",title:"JSON to SQL",type:"NodeJS package",description:"NodeJS script that creates SQL script from JSON file",imagePreview:"",image:"",link:"https://www.npmjs.com/package/json-to-sql-script",year:2019,status:u.Inactive},{name:"tertium-countries",title:"@tertium/countries",type:"NodeJS package",description:"NodeJS module for country codes",imagePreview:"",image:"",link:"https://www.npmjs.com/package/@tertium/countries",year:2021,status:u.Active},{name:"tertium-icons",title:"Tertium Icons",type:"NodeJS package",description:"SVG and font icons",imagePreview:"",image:"",link:"https://www.npmjs.com/package/tertium.icons",year:2017,status:u.Inactive},{name:"senior-pomodoro",title:"Senior Pomodoro",type:"Desktop application",description:"Pomodoro timer for coders",imagePreview:"",image:"",link:"",year:2020,status:u.Active}];let lt=(()=>{var t;class e{static orderBy(n,...i){const s=i[0][0],a="-"===s?i[0].slice(1):i[0],l=[...n];return l.sort((h,g)=>h[a]<g[a]?"-"===s?-1:1:h[a]>g[a]?"-"===s?1:-1:0),l}static filterBy(n,i,s){const a=[...n];if(!s||"all"===s)return n;switch(i){case"status":return a.filter(l=>l.status===s);case"workType":return a.filter(l=>l.workTypes.includes(s))}}}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-helpers"]],decls:2,vars:0,template:function(n,i){1&n&&(o.TgZ(0,"p"),o._uU(1,"helpers works!"),o.qZA())}}),e})(),ct=(()=>{var t;class e{constructor(){this.projects=at,this.projects$=new Ce.X(at),this.state={},this.state$=new Ce.X({filterByStatus:u.Active,filterByWorkType:"all",sortByAttrVal:"year"})}setState(n){this.state={...this.state,...n},this.filterProjects(),this.sortProjects()}filterProjects(){let n=lt.filterBy(this.projects,"status",this.state.filterByStatus);n=lt.filterBy(n,"workType",this.state.filterByWorkType),this.projects$.next(n)}sortProjects(){this.projects$.next(lt.orderBy(this.projects$.value,this.state.sortByAttrVal))}}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),e})();function On(t,e){if(1&t&&(o.TgZ(0,"option",8),o._uU(1),o.qZA()),2&t){const r=e.$implicit;o.Q6J("value",r.value),o.xp6(1),o.hij(" ",r.viewValue," ")}}const Ve=function(t){return{"width.px":t}};function Sn(t,e){if(1&t){const r=o.EpF();o.TgZ(0,"div",7)(1,"label"),o._uU(2,"Status"),o.qZA(),o.TgZ(3,"select",5),o.NdJ("ngModelChange",function(i){o.CHM(r);const s=o.oxw();return o.KtG(s.filterByStatus=i)})("change",function(){o.CHM(r);const i=o.oxw();return o.KtG(i.onStatusChange())}),o.YNc(4,On,2,2,"option",6),o.qZA()()}if(2&t){const r=o.oxw();o.xp6(3),o.Q6J("ngModel",r.filterByStatus)("ngStyle",o.VKq(3,Ve,r.filterByStatusWidth)),o.xp6(1),o.Q6J("ngForOf",r.filterStatuses)}}function En(t,e){if(1&t&&(o.TgZ(0,"option",8),o._uU(1),o.qZA()),2&t){const r=e.$implicit;o.Q6J("value",r.value),o.xp6(1),o.hij(" ",r.viewValue," ")}}let Fn=(()=>{var t;class e{constructor(n,i){this.projectService=n,this.ProjectsService=i,this.isStatusFilterVisible=!0,this.filterStatuses=[{value:u.Active,viewValue:"Active"},{value:u.Inactive,viewValue:"Inactive"}],this.filterByStatus=u.Active,this.filterByStatusWidth=0,this.filterTypes=[{value:"all",viewValue:"All"},{value:"design",viewValue:"Design"},{value:"coding",viewValue:"Coding"},{value:"layout",viewValue:"Layout"}],this.filterByWorkType="",this.filterByWorkTypeWidth=0,this.sortAttrs=[{value:"year",viewValue:"Year (newer)"},{value:"-year",viewValue:"Year (older)"}],this.sortByAttrVal="",this.sortByAttrWidth=0}static getTextWidth(n){const i=document.createElement("span");i.setAttribute("style","display: hidden;"),i.innerHTML=n,document.body.appendChild(i);const s=i.offsetWidth+1;return i.remove(),s}getFilterByStatusWidth(){return e.getTextWidth(this.filterStatuses.filter(n=>n.value===this.filterByStatus)[0].viewValue)}getFilterByWorkTypeWidth(){return e.getTextWidth(this.filterTypes.filter(n=>n.value===this.filterByWorkType)[0].viewValue)}getSortByAttrWidth(){return e.getTextWidth(this.sortAttrs.filter(n=>n.value===this.sortByAttrVal)[0].viewValue)}onStatusChange(){const{filterByStatus:n}=this;this.filterByStatusWidth=this.getFilterByStatusWidth(),this.projectService.setState({filterByStatus:n}),this.ProjectsService.setState({filterByStatus:n})}onTypeChange(){const{filterByWorkType:n}=this;this.filterByWorkTypeWidth=this.getFilterByWorkTypeWidth(),this.projectService.setState({filterByWorkType:n}),this.ProjectsService.setState({filterByWorkType:n})}onAttrChange(){const{sortByAttrVal:n}=this;this.sortByAttrWidth=this.getSortByAttrWidth(),this.projectService.setState({sortByAttrVal:n}),this.ProjectsService.setState({sortByAttrVal:n})}ngOnInit(){this.filterByStatus=u.Active,this.filterByStatusWidth=this.getFilterByStatusWidth(),this.filterByWorkType="all",this.filterByWorkTypeWidth=this.getFilterByWorkTypeWidth(),this.sortByAttrVal="year",this.sortByAttrWidth=this.getSortByAttrWidth(),this.projectService.setState({filterByStatus:this.filterByStatus,filterByWorkType:this.filterByWorkType,sortByAttrVal:this.sortByAttrVal}),this.ProjectsService.setState({filterByStatus:this.filterByStatus,filterByWorkType:this.filterByWorkType,sortByAttrVal:this.sortByAttrVal})}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(ct),o.Y36(ct))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-project-control-panel"]],inputs:{isStatusFilterVisible:"isStatusFilterVisible"},decls:9,vars:6,consts:[[1,"sticky","top-0","z-10","project-control-panel-wrapper"],[1,"container","mx-auto","project-control-panel"],[1,"filters"],["class","filter filter-by-status",4,"ngIf"],[1,"filter","sort-by-attr"],[3,"ngModel","ngStyle","ngModelChange","change"],[3,"value",4,"ngFor","ngForOf"],[1,"filter","filter-by-status"],[3,"value"]],template:function(n,i){1&n&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2),o.YNc(3,Sn,5,5,"div",3),o.TgZ(4,"div",4)(5,"label"),o._uU(6,"Sort by Release"),o.qZA(),o.TgZ(7,"select",5),o.NdJ("ngModelChange",function(a){return i.sortByAttrVal=a})("change",function(){return i.onAttrChange()}),o.YNc(8,En,2,2,"option",6),o.qZA()()()()()),2&n&&(o.xp6(3),o.Q6J("ngIf",i.isStatusFilterVisible),o.xp6(4),o.Q6J("ngModel",i.sortByAttrVal)("ngStyle",o.VKq(4,Ve,i.sortByAttrWidth)),o.xp6(1),o.Q6J("ngForOf",i.sortAttrs))},dependencies:[f.sg,f.O5,f.PC,le,ue,H,It,et],styles:[".project-control-panel-wrapper[_ngcontent-%COMP%]{background-color:var(--bg-color);filter:opacity(.85)}.hide-arrow-mixin[_ngcontent-%COMP%]{-webkit-appearance:none;appearance:none}.hide-arrow-mixin[_ngcontent-%COMP%]::-ms-expand{display:none}.project-control-panel[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]{display:flex}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]{margin:0 0 0 20px}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:inline-block;font-size:.9em;margin-right:4px}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{-webkit-appearance:none;appearance:none;display:inline-block;height:1.3em;border:none;color:var(--text-color);background-color:var(--bg-color);filter:opacity(.85);font-family:VT323,monospace;font-size:.9em;border-bottom:1px dashed;text-align:center;cursor:pointer}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::-ms-expand{display:none}.project-control-panel[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover{background-color:var(--bg-color)}"]}),e})();function Pn(t,e){if(1&t&&(o.TgZ(0,"span",10)(1,"a",11),o._uU(2,"\u260d"),o.qZA()()),2&t){const r=o.oxw(2);o.xp6(1),o.Q6J("href",r.project.link,o.LSH)}}function xn(t,e){if(1&t&&(o.TgZ(0,"div",1)(1,"div",2)(2,"div",3),o._uU(3),o.qZA(),o.TgZ(4,"div",4),o._uU(5),o.qZA()(),o.TgZ(6,"div",5),o._UZ(7,"img",6),o.TgZ(8,"div",7),o._uU(9),o.qZA()(),o.TgZ(10,"div",8)(11,"span"),o._uU(12),o.qZA(),o.YNc(13,Pn,3,1,"span",9),o.qZA()()),2&t){const r=o.oxw();o.xp6(3),o.Oqu(r.project.title),o.xp6(2),o.Oqu(r.project.type),o.xp6(2),o.Q6J("src",r.project.image,o.LSH),o.xp6(2),o.Oqu(r.project.description),o.xp6(3),o.Oqu(r.project.year),o.xp6(1),o.Q6J("ngIf",r.project.link)}}let Nn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-project-card"]],inputs:{project:"project"},decls:1,vars:1,consts:[["class","bg-white min-h-96 w-full h-full project-card",4,"ngIf"],[1,"bg-white","min-h-96","w-full","h-full","project-card"],[1,"py-4","px-6","text-black","header"],[1,"project-card-title"],[1,"-mt-1","text-lg"],[1,"h-36","body"],["project-card-image","",3,"src"],[1,"w-full","text-white","text-lg","h-56","description"],[1,"flex","place-content-between","gap-3","py-4","px-6","text-black","text-lg","footer"],["class","mt-0.5",4,"ngIf"],[1,"mt-0.5"],["target","_blank",3,"href"]],template:function(n,i){1&n&&o.YNc(0,xn,14,6,"div",0),2&n&&o.Q6J("ngIf",i.project)},dependencies:[f.O5],styles:[".project-card[_ngcontent-%COMP%]{opacity:.9}.project-card[_ngcontent-%COMP%]:hover{opacity:1}.project-card[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .project-card-title[_ngcontent-%COMP%]{text-transform:uppercase}.project-card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{position:relative;overflow:hidden}.project-card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .project-card-image[_ngcontent-%COMP%]{border-top:1px solid #dadada;border-bottom:1px solid #dadada;margin-top:0;margin-bottom:-4px}.project-card[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{position:absolute;top:0;padding:14px 28px 14px 20px;background-color:var(--bg-color);filter:opacity(.9)}.project-card[_ngcontent-%COMP%]   .project-card-content[_ngcontent-%COMP%]{margin-top:0;padding:16px 14px}"]}),e})();function jn(t,e){if(1&t&&(o.TgZ(0,"div",2),o._UZ(1,"app-project-card",3),o.qZA()),2&t){const r=e.$implicit;o.xp6(1),o.Q6J("project",r)}}let Bn=(()=>{var t;class e{constructor(){this.defaultImagePreview="/assets/images/projects/default/default.png",this.projects=[]}}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-project-list"]],inputs:{defaultImagePreview:"defaultImagePreview",projects:"projects"},decls:2,vars:1,consts:[[1,"flex","flex-wrap"],["class","w-full sm:w-1/2 lg:w-1/3 flex justify-content-center",4,"ngFor","ngForOf"],[1,"w-full","sm:w-1/2","lg:w-1/3","flex","justify-content-center"],[1,"w-full","m-2",3,"project"]],template:function(n,i){1&n&&(o.TgZ(0,"div",0),o.YNc(1,jn,2,1,"div",1),o.qZA()),2&n&&(o.xp6(1),o.Q6J("ngForOf",i.projects))},dependencies:[f.sg,Nn],encapsulation:2}),e})(),kn=(()=>{var t;class e{constructor(n){this.projectService=n,this.projects=[]}ngOnInit(){this.projectService.projects$.subscribe(n=>this.projects=n||[])}}return(t=e).\u0275fac=function(n){return new(n||t)(o.Y36(ct))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-projects"]],decls:3,vars:1,consts:[[1,"container","mx-auto"],[3,"projects"]],template:function(n,i){1&n&&(o._UZ(0,"app-project-control-panel"),o.TgZ(1,"div",0),o._UZ(2,"app-project-list",1),o.qZA()),2&n&&(o.xp6(2),o.Q6J("projects",i.projects))},dependencies:[Fn,Bn],encapsulation:2}),e})();var Me=function(t){return t.Equal="eq",t}(Me||{});let Tn=(()=>{var t;class e{find(n){const{filters:i}=n;let s=[...at];return i.length&&i.forEach(a=>{s=s.filter(l=>l[a.name]===a.value)}),s}get(n){const i=this.find({filters:[{name:"name",operator:Me.Equal,value:n}]});return i.length?i[0]:null}}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),e})(),Gn=(()=>{var t;class e{}return(t=e).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({providers:[Tn],imports:[f.ez,bn,wn,Ae.Bz.forChild([{path:"",pathMatch:"full",component:kn}])]}),e})()}}]);