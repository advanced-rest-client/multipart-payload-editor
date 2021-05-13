import {
  fixture,
  assert,
  nextFrame,
  html
} from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../multipart-text-form-item.js';


describe('<multipart-text-form-item>', function() {
  async function basicFixture() {
    const model = {
      binding: 'type',
      hasDescription: true,
      description: 'test',
      name: 'i2',
      value: 'v2',
      contentType: '',
      schema: {
        enabled: true,
        inputLabel: 'Property value',
        isCustom: true,
        isFile: false,
        inputType: 'text'
      }
    };
    return await fixture(html `
      <multipart-text-form-item .model="${model}" hasformdata name="i2" value="v2"></multipart-text-form-item>
    `);
  }

  async function noModelFixture() {
    return await fixture(html `
      <multipart-text-form-item></multipart-text-form-item>
    `);
  }

  describe('Initialization', () => {
    it('can be created with document.createElement', () => {
      const element = document.createElement('multipart-text-form-item');
      assert.ok(element);
    });

    it('renders hint-icon', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.hint-icon');
      assert.ok(node);
    });

    it('renders mime type selector', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.mime-selector');
      assert.ok(node);
    });

    it('passes the model to api-property-form-item', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('api-property-form-item');
      assert.equal(node.model, element.model);
    });

    it('can be initialized without the model', async () => {
      const element = await noModelFixture();
      assert.ok(element);
    });

    it('does not render mime type selector when no form data', async () => {
      const element = await noModelFixture();
      const node = element.shadowRoot.querySelector('.mime-selector');
      assert.notOk(node);
    });
  });

  describe('docs rendering', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('docs are not rendered by default', async () => {
      const node = element.shadowRoot.querySelector('.docs');
      assert.notOk(node);
    });

    it('docs are rendered after hint button click', async () => {
      const button = element.shadowRoot.querySelector('.hint-icon');
      MockInteractions.tap(button);
      await nextFrame();
      const node = element.shadowRoot.querySelector('.docs');
      assert.ok(node);
    });
  });

  describe('name change', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('updates name property', async () => {
      const input = element.shadowRoot.querySelector('.name-field').inputElement;
      input.value = 'test-changed';
      input.dispatchEvent(new CustomEvent('input'));
      await nextFrame();
      assert.equal(element.name, 'test-changed');
    });

    it('disaptches name-changed', async () => {
      const spy = sinon.spy();
      element.addEventListener('name-changed', spy);
      const input = element.shadowRoot.querySelector('.name-field').inputElement;
      input.value = 'test-changed';
      input.dispatchEvent(new CustomEvent('input'));
      await nextFrame();
      assert.equal(spy.args[0][0].detail.value, 'test-changed');
    });
  });

  describe('value change', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('updates name property', async () => {
      const input = element.shadowRoot.querySelector('.value-field');
      input.value = 'test-changed';
      await nextFrame();
      assert.equal(element.value, 'test-changed');
    });

    it('disaptches name-changed', async () => {
      const spy = sinon.spy();
      element.addEventListener('value-changed', spy);
      const input = element.shadowRoot.querySelector('.value-field');
      input.value = 'test-changed';
      await nextFrame();
      assert.equal(spy.args[0][0].detail.value, 'test-changed');
    });
  });

  describe('type change', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('updates name property', async () => {
      const input = element.shadowRoot.querySelector('.type-field');
      input.value = 'test-changed';
      await nextFrame();
      assert.equal(element.type, 'test-changed');
    });

    it('disaptches type-changed', async () => {
      const spy = sinon.spy();
      element.addEventListener('type-changed', spy);
      const input = element.shadowRoot.querySelector('.type-field');
      input.value = 'test-changed';
      await nextFrame();
      assert.equal(spy.args[0][0].detail.value, 'test-changed');
    });
  });

  describe('validation', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('validates the input', () => {
      const result = element.validate();
      assert.isTrue(result);
    });

    it('is not valied when no name', () => {
      element.name = '';
      const result = element.validate();
      assert.isFalse(result);
    });

    it('is not valied when no value', () => {
      element.value = '';
      const result = element.validate();
      assert.isFalse(result);
    });
  });

  describe('compatibility mode', () => {
    it('sets compatibility on item when setting legacy', async () => {
      const element = await basicFixture();
      element.legacy = true;
      assert.isTrue(element.legacy, 'legacy is set');
      assert.isTrue(element.compatibility, 'compatibility is set');
    });

    it('returns compatibility value from item when getting legacy', async () => {
      const element = await basicFixture();
      element.compatibility = true;
      assert.isTrue(element.legacy, 'legacy is set');
    });
  });

  describe('a11y', () => {
    it('is accessible with data', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element, {
        ignoredRules: ['color-contrast']
      });
    });
  });
});
