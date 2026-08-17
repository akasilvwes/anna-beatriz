/* ============================================================
   ANNA BEATRIZ
   Uma história que não existia até você chegar.

   Experiência:
   - Cinema anos 50/60
   - Preto e branco
   - Canvas generativo
   - Iluminação interativa
   - Desktop + iPhone
   - Sistema de cenas
============================================================ */


/* ============================================================
   ELEMENTOS
============================================================ */

const experience = document.getElementById("experience");
const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d", {
    alpha: true
});

const introScreen = document.getElementById("intro-screen");
const introDot = document.getElementById("intro-dot");
const introMessage = document.getElementById("intro-message");

const startButton = document.getElementById("start-button");

const story = document.getElementById("story");
const sceneContainer = document.getElementById("scene-container");

const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

const continueHint = document.getElementById("continue-hint");

const currentCounter = document.getElementById("scene-current");
const totalCounter = document.getElementById("scene-total");

const music = document.getElementById("music");
const soundButton = document.getElementById("sound-button");


/* ============================================================
   ESTADO
============================================================ */

const state = {

    started: false,

    currentScene: -1,

    transitioning: false,

    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    touchActive: false,

    audioStarted: false,

    audioEnabled: true,

    width: window.innerWidth,

    height: window.innerHeight,

    dpr: 1,

    time: 0,

    lastFrame: 0,

    quality: "high",

    intensity: 0,

    targetIntensity: 0
};


/* ============================================================
   CENAS

   IMPORTANTE:

   03/03 = PRIMEIRA VEZ QUE VI ANNA.

   16/04 = PRIMEIRO ENCONTRO.

   São acontecimentos diferentes.
============================================================ */

const scenes = [

    {
        id: "first-glimpse",

        date: "03.03",

        style: "origin",

        duration: 6000,

        intensity: 0.12,

        title: "03.03",

        copy:
            "Antes de existir qualquer história, existiu um instante.",

        background: "origin"
    },

    {
        id: "first-sight",

        date: "",

        style: "memory",

        duration: 6000,

        intensity: 0.22,

        title: "Foi quando eu vi você.",

        copy:
            "Eu ainda não sabia o que aquele momento significaria. Só sei que alguma coisa ficou na memória.",

        background: "first-sight"
    },

    {
        id: "red-hair",

        date: "",

        style: "quiet",

        duration: 6500,

        intensity: 0.32,

        title: "E havia um detalhe impossível de ignorar.",

        copy:
            "Seu cabelo ruivo. Talvez porque algumas coisas simplesmente encontram um jeito de permanecer na lembrança.",

        background: "hair"
    },

    {
        id: "space-between",

        date: "",

        style: "quiet",

        duration: 5500,

        intensity: 0.28,

        title: "Depois disso, a vida continuou.",

        copy:
            "Sem pressa. Sem saber ainda onde aquela história poderia chegar.",

        background: "space"
    },

    {
        id: "first-date",

        date: "16.04",

        style: "date",

        duration: 7000,

        intensity: 0.48,

        title: "16.04",

        copy:
            "Não foi a primeira vez que eu tinha visto você. Foi a primeira vez que saímos juntos.",

        background: "meeting"
    },

    {
        id: "meeting",

        date: "",

        style: "memory",

        duration: 6500,

        intensity: 0.55,

        title: "E foi diferente.",

        copy:
            "Porque algumas pessoas a gente conhece. Outras, aos poucos, começa a descobrir.",

        background: "meeting-soft"
    },

    {
        id: "becoming",

        date: "",

        style: "quiet",

        duration: 6500,

        intensity: 0.60,

        title: "A história começou a ganhar movimento.",

        copy:
            "Conversas, risadas, pequenos momentos. Nada precisava ser grandioso para se tornar importante.",

        background: "flow"
    },

    {
        id: "little-things",

        date: "",

        style: "memory",

        duration: 6500,

        intensity: 0.62,

        title: "E talvez seja isso que eu mais gosto.",

        copy:
            "As coisas que não foram planejadas. Os momentos que simplesmente aconteceram e, de alguma forma, ficaram.",

        background: "memory"
    },

    {
        id: "ten",

        date: "",

        style: "quiet",

        duration: 6500,

        intensity: 0.68,

        title: "Sem perceber...",

        copy:
            "você deixou de ser apenas uma pessoa que eu conheci e passou a fazer parte dos meus pensamentos.",

        background: "connection"
    },

    {
        id: "anna",

        date: "",

        style: "quiet",

        duration: 7000,

        intensity: 0.50,

        title: "Anna.",

        copy:
            "Existe uma diferença entre lembrar de alguém e sentir vontade de continuar descobrindo essa pessoa.",

        background: "anna"
    },

    {
        id: "admiration",

        date: "",

        style: "letter",

        duration: 8500,

        intensity: 0.38,

        title: "Eu admiro você.",

        copy:
            "Pelo jeito como você enxerga a vida, pela forma como segue aquilo em que acredita e pela pessoa que escolhe ser mesmo quando ninguém está olhando.",

        background: "quiet"
    },

    {
        id: "dreams",

        date: "",

        style: "quiet",

        duration: 7500,

        intensity: 0.72,

        title: "E existem coisas que eu desejo para você.",

        copy:
            "Que todos os caminhos que ainda parecem distantes um dia se tornem caminhos possíveis. Que seus sonhos encontrem espaço para acontecer.",

        background: "dreams"
    },

    {
        id: "future",

        date: "",

        style: "memory",

        duration: 7500,

        intensity: 0.80,

        title: "O futuro ainda não foi escrito.",

        copy:
            "E talvez essa seja a parte mais bonita. Ainda existem lugares onde nunca fomos, histórias que nunca contamos e momentos que ainda nem imaginamos.",

        background: "future"
    },

    {
        id: "love",

        date: "",

        style: "letter",

        duration: 8000,

        intensity: 0.25,

        title: "Anna...",

        copy:
            "Eu só quero que você saiba que, entre tantas coisas que a vida poderia ter colocado no meu caminho, conhecer você foi uma das que eu mais quero continuar vivendo.<br><br>Eu amo você.",

        background: "love"
    },

    {
        id: "birthday",

        date: "25.08",

        style: "date",

        duration: 8500,

        intensity: 0.92,

        title: "25.08",

        copy:
            "Hoje o calendário marca o seu dia.<br><br>Mas para mim, é uma lembrança de que o mundo ficou um pouco mais bonito no dia em que você nasceu.",

        background: "birthday"
    },

    {
        id: "final",

        date: "",

        style: "final",

        duration: Infinity,

        intensity: 0,

        title: "Anna Beatriz",

        copy: "",

        background: "final"
    }

];


