import { useState } from 'react';

export default function SnapshotReact({ onTrace }) {
  const [count, setCount] = useState(0);

  const addStale = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    onTrace('React: 같은 snapshot의 count + 1을 세 번 예약해서 결과는 +1', 'react');
  };

  const addFunctional = () => {
    setCount((value) => value + 1);
    setCount((value) => value + 1);
    setCount((value) => value + 1);
    onTrace('React: 함수형 업데이트는 queue의 이전 값을 이어 받아 결과가 +3', 'react');
  };

  return (
    <div className="demo-card">
      <h4>state는 snapshot처럼 보입니다</h4>
      <p className="metric">count = {count}</p>
      <div className="demo-row">
        <button className="primary-btn" type="button" onClick={addStale}>
          count + 1 세 번
        </button>
        <button className="secondary-btn" type="button" onClick={addFunctional}>
          함수형 업데이트 세 번
        </button>
      </div>
      <p className="demo-hint">두 버튼의 결과 차이를 먼저 예측하고 눌러 보세요.</p>
    </div>
  );
}
