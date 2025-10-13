const defineMicroFrontendCustomElement = (tagName: string) => {
  class MicroFrontendCustomElement extends HTMLElement {
    static get observedAttributes() {
      return ['name', 'url'];
    }
    constructor() {
      super();
    }
    connectedCallback() {
      console.log('[CustomElement] 元素添加到文档中', this);
      console.log('name:', this.getAttribute('name'));
      console.log('url:', this.getAttribute('url'));
    }
    disconnectedCallback() {
      console.log('[CustomElement] 元素从文档中移除');
    }
    /**
     * 属性变化回调
     * @param attrName 属性名
     * @param oldValue 旧值
     * @param newValue 新值
     */
    attributeChangedCallback(
      attrName: string,
      oldValue: string,
      newValue: string
    ) {
      // !!! MDN 中指出：如果元素的 HTML 声明包含一个被观察的属性，那么在属性被初始化后，attributeChangedCallback() 将在元素的声明首次解析时被调用。
      // !!! 但在 Vue 中并未发现上述行为，因为Vue会将其转换为虚拟DOM 节点，跳过了首次解析。
      // !!! 但Vue 会调用 setAttribute 方法来设置属性，所以也会触发 attributeChangedCallback。
      this.innerText = `[CustomElement] 属性${attrName} 由${oldValue} 变为${newValue}`;
    }
    adoptedCallback() {
      console.log('[CustomElement]  元素被移动');
    }
  }
  window.customElements.define(tagName, MicroFrontendCustomElement);
};

export { defineMicroFrontendCustomElement };
