import { useEffect, useState } from 'react';

export default function RenderFlowReact({ onTrace }) {
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (count > 0) {
      setActiveStep(2);
      onTrace('React: render 결과를 비교한 뒤 필요한 DOM만 commit', 'react');
    }
  }, [count, onTrace]);

  const increment = () => {
    setActiveStep(0);
    onTrace('React: 이벤트가 state 변경을 trigger', 'react');
    setCount((value) => value + 1);
    setActiveStep(1);
    onTrace('React: 컴포넌트 함수를 다시 호출할 render 예약', 'react');
  };

  return (
    <div className="demo-card">
      <h4>React render and commit</h4>
      <p className="metric">count = {count}</p>
      <div className="flow">
        {['Trigger: setCount 호출', 'Render: 컴포넌트 함수 재실행', 'Commit: 바뀐 DOM 반영'].map((label, index) => (
          <div className={activeStep === index ? 'flow-step is-active' : 'flow-step'} key={label}>
            {index + 1}. {label}
          </div>
        ))}
      </div>
      <button className="primary-btn" type="button" onClick={increment}>증가</button>
    </div>
  );
}
