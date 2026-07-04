const courses = [
  { id: 'web', title: '웹프로그래밍', credit: 3, closed: false },
  { id: 'algo', title: '알고리즘', credit: 3, closed: true },
  { id: 'db', title: '데이터베이스', credit: 3, closed: false },
  { id: 'ai', title: 'AI 기초', credit: 2, closed: false },
];

export function mountCourseCart(root, onTrace) {
  let selectedIds = ['web'];

  const render = () => {
    const selectedCourses = courses.filter((course) => selectedIds.includes(course.id));
    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credit, 0);

    root.innerHTML = `
      <div class="demo-card">
        <h4>조건문과 map을 직접 문자열로 만들기</h4>
        <p class="metric">선택 학점: ${totalCredits}</p>
        <ul class="course-list">
          ${courses.map((course) => {
            const selected = selectedIds.includes(course.id);
            const disabled = course.closed ? 'disabled' : '';
            return `
              <li class="course-item">
                <span>
                  <strong>${course.title}</strong>
                  <span class="course-meta">${course.credit}학점 · ${course.closed ? '<span class="closed">마감</span>' : '<span class="open">신청 가능</span>'}</span>
                </span>
                <button class="secondary-btn" data-id="${course.id}" ${disabled}>
                  ${selected ? '빼기' : '담기'}
                </button>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;

    root.querySelectorAll('[data-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        selectedIds = selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id];
        onTrace('Vanilla: 조건 문자열과 목록 DOM을 다시 생성', 'vanilla');
        render();
      });
    });
  };

  render();
  return () => {
    root.innerHTML = '';
  };
}
