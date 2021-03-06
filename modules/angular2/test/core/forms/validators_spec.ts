import {
  ddescribe,
  describe,
  it,
  iit,
  xit,
  expect,
  beforeEach,
  afterEach,
  el
} from 'angular2/testing_internal';
import {ControlGroup, Control, Validators, AbstractControl, ControlArray} from 'angular2/core';

export function main() {
  function validator(key: string, error: any) {
    return function(c: AbstractControl) {
      var r = {};
      r[key] = error;
      return r;
    }
  }

  describe("Validators", () => {
    describe("required", () => {
      it("should error on an empty string",
         () => { expect(Validators.required(new Control(""))).toEqual({"required": true}); });

      it("should error on null",
         () => { expect(Validators.required(new Control(null))).toEqual({"required": true}); });

      it("should not error on a non-empty string",
         () => { expect(Validators.required(new Control("not empty"))).toEqual(null); });
    });

    describe("minLength", () => {
      it("should not error on an empty string",
         () => { expect(Validators.minLength(2)(new Control(""))).toEqual(null); });

      it("should not error on null",
         () => { expect(Validators.minLength(2)(new Control(null))).toEqual(null); });

      it("should not error on valid strings",
         () => { expect(Validators.minLength(2)(new Control("aa"))).toEqual(null); });

      it("should error on short strings", () => {
        expect(Validators.minLength(2)(new Control("a")))
            .toEqual({"minlength": {"requiredLength": 2, "actualLength": 1}});
      });
    });

    describe("maxLength", () => {
      it("should not error on an empty string",
         () => { expect(Validators.maxLength(2)(new Control(""))).toEqual(null); });

      it("should not error on null",
         () => { expect(Validators.maxLength(2)(new Control(null))).toEqual(null); });

      it("should not error on valid strings",
         () => { expect(Validators.maxLength(2)(new Control("aa"))).toEqual(null); });

      it("should error on short strings", () => {
        expect(Validators.maxLength(2)(new Control("aaa")))
            .toEqual({"maxlength": {"requiredLength": 2, "actualLength": 3}});
      });
    });

    describe("compose", () => {
      it("should return a null validator when given null",
         () => { expect(Validators.compose(null)).toBe(Validators.nullValidator); });

      it("should collect errors from all the validators", () => {
        var c = Validators.compose([validator("a", true), validator("b", true)]);
        expect(c(new Control(""))).toEqual({"a": true, "b": true});
      });

      it("should run validators left to right", () => {
        var c = Validators.compose([validator("a", 1), validator("a", 2)]);
        expect(c(new Control(""))).toEqual({"a": 2});
      });

      it("should return null when no errors", () => {
        var c = Validators.compose([Validators.nullValidator, Validators.nullValidator]);
        expect(c(new Control(""))).toEqual(null);
      });

      it("should ignore nulls", () => {
        var c = Validators.compose([null, Validators.required]);
        expect(c(new Control(""))).toEqual({"required": true});
      });
    });
  });
}
