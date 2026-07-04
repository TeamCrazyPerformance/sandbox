import BasicDomReact from '../examples/react/BasicDomReact.jsx';
import BuildToolsReact from '../examples/react/BuildToolsReact.jsx';
import CourseCartReact from '../examples/react/CourseCartReact.jsx';
import DataFlowReact from '../examples/react/DataFlowReact.jsx';
import EffectStorageReact from '../examples/react/EffectStorageReact.jsx';
import ManualRenderReact from '../examples/react/ManualRenderReact.jsx';
import MiniProjectReact from '../examples/react/MiniProjectReact.jsx';
import ProfileCardsReact from '../examples/react/ProfileCardsReact.jsx';
import RenderFlowReact from '../examples/react/RenderFlowReact.jsx';
import SnapshotReact from '../examples/react/SnapshotReact.jsx';
import { mountBasicDom } from '../examples/vanilla/basicDom.js';
import { mountBuildTools } from '../examples/vanilla/buildTools.js';
import { mountCourseCart } from '../examples/vanilla/courseCart.js';
import { mountDataFlow } from '../examples/vanilla/dataFlow.js';
import { mountEffectStorage } from '../examples/vanilla/effectStorage.js';
import { mountManualRender } from '../examples/vanilla/manualRender.js';
import { mountMiniProject } from '../examples/vanilla/miniProject.js';
import { mountProfileCards } from '../examples/vanilla/profileCards.js';
import { mountRenderFlow } from '../examples/vanilla/renderFlow.js';
import { mountSnapshot } from '../examples/vanilla/snapshot.js';

export const chapters = [
  {
    id: 'basics',
    shortTitle: '웹앱 재료 복습',
    navHint: 'DOM을 찾아 직접 바꾸기',
    title: '1. 웹앱의 기본 재료 복습',
    summary: 'HTML은 구조, CSS는 표현, JS는 동작, DOM은 브라우저가 만든 화면 객체라는 연결을 다시 확인합니다.',
    concepts: ['HTML = 구조', 'CSS = 표현', 'JS = 동작', 'DOM = 조작 가능한 화면 객체'],
    mountVanilla: mountBasicDom,
    ReactDemo: BasicDomReact,
  },
  {
    id: 'manual-render',
    shortTitle: 'Vanilla UI의 문제',
    navHint: '상태와 DOM 갱신 분리',
    title: '2. Vanilla JS로 UI를 만들 때 생기는 문제',
    summary: '상태값, DOM 갱신, 이벤트 연결, 조건부 UI, 목록 UI를 직접 관리할 때 코드가 어디로 흩어지는지 봅니다.',
    concepts: ['수동 render()', '이벤트 재연결', '상태와 DOM의 거리', 'innerHTML 재생성'],
    mountVanilla: mountManualRender,
    ReactDemo: ManualRenderReact,
  },
  {
    id: 'mental-model',
    shortTitle: 'React 첫 모델',
    navHint: '컴포넌트, JSX, props',
    title: '3. React의 첫 mental model',
    summary: '컴포넌트는 UI 조각을 반환하는 JavaScript 함수이고, JSX는 그 UI 구조를 JS 안에서 표현하는 문법입니다.',
    concepts: ['component = UI 함수', 'JSX = JS 안의 마크업', 'props = 입력값', '재사용 가능한 UI 조각'],
    mountVanilla: mountProfileCards,
    ReactDemo: ProfileCardsReact,
  },
  {
    id: 'render-flow',
    shortTitle: 'Render와 Commit',
    navHint: 'state 변경 후 화면 반영',
    title: '4. React는 어떻게 화면을 바꾸는가',
    summary: '상태 변경이 render를 트리거하고, React가 컴포넌트를 다시 호출한 뒤 바뀐 DOM만 commit하는 흐름을 시각화합니다.',
    concepts: ['Trigger', 'Render', 'Commit', 'DOM diff'],
    mountVanilla: mountRenderFlow,
    ReactDemo: RenderFlowReact,
  },
  {
    id: 'snapshot',
    shortTitle: 'State snapshot',
    navHint: 'setState는 즉시 대입이 아님',
    title: '5. 이벤트와 state snapshot',
    summary: 'setState는 기존 변수를 바로 바꾸는 대입문이 아니라 다음 render를 예약한다는 차이를 실습합니다.',
    concepts: ['state snapshot', 'update queue', '함수형 업데이트', '이벤트 핸들러의 현재 값'],
    mountVanilla: mountSnapshot,
    ReactDemo: SnapshotReact,
  },
  {
    id: 'course-cart',
    shortTitle: '조건과 목록',
    navHint: 'map, key, 조건부 렌더링',
    title: '6. 조건부 렌더링과 목록 렌더링',
    summary: '수강 신청 장바구니 예제로 if, 삼항 연산자, &&, map, key가 실제 UI에서 어떤 역할을 하는지 봅니다.',
    concepts: ['조건부 렌더링', 'Array.map()', 'key', '파생 값 계산'],
    mountVanilla: mountCourseCart,
    ReactDemo: CourseCartReact,
  },
  {
    id: 'data-flow',
    shortTitle: '데이터 흐름',
    navHint: '부모 state와 자식 props',
    title: '7. 데이터 흐름',
    summary: 'React의 데이터는 기본적으로 부모에서 자식으로 흐르고, 자식은 콜백으로 이벤트를 부모에게 알립니다.',
    concepts: ['props down', 'events up', 'state 끌어올리기', '공유 state'],
    mountVanilla: mountDataFlow,
    ReactDemo: DataFlowReact,
  },
  {
    id: 'effect-storage',
    shortTitle: 'Effect의 용도',
    navHint: 'localStorage 동기화',
    title: '8. Effect는 언제 쓰는가',
    summary: 'props/state로 계산 가능한 값에는 effect를 쓰지 않고, localStorage 같은 외부 시스템과 동기화할 때 사용합니다.',
    concepts: ['외부 시스템', 'useEffect', 'localStorage', '파생 값은 render에서 계산'],
    mountVanilla: mountEffectStorage,
    ReactDemo: EffectStorageReact,
  },
  {
    id: 'build-tools',
    shortTitle: '빌드 도구',
    navHint: 'npm, Vite, dist',
    title: '9. 빌드 도구와 개발 서버',
    summary: 'npm, package.json, node_modules, npm run dev, npm run build, dist가 React 개발 흐름에서 맡는 역할을 정리합니다.',
    concepts: ['package.json', 'node_modules', 'Vite dev server', 'dist build'],
    mountVanilla: mountBuildTools,
    ReactDemo: BuildToolsReact,
  },
  {
    id: 'mini-project',
    shortTitle: '최종 미니 프로젝트',
    navHint: '체크리스트 전환 실습',
    title: '10. 최종 미니 프로젝트',
    summary: '학습 체크리스트를 vanilla 버전에서 React 버전으로 전환하며 state, list, conditional UI, localStorage를 한 번에 복습합니다.',
    concepts: ['항목 추가/삭제', '완료 토글', '조건부 스타일', 'localStorage 저장'],
    mountVanilla: mountMiniProject,
    ReactDemo: MiniProjectReact,
  },
];
