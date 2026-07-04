import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CodeViewer from './components/CodeViewer.jsx';
import ExplorationGuide from './components/ExplorationGuide.jsx';
import HowBuilt from './components/HowBuilt.jsx';
import RenderTrace from './components/RenderTrace.jsx';
import Sidebar from './components/Sidebar.jsx';
import SplitLab from './components/SplitLab.jsx';
import { chapters } from './data/chapters.js';
import { explorationGuides } from './data/explorationGuides.js';
import { sourceFiles } from './data/sourceFiles.js';

const MAX_TRACE_ITEMS = 8;
const DEFAULT_SOURCE_PANE_WIDTH = 360;
const MIN_SOURCE_PANE_WIDTH = 300;
const MAX_SOURCE_PANE_WIDTH = 820;
const MIN_LESSON_WIDTH = 460;
const SIDEBAR_WIDTH = 240;

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [viewMode, setViewMode] = useState('lab');
  const [activeFileId, setActiveFileId] = useState(null);
  const [traceItems, setTraceItems] = useState([]);
  const [sourcePaneWidth, setSourcePaneWidth] = useState(DEFAULT_SOURCE_PANE_WIDTH);
  const resizeStateRef = useRef(null);

  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0],
    [activeChapterId],
  );

  const files = viewMode === 'built' ? sourceFiles.scaffold : sourceFiles[activeChapter.id];
  const activeFile = files.find((file) => file.id === activeFileId) ?? files[0];
  const activeGuide = viewMode === 'built'
    ? explorationGuides.built
    : explorationGuides[activeChapter.id];

  const clampSourcePaneWidth = useCallback((width) => {
    const availableWidth = window.innerWidth - SIDEBAR_WIDTH - MIN_LESSON_WIDTH;
    const maxWidth = Math.max(
      MIN_SOURCE_PANE_WIDTH,
      Math.min(MAX_SOURCE_PANE_WIDTH, availableWidth),
    );

    return Math.min(Math.max(width, MIN_SOURCE_PANE_WIDTH), maxWidth);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) {
        return;
      }

      const deltaX = event.clientX - resizeStateRef.current.startX;
      setSourcePaneWidth(clampSourcePaneWidth(resizeStateRef.current.startWidth - deltaX));
    };

    const stopResize = () => {
      resizeStateRef.current = null;
      document.body.classList.remove('is-resizing-source-pane');
    };

    const handleWindowResize = () => {
      setSourcePaneWidth((width) => clampSourcePaneWidth(width));
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
    window.addEventListener('pointercancel', stopResize);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
      window.removeEventListener('pointercancel', stopResize);
      window.removeEventListener('resize', handleWindowResize);
      document.body.classList.remove('is-resizing-source-pane');
    };
  }, [clampSourcePaneWidth]);

  const startSourcePaneResize = (event) => {
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    resizeStateRef.current = {
      startX: event.clientX,
      startWidth: sourcePaneWidth,
    };
    document.body.classList.add('is-resizing-source-pane');
  };

  const nudgeSourcePaneWidth = (event) => {
    const step = event.shiftKey ? 80 : 24;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSourcePaneWidth((width) => clampSourcePaneWidth(width + step));
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSourcePaneWidth((width) => clampSourcePaneWidth(width - step));
    }
  };

  const addTrace = useCallback((message, kind = 'react') => {
    const time = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    setTraceItems((current) => [
      { id: crypto.randomUUID(), message, kind, time },
      ...current,
    ].slice(0, MAX_TRACE_ITEMS));
  }, []);

  const resetViewport = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  const handleChapterChange = (chapterId) => {
    setActiveChapterId(chapterId);
    setViewMode('lab');
    setActiveFileId(null);
    setTraceItems([]);
    resetViewport();
  };

  const handleModeChange = (mode) => {
    setViewMode(mode);
    setActiveFileId(null);
    setTraceItems([]);
    resetViewport();
  };

  return (
    <div
      className="app-shell"
      style={{ '--source-pane-width': `${sourcePaneWidth}px` }}
    >
      <Sidebar
        chapters={chapters}
        activeChapterId={activeChapter.id}
        onSelectChapter={handleChapterChange}
      />

      <main className="lesson-workspace">
        <header className="lesson-header">
          <div>
            <p className="eyebrow">HTML/CSS/JS 다음 단계</p>
            <h1>{viewMode === 'built' ? '이 페이지는 어떻게 만들어졌나' : activeChapter.title}</h1>
            <p>{viewMode === 'built' ? '브라우저가 index.html을 읽고 React 앱을 mount하는 실제 흐름을 이 교보재의 코드로 확인합니다.' : activeChapter.summary}</p>
          </div>

          <div className="mode-switch" aria-label="보기 방식">
            <button
              className={viewMode === 'lab' ? 'is-active' : ''}
              type="button"
              onClick={() => handleModeChange('lab')}
            >
              실습 비교
            </button>
            <button
              className={viewMode === 'built' ? 'is-active' : ''}
              type="button"
              onClick={() => handleModeChange('built')}
            >
              페이지 구조
            </button>
          </div>
        </header>

        <section className="concept-strip" aria-label="핵심 개념">
          {(viewMode === 'built' ? [
            'index.html은 진입점이다',
            'main.jsx가 React를 브라우저 DOM에 연결한다',
            'App.jsx 아래에 컴포넌트 트리가 만들어진다',
          ] : activeChapter.concepts).map((concept) => (
            <span key={concept}>{concept}</span>
          ))}
        </section>

        {viewMode === 'built' ? (
          <HowBuilt onTrace={addTrace} />
        ) : (
          <SplitLab chapter={activeChapter} onTrace={addTrace} />
        )}

        <ExplorationGuide guide={activeGuide} />

        <RenderTrace items={traceItems} />
      </main>

      <div
        aria-label="코드 뷰어 패널 크기 조절"
        aria-orientation="vertical"
        aria-valuemax={MAX_SOURCE_PANE_WIDTH}
        aria-valuemin={MIN_SOURCE_PANE_WIDTH}
        aria-valuenow={Math.round(sourcePaneWidth)}
        className="source-resizer"
        onKeyDown={nudgeSourcePaneWidth}
        onPointerDown={startSourcePaneResize}
        role="separator"
        tabIndex={0}
        title="드래그해서 코드 뷰어 폭 조절"
      />

      <aside className="source-pane">
        <CodeViewer
          files={files}
          activeFile={activeFile}
          onSelectFile={setActiveFileId}
        />
      </aside>
    </div>
  );
}
