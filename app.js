// 한국몰드 AI 오피스: 정해진 데이터로 움직이는 데모 (실제 AI 연동 없음)

const TEAMS = {
  sales: '영업·견적팀',
  design: '설계팀',
  machining: '가공팀',
  production: '사출·생산팀',
  quality: '품질팀',
  admin: '경영지원팀',
};

const STAFF = [
  {
    id: 'kim', name: '김견적', role: '영업·견적 담당', team: 'sales', color: '#3b82f6', hair: '#2b2118',
    greeting: '안녕하세요, 견적과 고객 문의를 맡고 있어요.',
    ask: '견적은 얼마나 걸려요?',
    tasks: ['A사 휴대폰 케이스 금형 견적 작성', '신규 고객 문의 메일 회신', 'B사 견적서 수정본 정리'],
    chatter: ['견적서 숫자 다시 확인 중…', '고객사 답장이 왔어요!'],
    replies: [
      [/견적|가격|비용|단가/, '금형 견적은 제품 3D 도면, 캐비티 수, 예상 생산 수량을 받으면 보통 2~3일 안에 드려요.'],
      [/납기|일정|언제/, '일반 사출 금형은 설계 승인 후 4~6주 정도예요. 정확한 일정은 경영지원팀 한지원 님과 맞춰 볼게요.'],
      [/고객|문의/, '오늘 들어온 신규 문의는 3건이고, 그중 1건은 견적 단계로 넘어갔어요.'],
    ],
  },
  {
    id: 'lee', name: '이설계', role: '금형 설계', team: 'design', color: '#8b5cf6', hair: '#3b2a1e',
    greeting: '안녕하세요, 3D 금형 설계를 담당해요.',
    ask: '설계는 어디까지 됐어요?',
    tasks: ['C사 커넥터 금형 3D 설계', '코어·캐비티 분할면 검토', '설계 변경 요청 반영'],
    chatter: ['분할면이 깔끔하게 나왔어요', '구배 각도 1° 추가!'],
    replies: [
      [/설계|도면|3d|캐드|cad|어디까지/i, '지금 C사 커넥터 금형을 설계하고 있어요. 고객 승인용 도면은 이번 주 안에 나갈 예정이에요.'],
      [/변경|수정/, '설계 변경은 변경 요청서로 받아서, 가공과 일정에 미치는 영향을 같이 정리해 드려요.'],
    ],
  },
  {
    id: 'park', name: '박해석', role: '유동 해석', team: 'design', color: '#a855f7', hair: '#1f1a17',
    greeting: '안녕하세요, 사출 유동 해석으로 불량을 미리 잡아요.',
    ask: '게이트 위치 해석 결과는요?',
    tasks: ['게이트 위치 유동 해석', '휨(변형) 시뮬레이션', '냉각 회로 최적화'],
    chatter: ['웰드라인 위치 확인 중', '냉각 시간 2초 단축 가능!'],
    replies: [
      [/해석|시뮬|유동|게이트/, '게이트를 제품 중앙 쪽으로 옮기면 웰드라인이 잘 안 보이는 면으로 빠져요. 결과는 설계팀에 공유했어요.'],
      [/불량|휨|변형|냉각/, '휨은 냉각 불균형이 주원인이라, 냉각 회로를 한 줄 더 넣는 방향으로 검토 중이에요.'],
    ],
  },
  {
    id: 'choi', name: '최가공', role: 'CNC 가공 계획', team: 'machining', color: '#f59e0b', hair: '#2a2420',
    greeting: '안녕하세요, CNC 가공 프로그램과 공정을 짜요.',
    ask: '장비는 몇 대 돌아가요?',
    tasks: ['코어 황삭 CAM 프로그램 작성', '공구 경로 충돌 점검', '가공 공정표 업데이트'],
    chatter: ['공구 경로 시뮬레이션 OK', '5축 가공 대기열 확인'],
    replies: [
      [/가공|cnc|cam|공구/i, '코어 황삭 프로그램을 짜고 있어요. 3번 장비가 비는 오후부터 가공에 들어가요.'],
      [/장비|기계|몇 대/, '현재 CNC 5대 중 4대가 가동 중이에요.'],
    ],
  },
  {
    id: 'jung', name: '정방전', role: '방전 가공', team: 'machining', color: '#f97316', hair: '#3a2b20',
    greeting: '안녕하세요, 정밀 방전(EDM) 가공을 맡고 있어요.',
    ask: '방전 가공은 왜 해요?',
    tasks: ['전극 설계 및 제작 지시', '리브 형상 방전 가공', '방전면 조도 확인'],
    chatter: ['전극 3개 준비 완료', '조도 Ra 0.4 달성'],
    replies: [
      [/방전|edm|전극|왜/i, '깊은 리브처럼 공구가 닿기 어려운 부분은 전극을 만들어 방전으로 가공해요. 지금 전극 2개째 작업 중이에요.'],
      [/조도|표면/, '방전면 조도는 Ra 0.4 수준으로 맞추고 있어요.'],
    ],
  },
  {
    id: 'kang', name: '강사출', role: '사출 시운전', team: 'production', color: '#10b981', hair: '#241c16',
    greeting: '안녕하세요, 완성된 금형으로 시사출(T1, T2)을 진행해요.',
    ask: '사출 조건은 어떻게 돼요?',
    tasks: ['D사 금형 T1 시사출', '사출 조건표 작성', '시사출 샘플 포장·발송'],
    chatter: ['T1 샘플 나왔어요!', '사출 압력 조정 중'],
    replies: [
      [/조건|온도|압력/, '현재 금형 온도 60℃, 사출 압력 85MPa 조건으로 잡고 있어요.'],
      [/사출|시운전|시사출|샘플|t1|t2/i, 'D사 금형 T1 시사출을 진행 중이에요. 샘플은 품질팀 측정 후 고객사로 보낼게요.'],
    ],
  },
  {
    id: 'yoon', name: '윤품질', role: '품질 검사', team: 'quality', color: '#ef4444', hair: '#1c1a19',
    greeting: '안녕하세요, 샘플 치수와 외관을 검사해요.',
    ask: '측정 결과는 어때요?',
    tasks: ['T1 샘플 3차원 측정', '검사 성적서 작성', '불량 원인 분석 보고'],
    chatter: ['공차 안에 들어왔어요', '측정 리포트 정리 중'],
    replies: [
      [/불량|문제/, '치수 1곳이 0.03mm 벗어나서 설계·가공팀과 수정 방향을 협의하고 있어요.'],
      [/품질|검사|측정|치수|결과/, 'T1 샘플을 3차원 측정기로 재고 있어요. 지금까지 32개 치수 중 31개가 공차 안이에요.'],
    ],
  },
  {
    id: 'han', name: '한지원', role: '일정·자재 관리', team: 'admin', color: '#14b8a6', hair: '#2e231b',
    greeting: '안녕하세요, 프로젝트 일정과 자재 발주를 챙겨요.',
    ask: '이번 주 납기는요?',
    tasks: ['금형강(NAK80) 발주', '주간 프로젝트 일정 회의 준비', '납기 현황표 업데이트'],
    chatter: ['자재 입고 확인했어요', '이번 주 납기 2건!'],
    replies: [
      [/일정|납기|스케줄/, '이번 주 납기는 2건이고 모두 일정대로 진행 중이에요.'],
      [/자재|발주|재고|강재/, '금형강 NAK80은 내일 오전 입고 예정이에요.'],
    ],
  },
];

