import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'learn-react-react-plan';

const defaultTasks = [
  { id: 1, title: 'Vanilla 버전 읽기', done: true },
  { id: 2, title: 'React 버전으로 옮기기', done: false },
];

const loadTasks = () => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? defaultTasks;

export default function MiniProjectReact({ onTrace }) {
  const [tasks, setTasks] = useState(loadTasks);
  const [draft, setDraft] = useState('props와 state 설명하기');

  const doneCount = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    setTasks((current) => [
      ...current,
      { id: Date.now(), title: draft, done: false },
    ]);
    onTrace('React mini: state를 바꾸면 목록, 조건부 스타일, 저장 effect가 이어짐', 'react');
  };

  return (
    <div className="demo-card">
      <h4>최종 미니 프로젝트: 학습 체크리스트</h4>
      <p className="metric">완료 {doneCount} / {tasks.length}</p>
      <div className="demo-row">
        <input
          className="demo-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="primary-btn" type="button" onClick={addTask}>추가</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li className={task.done ? 'todo-item done' : 'todo-item'} key={task.id}>
            <span>{task.title}</span>
            <span className="demo-row">
              <button
                className="secondary-btn"
                type="button"
                onClick={() => setTasks((current) => current.map((item) => (
                  item.id === task.id ? { ...item, done: !item.done } : item
                )))}
              >
                완료
              </button>
              <button
                className="danger-btn"
                type="button"
                onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}
              >
                삭제
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
