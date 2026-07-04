import { useEffect, useState } from 'react';

export default function BasicDomReact({ onTrace }) {
  const [count, setCount] = useState(0);
  const message = count === 0
    ? '아직 버튼을 누르지 않았습니다.'
    : `message state로 화면을 ${count}번 다시 표현했습니다.`;

  useEffect(() => {
    if (count > 0) {
      onTrace('React: state가 바뀌자 컴포넌트를 다시 렌더링', 'react');
    }
  }, [count, onTrace]);

  return (
    <div className="demo-card">
      <h4>state로 화면 표현하기</h4>
      <p className="demo-hint">DOM을 찾지 않고, state 값으로 다음 화면을 선언합니다.</p>
      <p className="metric">{message}</p>
      <button
        className="primary-btn"
        type="button"
        onClick={() => {
          setCount(count + 1);
          onTrace('React: setCount로 다음 화면을 예약', 'react');
        }}
      >
        문구 바꾸기
      </button>
    </div>
  );
}