/* ============================================================
   CONTADOR
============================================================ */

totalCounter.textContent =
    String(scenes.length).padStart(2, "0");


/* ============================================================
   CANVAS — QUALIDADE
============================================================ */

function detectQuality() {

    const mobile =
        window.matchMedia("(max-width: 700px)").matches;

    const lowPower =
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency <= 4;

    if (mobile || lowPower) {
        state.quality = "medium";
    } else {
        state.quality = "high";
    }
}


/* ============================================================
   RESIZE CANVAS
============================================================ */

function resizeCanvas() {

    state.width = window.innerWidth;
    state.height = window.innerHeight;

    const maxDpr =
        state.quality === "high" ? 1.8 : 1.35;

    state.dpr =
        Math.min(
            window.devicePixelRatio || 1,
            maxDpr
        );

    canvas.width =
        Math.floor(
            state.width * state.dpr
        );

    canvas.height =
        Math.floor(
            state.height * state.dpr
        );

    canvas.style.width =
        `${state.width}px`;

    canvas.style.height =
        `${state.height}px`;

    ctx.setTransform(
        state.dpr,
        0,
        0,
        state.dpr,
        0,
        0
    );
}


/* ============================================================
   POINTER
============================================================ */

function updatePointer(x, y) {

    state.targetX = x;
    state.targetY = y;

    experience.style.setProperty(
        "--mouse-x",
        `${x}px`
    );

    experience.style.setProperty(
        "--mouse-y",
        `${y}px`
    );
}


/* ============================================================
   MOUSE
============================================================ */

window.addEventListener(
    "pointermove",
    event => {

        updatePointer(
            event.clientX,
            event.clientY
        );
    },
    { passive: true }
);


/* ============================================================
   TOUCH
============================================================ */

window.addEventListener(
    "touchstart",
    event => {

        if (!event.touches.length) return;

        state.touchActive = true;

        const touch = event.touches[0];

        updatePointer(
            touch.clientX,
            touch.clientY
        );

    },
    { passive: true }
);


