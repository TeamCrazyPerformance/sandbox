const steps = [
  {
    title: 'index.html',
    text: '브라우저가 먼저 읽는 문서입니다. 화면 전체를 직접 쓰지 않고 #root 자리만 준비합니다.',
  },
  {
    title: 'src/main.jsx',
    text: 'React DOM의 createRoot가 #root를 붙잡고 App 컴포넌트를 렌더링합니다.',
  },
  {
    title: 'App.jsx',
    text: '현재 챕터, 코드 뷰어, split 실습, trace 로그를 state로 관리합니다.',
  },
  {
    title: 'examples/*',
    text: '같은 실습을 vanilla DOM 조작 코드와 React 컴포넌트 코드로 나란히 실행합니다.',
  },
];

export default function HowBuilt({ onTrace }) {
  return (
    <section className="how-built" aria-label="교보재 페이지 구조">
      <div>
        <p className="eyebrow">App bootstrap</p>
        <h3>{'index.html -> main.jsx -> React root -> component tree'}</h3>
        <p className="note">
          이 흐름은 대부분의 Vite React SPA가 시작되는 방식입니다. 오른쪽 코드 뷰어에서 실제 파일 내용을 확인할 수 있습니다.
        </p>
      </div>

      <div className="pipeline">
        {steps.map((step, index) => (
          <button
            className="pipeline-step"
            key={step.title}
            type="button"
            onClick={() => onTrace(`${step.title} 단계 확인`, 'system')}
          >
            <span className="step-number">{index + 1}</span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </button>
        ))}
      </div>

      <ul className="file-tree" aria-label="핵심 파일 구조">
        <li><strong>index.html</strong> - 브라우저 진입점과 root DOM</li>
        <li><strong>src/main.jsx</strong> - React 앱 mount 지점</li>
        <li><strong>src/App.jsx</strong> - 교보재 shell과 상태 관리</li>
        <li><strong>src/examples/vanilla</strong> - DOM API로 직접 만든 실습</li>
        <li><strong>src/examples/react</strong> - 같은 기능을 컴포넌트와 state로 만든 실습</li>
      </ul>
    </section>
  );
}
