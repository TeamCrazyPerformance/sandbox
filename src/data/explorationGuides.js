export const explorationGuides = {
  basics: {
    title: 'DOM을 직접 바꾸는 흐름을 추적하기',
    prompts: [
      '버튼을 누르기 전 HTML에 이미 존재하는 부분과, JS가 나중에 바꾸는 부분을 구분해 보세요.',
      'Vanilla 코드에서 querySelector, addEventListener, textContent가 각각 어떤 역할을 하는지 짚어 보세요.',
      'React 예제에서는 DOM을 직접 찾지 않는데도 화면 문구가 바뀝니다. 그 기준이 되는 state가 어디인지 찾아보세요.',
    ],
  },
  'manual-render': {
    title: '수동 렌더링이 복잡해지는 지점 찾기',
    prompts: [
      'Vanilla 예제에서 데이터 배열을 바꾸는 코드와 DOM을 다시 그리는 코드가 어디에 흩어져 있는지 찾아보세요.',
      'render()를 다시 호출할 때 이벤트 리스너도 다시 연결되는 이유를 설명해 보세요.',
      'React 예제에서는 todos state만 바뀌는데 목록과 완료 개수가 함께 바뀝니다. 어떤 코드가 화면을 계산하는지 확인해 보세요.',
    ],
  },
  'mental-model': {
    title: '컴포넌트로 이름 붙이는 효과 보기',
    prompts: [
      'Vanilla 예제에서 카드 하나를 만들기 위해 createElement와 append가 몇 번 필요한지 세어 보세요.',
      'React 예제에서 ProfileCard 컴포넌트가 받는 입력값 props가 무엇인지 찾아보세요.',
      '반복되는 UI를 함수로 분리했을 때 코드가 어떤 단위로 읽히는지 비교해 보세요.',
    ],
  },
  'render-flow': {
    title: 'Trigger, Render, Commit 순서 따라가기',
    prompts: [
      '버튼 클릭이 발생했을 때 trace 로그가 어떤 순서로 쌓이는지 확인해 보세요.',
      'Vanilla 예제는 innerHTML을 다시 넣고, React 예제는 setCount로 render를 예약합니다. 두 방식의 차이를 말로 정리해 보세요.',
      'React가 컴포넌트 함수를 다시 호출한다는 말이 실제 코드에서는 어디에 해당하는지 찾아보세요.',
    ],
  },
  snapshot: {
    title: 'state snapshot과 update queue 실험하기',
    prompts: [
      'count + 1을 세 번 누르는 버튼과 함수형 업데이트 버튼의 결과를 누르기 전에 먼저 예측해 보세요.',
      '같은 이벤트 핸들러 안에서 count 값이 왜 즉시 세 번 바뀌지 않는지 trace와 코드를 함께 보세요.',
      'setCount(value => value + 1) 형태가 이전 업데이트 결과를 이어받는다는 점을 설명해 보세요.',
    ],
  },
  'course-cart': {
    title: '조건부 렌더링과 key의 필요성 보기',
    prompts: [
      '마감 과목은 왜 버튼이 비활성화되는지 Vanilla와 React 코드에서 각각 찾아보세요.',
      '선택 학점은 저장된 값인지, courses와 selectedIds로부터 계산된 값인지 확인해 보세요.',
      'React 목록에서 key={course.id}가 빠지면 어떤 문제가 생길지 토론해 보세요.',
    ],
  },
  'data-flow': {
    title: 'state를 어디에 둘지 판단하기',
    prompts: [
      '개별 버튼 state와 공유 버튼 state가 서로 다른 위치에 있어야 하는 이유를 생각해 보세요.',
      'React 예제에서 자식 CounterButton은 state를 직접 갖지 않습니다. 대신 어떤 props를 받는지 확인해 보세요.',
      '자식에서 클릭이 일어났는데 부모 state가 바뀌는 흐름을 props down, events up으로 설명해 보세요.',
    ],
  },
  'effect-storage': {
    title: 'effect가 필요한 순간 구분하기',
    prompts: [
      '완료 개수처럼 state에서 바로 계산할 수 있는 값과, localStorage처럼 외부에 저장해야 하는 일을 구분해 보세요.',
      'React 예제에서 useEffect가 언제 실행되는지 항목 추가/삭제 후 trace로 확인해 보세요.',
      'localStorage 저장 코드를 render 안에 직접 넣으면 어떤 문제가 생길지 생각해 보세요.',
    ],
  },
  'build-tools': {
    title: '브라우저가 읽는 파일과 개발자가 쓰는 파일 구분하기',
    prompts: [
      'HTML 파일을 직접 여는 방식과 Vite 개발 서버를 통해 여는 방식의 차이를 정리해 보세요.',
      'package.json, node_modules, npm run dev, npm run build가 각각 어느 시점에 필요한지 연결해 보세요.',
      '오른쪽 코드 뷰어의 프로젝트 트리에서 index.html과 src/main.jsx가 앱 시작 흐름에서 어디에 있는지 확인해 보세요.',
    ],
  },
  'mini-project': {
    title: 'Vanilla 구현을 React 구현으로 옮기는 기준 세우기',
    prompts: [
      '항목 추가, 완료 토글, 삭제, 저장 기능이 Vanilla 코드에서는 각각 어디에 흩어져 있는지 찾아보세요.',
      'React 예제에서 tasks state 하나가 목록, 완료 개수, 조건부 스타일을 어떻게 동시에 결정하는지 확인해 보세요.',
      '이 예제를 확장한다면 필터, 검색, 정렬 state를 어디에 둘지 설계해 보세요.',
    ],
  },
  built: {
    title: '이 교보재 앱의 시작 경로 이해하기',
    prompts: [
      '브라우저가 처음 읽는 index.html에는 왜 전체 화면이 아니라 root div만 있는지 확인해 보세요.',
      'src/main.jsx의 createRoot(...).render(<App />)가 React 앱의 시작점이라는 점을 코드 뷰어에서 확인해 보세요.',
      '프로젝트 트리에서 App.jsx, components, data, examples가 각각 어떤 책임을 갖는지 연결해 보세요.',
    ],
  },
};
