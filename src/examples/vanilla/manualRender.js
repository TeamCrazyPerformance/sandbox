export function mountManualRender(root, onTrace) {
  let nextId = 3;
  let todos = [
    { id: 1, title: '상태 배열 만들기', done: true },
    { id: 2, title: 'render() 함수 직접 호출하기', done: false },
  ];

  const render = () => {
    const doneCount = todos.filter((todo) => todo.done).length;

    root.innerHTML = `
      <div class="demo-card">
        <h4>데이터와 DOM 갱신이 떨어져 있는 예제</h4>
        <p class="metric">완료 ${doneCount} / 전체 ${todos.length}</p>
        <div class="demo-row">
          <input class="demo-input" data-role="input" value="DOM 이벤트 다시 연결하기" />
          <button class="primary-btn" data-role="add">추가</button>
        </div>
        <ul class="todo-list">
          ${todos.map((todo) => `
            <li class="todo-item ${todo.done ? 'done' : ''}">
              <span>${todo.title}</span>
              <button class="secondary-btn" data-id="${todo.id}">토글</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    root.querySelector('[data-role="add"]').addEventListener('click', () => {
      const input = root.querySelector('[data-role="input"]');
      todos = [...todos, { id: nextId, title: input.value, done: false }];
      nextId += 1;
      onTrace('Vanilla: 데이터 배열을 바꾼 뒤 render()를 직접 다시 호출', 'vanilla');
      render();
    });

    root.querySelectorAll('[data-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id);
        todos = todos.map((todo) => (
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
        onTrace('Vanilla: DOM을 다시 그리고 이벤트도 다시 연결', 'vanilla');
        render();
      });
    });
  };

  render();
  return () => {
    root.innerHTML = '';
  };
}
