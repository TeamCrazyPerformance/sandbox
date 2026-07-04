export function mountSnapshot(root, onTrace) {
  let count = 0;

  const paint = () => {
    root.innerHTML = `
      <div class="demo-card">
        <h4>일반 변수는 즉시 바뀝니다</h4>
        <p class="metric">count = ${count}</p>
        <button class="primary-btn" data-role="triple">count += 1 세 번</button>
        <p class="demo-hint">Vanilla 변수는 같은 이벤트 안에서 세 번 증가하면 바로 3이 늘어납니다.</p>
      </div>
    `;

    root.querySelector('[data-role="triple"]').addEventListener('click', () => {
      count += 1;
      count += 1;
      count += 1;
      onTrace('Vanilla: 같은 변수에 즉시 세 번 더해서 +3', 'vanilla');
      paint();
    });
  };

  paint();
  return () => {
    root.innerHTML = '';
  };
}
