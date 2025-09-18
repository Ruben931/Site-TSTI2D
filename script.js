// Détection mobile et optimisations
function isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Amélioration du scroll sur mobile
function smoothScrollToTop() {
    if (isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navigation entre onglets - Version simplifiée
function switchTab(targetId) {
    // Cacher tous les contenus
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => content.classList.remove('active'));
    
    // Désactiver tous les boutons
    const allBtns = document.querySelectorAll('.tab-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    // Activer le contenu ciblé
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Activer le bouton correspondant
    const targetBtn = document.querySelector(`[data-tab="${targetId}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Scroll vers le haut sur mobile lors du changement d'onglet
    smoothScrollToTop();
    
    // Re-render MathJax
    setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }
    }, 200);
}

// Initialisation au chargement
window.addEventListener('load', function() {
    // Activer le premier onglet par défaut
    switchTab('derivees-lecon');
    
    // Ajouter les événements de clic
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
});

// Générateur infini de questions - Dérivées (focus fonction inverse)
function genererQuestionDerivee() {
    const types = [
        'inverse_base', 'inverse_coefficient', 'inverse_puissance', 'inverse_limite', 'inverse_variation', 'inverse_asymptote'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'inverse_base':
            return genererQuestionInverseBase();
        case 'inverse_coefficient':
            return genererQuestionInverseCoefficient();
        case 'inverse_puissance':
            return genererQuestionInversePuissance();
        case 'inverse_limite':
            return genererQuestionInverseLimite();
        case 'inverse_variation':
            return genererQuestionInverseVariation();
        case 'inverse_asymptote':
            return genererQuestionInverseAsymptote();
        default:
            return genererQuestionInverseBase();
    }
}

function genererQuestionInverseBase() {
    const question = `La fonction inverse $f(x) = \\frac{1}{x}$ a pour dérivée :`;
    const bonneReponse = `$f'(x) = -\\frac{1}{x^2}$`;
    const options = [
        bonneReponse,
        `$f'(x) = \\frac{1}{x^2}$`,
        `$f'(x) = -\\frac{2}{x^3}$`,
        `$f'(x) = 0$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `La dérivée de la fonction inverse est $f'(x) = -\\frac{1}{x^2}$ sur $\\mathbb{R}^*$.`
    };
}

function genererQuestionInverseCoefficient() {
    const a = Math.floor(Math.random() * 5) + 2; // 2 à 6
    const question = `Si $f(x) = \\frac{${a}}{x}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$-\\frac{${a}}{x^2}$`;
    const options = [
        bonneReponse,
        `$\\frac{${a}}{x^2}$`,
        `$-\\frac{${a}}{x}$`,
        `$-\\frac{1}{${a}x^2}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$\\frac{${a}}{x} = ${a} \\cdot \\frac{1}{x}$, donc $f'(x) = ${a} \\cdot \\left(-\\frac{1}{x^2}\\right) = -\\frac{${a}}{x^2}$.`
    };
}

function genererQuestionInversePuissance() {
    const n = Math.floor(Math.random() * 3) + 2; // 2 à 4
    const question = `Si $f(x) = \\frac{1}{x^${n}}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$-\\frac{${n}}{x^${n+1}}$`;
    const options = [
        bonneReponse,
        `$\\frac{${n}}{x^${n+1}}$`,
        `$-\\frac{1}{${n}x^${n-1}}$`,
        `$-\\frac{1}{x^${n+1}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$\\frac{1}{x^${n}} = x^{-${n}}$, donc $f'(x) = -${n} \\cdot x^{-${n+1}} = -\\frac{${n}}{x^${n+1}}$.`
    };
}

function genererQuestionInverseLimite() {
    const types = ['plus_infini', 'moins_infini', 'zero_plus', 'zero_moins'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'plus_infini':
            const question1 = `D'après le cours, $\\displaystyle \\lim_{x \\to +\\infty} \\frac{1}{x}$ vaut :`;
            const options1 = [`$0$`, `$+\\infty$`, `$-\\infty$`, `$1$`];
            const melange1 = melangerOptions({options: options1, correct: 0});
            return {
                question: question1,
                options: melange1.options,
                correct: melange1.correct,
                explication: `Quand $x$ devient très grand, $\\frac{1}{x}$ se rapproche de $0$. L'axe des abscisses est asymptote horizontale.`
            };
            
        case 'moins_infini':
            const question2 = `D'après le cours, $\\displaystyle \\lim_{x \\to -\\infty} \\frac{1}{x}$ vaut :`;
            const options2 = [`$0$`, `$+\\infty$`, `$-\\infty$`, `$1$`];
            const melange2 = melangerOptions({options: options2, correct: 0});
            return {
                question: question2,
                options: melange2.options,
                correct: melange2.correct,
                explication: `Quand $x$ devient très grand dans les négatifs, $\\frac{1}{x}$ se rapproche de $0$.`
            };
            
        case 'zero_plus':
            const question3 = `D'après le cours, $\\displaystyle \\lim_{x \\to 0^+} \\frac{1}{x}$ vaut :`;
            const options3 = [`$+\\infty$`, `$0$`, `$-\\infty$`, `$1$`];
            const melange3 = melangerOptions({options: options3, correct: 0});
            return {
                question: question3,
                options: melange3.options,
                correct: melange3.correct,
                explication: `Quand $x$ se rapproche de $0$ par valeurs positives, $\\frac{1}{x}$ devient très grand (tend vers $+\\infty$).`
            };
            
        case 'zero_moins':
            const question4 = `D'après le cours, $\\displaystyle \\lim_{x \\to 0^-} \\frac{1}{x}$ vaut :`;
            const options4 = [`$-\\infty$`, `$0$`, `$+\\infty$`, `$1$`];
            const melange4 = melangerOptions({options: options4, correct: 0});
            return {
                question: question4,
                options: melange4.options,
                correct: melange4.correct,
                explication: `Quand $x$ se rapproche de $0$ par valeurs négatives, $\\frac{1}{x}$ devient très grand dans les négatifs (tend vers $-\\infty$).`
            };
    }
}

function genererQuestionInverseVariation() {
    const question = `Sur quel(s) intervalle(s) la fonction inverse $f(x) = \\frac{1}{x}$ est-elle décroissante ?`;
    const bonneReponse = `$]-\\infty ; 0[$ et $]0 ; +\\infty[$`;
    const options = [
        bonneReponse,
        `$\\mathbb{R}^*$ tout entier`,
        `$]0 ; +\\infty[$ seulement`,
        `$]-\\infty ; 0[$ seulement`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = -\\frac{1}{x^2} < 0$ sur $\\mathbb{R}^*$, donc $f$ est décroissante sur chaque intervalle de son domaine.`
    };
}

function genererQuestionInverseAsymptote() {
    const type = Math.random() < 0.5 ? 'horizontale' : 'verticale';
    
    if (type === 'horizontale') {
        const question = `Quelle est l'asymptote horizontale de la fonction inverse $f(x) = \\frac{1}{x}$ ?`;
        const bonneReponse = `$y = 0$ (axe des abscisses)`;
        const options = [
            bonneReponse,
            `$x = 0$ (axe des ordonnées)`,
            `$y = 1$`,
            `Il n'y en a pas`
        ];
        
        const melange = melangerOptions({options, correct: 0});
        return {
            question,
            options: melange.options,
            correct: melange.correct,
            explication: `Quand $x \\to \\pm\\infty$, $f(x) \\to 0$, donc $y = 0$ est asymptote horizontale.`
        };
    } else {
        const question = `Quelle est l'asymptote verticale de la fonction inverse $f(x) = \\frac{1}{x}$ ?`;
        const bonneReponse = `$x = 0$ (axe des ordonnées)`;
        const options = [
            bonneReponse,
            `$y = 0$ (axe des abscisses)`,
            `$x = 1$`,
            `Il n'y en a pas`
        ];
        
        const melange = melangerOptions({options, correct: 0});
        return {
            question,
            options: melange.options,
            correct: melange.correct,
            explication: `Quand $x \\to 0^+$, $f(x) \\to +\\infty$ et quand $x \\to 0^-$, $f(x) \\to -\\infty$, donc $x = 0$ est asymptote verticale.`
        };
    }
}

function genererQuestionAffine() {
    const a = Math.floor(Math.random() * 10) + 1; // 1 à 10
    const b = Math.floor(Math.random() * 20) - 10; // -10 à 10
    const signe = b >= 0 ? '+' : '';
    
    const question = `Si $f(x) = ${a}x ${signe} ${b}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$${a}$`;
    const options = [
        bonneReponse,
        `$${b}$`,
        `$${a}x$`,
        `$${a + b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `La dérivée de $${a}x ${signe} ${b}$ est $${a}$ (coefficient de $x$).`
    };
}

function genererQuestionPuissance() {
    const n = Math.floor(Math.random() * 8) + 2; // 2 à 9
    
    const question = `Si $f(x) = x^{${n}}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$${n}x^{${n-1}}$`;
    const options = [
        bonneReponse,
        `$x^{${n-1}}$`,
        `$x^{${n}}$`,
        `$${n-1}x^{${n-2}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(x^n)' = nx^{n-1}$, donc $(x^{${n}})' = ${n}x^{${n-1}}$.`
    };
}

function genererQuestionInverse() {
    const coef = Math.floor(Math.random() * 5) + 1; // 1 à 5
    const puissance = Math.floor(Math.random() * 3) + 1; // 1 à 3
    
    const question = `Si $f(x) = \\frac{${coef}}{x^${puissance}}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$-\\frac{${coef * puissance}}{x^{${puissance + 1}}}$`;
    const options = [
        bonneReponse,
        `$\\frac{${coef * puissance}}{x^{${puissance + 1}}}$`,
        `$-\\frac{${coef}}{x^{${puissance + 1}}}$`,
        `$-\\frac{${coef}}{${puissance}x^{${puissance - 1}}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$\\frac{${coef}}{x^${puissance}} = ${coef}x^{-${puissance}}$, donc $f'(x) = ${coef} \\cdot (-${puissance})x^{-${puissance + 1}} = -\\frac{${coef * puissance}}{x^{${puissance + 1}}}$.`
    };
}

function genererQuestionSomme() {
    const a = Math.floor(Math.random() * 5) + 1;
    const n = Math.floor(Math.random() * 4) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    
    const question = `Si $f(x) = ${a}x^${n} + ${b}x$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$${a * n}x^{${n-1}} + ${b}$`;
    const options = [
        bonneReponse,
        `$${a}x^{${n-1}} + ${b}$`,
        `$${a * n}x^${n} + ${b}x$`,
        `$${a}x^${n} + ${b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(${a}x^${n} + ${b}x)' = ${a} \\cdot ${n}x^{${n-1}} + ${b} = ${a * n}x^{${n-1}} + ${b}$.`
    };
}

function genererQuestionProduit() {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 6) + 2;
    
    const question = `Si $f(x) = (x + ${a})(x - ${b})$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$2x + ${a - b}$`;
    const options = [
        bonneReponse,
        `$2x - ${b - a}$`,
        `$(x + ${a}) + (x - ${b})$`,
        `$x^2 + ${a - b}x - ${a * b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Développer d'abord: $(x + ${a})(x - ${b}) = x^2 + ${a - b}x - ${a * b}$, donc $f'(x) = 2x + ${a - b}$.`
    };
}

function genererQuestionQuotient() {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 4) + 1;
    
    const question = `Si $f(x) = \\frac{${a}x}{x + ${b}}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$\\frac{${a * b}}{(x + ${b})^2}$`;
    const options = [
        bonneReponse,
        `$\\frac{${a}}{(x + ${b})^2}$`,
        `$\\frac{${a}x - ${a * b}}{(x + ${b})^2}$`,
        `$\\frac{${a}}{x + ${b}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Règle du quotient: $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$. Ici $u' = ${a}$, $v' = 1$.`
    };
}

function genererQuestionComposee() {
    const a = Math.floor(Math.random() * 3) + 2; // 2 à 4
    const b = Math.floor(Math.random() * 4) + 1; // 1 à 4
    const c = Math.floor(Math.random() * 6) + 1; // 1 à 6
    const puissance = Math.floor(Math.random() * 2) + 2; // 2 ou 3
    
    const question = `Si $f(x) = (${a}x + ${b})^${puissance}$, alors $f'(x)$ vaut :`;
    const bonneReponse = `$${puissance * a}(${a}x + ${b})^{${puissance - 1}}$`;
    const options = [
        bonneReponse,
        `$${puissance}(${a}x + ${b})^{${puissance - 1}}$`,
        `$(${a}x + ${b})^{${puissance - 1}}$`,
        `$${a}(${a}x + ${b})^{${puissance}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Fonction composée: $(u^n)' = n \\cdot u' \\cdot u^{n-1}$. Ici $u = ${a}x + ${b}$, $u' = ${a}$.`
    };
}

function genererProblemeDerivee() {
    const problemes = [
        'vitesse', 'tangente', 'variation', 'optimisation', 'physique'
    ];
    const type = problemes[Math.floor(Math.random() * problemes.length)];
    
    switch (type) {
        case 'vitesse':
            return genererProblemeVitesse();
        case 'tangente':
            return genererProblemeTangente();
        case 'variation':
            return genererProblemeVariation();
        case 'optimisation':
            return genererProblemeOptimisation();
        case 'physique':
            return genererProblemePhysique();
        default:
            return genererProblemeVitesse();
    }
}

function genererProblemeVitesse() {
    const a = Math.floor(Math.random() * 3) + 2;
    const b = Math.floor(Math.random() * 5) + 3;
    const c = Math.floor(Math.random() * 10) + 5;
    const t0 = Math.floor(Math.random() * 3) + 1;
    
    const question = `La position d'un mobile est donnée par $x(t) = ${a}t^2 + ${b}t + ${c}$ (en mètres). Quelle est sa vitesse instantanée à $t = ${t0}$ s ?`;
    const vitesse = 2 * a * t0 + b;
    const bonneReponse = `$${vitesse}$ m/s`;
    const options = [
        bonneReponse,
        `$${2 * a * t0}$ m/s`,
        `$${a * t0 * t0 + b * t0 + c}$ m/s`,
        `$${2 * a + b}$ m/s`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `La vitesse est la dérivée de la position: $v(t) = x'(t) = ${2 * a}t + ${b}$. Donc $v(${t0}) = ${vitesse}$ m/s.`
    };
}

function genererProblemeTangente() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    const x0 = Math.floor(Math.random() * 3) + 1;
    
    const question = `Soit $f(x) = ${a}x^2 + ${b}$. Quel est le coefficient directeur de la tangente à la courbe de $f$ au point d'abscisse $x = ${x0}$ ?`;
    const coeff = 2 * a * x0;
    const bonneReponse = `$${coeff}$`;
    const options = [
        bonneReponse,
        `$${2 * a}$`,
        `$${a * x0 * x0 + b}$`,
        `$${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Le coefficient directeur de la tangente en $x_0$ est $f'(x_0)$. Ici $f'(x) = ${2 * a}x$, donc $f'(${x0}) = ${coeff}$.`
    };
}

function genererProblemeVariation() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 6) + 2;
    
    const question = `Soit $f(x) = -${a}x^2 + ${b}x$. Sur quel intervalle la fonction $f$ est-elle croissante ?`;
    const sommet = b / (2 * a);
    const bonneReponse = sommet % 1 === 0 
        ? `$]-\\infty, ${sommet}[$`
        : `$]-\\infty, \\frac{${b}}{${2 * a}}[$`;
    
    const options = [
        bonneReponse,
        `$]0, +\\infty[$`,
        `$\\mathbb{R}$`,
        `$]-\\infty, 0[$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = -${2 * a}x + ${b}$. $f'(x) > 0 \\Leftrightarrow x < \\frac{${b}}{${2 * a}}$. Donc $f$ est croissante sur ${bonneReponse.slice(1, -1)}.`
    };
}