const ZONES = [
  { id: 'sales', type: 'team' },
  { id: 'design', type: 'team' },
  { id: 'meeting', type: 'meeting', name: '회의실' },
  { id: 'machining', type: 'team' },
  { id: 'production', type: 'team' },
  { id: 'quality', type: 'team' },
  { id: 'admin', type: 'team' },
  { id: 'lounge', type: 'lounge', name: '휴게실' },
];

const STATUS = { working: '업무 중', meeting: '회의 중', break: '휴식 중' };
const MAX_AWAY = 3;
const TICK_MS = 1500;

const state = { selected: null, done: 0, chats: {} };

for (const s of STAFF) {
  Object.assign(s, { status: 'working', taskIndex: 0, progress: Math.floor(Math.random() * 70), away: 0 });
}
Object.assign(STAFF[3], { status: 'meeting', away: 8 });
Object.assign(STAFF[6], { status: 'break', away: 5 });

const $ = (sel, el = document) => el.querySelector(sel);
const byId = (id) => STAFF.find((s) => s.id === id);
const currentTask = (s) => s.tasks[s.taskIndex];
const rand = (n) => Math.floor(Math.random() * n);
const pick = (list) => list[rand(list.length)];
const timeText = (d = new Date()) => d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

function personSvg(s) {
  return `
    <g class="person">
      <rect x="44" y="40" width="32" height="28" rx="12" fill="${s.color}"/>
      <circle cx="60" cy="30" r="11" fill="var(--skin)"/>
      <path d="M49 29 A11 11 0 0 1 71 29 Q66 21 60 21 Q54 21 49 29Z" fill="${s.hair}"/>
    </g>`;
}

