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

// Générateur infini de questions - Dérivées
function genererQuestionDerivee() {
    const types = [
        'reference', 'affine', 'puissance', 'inverse', 'somme', 'produit', 'quotient', 'composee', 'probleme'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'reference':
            return genererQuestionReference();
        case 'affine':
            return genererQuestionAffine();
        case 'puissance':
            return genererQuestionPuissance();
        case 'inverse':
            return genererQuestionInverse();
        case 'somme':
            return genererQuestionSomme();
        case 'produit':
            return genererQuestionProduit();
        case 'quotient':
            return genererQuestionQuotient();
        case 'composee':
            return genererQuestionComposee();
        case 'probleme':
            return genererProblemeDerivee();
        default:
            return genererQuestionReference();
    }
}

function genererQuestionReference() {
    const fonctions = [
        {fonction: 'k', derivee: '0', domaine: '\\mathbb{R}'},
        {fonction: 'x', derivee: '1', domaine: '\\mathbb{R}'},
        {fonction: 'x^2', derivee: '2x', domaine: '\\mathbb{R}'},
        {fonction: 'x^3', derivee: '3x^2', domaine: '\\mathbb{R}'},
        {fonction: '\\frac{1}{x}', derivee: '-\\frac{1}{x^2}', domaine: '\\mathbb{R}^*'}
    ];
    
    const choix = fonctions[Math.floor(Math.random() * fonctions.length)];
    const k = choix.fonction === 'k' ? Math.floor(Math.random() * 9) + 1 : null;
    
    const question = choix.fonction === 'k' 
        ? `Si $f(x) = ${k}$, alors $f'(x)$ vaut :`
        : `Si $f(x) = ${choix.fonction}$, alors $f'(x)$ vaut :`;
    
    const bonneReponse = choix.fonction === 'k' ? `$0$` : `$${choix.derivee}$`;
    
    const options = choix.fonction === 'k' 
        ? [bonneReponse, `$${k}$`, `$1$`, `$x$`]
        : choix.fonction === 'x'
        ? [bonneReponse, `$0$`, `$x$`, `$2$`]
        : choix.fonction === 'x^2'
        ? [bonneReponse, `$x$`, `$x^2$`, `$1$`]
        : choix.fonction === 'x^3'
        ? [bonneReponse, `$x^2$`, `$x^3$`, `$6x$`]
        : [bonneReponse, `$\\frac{1}{x}$`, `$\\frac{2}{x^3}$`, `$0$`];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Fonction de référence: $(${choix.fonction})' = ${choix.derivee}$.`
    };
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

// Générateur infini de questions - Limites (programme STI2D)
function genererQuestionLimite() {
    const types = [
        'polynome_infini', 'polynome_moins_infini', 'rationnelle_infini', 'rationnelle_zero', 'rationnelle_infini_negatif', 'inverse_infini'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'polynome_infini':
            return genererQuestionPolynomeInfini();
        case 'polynome_moins_infini':
            return genererQuestionPolynomeMoinsInfini();
        case 'rationnelle_infini':
            return genererQuestionRationnelleInfini();
        case 'rationnelle_zero':
            return genererQuestionRationnelleZero();
        case 'rationnelle_infini_negatif':
            return genererQuestionRationnelleInfiniNegatif();
        case 'inverse_infini':
            return genererQuestionInverseInfini();
        default:
            return genererQuestionPolynomeInfini();
    }
}

function genererQuestionRationnelleInfini() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    const c = Math.floor(Math.random() * 3) + 1;
    const d = Math.floor(Math.random() * 4) + 1;
    
    const question = `$\\displaystyle \\lim_{x \\to +\\infty} \\frac{${a}x^2 + ${b}x}{${c}x^2 + ${d}}$ vaut :`;
    const resultat = a / c;
    const bonneReponse = resultat % 1 === 0 ? `$${resultat}$` : `$\\frac{${a}}{${c}}$`;
    
    const options = [
        bonneReponse,
        `$0$`,
        `$+\\infty$`,
        `$${a + b}$`
    ];
    
    const melange = melangerOptions({options, correct: 0});
    return {
        question,
        options: melange.options,
        correct: melange.correct,
        explication: `Même degré (2): rapport des coefficients dominants $\\frac{${a}}{${c}} = ${bonneReponse.slice(1, -1)}$.`
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
