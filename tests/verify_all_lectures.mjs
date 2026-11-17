import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

process.chdir(REPO_ROOT);

const PHASE1_FOLDER_PREFIX = /^(00_|00b_|L1_01_|L1_02_|L1_03_|L1_04_)/;

const BARE_OJ_PATTERNS = [
  /^https?:\/\/oj\.vnoi\.info\/?(problems?\/?)?$/i,
  /^https?:\/\/cses\.fi\/?(problemset\/?(list\/?)?)?$/i,
  /^https?:\/\/codeforces\.com\/?(problemset\/?|contests\/?)?$/i,
  /^https?:\/\/atcoder\.jp\/?(contests\/?|home\/?)?$/i,
  /^https?:\/\/leetcode\.com\/?(problemset\/?|problems\/?)?$/i
];

function normalizeDir(inputDir) {
  const rel = path.isAbsolute(inputDir)
    ? path.relative(REPO_ROOT, inputDir)
    : inputDir;
  return rel.replace(/^\.\//, '').replace(/\/+$/, '');
}

function parseArgs(argv) {
  let lessonDir = null;
  let strictOj = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--strict-oj') {
      strictOj = true;
    } else if (arg === '--lesson') {
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        throw new Error('Thiếu giá trị thư mục sau cờ --lesson (ví dụ: --lesson 01_DeQuy_Va_DeQuyDuoi)');
      }
      lessonDir = normalizeDir(next);
      i++;
    } else if (arg.startsWith('--lesson=')) {
      const val = arg.slice('--lesson='.length);
      if (!val) {
        throw new Error('Thiếu giá trị thư mục trong --lesson=<dir>');
      }
      lessonDir = normalizeDir(val);
    } else {
      throw new Error(`Tham số không hợp lệ: ${arg}. Cách dùng: node tests/verify_all_lectures.mjs [--lesson <dir>] [--strict-oj]`);
    }
  }

  return { lessonDir, strictOj };
}

