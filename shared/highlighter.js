/**
 * BỘ TÔ MÀU CÚ PHÁP C++14 VÀ INLINE CODE DÙNG CHUNG
 * Hỗ trợ tô màu chuẩn IDE tối sâu, đánh số dòng, làm nổi bật dòng thay đổi (changedLines).
 */
(function() {
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlightCppLine(rawLine) {
    const cmtIdx = rawLine.indexOf('//');
    let codePart = cmtIdx >= 0 ? rawLine.slice(0, cmtIdx) : rawLine;
    const cmtPart = cmtIdx >= 0 ? rawLine.slice(cmtIdx) : '';

    if (/^\s*#/.test(codePart)) {
      const escapedMacro = escapeHtml(codePart);
      const escapedCmt = cmtPart ? `<span class="hl-cmt">${escapeHtml(cmtPart)}</span>` : '';
      return `<span class="hl-macro">${escapedMacro}</span>${escapedCmt}`;
    }

    const tokens = [];
    let tokenized = codePart.replace(/"([^"\\]|\\.)*"/g, (m) => {
      const id = `@@STR_${tokens.length}@@`;
      tokens.push(`<span class="hl-str">${escapeHtml(m)}</span>`);
      return id;
    });

    tokenized = escapeHtml(tokenized);

    // Keywords
    tokenized = tokenized.replace(
      /\b(using|namespace|std|return|for|while|if|else|const|auto|void|break|continue|exit|true|false|struct|class|public|private)\b/g,
      '<span class="hl-kw">$1</span>'
    );

    // Types
    tokenized = tokenized.replace(
      /\b(int|long|long\s+long|bool|char|string|vector|stack|queue|deque|pair|map|set|ifstream|ofstream|NULL|size_t)\b/g,
      '<span class="hl-type">$1</span>'
    );

    // Functions
    tokenized = tokenized.replace(
      /\b(main|push|pop|top|front|back|empty|size|clear|push_back|pop_back|push_front|pop_front|sort|swap|max|min|lower_bound|upper_bound|cout|cin|printf|scanf|assert)\b(?=\s*\()/g,
      '<span class="hl-fn">$1</span>'
    );

    // Numbers
    tokenized = tokenized.replace(/\b(\d+(?:LL|ULL)?)\b/g, '<span class="hl-num">$1</span>');

    tokens.forEach((htmlSpan, idx) => {
      tokenized = tokenized.replace(`@@STR_${idx}@@`, htmlSpan);
    });

    const renderedCmt = cmtPart ? `<span class="hl-cmt">${escapeHtml(cmtPart)}</span>` : '';
    return tokenized + renderedCmt;
  }

  function highlightCpp(rawCode, changedLines = []) {
    const changedSet = new Set(changedLines || []);
    const lines = String(rawCode || '').split('\n');
    return lines
      .map((line, idx) => {
        const lineNo = idx + 1;
        const isChanged = changedSet.has(lineNo);
        const cls = isChanged ? 'code-line hl-changed' : 'code-line';
        return `<span class="${cls}"><span class="line-no">${lineNo}</span>${highlightCppLine(line)}</span>`;
      })
      .join('\n');
  }

  function highlightInlineCodeSnippet(codeHtml) {
    let s = String(codeHtml || '');
    const tokens = [];
    function addToken(html) {
      const id = `__INL_TOK_${tokens.length}__`;
      tokens.push(html);
      return id;
    }

    // 1. Strings
    s = s.replace(/"([^"]*)"/g, (m) => addToken(`<span class="hl-str">${m}</span>`));
    s = s.replace(/'([^']*)'/g, (m) => addToken(`<span class="hl-str">${m}</span>`));

    // 2. Flags
    s = s.replace(/(^|[\s(])(-[a-zA-Z0-9_\-\+]+)\b/g, (m, p1, p2) => p1 + addToken(`<span class="hl-flag">${p2}</span>`));

    // 3. Types
    s = s.replace(/\b(long\s+long|int|long|bool|char|string|vector|stack|queue|deque|pair|cin|cout)\b/g, (m) => addToken(`<span class="hl-type">${m}</span>`));

    // 4. Keywords
    s = s.replace(/\b(return|for|while|if|else|using|namespace|std|auto|const|void|break|continue|true|false)\b/g, (m) => addToken(`<span class="hl-kw">${m}</span>`));

    // 5. Functions
    s = s.replace(/\b(push|pop|top|front|back|empty|size|sort|swap|max|min|main|assert)\b(?=\s*\()/g, (m) => addToken(`<span class="hl-fn">${m}</span>`));

    // 6. Numbers
    s = s.replace(/\b(\d+(?:LL)?)\b/g, (m) => addToken(`<span class="hl-num">${m}</span>`));

    for (let i = 0; i < tokens.length; i++) {
      s = s.replace(`__INL_TOK_${i}__`, tokens[i]);
    }
    return s;
  }

  function highlightAllInlineCode(root) {
    if (typeof document === 'undefined') return;
    const container = root || document.body;
    if (!container) return;
    const inlineCodes = container.querySelectorAll(
      'p code, li code, td code, th code, .analogy-box code, .concept-card code, .step-life code, .step-code code, .step-term code, .quiz-card code, .debug-card code'
    );
    inlineCodes.forEach((el) => {
      if (el.closest('pre')) return;
      el.innerHTML = highlightInlineCodeSnippet(el.innerHTML);
    });
  }

  if (typeof window !== 'undefined') {
    window.highlightCpp = highlightCpp;
    window.highlightCppLine = highlightCppLine;
    window.highlightInlineCodeSnippet = highlightInlineCodeSnippet;
    window.highlightAllInlineCode = highlightAllInlineCode;
  }
})();
