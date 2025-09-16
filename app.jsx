const { useEffect, useMemo, useState } = React;

function useMathJaxTypeset(deps) {
  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      MathJax.typesetPromise();
    }
  }, deps);
}

function Tabs({ value, onChange }) {
  const tabs = [
    { id: 'lesson-derivatives', label: 'Leçon: Dérivées' },
    { id: 'exercises-derivatives', label: 'Exercices: Dérivées' },
    { id: 'lesson-limits', label: 'Leçon: Limites' },
    { id: 'exercises-limits', label: 'Exercices: Limites' },
  ];
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className={"tab-button" + (value === t.id ? " active" : "")}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function LessonDerivatives() {
  useMathJaxTypeset([]);
  return (
    <section className="panel visible">
      <h2>Leçon — Rappels sur les dérivées</h2>
      <div className="grid">
        <article className="card">
          <h3>Fonction affine</h3>
          <p>Pour $f(x)=ax+b$ avec $a,b\\in \\mathbb{R}$, on a: $$f'(x)=a.$$</p>
        </article>
        <article className="card">
          <h3>Puissance réelle</h3>
          <p>Pour $f(x)=x^s$ avec $s\\in\\mathbb{R}$:
          <br/>• Si $s\\in\\mathbb{N}$: domaine $\\mathbb{R}$.
          <br/>• En général: domaine $\\mathbb{R}_+^* = ]0,+\\infty[$.
          <br/>Alors $$f'(x)=s\\,x^{s-1}.$$</p>
        </article>
        <article className="card">
          <h3>Inverse</h3>
          <p>Pour $f(x)=\\dfrac{1}{x}$, domaine $\\mathbb{R}^*=\\mathbb{R}\\\\\\{0\\}$, on a: $$f'(x)=-\\dfrac{1}{x^2}.$$</p>
        </article>
        <article className="card">
          <h3>Règles de calcul</h3>
          <p>
            • $(u+v)' = u' + v'$<br/>
            • $(\\lambda u)' = \\lambda u'$<br/>
            • $(uv)' = u'v + uv'$<br/>
            • $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ (si $v\\neq 0$)
          </p>
        </article>
        <article className="card">
          <h3>Règle de chaîne</h3>
          <p>
            Si $f = u \\circ v$, alors $$f'(x) = (u'\\circ v(x))\\cdot v'(x).$$
            Exemple: $f(x)=(x^2+1)^3$ donc $f'(x)=3(x^2+1)^2\\cdot 2x = 6x(x^2+1)^2$.
          </p>
        </article>
        <article className="card">
          <h3>Exemples rapides</h3>
          <p>
            $\\big(3x+2\\big)'=3$ • $\\big(x^5\\big)'=5x^4$ • $\\big(\\sqrt{x}\\big)'=\\dfrac{1}{2\\sqrt{x}}$ (sur $\\mathbb{R}_+^*$)
            <br/>$\\left(\\dfrac{1}{x}\\right)'=-\\dfrac{1}{x^2}$ • $\\big((x^2+1)(x-3)\\big)'=3x^2-6x+1$
          </p>
        </article>
      </div>
    </section>
  );
}

function LessonLimits() {
  useMathJaxTypeset([]);
  return (
    <section className="panel visible">
      <h2>Leçon — Rappels sur les limites</h2>
      <div className="grid">
        <article className="card">
          <h3>Limites usuelles</h3>
          <p>
            $\\displaystyle \\lim_{x\\to 0} \\frac{\\sin x}{x}=1$ •
            $\\displaystyle \\lim_{x\\to 0} \\frac{e^x-1}{x}=1$ •
            $\\displaystyle \\lim_{x\\to 0} \\frac{\\ln(1+x)}{x}=1$.
          </p>
        </article>
        <article className="card">
          <h3>Hiérarchie de croissance (\\(x\\to +\\infty\\))</h3>
          <p>
            $$\\ln x \\\\ll x^\\alpha \\\\ll a^x \\quad (\\alpha>0,\\ a>1).$$
            Ainsi $\\displaystyle \\lim_{x\\to +\\infty} \\frac{\\ln x}{x}=0$ et $\\lim_{x\\to +\\infty} \\frac{e^x}{x^n}=+\\infty$.
          </p>
        </article>
        <article className="card">
          <h3>Fonctions rationnelles</h3>
          <p>
            Pour $P$ et $Q$ polynômes, $\\displaystyle \\lim_{x\\to\\pm\\infty} \\frac{P(x)}{Q(x)}$ dépend des degrés:
            même degré $\\Rightarrow$ rapport des coefficients dominants; degré numérateur < dénominateur $\\Rightarrow 0$.
          </p>
        </article>
        <article className="card">
          <h3>Comportements en 0</h3>
          <p>
            $\\displaystyle \\lim_{x\\to 0^+} \\ln x = -\\infty$ •
            $\\displaystyle \\lim_{x\\to 0^+} \\frac{1}{x} = +\\infty$.
          </p>
        </article>
        <article className="card">
          <h3>Équivalents utiles</h3>
          <p>
            Pour $x\\to 0$: $e^x\\sim 1+x$, $\\ln(1+x)\\sim x$, $(1+x)^\\alpha\\sim 1+\\alpha x$.
          </p>
        </article>
      </div>
    </section>
  );
}

