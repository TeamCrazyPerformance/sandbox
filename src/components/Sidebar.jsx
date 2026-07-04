export default function Sidebar({ chapters, activeChapterId, onSelectChapter }) {
  return (
    <nav className="sidebar" aria-label="React 수업 목차">
      <div className="brand">
        <span className="brand-mark">R</span>
        <div>
          <h2>React Lab</h2>
          <p>HTML/CSS/JS를 배운 직후 보는 React 실습 교보재</p>
        </div>
      </div>

      <div className="chapter-list">
        {chapters.map((chapter, index) => (
          <button
            className={chapter.id === activeChapterId ? 'chapter-button is-active' : 'chapter-button'}
            key={chapter.id}
            type="button"
            onClick={() => onSelectChapter(chapter.id)}
          >
            <strong>{index + 1}. {chapter.shortTitle}</strong>
            <p>{chapter.navHint}</p>
          </button>
        ))}
      </div>
    </nav>
  );
}
