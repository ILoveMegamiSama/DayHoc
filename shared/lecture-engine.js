/**
 * BỘ KHUNG DỰNG BÀI GIẢNG TƯƠNG TÁC DÙNG CHUNG (LECTURE ENGINE)
 * Nhận dữ liệu lessonData (từ lesson-data.js) và tự động render toàn bộ giao diện:
 * - Knowledge Graph SVG nội bộ
 * - Wide Knowledge Cards (1-2 cột cân đối, 3 bước Đời sống -> Code -> Thuật ngữ)
 * - Code Sandboxes với Toggles, Run mô phỏng và Copy code
 * - Bài tập Debug tương tác (Bug-Hunting)
 * - Bộ Quiz 3 loại (Trace code, Single-choice, Multi-select)
 * - Bảng Bài tập thực chiến (CSES, VNOJ, Codeforces) tích hợp lưu tiến trình
 */
(function() {
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function triggerMathRender(el) {
    if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(el || document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render error:', e);
      }
    }
  }

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  function initLecturePage(lessonData) {
    if (typeof document === 'undefined') return;

    let currentModIdx = 0;
    const sandboxStates = {};
    const sandboxTabs = {};
    const debugUserSelections = {}; // { [debugId]: { selectedLine: number, selectedPatch: number, checked: boolean } }
    const multiQuizSelections = {}; // { [ansKey]: Set<number> }

    // Khởi tạo trạng thái Sandbox
    (lessonData.modules || []).forEach((mod) => {
      (mod.sandboxes || []).forEach((sb) => {
        const initState = {};
        (sb.toggles || []).forEach((t) => {
          initState[t.key] = t.options[0].value;
        });
        sandboxStates[sb.id] = initState;
        sandboxTabs[sb.id] = 'console';
      });
    });

    const rootEl = document.getElementById('app-root') || document.body;

    function renderHeader() {
      const p = window.CP_PROGRESS ? window.CP_PROGRESS.loadProgress() : { theme: 'light' };
      const currentTheme = p.theme || 'light';
      const iconTheme = currentTheme === 'dark' ? window.CP_ICONS.sun : window.CP_ICONS.moon;
      const themeLabel = currentTheme === 'dark' ? 'Chế độ Sáng' : 'Chế độ Tối';

      return `
        <header class="site-header">
          <div class="wrap">
            <div class="header-top">
              <a href="../index.html" class="brand" title="Quay lại Cổng học tập trung tâm">
                <span class="brand-badge">CP CURRICULUM</span>
                <span class="brand-title">${lessonData.title}</span>
              </a>
              <div class="header-meta">
                <a href="../index.html" class="btn-pill" title="Mở Cây Kỹ Năng CP">
                  ${window.CP_ICONS.graph} <span>Cây Kỹ Năng</span>
                </a>
                <button id="btn-bind-file" class="btn-pill" type="button" title="Liên kết tự động lưu xuống file user_progress.json">
                  ${window.CP_ICONS.linkFile} <span id="auto-save-label">Auto-save: localStorage</span>
                </button>
                <button id="btn-export-json" class="btn-pill" type="button" title="Tải file user_progress.json về máy">
                  ${window.CP_ICONS.save} <span>Xuất JSON</span>
                </button>
                <button id="btn-theme-toggle" class="btn-pill" type="button" title="Chuyển chế độ Sáng / Tối">
                  ${iconTheme} <span>${themeLabel}</span>
                </button>
              </div>
            </div>
            <nav id="module-nav" class="module-nav" aria-label="Danh sách Module"></nav>
          </div>
        </header>
      `;
    }

    function renderNav() {
      const navEl = document.getElementById('module-nav');
      if (!navEl) return;
      const progress = window.CP_PROGRESS ? window.CP_PROGRESS.loadProgress() : { quizzes: {} };

      navEl.innerHTML = lessonData.modules.map((mod, idx) => {
        let correctCount = 0;
        const total = (mod.quiz || []).length;
        (mod.quiz || []).forEach((_, qIdx) => {
          const rec = progress.quizzes[`${lessonData.id}_${mod.id}_${qIdx}`];
          if (rec && rec.isCorrect) correctCount++;
        });
        const isDone = total > 0 && correctCount === total;

        return `
          <button class="module-tab ${idx === currentModIdx ? 'active' : ''}" data-mod-idx="${idx}">
            <div class="module-tab-top">
              <span>${mod.number || `Mục ${idx + 1}`}</span>
              <span class="quiz-badge ${isDone ? 'done' : ''}">${correctCount}/${total} Quiz</span>
            </div>
            <div class="module-tab-title">${mod.shortTitle || mod.title}</div>
          </button>
        `;
      }).join('');

      navEl.querySelectorAll('.module-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
          currentModIdx = Number(btn.getAttribute('data-mod-idx'));
          renderBody();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    function renderSandbox(sb) {
      const state = sandboxStates[sb.id];
      const activeTab = sandboxTabs[sb.id] || 'console';
      const built = sb.build(state);
      const highlightedCode = window.highlightCpp ? window.highlightCpp(built.code, built.changedLines || []) : escapeHtml(built.code);

      const togglesHtml = (sb.toggles || []).map((t) => {
        const optsHtml = t.options.map((opt) => {
          const isActive = state[t.key] === opt.value;
          const kindCls = opt.kind === 'bug' ? 'is-bug' : 'is-ok';
          return `<button class="toggle-opt ${isActive ? `active ${kindCls}` : ''}" data-sb="${sb.id}" data-key="${t.key}" data-val="${opt.value}">${opt.text}</button>`;
        }).join('');
        return `
          <div class="toggle-group">
            <span class="toggle-label">${t.label}:</span>
            <div class="toggle-options">${optsHtml}</div>
          </div>
        `;
      }).join('');

      return `
        <div class="sandbox-card" id="sandbox-${sb.id}">
          <div class="sandbox-top">
            <div>
              <h3 style="font-size: 16px; margin-bottom: 4px;">${window.CP_ICONS.terminal} ${sb.title}</h3>
              <p style="font-size: 13.5px; color: var(--muted);">${sb.desc}</p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-pill" data-copy-sb="${sb.id}">${window.CP_ICONS.copy} <span>Copy Code</span></button>
              <button class="btn-pill primary" data-run-sb="${sb.id}">${window.CP_ICONS.play} <span>Chạy Thử</span></button>
            </div>
          </div>
          <div class="sandbox-toggles">${togglesHtml}</div>
          <div class="sandbox-body">
            <div class="code-pane">
              <div class="code-pane-header">
                <span>C++14 Mã Nguồn (Tự động cập nhật theo công tắc)</span>
                <span>Dòng viền cam = Đang đổi</span>
              </div>
              <pre class="code-pre"><code>${highlightedCode}</code></pre>
            </div>
            <div class="output-pane">
              <div class="output-status ${built.statusOk ? 'ok' : 'bug'}">
                ${built.statusOk ? '✔ CHUẨN THUẬT TOÁN: ' : '⚠ PHÁT HIỆN VẤN ĐỀ: '}${built.statusText}
              </div>
              <div class="output-content">${escapeHtml(built.console)}</div>
              <div style="font-size: 13px; color: var(--muted);">
                <strong>Giải thích cơ chế:</strong> ${built.explain}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderDebugExercise(db) {
      const p = window.CP_PROGRESS ? window.CP_PROGRESS.loadProgress() : { debugs: {} };
      const isSolved = p.debugs[`${lessonData.id}_${db.id}`];
      const userState = debugUserSelections[db.id] || { selectedLine: null, selectedPatch: null, checked: false };

      const lines = String(db.buggyCode || '').split('\n');
      const linesHtml = lines.map((lineText, idx) => {
        const lineNo = idx + 1;
        const isSelected = userState.selectedLine === lineNo;
        const hlLine = window.highlightCpp ? window.highlightCpp(lineText).replace(/<span class="code-line[^"]*">/, '').replace(/<\/span>$/, '') : escapeHtml(lineText);
        return `
          <button class="debug-line-btn ${isSelected ? 'selected' : ''}" data-debug-id="${db.id}" data-line="${lineNo}">
            <span class="line-no">${lineNo}</span> ${hlLine}
          </button>
        `;
      }).join('');

      const patchesHtml = (db.patches || []).map((pt, pIdx) => {
        const isSel = userState.selectedPatch === pIdx;
        let stateCls = '';
        if (userState.checked) {
          if (pIdx === db.correctPatch) stateCls = 'correct';
          else if (isSel) stateCls = 'wrong';
        }
        return `
          <button class="debug-patch-btn ${isSel ? 'selected' : ''} ${stateCls}" data-debug-id="${db.id}" data-patch-idx="${pIdx}">
            <strong>Phương án ${String.fromCharCode(65 + pIdx)}:</strong> ${escapeHtml(pt.text)}
          </button>
        `;
      }).join('');

      let feedbackHtml = '';
      if (userState.checked) {
        const lineOk = userState.selectedLine === db.bugLine;
        const patchOk = userState.selectedPatch === db.correctPatch;
        if (lineOk && patchOk) {
          feedbackHtml = `
            <div class="output-status ok" style="margin-top: 10px;">
              ✔ CHÍNH XÁC! Bạn đã tìm đúng dòng gây lỗi (Dòng ${db.bugLine}) và bản vá chuẩn.
              <br><small>${db.explain}</small>
            </div>
          `;
        } else {
          feedbackHtml = `
            <div class="output-status bug" style="margin-top: 10px;">
              ❌ Chưa chính xác. ${!lineOk ? `Dòng gây lỗi chưa đúng (Gợi ý: chú ý dòng ${db.bugLine}). ` : ''}${!patchOk ? 'Bản vá bạn chọn chưa tối ưu hoặc còn tạo ra bug mới.' : ''}
              <br><small>${db.explain}</small>
            </div>
          `;
        }
      }

      return `
        <div class="debug-card" id="debug-${db.id}">
          <div class="debug-header">
            <div class="debug-title">
              ${window.CP_ICONS.bug} <span>Thử Thách Debug: ${db.title}</span>
            </div>
            <span class="quiz-badge ${isSolved ? 'done' : ''}">${isSolved ? '✔ Đã giải quyết' : 'Cần Debug'}</span>
          </div>
          <p style="font-size: 14px; margin-bottom: 8px;"><strong>Mô tả bài toán:</strong> ${db.description}</p>
          <div style="font-size: 13.5px; background: var(--surface); padding: 8px 12px; border-radius: 4px; margin-bottom: 8px;">
            <strong>Bộ test gây lỗi:</strong> <code>${escapeHtml(db.failingInput)}</code>
            <br><strong>Kết quả sai thực tế:</strong> <code>${escapeHtml(db.failingOutput)}</code> (Kỳ vọng: <code>${escapeHtml(db.expectedOutput)}</code>)
          </div>
          <div style="font-size: 13px; color: var(--muted); margin-bottom: 4px;">Bước 1: Bấm vào dòng code bạn nghi ngờ gây ra lỗi logic dưới đây:</div>
          <div class="debug-code-box">${linesHtml}</div>
          <div style="font-size: 13px; color: var(--muted); margin-top: 12px;">Bước 2: Chọn bản vá sửa lỗi đúng nhất để thay thế cho dòng code trên:</div>
          <div class="debug-patches" style="margin-top: 6px;">${patchesHtml}</div>
          <div style="margin-top: 12px; display: flex; align-items: center; gap: 10px;">
            <button class="btn-pill primary" data-debug-check="${db.id}">
              ${window.CP_ICONS.check} <span>Kiểm Tra Bản Vá</span>
            </button>
            <span style="font-size: 12.5px; color: var(--muted);">Dòng đang chọn: <strong>${userState.selectedLine ? `Dòng ${userState.selectedLine}` : 'Chưa chọn'}</strong> | Bản vá: <strong>${userState.selectedPatch !== null ? `Phương án ${String.fromCharCode(65 + userState.selectedPatch)}` : 'Chưa chọn'}</strong></span>
          </div>
          ${feedbackHtml}
        </div>
      `;
    }

    function renderQuiz(mod) {
      const progress = window.CP_PROGRESS ? window.CP_PROGRESS.loadProgress() : { quizzes: {} };
      const quizzes = mod.quiz || [];
      if (quizzes.length === 0) return '';

      let correctCount = 0;
      quizzes.forEach((_, qIdx) => {
        const rec = progress.quizzes[`${lessonData.id}_${mod.id}_${qIdx}`];
        if (rec && rec.isCorrect) correctCount++;
      });

      const cardsHtml = quizzes.map((qItem, qIdx) => {
        const ansKey = `${lessonData.id}_${mod.id}_${qIdx}`;
        const rec = progress.quizzes[ansKey];
        const isAnswered = !!rec;
        const isMulti = qItem.type === 'multiple';

        let codeSnippetHtml = '';
        if (qItem.traceCode) {
          const lines = String(qItem.traceCode).split('\n');
          const numbered = lines.map((l, i) => `<span class="code-line"><span class="line-no">${i + 1}</span>${escapeHtml(l)}</span>`).join('\n');
          codeSnippetHtml = `<div class="quiz-trace-code"><pre style="margin:0;"><code>${numbered}</code></pre></div>`;
        }

        const optsHtml = qItem.options.map((optText, oIdx) => {
          let isSelected = false;
          let cls = 'quiz-opt';
          const letter = String.fromCharCode(65 + oIdx);

          if (isMulti) {
            const currentSet = multiQuizSelections[ansKey] || (rec && Array.isArray(rec.answer) ? new Set(rec.answer) : new Set());
            isSelected = currentSet.has(oIdx);
            if (isSelected) cls += ' selected';
            if (isAnswered) {
              const isCorrectOpt = Array.isArray(qItem.correct) && qItem.correct.includes(oIdx);
              if (isCorrectOpt) cls += ' correct';
              else if (isSelected) cls += ' wrong';
            }
            return `
              <button class="${cls}" data-quiz-multi-opt="${oIdx}" data-ans-key="${ansKey}">
                <input type="checkbox" ${isSelected ? 'checked' : ''} style="pointer-events:none; margin-top: 3px;" />
                <div><strong>${letter}.</strong> <span>${optText}</span></div>
              </button>
            `;
          } else {
            isSelected = rec && rec.answer === oIdx;
            if (isSelected) cls += ' selected';
            if (isAnswered) {
              if (oIdx === qItem.correct) cls += ' correct';
              else if (isSelected) cls += ' wrong';
            }
            return `
              <button class="${cls}" data-quiz-single-opt="${oIdx}" data-mod-id="${mod.id}" data-q-idx="${qIdx}">
                <input type="radio" ${isSelected ? 'checked' : ''} style="pointer-events:none; margin-top: 3px;" />
                <div><strong>${letter}.</strong> <span>${optText}</span></div>
              </button>
            `;
          }
        }).join('');

        let feedbackHtml = '';
        if (isAnswered) {
          feedbackHtml = `
            <div class="quiz-feedback visible ${rec.isCorrect ? 'ok' : 'bug'}">
              ${rec.isCorrect ? '<strong>✔ Chính xác!</strong> ' : '<strong>❌ Chưa đúng.</strong> '}
              ${qItem.explain}
            </div>
          `;
        }

        let multiCheckBtn = '';
        if (isMulti) {
          multiCheckBtn = `
            <div style="margin-top: 10px;">
              <button class="btn-pill primary" data-quiz-multi-check="${ansKey}" data-mod-id="${mod.id}" data-q-idx="${qIdx}">
                ${window.CP_ICONS.check} <span>Kiểm Tra Đáp Án Đã Chọn</span>
              </button>
            </div>
          `;
        }

        return `
          <div class="quiz-card">
            <div class="quiz-q">
              <span class="quiz-badge" style="margin-right: 6px;">${isMulti ? 'Chọn nhiều đáp án' : (qItem.type === 'trace' ? 'Trace hành vi code' : 'Chọn 1 đáp án')}</span>
              <strong>Câu ${qIdx + 1}:</strong> ${qItem.q}
            </div>
            ${codeSnippetHtml}
            <div class="quiz-options">${optsHtml}</div>
            ${multiCheckBtn}
            ${feedbackHtml}
          </div>
        `;
      }).join('');

      return `
        <section class="quiz-section">
          <div class="quiz-header">
            <div>
              <div class="module-kicker">KIỂM TRA HIỂU BÀI & TRACE CODE</div>
              <h2 style="font-size: 18px; font-weight: 700;">Trắc Nghiệm Bản Chất ${mod.number || ''}</h2>
            </div>
            <div class="btn-pill">Đúng: <strong>${correctCount} / ${quizzes.length}</strong> câu</div>
          </div>
          ${cardsHtml}
        </section>
      `;
    }

    function renderPracticeProblems() {
      const problems = lessonData.practiceProblems || [];
      if (problems.length === 0) return '';
      const p = window.CP_PROGRESS ? window.CP_PROGRESS.loadProgress() : { problems: {} };

      const rowsHtml = problems.map((pr, idx) => {
        const isDone = !!p.problems[`${lessonData.id}_${pr.id}`];
        const tierCls = pr.tier === 1 ? 'tier-1' : (pr.tier === 2 ? 'tier-2' : 'tier-3');
        const tierLabel = pr.tier === 1 ? 'Mức 1: Mẫu' : (pr.tier === 2 ? 'Mức 2: Biến đổi' : 'Mức 3: Thử thách');

        return `
          <tr>
            <td style="width: 40px; text-align: center;">
              <input type="checkbox" class="prob-check" data-prob-id="${pr.id}" ${isDone ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px;" />
            </td>
            <td>
              <strong>${pr.title}</strong>
              <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">${pr.judge} • ID: ${pr.id}</div>
            </td>
            <td><span class="practice-tier ${tierCls}">${tierLabel}</span></td>
            <td>
              <details style="font-size: 13px;">
                <summary style="cursor: pointer; color: var(--accent);">Gợi ý nhận diện</summary>
                <p style="margin-top: 4px; color: var(--muted);">${pr.hint}</p>
              </details>
            </td>
            <td style="text-align: right;">
              <a href="${pr.link}" target="_blank" rel="noopener noreferrer" class="btn-pill" style="font-size: 12px;">
                <span>Luyện Tập</span> ${window.CP_ICONS.externalLink}
              </a>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <section class="practice-section">
          <div style="margin-bottom: 14px;">
            <div class="module-kicker">LUYỆN TẬP THỰC CHIẾN</div>
            <h2 style="font-size: 20px; font-weight: 700;">Danh Sách Bài Tập Tuyển Chọn</h2>
            <p style="font-size: 14px; color: var(--muted);">Tích chọn ô bên trái sau khi bạn đã nộp AC (Accepted) trên trang chấm để ghi nhận vào tiến trình học tập.</p>
          </div>
          <table class="practice-table">
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;">Xong</th>
                <th>Tên Bài & Trang Chấm</th>
                <th>Phân Cấp</th>
                <th>Dấu Hiệu Nhận Diện</th>
                <th style="text-align: right;">Liên Kết</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </section>
      `;
    }

    function renderBody() {
      const mod = lessonData.modules[currentModIdx];
      const mainEl = document.getElementById('module-main');
      if (!mainEl) return;

      const subBanner = mod.subproblem ? `
        <div class="subproblem-banner">
          <h3>${window.CP_ICONS.layers} Vấn Đề Nhỏ Cần Giải Quyết: ${mod.subproblem.title}</h3>
          <p>${mod.subproblem.desc}</p>
        </div>
      ` : '';

      const cardsHtml = (mod.cards || []).map((c, cIdx) => {
        let bodyHtml = '';
        if (c.split) {
          bodyHtml = `
            <div class="card-split">
              <div class="split-col-left">${c.split.left}</div>
              <div class="split-col-right">${c.split.right}</div>
            </div>
          `;
        } else if (c.html) {
          bodyHtml = c.html;
        }

        return `
          <div class="knowledge-card">
            <div class="card-heading">
              <span><span class="card-num">${mod.number || 'Mục'}.${cIdx + 1}</span> ${c.heading}</span>
              <span class="concept-tag" style="font-size: 11px; padding: 2px 8px; border: 1px solid var(--border); border-radius: 4px;">${c.tag || 'Bản chất'}</span>
            </div>
            ${bodyHtml}
          </div>
        `;
      }).join('');

      const sandboxesHtml = (mod.sandboxes || []).map((sb) => renderSandbox(sb)).join('');
      const debugsHtml = (mod.debugExercises || []).map((db) => renderDebugExercise(db)).join('');
      const quizHtml = renderQuiz(mod);
      const practiceHtml = currentModIdx === lessonData.modules.length - 1 ? renderPracticeProblems() : '';

      const prevBtn = currentModIdx > 0
        ? `<button class="btn-pill" id="btn-prev-mod">${window.CP_ICONS.arrowLeft} <span>Quay lại ${lessonData.modules[currentModIdx - 1].shortTitle || lessonData.modules[currentModIdx - 1].number}</span></button>`
        : `<span></span>`;
      const nextBtn = currentModIdx < lessonData.modules.length - 1
        ? `<button class="btn-pill primary" id="btn-next-mod"><span>Tiếp tục: ${lessonData.modules[currentModIdx + 1].shortTitle || lessonData.modules[currentModIdx + 1].number}</span> ${window.CP_ICONS.arrowRight}</button>`
        : `<a href="../index.html" class="btn-pill primary"><span>🎉 Hoàn thành bài giảng! Về Cây Kỹ Năng</span> ${window.CP_ICONS.arrowRight}</a>`;

      mainEl.innerHTML = `
        <div class="module-banner">
          <div class="module-kicker">${mod.number || ''} — ${lessonData.title}</div>
          <h1 class="module-h1">${mod.title}</h1>
          <p class="module-lead">${mod.lead || ''}</p>
        </div>
        ${subBanner}
        ${cardsHtml}
        ${sandboxesHtml}
        ${debugsHtml}
        ${quizHtml}
        ${practiceHtml}
        <div class="module-footer-nav">${prevBtn}${nextBtn}</div>
      `;

      bindEvents(mainEl);
      renderNav();
      if (window.highlightAllInlineCode) {
        window.highlightAllInlineCode(mainEl);
      }
      triggerMathRender(mainEl);
    }

    function bindEvents(container) {
      // Toggles Sandbox
      container.querySelectorAll('.toggle-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          const sbId = btn.getAttribute('data-sb');
          const key = btn.getAttribute('data-key');
          const val = btn.getAttribute('data-val');
          sandboxStates[sbId][key] = val;
          renderBody();
        });
      });

      // Copy Sandbox Code
      container.querySelectorAll('[data-copy-sb]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const sbId = btn.getAttribute('data-copy-sb');
          const mod = lessonData.modules[currentModIdx];
          const sb = (mod.sandboxes || []).find((s) => s.id === sbId);
          if (!sb) return;
          const code = sb.build(sandboxStates[sbId]).code;
          try {
            await navigator.clipboard.writeText(code);
            showToast('Đã copy code C++ vào Clipboard!');
          } catch {
            showToast('Đã chọn code!');
          }
        });
      });

      // Run Sandbox
      container.querySelectorAll('[data-run-sb]').forEach((btn) => {
        btn.addEventListener('click', () => {
          renderBody();
          showToast('Đã chạy mô phỏng và cập nhật kết quả!');
        });
      });

      // Debug: Chọn dòng code
      container.querySelectorAll('.debug-line-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const dbId = btn.getAttribute('data-debug-id');
          const line = Number(btn.getAttribute('data-line'));
          if (!debugUserSelections[dbId]) debugUserSelections[dbId] = { selectedLine: null, selectedPatch: null, checked: false };
          debugUserSelections[dbId].selectedLine = line;
          debugUserSelections[dbId].checked = false;
          renderBody();
        });
      });

      // Debug: Chọn patch
      container.querySelectorAll('.debug-patch-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const dbId = btn.getAttribute('data-debug-id');
          const pIdx = Number(btn.getAttribute('data-patch-idx'));
          if (!debugUserSelections[dbId]) debugUserSelections[dbId] = { selectedLine: null, selectedPatch: null, checked: false };
          debugUserSelections[dbId].selectedPatch = pIdx;
          debugUserSelections[dbId].checked = false;
          renderBody();
        });
      });

      // Debug: Kiểm tra
      container.querySelectorAll('[data-debug-check]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const dbId = btn.getAttribute('data-debug-check');
          const mod = lessonData.modules[currentModIdx];
          const db = (mod.debugExercises || []).find((d) => d.id === dbId);
          if (!db) return;
          const uState = debugUserSelections[dbId] || { selectedLine: null, selectedPatch: null, checked: false };
          uState.checked = true;
          const isCorrect = uState.selectedLine === db.bugLine && uState.selectedPatch === db.correctPatch;
          if (window.CP_PROGRESS) {
            window.CP_PROGRESS.recordDebugSolved(lessonData.id, db.id, isCorrect);
          }
          renderBody();
          showToast(isCorrect ? 'Chúc mừng! Bạn đã sửa bug thành công.' : 'Chưa đúng, hãy thử kiểm tra lại!');
        });
      });

      // Quiz: Single-choice
      container.querySelectorAll('[data-quiz-single-opt]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const modId = btn.getAttribute('data-mod-id');
          const qIdx = Number(btn.getAttribute('data-q-idx'));
          const optIdx = Number(btn.getAttribute('data-quiz-single-opt'));
          const mod = lessonData.modules.find((m) => m.id === modId);
          const qItem = mod.quiz[qIdx];
          const isCorrect = optIdx === qItem.correct;
          if (window.CP_PROGRESS) {
            window.CP_PROGRESS.recordQuizAnswer(lessonData.id, modId, qIdx, optIdx, isCorrect);
          }
          renderBody();
        });
      });

      // Quiz: Multi-select Toggle
      container.querySelectorAll('[data-quiz-multi-opt]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const ansKey = btn.getAttribute('data-ans-key');
          const optIdx = Number(btn.getAttribute('data-quiz-multi-opt'));
          if (!multiQuizSelections[ansKey]) multiQuizSelections[ansKey] = new Set();
          if (multiQuizSelections[ansKey].has(optIdx)) {
            multiQuizSelections[ansKey].delete(optIdx);
          } else {
            multiQuizSelections[ansKey].add(optIdx);
          }
          renderBody();
        });
      });

      // Quiz: Multi-select Check
      container.querySelectorAll('[data-quiz-multi-check]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const ansKey = btn.getAttribute('data-quiz-multi-check');
          const modId = btn.getAttribute('data-mod-id');
          const qIdx = Number(btn.getAttribute('data-q-idx'));
          const mod = lessonData.modules.find((m) => m.id === modId);
          const qItem = mod.quiz[qIdx];
          const selectedArray = Array.from(multiQuizSelections[ansKey] || []).sort();
          const correctArray = Array.from(qItem.correct || []).sort();
          const isCorrect = selectedArray.length === correctArray.length && selectedArray.every((val, i) => val === correctArray[i]);
          if (window.CP_PROGRESS) {
            window.CP_PROGRESS.recordQuizAnswer(lessonData.id, modId, qIdx, selectedArray, isCorrect);
          }
          renderBody();
          showToast(isCorrect ? 'Chính xác toàn bộ các ý đúng!' : 'Chưa đúng, hãy đọc kĩ lại từng phương án!');
        });
      });

      // Practice Problems: Checkbox
      container.querySelectorAll('.prob-check').forEach((chk) => {
        chk.addEventListener('change', () => {
          const probId = chk.getAttribute('data-prob-id');
          if (window.CP_PROGRESS) {
            const state = window.CP_PROGRESS.toggleProblemSolved(lessonData.id, probId);
            showToast(state ? 'Đã đánh dấu hoàn thành bài tập!' : 'Đã bỏ đánh dấu hoàn thành!');
          }
        });
      });

      // Next / Prev Mod
      const prevEl = document.getElementById('btn-prev-mod');
      const nextEl = document.getElementById('btn-next-mod');
      if (prevEl) {
        prevEl.addEventListener('click', () => {
          currentModIdx--;
          renderBody();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      if (nextEl) {
        nextEl.addEventListener('click', () => {
          currentModIdx++;
          renderBody();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }

    // Gắn khung ban đầu
    rootEl.innerHTML = `
      ${renderHeader()}
      <main class="main-area">
        <div class="wrap" id="module-main"></div>
      </main>
      <div id="toast" class="toast"></div>
    `;

    // Nút Header Events
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn && window.CP_PROGRESS) {
      themeBtn.addEventListener('click', () => {
        window.CP_PROGRESS.toggleTheme();
        const p = window.CP_PROGRESS.loadProgress();
        const icon = p.theme === 'dark' ? window.CP_ICONS.sun : window.CP_ICONS.moon;
        themeBtn.innerHTML = `${icon} <span>${p.theme === 'dark' ? 'Chế độ Sáng' : 'Chế độ Tối'}</span>`;
      });
    }

    const bindFileBtn = document.getElementById('btn-bind-file');
    if (bindFileBtn && window.CP_PROGRESS) {
      bindFileBtn.addEventListener('click', async () => {
        const res = await window.CP_PROGRESS.bindAutoSaveFile();
        if (res.ok) {
          document.getElementById('auto-save-label').textContent = `Đã gắn: ${res.filename}`;
          showToast(`Đã liên kết tự động lưu vào file ${res.filename}!`);
        } else {
          showToast(res.reason || 'Không thể liên kết file.');
        }
      });
    }

    const exportBtn = document.getElementById('btn-export-json');
    if (exportBtn && window.CP_PROGRESS) {
      exportBtn.addEventListener('click', () => {
        window.CP_PROGRESS.exportProgressJson();
        showToast('Đã tải xuống file user_progress.json!');
      });
    }

    renderBody();
  }

  if (typeof window !== 'undefined') {
    window.initLecturePage = initLecturePage;
  }
})();