function genererProblemeOptimisation() {
    const longueur = Math.floor(Math.random() * 10) + 20;
    const largeur = Math.floor(Math.random() * 8) + 12;
    
    const question = `Un rectangle a un périmètre de ${2 * (longueur + largeur)} cm. Si sa longueur est $x$ cm, exprimer son aire $A(x)$ puis trouver $A'(x)$.`;
    const perimetre = 2 * (longueur + largeur);
    const bonneReponse = `$A'(x) = ${perimetre / 2} - 2x$`;
    const options = [
        bonneReponse,
        `$A'(x) = ${perimetre} - 2x$`,
        `$A'(x) = 2x - ${perimetre / 2}$`,
        `$A'(x) = x - ${perimetre / 4}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Si la longueur est $x$, la largeur est $\\frac{${perimetre} - 2x}{2} = ${perimetre / 2} - x$. Donc $A(x) = x(${perimetre / 2} - x) = ${perimetre / 2}x - x^2$ et $A'(x) = ${perimetre / 2} - 2x$.`
    };
}

function genererProblemePhysique() {
    const g = 10; // accélération de pesanteur simplifiée
    const v0 = Math.floor(Math.random() * 20) + 10;
    const h0 = Math.floor(Math.random() * 50) + 20;
    
    const question = `Un projectile est lancé verticalement vers le haut avec une vitesse initiale de ${v0} m/s depuis une hauteur de ${h0} m. Sa hauteur est $h(t) = -5t^2 + ${v0}t + ${h0}$. Quelle est sa vitesse à $t = 1$ s ?`;
    const vitesse = -10 + v0;
    const bonneReponse = `$${vitesse}$ m/s`;
    const options = [
        bonneReponse,
        `$${v0}$ m/s`,
        `$${-5 + v0 + h0}$ m/s`,
        `$-10$ m/s`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `La vitesse est $v(t) = h'(t) = -10t + ${v0}$. À $t = 1$ s: $v(1) = -10 + ${v0} = ${vitesse}$ m/s.`
    };
}

// Générateur infini de questions - Limites (chapitre 2 : limites à l'infini)
function genererQuestionLimite() {
    const types = [
        'definition_plus_infini', 'definition_moins_infini', 'definition_finie', 'polynome_positif', 'polynome_negatif', 'rationnelle_meme_degre'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'definition_plus_infini':
            return genererQuestionDefinitionPlusInfini();
        case 'definition_moins_infini':
            return genererQuestionDefinitionMoinsInfini();
        case 'definition_finie':
            return genererQuestionDefinitionFinie();
        case 'polynome_positif':
            return genererQuestionPolynomePositif();
        case 'polynome_negatif':
            return genererQuestionPolynomeNegatif();
        case 'rationnelle_meme_degre':
            return genererQuestionRationnelleMemeDegreSimple();
        default:
            return genererQuestionDefinitionPlusInfini();
    }
}

