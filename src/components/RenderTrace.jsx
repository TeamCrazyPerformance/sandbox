export default function RenderTrace({ items }) {
  return (
    <section className="trace-panel" aria-label="실행 로그">
      <h3>Render / DOM / State Trace</h3>

      {items.length === 0 ? (
        <p className="empty-trace">
          실습 버튼을 누르면 state 변경, render, DOM 갱신 로그가 여기에 쌓입니다.
        </p>
      ) : (
        <ol className="trace-list">
          {items.map((item) => (
            <li className="trace-item" key={item.id}>
              <span className={`trace-dot ${item.kind}`} aria-hidden="true" />
              <span>{item.message}</span>
              <span className="trace-meta">{item.time}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
