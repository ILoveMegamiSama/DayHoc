import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

console.log('--- RUNNING INFRASTRUCTURE & SHARED VERIFICATION ---');

// 1. Kiểm tra .gitignore và user_progress.json
const gitignore = fs.readFileSync('.gitignore', 'utf8');
assert.match(gitignore, /user_progress\.json/, '.gitignore phải chứa user_progress.json');
assert.equal(fs.existsSync('user_progress.json'), false, 'user_progress.json không được nằm sẵn trên repo');

// 2. Kiểm tra shared/styles.css
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

// 3. Kiểm tra index.html cổng chính
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.match(indexHtml, /id="skill-tree-svg"/, 'index.html phải có #skill-tree-svg cho cây kỹ năng');
assert.match(indexHtml, /id="progress-summary"/, 'index.html phải có #progress-summary');
assert.match(indexHtml, /shared\/styles\.css/, 'index.html phải nhúng shared/styles.css');
assert.match(indexHtml, /shared\/portal-data\.js/, 'index.html phải nhúng shared/portal-data.js');

// 4. Kiểm tra JS logic nạp trong vm giả lập
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

const sandbox = createSandbox();
vm.createContext(sandbox);

const iconsJs = fs.readFileSync('shared/icons.js', 'utf8');
vm.runInContext(iconsJs, sandbox);
assert.ok(sandbox.window.CP_ICONS, 'window.CP_ICONS phải được định nghĩa');
assert.ok(sandbox.window.CP_ICONS.sun, 'CP_ICONS phải có sun');
assert.ok(sandbox.window.CP_ICONS.bug, 'CP_ICONS phải có bug');
assert.ok(sandbox.window.CP_ICONS.code, 'CP_ICONS phải có code');

const progJs = fs.readFileSync('shared/progress.js', 'utf8');
vm.runInContext(progJs, sandbox);
assert.ok(sandbox.window.CP_PROGRESS, 'window.CP_PROGRESS phải được định nghĩa');
assert.equal(typeof sandbox.window.CP_PROGRESS.loadProgress, 'function');
assert.equal(typeof sandbox.window.CP_PROGRESS.saveProgress, 'function');
assert.equal(typeof sandbox.window.CP_PROGRESS.recordQuizAnswer, 'function');
assert.equal(typeof sandbox.window.CP_PROGRESS.recordDebugSolved, 'function');

const hlJs = fs.readFileSync('shared/highlighter.js', 'utf8');
vm.runInContext(hlJs, sandbox);
assert.equal(typeof sandbox.window.highlightCpp, 'function');
assert.equal(typeof sandbox.window.highlightInlineCodeSnippet, 'function');

const portalJs = fs.readFileSync('shared/portal-data.js', 'utf8');
vm.runInContext(portalJs, sandbox);
assert.ok(sandbox.window.PORTAL_DATA, 'window.PORTAL_DATA phải được định nghĩa');
assert.ok(Array.isArray(sandbox.window.PORTAL_DATA.nodes), 'PORTAL_DATA.nodes phải là mảng');
assert.ok(Array.isArray(sandbox.window.PORTAL_DATA.edges), 'PORTAL_DATA.edges phải là mảng');

const engineJs = fs.readFileSync('shared/lecture-engine.js', 'utf8');
vm.runInContext(engineJs, sandbox);
assert.equal(typeof sandbox.window.initLecturePage, 'function');

// 5. Kiểm định Bài 01 — 01_DeQuy_Va_DeQuyDuoi
console.log('--- VERIFYING LESSON 01: ĐỆ QUY & ĐỆ QUY ĐUÔI ---');
assert.ok(fs.existsSync('01_DeQuy_Va_DeQuyDuoi/docs/bai_giang_de_quy_duoi.md'), 'Phải có docs/bai_giang_de_quy_duoi.md');
assert.ok(fs.existsSync('01_DeQuy_Va_DeQuyDuoi/Code_Mau/01_DeQuyThuong_TranBoNho.cpp'), 'Phải có Code_Mau 01');
assert.ok(fs.existsSync('01_DeQuy_Va_DeQuyDuoi/Code_Mau/02_DeQuyDuoi_BienTichLuy.cpp'), 'Phải có Code_Mau 02');
assert.ok(fs.existsSync('01_DeQuy_Va_DeQuyDuoi/Code_Mau/03_BienDoi_DeQuyDuoi_Sang_VongLap.cpp'), 'Phải có Code_Mau 03');
assert.ok(fs.existsSync('01_DeQuy_Va_DeQuyDuoi/index.html'), 'Phải có index.html');