function createSandbox() {
  const store = {};
  return {
    window: {},
    document: {
      documentElement: { setAttribute: () => {}, getAttribute: () => 'light' },
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    localStorage: {
      getItem: (k) => store[k] || null,
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    },
    navigator: { clipboard: { writeText: async () => {} } },
    console
  };
}

function runJsInSandbox(filePath, sandbox) {
  const code = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(code, sandbox, { filename: filePath });
}

function verifySharedInfrastructure() {
  console.log('--- RUNNING INFRASTRUCTURE & SHARED VERIFICATION ---');

  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  assert.match(gitignore, /user_progress\.json/, '.gitignore phải chứa user_progress.json');
  assert.equal(fs.existsSync('user_progress.json'), false, 'user_progress.json không được nằm sẵn trên repo');

  const sharedCss = fs.readFileSync('shared/styles.css', 'utf8');
  assert.match(sharedCss, /#F6F3EC/i, 'shared/styles.css phải có màu nền sáng #F6F3EC');
  assert.match(sharedCss, /\[data-theme="dark"\]/, 'shared/styles.css phải hỗ trợ [data-theme="dark"]');
  assert.match(sharedCss, /\.knowledge-card/, 'shared/styles.css phải có .knowledge-card');
  assert.match(sharedCss, /\.card-split/, 'shared/styles.css phải có .card-split 2 cột');
  assert.match(sharedCss, /\.debug-card/, 'shared/styles.css phải có .debug-card cho bài tập debug');
  assert.match(sharedCss, /\.step-life/, 'shared/styles.css phải có .step-life');
  assert.match(sharedCss, /\.step-code/, 'shared/styles.css phải có .step-code');
  assert.match(sharedCss, /\.step-term/, 'shared/styles.css phải có .step-term');
  assert.doesNotMatch(sharedCss, /violet|lavender|#8b5cf6|#a855f7/i, 'Không được dùng màu tím');

  const indexHtml = fs.readFileSync('index.html', 'utf8');
  assert.match(indexHtml, /id="skill-tree-svg"/, 'index.html phải có #skill-tree-svg cho cây kỹ năng');
  assert.match(indexHtml, /id="progress-summary"/, 'index.html phải có #progress-summary');
  assert.match(indexHtml, /shared\/styles\.css/, 'index.html phải nhúng shared/styles.css');
  assert.match(indexHtml, /shared\/portal-data\.js/, 'index.html phải nhúng shared/portal-data.js');

  const sandbox = createSandbox();
  vm.createContext(sandbox);

  runJsInSandbox('shared/icons.js', sandbox);
  assert.ok(sandbox.window.CP_ICONS, 'window.CP_ICONS phải được định nghĩa');
  assert.ok(sandbox.window.CP_ICONS.sun, 'CP_ICONS phải có sun');
  assert.ok(sandbox.window.CP_ICONS.bug, 'CP_ICONS phải có bug');
  assert.ok(sandbox.window.CP_ICONS.code, 'CP_ICONS phải có code');

  runJsInSandbox('shared/progress.js', sandbox);
  assert.ok(sandbox.window.CP_PROGRESS, 'window.CP_PROGRESS phải được định nghĩa');
  assert.equal(typeof sandbox.window.CP_PROGRESS.loadProgress, 'function');
  assert.equal(typeof sandbox.window.CP_PROGRESS.saveProgress, 'function');
  assert.equal(typeof sandbox.window.CP_PROGRESS.recordQuizAnswer, 'function');
  assert.equal(typeof sandbox.window.CP_PROGRESS.recordDebugSolved, 'function');

  runJsInSandbox('shared/highlighter.js', sandbox);
  assert.equal(typeof sandbox.window.highlightCpp, 'function');
  assert.equal(typeof sandbox.window.highlightInlineCodeSnippet, 'function');

  runJsInSandbox('shared/portal-data.js', sandbox);
  const portalData = sandbox.window.PORTAL_DATA;
  assert.ok(portalData, 'window.PORTAL_DATA phải được định nghĩa');
  assert.ok(Array.isArray(portalData.nodes), 'PORTAL_DATA.nodes phải là mảng');
  assert.ok(Array.isArray(portalData.edges), 'PORTAL_DATA.edges phải là mảng');

  runJsInSandbox('shared/lecture-engine.js', sandbox);
  assert.equal(typeof sandbox.window.initLecturePage, 'function');

  return portalData;
}

function verifySkillWorkflow() {
  console.log('--- VERIFYING CP-LECTURE-WORKFLOW SKILL ---');
  const skillPath = '.agents/skills/cp-lecture-workflow/SKILL.md';
  assert.ok(fs.existsSync(skillPath), 'Phải có file .agents/skills/cp-lecture-workflow/SKILL.md');
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  assert.match(skillContent, /name:\s*cp-lecture-workflow/, 'SKILL.md phải có name: cp-lecture-workflow');
  assert.match(skillContent, /Problem Decomposition|Tách vấn đề/i, 'SKILL.md phải mô tả tách vấn đề nhỏ');
  assert.match(skillContent, /Đời sống.*Lập trình.*Thuật ngữ|Life-to-Code/i, 'SKILL.md phải mô tả quy trình 3 bước sư phạm');
  assert.match(skillContent, /debugExercises|Bài tập Debug/i, 'SKILL.md phải có chuẩn bài tập debug');
  assert.match(skillContent, /Trace|Code Execution Tracing/i, 'SKILL.md phải có chuẩn câu hỏi trace code');
  assert.match(skillContent, /shared\/portal-data\.js/, 'SKILL.md phải hướng dẫn cập nhật portal-data.js');
  assert.match(skillContent, /tests\/verify_all_lectures\.mjs/, 'SKILL.md phải hướng dẫn chạy test kiểm định');
}

function verifyPortalDag(portalData) {
  console.log('--- VERIFYING PORTAL_DATA DAG INTEGRITY ---');
  const { nodes, edges } = portalData;
  assert.ok(nodes.length > 0, 'PORTAL_DATA.nodes không được rỗng');

  const nodeById = new Map();
  for (const node of nodes) {
    assert.ok(typeof node.id === 'string' && node.id.trim().length > 0, 'Mỗi node phải có id hợp lệ');
    assert.equal(nodeById.has(node.id), false, `Trùng lặp node.id trong PORTAL_DATA: ${node.id}`);
    nodeById.set(node.id, node);

    assert.ok(typeof node.path === 'string' && node.path.endsWith('/index.html'), `Node ${node.id} phải có path dạng <dir>/index.html`);

    if (node.status !== undefined) {
      assert.ok(['ready', 'planned'].includes(node.status), `Node ${node.id} có status không hợp lệ: ${node.status}`);
    }

    const status = node.status || 'ready';
    if (status !== 'planned') {
      assert.ok(fs.existsSync(node.path), `Node ${node.id} (status=${status}) thiếu file ${node.path}`);
    }
  }

  // Kiểm tra MayCham tồn tại & khoảng cách DAG nhap_mon_cpp -> may_cham
  const nhapMon = nodeById.get('nhap_mon_cpp');
  const mayCham = nodeById.get('may_cham');
  assert.ok(nhapMon, 'PORTAL_DATA phải chứa node nhap_mon_cpp');
  assert.ok(mayCham, 'PORTAL_DATA phải chứa node may_cham (MayCham)');
  assert.equal(typeof nhapMon.x, 'number', 'nhap_mon_cpp phải có tọa độ x kiểu number');
  assert.equal(typeof mayCham.x, 'number', 'may_cham phải có tọa độ x kiểu number');
  assert.ok(
    nhapMon.x - 90 >= 0,
    `nhap_mon_cpp bị tràn mép trái SVG: x - 90 = ${nhapMon.x - 90} (yêu cầu >= 0)`
  );
  const gap = (mayCham.x - 90) - (nhapMon.x + 90);
  assert.ok(
    gap >= 60,
    `Khoảng cách DAG giữa nhap_mon_cpp và may_cham quá hẹp: ${gap}px (yêu cầu >= 60px)`
  );

  // Kiểm tra các cạnh & phát hiện chu trình bằng thuật toán Kahn
  const inDegree = new Map();
  const adj = new Map();
  for (const id of nodeById.keys()) {
    inDegree.set(id, 0);
    adj.set(id, []);
  }

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    assert.ok(nodeById.has(edge.from), `Edge #${i + 1} tham chiếu node nguồn không tồn tại: from="${edge.from}"`);
    assert.ok(nodeById.has(edge.to), `Edge #${i + 1} tham chiếu node đích không tồn tại: to="${edge.to}"`);
    assert.notEqual(edge.from, edge.to, `Edge #${i + 1} tạo self-loop tại node "${edge.from}"`);
    adj.get(edge.from).push(edge.to);
    inDegree.set(edge.to, inDegree.get(edge.to) + 1);
  }

  const queue = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  let visited = 0;
  while (queue.length > 0) {
    const cur = queue.shift();
    visited++;
    for (const next of adj.get(cur)) {
      const nextDeg = inDegree.get(next) - 1;
      inDegree.set(next, nextDeg);
      if (nextDeg === 0) queue.push(next);
    }
  }

  if (visited !== nodes.length) {
    const cycleNodes = [...inDegree.entries()].filter(([, deg]) => deg > 0).map(([id]) => id);
    assert.fail(`PORTAL_DATA chứa chu trình trong DAG liên quan đến các node: ${cycleNodes.join(', ')}`);
  }

  console.log(`[PASS] DAG hợp lệ: ${nodes.length} nodes, ${edges.length} edges, 0 chu trình.`);
}

function isPhase1Lesson(dir, portalNode) {
  const baseName = path.basename(dir);
  return PHASE1_FOLDER_PREFIX.test(baseName) || (portalNode && portalNode.phase === 'pha1_array');
}

function isBareHomepageUrl(link) {
  if (typeof link !== 'string' || !link.startsWith('https://') || /\s/.test(link)) {
    return true;
  }
  try {
    const parsed = new URL(link);
    if (parsed.pathname === '' || parsed.pathname === '/') {
      return true;
    }
    const cleanUrl = `${parsed.origin}${parsed.pathname}`;
    return BARE_OJ_PATTERNS.some((re) => re.test(cleanUrl));
  } catch {
    return true;
  }
}

function checkLessonFiles(dir, errors) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    errors.push(`Không tìm thấy thư mục bài giảng: ${dir}`);
    return { cppFiles: [], hasLessonData: false };
  }

  const docsDir = path.join(dir, 'docs');
  const mdFiles = fs.existsSync(docsDir)
    ? fs.readdirSync(docsDir).filter((f) => f.endsWith('.md')).sort()
    : [];
  if (mdFiles.length === 0) {
    errors.push(`Thiếu file tài liệu markdown trong ${docsDir}/*.md`);
  }

  const codeDir = path.join(dir, 'Code_Mau');
  const cppFiles = fs.existsSync(codeDir)
    ? fs.readdirSync(codeDir).filter((f) => f.endsWith('.cpp')).sort().map((f) => path.join(codeDir, f))
    : [];
  if (cppFiles.length < 3) {
    errors.push(`Thiếu code mẫu C++: ${codeDir} chỉ có ${cppFiles.length} file .cpp (yêu cầu >= 3)`);
  }

  const htmlPath = path.join(dir, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    errors.push(`Thiếu file ${htmlPath}`);
  } else {
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (!html.includes('shared/lecture-engine.js')) {
      errors.push(`${htmlPath} chưa nhúng shared/lecture-engine.js`);
    }
    if (!html.includes('lesson-data.js')) {
      errors.push(`${htmlPath} chưa nhúng lesson-data.js`);
    }
  }

  const dataPath = path.join(dir, 'lesson-data.js');
  const hasLessonData = fs.existsSync(dataPath);
  if (!hasLessonData) {
    errors.push(`Thiếu file ${dataPath}`);
  }

  return { cppFiles, hasLessonData };
}