window.addEventListener(
    "touchmove",
    event => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        updatePointer(
            touch.clientX,
            touch.clientY
        );

    },
    { passive: true }
);


/* ============================================================
   SUAVIZAÇÃO DO CURSOR
============================================================ */

function smoothPointer() {

    state.mouseX +=
        (state.targetX - state.mouseX) * 0.12;

    state.mouseY +=
        (state.targetY - state.mouseY) * 0.12;

    requestAnimationFrame(
        smoothPointer
    );
}

smoothPointer();


/* ============================================================
   CANVAS — ELEMENTOS
============================================================ */

const particles = [];

const flowingLines = [];

const maxParticles =
    state.quality === "high" ? 85 : 42;


/* ============================================================
   PARTICULAS
============================================================ */

function createParticles() {

    particles.length = 0;

    for (
        let i = 0;
        i < maxParticles;
        i++
    ) {

        particles.push({

            x: Math.random() * state.width,

            y: Math.random() * state.height,

            vx: (Math.random() - 0.5) * 0.15,

            vy: (Math.random() - 0.5) * 0.15,

            size:
                Math.random() *
                1.5 +
                0.25,

            phase:
                Math.random() *
                Math.PI *
                2,

            depth:
                Math.random()

        });
    }
}


/* ============================================================
   LINHAS
============================================================ */

function createLines() {

    flowingLines.length = 0;

    const amount =
        state.quality === "high" ? 9 : 5;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        flowingLines.push({

            offset:
                Math.random() * 1000,

            speed:
                0.00015 +
                Math.random() * 0.00025,

            amplitude:
                20 +
                Math.random() * 70,

            frequency:
                0.001 +
                Math.random() * 0.002,

            alpha:
                0.025 +
                Math.random() * 0.045

        });
    }
}


/* ============================================================
   FUNDO — LIMPAR
============================================================ */

function clearCanvas() {

    ctx.fillStyle = "#050505";

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );
}


/* ============================================================
   FUNDO — ATMOSFERA
============================================================ */

function drawAtmosphere() {

    const gradient =
        ctx.createRadialGradient(
            state.mouseX,
            state.mouseY,
            0,
            state.mouseX,
            state.mouseY,
            Math.max(
                state.width,
                state.height
            ) * 0.7
        );

    const light =
        0.025 +
        state.intensity * 0.045;

    gradient.addColorStop(
        0,
        `rgba(255,255,255,${light})`
    );

    gradient.addColorStop(
        0.35,
        "rgba(255,255,255,0.008)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );
}


/* ============================================================
   CAMPO MAGNÉTICO
============================================================ */

function drawMagneticField() {

    const influence =
        Math.min(
            1,
            state.intensity * 1.4
        );

    for (const p of particles) {

        const dx =
            state.mouseX - p.x;

        const dy =
            state.mouseY - p.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if (distance < 280) {

            const force =
                (1 - distance / 280) *
                0.025 *
                influence;

            p.vx += dx * force * 0.001;
            p.vy += dy * force * 0.001;
        }
    }
}


/* ============================================================
   PARTICULAS
============================================================ */

function drawParticles(time) {

    for (const p of particles) {

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < -20) p.x = state.width + 20;
        if (p.x > state.width + 20) p.x = -20;

        if (p.y < -20) p.y = state.height + 20;
        if (p.y > state.height + 20) p.y = -20;

        const pulse =
            0.5 +
            Math.sin(
                time * 0.001 +
                p.phase
            ) * 0.5;

        const alpha =
            (0.04 + pulse * 0.06) *
            state.intensity;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size * (0.6 + pulse * 0.6),
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.fill();
    }
}


/* ============================================================
   LINHAS FLUIDAS
============================================================ */

