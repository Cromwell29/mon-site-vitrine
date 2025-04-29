document.addEventListener("footerLoaded", () => {
  const container = document.getElementById("kofi-container");
  if (container) {
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";
    script.onload = () => {
      kofiwidget2.init('Aidez nous sur SephyLeaks', '#c573f5', 'Y8Y41E6NZ8');
      kofiwidget2.draw();
    };
    container.appendChild(script);
  }
});