function checkCppStandardAndPhase1(dir, cppFiles, phase1, lessonDataRaw, errors) {
  const requireFastIo = path.basename(dir) !== '00_NhapMon_LapTrinh_CPP';

  for (const cppPath of cppFiles) {
    const src = fs.readFileSync(cppPath, 'utf8');
    if (!/#include\s*<bits\/stdc\+\+\.h>/.test(src)) {
      errors.push(`${cppPath}: thiếu chuẩn CP "#include <bits/stdc++.h>"`);
    }
    if (!/using\s+namespace\s+std\s*;/.test(src)) {
      errors.push(`${cppPath}: thiếu "using namespace std;"`);
    }
    if (requireFastIo && !/sync_with_stdio\s*\(\s*false\s*\)/.test(src)) {
      errors.push(`${cppPath}: thiếu Fast I/O "sync_with_stdio(false)"`);
    }
    if (phase1) {
      if (/\bvector\s*</.test(src)) {
        errors.push(`${cppPath}: vi phạm ranh giới Pha 1 Lớp 9 (không được dùng "vector<")`);
      }
      if (/call\s+stack/i.test(src)) {
        errors.push(`${cppPath}: vi phạm ranh giới Pha 1 Lớp 9 (không được dùng thuật ngữ "Call Stack")`);
      }
    }
  }

  if (phase1 && lessonDataRaw !== null) {
    if (/\bvector\s*<(?!\/|br\s*\/?>)/.test(lessonDataRaw)) {
      errors.push(`${dir}/lesson-data.js: vi phạm ranh giới Pha 1 Lớp 9 (không được dùng "vector<")`);
    }
    if (/call\s+stack/i.test(lessonDataRaw)) {
      errors.push(`${dir}/lesson-data.js: vi phạm ranh giới Pha 1 Lớp 9 (không được dùng thuật ngữ "Call Stack")`);
    }
  }
}