function Quiz({ bank }) {
  const [count, setCount] = useState(6);
  const [questions, setQuestions] = useState([]);
  const [graded, setGraded] = useState(false);
  const [selectedMap, setSelectedMap] = useState({});

  const picked = useMemo(() => {
    const shuffled = bank.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.max(1, Math.min(count, bank.length)));
  }, [bank, count]);

  useEffect(() => {
    setQuestions(picked);
    setGraded(false);
    setSelectedMap({});
  }, [picked]);

  useMathJaxTypeset([questions, graded, selectedMap]);

  const [score, setScore] = useState(0);

  function grade() {
    let s = 0;
    questions.forEach((q, idx) => {
      const sel = selectedMap[idx];
      if (sel === q.answer) s++;
    });
    setScore(s);
    setGraded(true);
  }

  function resetQuiz() {
    setSelectedMap({});
    setGraded(false);
    setScore(0);
  }

  return (
    <section className="panel visible">
      <div className="quiz-controls">
        <label htmlFor="nb">Nombre de questions:</label>
        <input id="nb" type="number" min={4} max={10} value={count} onChange={e=>setCount(Number(e.target.value||6))} />
        <button className="primary" onClick={()=>{ setQuestions(picked); resetQuiz(); }}>Générer un quiz</button>
        <button className="secondary" onClick={grade} disabled={!questions.length}>Corriger</button>
        <button className="secondary" onClick={resetQuiz} disabled={!questions.length}>Réinitialiser</button>
      </div>
      <ol className="question-list">
        {questions.map((item, idx) => (
          <li key={idx}>
            <div className="question" dangerouslySetInnerHTML={{__html: item.q}} />
            <div className="choices">
              {item.choices.map((c, i) => {
                const isCorrect = graded && i === item.answer;
                const isIncorrect = graded && selectedMap[idx] === i && i !== item.answer;
                return (
                  <label key={i} className={"choice" + (isCorrect ? " correct" : "") + (isIncorrect ? " incorrect" : "")}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={i}
                      data-q={idx}
                      checked={selectedMap[idx] === i}
                      onChange={() => setSelectedMap(prev => ({ ...prev, [idx]: i }))}
                    />
                    <span dangerouslySetInnerHTML={{__html: c}} />
                  </label>
                );
              })}
              <div className="explain" style={{display: graded? 'block':'none'}} dangerouslySetInnerHTML={{__html: item.explain}} />
            </div>
          </li>
        ))}
      </ol>
      {graded && (
        <div className={"result " + ((score / questions.length) >= 0.6 ? 'ok':'bad')}>
          {`Score: ${score} / ${questions.length} (${Math.round(100*score/questions.length)}%)`}
        </div>
      )}
    </section>
  );
}

