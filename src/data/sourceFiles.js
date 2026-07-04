import indexHtml from '../../index.html?raw';
import appJsx from '../App.jsx?raw';
import mainJsx from '../main.jsx?raw';
import basicVanilla from '../examples/vanilla/basicDom.js?raw';
import buildVanilla from '../examples/vanilla/buildTools.js?raw';
import courseVanilla from '../examples/vanilla/courseCart.js?raw';
import dataFlowVanilla from '../examples/vanilla/dataFlow.js?raw';
import effectVanilla from '../examples/vanilla/effectStorage.js?raw';
import manualVanilla from '../examples/vanilla/manualRender.js?raw';
import miniVanilla from '../examples/vanilla/miniProject.js?raw';
import profileVanilla from '../examples/vanilla/profileCards.js?raw';
import renderFlowVanilla from '../examples/vanilla/renderFlow.js?raw';
import snapshotVanilla from '../examples/vanilla/snapshot.js?raw';
import basicReact from '../examples/react/BasicDomReact.jsx?raw';
import buildReact from '../examples/react/BuildToolsReact.jsx?raw';
import courseReact from '../examples/react/CourseCartReact.jsx?raw';
import dataFlowReact from '../examples/react/DataFlowReact.jsx?raw';
import effectReact from '../examples/react/EffectStorageReact.jsx?raw';
import manualReact from '../examples/react/ManualRenderReact.jsx?raw';
import miniReact from '../examples/react/MiniProjectReact.jsx?raw';
import profileReact from '../examples/react/ProfileCardsReact.jsx?raw';
import renderFlowReact from '../examples/react/RenderFlowReact.jsx?raw';
import snapshotReact from '../examples/react/SnapshotReact.jsx?raw';

const pair = (id, vanillaLabel, vanillaContent, reactLabel, reactContent, focus = []) => [
  {
    id: `${id}-vanilla`,
    label: vanillaLabel,
    path: `src/examples/${vanillaLabel}`,
    content: vanillaContent,
    focus: focus.filter((item) => item.side !== 'react').map((item) => item.term),
  },
  {
    id: `${id}-react`,
    label: reactLabel,
    path: `src/examples/${reactLabel}`,
    content: reactContent,
    focus: focus.filter((item) => item.side !== 'vanilla').map((item) => item.term),
  },
];

export const sourceFiles = {
  scaffold: [
    {
      id: 'index',
      label: 'index.html',
      path: 'index.html',
      content: indexHtml,
      focus: ['<div id="root"></div>', 'type="module"', '/src/main.jsx'],
    },
    {
      id: 'main',
      label: 'src/main.jsx',
      path: 'src/main.jsx',
      content: mainJsx,
      focus: ['createRoot', 'document.querySelector', '<App />'],
    },
    {
      id: 'app',
      label: 'src/App.jsx',
      path: 'src/App.jsx',
      content: appJsx,
      focus: ['useState', 'activeChapter', 'SplitLab', 'CodeViewer'],
    },
  ],
  basics: pair('basics', 'vanilla/basicDom.js', basicVanilla, 'react/BasicDomReact.jsx', basicReact, [
    { term: 'querySelector', side: 'vanilla' },
    { term: 'addEventListener', side: 'vanilla' },
    { term: 'textContent', side: 'vanilla' },
    { term: 'useState', side: 'react' },
    { term: 'setCount', side: 'react' },
  ]),
  'manual-render': pair('manual', 'vanilla/manualRender.js', manualVanilla, 'react/ManualRenderReact.jsx', manualReact, [
    { term: 'render()', side: 'vanilla' },
    { term: 'innerHTML', side: 'vanilla' },
    { term: 'setTodos', side: 'react' },
    { term: 'todos.map', side: 'react' },
  ]),
  'mental-model': pair('mental', 'vanilla/profileCards.js', profileVanilla, 'react/ProfileCardsReact.jsx', profileReact, [
    { term: 'document.createElement', side: 'vanilla' },
    { term: 'ProfileCard', side: 'react' },
    { term: 'student', side: 'react' },
  ]),
  'render-flow': pair('flow', 'vanilla/renderFlow.js', renderFlowVanilla, 'react/RenderFlowReact.jsx', renderFlowReact, [
    { term: 'count += 1', side: 'vanilla' },
    { term: 'setCount', side: 'react' },
    { term: 'useEffect', side: 'react' },
  ]),
  snapshot: pair('snapshot', 'vanilla/snapshot.js', snapshotVanilla, 'react/SnapshotReact.jsx', snapshotReact, [
    { term: 'count += 1', side: 'vanilla' },
    { term: 'setCount(count + 1)', side: 'react' },
    { term: 'setCount((value) => value + 1)', side: 'react' },
  ]),
  'course-cart': pair('course', 'vanilla/courseCart.js', courseVanilla, 'react/CourseCartReact.jsx', courseReact, [
    { term: 'courses.map', side: 'react' },
    { term: 'key={course.id}', side: 'react' },
    { term: 'disabled={course.closed}', side: 'react' },
  ]),
  'data-flow': pair('data', 'vanilla/dataFlow.js', dataFlowVanilla, 'react/DataFlowReact.jsx', dataFlowReact, [
    { term: 'shared += 1', side: 'vanilla' },
    { term: 'CounterButton', side: 'react' },
    { term: 'onIncrement', side: 'react' },
  ]),
  'effect-storage': pair('effect', 'vanilla/effectStorage.js', effectVanilla, 'react/EffectStorageReact.jsx', effectReact, [
    { term: 'localStorage.setItem', side: 'vanilla' },
    { term: 'useEffect', side: 'react' },
    { term: 'localStorage.setItem', side: 'react' },
  ]),
  'build-tools': pair('build', 'vanilla/buildTools.js', buildVanilla, 'react/BuildToolsReact.jsx', buildReact, [
    { term: 'index.html', side: 'vanilla' },
    { term: 'npm run dev', side: 'react' },
    { term: 'npm run build', side: 'react' },
  ]),
  'mini-project': pair('mini', 'vanilla/miniProject.js', miniVanilla, 'react/MiniProjectReact.jsx', miniReact, [
    { term: 'tasks', side: 'vanilla' },
    { term: 'setTasks', side: 'react' },
    { term: 'key={task.id}', side: 'react' },
    { term: 'localStorage', side: 'react' },
  ]),
};
