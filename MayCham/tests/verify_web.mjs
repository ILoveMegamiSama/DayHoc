import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const html = fs.readFileSync('/home/paust/Projects/DayHoc/MayCham/index.html', 'utf8');
const css = fs.readFileSync('/home/paust/Projects/DayHoc/MayCham/styles.css', 'utf8');
const js = fs.readFileSync('/home/paust/Projects/DayHoc/MayCham/app.js', 'utf8');

// 1. Kiểm tra bảng màu nền kem và không dùng màu tím
assert.match(css, /#F6F3EC/i, 'Phải có màu nền kem #F6F3EC');
assert.doesNotMatch(css, /violet|lavender|#8b5cf6|#a855f7/i, 'Không được dùng màu tím');
assert.match(html, /id="module-nav"/, 'index.html phải có #module-nav');
assert.match(html, /id="module-content"/, 'index.html phải có #module-content');

// 2. Nạp app.js trong môi trường giả lập DOM tối giản để kiểm tra MODULES_DATA & highlightCpp
const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  navigator: { clipboard: { writeText: async () => {} } },
  console
};
vm.createContext(sandbox);
vm.runInContext(js, sandbox);

const modules = sandbox.window.MODULES_DATA;
assert.equal(Array.isArray(modules), true, 'MODULES_DATA phải là mảng');
assert.equal(modules.length, 5, 'Phải có đúng 5 Module bài giảng');

// 3. Kiểm tra từng module: lý thuyết, thảo luận, mọi tổ hợp công tắc sandbox, và quiz
for (const mod of modules) {
  assert.ok(mod.discussions.length >= 2, `Module ${mod.id} phải có ít nhất 2 câu hỏi thảo luận`);
  assert.ok(mod.quiz.length >= 4, `Module ${mod.id} phải có ít nhất 4 câu hỏi trắc nghiệm`);
  assert.ok(mod.sandboxes.length >= 1, `Module ${mod.id} phải có ít nhất 1 Code Sandbox`);

  for (const sb of mod.sandboxes) {
    // Duyệt vét cạn mọi tổ hợp công tắc (Cartesian product)
    const keys = sb.toggles.map(t => t.key);
    const optionLists = sb.toggles.map(t => t.options.map(o => o.value));
    const cartesian = optionLists.reduce((acc, list) =>
      acc.flatMap(d => list.map(e => [...d, e])), [[]]
    );

    for (const combo of cartesian) {
      const state = Object.fromEntries(keys.map((k, i) => [k, combo[i]]));
      const built = sb.build(state);
      assert.ok(typeof built.code === 'string' && built.code.includes('#include'), `Sandbox ${sb.id} phải sinh ra code C++ hợp lệ`);
      assert.doesNotMatch(built.code, /<span/i, 'Code dùng để Copy không được chứa thẻ HTML <span>');
      assert.ok(typeof built.console === 'string' && built.console.length > 0, `Sandbox ${sb.id} phải có kết quả Console`);
      assert.ok(built.files && typeof built.files.inp === 'string', `Sandbox ${sb.id} phải có trạng thái file .inp`);

      const highlighted = sandbox.window.highlightCpp(built.code, built.changedLines || []);
      assert.ok(highlighted.includes('&lt;'), 'highlightCpp phải escape ký tự < trong #include <...>');

      // Kiểm tra mọi đoạn code Copy từ Web đều biên dịch C++14 thành công 100%
      execFileSync('g++', ['-std=c++14', '-fsyntax-only', '-x', 'c++', '-'], {
        input: built.code,
        stdio: ['pipe', 'pipe', 'pipe']
      });
    }
  }
}

console.log('WEB VERIFICATION PASSED: All 5 modules, all toggle combinations, copyable code, and quizzes verified.');