const derivativeBank = [
  { q: "Si $f(x)=3x+2$, alors $f'(x)$ vaut :", choices: ["$3$", "$2$", "$x$", "$0$"], answer: 0, explain: "La dérivée de $ax+b$ est $a$." },
  { q: "Si $f(x)=x^5$, alors $f'(x)$ vaut :", choices: ["$5x^4$", "$x^4$", "$x^5$", "$\\dfrac{1}{x^5}$"], answer: 0, explain: "$\\big(x^n\\big)'=n x^{n-1}$." },
  { q: "Si $f(x)=\\sqrt{x}$ (sur $\\mathbb{R}_+^*$), alors $f'(x)$ vaut :", choices: ["$\\dfrac{1}{2\\sqrt{x}}$", "$\\dfrac{1}{\\sqrt{x}}$", "$\\sqrt{x}$", "$\\dfrac{1}{x^2}$"], answer: 0, explain: "$x^{1/2}$ a pour dérivée $\\tfrac{1}{2}x^{-1/2}=\\dfrac{1}{2\\sqrt{x}}$." },
  { q: "Si $f(x)=\\dfrac{1}{x}$, alors $f'(x)$ vaut :", choices: ["$-\\dfrac{1}{x^2}$", "$\\dfrac{1}{x^2}$", "$-\\dfrac{2}{x}$", "$0$"], answer: 0, explain: "$\\big(x^{-1}\\big)'=-x^{-2}=-\\dfrac{1}{x^2}$." },
  { q: "Si $f(x)=x^2+x$, alors $f'(x)$ vaut :", choices: ["$2x+1$", "$2x$", "$x^2$", "$1$"], answer: 0, explain: "Dérivée terme à terme: $(x^2)'=2x$ et $(x)'=1$." },
  { q: "Si $f(x)=(x^2+1)(x-3)$, alors $f'(x)$ vaut :", choices: ["$3x^2-6x+1$", "$2x(x-3)$", "$x^2+1$", "$3x^2+1$"], answer: 0, explain: "Produit: $(uv)'=u'v+uv'$. Ici $u=x^2+1$, $u'=2x$; $v=x-3$, $v'=1$." },
  { q: "Si $f(x)=x^{3/2}$ (sur $\\mathbb{R}_+^*$), alors $f'(x)$ vaut :", choices: ["$\\tfrac{3}{2}x^{1/2}$", "$\\tfrac{1}{2}x^{-1/2}$", "$3x^{1/2}$", "$\\dfrac{3}{2\\sqrt{x}}$"], answer: 0, explain: "$\\big(x^s\\big)'=s x^{s-1}$, donc $s=\\tfrac{3}{2}$." },
  { q: "Si $f(x)=-\\dfrac{2}{x^2}$, alors $f'(x)$ vaut :", choices: ["$\\dfrac{4}{x^3}$", "$-\\dfrac{4}{x^3}$", "$\\dfrac{2}{x^3}$", "$\\dfrac{4}{x^2}$"], answer: 0, explain: "$-2x^{-2} \\Rightarrow f'=-2\\cdot(-2)x^{-3}=4x^{-3}=\\dfrac{4}{x^3}$." },
];

const limitBank = [
  { q: "$\\displaystyle \\lim_{x\\to +\\infty} \\frac{\\ln x}{x}$ vaut :", choices: ["$0$", "$+\\infty$", "$-\\infty$", "n'existe pas"], answer: 0, explain: "Croissance: $\\ln x \\ll x$." },
  { q: "$\\displaystyle \\lim_{x\\to 0} \\frac{\\sin x}{x}$ vaut :", choices: ["$1$", "$0$", "$+\\infty$", "$-\\infty$"], answer: 0, explain: "Limite usuelle au voisinage de 0." },
  { q: "$\\displaystyle \\lim_{x\\to +\\infty} \\frac{e^x}{x^5}$ vaut :", choices: ["$+\\infty$", "$0$", "1", "n'existe pas"], answer: 0, explain: "$e^x$ domine toute puissance de $x$." },
  { q: "$\\displaystyle \\lim_{x\\to +\\infty} \\frac{3x^2+x}{x^2-1}$ vaut :", choices: ["$3$", "$0$", "$+\\infty$", "$-\\infty$"], answer: 0, explain: "Rapport des coefficients dominants (degré 2 / degré 2)." },
  { q: "$\\displaystyle \\lim_{x\\to 0^+} \\frac{1}{x}$ vaut :", choices: ["$+\\infty$", "$-\\infty$", "$0$", "n'existe pas"], answer: 0, explain: "À droite de 0, $1/x$ diverge vers $+\\infty$." },
  { q: "$\\displaystyle \\lim_{x\\to 0^+} \\ln x$ vaut :", choices: ["$-\\infty$", "$+\\infty$", "$0$", "n'existe pas"], answer: 0, explain: "Comportement classique du logarithme près de 0." },
  { q: "$\\displaystyle \\lim_{x\\to +\\infty} \\frac{x+1}{\\sqrt{x^2+1}}$ vaut :", choices: ["$1$", "$0$", "$+\\infty$", "$2$"], answer: 0, explain: "Diviser par $x$: $\\dfrac{1+1/x}{\\sqrt{1+1/x^2}}\\to 1$." },
  { q: "$\\displaystyle \\lim_{x\\to 0} \\frac{e^x-1}{x}$ vaut :", choices: ["$1$", "$0$", "$+\\infty$", "$-\\infty$"], answer: 0, explain: "Limite usuelle: $e^x\\sim 1+x$." },
];

function App() {
  const [tab, setTab] = useState('lesson-derivatives');
  useEffect(() => {
    const navRoot = document.getElementById('nav-root');
    if (navRoot) {
      ReactDOM.createRoot(navRoot).render(<Tabs value={tab} onChange={setTab} />);
    }
  }, [tab]);

  return (
    <>
      {tab === 'lesson-derivatives' && <LessonDerivatives />}
      {tab === 'exercises-derivatives' && <Quiz bank={derivativeBank} />}
      {tab === 'lesson-limits' && <LessonLimits />}
      {tab === 'exercises-limits' && <Quiz bank={limitBank} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


