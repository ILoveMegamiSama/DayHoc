/**
 * HỆ THỐNG QUẢN LÝ TIẾN TRÌNH HỌC TẬP VÀ AUTO-SAVE 2 TẦNG
 * Tầng 1: Tự động lưu tức thì vào localStorage['cp_dayhoc_progress_v1']
 * Tầng 2: Tự động ghi đè ngầm vào file user_progress.json (nằm trong .gitignore) qua File System Access API
 */
(function() {
  const STORAGE_KEY = 'cp_dayhoc_progress_v1';
  const IDB_DB_NAME = 'cp_dayhoc_idb';
  const IDB_STORE_NAME = 'handles';

  const defaultProgress = {
    version: 1,
    updatedAt: new Date().toISOString(),
    theme: 'dark',
    quizzes: {}, // { [lessonId_modId_qIdx]: { answer: number|number[], isCorrect: boolean } }
    debugs: {},  // { [lessonId_debugId]: boolean }
    problems: {}, // { [lessonId_probId]: boolean }
    modulesVisited: {} // { [lessonId_modId]: boolean }
  };

  let cachedProgress = null;
  let fileHandle = null;

  function getLocalStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage;
      }
    } catch {
      // Bị chặn bảo mật iframe / strict mode
    }
    return null;
  }

  function loadProgress() {
    if (cachedProgress) return cachedProgress;
    const ls = getLocalStorage();
    if (ls) {
      try {
        const raw = ls.getItem(STORAGE_KEY);
        if (raw) {
          cachedProgress = Object.assign({}, defaultProgress, JSON.parse(raw));
          return cachedProgress;
        }
      } catch (e) {
        console.warn('Lỗi đọc localStorage:', e);
      }
    }
    cachedProgress = JSON.parse(JSON.stringify(defaultProgress));
    return cachedProgress;
  }

  async function silentWriteToFile(data) {
    if (!fileHandle) return false;
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      return true;
    } catch (err) {
      console.warn('Không thể ghi file ngầm:', err);
      return false;
    }
  }

  async function saveProgress(partialUpdate = {}) {
    const current = loadProgress();
    const updated = Object.assign({}, current, partialUpdate, {
      updatedAt: new Date().toISOString()
    });
    cachedProgress = updated;

    // Tầng 1: Lưu vào localStorage
    const ls = getLocalStorage();
    if (ls) {
      try {
        ls.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Lỗi ghi localStorage:', e);
      }
    }

    // Tầng 2: Ghi file ngầm nếu đã liên kết
    if (fileHandle) {
      await silentWriteToFile(updated);
    }

    // Bắn event để các tab hoặc component UI cập nhật
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('cp-progress-updated', { detail: updated }));
    }
    return true;
  }

  function recordQuizAnswer(lessonId, modId, qIdx, answer, isCorrect) {
    const key = `${lessonId}_${modId}_${qIdx}`;
    const p = loadProgress();
    p.quizzes[key] = { answer, isCorrect };
    saveProgress({ quizzes: p.quizzes });
  }

  function recordDebugSolved(lessonId, debugId, isSolved) {
    const key = `${lessonId}_${debugId}`;
    const p = loadProgress();
    p.debugs[key] = !!isSolved;
    saveProgress({ debugs: p.debugs });
  }

  function toggleProblemSolved(lessonId, probId) {
    const key = `${lessonId}_${probId}`;
    const p = loadProgress();
    const nextState = !p.problems[key];
    p.problems[key] = nextState;
    saveProgress({ problems: p.problems });
    return nextState;
  }

  function getLessonSummary(lessonData) {
    const p = loadProgress();
    if (!lessonData) {
      return { quizCorrect: 0, quizTotal: 0, debugSolved: 0, debugTotal: 0, probSolved: 0, probTotal: 0, percent: 0 };
    }

    let quizCorrect = 0;
    let quizTotal = 0;
    (lessonData.modules || []).forEach((mod) => {
      (mod.quiz || []).forEach((qItem, qIdx) => {
        quizTotal++;
        const rec = p.quizzes[`${lessonData.id}_${mod.id}_${qIdx}`];
        if (rec && rec.isCorrect) quizCorrect++;
      });
    });

    let debugSolved = 0;
    let debugTotal = (lessonData.debugExercises || []).length;
    (lessonData.debugExercises || []).forEach((db) => {
      if (p.debugs[`${lessonData.id}_${db.id}`]) debugSolved++;
    });

    let probSolved = 0;
    let probTotal = (lessonData.practiceProblems || []).length;
    (lessonData.practiceProblems || []).forEach((pr) => {
      if (p.problems[`${lessonData.id}_${pr.id}`]) probSolved++;
    });

    const totalWeight = (quizTotal * 1) + (debugTotal * 2) + (probTotal * 2);
    const earnedWeight = (quizCorrect * 1) + (debugSolved * 2) + (probSolved * 2);
    const percent = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    return { quizCorrect, quizTotal, debugSolved, debugTotal, probSolved, probTotal, percent };
  }

  // Tầng 2: Liên kết với file user_progress.json trên ổ cứng
  async function bindAutoSaveFile() {
    if (typeof window === 'undefined' || !window.showSaveFilePicker) {
      return { ok: false, reason: 'Trình duyệt không hỗ trợ File System Access API. Bạn vẫn có thể dùng nút Xuất/Nạp file JSON bên cạnh.' };
    }
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'user_progress.json',
        types: [{
          description: 'JSON Progress File',
          accept: { 'application/json': ['.json'] }
        }]
      });
      fileHandle = handle;
      const current = loadProgress();
      await silentWriteToFile(current);
      return { ok: true, filename: handle.name || 'user_progress.json' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { ok: false, reason: 'Đã hủy chọn file.' };
      }
      return { ok: false, reason: err.message };
    }
  }

  function exportProgressJson() {
    if (typeof document === 'undefined') return;
    const data = loadProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importProgressJson(file) {
    return new Promise((resolve) => {
      if (!file) return resolve(false);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed && parsed.version) {
            await saveProgress(parsed);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }

  function applyTheme(themeName) {
    if (typeof document === 'undefined') return;
    const theme = themeName === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    const ls = getLocalStorage();
    if (ls) {
      try { ls.setItem('cp_dayhoc_theme', theme); } catch {}
    }
    const p = loadProgress();
    if (p.theme !== theme) {
      saveProgress({ theme });
    }
  }

  function toggleTheme() {
    const current = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    return next;
  }

  // Khởi động theme ban đầu
  if (typeof document !== 'undefined') {
    let initialTheme = 'dark';
    const ls = getLocalStorage();
    if (ls) {
      try {
        const storedTheme = ls.getItem('cp_dayhoc_theme');
        if (storedTheme) initialTheme = storedTheme;
        else {
          const p = loadProgress();
          if (p && p.theme) initialTheme = p.theme;
        }
      } catch {}
    }
    applyTheme(initialTheme);
  }

  const CP_PROGRESS = {
    loadProgress,
    saveProgress,
    recordQuizAnswer,
    recordDebugSolved,
    toggleProblemSolved,
    getLessonSummary,
    bindAutoSaveFile,
    exportProgressJson,
    importProgressJson,
    applyTheme,
    toggleTheme
  };

  if (typeof window !== 'undefined') {
    window.CP_PROGRESS = CP_PROGRESS;
  }
})();