function genererQuestionDefinitionPlusInfini() {
    const a = Math.floor(Math.random() * 4) + 2;
    const question = `Soit $f(x) = ${a}x^2$. Que signifie $\\displaystyle \\lim_{x \\to +\\infty} f(x) = +\\infty$ ?`;
    const bonneReponse = `$f(x)$ est aussi grand que l'on veut dès que $x$ est assez grand`;
    const options = [
        bonneReponse,
        `$f(x)$ tend vers une valeur finie`,
        `$f(x)$ oscille indéfiniment`,
        `$f(x)$ n'existe pas pour $x$ grand`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Par définition, $\\lim_{x \\to +\\infty} f(x) = +\\infty$ signifie que $f(x)$ devient arbitrairement grand quand $x$ devient grand.`
    };
}

function genererQuestionDefinitionMoinsInfini() {
    const a = Math.floor(Math.random() * 4) + 2;
    const question = `Soit $f(x) = -${a}x^3$. Que signifie $\\displaystyle \\lim_{x \\to +\\infty} f(x) = -\\infty$ ?`;
    const bonneReponse = `$f(x)$ est aussi petit que l'on veut dès que $x$ est assez grand`;
    const options = [
        bonneReponse,
        `$f(x)$ tend vers $0$`,
        `$f(x)$ devient positif`,
        `$f(x)$ n'est pas définie`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Par définition, $\\lim_{x \\to +\\infty} f(x) = -\\infty$ signifie que $f(x)$ devient arbitrairement petit (négatif) quand $x$ devient grand.`
    };
}

function genererQuestionDefinitionFinie() {
    const l = Math.floor(Math.random() * 5) + 1;
    const question = `Que signifie $\\displaystyle \\lim_{x \\to +\\infty} f(x) = ${l}$ ?`;
    const bonneReponse = `La distance entre $f(x)$ et $${l}$ devient aussi proche de zéro que l'on veut`;
    const options = [
        bonneReponse,
        `$f(x) = ${l}$ pour $x$ grand`,
        `$f(x)$ oscille autour de $${l}$`,
        `$f(x)$ dépasse toujours $${l}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Une limite finie signifie que $f(x)$ se rapproche arbitrairement de la valeur $${l}$ quand $x \\to +\\infty$.`
    };
}

function genererQuestionRationnelleZero() {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 3) + 1;
    
    const question = `$\\displaystyle \\lim_{x \\to +\\infty} \\frac{${a}x + ${b}}{${c}x^2 + 1}$ vaut :`;
    const bonneReponse = `$0$`;
    
    const options = [
        bonneReponse,
        `$\\frac{${a}}{${c}}$`,
        `$+\\infty$`,
        `$${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Degré numérateur (1) < degré dénominateur (2), donc la limite est $0$.`
    };
}

function genererQuestionInverseZero() {
    const a = Math.floor(Math.random() * 5) + 1;
    const signe = Math.random() < 0.5 ? '+' : '-';
    const cote = signe === '+' ? '^+' : '^-';
    const resultat = signe === '+' ? '+\\infty' : '-\\infty';
    
    const question = `$\\displaystyle \\lim_{x \\to 0${cote}} \\frac{${a}}{x}$ vaut :`;
    const bonneReponse = `$${resultat}$`;
    
    const options = [
        bonneReponse,
        signe === '+' ? `$-\\infty$` : `$+\\infty$`,
        `$0$`,
        `$${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `En $0${cote}$, $\\frac{${a}}{x}$ tend vers $${resultat}$.`
    };
}

function genererQuestionLogarithme() {
    const types = ['zero_plus', 'infini', 'sur_x'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (type === 'zero_plus') {
        const question = `$\\displaystyle \\lim_{x \\to 0^+} \\ln x$ vaut :`;
        const bonneReponse = `$-\\infty$`;
        const options = [bonneReponse, `$+\\infty$`, `$0$`, `$1$`];
        return {
            question,
            options: melangerOptions({options, correct: 0}).options,
            correct: melangerOptions({options, correct: 0}).correct,
            explication: `Comportement classique: $\\ln x \\to -\\infty$ quand $x \\to 0^+$.`
        };
    } else if (type === 'sur_x') {
        const question = `$\\displaystyle \\lim_{x \\to +\\infty} \\frac{\\ln x}{x}$ vaut :`;
        const bonneReponse = `$0$`;
        const options = [bonneReponse, `$+\\infty$`, `$1$`, `$-\\infty$`];
        return {
            question,
            options: melangerOptions({options, correct: 0}).options,
            correct: melangerOptions({options, correct: 0}).correct,
            explication: `Hiérarchie de croissance: $\\ln x \\ll x$.`
        };
    }
}

function genererQuestionExponentielle() {
    const n = Math.floor(Math.random() * 4) + 2;
    const question = `$\\displaystyle \\lim_{x \\to +\\infty} \\frac{e^x}{x^${n}}$ vaut :`;
    const bonneReponse = `$+\\infty$`;
    
    const options = [
        bonneReponse,
        `$0$`,
        `$1$`,
        `$${n}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$e^x$ domine toute puissance polynomiale.`
    };
}

function genererQuestionPolynomeInfini() {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    const c = Math.floor(Math.random() * 6) + 1;
    const degre = Math.floor(Math.random() * 2) + 2; // 2 ou 3
    
    const question = degre === 2 
        ? `$\\displaystyle \\lim_{x \\to +\\infty} (${a}x^2 + ${b}x + ${c})$ vaut :`
        : `$\\displaystyle \\lim_{x \\to +\\infty} (${a}x^3 - ${b}x + ${c})$ vaut :`;
    
    const bonneReponse = `$+\\infty$`;
    
    const options = [
        bonneReponse,
        `$-\\infty$`,
        `$${c}$`,
        `$0$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Le terme de plus haut degré $${a}x^${degre}$ est positif, donc la limite est $+\\infty$ quand $x \\to +\\infty$.`
    };
}

function genererQuestionPolynomeMoinsInfini() {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    const c = Math.floor(Math.random() * 6) + 1;
    const degre = Math.floor(Math.random() * 2) + 2; // 2 ou 3
    
    const question = degre === 2 
        ? `$\\displaystyle \\lim_{x \\to +\\infty} (-${a}x^2 + ${b}x + ${c})$ vaut :`
        : `$\\displaystyle \\lim_{x \\to +\\infty} (-${a}x^3 + ${b}x - ${c})$ vaut :`;
    
    const bonneReponse = `$-\\infty$`;
    
    const options = [
        bonneReponse,
        `$+\\infty$`,
        `$${c}$`,
        `$0$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Le terme de plus haut degré $-${a}x^${degre}$ est négatif, donc la limite est $-\\infty$ quand $x \\to +\\infty$.`
    };
}

function genererQuestionRationnelleInfiniNegatif() {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 3) + 1;
    const d = Math.floor(Math.random() * 4) + 1;
    
    const question = `$\\displaystyle \\lim_{x \\to +\\infty} \\frac{-${a}x^2 + ${b}x}{${c}x^2 + ${d}}$ vaut :`;
    const resultat = -a / c;
    const bonneReponse = resultat % 1 === 0 ? `$${resultat}$` : `$-\\frac{${a}}{${c}}$`;
    
    const options = [
        bonneReponse,
        `$\\frac{${a}}{${c}}$`,
        `$0$`,
        `$-\\infty$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Même degré (2): rapport des coefficients dominants $\\frac{-${a}}{${c}} = ${bonneReponse.slice(1, -1)}$.`
    };
}

function genererQuestionInverseInfini() {
    const a = Math.floor(Math.random() * 5) + 1;
    const signe = Math.random() < 0.5 ? '+' : '-';
    const direction = Math.random() < 0.5 ? '+\\infty' : '-\\infty';
    
    const question = `$\\displaystyle \\lim_{x \\to ${direction}} \\frac{${a}}{x}$ vaut :`;
    const bonneReponse = `$0$`;
    
    const options = [
        bonneReponse,
        `$+\\infty$`,
        `$-\\infty$`,
        `$${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Quand $x \\to \\pm\\infty$, $\\frac{${a}}{x} \\to 0$ car le dénominateur devient très grand.`
    };
}

// Variables globales pour les quiz
let quizDeriveesCourant = [];
let quizLimitesCourant = [];
let quizApplicationsCourant = [];

// Générateur de questions d'applications - SIMPLES ET INTERACTIVES
function genererQuestionApplication() {
    // 20% de tableaux interactifs (1 chance sur 5)
    if (Math.random() < 0.2) {
        return genererTableauInteractif();
    }
    
    const types = [
        'cout_simple', 'benefice_simple', 'derivee_simple', 'optimisation_simple', 
        'cout_unitaire_basic', 'signe_derivee', 'extremum_basic', 'calcul_direct'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'cout_simple':
            return genererCoutSimple();
        case 'benefice_simple':
            return genererBeneficeSimple();
        case 'derivee_simple':
            return genererDeriveeSimple();
        case 'optimisation_simple':
            return genererOptimisationSimple();
        case 'cout_unitaire_basic':
            return genererCoutUnitaireBasic();
        case 'signe_derivee':
            return genererSigneDerivee();
        case 'extremum_basic':
            return genererExtremumBasic();
        case 'calcul_direct':
            return genererCalculDirect();
        default:
            return genererCoutSimple();
    }
}

// NOUVELLES FONCTIONS SIMPLES

function genererTableauInteractif() {
    const c = [25, 36, 49, 64, 81, 100][Math.floor(Math.random() * 6)];
    const racine = Math.sqrt(c);
    const tableauId = 'tab_' + Date.now();
    
    // Stocker les données pour la correction
    window.tableauxData = window.tableauxData || {};
    window.tableauxData[tableauId] = {
        signes: ['−', '+'],
        variations: ['↘', '↗']
    };
    
    const question = `
        <div style="background: white; color: black; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="text-align: center; color: #333; margin-bottom: 20px;">📋 Tableau de variation à compléter</h3>
            <p style="text-align: center; margin-bottom: 20px;"><strong>f(x) = x + 50 + ${c}/x</strong> sur [1; 20]</p>
            <p style="text-align: center; margin-bottom: 20px; color: #666;"><em>Clique sur les cases colorées pour les modifier</em></p>
            
            <table id="${tableauId}" style="width: 100%; border-collapse: collapse; margin: 20px auto;">
                <tr>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #ddd; font-weight: bold;">x</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;">1</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;"></td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #e3f2fd; font-weight: bold;">${racine}</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;"></td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;">20</td>
                </tr>
                <tr>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #ddd; font-weight: bold;">f'(x)</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;"></td>
                    <td class="cell-signe" data-index="0" data-table="${tableauId}" onclick="clickCellSigne(this)" style="border: 2px solid #333; padding: 15px; text-align: center; background: #ffeb3b; cursor: pointer; font-size: 24px; font-weight: bold;">?</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #e3f2fd; font-weight: bold;">0</td>
                    <td class="cell-signe" data-index="1" data-table="${tableauId}" onclick="clickCellSigne(this)" style="border: 2px solid #333; padding: 15px; text-align: center; background: #ffeb3b; cursor: pointer; font-size: 24px; font-weight: bold;">?</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;"></td>
                </tr>
                <tr>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #ddd; font-weight: bold;">f(x)</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;">${(1 + 50 + c).toFixed(0)}</td>
                    <td class="cell-variation" data-index="0" data-table="${tableauId}" onclick="clickCellVariation(this)" style="border: 2px solid #333; padding: 15px; text-align: center; background: #c8e6c9; cursor: pointer; font-size: 24px; font-weight: bold;">?</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center; background: #ffcdd2; font-weight: bold;">${(racine + 50 + c/racine).toFixed(0)}</td>
                    <td class="cell-variation" data-index="1" data-table="${tableauId}" onclick="clickCellVariation(this)" style="border: 2px solid #333; padding: 15px; text-align: center; background: #c8e6c9; cursor: pointer; font-size: 24px; font-weight: bold;">?</td>
                    <td style="border: 2px solid #333; padding: 15px; text-align: center;">${(20 + 50 + c/20).toFixed(0)}</td>
                </tr>
            </table>
            
            <div style="text-align: center; margin: 20px 0;">
                <button onclick="verifierTableau('${tableauId}')" style="background: #4caf50; color: white; border: none; padding: 12px 25px; border-radius: 8px; margin: 5px; cursor: pointer; font-weight: bold; font-size: 16px;">✓ VÉRIFIER</button>
                <button onclick="montrerSolutionTableau('${tableauId}')" style="background: #ff9800; color: white; border: none; padding: 12px 25px; border-radius: 8px; margin: 5px; cursor: pointer; font-weight: bold; font-size: 16px;">💡 SOLUTION</button>
                <button onclick="resetTableau('${tableauId}')" style="background: #f44336; color: white; border: none; padding: 12px 25px; border-radius: 8px; margin: 5px; cursor: pointer; font-weight: bold; font-size: 16px;">🔄 RESET</button>
            </div>
            
            <div id="result_${tableauId}" style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 18px;"></div>
        </div>
    `;
    
    return {
        question,
        options: ['Complété'],
        correct: 0,
        explication: `Tableau avec f'(x) = 1 - ${c}/x², minimum en x = ${racine}.`
    };
}

// Fonctions globales pour les tableaux
function clickCellSigne(cell) {
    const current = cell.textContent.trim();
    if (current === '?') {
        cell.textContent = '+';
        cell.style.background = '#2196f3';
    } else if (current === '+') {
        cell.textContent = '−';
        cell.style.background = '#f44336';
    } else {
        cell.textContent = '?';
        cell.style.background = '#ffeb3b';
    }
}

function clickCellVariation(cell) {
    const current = cell.textContent.trim();
    if (current === '?') {
        cell.textContent = '↗';
        cell.style.background = '#4caf50';
    } else if (current === '↗') {
        cell.textContent = '↘';
        cell.style.background = '#f44336';
    } else {
        cell.textContent = '?';
        cell.style.background = '#c8e6c9';
    }
}

function verifierTableau(tableauId) {
    const data = window.tableauxData[tableauId];
    if (!data) return;
    
    const signes = document.querySelectorAll(`#${tableauId} .cell-signe`);
    const variations = document.querySelectorAll(`#${tableauId} .cell-variation`);
    let score = 0;
    
    signes.forEach((cell, index) => {
        const correct = data.signes[index];
        if (cell.textContent.trim() === correct) {
            cell.style.background = '#4caf50';
            cell.style.color = 'white';
            score++;
        } else if (cell.textContent.trim() !== '?') {
            cell.style.background = '#f44336';
            cell.style.color = 'white';
        }
    });
    
    variations.forEach((cell, index) => {
        const correct = data.variations[index];
        if (cell.textContent.trim() === correct) {
            cell.style.background = '#4caf50';
            cell.style.color = 'white';
            score++;
        } else if (cell.textContent.trim() !== '?') {
            cell.style.background = '#f44336';
            cell.style.color = 'white';
        }
    });
    
    const resultDiv = document.getElementById(`result_${tableauId}`);
    if (score === 4) {
        resultDiv.innerHTML = '<span style="color: #4caf50;">🎉 PARFAIT ! 4/4</span>';
    } else if (score >= 2) {
        resultDiv.innerHTML = `<span style="color: #ff9800;">👍 Bien ! ${score}/4</span>`;
    } else {
        resultDiv.innerHTML = `<span style="color: #f44336;">💪 Continue ! ${score}/4</span>`;
    }
}

function montrerSolutionTableau(tableauId) {
    const data = window.tableauxData[tableauId];
    if (!data) return;
    
    const signes = document.querySelectorAll(`#${tableauId} .cell-signe`);
    const variations = document.querySelectorAll(`#${tableauId} .cell-variation`);
    
    signes.forEach((cell, index) => {
        cell.textContent = data.signes[index];
        cell.style.background = '#4caf50';
        cell.style.color = 'white';
    });
    
    variations.forEach((cell, index) => {
        cell.textContent = data.variations[index];
        cell.style.background = '#4caf50';
        cell.style.color = 'white';
    });
    
    document.getElementById(`result_${tableauId}`).innerHTML = '<span style="color: #4caf50;">💡 Solution affichée</span>';
}

function resetTableau(tableauId) {
    const cells = document.querySelectorAll(`#${tableauId} .cell-interactive`);
    cells.forEach(cell => {
        cell.textContent = '?';
        if (cell.classList.contains('cell-signe')) {
            cell.style.background = '#ffeb3b';
        } else {
            cell.style.background = '#c8e6c9';
        }
        cell.style.color = 'black';
    });
    
    document.getElementById(`result_${tableauId}`).innerHTML = '';
}

function clickSigne(cell, tableauId) {
    const current = cell.textContent;
    if (current === '?') cell.textContent = '+';
    else if (current === '+') cell.textContent = '−';
    else cell.textContent = '?';
}

function clickVariation(cell, tableauId) {
    const current = cell.textContent;
    if (current === '?') cell.textContent = '↗';
    else if (current === '↗') cell.textContent = '↘';
    else cell.textContent = '?';
}

// Fonctions pour VRAI tableau de variation
function cycleSigne(cell) {
    const current = cell.textContent.trim();
    if (current === '?') {
        cell.textContent = '+';
        cell.style.background = '#2196f3';
        cell.style.color = 'white';
    } else if (current === '+') {
        cell.textContent = '−';
        cell.style.background = '#f44336';
        cell.style.color = 'white';
    } else {
        cell.textContent = '?';
        cell.style.background = '#ff9800';
        cell.style.color = 'white';
    }
    
    // Effet visuel
    cell.style.transform = 'scale(0.9)';
    setTimeout(() => { cell.style.transform = 'scale(1)'; }, 100);
}

function cycleVariation(cell) {
    const current = cell.textContent.trim();
    if (current === '?') {
        cell.innerHTML = '↗';
        cell.style.background = '#4caf50';
        cell.style.color = 'white';
    } else if (current === '↗') {
        cell.innerHTML = '↘';
        cell.style.background = '#f44336';
        cell.style.color = 'white';
    } else {
        cell.textContent = '?';
        cell.style.background = '#ff9800';
        cell.style.color = 'white';
    }
    
    // Effet visuel
    cell.style.transform = 'scale(0.9)';
    setTimeout(() => { cell.style.transform = 'scale(1)'; }, 100);
}

function verifierTableauComplet(tableauId) {
    const tableau = document.getElementById(tableauId);
    const signes = tableau.querySelectorAll('.interactive-signe');
    const variations = tableau.querySelectorAll('.interactive-variation');
    const resultat = document.getElementById(`resultat_${tableauId}`);
    
    let correct = 0;
    let total = 4; // 2 signes + 2 variations
    
    signes.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const content = cell.textContent.trim();
        if ((answer === 'negative' && content === '−') || (answer === 'positive' && content === '+')) {
            correct++;
            cell.style.border = '3px solid #4caf50';
        } else if (content !== '?') {
            cell.style.border = '3px solid #f44336';
        }
    });
    
    variations.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const content = cell.innerHTML.trim();
        if ((answer === 'decreasing' && content === '↘') || (answer === 'increasing' && content === '↗')) {
            correct++;
            cell.style.border = '3px solid #4caf50';
        } else if (content !== '?') {
            cell.style.border = '3px solid #f44336';
        }
    });
    
    const pourcentage = Math.round((correct / total) * 100);
    resultat.innerHTML = `
        <div class="score-final ${pourcentage === 100 ? 'parfait' : pourcentage >= 75 ? 'bien' : 'moyen'}">
            ${pourcentage === 100 ? '🎉 PARFAIT' : pourcentage >= 75 ? '👍 BIEN' : '💪 CONTINUE'} 
            ${correct}/${total} (${pourcentage}%)
        </div>
    `;
}

