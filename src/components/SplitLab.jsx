import { useEffect, useRef } from 'react';

export default function SplitLab({ chapter, onTrace }) {
  const vanillaRootRef = useRef(null);
  const ReactDemo = chapter.ReactDemo;

  useEffect(() => {
    if (!vanillaRootRef.current) {
      return undefined;
    }

    vanillaRootRef.current.innerHTML = '';
    return chapter.mountVanilla(vanillaRootRef.current, onTrace);
  }, [chapter, onTrace]);

  return (
    <section className="split-lab" aria-label={`${chapter.title} 비교 실습`}>
      <div className="split-grid">
        <article className="lab-panel">
          <div className="panel-heading">
            <h3>Plain HTML/CSS/JS</h3>
            <span className="badge vanilla">manual DOM</span>
          </div>
          <div className="lab-body" ref={vanillaRootRef} />
        </article>

        <article className="lab-panel">
          <div className="panel-heading">
            <h3>React</h3>
            <span className="badge react">component + state</span>
          </div>
          <div className="lab-body">
            <ReactDemo onTrace={onTrace} />
          </div>
        </article>
      </div>
    </section>
  );
}
