export function mountRenderFlow(root, onTrace) {
  let count = 0;

  const render = () => {
    root.innerHTML = `
      <div class="demo-card">
        <h4>직접 만든 render pipeline</h4>
        <p class="metric">count = ${count}</p>
        <div class="flow">
          <div class="flow-step is-active">1. 이벤트 발생</div>
          <div class="flow-step">2. count 변수 변경</div>
          <div class="flow-step">3. render()가 innerHTML 전체 교체</div>
        </div>
        <button class="primary-btn" data-role="inc">증가</button>
      </div>
    `;

    root.querySelector('[data-role="inc"]').addEventListener('click', () => {
      onTrace('Vanilla: 클릭 이벤트 발생', 'vanilla');
      count += 1;
      onTrace('Vanilla: count 변수 변경', 'vanilla');
      render();
      onTrace('Vanilla: innerHTML로 화면 전체 갱신', 'vanilla');
    });
  };

  render();
  return () => {
    root.innerHTML = '';
  };
}