function solutionTableauComplet(tableauId) {
    const tableau = document.getElementById(tableauId);
    const signes = tableau.querySelectorAll('.interactive-signe');
    const variations = tableau.querySelectorAll('.interactive-variation');
    
    signes.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        cell.textContent = answer === 'negative' ? '−' : '+';
        cell.style.background = '#4caf50';
        cell.style.color = 'white';
        cell.style.border = '2px solid #2e7d32';
    });
    
    variations.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        cell.innerHTML = answer === 'decreasing' ? '↘' : '↗';
        cell.style.background = '#4caf50';
        cell.style.color = 'white';
        cell.style.border = '2px solid #2e7d32';
    });
    
    const resultat = document.getElementById(`resultat_${tableauId}`);
    resultat.innerHTML = `<div class="score-final solution">💡 SOLUTION AFFICHÉE</div>`;
}

function resetTableauComplet(tableauId) {
    const tableau = document.getElementById(tableauId);
    const interactives = tableau.querySelectorAll('.interactive-signe, .interactive-variation');
    
    interactives.forEach(cell => {
        cell.textContent = '?';
        cell.style.background = '#ff9800';
        cell.style.color = 'white';
        cell.style.border = '1px solid #e65100';
    });
    
    const resultat = document.getElementById(`resultat_${tableauId}`);
    resultat.innerHTML = '';
}

function showCellFeedback(cell, message, type) {
    const feedback = document.createElement('div');
    feedback.className = `cell-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: bold;
        z-index: 1000;
        animation: feedback-appear 2s ease;
    `;
    
    cell.style.position = 'relative';
    cell.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

function corrigerTableau(tableauId) {
    const tableau = document.getElementById(tableauId);
    const signeCells = tableau.querySelectorAll('.signe-cell');
    const variationCells = tableau.querySelectorAll('.variation-cell');
    const correctionDiv = document.getElementById(`correction_${tableauId}`);
    
    let correct = 0;
    let total = signeCells.length + variationCells.length;
    
    // Vérifier les signes
    signeCells.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const isCorrect = (answer === 'positive' && cell.innerHTML.includes('+')) || 
                          (answer === 'negative' && cell.innerHTML.includes('−'));
        if (isCorrect) correct++;
    });
    
    // Vérifier les variations
    variationCells.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const isCorrect = (answer === 'increasing' && cell.innerHTML.includes('↗')) || 
                          (answer === 'decreasing' && cell.innerHTML.includes('↘'));
        if (isCorrect) correct++;
    });
    
    const pourcentage = Math.round((correct / total) * 100);
    correctionDiv.innerHTML = `
        <div class="score-tableau ${pourcentage === 100 ? 'perfect' : pourcentage >= 50 ? 'good' : 'bad'}">
            📊 Tableau : ${correct}/${total} correct (${pourcentage}%)
            ${pourcentage === 100 ? ' 🎉 Parfait !' : pourcentage >= 50 ? ' 👍 Bien !' : ' 💪 Continue !'}
        </div>
    `;
}

function montrerSolution(tableauId) {
    const tableau = document.getElementById(tableauId);
    const signeCells = tableau.querySelectorAll('.signe-cell');
    const variationCells = tableau.querySelectorAll('.variation-cell');
    
    // Montrer les bonnes réponses
    signeCells.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const symbol = answer === 'positive' ? '+' : '−';
        cell.innerHTML = `<div class="cell-value solution">${symbol}</div>`;
        cell.classList.add('filled');
        cell.classList.remove('wrong');
    });
    
    variationCells.forEach(cell => {
        const answer = cell.getAttribute('data-answer');
        const arrow = answer === 'increasing' ? '↗' : '↘';
        cell.innerHTML = `<div class="cell-value solution">${arrow}</div>`;
        cell.classList.add('filled');
        cell.classList.remove('wrong');
    });
    
    const correctionDiv = document.getElementById(`correction_${tableauId}`);
    correctionDiv.innerHTML = `
        <div class="score-tableau solution-shown">
            💡 Solution affichée ! Étudie bien le tableau pour comprendre.
        </div>
    `;
}

function genererCoutSimple() {
    const objets = ['stylos', 'cahiers', 'T-shirts', 'pizzas', 'gâteaux', 'réparations', 'coupes de cheveux'];
    const objet = objets[Math.floor(Math.random() * objets.length)];
    const prix = Math.floor(Math.random() * 20) + 5;
    const coutFixe = Math.floor(Math.random() * 50) + 20;
    const coutVariable = Math.floor(Math.random() * 10) + 2;
    
    const question = `Un artisan vend des ${objet} à ${prix}€ l'unité. Son coût est $C(x) = ${coutVariable}x + ${coutFixe}$. Quel est son bénéfice pour $x$ unités ?`;
    const benefice = prix - coutVariable;
    const bonneReponse = `$B(x) = ${benefice}x - ${coutFixe}$`;
    
    const options = [
        bonneReponse,
        `$B(x) = ${prix}x - ${coutFixe}$`,
        `$B(x) = ${benefice}x + ${coutFixe}$`,
        `$B(x) = ${prix - coutFixe}x$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Bénéfice = Recette - Coût = ${prix}x - (${coutVariable}x + ${coutFixe}) = ${benefice}x - ${coutFixe}$.`
    };
}

function genererBeneficeSimple() {
    const a = Math.floor(Math.random() * 2) + 1;
    const b = Math.floor(Math.random() * 20) + 10;
    const question = `Soit $B(x) = -${a}x^2 + ${b}x - 50$. Pour quel $x$ le bénéfice est-il maximal ?`;
    const optimum = b / (2 * a);
    const bonneReponse = optimum % 1 === 0 ? `$x = ${optimum}$` : `$x = ${optimum.toFixed(1)}$`;
    
    const options = [
        bonneReponse,
        `$x = ${b}$`,
        `$x = ${Math.floor(optimum * 2)}$`,
        `$x = ${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$B'(x) = -${2*a}x + ${b} = 0 \\Rightarrow x = \\frac{${b}}{${2*a}} = ${optimum}$.`
    };
}

function genererDeriveeSimple() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 30) + 10;
    const c = Math.floor(Math.random() * 100) + 50;
    
    const question = `Calculer $f'(x)$ si $f(x) = ${a}x^2 + \\frac{${c}}{x}$ :`;
    const bonneReponse = `$f'(x) = ${2*a}x - \\frac{${c}}{x^2}$`;
    
    const options = [
        bonneReponse,
        `$f'(x) = ${2*a}x + \\frac{${c}}{x^2}$`,
        `$f'(x) = ${a}x - \\frac{${c}}{x}$`,
        `$f'(x) = ${2*a}x$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(${a}x^2)' = ${2*a}x$ et $(\\frac{${c}}{x})' = -\\frac{${c}}{x^2}$.`
    };
}

