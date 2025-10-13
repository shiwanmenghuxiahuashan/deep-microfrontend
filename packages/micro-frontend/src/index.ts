import { defineMicroFrontendCustomElement } from './micro_frontend_element';
import { MICRO_FRONTEND_TAG_NAME } from './constant';
class MicroFrontend {
  tagName: string = MICRO_FRONTEND_TAG_NAME;
  start(options: any) {
    // 如果自定义元素不存在，则定义自定义元素
    if (!window.customElements.get(this.tagName)) {
      defineMicroFrontendCustomElement(this.tagName);
    }
  }
}
const microFrontend = new MicroFrontend();

export {
  defineMicroFrontendCustomElement,
  microFrontend,
  MICRO_FRONTEND_TAG_NAME
};
