const defineMicroFrontendCustomElement = (tagName: string) => {
  class MicroFrontendCustomElement extends HTMLElement {
    static get observedAttributes(): string[] {
      return ['name', 'url'];
    }
    constructor() {
      super();
      this.name = this.getAttribute('name') || '';
      this.url = this.getAttribute('url') || '';
    }
    connectedCallback() {
      console.log('[MicroFrontendCustomElement] 元素添加到文档中');
    }
    disconnectedCallback() {
      console.log('[MicroFrontendCustomElement] 元素从文档中移除');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      console.log(
        '[MicroFrontendCustomElement] 属性变更',
        name,
        oldValue,
        newValue
      );
    }
    adoptedCallback() {
      console.log('[MicroFrontendCustomElement]  元素被移动');
    }
  }
  window.customElements.define(tagName, MicroFrontendCustomElement);
};

export { defineMicroFrontendCustomElement };
