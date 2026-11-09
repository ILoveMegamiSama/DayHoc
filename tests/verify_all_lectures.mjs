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

console.log('✅ PASS: Infrastructure & Shared Modules Verified!');