function checkModulesAndQuiz(dir, lessonData, errors) {
  const modules = lessonData.modules;
  if (!Array.isArray(modules) || modules.length === 0) {
    errors.push(`${dir}: LESSON_DATA.modules phải là mảng không rỗng`);
    return;
  }

  let totalQuiz = 0;
  let traceQuiz = 0;

  modules.forEach((mod, mIdx) => {
    const modLabel = `Module ${mIdx + 1}`;
    if (!mod.subproblem || !String(mod.subproblem.title || '').trim() || !String(mod.subproblem.desc || '').trim()) {
      errors.push(`${dir} (${modLabel}): thiếu subproblem.title hoặc subproblem.desc`);
    }

    const cardsText = JSON.stringify(mod.cards || []);
    if (!Array.isArray(mod.cards) || mod.cards.length === 0) {
      errors.push(`${dir} (${modLabel}): thiếu cards nội dung bài giảng`);
    } else {
      if (!cardsText.includes('step-life')) {
        errors.push(`${dir} (${modLabel}): thiếu bước sư phạm .step-life`);
      }
      if (!cardsText.includes('step-code')) {
        errors.push(`${dir} (${modLabel}): thiếu bước sư phạm .step-code`);
      }
      if (!cardsText.includes('step-term')) {
        errors.push(`${dir} (${modLabel}): thiếu bước sư phạm .step-term`);
      }
    }

    (mod.quiz || []).forEach((q, qIdx) => {
      totalQuiz++;
      if (q.type === 'trace' || Boolean(q.traceCode)) {
        traceQuiz++;
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`${dir} (${modLabel} Câu ${qIdx + 1}): options phải có ít nhất 2 phương án`);
        return;
      }
      const lens = q.options.map((o) => String(o).length);
      const maxLen = Math.max(...lens);
      const minLen = Math.min(...lens);
      if (maxLen === 0) {
        errors.push(`${dir} (${modLabel} Câu ${qIdx + 1}): phương án trả lời rỗng`);
        return;
      }
      const diffRatio = (maxLen - minLen) / maxLen;
      if (diffRatio > 0.35) {
        errors.push(
          `${dir} (${modLabel} Câu ${qIdx + 1}): chênh lệch độ dài phương án ${(diffRatio * 100).toFixed(1)}% vượt ngưỡng 35% (max=${maxLen}, min=${minLen})`
        );
      }

      if (q.type === 'multiple') {
        const valid = Array.isArray(q.correct)
          && q.correct.length > 0
          && q.correct.every((idx) => Number.isInteger(idx) && idx >= 0 && idx < q.options.length);
        if (!valid) {
          errors.push(`${dir} (${modLabel} Câu ${qIdx + 1}): đáp án multiple choice không hợp lệ`);
        }
      } else if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
        errors.push(`${dir} (${modLabel} Câu ${qIdx + 1}): đáp án correct=${q.correct} không hợp lệ`);
      }
    });
  });

  if (totalQuiz === 0) {
    errors.push(`${dir}: bài giảng chưa có câu hỏi quiz nào`);
  } else if (traceQuiz / totalQuiz < 0.4) {
    errors.push(
      `${dir}: tỷ lệ câu hỏi trace code (${traceQuiz}/${totalQuiz} = ${((traceQuiz / totalQuiz) * 100).toFixed(1)}%) phải >= 40%`
    );
  }
}