function drawFlowingLines(time) {

    for (const line of flowingLines) {

        ctx.beginPath();

        const step =
            state.quality === "high"
                ? 18
                : 28;

        for (
            let x = -40;
            x <= state.width + 40;
            x += step
        ) {

            const y =
                state.height * 0.5 +

                Math.sin(
                    x * line.frequency +
                    time * line.speed +
                    line.offset
                ) *
                line.amplitude *

                state.intensity +

                Math.sin(
                    x * 0.0008 +
                    time * 0.0003
                ) *
                30 *
                state.intensity;

            if (x === -40) {

                ctx.moveTo(x, y);

            } else {

                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle =
            `rgba(255,255,255,${line.alpha * state.intensity})`;

        ctx.lineWidth = 0.6;

        ctx.stroke();
    }
}


/* ============================================================
   FUNDO DE CADA MOMENTO
============================================================ */

function drawSceneEnvironment(
    type,
    time
) {

    if (type === "origin") {

        drawOrigin(time);

    } else if (type === "first-sight") {

        drawFirstSight(time);

    } else if (type === "hair") {

        drawHair(time);

    } else if (type === "space") {

        drawSpace(time);

    } else if (type === "meeting") {

        drawMeeting(time);

    } else if (type === "meeting-soft") {

        drawMeetingSoft(time);

    } else if (type === "flow") {

        drawFlow(time);

    } else if (type === "memory") {

        drawMemory(time);

    } else if (type === "connection") {

        drawConnection(time);

    } else if (type === "anna") {

        drawAnna(time);

    } else if (type === "quiet") {

        drawQuiet(time);

    } else if (type === "dreams") {

        drawDreams(time);

    } else if (type === "future") {

        drawFuture(time);

    } else if (type === "love") {

        drawLove(time);

    } else if (type === "birthday") {

        drawBirthday(time);

    } else if (type === "final") {

        drawFinal(time);
    }
}


/* ============================================================
   03/03 — UM ÚNICO PONTO
============================================================ */

function drawOrigin(time) {

    const pulse =
        1 +
        Math.sin(time * 0.002) * 0.18;

    const x =
        state.width * 0.5;

    const y =
        state.height * 0.5;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        2.2 * pulse,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(255,255,255,0.8)";

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        45 * pulse,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.025)";

    ctx.stroke();
}


/* ============================================================
   PRIMEIRA VISÃO
============================================================ */

function drawFirstSight(time) {

    const x =
        state.width * 0.5 +
        Math.sin(time * 0.00025) *
        80;

    const y =
        state.height * 0.5;

    ctx.beginPath();

    ctx.moveTo(x - 100, y);

    ctx.lineTo(x + 100, y);

    ctx.strokeStyle =
        "rgba(255,255,255,0.06)";

    ctx.lineWidth = 0.7;

    ctx.stroke();

    drawParticles(time);
}


/* ============================================================
   CABELO — ÚNICA VEZ
============================================================ */

function drawHair(time) {

    for (let i = 0; i < 7; i++) {

        ctx.beginPath();

        for (
            let x = -50;
            x <= state.width + 50;
            x += 20
        ) {

            const y =
                state.height * 0.5 +

                Math.sin(
                    x * 0.006 +
                    time * 0.0006 +
                    i
                ) *
                (40 + i * 8) +

                i * 8;

            if (x === -50) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle =
            `rgba(255,255,255,${0.025 + i * 0.006})`;

        ctx.lineWidth = 0.8;

        ctx.stroke();
    }
}


/* ============================================================
   ESPAÇO
============================================================ */

function drawSpace(time) {

    drawParticles(time);

    const x =
        state.width * 0.5;

    ctx.beginPath();

    ctx.moveTo(
        x,
        state.height * 0.15
    );

    ctx.lineTo(
        x,
        state.height * 0.85
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.018)";

    ctx.stroke();
}


/* ============================================================
   ENCONTRO
============================================================ */

function drawMeeting(time) {

    const center =
        state.width * 0.5;

    const separation =
        100;

    const leftX =
        center -
        separation;

    const rightX =
        center +
        separation;

    const wave =
        Math.sin(time * 0.0006) * 20;

    ctx.beginPath();

    ctx.moveTo(
        leftX,
        state.height * 0.25
    );

    ctx.bezierCurveTo(
        leftX + wave,
        state.height * 0.4,
        center - 30,
        state.height * 0.55,
        center,
        state.height * 0.5
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.12)";

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        rightX,
        state.height * 0.75
    );

    ctx.bezierCurveTo(
        rightX - wave,
        state.height * 0.6,
        center + 30,
        state.height * 0.45,
        center,
        state.height * 0.5
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.12)";

    ctx.stroke();
}


/* ============================================================
   ENCONTRO SUAVE
============================================================ */

function drawMeetingSoft(time) {

    const r =
        130 +
        Math.sin(time * 0.0003) *
        20;

    ctx.beginPath();

    ctx.arc(
        state.width * 0.5,
        state.height * 0.5,
        r,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.035)";

    ctx.stroke();

    drawParticles(time);
}


/* ============================================================
   FLUXO
============================================================ */

function drawFlow(time) {

    drawFlowingLines(time);

    drawParticles(time);
}


/* ============================================================
   MEMÓRIA
============================================================ */

function drawMemory(time) {

    drawParticles(time);

    const x =
        state.width * 0.5 +
        Math.sin(time * 0.0002) * 120;

    ctx.beginPath();

    ctx.arc(
        x,
        state.height * 0.5,
        90,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.025)";

    ctx.stroke();
}


/* ============================================================
   CONEXÃO
============================================================ */

function drawConnection(time) {

    drawFlowingLines(time);

    const dx =
        state.mouseX -
        state.width * 0.5;

    const dy =
        state.mouseY -
        state.height * 0.5;

    ctx.beginPath();

    ctx.moveTo(
        state.width * 0.5,
        state.height * 0.5
    );

    ctx.lineTo(
        state.width * 0.5 + dx * 0.2,
        state.height * 0.5 + dy * 0.2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.08)";

    ctx.stroke();
}


/* ============================================================
   ANNA
============================================================ */

function drawAnna(time) {

    const radius =
        80 +
        Math.sin(time * 0.0005) *
        10;

    const gradient =
        ctx.createRadialGradient(
            state.width * 0.5,
            state.height * 0.5,
            0,
            state.width * 0.5,
            state.height * 0.5,
            radius
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.055)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );
}