function avatarSvg(s) {
  return `<svg viewBox="40 14 40 40" aria-hidden="true">${personSvg(s)}</svg>`;
}

function deskSvg(s) {
  return `
    <svg viewBox="0 0 120 96" aria-hidden="true">
      <rect class="chair" x="42" y="34" width="36" height="34" rx="8"/>
      ${personSvg(s)}
      <rect class="monitor" x="80" y="38" width="28" height="21" rx="2"/>
      <rect class="screen" x="82" y="40" width="24" height="16" rx="1"/>
      <rect class="desk-top" x="6" y="60" width="108" height="30" rx="5"/>
      <rect class="monitor" x="92" y="58" width="4" height="4"/>
      <rect class="paper" x="16" y="66" width="18" height="13" rx="1"/>
      <rect class="mug" x="40" y="67" width="7" height="8" rx="2"/>
    </svg>`;
}

const MEETING_ART = `
  <svg class="room-art" viewBox="0 0 220 110" aria-hidden="true">
    <rect class="seat" x="40" y="8" width="24" height="18" rx="5"/>
    <rect class="seat" x="98" y="8" width="24" height="18" rx="5"/>
    <rect class="seat" x="156" y="8" width="24" height="18" rx="5"/>
    <rect class="seat" x="40" y="84" width="24" height="18" rx="5"/>
    <rect class="seat" x="98" y="84" width="24" height="18" rx="5"/>
    <rect class="seat" x="156" y="84" width="24" height="18" rx="5"/>
    <rect class="table" x="24" y="26" width="172" height="58" rx="29"/>
    <rect class="paper" x="70" y="44" width="22" height="16" rx="1"/>
    <rect class="paper" x="128" y="48" width="22" height="16" rx="1"/>
  </svg>`;

const LOUNGE_ART = `
  <svg class="room-art" viewBox="0 0 220 90" aria-hidden="true">
    <rect class="sofa" x="20" y="40" width="110" height="34" rx="10"/>
    <rect class="sofa" x="14" y="30" width="122" height="16" rx="8" opacity=".8"/>
    <rect class="coffee" x="156" y="22" width="30" height="52" rx="4"/>
    <rect class="screen" x="162" y="30" width="18" height="8" rx="1"/>
    <rect class="mug" x="166" y="54" width="10" height="10" rx="2"/>
    <rect class="pot" x="196" y="60" width="16" height="16" rx="3"/>
    <circle class="plant-leaf" cx="204" cy="50" r="12"/>
  </svg>`;

function renderFloor() {
  $('#floor').innerHTML = ZONES.map((z) => {
    if (z.type === 'team') {
      const members = STAFF.filter((s) => s.team === z.id);
      return `
        <section class="zone" data-zone="${z.id}">
          <h2 class="zone-title">${TEAMS[z.id]} <small>${members.length}명</small></h2>
          <div class="desks">${members.map(deskHtml).join('')}</div>
        </section>`;
    }
    return `
      <section class="zone" data-zone="${z.id}">
        <h2 class="zone-title">${z.name} <small data-count="${z.id}"></small></h2>
        ${z.type === 'meeting' ? MEETING_ART : LOUNGE_ART}
        <div class="occupants" data-room="${z.type === 'meeting' ? 'meeting' : 'break'}"></div>
      </section>`;
  }).join('');
}