function checkDebugExercises(dir, lessonData, errors) {
  const collected = [
    ...(Array.isArray(lessonData.debugExercises) ? lessonData.debugExercises : []),
    ...(lessonData.modules || []).flatMap((m) => (Array.isArray(m.debugExercises) ? m.debugExercises : []))
  ];

  if (collected.length < 2) {
    errors.push(`${dir}: chỉ có ${collected.length} debugExercises (yêu cầu >= 2)`);
    return;
  }

  collected.forEach((db, idx) => {
    const label = `Debug #${idx + 1}`;
    const buggyCode = typeof db.buggyCode === 'string' ? db.buggyCode : '';
    if (!buggyCode.trim()) {
      errors.push(`${dir} (${label}): thiếu buggyCode`);
    } else {
      const lineCount = buggyCode.split('\n').length;
      if (!Number.isInteger(db.bugLine) || db.bugLine <= 0 || db.bugLine > lineCount) {
        errors.push(`${dir} (${label}): bugLine=${db.bugLine} không khớp số dòng code (1..${lineCount})`);
      }
    }

    if (!String(db.failingInput || '').trim()) {
      errors.push(`${dir} (${label}): thiếu failingInput`);
    }
    if (!Array.isArray(db.patches) || db.patches.length < 3) {
      errors.push(`${dir} (${label}): patches phải có ít nhất 3 phương án`);
    }
    if (
      !Number.isInteger(db.correctPatch)
      || !Array.isArray(db.patches)
      || db.correctPatch < 0
      || db.correctPatch >= db.patches.length
    ) {
      errors.push(`${dir} (${label}): correctPatch=${db.correctPatch} không hợp lệ`);
    }
  });
}