function genererOptimisationSimple() {
    const c = [25, 36, 49, 64, 81, 100, 144, 169][Math.floor(Math.random() * 8)]; // carrés parfaits
    const racine = Math.sqrt(c);
    
    const question = `Soit $f(x) = x + \\frac{${c}}{x}$. Pour quelle valeur de $x$ cette fonction est-elle minimale ?`;
    const bonneReponse = `$x = ${racine}$`;
    
    const options = [
        bonneReponse,
        `$x = ${c}$`,
        `$x = ${racine * 2}$`,
        `$x = \\frac{${c}}{2}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = 1 - \\frac{${c}}{x^2} = 0 \\Rightarrow x^2 = ${c} \\Rightarrow x = ${racine}$.`
    };
}

function genererCoutUnitaireBasic() {
    const b = Math.floor(Math.random() * 50) + 20;
    const c = Math.floor(Math.random() * 200) + 100;
    
    const question = `Le coût total est $C(x) = ${b}x + ${c}$. Que vaut le coût unitaire $f(x) = \\frac{C(x)}{x}$ ?`;
    const bonneReponse = `$f(x) = ${b} + \\frac{${c}}{x}$`;
    
    const options = [
        bonneReponse,
        `$f(x) = ${b}x + ${c}$`,
        `$f(x) = ${b}$`,
        `$f(x) = \\frac{${c}}{x}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f(x) = \\frac{${b}x + ${c}}{x} = ${b} + \\frac{${c}}{x}$.`
    };
}

function genererSigneDerivee() {
    const a = Math.floor(Math.random() * 3) + 1;
    const c = Math.floor(Math.random() * 100) + 50;
    const valeur = Math.floor(Math.random() * 8) + 3;
    
    const question = `Soit $f'(x) = ${a} - \\frac{${c}}{x^2}$. Le signe de $f'(${valeur})$ est :`;
    const calcul = a - c / (valeur * valeur);
    const bonneReponse = calcul > 0 ? `Positif` : calcul < 0 ? `Négatif` : `Nul`;
    
    const options = [`Positif`, `Négatif`, `Nul`, `Non défini`];
    const indexCorrect = options.indexOf(bonneReponse);
    
    const melange = melangerOptions({options, correct: indexCorrect});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(${valeur}) = ${a} - \\frac{${c}}{${valeur}^2} = ${a} - \\frac{${c}}{${valeur * valeur}} = ${a} - ${(c/(valeur*valeur)).toFixed(2)} = ${calcul.toFixed(2)}$.`
    };
}

function genererExtremumBasic() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 20) + 10;
    
    const question = `Soit $f(x) = -${a}x^2 + ${b}x + 10$. Cette fonction admet :`;
    const bonneReponse = `Un maximum en $x = \\frac{${b}}{${2*a}}$`;
    
    const options = [
        bonneReponse,
        `Un minimum en $x = \\frac{${b}}{${2*a}}$`,
        `Un maximum en $x = ${b}$`,
        `Pas d'extremum`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = -${2*a}x + ${b} = 0 \\Rightarrow x = \\frac{${b}}{${2*a}}$. Comme $a = ${a} > 0$, la parabole est tournée vers le bas, donc c'est un maximum.`
    };
}

function genererCalculDirect() {
    const operations = [
        {nom: 'somme', f: (a,b,c) => `${a}x^2 + \\frac{${b}}{x}`, df: (a,b,c) => `${2*a}x - \\frac{${b}}{x^2}`},
        {nom: 'produit', f: (a,b,c) => `(${a}x + ${b})(x - ${c})`, df: (a,b,c) => `${2*a}x + ${b} - ${a*c}`},
        {nom: 'quotient', f: (a,b,c) => `\\frac{${a}x}{x + ${b}}`, df: (a,b,c) => `\\frac{${a*b}}{(x + ${b})^2}`}
    ];
    
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 10) + 2;
    const c = Math.floor(Math.random() * 5) + 1;
    
    const question = `Calculer la dérivée de $f(x) = ${op.f(a,b,c)}$ :`;
    const bonneReponse = `$f'(x) = ${op.df(a,b,c)}$`;
    
    const options = [
        bonneReponse,
        `$f'(x) = ${a}x + ${b}$`,
        `$f'(x) = ${2*a}x$`,
        `$f'(x) = ${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Application directe des règles de dérivation (${op.nom}).`
    };
}

function genererQuestionBeneficeMax() {
    const prix = Math.floor(Math.random() * 50) + 80;
    const a = Math.floor(Math.random() * 2) + 1;
    const b = Math.floor(Math.random() * 20) + 20;
    
    const question = `Une entreprise vend à ${prix}€ l'unité. Le coût est $C(x) = ${a}x^2 + ${b}x + 50$. Pour quel $x$ le bénéfice $B(x) = ${prix}x - C(x)$ est-il maximal ?`;
    const optimum = (prix - b) / (2 * a);
    const bonneReponse = optimum % 1 === 0 ? `$x = ${optimum}$` : `$x = \\frac{${prix - b}}{${2 * a}}$`;
    const options = [
        bonneReponse,
        `$x = ${prix - b}$`,
        `$x = \\frac{${prix}}{${2 * a}}$`,
        `$x = ${b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$B(x) = ${prix}x - ${a}x^2 - ${b}x - 50 = -${a}x^2 + ${prix - b}x - 50$. $B'(x) = -${2 * a}x + ${prix - b} = 0 \\Rightarrow x = \\frac{${prix - b}}{${2 * a}}$.`
    };
}

function genererQuestionCoutDerivee() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 30) + 40;
    const c = Math.floor(Math.random() * 100) + 100;
    
    const question = `Soit $f(x) = ${a}x + ${b} + \\frac{${c}}{x}$ le coût unitaire. Que vaut $f'(x)$ ?`;
    const bonneReponse = `$f'(x) = ${a} - \\frac{${c}}{x^2}$`;
    const options = [
        bonneReponse,
        `$f'(x) = ${a} + \\frac{${c}}{x^2}$`,
        `$f'(x) = ${a} - \\frac{${c}}{x}$`,
        `$f'(x) = ${a}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(${a}x + ${b} + \\frac{${c}}{x})' = ${a} + 0 + ${c} \\cdot (-\\frac{1}{x^2}) = ${a} - \\frac{${c}}{x^2}$.`
    };
}

function genererQuestionOptimisationContrainte() {
    const c = Math.floor(Math.random() * 200) + 100;
    
    const question = `Le coût unitaire est $f(x) = x + 50 + \\frac{${c}}{x}$ sur $[5; 40]$. Pour quelle valeur de $x$ est-il minimal ?`;
    const optimum = Math.sqrt(c);
    const bonneReponse = optimum % 1 === 0 ? `$x = ${optimum}$` : `$x = \\sqrt{${c}}$`;
    const options = [
        bonneReponse,
        `$x = 25$`,
        `$x = 50$`,
        `$x = \\frac{${c}}{50}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = 1 - \\frac{${c}}{x^2} = 0 \\Rightarrow x^2 = ${c} \\Rightarrow x = \\sqrt{${c}}$ (car $x > 0$).`
    };
}

function genererQuestionCoutMinimal() {
    const question = `Dans l'exemple du cours, pour $f(x) = x + 50 + \\frac{100}{x}$, le coût unitaire minimal est atteint pour :`;
    const bonneReponse = `$x = 10$`;
    const options = [
        bonneReponse,
        `$x = 5$`,
        `$x = 25$`,
        `$x = 40$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = 1 - \\frac{100}{x^2} = 0 \\Rightarrow x^2 = 100 \\Rightarrow x = 10$. C'est le minimum car $f'(x) < 0$ pour $x < 10$ et $f'(x) > 0$ pour $x > 10$.`
    };
}

function genererQuestionTableauVariation() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 20) + 40;
    const c = Math.floor(Math.random() * 100) + 100;
    
    const question = `
        <div class="tableau-question">
            <p>Soit $f(x) = ${a}x + ${b} + \\frac{${c}}{x}$ sur $[5; 40]$. Compléter le tableau de variation :</p>
            <div class="tableau-variation">
                <table class="variation-table">
                    <tr>
                        <td>$x$</td>
                        <td>$5$</td>
                        <td></td>
                        <td>$\\sqrt{${c}}$</td>
                        <td></td>
                        <td>$40$</td>
                    </tr>
                    <tr>
                        <td>$f'(x)$</td>
                        <td></td>
                        <td class="signe-cell" data-answer="negative">?</td>
                        <td>$0$</td>
                        <td class="signe-cell" data-answer="positive">?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>$f(x)$</td>
                        <td></td>
                        <td class="variation-cell" data-answer="decreasing">?</td>
                        <td>min</td>
                        <td class="variation-cell" data-answer="increasing">?</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <p>Le signe de $f'(x)$ pour $x < \\sqrt{${c}}$ est :</p>
        </div>
    `;
    
    const bonneReponse = `Négatif (car $f'(x) = ${a} - \\frac{${c}}{x^2} < 0$ pour $x < \\sqrt{${c}}$)`;
    const options = [
        bonneReponse,
        `Positif`,
        `Nul`,
        `Non défini`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = ${a} - \\frac{${c}}{x^2}$. Pour $x < \\sqrt{${c}}$, on a $x^2 < ${c}$, donc $\\frac{${c}}{x^2} > ${a}$, donc $f'(x) < 0$.`
    };
}

function genererQuestionEtudeSigne() {
    const a = Math.floor(Math.random() * 3) + 1;
    const racine = Math.floor(Math.random() * 15) + 5;
    
    const question = `Soit $f'(x) = ${a} - \\frac{${racine * racine}}{x^2}$. Sur l'intervalle $[1; 30]$, $f'(x) = 0$ pour :`;
    const bonneReponse = `$x = ${racine}$`;
    const options = [
        bonneReponse,
        `$x = ${a}$`,
        `$x = ${racine * racine}$`,
        `$x = \\frac{${racine}}{${a}}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f'(x) = 0 \\Leftrightarrow ${a} = \\frac{${racine * racine}}{x^2} \\Leftrightarrow x^2 = \\frac{${racine * racine}}{${a}} = ${(racine * racine) / a} \\Leftrightarrow x = ${racine}$.`
    };
}

function genererQuestionCalculDeriveeComplete() {
    const a = Math.floor(Math.random() * 2) + 1;
    const b = Math.floor(Math.random() * 30) + 20;
    const c = Math.floor(Math.random() * 50) + 50;
    
    const question = `
        <div class="calcul-derivee">
            <p>Calculer la dérivée de $f(x) = ${a}x^2 + ${b}x + \\frac{${c}}{x}$ :</p>
            <div class="etapes-calcul">
                <p>Étape 1: Dériver terme par terme</p>
                <p>$(${a}x^2)' = ?$ &nbsp;&nbsp; $(${b}x)' = ?$ &nbsp;&nbsp; $(\\frac{${c}}{x})' = ?$</p>
            </div>
        </div>
    `;
    
    const bonneReponse = `$f'(x) = ${2 * a}x + ${b} - \\frac{${c}}{x^2}$`;
    const options = [
        bonneReponse,
        `$f'(x) = ${2 * a}x + ${b} + \\frac{${c}}{x^2}$`,
        `$f'(x) = ${a}x + ${b} - \\frac{${c}}{x}$`,
        `$f'(x) = ${2 * a}x + ${b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(${a}x^2)' = ${2 * a}x$, $(${b}x)' = ${b}$, $(\\frac{${c}}{x})' = ${c} \\cdot (-\\frac{1}{x^2}) = -\\frac{${c}}{x^2}$.`
    };
}

