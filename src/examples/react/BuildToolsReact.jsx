const steps = [
  'npm install: package.json의 의존성 설치',
  'npm run dev: Vite 개발 서버 실행',
  'src/main.jsx: 브라우저에 모듈로 제공',
  'npm run build: dist 폴더에 배포 파일 생성',
];

export default function BuildToolsReact({ onTrace }) {
  return (
    <div className="demo-card">
      <h4>Vite가 React 개발 경험을 만든다</h4>
      <p className="demo-hint">
        JSX 변환, 빠른 새로고침, 모듈 제공, production build를 빌드 도구가 맡습니다.
      </p>
      <div className="flow">
        {steps.map((step) => (
          <button
            className="flow-step"
            key={step}
            type="button"
            onClick={() => onTrace(`Build tool: ${step}`, 'system')}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
}
