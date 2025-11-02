let templateStyle; //临时模板style
function scopeCss(targetEl, styleText) {
  const template = document.createElement('style');
  document.body.appendChild(template);
  template.textContent = styleText;
  template.sheet.disabled = true;
  const cssRules = Array.from(template.sheet.cssRules);
  const prefix = '#sub-container';
  const result = cssRules.map((rule) => {
    const { selectorText, cssText } = rule;

    return cssText.replace(selectorText, `${prefix} ${selectorText}`);
  });
  console.log(result);

  const styleTag = document.createElement('style');
  styleTag.textContent = result.join(' ');
  targetEl.appendChild(styleTag);
  template.textContent = '';
}
