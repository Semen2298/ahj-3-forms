export default class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  showTooltip(message, element) {
    if (this._tooltips.length > 0) {
      this.removeTooltip(this._tooltips[this._tooltips.length - 1].id);
    }
    if (!element) return;

    const tooltipElement = document.createElement("div");

    tooltipElement.classList.add("tooltip");
    tooltipElement.innerHTML = `
          <h2>
            ${message.title}
          </h2>
          <p>
            ${message.description}
          </p>
      `;

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();
    const width = element.offsetWidth;

    tooltipElement.style.top =
      window.scrollY + top - tooltipElement.offsetHeight - 10 + "px";

    tooltipElement.style.left =
      left + width / 2 - tooltipElement.offsetWidth / 2 + "px";

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this._tooltips = this._tooltips.filter((t) => t.id !== id);
  }
}
