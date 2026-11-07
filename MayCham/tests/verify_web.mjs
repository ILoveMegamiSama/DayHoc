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

// 1.1. Kiểm tra tích hợp KaTeX trong index.html
assert.match(html, /katex(\.min)?\.css/, 'index.html phải nhúng KaTeX CSS');
assert.match(html, /katex(\.min)?\.js/, 'index.html phải nhúng KaTeX JS');
assert.match(html, /<script[^>]*defer[^>]*src="app\.js"/, 'app.js trong index.html phải có thuộc tính defer để đồng bộ với KaTeX');

// 1.2. Kiểm tra CSS định kiểu inline code nền đen than #1C1B18
assert.match(css, /p code[^{]*\{[^}]*background:\s*(var\(--code-bg\)|#1C1B18)/s, 'Inline code p code phải dùng nền đen #1C1B18');
assert.doesNotMatch(css, /p code[^{]*\{[^}]*background:\s*#E5E0D3/s, 'Inline code không được dùng nền kem cũ #E5E0D3');
assert.match(css, /\.analogy-box code/, 'styles.css phải định kiểu nền đen cho .analogy-box code');

// 1.3. Kiểm tra nhãn thảo luận, triggerMathRender và làm sạch macro mũi tên trong app.js
assert.doesNotMatch(js, /hỏi học sinh trước khi bấm/i, 'app.js không được chứa chữ "Hỏi học sinh trước khi bấm"');
assert.match(js, /triggerMathRender/, 'app.js phải có hàm triggerMathRender');
assert.doesNotMatch(js, /\$\\rightarrow\$/, 'app.js không được chứa macro $\\rightarrow$ thô');
assert.match(js, /left:\s*['"]\$\$['"]/, 'triggerMathRender phải dùng delimiter display math là $$ thay vì 24');
assert.match(js, /DOMContentLoaded.*triggerMathRender/, 'app.js phải đăng ký triggerMathRender khi DOMContentLoaded');

// 1.4. Kiểm tra cấu trúc Module 1 mới: Phần cứng, OS, Shell, PATH, Compiler, File .exe, F9
const mod1Raw = js.match(/id:\s*['"]m1['"][\s\S]*?(?=id:\s*['"]m2['"])/)?.[0] || '';
assert.match(mod1Raw, /cmd\.exe|Shell/i, 'Module 1 phải có nội dung về Shell (cmd.exe)');
assert.match(mod1Raw, /PATH/i, 'Module 1 phải có nội dung về biến môi trường PATH');
assert.match(mod1Raw, /g\+\+\.exe|Compiler|Trình biên dịch/i, 'Module 1 phải có nội dung về Trình biên dịch (Compiler)');
assert.match(mod1Raw, /\.exe|PE/i, 'Module 1 phải giải thích bản chất file .exe');
assert.match(mod1Raw, /F9/i, 'Module 1 phải giải mã phím F9');

// 1.5. Kiểm tra cấu trúc Module 2: Luồng (Stream), Buffer, ofstream mnemonics
const mod2Raw = js.match(/id:\s*['"]m2['"][\s\S]*?(?=id:\s*['"]m3['"])/)?.[0] || '';
assert.match(mod2Raw, /ofstream/i, 'Module 2 phải có nội dung về ofstream');
assert.match(mod2Raw, /Output/i, 'Module 2 phải giải thích chữ o = Output');
assert.match(mod2Raw, /Buffer/i, 'Module 2 phải giải thích cơ chế Buffer');

// 1.6. Kiểm tra cấu trúc Module 3: system(), exit code, fc /w, exit(0)
const mod3Raw = js.match(/id:\s*['"]m3['"][\s\S]*?(?=id:\s*['"]m4['"])/)?.[0] || '';
assert.match(mod3Raw, /system\(/i, 'Module 3 phải có nội dung về hàm system()');
assert.match(mod3Raw, /fc\s+\/w/i, 'Module 3 phải có lệnh fc /w');
assert.match(mod3Raw, /exit\(0\)/i, 'Module 3 phải có lệnh exit(0)');

// 1.7. Kiểm tra cấu trúc Module 4: mt19937_64, steady_clock, Rand dễ nhớ
const mod4Raw = js.match(/id:\s*['"]m4['"][\s\S]*?(?=id:\s*['"]m5['"])/)?.[0] || '';
assert.match(mod4Raw, /mt19937_64/i, 'Module 4 phải dùng mt19937_64');
assert.match(mod4Raw, /steady_clock/i, 'Module 4 phải dùng chrono::steady_clock');
assert.match(mod4Raw, /rd\(\)\s*%\s*\(r\s*-\s*l\s*\+\s*1\)/i, 'Module 4 phải có cú pháp hàm Rand chia dư dễ nhớ');
assert.match(mod4Raw, /uniform_int_distribution/i, 'Module 4 phải có cú pháp mở rộng uniform_int_distribution');

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