function genererQuestionOptimisationComplete() {
    const prix = Math.floor(Math.random() * 20) + 80;
    const a = Math.floor(Math.random() * 2) + 1;
    const b = Math.floor(Math.random() * 20) + 30;
    const c = Math.floor(Math.random() * 50) + 100;
    
    const question = `
        <div class="probleme-complet">
            <p><strong>Problème complet :</strong></p>
            <p>Une entreprise a un coût $C(x) = ${a}x^2 + ${b}x + ${c}$ et vend à ${prix}€ l'unité.</p>
            <p>Le bénéfice est $B(x) = ${prix}x - C(x)$.</p>
            <p><strong>Question :</strong> Pour quel nombre d'objets le bénéfice est-il maximal ?</p>
            <div class="aide-calcul">
                <p><em>Aide : Calculer $B'(x)$ et résoudre $B'(x) = 0$</em></p>
            </div>
        </div>
    `;
    
    const optimum = (prix - b) / (2 * a);
    const bonneReponse = optimum % 1 === 0 ? `$x = ${optimum}$ objets` : `$x = ${optimum.toFixed(1)}$ objets`;
    const options = [
        bonneReponse,
        `$x = ${prix - b}$ objets`,
        `$x = ${Math.floor(optimum / 2)}$ objets`,
        `$x = ${b}$ objets`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$B(x) = ${prix}x - ${a}x^2 - ${b}x - ${c} = -${a}x^2 + ${prix - b}x - ${c}$. $B'(x) = -${2 * a}x + ${prix - b}$. $B'(x) = 0 \\Rightarrow x = \\frac{${prix - b}}{${2 * a}} = ${optimum}$.`
    };
}

// GÉNÉRATEURS ULTRA-VARIÉS - MILLIERS DE COMBINAISONS

function genererCoutUnitaireVarie() {
    const contextes = ['smartphones', 'voitures électriques', 'panneaux solaires', 'ordinateurs', 'textiles', 'médicaments', 'composants électroniques', 'meubles', 'produits alimentaires', 'équipements sportifs'];
    const contexte = contextes[Math.floor(Math.random() * contextes.length)];
    
    const a = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 5) + 1; // parfois pas de terme quadratique
    const b = Math.floor(Math.random() * 100) + 20;
    const c = Math.floor(Math.random() * 500) + 100;
    const unite = ['€', '$', '£'][Math.floor(Math.random() * 3)];
    
    const coutFormule = a > 0 ? `${a}x^2 + ${b}x + ${c}` : `${b}x + ${c}`;
    const coutUnitaireFormule = a > 0 ? `${a}x + ${b} + \\frac{${c}}{x}` : `${b} + \\frac{${c}}{x}`;
    
    const question = `Une usine de ${contexte} a un coût de production $C(x) = ${coutFormule}$ ${unite}. Le coût unitaire $f(x) = \\frac{C(x)}{x}$ vaut :`;
    const bonneReponse = `$f(x) = ${coutUnitaireFormule}$`;
    
    const fausseOption1 = a > 0 ? `$f(x) = ${a}x^2 + ${b}x + ${c}$` : `$f(x) = ${b}x + ${c}$`;
    const fausseOption2 = a > 0 ? `$f(x) = ${a}x + ${b}$` : `$f(x) = ${b}$`;
    const fausseOption3 = `$f(x) = \\frac{${b}x + ${c}}{x}$`;
    
    const options = [bonneReponse, fausseOption1, fausseOption2, fausseOption3];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$f(x) = \\frac{C(x)}{x} = \\frac{${coutFormule}}{x} = ${coutUnitaireFormule}$.`
    };
}

function genererBeneficeContexteVarie() {
    const entreprises = [
        {nom: 'start-up tech', produit: 'applications mobiles', prix: [5, 50], couts: [0.1, 10]},
        {nom: 'boulangerie artisanale', produit: 'pains bio', prix: [3, 8], couts: [1, 5]},
        {nom: 'garage automobile', produit: 'réparations', prix: [50, 200], couts: [20, 100]},
        {nom: 'salon de coiffure', produit: 'coupes', prix: [20, 80], couts: [5, 30]},
        {nom: 'restaurant', produit: 'menus', prix: [15, 45], couts: [8, 25]},
        {nom: 'laboratoire', produit: 'analyses', prix: [30, 150], couts: [10, 80]},
        {nom: 'imprimerie', produit: 'brochures', prix: [2, 20], couts: [0.5, 10]},
        {nom: 'centre de fitness', produit: 'abonnements', prix: [30, 100], couts: [10, 40]}
    ];
    
    const entreprise = entreprises[Math.floor(Math.random() * entreprises.length)];
    const prix = Math.floor(Math.random() * (entreprise.prix[1] - entreprise.prix[0])) + entreprise.prix[0];
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * (entreprise.couts[1] - entreprise.couts[0])) + entreprise.couts[0];
    const c = Math.floor(Math.random() * 200) + 50;
    
    const question = `Une ${entreprise.nom} vend ses ${entreprise.produit} à ${prix}€ l'unité. Le coût est $C(x) = ${a}x^2 + ${b}x + ${c}$. Pour quel nombre d'unités le bénéfice $B(x) = ${prix}x - C(x)$ est-il maximal ?`;
    
    const optimum = (prix - b) / (2 * a);
    const bonneReponse = optimum % 1 === 0 ? `$x = ${optimum}$ unités` : `$x = ${optimum.toFixed(1)}$ unités`;
    
    const options = [
        bonneReponse,
        `$x = ${Math.floor(optimum * 1.5)}$ unités`,
        `$x = ${Math.floor(optimum / 2)}$ unités`,
        `$x = ${prix - b}$ unités`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$B(x) = ${prix}x - ${a}x^2 - ${b}x - ${c} = -${a}x^2 + ${prix - b}x - ${c}$. $B'(x) = -${2 * a}x + ${prix - b} = 0 \\Rightarrow x = ${optimum}$.`
    };
}

function genererDeriveeFonctionComplexe() {
    const formes = [
        {base: 'polynome_inverse', template: (a,b,c,d) => `${a}x^3 + ${b}x^2 + ${c}x + \\frac{${d}}{x}`},
        {base: 'double_inverse', template: (a,b,c,d) => `${a}x + \\frac{${b}}{x} + \\frac{${c}}{x^2}`},
        {base: 'mixte', template: (a,b,c,d) => `${a}x^2 + ${b}\\sqrt{x} + \\frac{${c}}{x}` },
        {base: 'produit_somme', template: (a,b,c,d) => `(${a}x + ${b})(${c}x + \\frac{${d}}{x})`},
        {base: 'quotient_complexe', template: (a,b,c,d) => `\\frac{${a}x^2 + ${b}}{${c}x + ${d}}`}
    ];
    
    const forme = formes[Math.floor(Math.random() * formes.length)];
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 20) + 10;
    const c = Math.floor(Math.random() * 50) + 20;
    const d = Math.floor(Math.random() * 100) + 50;
    
    const fonctionStr = forme.template(a, b, c, d);
    
    let deriveeCorrecte, explicationDetaille;
    
    switch (forme.base) {
        case 'polynome_inverse':
            deriveeCorrecte = `$f'(x) = ${3*a}x^2 + ${2*b}x + ${c} - \\frac{${d}}{x^2}$`;
            explicationDetaille = `$(${a}x^3)' = ${3*a}x^2$, $(${b}x^2)' = ${2*b}x$, $(${c}x)' = ${c}$, $(\\frac{${d}}{x})' = -\\frac{${d}}{x^2}$.`;
            break;
        case 'double_inverse':
            deriveeCorrecte = `$f'(x) = ${a} - \\frac{${b}}{x^2} - \\frac{${2*c}}{x^3}$`;
            explicationDetaille = `$(${a}x)' = ${a}$, $(\\frac{${b}}{x})' = -\\frac{${b}}{x^2}$, $(\\frac{${c}}{x^2})' = -\\frac{${2*c}}{x^3}$.`;
            break;
        default:
            deriveeCorrecte = `$f'(x) = ${2*a}x + ${b} - \\frac{${c}}{x^2}$`;
            explicationDetaille = `Dérivée terme par terme selon les règles de base.`;
    }
    
    const question = `Calculer la dérivée de $f(x) = ${fonctionStr}$ :`;
    
    const options = [
        deriveeCorrecte,
        `$f'(x) = ${2*a}x + ${b} + \\frac{${c}}{x^2}$`,
        `$f'(x) = ${a}x + ${b} - \\frac{${c}}{x}$`,
        `$f'(x) = ${2*a}x + ${b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: explicationDetaille
    };
}

function genererProblemeTransport() {
    const vehicules = ['bus', 'trains', 'camions', 'taxis', 'vélos électriques', 'trottinettes', 'avions', 'bateaux'];
    const vehicule = vehicules[Math.floor(Math.random() * vehicules.length)];
    
    const vitesseMax = Math.floor(Math.random() * 50) + 50;
    const consommationBase = Math.floor(Math.random() * 10) + 5;
    const facteur = (Math.random() * 0.1 + 0.05).toFixed(3);
    
    const question = `Le coût de transport par ${vehicule} dépend de la vitesse. Pour une vitesse $v$ km/h (entre 30 et ${vitesseMax}), le coût par km est $C(v) = ${consommationBase} + ${facteur}v^2 + \\frac{200}{v}$ €. À quelle vitesse le coût est-il minimal ?`;
    
    const vitesseOptimale = Math.sqrt(200 / (2 * parseFloat(facteur)));
    const bonneReponse = `$v = ${vitesseOptimale.toFixed(1)}$ km/h`;
    
    const options = [
        bonneReponse,
        `$v = ${(vitesseOptimale * 1.2).toFixed(1)}$ km/h`,
        `$v = ${(vitesseOptimale * 0.8).toFixed(1)}$ km/h`,
        `$v = ${vitesseMax}$ km/h`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$C'(v) = ${2 * parseFloat(facteur)}v - \\frac{200}{v^2} = 0 \\Rightarrow v^2 = \\frac{200}{${2 * parseFloat(facteur)}} \\Rightarrow v = ${vitesseOptimale.toFixed(1)}$ km/h.`
    };
}

