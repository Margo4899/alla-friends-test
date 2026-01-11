const CORRECT_LOGIN = "chosenone";
const CORRECT_PASS  = "kabachok2026";

let tries = Number(localStorage.getItem("tries") || 0);
let antiCheat = false;

function auth() {
  const l = document.getElementById("loginInput").value;
  const p = document.getElementById("passInput").value;

  if (l === CORRECT_LOGIN && p === CORRECT_PASS) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    statusMsg("Система инициализируется…");
  } else {
    document.getElementById("error").innerText =
      "❌ Доступ отклонён. Кабачки не подтверждают личность.";
  }
}

function statusMsg(text) {
  document.getElementById("status").innerText = text;
}

function attemptWin() {
  tries++;
  localStorage.setItem("tries", tries);

  antiCheat = false;
  let prog = 0;
  const bar = document.getElementById("progress");

  statusMsg("Анализ вероятности успеха…");

  const timer = setInterval(() => {
    prog += Math.random() * 8;
    if (prog > 99.6) prog = 99.6;
    bar.style.width = prog + "%";

    if (prog > 95 && !antiCheat) {
      antiCheat = true;
      statusMsg("⚠️ Античит Аллы проверяет честность…");
    }

    if (prog >= 99.6) {
      clearInterval(timer);
      fakeWin();
    }
  }, 120);
}

function fakeWin() {
  statusMsg("✅ ПОБЕДА ПОДТВЕРЖДЕНА");

  setTimeout(() => {
    statusMsg("❌ Ошибка сервера. Победа аннулирована.");
    alert(
      "ПОРАЖЕНИЕ\n\n" +
      "Система выявила статистически невозможный результат.\n\n" +
      "За победу Алла примет вас в друзья."
    );
    document.getElementById("progress").style.width = "0%";
    pressureText();
  }, 700);
}

function pressureText() {
  const lines = [
    "Кабачки разочарованы.",
    "Вероятность успеха была близка.",
    "Попробуйте ещё раз.",
    "Алла ожидает достойного кандидата.",
    "Вы почти убедили систему."
  ];

  if (tries > 5) lines.push("Вы возвращаетесь слишком уверенно.");
  if (tries > 10) lines.push("Система вас узнаёт.");
  if (tries > 20) lines.push("Это испытание затягивается.");

  statusMsg(lines[Math.floor(Math.random() * lines.length)]);
}
