export function mountBuildTools(root, onTrace) {
  root.innerHTML = `
    <div class="demo-card">
      <h4>빌드 도구 없이 시작할 때</h4>
      <p class="demo-hint">HTML 파일을 직접 열면 작은 예제는 동작하지만, JSX와 모듈 변환, 개발 서버, 배포 묶음은 직접 해결해야 합니다.</p>
      <div class="flow">
        <div class="flow-step">index.html을 직접 열기</div>
        <div class="flow-step">script 태그로 JS 연결</div>
        <div class="flow-step">DOM API를 직접 호출</div>
      </div>
      <button class="secondary-btn" data-role="inspect">흐름 확인</button>
    </div>
  `;

  const button = root.querySelector('[data-role="inspect"]');
  const inspect = () => {
    onTrace('Vanilla: 브라우저가 HTML, CSS, JS 파일을 그대로 읽음', 'vanilla');
  };

  button.addEventListener('click', inspect);
  return () => button.removeEventListener('click', inspect);
}
