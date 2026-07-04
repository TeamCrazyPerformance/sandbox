const students = [
  { id: 1, name: '민서', role: 'HTML 구조 담당', initial: '민' },
  { id: 2, name: '준호', role: 'CSS 표현 담당', initial: '준' },
  { id: 3, name: '서연', role: 'JS 동작 담당', initial: '서' },
];

function ProfileCard({ student }) {
  return (
    <article className="profile-card">
      <span className="avatar">{student.initial}</span>
      <strong>{student.name}</strong>
      <span className="course-meta">{student.role}</span>
    </article>
  );
}

export default function ProfileCardsReact({ onTrace }) {
  return (
    <div className="demo-card">
      <h4>카드를 컴포넌트로 추출하기</h4>
      <p className="demo-hint">
        같은 UI 조각은 함수 컴포넌트로 이름을 붙여 재사용합니다.
      </p>
      <div className="profile-grid">
        {students.map((student) => (
          <ProfileCard key={student.id} student={student} />
        ))}
      </div>
      <button
        className="secondary-btn"
        type="button"
        onClick={() => onTrace('React: students.map으로 ProfileCard 컴포넌트 배열 생성', 'react')}
      >
        컴포넌트 흐름 확인
      </button>
    </div>
  );
}