function genererProblemeEnergie() {
    const sources = ['éoliennes', 'panneaux solaires', 'centrales hydroélectriques', 'réacteurs', 'batteries'];
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    const puissanceMax = Math.floor(Math.random() * 500) + 100;
    const efficacite = (Math.random() * 0.5 + 0.3).toFixed(2);
    const coutFixe = Math.floor(Math.random() * 1000) + 500;
    
    const question = `Le rendement de ${source} suit $R(x) = ${efficacite}x - \\frac{${coutFixe}}{x}$ pour $x$ unités installées (entre 10 et ${puissanceMax}). Pour quel $x$ le rendement est-il maximal ?`;
    
    const optimum = Math.sqrt(coutFixe / parseFloat(efficacite));
    const bonneReponse = `$x = ${optimum.toFixed(1)}$ unités`;
    
    const options = [
        bonneReponse,
        `$x = ${(optimum * 1.3).toFixed(1)}$ unités`,
        `$x = ${(optimum * 0.7).toFixed(1)}$ unités`,
        `$x = ${puissanceMax}$ unités`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$R'(x) = ${efficacite} + \\frac{${coutFixe}}{x^2} = 0 \\Rightarrow x^2 = \\frac{${coutFixe}}{${efficacite}} \\Rightarrow x = ${optimum.toFixed(1)}$.`
    };
}

function genererProblemeTelecommunications() {
    const reseaux = ['fibre optique', '5G', 'satellites', 'câbles sous-marins', 'antennes relais'];
    const reseau = reseaux[Math.floor(Math.random() * reseaux.length)];
    
    const debitMax = Math.floor(Math.random() * 1000) + 100;
    const latence = Math.floor(Math.random() * 50) + 10;
    const cout = Math.floor(Math.random() * 100) + 50;
    
    const question = `Le coût d'installation de ${reseau} est $C(x) = x^2 + ${latence}x + \\frac{${cout * 1000}}{x}$ k€ pour $x$ points d'accès. Combien de points installer pour minimiser le coût unitaire ?`;
    
    const optimum = Math.sqrt(cout * 1000);
    const bonneReponse = `$x = ${optimum.toFixed(0)}$ points`;
    
    const options = [
        bonneReponse,
        `$x = ${Math.floor(optimum * 1.4)}$ points`,
        `$x = ${Math.floor(optimum * 0.6)}$ points`,
        `$x = ${latence}$ points`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Coût unitaire: $f(x) = x + ${latence} + \\frac{${cout * 1000}}{x}$. $f'(x) = 1 - \\frac{${cout * 1000}}{x^2} = 0 \\Rightarrow x = ${optimum.toFixed(0)}$.`
    };
}

function genererProblemeConstruction() {
    const projets = ['maisons écologiques', 'ponts', 'tunnels', 'gratte-ciels', 'centres commerciaux', 'hôpitaux', 'écoles', 'stades'];
    const projet = projets[Math.floor(Math.random() * projets.length)];
    
    const surface = Math.floor(Math.random() * 5000) + 1000;
    const coutM2 = Math.floor(Math.random() * 500) + 200;
    const coutFixe = Math.floor(Math.random() * 100000) + 50000;
    
    const question = `Construction de ${projet} : coût $C(x) = ${coutM2}x + \\frac{${coutFixe}}{x}$ € pour $x$ m² (entre 100 et ${surface}). Quelle surface minimise le coût par m² ?`;
    
    const optimum = Math.sqrt(coutFixe / coutM2);
    const bonneReponse = `$x = ${optimum.toFixed(0)}$ m²`;
    
    const options = [
        bonneReponse,
        `$x = ${Math.floor(optimum * 1.5)}$ m²`,
        `$x = ${Math.floor(optimum * 0.5)}$ m²`,
        `$x = ${surface}$ m²`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Coût par m²: $f(x) = ${coutM2} + \\frac{${coutFixe}}{x}$. $f'(x) = -\\frac{${coutFixe}}{x^2} < 0$, donc minimum en $x = ${optimum.toFixed(0)}$.`
    };
}

function genererProblemeAgriculture() {
    const cultures = ['blé bio', 'tomates', 'vignes', 'oliviers', 'maïs', 'tournesols', 'pommes de terre'];
    const culture = cultures[Math.floor(Math.random() * cultures.length)];
    
    const rendement = Math.floor(Math.random() * 20) + 10;
    const coutHectare = Math.floor(Math.random() * 2000) + 1000;
    const coutFixe = Math.floor(Math.random() * 50000) + 20000;
    
    const question = `Exploitation de ${culture} : profit $P(x) = ${rendement}x^2 - ${coutHectare}x - \\frac{${coutFixe}}{x}$ € pour $x$ hectares. Pour quelle surface le profit par hectare est-il maximal ?`;
    
    const profitParHectare = `\\frac{${rendement}x^2 - ${coutHectare}x - \\frac{${coutFixe}}{x}}{x} = ${rendement}x - ${coutHectare} - \\frac{${coutFixe}}{x^2}`;
    const optimum = Math.sqrt(coutFixe / rendement);
    const bonneReponse = `$x = ${optimum.toFixed(1)}$ hectares`;
    
    const options = [
        bonneReponse,
        `$x = ${(optimum * 1.4).toFixed(1)}$ hectares`,
        `$x = ${(optimum * 0.6).toFixed(1)}$ hectares`,
        `$x = ${Math.floor(coutHectare / rendement)}$ hectares`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Profit/hectare: $g(x) = ${rendement}x - ${coutHectare} - \\frac{${coutFixe}}{x^2}$. $g'(x) = ${rendement} + \\frac{${2 * coutFixe}}{x^3} = 0$ impossible. Étudier $P'(x)/x$ plutôt.`
    };
}

function genererProblemeFinance() {
    const investissements = ['actions tech', 'obligations', 'crypto-monnaies', 'immobilier', 'matières premières', 'fonds verts', 'start-ups', 'ETF', 'forex', 'commodités'];
    const investissement = investissements[Math.floor(Math.random() * investissements.length)];
    
    const rendementBase = (Math.random() * 15 + 3).toFixed(1);
    const risque = (Math.random() * 0.02 + 0.001).toFixed(4);
    const frais = Math.floor(Math.random() * 2000) + 100;
    
    const question = `Investissement en ${investissement} : rendement net $R(x) = ${rendementBase}x - ${risque}x^2 - \\frac{${frais}}{x}$ % pour $x$ k€ investis. Quel montant optimise le rendement par k€ ?`;
    
    const optimum = (parseFloat(rendementBase) / (2 * parseFloat(risque)));
    const bonneReponse = `$x = ${optimum.toFixed(0)}$ k€`;
    
    const options = [
        bonneReponse,
        `$x = ${Math.floor(optimum * 1.3)}$ k€`,
        `$x = ${Math.floor(optimum * 0.7)}$ k€`,
        `$x = ${frais}$ k€`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$R'(x) = ${rendementBase} - ${2 * parseFloat(risque)}x + \\frac{${frais}}{x^2} = 0$. Résolution numérique donne $x ≈ ${optimum.toFixed(0)}$.`
    };
}

// NOUVELLES FONCTIONS POUR VARIÉTÉ MAXIMALE

function genererTableauVariationAleatoire() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 100) + 50;
    const c = Math.floor(Math.random() * 1000) + 200;
    const intervalle = [Math.floor(Math.random() * 10) + 5, Math.floor(Math.random() * 50) + 30];
    
    const racine = Math.sqrt(c / a);
    
    const question = `
        <div class="tableau-question">
            <p>Soit $f(x) = ${a}x + ${b} + \\frac{${c}}{x}$ sur $[${intervalle[0]}; ${intervalle[1]}]$.</p>
            <p>Sachant que $f'(x) = ${a} - \\frac{${c}}{x^2}$, compléter :</p>
            <div class="tableau-variation">
                <table class="variation-table">
                    <tr><td>$x$</td><td>${intervalle[0]}</td><td></td><td>$\\sqrt{\\frac{${c}}{${a}}}$</td><td></td><td>${intervalle[1]}</td></tr>
                    <tr><td>$f'(x)$</td><td></td><td>?</td><td>$0$</td><td>?</td><td></td></tr>
                    <tr><td>$f(x)$</td><td></td><td>?</td><td>min</td><td>?</td><td></td></tr>
                </table>
            </div>
            <p>Le signe de $f'(x)$ pour $x < \\sqrt{\\frac{${c}}{${a}}}$ est :</p>
        </div>
    `;
    
    const bonneReponse = `Négatif (décroissante)`;
    const options = [bonneReponse, `Positif (croissante)`, `Nul (constante)`, `Variable`];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Pour $x < \\sqrt{\\frac{${c}}{${a}}}$, on a $x^2 < \\frac{${c}}{${a}}$, donc $\\frac{${c}}{x^2} > ${a}$, donc $f'(x) = ${a} - \\frac{${c}}{x^2} < 0$.`
    };
}

function genererAnalyseCompleteFonction() {
    const secteurs = ['industrie 4.0', 'biotechnologies', 'espace', 'robotique', 'IA', 'blockchain', 'nanotechnologies'];
    const secteur = secteurs[Math.floor(Math.random() * secteurs.length)];
    
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 50) + 20;
    const c = Math.floor(Math.random() * 500) + 100;
    const d = Math.floor(Math.random() * 1000) + 500;
    
    const question = `
        <div class="probleme-complet">
            <p><strong>Analyse complète - Secteur ${secteur}</strong></p>
            <p>Fonction de performance : $f(x) = ${a}x^2 + ${b}x + \\frac{${c}}{x} + \\frac{${d}}{x^2}$</p>
            <p><strong>Étapes :</strong></p>
            <ol>
                <li>Calculer $f'(x)$</li>
                <li>Résoudre $f'(x) = 0$</li>
                <li>Étudier le signe de $f'(x)$</li>
            </ol>
            <p><strong>Question :</strong> Que vaut $f'(x)$ ?</p>
        </div>
    `;
    
    const bonneReponse = `$f'(x) = ${2*a}x + ${b} - \\frac{${c}}{x^2} - \\frac{${2*d}}{x^3}$`;
    const options = [
        bonneReponse,
        `$f'(x) = ${2*a}x + ${b} + \\frac{${c}}{x^2} + \\frac{${2*d}}{x^3}$`,
        `$f'(x) = ${a}x + ${b} - \\frac{${c}}{x} - \\frac{${d}}{x^2}$`,
        `$f'(x) = ${2*a}x + ${b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$(${a}x^2)' = ${2*a}x$, $(${b}x)' = ${b}$, $(\\frac{${c}}{x})' = -\\frac{${c}}{x^2}$, $(\\frac{${d}}{x^2})' = -\\frac{${2*d}}{x^3}$.`
    };
}