function checkPracticeProblems(dir, lessonData, errors) {
  const problems = lessonData.practiceProblems;
  if (!Array.isArray(problems) || problems.length < 6) {
    const count = Array.isArray(problems) ? problems.length : 0;
    errors.push(`${dir}: practiceProblems chỉ có ${count} bài (yêu cầu >= 6 bài thực chiến)`);
  }

  const seenIds = new Set();
  (problems || []).forEach((pr, idx) => {
    const label = `practiceProblems[${idx}]${pr && pr.id ? ` (${pr.id})` : ''}`;
    if (!pr || typeof pr !== 'object') {
      errors.push(`${dir} (${label}): phần tử bài tập không hợp lệ`);
      return;
    }

    for (const field of ['id', 'title', 'judge', 'hint']) {
      if (typeof pr[field] !== 'string' || !pr[field].trim()) {
        errors.push(`${dir} (${label}): thiếu trường "${field}"`);
      }
    }

    if (typeof pr.id === 'string' && pr.id.trim()) {
      if (seenIds.has(pr.id)) {
        errors.push(`${dir} (${label}): trùng id "${pr.id}"`);
      }
      seenIds.add(pr.id);
    }

    if (![1, 2, 3].includes(pr.tier)) {
      errors.push(`${dir} (${label}): tier=${pr.tier} phải thuộc [1, 2, 3]`);
    }

    if (typeof pr.link !== 'string' || !pr.link.startsWith('https://')) {
      errors.push(`${dir} (${label}): link "${pr.link}" phải bắt đầu bằng "https://"`);
    } else if (isBareHomepageUrl(pr.link)) {
      errors.push(`${dir} (${label}): link "${pr.link}" là URL trang chủ trần / không trỏ tới đề bài cụ thể`);
    }
  });
}

const VALID_HTML_TAG_RE = /<\/?(?:a|b|br|code|details|div|em|h[1-6]|hr|i|img|kbd|li|ol|p|pre|s|small|span|strong|sub|summary|sup|svg|path|rect|circle|line|polyline|polygon|text|g|defs|marker|table|tbody|td|th|thead|tr|u|ul)(?:\s+[^>]*)?\s*\/?>/gi;
const CPP_TEMPLATE_CALL_RE = /\b(?:std::)?(?:vector|pair|map|set|multiset|unordered_map|unordered_set|priority_queue|stack|queue|deque|greater|less|array|bitset|tuple)\s*<(?!\/|br\s*\/?>)/;
const CPP_ANGLE_TAG_RE = /<(?:bits\/stdc\+\+\.h|iostream|iomanip|cmath|cstring|cstdio|cstdlib|cassert|climits|limits|numeric|utility|functional|algorithm|string|vector|pair|map|set|multiset|unordered_map|unordered_set|priority_queue|stack|queue|deque|list|bitset|tuple|array|int|long\s+long|long|short|unsigned|signed|char|bool|double|float|void|auto|size_t|T\d*|Key|Value)(?:\s*[,<>&*\[\]./+\s]|>|$)/;
const INLINE_CODE_TAG_RE = /<code\b[^>]*>([\s\S]*?)<\/code>/gi;

function checkRawHtmlField(dir, fieldPath, value, errors) {
  if (typeof value !== 'string' || !value) return;

  const cppMatch = value.match(CPP_TEMPLATE_CALL_RE) || value.match(CPP_ANGLE_TAG_RE);
  if (cppMatch) {
    errors.push(`${dir} (${fieldPath}): chứa thẻ/template C++ chưa escape HTML (${JSON.stringify(cppMatch[0])})`);
    return;
  }

  INLINE_CODE_TAG_RE.lastIndex = 0;
  let codeMatch;
  while ((codeMatch = INLINE_CODE_TAG_RE.exec(value)) !== null) {
    const inner = codeMatch[1].replace(VALID_HTML_TAG_RE, ' ');
    if (/[<>]/.test(inner)) {
      errors.push(`${dir} (${fieldPath}): chứa ký tự < hoặc > chưa escape bên trong <code>...</code>`);
      return;
    }
  }

  const stripped = value.replace(VALID_HTML_TAG_RE, ' ');
  const badToken = stripped.match(/<[^\s<]?|>>|>=|(?:^|[^-])>(?=\s|\d|[A-Za-z_]|$)/);
  if (badToken) {
    errors.push(`${dir} (${fieldPath}): chứa ký tự < hoặc > thô chưa escape trong innerHTML (${JSON.stringify(badToken[0].trim())})`);
  }
}

function getSandboxStateCombos(sbItem) {
  const toggles = Array.isArray(sbItem && sbItem.toggles) ? sbItem.toggles : [];
  let combos = [{}];
  for (const t of toggles) {
    const next = [];
    for (const c of combos) {
      for (const opt of (t.options || [])) {
        next.push({ ...c, [t.key]: opt.value });
      }
    }
    if (next.length > 0) combos = next;
  }
  return combos;
}