/* ============================================================
   QUIETO
============================================================ */

function drawQuiet(time) {

    const gradient =
        ctx.createRadialGradient(
            state.width * 0.5,
            state.height * 0.5,
            0,
            state.width * 0.5,
            state.height * 0.5,
            350
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.025)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );
}


/* ============================================================
   SONHOS
============================================================ */

function drawDreams(time) {

    drawParticles(time);

    for (let i = 0; i < 5; i++) {

        const radius =
            50 +
            i * 70 +
            Math.sin(
                time * 0.0002 + i
            ) * 20;

        ctx.beginPath();

        ctx.arc(
            state.width * 0.5,
            state.height * 0.5,
            radius,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            `rgba(255,255,255,${0.018 + i * 0.006})`;

        ctx.stroke();
    }
}


/* ============================================================
   FUTURO
============================================================ */

function drawFuture(time) {

    drawFlowingLines(time);

    for (let i = 0; i < 6; i++) {

        const angle =
            time * 0.0001 +
            i;

        const radius =
            80 +
            i * 60;

        const x =
            state.width * 0.5 +
            Math.cos(angle) *
            radius;

        const y =
            state.height * 0.5 +
            Math.sin(angle) *
            radius;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,255,255,0.18)";

        ctx.fill();
    }
}


/* ============================================================
   AMOR
============================================================ */

function drawLove(time) {

    const glow =
        0.035 +
        Math.sin(time * 0.0004) *
        0.01;

    const gradient =
        ctx.createRadialGradient(
            state.width * 0.5,
            state.height * 0.5,
            0,
            state.width * 0.5,
            state.height * 0.5,
            250
        );

    gradient.addColorStop(
        0,
        `rgba(255,255,255,${glow})`
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );
}


/* ============================================================
   ANIVERSÁRIO
============================================================ */

function drawBirthday(time) {

    const progress =
        Math.min(
            1,
            (time % 10000) / 10000
        );

    const centerY =
        state.height *
        (0.62 - progress * 0.12);

    const gradient =
        ctx.createRadialGradient(
            state.width * 0.5,
            centerY,
            0,
            state.width * 0.5,
            centerY,
            state.height * 0.9
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.09)"
    );

    gradient.addColorStop(
        0.35,
        "rgba(255,255,255,0.025)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );

    drawParticles(time);
}


/* ============================================================
   FINAL
============================================================ */

function drawFinal() {

    // O universo desapareceu.
    // Nenhuma decoração.
}


/* ============================================================
   RENDER
============================================================ */

function render(time) {

    state.time = time;

    const delta =
        time - state.lastFrame;

    state.lastFrame = time;

    state.intensity +=
        (state.targetIntensity - state.intensity) *
        0.025;

    clearCanvas();

    drawAtmosphere();

    if (state.started) {

        drawMagneticField();

        const scene =
            scenes[state.currentScene];

        if (scene) {

            drawSceneEnvironment(
                scene.background,
                time
            );
        }
    }

    requestAnimationFrame(render);
}


