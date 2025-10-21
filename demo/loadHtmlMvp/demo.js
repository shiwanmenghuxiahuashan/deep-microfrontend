class Demo {
  constructor() {
    this.inro = '这是一个由子应用渲染的div';
  }
  sayHello() {
    const div = document.createElement('div');
    div.innerHTML = this.inro;
    document.getElementById('sub-app').appendChild(div);

    location.hash = '#/welcome';
  }
}
const demo = new Demo();
demo.sayHello();
