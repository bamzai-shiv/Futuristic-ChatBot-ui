const thread = document.getElementById('chat-thread');
const input = document.getElementById('userInput');
const rail = document.getElementById('preview-rail');
let currentImg = null;

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

function previewImg() {
    const file = document.getElementById('imgInp').files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImg = e.target.result;
        rail.innerHTML = `<img src="${currentImg}" style="width:60px; height:60px; border-radius:10px; border:1px solid var(--accent);">`;
    };
    reader.readAsDataURL(file);
}

function send() {
    const val = input.value.trim();
    if (!val && !currentImg) return;

    let msg = `<div class="msg-row" style="justify-content: flex-end;"><div class="bubble" style="background:var(--accent); color:black;">`;
    if (currentImg) msg += `<img src="${currentImg}" style="width:100%; border-radius:12px; margin-bottom:10px;"><br>`;
    msg += `${val}</div></div>`;

    thread.insertAdjacentHTML('beforeend', msg);
    input.value = ""; rail.innerHTML = ""; currentImg = null;
    thread.scrollTop = thread.scrollHeight;

    setTimeout(() => {
        thread.insertAdjacentHTML('beforeend', `<div class="msg-row"><div class="bubble">Heuristic analysis complete. Processing multi-modal input... Done.</div></div>`);
        thread.scrollTop = thread.scrollHeight;
    }, 1000);
}
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') send(); });