/* ============================================================
   CRIAR CENA HTML
============================================================ */

function createSceneElement(
    scene,
    index
) {

    const element =
        document.createElement("article");

    element.className = "scene";

    element.dataset.id =
        scene.id;

    element.dataset.style =
        scene.style;

    element.dataset.index =
        index;

    element.innerHTML = `

        <div class="scene-inner">

            ${
                scene.date
                    ? `<div class="scene-date">${scene.date}</div>`
                    : ""
            }

            ${
                scene.id === "final"

                    ? `
                        <div class="final-name">
                            Anna Beatriz.
                        </div>

                        <div class="final-title">
                            PARABÉNS, MINHA PRINCESA.
                        </div>

                        <div class="final-author">
                            Com amor,<br>
                            Wesley.
                        </div>
                    `

                    : `
                        <h1 class="scene-title">
                            ${scene.title}
                        </h1>

                        ${
                            scene.copy
                                ? `
                                    <div class="scene-copy">
                                        ${scene.copy}
                                    </div>
                                `
                                : ""
                        }
                    `
            }

        </div>
    `;

    return element;
}


/* ============================================================
   MONTAR TODAS AS CENAS
============================================================ */

function buildScenes() {

    sceneContainer.innerHTML = "";

    scenes.forEach(
        (scene, index) => {

            sceneContainer.appendChild(
                createSceneElement(
                    scene,
                    index
                )
            );
        }
    );
}


/* ============================================================
   MOSTRAR CENA
============================================================ */

function showScene(
    index,
    direction = 1
) {

    if (
        index < 0 ||
        index >= scenes.length
    ) {
        return;
    }

    if (state.transitioning) {
        return;
    }

    state.transitioning = true;

    const allScenes =
        [...sceneContainer.children];

    const previous =
        allScenes[state.currentScene];

    const next =
        allScenes[index];

    if (previous && previous !== next) {

        previous.classList.remove("active");

        previous.classList.add(
            direction > 0
                ? "exit-left"
                : "exit-right"
        );

        setTimeout(
            () => {
                previous.classList.remove(
                    "exit-left",
                    "exit-right"
                );
            },
            1000
        );
    }

    state.currentScene = index;

    const scene =
        scenes[index];

    state.targetIntensity =
        scene.intensity;

    currentCounter.textContent =
        String(index + 1).padStart(2, "0");

    if (index === 0) {

        backButton.classList.remove(
            "visible"
        );

    } else {

        backButton.classList.add(
            "visible"
        );
    }

    if (index === scenes.length - 1) {

        continueHint.classList.add(
            "hidden"
        );

        nextButton.style.opacity = "0";

        nextButton.style.pointerEvents =
            "none";

    } else {

        continueHint.classList.remove(
            "hidden"
        );

        nextButton.style.opacity = "1";

        nextButton.style.pointerEvents =
            "auto";
    }

    requestAnimationFrame(
        () => {

            next.classList.add("active");

            setTimeout(
                () => {

                    state.transitioning =
                        false;

                },
                850
            );
        }
    );

    updateMusic(index);
}


/* ============================================================
   PRÓXIMA CENA
============================================================ */

function nextScene() {

    if (
        !state.started ||
        state.transitioning
    ) {
        return;
    }

    if (
        state.currentScene >=
        scenes.length - 1
    ) {
        return;
    }

    showScene(
        state.currentScene + 1,
        1
    );
}


/* ============================================================
   CENA ANTERIOR
============================================================ */

function previousScene() {

    if (
        !state.started ||
        state.transitioning
    ) {
        return;
    }

    if (state.currentScene <= 0) {
        return;
    }

    showScene(
        state.currentScene - 1,
        -1
    );
}


/* ============================================================
   CLIQUE / TOQUE NA EXPERIÊNCIA

   Qualquer lugar livre avança.

   EXCEÇÕES:
   - botão próximo
   - botão voltar
   - botão som
============================================================ */

experience.addEventListener(
    "pointerup",
    event => {

        if (!state.started) {
            return;
        }

        const interactive =
            event.target.closest(
                "button, a, input"
            );

        if (interactive) {
            return;
        }

        nextScene();
    }
);


