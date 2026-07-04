const STORAGE_KEY = 'learn-react-vanilla-plan';

export function mountMiniProject(root, onTrace) {
  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? [
    { id: 1, title: 'Vanilla 버전 읽기', done: true },
    { id: 2, title: 'React 버전으로 옮기기', done: false },
  ];
  let nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };

  const render = () => {
    const doneCount = tasks.filter((task) => task.done).length;

    root.innerHTML = `
      <div class="demo-card">
        <h4>최종 미니 프로젝트: 학습 체크리스트</h4>
        <p class="metric">완료 ${doneCount} / ${tasks.length}</p>
        <div class="demo-row">
          <input class="demo-input" data-role="input" value="props와 state 설명하기" />
          <button class="primary-btn" data-role="add">추가</button>
        </div>
        <ul class="todo-list">
          ${tasks.map((task) => `
            <li class="todo-item ${task.done ? 'done' : ''}">
              <span>${task.title}</span>
              <span class="demo-row">
                <button class="secondary-btn" data-toggle="${task.id}">완료</button>
                <button class="danger-btn" data-remove="${task.id}">삭제</button>
              </span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    root.querySelector('[data-role="add"]').addEventListener('click', () => {
      const input = root.querySelector('[data-role="input"]');
      tasks = [...tasks, { id: nextId, title: input.value, done: false }];
      nextId += 1;
      save();
      onTrace('Vanilla mini: 상태 변경, 저장, DOM 재생성을 모두 직접 처리', 'vanilla');
      render();
    });

    root.querySelectorAll('[data-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.toggle);
        tasks = tasks.map((task) => (
          task.id === id ? { ...task, done: !task.done } : task
        ));
        save();
        render();
      });
    });

    root.querySelectorAll('[data-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        tasks = tasks.filter((task) => task.id !== Number(button.dataset.remove));
        save();
        render();
      });
    });
  };

  render();
  return () => {
    root.innerHTML = '';
  };
}
