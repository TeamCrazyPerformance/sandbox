export function mountDataFlow(root, onTrace) {
  let first = 0;
  let second = 0;
  let shared = 0;

  const render = () => {
    root.innerHTML = `
      <div class="demo-card">
        <h4>상태 위치를 직접 결정해야 합니다</h4>
        <p class="demo-hint">개별 변수와 공유 변수를 어디에 둘지 개발자가 직접 설계합니다.</p>
        <div class="demo-row">
          <button class="secondary-btn" data-role="first">첫 번째 ${first}</button>
          <button class="secondary-btn" data-role="second">두 번째 ${second}</button>
        </div>
        <div class="demo-row">
          <button class="primary-btn" data-role="shared-a">공유 A ${shared}</button>
          <button class="primary-btn" data-role="shared-b">공유 B ${shared}</button>
        </div>
      </div>
    `;

    root.querySelector('[data-role="first"]').addEventListener('click', () => {
      first += 1;
      onTrace('Vanilla: 첫 번째 버튼 전용 변수 변경', 'vanilla');
      render();
    });
    root.querySelector('[data-role="second"]').addEventListener('click', () => {
      second += 1;
      onTrace('Vanilla: 두 번째 버튼 전용 변수 변경', 'vanilla');
      render();
    });
    root.querySelectorAll('[data-role^="shared"]').forEach((button) => {
      button.addEventListener('click', () => {
        shared += 1;
        onTrace('Vanilla: 공유 변수를 바꾼 뒤 두 버튼을 다시 그림', 'vanilla');
        render();
      });
    });
  };

  render();
  return () => {
    root.innerHTML = '';
  };
}
