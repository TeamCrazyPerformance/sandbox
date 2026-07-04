export function mountBasicDom(root, onTrace) {
  root.innerHTML = `
    <div class="demo-card">
      <h4>DOM을 직접 찾아서 바꾸기</h4>
      <p class="demo-hint">HTML은 이미 있고, JS가 DOM 노드를 찾아 내용을 바꿉니다.</p>
      <p class="metric" data-role="message">아직 버튼을 누르지 않았습니다.</p>
      <button class="primary-btn" data-role="change">문구 바꾸기</button>
    </div>
  `;

  const message = root.querySelector('[data-role="message"]');
  const button = root.querySelector('[data-role="change"]');
  let count = 0;

  const handleClick = () => {
    count += 1;
    message.textContent = `querySelector로 찾은 DOM을 ${count}번 직접 수정했습니다.`;
    onTrace('Vanilla: textContent로 DOM 노드 내용을 직접 변경', 'vanilla');
  };

  button.addEventListener('click', handleClick);

  return () => {
    button.removeEventListener('click', handleClick);
  };
}
