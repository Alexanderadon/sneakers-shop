import React from "react";

const PHONE = "77001234567"; // плейсхолдер
const MANAGER = "Айгерим";
const MANAGER_ROLE = "менеджер магазина";

const FAQ = [
  "Есть мой размер?",
  "Как с доставкой?",
  "Это оригинал?",
  "Можно вернуть?",
];

function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const sendWA = () => {
    const text = message.trim() || "Здравствуйте! Подскажите по кроссовкам.";
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className={"chat" + (open ? " chat--open" : "")}>
      {open && (
        <div className="chat__panel" role="dialog" aria-label="Чат с менеджером">
          <div className="chat__header">
            <div className="chat__avatar-wrap">
              <div className="chat__avatar" aria-hidden="true">А</div>
              <span className="chat__dot" aria-label="онлайн" />
            </div>
            <div className="chat__who">
              <div className="chat__name">{MANAGER}</div>
              <div className="chat__role">{MANAGER_ROLE} · онлайн</div>
            </div>
            <button
              type="button"
              className="chat__close"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="chat__body">
            <div className="chat__bubble">
              Здравствуйте, чем вам <span className="chat__nowrap">помочь?&nbsp;👋</span>
            </div>

            <div className="chat__faq-label">Частые вопросы</div>
            <div className="chat__faq">
              {FAQ.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chat__chip"
                  onClick={() => setMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="chat__compose">
            <input
              type="text"
              className="chat__input"
              placeholder="Напишите сообщение…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendWA()}
            />
            <button type="button" className="chat__send" onClick={sendWA}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 4L3 11l7 3 3 7 8-17z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <a
            href={`https://wa.me/${PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chat__wa"
          >
            Перейти в WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        className="chat__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Свернуть чат" : "Открыть чат с менеджером"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12c0 4.4-4 8-9 8-1.2 0-2.4-.2-3.5-.6L3 21l1.7-5C3.6 14.7 3 13.4 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"
              stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
