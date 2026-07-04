import { useEffect, useRef } from 'react';

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const highlightCode = (code, terms = []) => {
  let html = escapeHtml(code);

  terms
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const escapedTerm = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(escapedTerm, 'g'), `<mark>${escapeHtml(term)}</mark>`);
    });

  return html;
};

const projectTree = [
  { name: 'index.html', path: 'index.html' },
  { name: 'vite.config.js', path: 'vite.config.js' },
  {
    name: 'src',
    children: [
      { name: 'main.jsx', path: 'src/main.jsx' },
      { name: 'App.jsx', path: 'src/App.jsx' },
      { name: 'styles.css', path: 'src/styles.css' },
      {
        name: 'components',
        children: [
          { name: 'CodeViewer.jsx', path: 'src/components/CodeViewer.jsx' },
          { name: 'HowBuilt.jsx', path: 'src/components/HowBuilt.jsx' },
          { name: 'RenderTrace.jsx', path: 'src/components/RenderTrace.jsx' },
          { name: 'Sidebar.jsx', path: 'src/components/Sidebar.jsx' },
          { name: 'SplitLab.jsx', path: 'src/components/SplitLab.jsx' },
        ],
      },
      {
        name: 'data',
        children: [
          { name: 'chapters.js', path: 'src/data/chapters.js' },
          { name: 'sourceFiles.js', path: 'src/data/sourceFiles.js' },
        ],
      },
      {
        name: 'examples',
        children: [
          {
            name: 'vanilla',
            children: [
              { name: 'basicDom.js', path: 'src/examples/vanilla/basicDom.js' },
              { name: 'manualRender.js', path: 'src/examples/vanilla/manualRender.js' },
              { name: 'profileCards.js', path: 'src/examples/vanilla/profileCards.js' },
              { name: 'renderFlow.js', path: 'src/examples/vanilla/renderFlow.js' },
              { name: 'snapshot.js', path: 'src/examples/vanilla/snapshot.js' },
              { name: 'courseCart.js', path: 'src/examples/vanilla/courseCart.js' },
              { name: 'dataFlow.js', path: 'src/examples/vanilla/dataFlow.js' },
              { name: 'effectStorage.js', path: 'src/examples/vanilla/effectStorage.js' },
              { name: 'buildTools.js', path: 'src/examples/vanilla/buildTools.js' },
              { name: 'miniProject.js', path: 'src/examples/vanilla/miniProject.js' },
            ],
          },
          {
            name: 'react',
            children: [
              { name: 'BasicDomReact.jsx', path: 'src/examples/react/BasicDomReact.jsx' },
              { name: 'ManualRenderReact.jsx', path: 'src/examples/react/ManualRenderReact.jsx' },
              { name: 'ProfileCardsReact.jsx', path: 'src/examples/react/ProfileCardsReact.jsx' },
              { name: 'RenderFlowReact.jsx', path: 'src/examples/react/RenderFlowReact.jsx' },
              { name: 'SnapshotReact.jsx', path: 'src/examples/react/SnapshotReact.jsx' },
              { name: 'CourseCartReact.jsx', path: 'src/examples/react/CourseCartReact.jsx' },
              { name: 'DataFlowReact.jsx', path: 'src/examples/react/DataFlowReact.jsx' },
              { name: 'EffectStorageReact.jsx', path: 'src/examples/react/EffectStorageReact.jsx' },
              { name: 'BuildToolsReact.jsx', path: 'src/examples/react/BuildToolsReact.jsx' },
              { name: 'MiniProjectReact.jsx', path: 'src/examples/react/MiniProjectReact.jsx' },
            ],
          },
        ],
      },
    ],
  },
];

const renderProjectTree = (nodes, activePath, activeTreeItemRef, depth = 0) => (
  <ul className={depth === 0 ? 'project-tree' : 'project-tree nested'}>
    {nodes.map((node) => {
      const isActive = node.path === activePath;

      return (
        <li
          className={node.children ? 'project-tree-node is-folder' : 'project-tree-node'}
          key={node.path ?? node.name}
        >
          <span
            className={isActive ? 'project-tree-label is-active' : 'project-tree-label'}
            ref={isActive ? activeTreeItemRef : null}
            style={{ '--tree-depth': depth }}
          >
            <span className="tree-icon" aria-hidden="true">{node.children ? '▸' : '•'}</span>
            <span>{node.name}</span>
          </span>
          {node.children ? renderProjectTree(node.children, activePath, activeTreeItemRef, depth + 1) : null}
        </li>
      );
    })}
  </ul>
);

export default function CodeViewer({ files, activeFile, onSelectFile }) {
  const activePath = activeFile.path ?? activeFile.label;
  const activeTreeItemRef = useRef(null);

  useEffect(() => {
    activeTreeItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activePath]);

  return (
    <>
      <div className="code-header">
        <div>
          <p className="eyebrow">Actual source</p>
          <h2>코드 뷰어</h2>
        </div>

        <div className="code-tabs" role="tablist" aria-label="소스 파일">
          {files.map((file) => (
            <button
              className={file.id === activeFile.id ? 'is-active' : ''}
              key={file.id}
              type="button"
              onClick={() => onSelectFile(file.id)}
            >
              {file.label}
            </button>
          ))}
        </div>

        {activeFile.focus?.length > 0 && (
          <div className="code-focus" aria-label="주목할 코드">
            {activeFile.focus.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
        )}

        <section className="project-location" aria-label="현재 파일의 프로젝트 위치">
          <div className="project-location-header">
            <strong>Project tree</strong>
            <code>{activePath}</code>
          </div>
          <div className="project-tree-scroll">
            {renderProjectTree(projectTree, activePath, activeTreeItemRef)}
          </div>
        </section>
      </div>

      <pre className="code-view" aria-label={`${activeFile.label} 소스 코드`}>
        <code
          dangerouslySetInnerHTML={{
            __html: highlightCode(activeFile.content.trim(), activeFile.focus),
          }}
        />
      </pre>
    </>
  );
}