const l1Sandbox = createSandbox();
vm.createContext(l1Sandbox);
const l1DataJs = fs.readFileSync('01_DeQuy_Va_DeQuyDuoi/lesson-data.js', 'utf8');
vm.runInContext(l1DataJs, l1Sandbox);
const l1Data = l1Sandbox.window.LESSON_DATA;

assert.ok(l1Data, 'LESSON_DATA bài 01 phải tồn tại');
assert.equal(l1Data.id, 'de_quy_duoi');
assert.equal(l1Data.modules.length, 3, 'Bài 01 phải có đúng 3 module con (3 vấn đề nhỏ)');

let totalQuizL1 = 0;
let traceQuizL1 = 0;

l1Data.modules.forEach((mod, mIdx) => {
  assert.ok(mod.subproblem, `Module ${mIdx + 1} phải có định nghĩa vấn đề nhỏ (subproblem)`);
  assert.ok(mod.subproblem.title && mod.subproblem.desc, 'subproblem phải có title và desc');
  
  // Kiểm tra 3 bước sư phạm
  const modHtml = JSON.stringify(mod.cards);
  assert.match(modHtml, /step-life|đời sống|thực tế/i, `Module ${mIdx + 1} phải có ví dụ đời sống`);
  assert.match(modHtml, /step-code|lập trình|máy tính/i, `Module ${mIdx + 1} phải có ánh xạ lập trình`);
  assert.match(modHtml, /step-term|thuật ngữ|tên gọi/i, `Module ${mIdx + 1} phải giải nghĩa thuật ngữ`);

  (mod.quiz || []).forEach((q, qIdx) => {
    totalQuizL1++;
    if (q.type === 'trace' || q.traceCode) traceQuizL1++;

    // Kiểm tra chênh lệch độ dài phương án
    const lens = q.options.map(o => String(o).length);
    const maxLen = Math.max(...lens);
    const minLen = Math.min(...lens);
    const diffRatio = (maxLen - minLen) / maxLen;
    assert.ok(
      diffRatio <= 0.38,
      `Quiz Mod ${mIdx + 1} Câu ${qIdx + 1}: Chênh lệch độ dài (${diffRatio.toFixed(2)}) vượt quá 38% (max: ${maxLen}, min: ${minLen})`
    );
  });
});

assert.ok(
  traceQuizL1 / totalQuizL1 >= 0.4,
  `Bài 01: Tỷ lệ câu hỏi trace code (${traceQuizL1}/${totalQuizL1} = ${(traceQuizL1/totalQuizL1*100).toFixed(1)}%) phải >= 40%`
);

assert.ok(
  (l1Data.debugExercises || []).length >= 2,
  'Bài 01 phải có ít nhất 2 bài tập Debug tương tác'
);
l1Data.debugExercises.forEach((db, dIdx) => {
  assert.ok(db.bugLine > 0, `Debug ${dIdx + 1} phải có bugLine > 0`);
  assert.ok(db.failingInput, `Debug ${dIdx + 1} phải có failingInput`);
  assert.ok(Array.isArray(db.patches) && db.patches.length >= 3, `Debug ${dIdx + 1} phải có ít nhất 3 bản vá`);
  assert.ok(typeof db.correctPatch === 'number', `Debug ${dIdx + 1} phải có correctPatch`);
});

assert.ok((l1Data.practiceProblems || []).length >= 3, 'Bài 01 phải có ít nhất 3 bài tập thực chiến');
console.log('✅ PASS: Lesson 01 Specifications Verified!');

