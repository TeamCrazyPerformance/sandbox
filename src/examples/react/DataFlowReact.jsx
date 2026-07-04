import { useState } from 'react';

function CounterButton({ label, count, onIncrement }) {
  return (
    <button className="primary-btn" type="button" onClick={onIncrement}>
      {label} {count}
    </button>
  );
}

export default function DataFlowReact({ onTrace }) {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [shared, setShared] = useState(0);

  return (
    <div className="demo-card">
      <h4>state를 부모로 올리면 함께 바뀝니다</h4>
      <p className="demo-hint">
        자식은 count를 props로 받고, 클릭은 onIncrement 콜백으로 부모에게 알립니다.
      </p>
      <div className="demo-row">
        <button className="secondary-btn" type="button" onClick={() => setFirst(first + 1)}>
          첫 번째 {first}
        </button>
        <button className="secondary-btn" type="button" onClick={() => setSecond(second + 1)}>
          두 번째 {second}
        </button>
      </div>
      <div className="demo-row">
        <CounterButton
          count={shared}
          label="공유 A"
          onIncrement={() => {
            setShared(shared + 1);
            onTrace('React: 부모 state가 바뀌고 두 자식에게 props로 전달', 'react');
          }}
        />
        <CounterButton
          count={shared}
          label="공유 B"
          onIncrement={() => {
            setShared(shared + 1);
            onTrace('React: 자식 이벤트가 부모 콜백을 호출', 'react');
          }}
        />
      </div>
    </div>
  );
}
