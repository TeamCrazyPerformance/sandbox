import { useMemo, useState } from 'react';

const courses = [
  { id: 'web', title: '웹프로그래밍', credit: 3, closed: false },
  { id: 'algo', title: '알고리즘', credit: 3, closed: true },
  { id: 'db', title: '데이터베이스', credit: 3, closed: false },
  { id: 'ai', title: 'AI 기초', credit: 2, closed: false },
];

export default function CourseCartReact({ onTrace }) {
  const [selectedIds, setSelectedIds] = useState(['web']);

  const totalCredits = useMemo(() => (
    courses
      .filter((course) => selectedIds.includes(course.id))
      .reduce((sum, course) => sum + course.credit, 0)
  ), [selectedIds]);

  const toggleCourse = (id) => {
    setSelectedIds((current) => (
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    ));
    onTrace('React: 조건부 렌더링과 key가 있는 map으로 목록 갱신', 'react');
  };

  return (
    <div className="demo-card">
      <h4>조건과 목록을 JSX로 표현하기</h4>
      <p className="metric">선택 학점: {totalCredits}</p>
      <ul className="course-list">
        {courses.map((course) => {
          const selected = selectedIds.includes(course.id);
          return (
            <li className="course-item" key={course.id}>
              <span>
                <strong>{course.title}</strong>
                <span className="course-meta">
                  {course.credit}학점 · {' '}
                  {course.closed ? <span className="closed">마감</span> : <span className="open">신청 가능</span>}
                </span>
              </span>
              <button
                className="secondary-btn"
                disabled={course.closed}
                type="button"
                onClick={() => toggleCourse(course.id)}
              >
                {selected ? '빼기' : '담기'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
