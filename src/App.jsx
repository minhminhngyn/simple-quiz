import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0F1117",
  card: "#1A1D2E",
  cardBorder: "#2A2D3E",
  accent: "#6C63FF",
  accentSoft: "#A89CF7",
  gold: "#FFD166",
  green: "#06D6A0",
  red: "#EF476F",
  blue: "#118AB2",
  text: "#E8E9F3",
  muted: "#8B8FA8",
};

const questionTypes = [
  {
    id: 1,
    title: "Short Answer Questions",
    color: "#6C63FF",
    icon: "✏️",
    task: "Answer specific detail questions using exact words from the passage",
    tips: [
      "Identify word type needed — noun, verb, number?",
      "Paraphrase question keywords before scanning",
      "Answers come in order in the passage",
      "Check the word limit in the instructions carefully",
      "Never exceed the limit — even 1 extra word = wrong",
      "Spelling counts — misspelled = marked wrong",
    ],
    keyRule: "Copy exact words from the passage. Never paraphrase your answer.",
    exercise: {
      passage: `The Amazon rainforest, often referred to as the "lungs of the Earth," produces approximately 20% of the world's oxygen through photosynthesis. Scientists estimate that the forest contains over 390 billion individual trees representing around 16,000 species. The forest floor rarely receives sunlight, as the dense canopy above blocks up to 99% of light from reaching the ground. Annual rainfall in the Amazon basin averages between 1,500 and 3,000 millimetres, making it one of the wettest regions on the planet.`,
      questions: [
        {
          q: "What percentage of the world's oxygen does the Amazon produce? (NO MORE THAN TWO WORDS AND/OR A NUMBER)",
          answer: "20%",
          hint: "Look for a specific percentage figure in the text.",
        },
        {
          q: "How many individual trees does the Amazon contain? (NO MORE THAN THREE WORDS AND/OR A NUMBER)",
          answer: "390 billion",
          hint: "Find the number that describes the count of trees.",
        },
        {
          q: "What percentage of light does the canopy block from reaching the ground? (NO MORE THAN TWO WORDS AND/OR A NUMBER)",
          answer: "99%",
          hint: "The answer is near the word 'blocks'.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Sentence Completion",
    color: "#118AB2",
    icon: "📝",
    task: "Fill the gap with words taken directly from the passage",
    tips: [
      "Use grammar clues — 'a' before gap = countable noun",
      "Prepare paraphrases for keywords before scanning",
      "Read a few sentences before AND after keywords",
      "Meaning may spread across several sentences",
      "Answers come in order in the passage",
      "'3 words and/or a number' = 3 words MAX, not 4",
    ],
    keyRule: "On computer test, you can copy-paste words directly from the passage.",
    exercise: {
      passage: `Remote work has transformed the modern workplace significantly. Studies show that employees who work from home report higher levels of job satisfaction due to the elimination of daily commuting stress. However, remote workers often struggle with feelings of isolation and reduced collaboration with colleagues. Companies have responded by investing in digital communication tools and scheduling regular virtual team meetings to maintain productivity and team cohesion. Despite the challenges, research indicates that remote workers are on average 13% more productive than their office-based counterparts.`,
      questions: [
        {
          stem: "Workers who operate from home tend to have greater ___ because they no longer face the pressure of travelling to the office each day.",
          answer: "job satisfaction",
          hint: "The answer describes what workers 'report higher levels of'.",
        },
        {
          stem: "To keep teams working well together, organisations have started holding regular ___ using online platforms.",
          answer: "virtual team meetings",
          hint: "Look for what companies schedule to maintain team cohesion.",
        },
        {
          stem: "Compared to employees in offices, those working remotely show a ___ improvement in output.",
          answer: "13%",
          hint: "Find the specific percentage mentioned in the final sentence.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "List Selection",
    color: "#06D6A0",
    icon: "☑️",
    task: "Choose correct options from one shared list of possible answers",
    tips: [
      "Read through the entire list first, prepare paraphrases",
      "Identify keywords in each question",
      "Locate the information by scanning the passage",
      "Answers come in order in the passage",
      "Answers are letters (A–G) — confirm in instructions",
      "All questions share ONE list — very different from MCQ",
    ],
    keyRule: "All questions refer to one shared list. Repeated letters are perfectly normal.",
    exercise: {
      passage: `Ocean pollution poses a severe threat to marine ecosystems. Plastic waste, which constitutes the majority of ocean litter, breaks down into microplastics that are ingested by fish and seabirds. Chemical runoff from agriculture introduces harmful pesticides and fertilisers into coastal waters, causing algal blooms that deplete oxygen levels. Noise pollution from shipping disrupts the navigation systems of whales and dolphins. Oil spills coat the feathers of seabirds, reducing their ability to insulate and fly. Rising water temperatures due to climate change cause coral bleaching, destroying the habitat of thousands of species.`,
      listItems: [
        "A. Coral bleaching",
        "B. Ingestion of harmful particles",
        "C. Disruption of marine mammals' orientation",
        "D. Loss of insulation and mobility in birds",
        "E. Reduction in water oxygen content",
        "F. Accumulation of plastic waste on beaches",
        "G. Increased water acidity",
      ],
      questions: [
        {
          q: "What effect does agricultural chemical runoff have on coastal waters?",
          answer: "E",
          hint: "Algal blooms 'deplete oxygen levels' — which option matches?",
        },
        {
          q: "How does noise pollution from shipping affect marine mammals?",
          answer: "C",
          hint: "Whales and dolphins use navigation systems to orient themselves.",
        },
        {
          q: "What happens to seabirds when oil spills occur?",
          answer: "D",
          hint: "Oil affects feathers — which affects insulation and flying ability.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Classification / Categorisation",
    color: "#FFD166",
    icon: "🗂️",
    task: "Match each statement to the correct category",
    tips: [
      "Skim the whole passage before starting the questions",
      "Categories often match a passage section — identify it",
      "Prepare paraphrases for all statement keywords",
      "Scan the passage to locate relevant information",
      "Write a letter (A, B, C...) — writing a word = wrong",
      "More than one statement can belong to the same category",
    ],
    keyRule: "The key skill: paraphrasing + scanning for specific information.",
    exercise: {
      passage: `Three major ancient civilisations left distinct marks on human history. The Romans are celebrated for their sophisticated legal system, which forms the basis of many modern laws, as well as their advanced engineering feats such as aqueducts and roads. The Greeks made groundbreaking contributions to philosophy, establishing schools of thought that continue to influence intellectual discourse today; they also pioneered the concept of democracy. The Egyptians were renowned for their religious architecture, constructing enormous temples and pyramids as monuments to their gods and pharaohs, and they developed one of the world's earliest writing systems — hieroglyphics.`,
      categories: ["A. Romans", "B. Greeks", "C. Egyptians"],
      questions: [
        {
          stmt: "This civilisation introduced the idea of citizens having a say in governance.",
          answer: "B",
          hint: "Who 'pioneered the concept of democracy'?",
        },
        {
          stmt: "This civilisation created infrastructure that greatly improved transportation.",
          answer: "A",
          hint: "Who built roads as an 'engineering feat'?",
        },
        {
          stmt: "This civilisation invented an early form of written communication.",
          answer: "C",
          hint: "Hieroglyphics are mentioned as one of the world's earliest writing systems.",
        },
        {
          stmt: "This civilisation's laws continue to shape modern legal frameworks.",
          answer: "A",
          hint: "Who had a 'legal system which forms the basis of many modern laws'?",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Table Completion",
    color: "#EF476F",
    icon: "📊",
    task: "Complete the table with exact words from the passage",
    tips: [
      "Read BOTH column and row headings first",
      "Identify word type needed for each gap",
      "Answers are usually in ONE section of the passage",
      "Use the table's structure to understand relationships",
      "Scan that section to locate the relevant information",
      "Check the word limit and follow it strictly",
    ],
    keyRule: "Use the table logic to find the passage section — answers are clustered.",
    exercise: {
      passage: `Three renewable energy sources are increasingly being adopted worldwide. Solar power works by converting sunlight into electricity using photovoltaic panels; its main advantage is low maintenance cost, though it is limited by its dependence on weather conditions. Wind energy harnesses the power of moving air through turbines and is particularly efficient in coastal and highland areas, though noise produced by turbines can be a drawback. Hydropower generates electricity from flowing water and is considered the most reliable of the three due to consistent water flow, but the construction of dams poses environmental risks to river ecosystems.`,
      tableHeaders: ["Energy Source", "How It Works", "Main Advantage", "Main Disadvantage"],
      tableRows: [
        { label: "Solar", cells: ["Converts sunlight via photovoltaic panels", "___", "Dependent on weather"] },
        { label: "Wind", cells: ["Uses moving air through turbines", "Efficient in coastal/highland areas", "___"] },
        { label: "Hydro", cells: ["Generated from flowing water", "___", "Environmental risks to rivers"] },
      ],
      questions: [
        {
          q: "Solar — Main Advantage (NO MORE THAN THREE WORDS)",
          answer: "low maintenance cost",
          hint: "What is described as the 'main advantage' of solar power?",
        },
        {
          q: "Wind — Main Disadvantage (NO MORE THAN TWO WORDS)",
          answer: "noise",
          hint: "What 'can be a drawback' for wind turbines?",
        },
        {
          q: "Hydro — Main Advantage (NO MORE THAN THREE WORDS)",
          answer: "most reliable",
          hint: "Hydropower is 'considered the ___ of the three'.",
        },
      ],
    },
  },
  {
    id: 6,
    title: "Flow Chart Completion",
    color: "#A89CF7",
    icon: "🔄",
    task: "Complete a flow chart showing a process from the passage",
    tips: [
      "Read the whole flow chart FIRST to understand the process",
      "Identify the stage or step each gap belongs to",
      "Predict word type from the chart context",
      "Paraphrase keywords in each box before scanning",
      "Check the word limit strictly",
      "⚠ Answers may NOT follow passage order",
    ],
    keyRule: "Unlike most types, answers may NOT follow passage order. Scan carefully.",
    exercise: {
      passage: `The water cycle is a continuous natural process. It begins with evaporation, in which heat from the sun causes water from oceans, lakes, and rivers to turn into water vapour and rise into the atmosphere. As the vapour rises, it cools and undergoes condensation, forming clouds made up of tiny water droplets. When the droplets in a cloud combine and become heavy enough, precipitation occurs and water falls back to the Earth's surface as rain, snow, or hail. Much of this water flows into rivers and streams through a process called surface runoff, eventually returning to the oceans, where the cycle begins again.`,
      flowSteps: [
        { label: "Sun heats water → water turns into ___", answer: "water vapour", hint: "What does water become when it evaporates?" },
        { label: "Vapour rises and cools → ___ forms clouds", answer: "condensation", hint: "What process causes clouds to form?" },
        { label: "Droplets grow heavy → ___ (rain/snow/hail) falls", answer: "precipitation", hint: "What is the term for water falling from clouds?" },
        { label: "Water flows into rivers via ___", answer: "surface runoff", hint: "What process sends water into rivers and streams?" },
      ],
    },
  },
  {
    id: 7,
    title: "Diagram Completion",
    color: "#FF9F1C",
    icon: "🗺️",
    task: "Label a diagram with words directly from the passage",
    tips: [
      "Identify word type needed — usually a noun",
      "Relevant info is usually in 1–2 specific paragraphs",
      "Use the diagram's visual cues to guide your scanning",
      "Arrows and positions hint at the word type needed",
      "Check the word limit before writing your answer",
      "⚠ Answers may NOT follow passage order",
    ],
    keyRule: "Use the diagram visually — it tells you exactly where in the passage to look.",
    exercise: {
      passage: `The human eye is a complex organ responsible for vision. Light enters through the cornea, a transparent layer at the front of the eye that begins the focusing process. It then passes through the pupil, the dark circular opening whose size is controlled by the surrounding iris. Behind the pupil sits the lens, a flexible structure that fine-tunes focus by changing its shape. The focused light travels through the vitreous humour, a gel-like substance filling the eye, before reaching the retina at the back of the eye, where light is converted into electrical signals. These signals travel along the optic nerve to the brain, where they are interpreted as images.`,
      diagramParts: [
        { label: "A", description: "Transparent front layer — begins focusing", answer: "cornea" },
        { label: "B", description: "Dark circular opening — size controlled by iris", answer: "pupil" },
        { label: "C", description: "Flexible structure — fine-tunes focus", answer: "lens" },
        { label: "D", description: "Gel-like filling substance", answer: "vitreous humour" },
        { label: "E", description: "Back of eye — converts light to signals", answer: "retina" },
      ],
    },
  },
];

function ProgressBar({ correct, total }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
        <span>Score</span>
        <span>{correct}/{total} correct</span>
      </div>
      <div style={{ height: 6, background: "#2A2D3E", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? COLORS.green : pct >= 40 ? COLORS.gold : COLORS.red, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function Badge({ text, color }) {
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
      {text}
    </span>
  );
}

function ShortAnswerExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState(exercise.questions.map(() => false));

  const results = answers.map((a, i) =>
    a.trim().toLowerCase() === exercise.questions[i].answer.toLowerCase()
  );
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ marginTop: 16 }}>
        {exercise.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}>
              <span style={{ color, fontWeight: 700 }}>Q{i + 1}.</span> {q.q}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={answers[i]}
                onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); setChecked(false); }}
                placeholder="Type exact words from the passage..."
                style={{ flex: 1, background: "#0F1117", border: `1px solid ${checked ? (results[i] ? COLORS.green : COLORS.red) : "#2A2D3E"}`, borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 13, outline: "none" }}
              />
              <button onClick={() => { const h = [...showHints]; h[i] = !h[i]; setShowHints(h); }} style={{ background: "transparent", border: `1px solid ${color}44`, borderRadius: 6, color, padding: "6px 10px", cursor: "pointer", fontSize: 12 }}>
                💡
              </button>
            </div>
            {showHints[i] && <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 5, padding: "6px 10px", background: COLORS.gold + "11", borderRadius: 6 }}>Hint: {q.hint}</div>}
            {checked && <div style={{ fontSize: 12, marginTop: 4, color: results[i] ? COLORS.green : COLORS.red }}>
              {results[i] ? "✓ Correct!" : `✗ Answer: "${q.answer}"`}
            </div>}
          </div>
        ))}
        <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.questions.map(() => "")); setChecked(false); setShowHints(exercise.questions.map(() => false)); }} checked={checked} />
        {checked && <ProgressBar correct={score} total={exercise.questions.length} />}
      </div>
    </div>
  );
}

function SentenceCompletionExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState(exercise.questions.map(() => false));
  const results = answers.map((a, i) => a.trim().toLowerCase() === exercise.questions[i].answer.toLowerCase());
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ marginTop: 16 }}>
        {exercise.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 16, background: "#0F1117", borderRadius: 10, padding: "12px 14px", border: `1px solid ${checked ? (results[i] ? COLORS.green + "44" : COLORS.red + "44") : "#2A2D3E"}` }}>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7, marginBottom: 8 }}>
              <span style={{ color, fontWeight: 700 }}>Q{i + 1}.</span> {q.stem.replace("___", "")}
              <input
                value={answers[i]}
                onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); setChecked(false); }}
                placeholder="fill in..."
                style={{ display: "inline-block", background: "transparent", borderBottom: `2px solid ${color}`, border: "none", borderBottom: `2px solid ${color}66`, color: COLORS.text, padding: "0 6px", width: 160, fontSize: 13, outline: "none", marginLeft: 4 }}
              />
            </div>
            <button onClick={() => { const h = [...showHints]; h[i] = !h[i]; setShowHints(h); }} style={{ background: "transparent", border: "none", color: COLORS.gold, cursor: "pointer", fontSize: 12 }}>💡 {showHints[i] ? "Hide" : "Show"} hint</button>
            {showHints[i] && <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 4 }}>{q.hint}</div>}
            {checked && <div style={{ fontSize: 12, marginTop: 6, color: results[i] ? COLORS.green : COLORS.red }}>
              {results[i] ? "✓ Correct!" : `✗ Answer: "${q.answer}"`}
            </div>}
          </div>
        ))}
        <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.questions.map(() => "")); setChecked(false); setShowHints(exercise.questions.map(() => false)); }} checked={checked} />
        {checked && <ProgressBar correct={score} total={exercise.questions.length} />}
      </div>
    </div>
  );
}

function ListSelectionExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = answers.map((a, i) => a.trim().toUpperCase() === exercise.questions[i].answer.toUpperCase());
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ margin: "14px 0", background: "#0F1117", borderRadius: 10, padding: 12, border: "1px solid #2A2D3E" }}>
        <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>ANSWER LIST</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {exercise.listItems.map((item, i) => (
            <span key={i} style={{ background: "#1A1D2E", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: COLORS.text, border: "1px solid #2A2D3E" }}>{item}</span>
          ))}
        </div>
      </div>
      {exercise.questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}><span style={{ color, fontWeight: 700 }}>Q{i + 1}.</span> {q.q}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["A","B","C","D","E","F","G"].map(letter => (
              <button key={letter} onClick={() => { const a = [...answers]; a[i] = letter; setAnswers(a); setChecked(false); }}
                style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${answers[i] === letter ? color : "#2A2D3E"}`, background: answers[i] === letter ? color + "22" : "transparent", color: answers[i] === letter ? color : COLORS.muted, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {letter}
              </button>
            ))}
          </div>
          {checked && <div style={{ fontSize: 12, marginTop: 4, color: results[i] ? COLORS.green : COLORS.red }}>
            {results[i] ? "✓ Correct!" : `✗ Answer: ${q.answer} — ${q.hint}`}
          </div>}
        </div>
      ))}
      <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.questions.map(() => "")); setChecked(false); }} checked={checked} />
      {checked && <ProgressBar correct={score} total={exercise.questions.length} />}
    </div>
  );
}

function ClassificationExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = answers.map((a, i) => a === exercise.questions[i].answer);
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
        {exercise.categories.map((c, i) => (
          <div key={i} style={{ flex: 1, background: "#0F1117", borderRadius: 10, padding: "10px 12px", border: `1px solid ${color}44`, textAlign: "center" }}>
            <span style={{ color, fontWeight: 700 }}>{c.split(".")[0]}.</span>
            <span style={{ color: COLORS.text, fontSize: 13 }}>{c.split(".")[1]}</span>
          </div>
        ))}
      </div>
      {exercise.questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 12, background: "#0F1117", borderRadius: 10, padding: "10px 14px", border: `1px solid ${checked ? (results[i] ? COLORS.green + "44" : COLORS.red + "44") : "#2A2D3E"}` }}>
          <div style={{ fontSize: 13, color: COLORS.text, marginBottom: 8 }}><span style={{ color, fontWeight: 700 }}>Q{i + 1}.</span> {q.stmt}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["A","B","C"].map(letter => (
              <button key={letter} onClick={() => { const a = [...answers]; a[i] = letter; setAnswers(a); setChecked(false); }}
                style={{ flex: 1, padding: "6px", borderRadius: 6, border: `2px solid ${answers[i] === letter ? color : "#2A2D3E"}`, background: answers[i] === letter ? color + "22" : "transparent", color: answers[i] === letter ? color : COLORS.muted, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {letter}
              </button>
            ))}
          </div>
          {checked && <div style={{ fontSize: 12, marginTop: 6, color: results[i] ? COLORS.green : COLORS.red }}>
            {results[i] ? "✓ Correct!" : `✗ Answer: ${q.answer} — ${q.hint}`}
          </div>}
        </div>
      ))}
      <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.questions.map(() => "")); setChecked(false); }} checked={checked} />
      {checked && <ProgressBar correct={score} total={exercise.questions.length} />}
    </div>
  );
}

function TableExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.questions.map(() => ""));
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState(exercise.questions.map(() => false));
  const results = answers.map((a, i) => a.trim().toLowerCase() === exercise.questions[i].answer.toLowerCase());
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ overflowX: "auto", marginTop: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {exercise.tableHeaders.map((h, i) => (
                <th key={i} style={{ background: color + "22", color, padding: "8px 10px", textAlign: "left", border: "1px solid #2A2D3E", fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exercise.tableRows.map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: "8px 10px", border: "1px solid #2A2D3E", color: COLORS.text, fontWeight: 700 }}>{row.label}</td>
                {row.cells.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", border: "1px solid #2A2D3E", color: cell === "___" ? COLORS.muted : COLORS.text }}>{cell === "___" ? <span style={{ color: color, fontStyle: "italic" }}>— fill in —</span> : cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14 }}>
        {exercise.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}><span style={{ color, fontWeight: 700 }}>Gap {i + 1}:</span> {q.q}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={answers[i]} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); setChecked(false); }}
                placeholder="Exact words from passage..." style={{ flex: 1, background: "#0F1117", border: `1px solid ${checked ? (results[i] ? COLORS.green : COLORS.red) : "#2A2D3E"}`, borderRadius: 8, padding: "7px 12px", color: COLORS.text, fontSize: 13, outline: "none" }} />
              <button onClick={() => { const h = [...showHints]; h[i] = !h[i]; setShowHints(h); }} style={{ background: "transparent", border: `1px solid ${color}44`, borderRadius: 6, color, padding: "6px 10px", cursor: "pointer", fontSize: 12 }}>💡</button>
            </div>
            {showHints[i] && <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 4 }}>{q.hint}</div>}
            {checked && <div style={{ fontSize: 12, marginTop: 4, color: results[i] ? COLORS.green : COLORS.red }}>
              {results[i] ? "✓ Correct!" : `✗ Answer: "${q.answer}"`}
            </div>}
          </div>
        ))}
        <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.questions.map(() => "")); setChecked(false); setShowHints(exercise.questions.map(() => false)); }} checked={checked} />
        {checked && <ProgressBar correct={score} total={exercise.questions.length} />}
      </div>
    </div>
  );
}

function FlowChartExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.flowSteps.map(() => ""));
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState(exercise.flowSteps.map(() => false));
  const results = answers.map((a, i) => a.trim().toLowerCase() === exercise.flowSteps[i].answer.toLowerCase());
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ marginTop: 14 }}>
        {exercise.flowSteps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: color + "22", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              {i < exercise.flowSteps.length - 1 && <div style={{ width: 2, height: 24, background: color + "44", marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1, background: "#0F1117", borderRadius: 10, padding: "10px 12px", border: `1px solid ${checked ? (results[i] ? COLORS.green + "44" : COLORS.red + "44") : "#2A2D3E"}` }}>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}>{step.label}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={answers[i]} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); setChecked(false); }}
                  placeholder="Fill in the blank..." style={{ flex: 1, background: "#1A1D2E", border: `1px solid #2A2D3E`, borderRadius: 6, padding: "6px 10px", color: COLORS.text, fontSize: 12, outline: "none" }} />
                <button onClick={() => { const h = [...showHints]; h[i] = !h[i]; setShowHints(h); }} style={{ background: "transparent", border: "none", color: COLORS.gold, cursor: "pointer", fontSize: 13 }}>💡</button>
              </div>
              {showHints[i] && <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 4 }}>{step.hint}</div>}
              {checked && <div style={{ fontSize: 12, marginTop: 4, color: results[i] ? COLORS.green : COLORS.red }}>
                {results[i] ? "✓ Correct!" : `✗ Answer: "${step.answer}"`}
              </div>}
            </div>
          </div>
        ))}
        <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.flowSteps.map(() => "")); setChecked(false); setShowHints(exercise.flowSteps.map(() => false)); }} checked={checked} />
        {checked && <ProgressBar correct={score} total={exercise.flowSteps.length} />}
      </div>
    </div>
  );
}

