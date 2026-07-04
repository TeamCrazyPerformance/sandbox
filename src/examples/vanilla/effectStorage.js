const STORAGE_KEY = 'learn-react-vanilla-checklist';

export function mountEffectStorage(root, onTrace) {
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '["컴포넌트 읽기","state 바꾸기"]')
    .map((title, index) => ({ id: index + 1, title, done: false }));
  let nextId = items.length + 1;

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((item) => item.title)));
    onTrace('Vanilla: localStorage.setItem을 직접 호출', 'vanilla');
  };

  const render = () => {
    root.innerHTML = `
      <div class="demo-card">
        <h4>외부 저장소와 직접 동기화</h4>
        <div class="demo-row">
          <input class="demo-input" data-role="input" value="effect는 외부 시스템용" />
          <button class="primary-btn" data-role="add">저장</button>
        </div>
        <ul class="todo-list">
          ${items.map((item) => `
            <li class="todo-item">
              <span>${item.title}</span>
              <button class="danger-btn" data-id="${item.id}">삭제</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    root.querySelector('[data-role="add"]').addEventListener('click', () => {
      const input = root.querySelector('[data-role="input"]');
      items = [...items, { id: nextId, title: input.value, done: false }];
      nextId += 1;
      save();
      render();
    });

    root.querySelectorAll('[data-id]').forEach((button) => {
      button.addEventListener('click', () => {
        items = items.filter((item) => item.id !== Number(button.dataset.id));
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