function deskHtml(s) {
  return `
    <button type="button" class="desk" data-id="${s.id}" aria-label="${s.name}, ${s.role}">
      ${deskSvg(s)}
      <span class="away-tag"></span>
      <span class="nameplate"><span class="dot"></span><b>${s.name}</b></span>
      <span class="role">${s.role}</span>
      <span class="progress"><span></span></span>
    </button>`;
}

function renderDynamic() {
  for (const s of STAFF) {
    const desk = $(`.desk[data-id="${s.id}"]`);
    desk.dataset.status = s.status;
    desk.classList.toggle('selected', state.selected === s.id);
    $('.away-tag', desk).textContent = s.status === 'meeting' ? '회의실에 있어요' : '휴게실에 있어요';
    $('.progress span', desk).style.width = `${s.progress}%`;
  }

  for (const room of document.querySelectorAll('.occupants')) {
    const people = STAFF.filter((s) => s.status === room.dataset.room);
    const ids = people.map((s) => s.id).join(',');
    if (room.dataset.ids !== ids) {
      room.dataset.ids = ids;
      room.innerHTML = people.length
        ? people.map((s) => `<button type="button" class="chip" data-id="${s.id}">${avatarSvg(s)}${s.name}</button>`).join('')
        : '<span class="empty">비어 있어요</span>';
    }
    for (const chip of room.querySelectorAll('.chip')) {
      chip.classList.toggle('selected', chip.dataset.id === state.selected);
    }
    const zoneId = room.dataset.room === 'meeting' ? 'meeting' : 'lounge';
    $(`[data-count="${zoneId}"]`).textContent = `${people.length}명`;
  }

  const count = (st) => STAFF.filter((s) => s.status === st).length;
  $('#stat-working').textContent = count('working');
  $('#stat-meeting').textContent = count('meeting');
  $('#stat-break').textContent = count('break');
  $('#stat-done').textContent = state.done;
  $('#clock').textContent = timeText();

  updateDetail();
}

function renderEmptyDetail() {
  $('#detail').innerHTML = `
    <div class="placeholder">
      <b>직원을 눌러 보세요</b>
      책상이나 회의실·휴게실에 있는 AI 직원을 누르면<br>하는 일을 보고 대화할 수 있어요.
    </div>`;
}

function renderDetail(s) {
  $('#detail').innerHTML = `
    <div class="detail-head">
      ${avatarSvg(s)}
      <div>
        <h2>${s.name}</h2>
        <p>${s.role} · ${TEAMS[s.team]}</p>
      </div>
    </div>
    <dl class="facts">
      <div><dt>상태</dt><dd id="d-status"></dd></div>
      <div><dt>지금 하는 일</dt><dd id="d-task"></dd></div>
    </dl>
    <div class="progress big"><span id="d-progress"></span></div>
    <p class="pct" id="d-pct"></p>
    <h3>업무 목록</h3>
    <ul class="tasks" id="d-tasks"></ul>
    <h3>대화하기 <small>· 데모 응답</small></h3>
    <div class="chat" id="chat"></div>
    <div class="suggest">
      ${['지금 뭐 하세요?', s.ask].map((q) => `<button type="button" data-q="${q}">${q}</button>`).join('')}
    </div>
    <form class="chat-form" id="chat-form">
      <input name="q" autocomplete="off" placeholder="${s.name} 님에게 물어보기" aria-label="메시지">
      <button type="submit">보내기</button>
    </form>`;

  if (!state.chats[s.id]) state.chats[s.id] = [{ from: 'bot', text: s.greeting }];
  for (const m of state.chats[s.id]) appendMsg(m);
  updateDetail();
}

function updateDetail() {
  const s = byId(state.selected);
  if (!s || !$('#d-status')) return;
  $('#d-status').innerHTML = `<span class="dot ${s.status}"></span>${STATUS[s.status]}`;
  $('#d-task').textContent = currentTask(s);
  $('#d-progress').style.width = `${s.progress}%`;
  $('#d-pct').textContent = `진행률 ${Math.round(s.progress)}%`;
  $('#d-tasks').innerHTML = s.tasks.map((t, i) =>
    i === s.taskIndex ? `<li class="current">${t}<em>진행 중</em></li>` : `<li>${t}</li>`
  ).join('');
}