function genererCoutMarginal() {
    const industries = ['pharmaceutique', 'aéronautique', 'automobile', 'textile', 'alimentaire', 'chimique', 'électronique', 'métallurgie'];
    const industrie = industries[Math.floor(Math.random() * industries.length)];
    
    const a = (Math.random() * 2 + 0.5).toFixed(2);
    const b = Math.floor(Math.random() * 80) + 20;
    const c = Math.floor(Math.random() * 5000) + 1000;
    
    const question = `Industrie ${industrie} : coût total $C(x) = ${a}x^2 + ${b}x + ${c}$. Le coût marginal $C'(x)$ représente le coût de production d'une unité supplémentaire. Pour $x = 50$ unités, que vaut le coût marginal ?`;
    
    const coutMarginal = 2 * parseFloat(a) * 50 + b;
    const bonneReponse = `$C'(50) = ${coutMarginal}$ €`;
    
    const options = [
        bonneReponse,
        `$C'(50) = ${coutMarginal + 10}$ €`,
        `$C'(50) = ${parseFloat(a) * 50 + b}$ €`,
        `$C'(50) = ${b}$ €`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$C'(x) = ${2 * parseFloat(a)}x + ${b}$, donc $C'(50) = ${2 * parseFloat(a)} \\times 50 + ${b} = ${coutMarginal}$ €.`
    };
}

function genererRendementOptimal() {
    const machines = ['imprimantes 3D', 'robots industriels', 'serveurs', 'turbines', 'compresseurs', 'générateurs', 'moteurs électriques'];
    const machine = machines[Math.floor(Math.random() * machines.length)];
    
    const efficaciteMax = (Math.random() * 50 + 70).toFixed(1);
    const usure = (Math.random() * 0.1 + 0.01).toFixed(3);
    const maintenance = Math.floor(Math.random() * 500) + 100;
    
    const question = `Rendement de ${machine} : $R(t) = ${efficaciteMax}t - ${usure}t^2 - \\frac{${maintenance}}{t}$ % après $t$ heures de fonctionnement. À quel moment le rendement par heure est-il optimal ?`;
    
    const optimum = parseFloat(efficaciteMax) / (2 * parseFloat(usure));
    const bonneReponse = `$t = ${optimum.toFixed(1)}$ heures`;
    
    const options = [
        bonneReponse,
        `$t = ${(optimum * 1.5).toFixed(1)}$ heures`,
        `$t = ${(optimum * 0.5).toFixed(1)}$ heures`,
        `$t = ${maintenance}$ heures`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `$R'(t) = ${efficaciteMax} - ${2 * parseFloat(usure)}t + \\frac{${maintenance}}{t^2} = 0$. Maximum théorique vers $t = ${optimum.toFixed(1)}$ h.`
    };
}

// Fonction pour mélanger un tableau (Fisher-Yates)
function melangerTableau(array) {
    const copie = [...array];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}

// Fonction pour mélanger les options d'une question
function melangerOptions(question) {
    const nouvellesOptions = [...question.options];
    const ancienneReponseCorrecte = question.correct;
    
    // Créer un mapping des indices
    const indices = [0, 1, 2, 3];
    const indicesMelanges = melangerTableau(indices);
    
    // Réorganiser les options
    const optionsMelangees = indicesMelanges.map(i => nouvellesOptions[i]);
    
    // Trouver le nouvel index de la bonne réponse
    const nouvelIndexCorrect = indicesMelanges.indexOf(ancienneReponseCorrecte);
    
    return {
        options: optionsMelangees,
        correct: nouvelIndexCorrect
    };
}

// Animation d'apparition pour les éléments
function animerApparition(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Générer quiz dérivées
function genererQuizDerivees() {
    const nb = parseInt(document.getElementById('nb-derivees').value) || 5;
    // Générer des questions aléatoires uniques
    const questionsGenerees = [];
    for (let i = 0; i < nb; i++) {
        questionsGenerees.push(genererQuestionDerivee());
    }
    
    quizDeriveesCourant = questionsGenerees;
    
    const container = document.getElementById('quiz-derivees');
    container.innerHTML = '<div class="loading-quiz">🎲 Génération du quiz...</div>';
    
    // Animation de chargement
    setTimeout(() => {
        container.innerHTML = '';
        
        quizDeriveesCourant.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <div class="question-text">
                    <span class="question-number">${index + 1}</span>
                    ${q.question}
                </div>
                <div class="options">
                    ${q.options.map((option, i) => `
                        <label class="option">
                            <input type="radio" name="q${index}" value="${i}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="explication" style="display: none;">
                    <strong>💡 Explication:</strong> ${q.explication}
                </div>
            `;
            container.appendChild(questionDiv);
            
            // Animation d'apparition avec délai
            setTimeout(() => animerApparition(questionDiv), index * 150);
        });
        
        document.getElementById('corriger-derivees').disabled = false;
        document.getElementById('reset-derivees').disabled = false;
        document.getElementById('resultat-derivees').innerHTML = '';
        
        // Re-render MathJax après animation
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise();
            }
        }, quizDeriveesCourant.length * 150 + 200);
    }, 500);
}

// Corriger quiz dérivées
function corrigerQuizDerivees() {
    let score = 0;
    const questions = document.querySelectorAll('#quiz-derivees .question-item');
    
    questions.forEach((questionDiv, index) => {
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        const options = questionDiv.querySelectorAll('.option');
        const explication = questionDiv.querySelector('.explication');
        
        let reponseSelectionnee = -1;
        radios.forEach((radio, i) => {
            if (radio.checked) reponseSelectionnee = i;
        });
        
        // Marquer les réponses
        options.forEach((option, i) => {
            option.classList.remove('correct', 'incorrect');
            if (i === quizDeriveesCourant[index].correct) {
                option.classList.add('correct');
            } else if (i === reponseSelectionnee && i !== quizDeriveesCourant[index].correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (reponseSelectionnee === quizDeriveesCourant[index].correct) {
            score++;
        }
        
        explication.style.display = 'block';
    });
    
    const pourcentage = Math.round((score / quizDeriveesCourant.length) * 100);
    const resultat = document.getElementById('resultat-derivees');
    resultat.innerHTML = `
        <div class="score ${pourcentage >= 60 ? 'success' : 'error'}">
            Score: ${score}/${quizDeriveesCourant.length} (${pourcentage}%)
        </div>
    `;
    
    // Re-render MathJax
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

// Reset quiz dérivées
function resetQuizDerivees() {
    document.getElementById('quiz-derivees').innerHTML = '';
    document.getElementById('resultat-derivees').innerHTML = '';
    document.getElementById('corriger-derivees').disabled = true;
    document.getElementById('reset-derivees').disabled = true;
}

// Générer quiz limites
function genererQuizLimites() {
    const nb = parseInt(document.getElementById('nb-limites').value) || 5;
    // Générer des questions aléatoires uniques
    const questionsGenerees = [];
    for (let i = 0; i < nb; i++) {
        questionsGenerees.push(genererQuestionLimite());
    }
    
    quizLimitesCourant = questionsGenerees;
    
    const container = document.getElementById('quiz-limites');
    container.innerHTML = '<div class="loading-quiz">🎲 Génération du quiz...</div>';
    
    // Animation de chargement
    setTimeout(() => {
        container.innerHTML = '';
        
        quizLimitesCourant.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <div class="question-text">
                    <span class="question-number">${index + 1}</span>
                    ${q.question}
                </div>
                <div class="options">
                    ${q.options.map((option, i) => `
                        <label class="option">
                            <input type="radio" name="ql${index}" value="${i}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="explication" style="display: none;">
                    <strong>💡 Explication:</strong> ${q.explication}
                </div>
            `;
            container.appendChild(questionDiv);
            
            // Animation d'apparition avec délai
            setTimeout(() => animerApparition(questionDiv), index * 150);
        });
        
        document.getElementById('corriger-limites').disabled = false;
        document.getElementById('reset-limites').disabled = false;
        document.getElementById('resultat-limites').innerHTML = '';
        
        // Re-render MathJax après animation
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise();
            }
        }, quizLimitesCourant.length * 150 + 200);
    }, 500);
}

// Corriger quiz limites
function corrigerQuizLimites() {
    let score = 0;
    const questions = document.querySelectorAll('#quiz-limites .question-item');
    
    questions.forEach((questionDiv, index) => {
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        const options = questionDiv.querySelectorAll('.option');
        const explication = questionDiv.querySelector('.explication');
        
        let reponseSelectionnee = -1;
        radios.forEach((radio, i) => {
            if (radio.checked) reponseSelectionnee = i;
        });
        
        // Marquer les réponses
        options.forEach((option, i) => {
            option.classList.remove('correct', 'incorrect');
            if (i === quizLimitesCourant[index].correct) {
                option.classList.add('correct');
            } else if (i === reponseSelectionnee && i !== quizLimitesCourant[index].correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (reponseSelectionnee === quizLimitesCourant[index].correct) {
            score++;
        }
        
        explication.style.display = 'block';
    });
    
    const pourcentage = Math.round((score / quizLimitesCourant.length) * 100);
    const resultat = document.getElementById('resultat-limites');
    resultat.innerHTML = `
        <div class="score ${pourcentage >= 60 ? 'success' : 'error'}">
            Score: ${score}/${quizLimitesCourant.length} (${pourcentage}%)
        </div>
    `;
    
    // Re-render MathJax
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

// Reset quiz limites
function resetQuizLimites() {
    document.getElementById('quiz-limites').innerHTML = '';
    document.getElementById('resultat-limites').innerHTML = '';
    document.getElementById('corriger-limites').disabled = true;
    document.getElementById('reset-limites').disabled = true;
}

// Fonctions pour le quiz d'applications
function genererQuizApplications() {
    const nb = parseInt(document.getElementById('nb-applications').value) || 5;
    const questionsGenerees = [];
    for (let i = 0; i < nb; i++) {
        questionsGenerees.push(genererQuestionApplication());
    }
    
    quizApplicationsCourant = questionsGenerees;
    
    const container = document.getElementById('quiz-applications');
    container.innerHTML = '<div class="loading-quiz">🎲 Génération du quiz...</div>';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        quizApplicationsCourant.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <div class="question-text">
                    <span class="question-number">${index + 1}</span>
                    ${q.question}
                </div>
                <div class="options">
                    ${q.options.map((option, i) => `
                        <label class="option">
                            <input type="radio" name="qa${index}" value="${i}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="explication" style="display: none;">
                    <strong>💡 Explication:</strong> ${q.explication}
                </div>
            `;
            container.appendChild(questionDiv);
            setTimeout(() => animerApparition(questionDiv), index * 150);
        });
        
        document.getElementById('corriger-applications').disabled = false;
        document.getElementById('reset-applications').disabled = false;
        document.getElementById('resultat-applications').innerHTML = '';
        
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise();
            }
        }, quizApplicationsCourant.length * 150 + 200);
    }, 500);
}

function corrigerQuizApplications() {
    let score = 0;
    const questions = document.querySelectorAll('#quiz-applications .question-item');
    
    questions.forEach((questionDiv, index) => {
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        const options = questionDiv.querySelectorAll('.option');
        const explication = questionDiv.querySelector('.explication');
        
        let reponseSelectionnee = -1;
        radios.forEach((radio, i) => {
            if (radio.checked) reponseSelectionnee = i;
        });
        
        options.forEach((option, i) => {
            option.classList.remove('correct', 'incorrect');
            if (i === quizApplicationsCourant[index].correct) {
                option.classList.add('correct');
            } else if (i === reponseSelectionnee && i !== quizApplicationsCourant[index].correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (reponseSelectionnee === quizApplicationsCourant[index].correct) {
            score++;
        }
        
        explication.style.display = 'block';
    });
    
    const pourcentage = Math.round((score / quizApplicationsCourant.length) * 100);
    const resultat = document.getElementById('resultat-applications');
    resultat.innerHTML = `
        <div class="score ${pourcentage >= 60 ? 'success' : 'error'}">
            Score: ${score}/${quizApplicationsCourant.length} (${pourcentage}%)
        </div>
    `;
    
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function resetQuizApplications() {
    document.getElementById('quiz-applications').innerHTML = '';
    document.getElementById('resultat-applications').innerHTML = '';
    document.getElementById('corriger-applications').disabled = true;
    document.getElementById('reset-applications').disabled = true;
}