function checkUnescapedCppHtmlTags(dir, lessonData, errors) {
  checkRawHtmlField(dir, 'LESSON_DATA.title', lessonData.title, errors);
  checkRawHtmlField(dir, 'LESSON_DATA.lead', lessonData.lead, errors);
  checkRawHtmlField(dir, 'LESSON_DATA.number', lessonData.number, errors);
  checkRawHtmlField(dir, 'LESSON_DATA.shortTitle', lessonData.shortTitle, errors);

  (lessonData.modules || []).forEach((mod, mIdx) => {
    const mp = `modules[${mIdx}]`;
    checkRawHtmlField(dir, `${mp}.number`, mod.number, errors);
    checkRawHtmlField(dir, `${mp}.shortTitle`, mod.shortTitle, errors);
    checkRawHtmlField(dir, `${mp}.title`, mod.title, errors);
    checkRawHtmlField(dir, `${mp}.lead`, mod.lead, errors);
    if (mod.subproblem) {
      checkRawHtmlField(dir, `${mp}.subproblem.title`, mod.subproblem.title, errors);
      checkRawHtmlField(dir, `${mp}.subproblem.desc`, mod.subproblem.desc, errors);
    }

    (mod.cards || []).forEach((card, cIdx) => {
      checkRawHtmlField(dir, `${mp}.cards[${cIdx}].heading`, card.heading, errors);
      checkRawHtmlField(dir, `${mp}.cards[${cIdx}].tag`, card.tag, errors);
      checkRawHtmlField(dir, `${mp}.cards[${cIdx}].html`, card.html, errors);
      if (card.split) {
        checkRawHtmlField(dir, `${mp}.cards[${cIdx}].split.left`, card.split.left, errors);
        checkRawHtmlField(dir, `${mp}.cards[${cIdx}].split.right`, card.split.right, errors);
      }
    });

    (mod.sandboxes || []).forEach((sbItem, sIdx) => {
      const sp = `${mp}.sandboxes[${sIdx}]`;
      checkRawHtmlField(dir, `${sp}.title`, sbItem.title, errors);
      checkRawHtmlField(dir, `${sp}.desc`, sbItem.desc, errors);
      (sbItem.toggles || []).forEach((t, tIdx) => {
        checkRawHtmlField(dir, `${sp}.toggles[${tIdx}].label`, t.label, errors);
        (t.options || []).forEach((opt, oIdx) => {
          checkRawHtmlField(dir, `${sp}.toggles[${tIdx}].options[${oIdx}].text`, opt.text, errors);
        });
      });
      if (typeof sbItem.build === 'function') {
        for (const state of getSandboxStateCombos(sbItem)) {
          const built = sbItem.build(state);
          if (!built || typeof built !== 'object') continue;
          const stateLabel = JSON.stringify(state);
          checkRawHtmlField(dir, `${sp}.build(${stateLabel}).statusText`, built.statusText, errors);
          checkRawHtmlField(dir, `${sp}.build(${stateLabel}).explain`, built.explain, errors);
          (built.predictions || []).forEach((pred, pIdx) => {
            const predText = typeof pred === 'string' ? pred : (pred && pred.text);
            checkRawHtmlField(dir, `${sp}.build(${stateLabel}).predictions[${pIdx}]`, predText, errors);
          });
        }
      }
    });

    (mod.debugExercises || []).forEach((db, dIdx) => {
      checkRawHtmlField(dir, `${mp}.debugExercises[${dIdx}].title`, db.title, errors);
      checkRawHtmlField(dir, `${mp}.debugExercises[${dIdx}].description`, db.description, errors);
      checkRawHtmlField(dir, `${mp}.debugExercises[${dIdx}].explain`, db.explain, errors);
    });

    (mod.quiz || []).forEach((q, qIdx) => {
      checkRawHtmlField(dir, `${mp}.quiz[${qIdx}].q`, q.q, errors);
      (q.options || []).forEach((opt, oIdx) => {
        checkRawHtmlField(dir, `${mp}.quiz[${qIdx}].options[${oIdx}]`, opt, errors);
      });
      checkRawHtmlField(dir, `${mp}.quiz[${qIdx}].explain`, q.explain, errors);
    });
  });

  (lessonData.debugExercises || []).forEach((db, dIdx) => {
    checkRawHtmlField(dir, `debugExercises[${dIdx}].title`, db.title, errors);
    checkRawHtmlField(dir, `debugExercises[${dIdx}].description`, db.description, errors);
    checkRawHtmlField(dir, `debugExercises[${dIdx}].explain`, db.explain, errors);
  });

  (lessonData.practiceProblems || []).forEach((pr, pIdx) => {
    checkRawHtmlField(dir, `practiceProblems[${pIdx}].title`, pr.title, errors);
    checkRawHtmlField(dir, `practiceProblems[${pIdx}].judge`, pr.judge, errors);
    checkRawHtmlField(dir, `practiceProblems[${pIdx}].hint`, pr.hint, errors);
  });
}