function appendMsg({ from, text }) {
  const chat = $('#chat');
  if (!chat) return null;
  const el = document.createElement('div');
  el.className = `msg ${from}`;
  el.textContent = text;
  chat.append(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}

function replyTo(s, text) {
  const hit = s.replies.find(([re]) => re.test(text));
  let answer;
  if (/안녕|반가|하이/.test(text)) answer = s.greeting;
  else if (hit) answer = hit[1];
  else if (/뭐|무슨|지금|하고/.test(text)) answer = `지금은 '${currentTask(s)}' 작업 중이에요. 진행률은 ${Math.round(s.progress)}%예요.`;
  else answer = `그 부분은 제가 바로 답하기 어려워요. 지금은 '${currentTask(s)}' 작업을 하고 있어요.`;
  if (s.status !== 'working') answer = `(${STATUS[s.status]}이라 짧게 답할게요) ${answer}`;
  return answer;
}

function ask(text) {
  const s = byId(state.selected);
  text = text.trim();
  if (!s || !text) return;
  const sentTo = s.id;
  const mine = { from: 'me', text };
  state.chats[s.id].push(mine);
  appendMsg(mine);

  const typing = appendMsg({ from: 'bot typing', text: '입력 중…' });
  setTimeout(() => {
    const msg = { from: 'bot', text: replyTo(s, text) };
    state.chats[sentTo].push(msg);
    if (state.selected === sentTo && typing && typing.isConnected) {
      typing.remove();
      appendMsg(msg);
    }
  }, 600 + rand(600));
}

function select(id) {
  state.selected = id;
  renderDetail(byId(id));
  renderDynamic();
  if (window.matchMedia('(max-width: 1100px)').matches) {
    $('#detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function log(text, s) {
  const li = document.createElement('li');
  li.innerHTML = `<time>${timeText()}</time><span class="swatch" style="background:${s.color}"></span><span></span>`;
  li.lastChild.textContent = text;
  const list = $('#log');
  list.prepend(li);
  while (list.children.length > 30) list.lastChild.remove();
}

function say(s) {
  const desk = $(`.desk[data-id="${s.id}"]`);
  if ($('.bubble', desk)) return;
  const bubble = document.createElement('span');
  bubble.className = 'bubble';
  bubble.textContent = pick(s.chatter);
  desk.prepend(bubble);
  setTimeout(() => bubble.remove(), 3000);
}

function goAway(s, status) {
  s.status = status;
  s.away = status === 'meeting' ? 10 + rand(10) : 5 + rand(6);
  log(status === 'meeting' ? `${s.name} 님이 회의실로 이동했어요.` : `${s.name} 님이 휴게실에서 커피를 마셔요.`, s);
}

function tick() {
  for (const s of STAFF) {
    if (s.status === 'working') {
      s.progress = Math.min(100, s.progress + 1 + Math.random() * 3);
      if (s.progress >= 100) {
        log(`${s.name} 님이 '${currentTask(s)}' 작업을 끝냈어요.`, s);
        state.done++;
        s.taskIndex = (s.taskIndex + 1) % s.tasks.length;
        s.progress = 0;
        continue;
      }
      const awayCount = STAFF.filter((x) => x.status !== 'working').length;
      const roll = Math.random();
      if (awayCount < MAX_AWAY && roll < 0.012) goAway(s, 'meeting');
      else if (awayCount < MAX_AWAY && roll < 0.024) goAway(s, 'break');
      else if (roll < 0.06) say(s);
    } else if (--s.away <= 0) {
      s.status = 'working';
      log(`${s.name} 님이 자리로 돌아왔어요.`, s);
    }
  }
  renderDynamic();
}

document.addEventListener('click', (e) => {
  const target = e.target.closest('.desk, .chip');
  if (target) return select(target.dataset.id);
  const suggestion = e.target.closest('[data-q]');
  if (suggestion) ask(suggestion.dataset.q);
});

document.addEventListener('submit', (e) => {
  if (e.target.id !== 'chat-form') return;
  e.preventDefault();
  const input = e.target.elements.q;
  ask(input.value);
  input.value = '';
  input.focus();
});

renderFloor();
renderEmptyDetail();
renderDynamic();
log('한국몰드 AI 오피스가 문을 열었어요.', { color: 'var(--accent)' });
setInterval(tick, TICK_MS);
