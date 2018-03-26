/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   multipart-text-form-item.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />
/// <reference path="../polymer/types/lib/utils/render-status.d.ts" />
/// <reference path="../iron-validatable-behavior/iron-validatable-behavior.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../paper-autocomplete/paper-autocomplete.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../api-property-form-item/api-property-form-item.d.ts" />
/// <reference path="../marked-element/marked-element.d.ts" />
/// <reference path="../markdown-styles/markdown-styles.d.ts" />
/// <reference path="../iron-collapse/iron-collapse.d.ts" />
/// <reference path="../api-form-mixin/api-form-styles.d.ts" />
/// <reference path="multipart-form-item-behavior.d.ts" />

/**
 * A text form item.
 *
 * If the browser has native support for FormData (and iterators) then it will also render
 * a content type selector for the input field.
 */
declare class MultipartTextFormItem extends
  Polymer.IronValidatableBehavior(
  Polymer.Element) {

  /**
   * Name of this control
   */
  name: string|null|undefined;

  /**
   * Valuie of this control.
   */
  value: string|null|undefined;

  /**
   * A view model.
   */
  model: object|null|undefined;

  /**
   * True to render documentation (if set in model)
   */
  docsOpened: boolean|null|undefined;

  /**
   * Reference to the mime type input
   */
  _mimeInput: HTMLElement|null|undefined;

  /**
   * A content type of the form field to be presented in the Multipart request.
   */
  type: string|null|undefined;

  /**
   * List of suggested mime types
   */
  suggestions: any[]|null|undefined;

  /**
   * If set it will also renders mime type selector for the input data.
   */
  hasFormData: boolean|null|undefined;

  /**
   * Toggles documentation (if available)
   */
  toggleDocumentation(): void;
  ready(): void;
  _getValidity(): any;
  _hasFormDataChanged(hasFormData: any): void;
  _setAutocompleteTarget(): void;
}

interface HTMLElementTagNameMap {
  "multipart-text-form-item": MultipartTextFormItem;
}
