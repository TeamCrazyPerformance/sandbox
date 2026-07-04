const students = [
  { id: 1, name: '민서', role: 'HTML 구조 담당', initial: '민' },
  { id: 2, name: '준호', role: 'CSS 표현 담당', initial: '준' },
  { id: 3, name: '서연', role: 'JS 동작 담당', initial: '서' },
];

export function mountProfileCards(root, onTrace) {
  const wrap = document.createElement('div');
  wrap.className = 'demo-card';

  const title = document.createElement('h4');
  title.textContent = '프로필 카드를 직접 조립하기';

  const grid = document.createElement('div');
  grid.className = 'profile-grid';

  students.forEach((student) => {
    const card = document.createElement('article');
    card.className = 'profile-card';

    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.textContent = student.initial;

    const name = document.createElement('strong');
    name.textContent = student.name;

    const role = document.createElement('span');
    role.className = 'course-meta';
    role.textContent = student.role;

    card.append(avatar, name, role);
    grid.append(card);
  });

  wrap.append(title, grid);
  root.append(wrap);
  onTrace('Vanilla: createElement와 append로 카드 DOM을 직접 조립', 'vanilla');

  return () => {
    root.innerHTML = '';
  };
}
