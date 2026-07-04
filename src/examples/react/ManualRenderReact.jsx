import { useMemo, useState } from 'react';

export default function ManualRenderReact({ onTrace }) {
  const [todos, setTodos] = useState([
    { id: 1, title: '상태 배열 만들기', done: true },
    { id: 2, title: 'render() 직접 호출하지 않기', done: false },
  ]);
  const [draft, setDraft] = useState('이벤트 연결은 JSX에 남기기');

  const doneCount = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos],
  );

  const addTodo = () => {
    setTodos((current) => [
      ...current,
      { id: Date.now(), title: draft, done: false },
    ]);
    onTrace('React: 배열 state를 바꾸면 React가 필요한 DOM 갱신 계산', 'react');
  };

  const toggleTodo = (id) => {
    setTodos((current) => current.map((todo) => (
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )));
    onTrace('React: 이벤트 연결은 JSX 위치에 유지', 'react');
  };

  return (
    <div className="demo-card">
      <h4>데이터가 곧 화면의 기준</h4>
      <p className="metric">완료 {doneCount} / 전체 {todos.length}</p>
      <div className="demo-row">
        <input
          className="demo-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="primary-btn" type="button" onClick={addTodo}>추가</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className={todo.done ? 'todo-item done' : 'todo-item'} key={todo.id}>
            <span>{todo.title}</span>
            <button className="secondary-btn" type="button" onClick={() => toggleTodo(todo.id)}>
              토글
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
