/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatableBehavior} from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/marked-element/marked-element.js';
import '@advanced-rest-client/markdown-styles/markdown-styles.js';
/**
 * A file form item.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin Polymer.IronValidatableBehavior
 */
class MultipartFileFormItem extends mixinBehaviors([IronValidatableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style include="api-form-styles">
    :host {
      display: block;
      @apply --layout-flex;
    }

    *[hidden] {
      display: none !important;
    }

    .file-row {
      margin: 8px 0;
    }

    .controls {
      @apply --layout-horizontal;
      @apply --layout-flex;
      @apply --layout-center;
    }

    .controls > *:not(:last-child) {
      margin-right: 12px;
    }

    .file-trigger,
    .param-name {
      margin-right: 12px;
    }

    .file-trigger {
      color: var(--multipart-payload-editor-file-trigger-color, var(--accent-color, #FF5722));
    }

    .files-counter-message {
      color: rgba(0, 0, 0, 0.74);
      @apply --layout-flex;
      @apply --arc-font-body1;
    }

    .name-field {
      max-width: 360px;
      @apply --layout-flex;
    }
    </style>
    <div class="file-row">
      <div class="controls">
        <paper-input error-message="The name is required" label="Field name"
          required="" auto-validate="" value="{{name}}" class="name-field"></paper-input>
        <paper-button raised="" on-click="_selectFile" class="file-trigger">Choose file</paper-button>
        <template is="dom-if" if="[[hasFile]]">
          <span class="files-counter-message" hidden\$="[[!hasFile]]">[[value.name]] ([[value.size]] bytes)</span>
        </template>
        <template is="dom-if" if="[[model.hasDescription]]">
          <paper-icon-button class="hint-icon" icon="arc:help"
            on-click="toggleDocumentation" title="Display documentation"></paper-icon-button>
        </template>
      </div>
      <template is="dom-if" if="[[model.hasDescription]]" restamp="">
        <div class="docs">
          <iron-collapse opened="[[docsOpened]]">
            <marked-element markdown="[[model.description]]">
              <div slot="markdown-html" class="markdown-body"></div>
            </marked-element>
          </iron-collapse>
        </div>
      </template>
    </div>
    <input type="file" hidden="" on-change="_fileObjectChanged" accept\$="[[_computeAccept(model)]]">
`;
  }

  static get is() {
    return 'multipart-file-form-item';
  }
  static get properties() {
    return {
      /**
       * Computed value, true if the control has a file.
       */
      hasFile: {
        type: Boolean,
        computed: '_computeHasFile(value)'
      },
      /**
       * Name of this control
       */
      name: {
        type: String,
        notify: true
      },
      /**
       * Valuie of this control.
       */
      value: {
        type: String,
        notify: true
      },
      /**
       * A view model.
       */
      model: Object,
      /**
       * True to render documentation (if set in model)
       */
      docsOpened: Boolean
    };
  }
  /**
   * Toggles documentation (if available)
   */
  toggleDocumentation() {
    this.docsOpened = !this.docsOpened;
  }

  _getValidity() {
    return !!(this.name && this.value instanceof Blob);
  }
  /**
   * Tests if current value is a type of `Blob`.
   *
   * @param {String|Blob|File|undefined} value Value to test
   * @return {Boolean}
   */
  _computeHasFile(value) {
    return !!(value && value instanceof Blob);
  }

  /**
   * A handler to choose file button click.
   * This function will find a proper input[type="file"] and programatically click on it to open
   * file dialog.
   */
  _selectFile() {
    const file = this.shadowRoot.querySelector('input[type="file"]');
    file.click();
  }

  /**
   * A handler to file change event for input[type="file"].
   * This will update files array for corresponding `this.filesList` array object.
   *
   * @param {Event} e
   */
  _fileObjectChanged(e) {
    this.set('value', e.target.files[0]);
  }
  /**
   * Computes the `accept`attribute for file input.
   *
   * @param {Object} model
   * @return {String}
   */
  _computeAccept(model) {
    if (!model) {
      return;
    }
    if (model.fileTypes && model.fileTypes.length && typeof model.fileTypes[0] === 'string') {
      return model.fileTypes.join(',');
    }
    if (model.fixedFacets) {
      if (model.fixedFacets.fileTypes && model.fixedFacets.fileTypes.length) {
        return model.fixedFacets.fileTypes.join(',');
      }
    }
  }
}
window.customElements.define(MultipartFileFormItem.is, MultipartFileFormItem);