/* ============================================================
   BOTÃO PRÓXIMO
============================================================ */

nextButton.addEventListener(
    "pointerup",
    event => {

        event.stopPropagation();

        nextScene();
    }
);


/* ============================================================
   BOTÃO VOLTAR
============================================================ */

backButton.addEventListener(
    "pointerup",
    event => {

        event.stopPropagation();

        previousScene();
    }
);


/* ============================================================
   TECLADO
============================================================ */

window.addEventListener(
    "keydown",
    event => {

        if (!state.started) {
            return;
        }

        if (
            event.key === "ArrowRight" ||
            event.key === " " ||
            event.key === "Enter"
        ) {

            event.preventDefault();

            nextScene();
        }

        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            previousScene();
        }
    }
);


/* ============================================================
   ÁUDIO
============================================================ */

async function startMusic() {

    if (!music) return;

    music.volume = 0;

    try {

        await music.play();

        state.audioStarted = true;

        soundButton.classList.add(
            "playing"
        );

        fadeAudio(
            0,
            0.72,
            2500
        );

    } catch (error) {

        state.audioStarted = false;

        console.warn(
            "Áudio não pôde ser iniciado.",
            error
        );
    }
}


/* ============================================================
   FADE DE ÁUDIO
============================================================ */

function fadeAudio(
    from,
    to,
    duration
) {

    const start =
        performance.now();

    function step(now) {

        const progress =
            Math.min(
                1,
                (now - start) /
                duration
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        music.volume =
            from +
            (to - from) *
            eased;

        if (progress < 1) {

            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


/* ============================================================
   MÚSICA POR CENA
============================================================ */

function updateMusic(index) {

    if (
        !state.audioStarted ||
        !music
    ) {
        return;
    }

    let targetVolume = 0.72;

    // Carta: música mais discreta.
    if (
        scenes[index].id === "admiration" ||
        scenes[index].id === "love"
    ) {

        targetVolume = 0.38;
    }

    // Aniversário: cresce.
    if (
        scenes[index].id === "birthday"
    ) {

        targetVolume = 0.82;
    }

    // Final: desaparece.
    if (
        scenes[index].id === "final"
    ) {

        fadeAudio(
            music.volume,
            0,
            3500
        );

        return;
    }

    fadeAudio(
        music.volume,
        targetVolume,
        1800
    );
}


/* ============================================================
   BOTÃO DE SOM
============================================================ */

soundButton.addEventListener(
    "pointerup",
    event => {

        event.stopPropagation();

        if (!state.audioStarted) {

            startMusic();

            return;
        }

        if (music.paused) {

            music.play()
                .then(() => {

                    soundButton.classList.add(
                        "playing"
                    );

                    fadeAudio(
                        0,
                        0.72,
                        700
                    );

                })
                .catch(() => {});

        } else {

            fadeAudio(
                music.volume,
                0,
                500
            );

            setTimeout(
                () => {

                    music.pause();

                    soundButton.classList.remove(
                        "playing"
                    );

                },
                520
            );
        }
    }
);


/* ============================================================
   COMEÇAR
============================================================ */

async function startExperience() {

    if (state.started) {
        return;
    }

    state.started = true;

    startButton.disabled = true;

    introDot.classList.add(
        "expand"
    );

    introMessage.classList.add(
        "visible"
    );

    await startMusic();

    setTimeout(
        () => {

            introScreen.classList.add(
                "leaving"
            );

            story.classList.remove(
                "hidden"
            );

            setTimeout(
                () => {

                    showScene(
                        0,
                        1
                    );

                },
                850
            );

        },
        1200
    );
}


/* ============================================================
   BOTÃO INICIAL
============================================================ */

startButton.addEventListener(
    "pointerup",
    event => {

        event.stopPropagation();

        startExperience();
    }
);


/* ============================================================
   RESIZE
============================================================ */

window.addEventListener(
    "resize",
    () => {

        detectQuality();

        resizeCanvas();

        createParticles();

        createLines();
    },
    { passive: true }
);


/* ============================================================
   VISIBILITY
============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            state.audioStarted &&
            !music.paused
        ) {

            music.pause();

        }
    }
);


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

function init() {

    detectQuality();

    resizeCanvas();

    createParticles();

    createLines();

    buildScenes();

    requestAnimationFrame(
        render
    );
}

init();