function verifyLesson(dir, portalNode) {
  console.log(`--- VERIFYING LESSON: ${dir} ---`);
  const errors = [];
  const { cppFiles, hasLessonData } = checkLessonFiles(dir, errors);
  const dataPath = path.join(dir, 'lesson-data.js');
  const lessonDataRaw = hasLessonData ? fs.readFileSync(dataPath, 'utf8') : null;
  const phase1 = isPhase1Lesson(dir, portalNode);

  checkCppStandardAndPhase1(dir, cppFiles, phase1, lessonDataRaw, errors);

  if (hasLessonData) {
    let lessonData = null;
    try {
      const sb = createSandbox();
      vm.createContext(sb);
      vm.runInContext(lessonDataRaw, sb, { filename: dataPath });
      lessonData = sb.window.LESSON_DATA;
    } catch (err) {
      errors.push(`${dataPath}: lỗi thực thi JavaScript (${err.message})`);
    }

    if (!lessonData || typeof lessonData !== 'object') {
      errors.push(`${dataPath}: không định nghĩa window.LESSON_DATA`);
    } else {
      if (typeof lessonData.id !== 'string' || !lessonData.id.trim()) {
        errors.push(`${dataPath}: thiếu LESSON_DATA.id`);
      }
      checkModulesAndQuiz(dir, lessonData, errors);
      checkDebugExercises(dir, lessonData, errors);
      checkPracticeProblems(dir, lessonData, errors);
      checkUnescapedCppHtmlTags(dir, lessonData, errors);
    }
  }

  return errors;
}

function resolveTargets(portalData, lessonDir) {
  const nodeByDir = new Map();
  for (const node of portalData.nodes) {
    const dir = node.path.replace(/\/index\.html$/, '');
    nodeByDir.set(dir, node);
  }

  if (lessonDir) {
    if (lessonDir === 'MayCham') {
      console.log('[SKIP] MayCham sử dụng engine riêng (kiểm tra bằng MayCham/tests/verify_web.mjs).');
      return [];
    }
    return [{ dir: lessonDir, node: nodeByDir.get(lessonDir) || null }];
  }

  const targets = [];
  for (const node of portalData.nodes) {
    const status = node.status || 'ready';
    if (status === 'planned') {
      console.log(`[SKIP planned] ${node.code || node.id} (${node.path})`);
      continue;
    }
    const dir = node.path.replace(/\/index\.html$/, '');
    if (dir === 'MayCham' || node.id === 'may_cham') {
      console.log('[SKIP custom engine] MayCham (kiểm tra bằng MayCham/tests/verify_web.mjs)');
      continue;
    }
    targets.push({ dir, node });
  }
  return targets;
}

function main() {
  const { lessonDir, strictOj } = parseArgs(process.argv.slice(2));
  if (strictOj) {
    console.log('[INFO] Strict OJ validation enabled.');
  }

  const portalData = verifySharedInfrastructure();
  verifySkillWorkflow();
  verifyPortalDag(portalData);

  const targets = resolveTargets(portalData, lessonDir);
  const allErrors = [];

  for (const target of targets) {
    const lessonErrors = verifyLesson(target.dir, target.node);
    if (lessonErrors.length === 0) {
      console.log(`[PASS] ${target.dir}`);
    } else {
      console.error(`[FAIL] ${target.dir} (${lessonErrors.length} lỗi):`);
      lessonErrors.forEach((msg) => console.error(`  - ${msg}`));
      allErrors.push(...lessonErrors);
    }
  }

  if (allErrors.length > 0) {
    console.error(`\n❌ FAILED: Phát hiện ${allErrors.length} lỗi trong kiểm định bài giảng.`);
    process.exit(1);
  }

  console.log(`\n✅ PASS: Đã kiểm định thành công hạ tầng chung, DAG (${portalData.nodes.length} nodes) và ${targets.length} bài giảng!`);
}

main();
