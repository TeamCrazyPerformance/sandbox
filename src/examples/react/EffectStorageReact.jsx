import { useEffect, useState } from 'react';

const STORAGE_KEY = 'learn-react-react-checklist';

const readInitialItems = () => (
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? [
    { id: 1, title: '컴포넌트 읽기', done: false },
    { id: 2, title: 'state 바꾸기', done: false },
  ]
);

export default function EffectStorageReact({ onTrace }) {
  const [items, setItems] = useState(readInitialItems);
  const [draft, setDraft] = useState('effect는 외부 시스템용');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    onTrace('React: items state를 localStorage와 동기화하는 effect 실행', 'react');
  }, [items, onTrace]);

  const addItem = () => {
    setItems((current) => [
      ...current,
      { id: Date.now(), title: draft, done: false },
    ]);
  };

  return (
    <div className="demo-card">
      <h4>useEffect는 외부 시스템 동기화용</h4>
      <div className="demo-row">
        <input
          className="demo-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="primary-btn" type="button" onClick={addItem}>저장</button>
      </div>
      <ul className="todo-list">
        {items.map((item) => (
          <li className="todo-item" key={item.id}>
            <span>{item.title}</span>
            <button
              className="danger-btn"
              type="button"
              onClick={() => setItems((current) => current.filter((saved) => saved.id !== item.id))}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