function DiagramExercise({ exercise, color }) {
  const [answers, setAnswers] = useState(exercise.diagramParts.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = answers.map((a, i) => a.trim().toLowerCase() === exercise.diagramParts[i].answer.toLowerCase());
  const score = results.filter(Boolean).length;

  return (
    <div>
      <PassageBox text={exercise.passage} />
      <div style={{ marginTop: 14, background: "#0F1117", borderRadius: 12, padding: 16, border: `1px solid ${color}33` }}>
        <div style={{ textAlign: "center", fontSize: 12, color, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>DIAGRAM: THE HUMAN EYE</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <svg viewBox="0 0 320 180" width="100%" style={{ maxWidth: 320 }}>
            <ellipse cx="160" cy="90" rx="130" ry="80" fill="none" stroke={color + "44"} strokeWidth="2" />
            <ellipse cx="80" cy="90" rx="30" ry="30" fill={color + "11"} stroke={color} strokeWidth="1.5" />
            <ellipse cx="160" cy="90" rx="25" ry="25" fill={color + "22"} stroke={color + "88"} strokeWidth="1" />
            <circle cx="160" cy="90" r="12" fill="#111" />
            <ellipse cx="195" cy="90" rx="18" ry="16" fill={color + "33"} stroke={color + "66"} strokeWidth="1" />
            <ellipse cx="270" cy="90" rx="20" ry="70" fill={color + "11"} stroke={color + "44"} strokeWidth="1" strokeDasharray="4,3" />
            <circle cx="285" cy="90" r="12" fill={color + "44"} stroke={color} strokeWidth="1.5" />
            <line x1="285" y1="90" x2="310" y2="90" stroke={color} strokeWidth="2" />
            {[["A",75,55],["B",155,55],["C",195,55],["D",245,60],["E",283,60]].map(([l,x,y]) => (
              <g key={l}>
                <circle cx={x} cy={y} r={10} fill={color} opacity={0.9} />
                <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>
              </g>
            ))}
          </svg>
        </div>
        {exercise.diagramParts.map((part, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{part.label}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, flex: 1 }}>{part.description}</div>
            <input value={answers[i]} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); setChecked(false); }}
              placeholder="Label..." style={{ width: 140, background: "#1A1D2E", border: `1px solid ${checked ? (results[i] ? COLORS.green : COLORS.red) : "#2A2D3E"}`, borderRadius: 6, padding: "6px 10px", color: COLORS.text, fontSize: 12, outline: "none" }} />
          </div>
        ))}
        {checked && exercise.diagramParts.map((part, i) => (
          !results[i] && <div key={i} style={{ fontSize: 12, color: COLORS.red, marginBottom: 4 }}>
            Part {part.label}: Answer is "{part.answer}"
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <CheckButton onCheck={() => setChecked(true)} onReset={() => { setAnswers(exercise.diagramParts.map(() => "")); setChecked(false); }} checked={checked} />
        {checked && <ProgressBar correct={score} total={exercise.diagramParts.length} />}
      </div>
    </div>
  );
}

function PassageBox({ text }) {
  return (
    <div style={{ background: "#1A1D2E", borderRadius: 10, padding: 14, border: "1px solid #2A2D3E" }}>
      <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>📖 PASSAGE</div>
      <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8, margin: 0 }}>{text}</p>
    </div>
  );
}

function CheckButton({ onCheck, onReset, checked }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "12px 0 8px" }}>
      {!checked
        ? <button onClick={onCheck} style={{ flex: 1, background: COLORS.accent, border: "none", borderRadius: 8, padding: "10px", color: "white", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Check Answers</button>
        : <button onClick={onReset} style={{ flex: 1, background: "#2A2D3E", border: "none", borderRadius: 8, padding: "10px", color: COLORS.muted, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>↺ Try Again</button>
      }
    </div>
  );
}

function ExerciseRenderer({ qt }) {
  if (qt.id === 1) return <ShortAnswerExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 2) return <SentenceCompletionExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 3) return <ListSelectionExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 4) return <ClassificationExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 5) return <TableExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 6) return <FlowChartExercise exercise={qt.exercise} color={qt.color} />;
  if (qt.id === 7) return <DiagramExercise exercise={qt.exercise} color={qt.color} />;
  return null;
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("tips");
  const qt = questionTypes[selected];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: "#1A1D2E", borderBottom: "1px solid #2A2D3E", padding: "16px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: COLORS.accent + "22", border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📘</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>IELTS Reading</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>7 Question Types · Interactive Practice · Band 8.5</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        {/* Question type selector */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
          {questionTypes.map((q, i) => (
            <button key={i} onClick={() => { setSelected(i); setTab("tips"); }}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: `2px solid ${selected === i ? q.color : "#2A2D3E"}`, background: selected === i ? q.color + "22" : "#1A1D2E", color: selected === i ? q.color : COLORS.muted, fontWeight: 700, cursor: "pointer", fontSize: 12, transition: "all 0.2s" }}>
              <span>{q.icon}</span>
              <span style={{ display: "none", "@media(minWidth:600px)": { display: "inline" } }}>0{q.id}</span>
              <span style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.title.split(" ").slice(0, 2).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${qt.color}33`, overflow: "hidden" }}>
          {/* Card header */}
          <div style={{ background: qt.color + "15", borderBottom: `1px solid ${qt.color}33`, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 32 }}>{qt.icon}</div>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <Badge text={`TYPE 0${qt.id} OF 7`} color={qt.color} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>{qt.title}</div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}>{qt.task}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #2A2D3E" }}>
            {["tips", "exercise"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ flex: 1, padding: "12px", background: "transparent", border: "none", borderBottom: `3px solid ${tab === t ? qt.color : "transparent"}`, color: tab === t ? qt.color : COLORS.muted, fontWeight: 700, cursor: "pointer", fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase" }}>
                {t === "tips" ? "📋 Strategy" : "🎯 Practice"}
              </button>
            ))}
          </div>

          <div style={{ padding: "20px 24px" }}>
            {tab === "tips" ? (
              <div>
                <div style={{ marginBottom: 16 }}>
                  {qt.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: qt.color + "22", border: `1.5px solid ${qt.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: qt.color, fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, paddingTop: 2 }}>{tip}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: qt.color + "15", border: `1px solid ${qt.color}44`, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>⭐</span>
                  <div>
                    <div style={{ fontSize: 11, color: qt.color, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>KEY RULE</div>
                    <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>{qt.keyRule}</div>
                  </div>
                </div>
                <button onClick={() => setTab("exercise")} style={{ marginTop: 16, width: "100%", background: qt.color, border: "none", borderRadius: 10, padding: "12px", color: "white", fontWeight: 800, cursor: "pointer", fontSize: 14, letterSpacing: 0.5 }}>
                  Try a Practice Exercise →
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 12px", background: qt.color + "11", borderRadius: 8, border: `1px solid ${qt.color}33` }}>
                  <span>🎯</span>
                  <span style={{ fontSize: 13, color: qt.color, fontWeight: 600 }}>Read the passage carefully, then answer the questions below using exact words from the passage.</span>
                </div>
                <ExerciseRenderer qt={qt} />
              </div>
            )}
          </div>
        </div>

        {/* Quick nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <button onClick={() => { setSelected(Math.max(0, selected - 1)); setTab("tips"); }} disabled={selected === 0}
            style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 16px", color: selected === 0 ? COLORS.muted : COLORS.text, cursor: selected === 0 ? "default" : "pointer", fontSize: 13 }}>
            ← Previous
          </button>
          <span style={{ color: COLORS.muted, fontSize: 12, alignSelf: "center" }}>{selected + 1} / {questionTypes.length}</span>
          <button onClick={() => { setSelected(Math.min(questionTypes.length - 1, selected + 1)); setTab("tips"); }} disabled={selected === questionTypes.length - 1}
            style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 16px", color: selected === questionTypes.length - 1 ? COLORS.muted : COLORS.text, cursor: selected === questionTypes.length - 1 ? "default" : "pointer", fontSize: 13 }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
