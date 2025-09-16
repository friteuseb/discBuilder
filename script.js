class DISCAnalyzer {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.positionTracker = { D: [0, 0, 0, 0], I: [0, 0, 0, 0], S: [0, 0, 0, 0], C: [0, 0, 0, 0] }; // Track positions for each profile
        this.questions = [
            {
                text: "Dans une situation de conflit, je préfère généralement :",
                options: [
                    { text: "Prendre le contrôle et résoudre rapidement", type: "D", weight: 3 },
                    { text: "Rechercher un consensus par la discussion", type: "I", weight: 3 },
                    { text: "Éviter le conflit et maintenir l'harmonie", type: "S", weight: 3 },
                    { text: "Analyser les faits avant de décider", type: "C", weight: 3 }
                ]
            },
            {
                text: "Quand je travaille en équipe, j'ai tendance à :",
                options: [
                    { text: "Diriger et déléguer les tâches", type: "D", weight: 2 },
                    { text: "Motiver et encourager les autres", type: "I", weight: 2 },
                    { text: "Soutenir et écouter mes collègues", type: "S", weight: 2 },
                    { text: "Organiser et planifier le travail", type: "C", weight: 2 }
                ]
            },
            {
                text: "Face à un changement important, ma première réaction est :",
                options: [
                    { text: "L'adopter rapidement si c'est bénéfique", type: "D", weight: 3 },
                    { text: "En parler avec les autres pour créer de l'enthousiasme", type: "I", weight: 3 },
                    { text: "M'inquiéter de l'impact sur l'équipe", type: "S", weight: 3 },
                    { text: "Analyser les risques et bénéfices", type: "C", weight: 3 }
                ]
            },
            {
                text: "Dans mon travail, je valorise particulièrement :",
                options: [
                    { text: "L'efficacité et les résultats", type: "D", weight: 2 },
                    { text: "La créativité et l'innovation", type: "I", weight: 2 },
                    { text: "La stabilité et la sécurité", type: "S", weight: 2 },
                    { text: "La précision et la qualité", type: "C", weight: 2 }
                ]
            },
            {
                text: "Quand je prends des décisions, je base mes choix sur :",
                options: [
                    { text: "Mon instinct et mon expérience", type: "D", weight: 3 },
                    { text: "L'avis des autres et l'impact social", type: "I", weight: 3 },
                    { text: "Le consensus et l'harmonie du groupe", type: "S", weight: 3 },
                    { text: "Les données et l'analyse logique", type: "C", weight: 3 }
                ]
            },
            {
                text: "Dans une réunion importante, vous êtes naturellement celui qui :",
                options: [
                    { text: "Prend la parole pour orienter rapidement vers les décisions", type: "D", weight: 2 },
                    { text: "Raconte une anecdote pour détendre l'atmosphère", type: "I", weight: 2 },
                    { text: "Écoute attentivement les avis de chacun avant de s'exprimer", type: "S", weight: 2 },
                    { text: "Pose des questions précises sur les détails du projet", type: "C", weight: 2 }
                ]
            },
            {
                text: "Face aux règles et procédures :",
                options: [
                    { text: "Je les adapte selon les besoins", type: "D", weight: 2 },
                    { text: "Je les interprète avec flexibilité", type: "I", weight: 2 },
                    { text: "Je les respecte pour maintenir l'ordre", type: "S", weight: 2 },
                    { text: "Je les applique rigoureusement", type: "C", weight: 2 }
                ]
            },
            {
                text: "Dans un nouveau projet, je me concentre d'abord sur :",
                options: [
                    { text: "Les objectifs et la stratégie globale", type: "D", weight: 3 },
                    { text: "L'équipe et la dynamique humaine", type: "I", weight: 3 },
                    { text: "La planification et la coordination", type: "S", weight: 3 },
                    { text: "Les détails et les spécifications", type: "C", weight: 3 }
                ]
            },
            {
                text: "Sous pression, j'ai tendance à :",
                options: [
                    { text: "Devenir plus déterminé et focalisé", type: "D", weight: 3 },
                    { text: "Chercher du soutien auprès des autres", type: "I", weight: 3 },
                    { text: "Me retirer pour réfléchir calmement", type: "S", weight: 3 },
                    { text: "Redoubler d'attention aux détails", type: "C", weight: 3 }
                ]
            },
            {
                text: "Mon environnement de travail idéal est :",
                options: [
                    { text: "Dynamique avec des défis constants", type: "D", weight: 2 },
                    { text: "Social et stimulant créativement", type: "I", weight: 2 },
                    { text: "Stable et prévisible", type: "S", weight: 2 },
                    { text: "Organisé et méthodique", type: "C", weight: 2 }
                ]
            },
            {
                text: "Quand je dirige une réunion, je :",
                options: [
                    { text: "Vais droit au but et prends les décisions", type: "D", weight: 3 },
                    { text: "Encourage la participation et les idées", type: "I", weight: 3 },
                    { text: "M'assure que chacun puisse s'exprimer", type: "S", weight: 3 },
                    { text: "Suis un agenda structuré et détaillé", type: "C", weight: 3 }
                ]
            },
            {
                text: "Face à une critique, ma première réaction est :",
                options: [
                    { text: "Défendre mon point de vue", type: "D", weight: 2 },
                    { text: "Chercher à comprendre l'autre personne", type: "I", weight: 2 },
                    { text: "L'accepter pour éviter le conflit", type: "S", weight: 2 },
                    { text: "Analyser objectivement sa validité", type: "C", weight: 2 }
                ]
            },
            {
                text: "Il est 17h vendredi, vous réalisez qu'un projet important doit être rendu lundi matin :",
                options: [
                    { text: "Vous restez jusqu'à ce que ce soit fini, quitte à faire des heures", type: "D", weight: 3 },
                    { text: "Vous mobilisez l'équipe pour un sprint collectif motivant", type: "I", weight: 3 },
                    { text: "Vous réorganisez le weekend pour finir sereinement dimanche", type: "S", weight: 3 },
                    { text: "Vous établissez un planning précis heure par heure jusqu'à lundi", type: "C", weight: 3 }
                ]
            },
            {
                text: "Quand je forme quelqu'un, je privilégie :",
                options: [
                    { text: "Des objectifs clairs et des résultats", type: "D", weight: 2 },
                    { text: "L'encouragement et la motivation", type: "I", weight: 2 },
                    { text: "Un accompagnement patient et progressif", type: "S", weight: 2 },
                    { text: "Une méthode structurée et complète", type: "C", weight: 2 }
                ]
            },
            {
                text: "Dans les négociations, je :",
                options: [
                    { text: "Reste ferme sur mes positions", type: "D", weight: 3 },
                    { text: "Cherche des solutions créatives", type: "I", weight: 3 },
                    { text: "Privilégie les compromis équitables", type: "S", weight: 3 },
                    { text: "M'appuie sur des faits précis", type: "C", weight: 3 }
                ]
            },
            {
                text: "Mon style de management naturel est :",
                options: [
                    { text: "Directif et orienté résultats", type: "D", weight: 3 },
                    { text: "Participatif et inspirant", type: "I", weight: 3 },
                    { text: "Bienveillant et à l'écoute", type: "S", weight: 3 },
                    { text: "Méthodique et équitable", type: "C", weight: 3 }
                ]
            },
            {
                text: "Face à l'incertitude, je :",
                options: [
                    { text: "Prends des décisions rapides", type: "D", weight: 2 },
                    { text: "Brainstorme avec d'autres", type: "I", weight: 2 },
                    { text: "Attends d'avoir plus d'informations", type: "S", weight: 2 },
                    { text: "Analyse toutes les possibilités", type: "C", weight: 2 }
                ]
            },
            {
                text: "Dans une présentation, je mets l'accent sur :",
                options: [
                    { text: "Les résultats et l'impact", type: "D", weight: 2 },
                    { text: "L'engagement et l'interaction", type: "I", weight: 2 },
                    { text: "La clarté et la compréhension", type: "S", weight: 2 },
                    { text: "Les données et la précision", type: "C", weight: 2 }
                ]
            },
            {
                text: "Ma motivation principale au travail est :",
                options: [
                    { text: "Atteindre des objectifs ambitieux", type: "D", weight: 3 },
                    { text: "Avoir un impact positif sur les autres", type: "I", weight: 3 },
                    { text: "Contribuer à un environnement harmonieux", type: "S", weight: 3 },
                    { text: "Exceller dans mon domaine d'expertise", type: "C", weight: 3 }
                ]
            },
            {
                text: "Quand je planifie un projet, je commence par :",
                options: [
                    { text: "Définir l'objectif final", type: "D", weight: 3 },
                    { text: "Rassembler l'équipe projet", type: "I", weight: 3 },
                    { text: "Évaluer les ressources disponibles", type: "S", weight: 3 },
                    { text: "Analyser les exigences détaillées", type: "C", weight: 3 }
                ]
            },
            {
                text: "Ma façon de gérer le stress est :",
                options: [
                    { text: "Prendre le contrôle de la situation", type: "D", weight: 2 },
                    { text: "En parler avec des collègues", type: "I", weight: 2 },
                    { text: "Prendre du recul et respirer", type: "S", weight: 2 },
                    { text: "Organiser et prioriser mes tâches", type: "C", weight: 2 }
                ]
            },
            {
                text: "Dans l'innovation, je privilégie :",
                options: [
                    { text: "Des solutions rapides et efficaces", type: "D", weight: 2 },
                    { text: "Des idées créatives et originales", type: "I", weight: 2 },
                    { text: "Des améliorations progressives", type: "S", weight: 2 },
                    { text: "Des approches méthodiques et testées", type: "C", weight: 2 }
                ]
            },
            {
                text: "Quand un collègue fait une erreur importante, votre première réaction est :",
                options: [
                    { text: "Lui dire clairement ce qui doit être corrigé immédiatement", type: "D", weight: 3 },
                    { text: "L'encourager d'abord, puis discuter ensemble des solutions", type: "I", weight: 3 },
                    { text: "L'écouter expliquer sa situation avant de proposer votre aide", type: "S", weight: 3 },
                    { text: "Analyser avec lui les causes précises pour éviter la récidive", type: "C", weight: 3 }
                ]
            },
            {
                text: "Dans la résolution de problèmes, je :",
                options: [
                    { text: "Vais à l'essentiel rapidement", type: "D", weight: 3 },
                    { text: "Explore plusieurs perspectives", type: "I", weight: 3 },
                    { text: "Cherche des solutions durables", type: "S", weight: 3 },
                    { text: "Analyse systématiquement les causes", type: "C", weight: 3 }
                ]
            },
            {
                text: "Vous devez organiser une réunion d'équipe. Vous privilégiez :",
                options: [
                    { text: "Un format express de 30 minutes avec 3 points clés à décider", type: "D", weight: 2 },
                    { text: "Une session créative avec tableaux blancs et échanges libres", type: "I", weight: 2 },
                    { text: "Un moment prévu longtemps à l'avance avec ordre du jour partagé", type: "S", weight: 2 },
                    { text: "Une réunion avec documentation préalable et compte-rendu détaillé", type: "C", weight: 2 }
                ]
            },
            {
                text: "Face à l'échec, je :",
                options: [
                    { text: "Apprends rapidement et rebondis", type: "D", weight: 3 },
                    { text: "Cherche du soutien et de l'encouragement", type: "I", weight: 3 },
                    { text: "Réfléchis calmement aux causes", type: "S", weight: 3 },
                    { text: "Analyse méthodiquement les erreurs", type: "C", weight: 3 }
                ]
            },
            {
                text: "Mon style de délégation consiste à :",
                options: [
                    { text: "Donner des objectifs clairs et laisser faire", type: "D", weight: 3 },
                    { text: "Motiver et rester disponible", type: "I", weight: 3 },
                    { text: "Accompagner et soutenir progressivement", type: "S", weight: 3 },
                    { text: "Fournir des instructions précises", type: "C", weight: 3 }
                ]
            },
            {
                text: "Dans l'apprentissage, je préfère :",
                options: [
                    { text: "La pratique directe et l'expérience", type: "D", weight: 2 },
                    { text: "Les échanges et discussions de groupe", type: "I", weight: 2 },
                    { text: "Un rythme progressif et du temps", type: "S", weight: 2 },
                    { text: "La théorie et la documentation", type: "C", weight: 2 }
                ]
            },
            {
                text: "Quel environnement de bureau vous motive le plus au quotidien ?",
                type: "visual",
                options: [
                    { text: "🏢 Bureau individuel avec tableau de performance et objectifs affichés", type: "D", weight: 3, emoji: "🏢" },
                    { text: "🎨 Open space coloré avec espaces créatifs et zones de collaboration", type: "I", weight: 3, emoji: "🎨" },
                    { text: "🌿 Espace calme avec plantes, lumière naturelle et zones cosy", type: "S", weight: 3, emoji: "🌿" },
                    { text: "📚 Bureau organisé avec bibliothèque, classeurs et outils de travail", type: "C", weight: 3, emoji: "📚" }
                ]
            },
            {
                text: "Dans une situation de stress intense, quelle image représente le mieux votre réaction ?",
                type: "visual",
                options: [
                    { text: "⚡ Un sprinter qui accélère dans la ligne droite", type: "D", weight: 3, emoji: "⚡" },
                    { text: "🤝 Une équipe qui se serre les coudes pour affronter l'orage", type: "I", weight: 3, emoji: "🤝" },
                    { text: "🧘 Un arbre qui plie mais ne rompt pas dans la tempête", type: "S", weight: 3, emoji: "🧘" },
                    { text: "🔍 Un navigateur qui étudie sa carte avant de choisir sa route", type: "C", weight: 3, emoji: "🔍" }
                ]
            },
            {
                text: "📝 Classez ces aspects professionnels par ordre d'importance pour vous (glissez-déposez) :",
                type: "drag-drop",
                instruction: "Glissez les cartes pour les classer du PLUS important (en haut) au MOINS important (en bas)",
                options: [
                    { text: "🎯 Atteindre rapidement des objectifs ambitieux", type: "D", weight: 4, id: "obj_rapid" },
                    { text: "🗣️ Créer une atmosphère positive et motivante", type: "I", weight: 4, id: "atmosph_pos" },
                    { text: "🤝 Maintenir des relations harmonieuses et stables", type: "S", weight: 4, id: "rel_harm" },
                    { text: "📊 Assurer la précision et la qualité du travail", type: "C", weight: 4, id: "prec_qual" }
                ]
            },
            {
                text: "🎚️ Positionnez le curseur selon vos préférences naturelles :",
                type: "slider",
                instruction: "Déplacez le curseur vers votre préférence spontanée",
                sliders: [
                    {
                        label: "Dans la prise de décision, je privilégie",
                        leftLabel: "Intuition rapide",
                        rightLabel: "Analyse approfondie",
                        leftType: "D",
                        rightType: "C",
                        weight: 3
                    },
                    {
                        label: "Pour motiver une équipe, je préfère",
                        leftLabel: "Encouragements individuels",
                        rightLabel: "Dynamique de groupe",
                        leftType: "S",
                        rightType: "I",
                        weight: 3
                    }
                ]
            },
            {
                text: "💰 Vous avez 10 points à répartir entre ces 4 compétences selon vos priorités :",
                type: "budget",
                instruction: "Distribuez exactement 10 points au total. Plus vous mettez de points, plus c'est important pour vous.",
                options: [
                    { text: "Leadership et direction d'équipe", type: "D", id: "leadership" },
                    { text: "Communication et influence", type: "I", id: "communication" },
                    { text: "Coopération et soutien", type: "S", id: "cooperation" },
                    { text: "Organisation et méthode", type: "C", id: "organisation" }
                ]
            },
            {
                text: "🎯 Classez ces qualités par ordre de priorité dans votre travail (glissez-déposez):",
                type: "drag-drop",
                instruction: "Faites glisser les éléments pour les classer du plus important (en haut) au moins important (en bas)",
                options: [
                    { text: "🚀 Atteindre rapidement les objectifs", type: "D", weight: 3 },
                    { text: "🤝 Maintenir de bonnes relations avec tous", type: "I", weight: 3 },
                    { text: "⚖️ Assurer la stabilité et l'équilibre", type: "S", weight: 3 },
                    { text: "🔍 Garantir la précision et la qualité", type: "C", weight: 3 }
                ]
            },
            {
                text: "📊 Évaluez votre niveau de préférence pour chaque approche de travail:",
                type: "slider",
                instruction: "Utilisez les curseurs pour indiquer votre niveau de préférence (0 = pas du tout, 10 = totalement)",
                options: [
                    { text: "⚡ Prendre des décisions rapides et directes", type: "D" },
                    { text: "🌟 Inspirer et motiver les autres", type: "I" },
                    { text: "🏠 Créer un environnement stable et harmonieux", type: "S" },
                    { text: "📐 Analyser en détail avant d'agir", type: "C" }
                ]
            },
            {
                text: "💰 Vous avez 10 points à distribuer selon l'importance de ces aspects dans votre rôle idéal:",
                type: "budget",
                instruction: "Répartissez 10 points au total entre ces quatre aspects (utilisez + et - ou tapez directement)",
                options: [
                    { text: "💪 Pouvoir de décision et autonomie", type: "D" },
                    { text: "👥 Interaction sociale et reconnaissance", type: "I" },
                    { text: "🛡️ Sécurité de l'emploi et routine", type: "S" },
                    { text: "🎯 Expertise technique et précision", type: "C" }
                ]
            },
            {
                text: "🎭 Classez ces styles de leadership du plus proche de vous au plus éloigné:",
                type: "drag-drop",
                instruction: "Glissez-déposez pour ordonner ces styles selon votre préférence naturelle",
                options: [
                    { text: "🦁 Le leader autoritaire qui décide vite", type: "D", weight: 3 },
                    { text: "🎪 Le leader charismatique qui fédère", type: "I", weight: 3 },
                    { text: "🌱 Le leader participatif qui consensus", type: "S", weight: 3 },
                    { text: "📚 Le leader expert qui conseille", type: "C", weight: 3 }
                ]
            }
        ];

        this.profiles = {
            D: {
                name: "Dominance",
                emoji: "🔥",
                description: "Vous êtes un leader naturel, orienté résultats et déterminé. Vous excellez dans la prise de décisions rapides et n'hésitez pas à relever les défis les plus audacieux.",
                strengths: ["🎯 Leadership naturel", "⚡ Prise de décision rapide", "🏆 Orientation résultats", "🚨 Gestion de crise"],
                improvements: ["⏳ Patience avec les autres", "👂 Écoute active", "🤝 Délégation efficace", "😌 Gestion du stress"],
                color: "#e74c3c"
            },
            I: {
                name: "Influence",
                emoji: "⭐",
                description: "Vous êtes un communicateur né, sociable et inspirant. Votre optimisme contagieux et votre capacité à motiver font de vous un atout précieux pour toute équipe.",
                strengths: ["🗣️ Communication persuasive", "🚀 Motivation d'équipe", "🎨 Créativité", "❤️ Relations interpersonnelles"],
                improvements: ["📋 Organisation", "🔍 Suivi des détails", "📅 Planification", "💪 Constance dans l'effort"],
                color: "#f39c12"
            },
            S: {
                name: "Stabilité",
                emoji: "🤝",
                description: "Vous êtes le pilier de votre équipe, patient et coopératif. Votre loyauté et votre capacité à maintenir l'harmonie sont des qualités précieuses.",
                strengths: ["👥 Travail d'équipe", "🕰️ Patience", "💎 Loyauté", "🕊️ Résolution de conflits"],
                improvements: ["🚀 Initiative personnelle", "🔄 Adaptation au changement", "💪 Assertivité", "🎲 Prise de risques"],
                color: "#27ae60"
            },
            C: {
                name: "Conformité",
                emoji: "🔍",
                description: "Vous êtes un expert méticuleux, analytique et consciencieux. Votre précision et votre souci du détail garantissent une qualité irréprochable.",
                strengths: ["🧠 Analyse approfondie", "🎯 Précision", "📊 Respect des procédures", "✨ Qualité du travail"],
                improvements: ["⚡ Prise de décision rapide", "🌊 Flexibilité", "💬 Communication interpersonnelle", "⏰ Gestion du temps"],
                color: "#3498db"
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedData();
        this.updateNavigation();
    }

    shuffleOptionsIntelligently(options, questionIndex) {
        // Pour assurer un équilibrage parfait, on calcule la position idéale pour chaque type
        const types = ['D', 'I', 'S', 'C'];
        const targetPosition = questionIndex % 4; // Rotation cyclique pour équilibrer

        // Créer une copie des options pour ne pas modifier l'original
        const shuffledOptions = [...options];

        // Si c'est une question standard avec D, I, S, C dans l'ordre
        if (options.length === 4 &&
            options.every((opt, idx) => opt.type === types[idx])) {

            // Calculer le décalage pour que D soit à la position cible
            const shift = targetPosition;

            // Réorganiser les options avec rotation
            const reorderedOptions = [];
            for (let i = 0; i < 4; i++) {
                const sourceIndex = (i - shift + 4) % 4;
                reorderedOptions[i] = { ...shuffledOptions[sourceIndex] };
            }

            // Mettre à jour le tracker de positions
            types.forEach((type, originalIndex) => {
                const newPosition = (originalIndex + shift) % 4;
                this.positionTracker[type][newPosition]++;
            });

            return reorderedOptions;
        }

        // Pour les questions avec un ordre différent, mélange aléatoire simple
        return this.fisherYatesShuffle([...options]);
    }

    fisherYatesShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    amplifyScores(scores, amplificationFactor = 1.5) {
        const scoresArray = Object.values(scores);
        const maxScore = Math.max(...scoresArray);
        const minScore = Math.min(...scoresArray);

        // Si tous les scores sont identiques, pas d'amplification
        if (maxScore === minScore) {
            return { ...scores };
        }

        // Normalisation relative : le plus haut score devient 100
        const normalizedScores = {};
        Object.keys(scores).forEach(key => {
            normalizedScores[key] = (scores[key] / maxScore) * 100;
        });

        // Amplification des écarts avec une fonction exponentielle douce
        const amplifiedScores = {};
        Object.keys(normalizedScores).forEach(key => {
            const normalized = normalizedScores[key] / 100; // 0-1
            // Fonction d'amplification : maintient 1.0 à 1.0, amplifie les différences
            const amplified = Math.pow(normalized, 1 / amplificationFactor);
            // Assurer un minimum de 5% pour la lisibilité
            amplifiedScores[key] = Math.max(5, Math.round(amplified * 100));
        });

        return amplifiedScores;
    }

    createAmplificationLegend(originalScores, amplifiedScores) {
        const maxOriginal = Math.max(...Object.values(originalScores));
        return {
            show: true,
            text: `📈 Visualisation amplifiée des tendances (score max réel: ${maxOriginal}%)`,
            style: {
                fontSize: '12px',
                color: '#7f8c8d',
                fontStyle: 'italic'
            }
        };
    }

    getQualitativeLevel(amplifiedScore) {
        if (amplifiedScore >= 80) return { label: "Dominant", color: "#27ae60" };
        if (amplifiedScore >= 60) return { label: "Fort", color: "#f39c12" };
        if (amplifiedScore >= 40) return { label: "Développé", color: "#e67e22" };
        if (amplifiedScore >= 20) return { label: "Modéré", color: "#e74c3c" };
        return { label: "Faible", color: "#95a5a6" };
    }

    bindEvents() {
        document.getElementById('start-test-btn').addEventListener('click', () => this.startTest());
        document.getElementById('demo-btn').addEventListener('click', () => this.loadDemo());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('retake-test-btn').addEventListener('click', () => this.startTest());
        document.getElementById('add-member-btn').addEventListener('click', () => this.addTeamMember());

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('href').substring(1);
                this.showPage(page);
            });
        });
    }

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        document.getElementById(page).classList.add('active');
        document.querySelector(`[href="#${page}"]`).classList.add('active');

        if (page === 'profile') {
            this.displayProfile();
        } else if (page === 'team') {
            this.displayTeam();
        }
    }

    loadDemo() {
        // Créer des résultats de démonstration avec un profil mixte intéressant
        const demoResults = {
            scores: { D: 35, I: 40, S: 15, C: 10 },
            dominantType: "I",
            profile: this.profiles["I"],
            timestamp: new Date().toISOString()
        };

        // Sauvegarder les résultats de démo
        this.results = demoResults;
        this.saveResults(demoResults);

        // Créer des données d'équipe de démonstration
        const demoTeam = [
            {
                name: "Moi (Démo)",
                scores: { D: 35, I: 40, S: 15, C: 10 },
                dominantType: "I",
                timestamp: new Date().toISOString()
            },
            {
                name: "Sophie Martin",
                scores: { D: 15, I: 20, S: 45, C: 20 },
                dominantType: "S",
                timestamp: new Date().toISOString()
            },
            {
                name: "Thomas Dupont",
                scores: { D: 50, I: 15, S: 10, C: 25 },
                dominantType: "D",
                timestamp: new Date().toISOString()
            },
            {
                name: "Marie Dubois",
                scores: { D: 10, I: 15, S: 20, C: 55 },
                dominantType: "C",
                timestamp: new Date().toISOString()
            },
            {
                name: "Pierre Leroy",
                scores: { D: 25, I: 35, S: 25, C: 15 },
                dominantType: "I",
                timestamp: new Date().toISOString()
            }
        ];

        localStorage.setItem('discTeam', JSON.stringify(demoTeam));

        // Mettre à jour la navigation et afficher le profil
        this.updateNavigation();
        this.showPage('profile');

        // Afficher un message de confirmation
        this.showDemoNotification();
    }

    showDemoNotification() {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = 'demo-notification';
        notification.innerHTML = '🎬 Données de démonstration chargées ! Explorez les profils individuels et d\'équipe.';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--success-color), #229954);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            z-index: 1001;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Supprimer la notification après 4 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    startTest() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.showPage('test');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;

        const progressPercent = ((this.currentQuestionIndex) / this.questions.length) * 100;
        const progressBar = document.getElementById('progress-fill');
        progressBar.style.width = progressPercent + '%';

        // Gamification: Changer la couleur de la barre de progression selon l'avancement
        if (progressPercent < 25) {
            progressBar.style.background = 'linear-gradient(90deg, #e74c3c, #f39c12)';
        } else if (progressPercent < 50) {
            progressBar.style.background = 'linear-gradient(90deg, #f39c12, #f1c40f)';
        } else if (progressPercent < 75) {
            progressBar.style.background = 'linear-gradient(90deg, #f1c40f, #2ecc71)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
        }

        // Animation de la progression
        progressBar.style.transition = 'width 0.5s ease-out, background 0.3s ease';

        const container = document.getElementById('options-container');
        container.innerHTML = '';

        // Mélanger les options intelligemment
        const shuffledOptions = this.shuffleOptionsIntelligently(question.options, this.currentQuestionIndex);

        // Nettoyer les classes du conteneur
        container.className = 'options-container';

        // Ajouter l'indicateur de type de question
        const typeIndicator = this.getQuestionTypeIndicator(question.type);
        if (typeIndicator) {
            const indicatorDiv = document.createElement('div');
            indicatorDiv.className = 'question-type-indicator';
            indicatorDiv.innerHTML = typeIndicator + ' <small>✨ Avancement automatique</small>';
            container.appendChild(indicatorDiv);
        }

        // Ajouter l'instruction si elle existe
        if (question.instruction) {
            const instructionDiv = document.createElement('div');
            instructionDiv.className = 'question-instruction';
            instructionDiv.textContent = question.instruction;
            container.appendChild(instructionDiv);
        }

        // Gestion selon le type de question
        switch (question.type) {
            case 'visual':
                this.renderVisualQuestion(container, shuffledOptions, question);
                break;
            case 'drag-drop':
                this.renderDragDropQuestion(container, shuffledOptions, question);
                break;
            case 'slider':
                this.renderSliderQuestion(container, question);
                break;
            case 'budget':
                this.renderBudgetQuestion(container, question);
                break;
            default:
                this.renderStandardQuestion(container, shuffledOptions, question);
        }

        // Sauvegarder les options mélangées pour cette question
        this.currentShuffledOptions = shuffledOptions;
        this.updateButtons();
    }

    renderStandardQuestion(container, shuffledOptions, question) {
        shuffledOptions.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <input type="radio" name="question" id="option${index}" value="${index}">
                <label for="option${index}">${option.text}</label>
            `;
            container.appendChild(optionDiv);

            optionDiv.addEventListener('click', () => {
                const input = document.getElementById(`option${index}`);
                input.checked = true;
                this.updateButtons();

                // Auto-avancement après sélection
                setTimeout(() => {
                    this.nextQuestion();
                }, 400); // Délai pour voir l'animation de sélection
            });
        });
    }

    renderVisualQuestion(container, shuffledOptions, question) {
        container.classList.add('visual-options');

        shuffledOptions.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option visual-option';
            optionDiv.innerHTML = `
                <input type="radio" name="question" id="option${index}" value="${index}">
                <label for="option${index}">
                    <div class="visual-emoji">${option.emoji}</div>
                    <div class="visual-text">${option.text.replace(option.emoji + ' ', '')}</div>
                </label>
            `;
            container.appendChild(optionDiv);

            optionDiv.addEventListener('click', () => {
                document.getElementById(`option${index}`).checked = true;
                container.querySelectorAll('.visual-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionDiv.classList.add('selected');
                this.updateButtons();

                // Auto-avancement après sélection
                setTimeout(() => {
                    this.nextQuestion();
                }, 400);
            });
        });
    }

    renderDragDropQuestion(container, shuffledOptions, question) {
        container.classList.add('drag-drop-container');
        this.dragDropCompleted = false; // Reset flag pour cette question

        const dragArea = document.createElement('div');
        dragArea.className = 'drag-drop-area';
        container.appendChild(dragArea);

        shuffledOptions.forEach((option, index) => {
            const dragItem = document.createElement('div');
            dragItem.className = 'drag-item';
            dragItem.draggable = true;
            dragItem.dataset.optionIndex = index;
            dragItem.innerHTML = `
                <div class="drag-handle">⋮⋮</div>
                <div class="drag-content">${option.text}</div>
                <div class="drag-rank">Position ${index + 1}</div>
            `;
            dragArea.appendChild(dragItem);

            this.addDragDropListeners(dragItem, dragArea);
        });

        // Hidden input pour stocker l'ordre
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'question';
        hiddenInput.id = 'dragDropOrder';
        container.appendChild(hiddenInput);
    }

    renderSliderQuestion(container, question) {
        container.classList.add('slider-container');
        this.slidersTouched = new Set(); // Tracker les sliders modifiés

        question.options.forEach((option, sliderIndex) => {
            const sliderDiv = document.createElement('div');
            sliderDiv.className = 'slider-question';
            sliderDiv.innerHTML = `
                <div class="slider-label">${option.text}</div>
                <div class="slider-wrapper">
                    <span class="slider-left-label">Pas du tout</span>
                    <input type="range" class="slider-input"
                           min="0" max="10" value="5"
                           id="slider${sliderIndex}">
                    <span class="slider-right-label">Totalement</span>
                </div>
                <div class="slider-value" id="sliderValue${sliderIndex}">5</div>
            `;
            container.appendChild(sliderDiv);

            const sliderInput = sliderDiv.querySelector('.slider-input');
            const valueDisplay = sliderDiv.querySelector('.slider-value');

            sliderInput.addEventListener('input', (e) => {
                const value = e.target.value;
                valueDisplay.textContent = value;

                // Marquer ce slider comme touché
                this.slidersTouched.add(sliderIndex);

                this.updateButtons();

                // Auto-avancement si tous les sliders ont été touchés
                if (this.slidersTouched.size === question.options.length) {
                    setTimeout(() => {
                        this.nextQuestion();
                    }, 600);
                }
            });
        });

        // Hidden input pour stocker les valeurs
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'question';
        hiddenInput.id = 'sliderValues';
        container.appendChild(hiddenInput);
    }

    renderBudgetQuestion(container, question) {
        container.classList.add('budget-container');
        this.budgetCompleted = false; // Reset flag pour cette question

        const budgetGrid = document.createElement('div');
        budgetGrid.className = 'budget-grid';
        container.appendChild(budgetGrid);

        let totalPoints = 0;

        question.options.forEach((option, index) => {
            const budgetItem = document.createElement('div');
            budgetItem.className = 'budget-item';
            budgetItem.innerHTML = `
                <div class="budget-label">${option.text}</div>
                <div class="budget-controls">
                    <button type="button" class="budget-btn budget-minus" data-index="${index}">−</button>
                    <input type="number" class="budget-input" min="0" max="10" value="0"
                           id="budget${index}" data-index="${index}">
                    <button type="button" class="budget-btn budget-plus" data-index="${index}">+</button>
                </div>
                <div class="budget-points" id="budgetPoints${index}">0 points</div>
            `;
            budgetGrid.appendChild(budgetItem);
        });

        // Total display
        const totalDiv = document.createElement('div');
        totalDiv.className = 'budget-total';
        totalDiv.innerHTML = `
            <strong>Total: <span id="budgetTotal">0</span> / 10 points</strong>
        `;
        container.appendChild(totalDiv);

        // Hidden input pour stocker la distribution
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'question';
        hiddenInput.id = 'budgetDistribution';
        container.appendChild(hiddenInput);

        // Ajouter les event listeners
        this.addBudgetListeners(container, question);
    }

    addDragDropListeners(dragItem, dragArea) {
        let draggedElement = null;

        dragItem.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            e.target.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
        });

        dragItem.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
            this.updateDragDropRanks(dragArea);
            this.updateButtons();
        });

        dragItem.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        dragItem.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedElement && draggedElement !== e.target) {
                const dragArea = draggedElement.parentNode;
                const children = Array.from(dragArea.children);
                const draggedIndex = children.indexOf(draggedElement);
                const targetIndex = children.indexOf(e.target);

                if (draggedIndex < targetIndex) {
                    dragArea.insertBefore(draggedElement, e.target.nextSibling);
                } else {
                    dragArea.insertBefore(draggedElement, e.target);
                }

                this.updateDragDropRanks(dragArea);
                this.updateButtons();
            }
        });
    }

    updateDragDropRanks(dragArea) {
        const items = dragArea.querySelectorAll('.drag-item');
        items.forEach((item, index) => {
            const rankDiv = item.querySelector('.drag-rank');
            rankDiv.textContent = `Position ${index + 1}`;
        });

        // Stocker l'ordre dans l'input caché
        const order = Array.from(items).map(item => item.dataset.optionIndex);
        const hiddenInput = document.getElementById('dragDropOrder');
        if (hiddenInput) {
            hiddenInput.value = order.join(',');

            // Auto-avancement après le premier classement complet
            if (!this.dragDropCompleted) {
                this.dragDropCompleted = true;
                setTimeout(() => {
                    this.nextQuestion();
                }, 800); // Plus de temps pour voir le classement
            }
        }
    }

    addBudgetListeners(container, question) {
        const updateTotal = () => {
            let total = 0;
            question.options.forEach((_, index) => {
                const input = document.getElementById(`budget${index}`);
                total += parseInt(input.value) || 0;
            });

            const totalSpan = document.getElementById('budgetTotal');
            totalSpan.textContent = total;
            totalSpan.style.color = total === 10 ? '#27ae60' : total > 10 ? '#e74c3c' : '#f39c12';

            // Auto-avancement quand le budget est équilibré à 10
            if (total === 10 && !this.budgetCompleted) {
                this.budgetCompleted = true;
                setTimeout(() => {
                    this.nextQuestion();
                }, 800);
            }

            // Stocker la distribution
            const distribution = question.options.map((_, index) => {
                const input = document.getElementById(`budget${index}`);
                return parseInt(input.value) || 0;
            });

            const hiddenInput = document.getElementById('budgetDistribution');
            if (hiddenInput) {
                hiddenInput.value = distribution.join(',');
            }

            this.updateButtons();
        };

        // Event listeners pour les boutons + et -
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('budget-plus')) {
                const index = e.target.dataset.index;
                const input = document.getElementById(`budget${index}`);
                const currentTotal = this.getBudgetTotal(question);

                if (currentTotal < 10) {
                    input.value = Math.min(10, (parseInt(input.value) || 0) + 1);
                    this.updateBudgetDisplay(index, input.value);
                    updateTotal();
                }
            } else if (e.target.classList.contains('budget-minus')) {
                const index = e.target.dataset.index;
                const input = document.getElementById(`budget${index}`);
                input.value = Math.max(0, (parseInt(input.value) || 0) - 1);
                this.updateBudgetDisplay(index, input.value);
                updateTotal();
            }
        });

        // Event listeners pour les inputs directs
        question.options.forEach((_, index) => {
            const input = document.getElementById(`budget${index}`);
            input.addEventListener('input', (e) => {
                const value = Math.max(0, Math.min(10, parseInt(e.target.value) || 0));
                e.target.value = value;
                this.updateBudgetDisplay(index, value);
                updateTotal();
            });
        });

        updateTotal(); // Initialisation
    }

    getBudgetTotal(question) {
        let total = 0;
        question.options.forEach((_, index) => {
            const input = document.getElementById(`budget${index}`);
            if (input) total += parseInt(input.value) || 0;
        });
        return total;
    }

    updateBudgetDisplay(index, value) {
        const pointsDiv = document.getElementById(`budgetPoints${index}`);
        if (pointsDiv) {
            pointsDiv.textContent = `${value} point${value !== 1 ? 's' : ''}`;
        }
    }

    processDragDropAnswer() {
        const dragOrder = document.getElementById('dragDropOrder');
        if (!dragOrder || !dragOrder.value) return null;

        const order = dragOrder.value.split(',').map(i => parseInt(i));
        const question = this.questions[this.currentQuestionIndex];

        // Calculer le score basé sur le classement (1er = poids max, dernier = poids min)
        const weights = [3, 2, 1, 0]; // Poids pour positions 1, 2, 3, 4
        let totalScore = { D: 0, I: 0, S: 0, C: 0 };

        order.forEach((optionIndex, rank) => {
            const option = this.currentShuffledOptions[optionIndex];
            totalScore[option.type] += weights[rank];
        });

        // Retourner le type dominant de cette question
        const dominantType = Object.keys(totalScore).reduce((a, b) =>
            totalScore[a] > totalScore[b] ? a : b
        );

        return {
            type: dominantType,
            weight: Math.max(...Object.values(totalScore)),
            text: `Classement: ${order.map(i => this.currentShuffledOptions[i].text.substring(0, 20) + '...').join(' > ')}`
        };
    }

    processSliderAnswer() {
        const sliders = document.querySelectorAll('.slider-input');
        if (sliders.length === 0) return null;

        const question = this.questions[this.currentQuestionIndex];
        let maxScore = 0;
        let dominantType = null;

        sliders.forEach((slider, index) => {
            const value = parseInt(slider.value);
            const option = question.options[index];

            if (value > maxScore) {
                maxScore = value;
                dominantType = option.type;
            }
        });

        return {
            type: dominantType,
            weight: Math.round(maxScore / 2), // Convertir 0-10 vers 0-5
            text: `Préférence slider: ${maxScore}/10`
        };
    }

    processBudgetAnswer() {
        const budgetInputs = document.querySelectorAll('.budget-input');
        if (budgetInputs.length === 0) return null;

        const question = this.questions[this.currentQuestionIndex];
        let maxBudget = 0;
        let dominantType = null;

        budgetInputs.forEach((input, index) => {
            const value = parseInt(input.value) || 0;
            const option = question.options[index];

            if (value > maxBudget) {
                maxBudget = value;
                dominantType = option.type;
            }
        });

        return {
            type: dominantType,
            weight: Math.round(maxBudget / 2), // Convertir 0-10 vers 0-5
            text: `Budget alloué: ${maxBudget} points`
        };
    }

    updateButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const question = this.questions[this.currentQuestionIndex];
        let isValid = false;

        // Validation selon le type de question
        switch (question?.type) {
            case 'drag-drop':
                // Vérifier qu'il y a un ordre défini
                const dragOrder = document.getElementById('dragDropOrder');
                isValid = dragOrder && dragOrder.value.length > 0;
                break;
            case 'slider':
                // Vérifier que tous les sliders ont une valeur
                const sliders = document.querySelectorAll('.slider-input');
                isValid = sliders.length > 0 && Array.from(sliders).every(slider => slider.value !== '');
                break;
            case 'budget':
                // Vérifier que la distribution totalise exactement 10 points
                const budgetTotal = document.getElementById('budgetTotal');
                isValid = budgetTotal && parseInt(budgetTotal.textContent) === 10;
                break;
            default:
                // Questions standard - vérifier qu'une option est sélectionnée
                const selectedOption = document.querySelector('input[name="question"]:checked');
                isValid = !!selectedOption;
        }

        prevBtn.disabled = this.currentQuestionIndex === 0;
        nextBtn.disabled = !isValid;

        if (this.currentQuestionIndex === this.questions.length - 1 && isValid) {
            nextBtn.textContent = 'Terminer';
        } else {
            nextBtn.textContent = 'Suivant';
        }
    }

    nextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        let answer = null;

        // Récupérer la réponse selon le type de question
        switch (question.type) {
            case 'drag-drop':
                answer = this.processDragDropAnswer();
                break;
            case 'slider':
                answer = this.processSliderAnswer();
                break;
            case 'budget':
                answer = this.processBudgetAnswer();
                break;
            default:
                const selectedOption = document.querySelector('input[name="question"]:checked');
                if (selectedOption) {
                    const optionIndex = parseInt(selectedOption.value);
                    answer = this.currentShuffledOptions[optionIndex];
                }
        }

        if (answer) {
            this.answers[this.currentQuestionIndex] = answer;

            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.displayQuestion();
            } else {
                this.completeTest();
            }
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();

            if (this.answers[this.currentQuestionIndex]) {
                const savedAnswer = this.answers[this.currentQuestionIndex];
                // Trouver l'index dans les options mélangées actuelles
                const optionIndex = this.currentShuffledOptions.findIndex(opt =>
                    opt.type === savedAnswer.type && opt.text === savedAnswer.text
                );
                if (optionIndex !== -1) {
                    document.getElementById(`option${optionIndex}`).checked = true;
                }
            }
            this.updateButtons();
        }
    }

    completeTest() {
        // Effet de célébration
        this.showCompletionCelebration();

        setTimeout(() => {
            const results = this.calculateResults();
            this.results = results; // Fix: Store results in instance
            this.saveResults(results);
            this.showPage('profile');
        }, 2000);
    }

    showCompletionCelebration() {
        const progressBar = document.getElementById('progress-fill');
        progressBar.style.width = '100%';
        progressBar.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';

        // Créer des confettis
        this.createConfetti();

        // Message de félicitations temporaire
        const questionCard = document.getElementById('question-card');
        questionCard.innerHTML = `
            <div class="completion-celebration">
                <h2>🎉 Félicitations !</h2>
                <p>Vous avez terminé le test DISC avec succès !</p>
                <div class="celebration-loader">
                    <div class="spinner"></div>
                    <p>Analyse de votre profil en cours...</p>
                </div>
            </div>
        `;
    }

    createConfetti() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
            confettiContainer.appendChild(confetti);
        }

        // Nettoyer après 5 secondes
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    getQuestionTypeIndicator(questionType) {
        const indicators = {
            'drag-drop': '🔄 <strong>Question Glisser-Déposer</strong> - Classez vos préférences',
            'slider': '🎚️ <strong>Question Curseurs</strong> - Ajustez vos niveaux de préférence',
            'budget': '💰 <strong>Question Budget</strong> - Répartissez vos points',
            'visual': '👁️ <strong>Question Visuelle</strong> - Choisissez votre option préférée',
            'default': '✅ <strong>Question Standard</strong> - Sélectionnez une option'
        };

        return indicators[questionType] || indicators['default'];
    }

    calculateResults() {
        const scores = { D: 0, I: 0, S: 0, C: 0 };

        this.answers.forEach(answer => {
            scores[answer.type] += answer.weight;
        });

        const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
        const percentages = {};

        Object.keys(scores).forEach(type => {
            percentages[type] = Math.round((scores[type] / total) * 100);
        });

        const dominantType = Object.keys(percentages).reduce((a, b) =>
            percentages[a] > percentages[b] ? a : b
        );

        return {
            scores: percentages,
            dominantType: dominantType,
            profile: this.profiles[dominantType],
            timestamp: new Date().toISOString()
        };
    }

    saveResults(results) {
        localStorage.setItem('discResults', JSON.stringify(results));

        const teamData = JSON.parse(localStorage.getItem('discTeam') || '[]');
        const existingIndex = teamData.findIndex(member => member.name === 'Moi');

        const memberData = {
            name: 'Moi',
            scores: results.scores,
            dominantType: results.dominantType,
            timestamp: results.timestamp
        };

        if (existingIndex !== -1) {
            teamData[existingIndex] = memberData;
        } else {
            teamData.unshift(memberData);
        }

        localStorage.setItem('discTeam', JSON.stringify(teamData));
    }

    loadSavedData() {
        const results = localStorage.getItem('discResults');
        if (results) {
            this.results = JSON.parse(results);
        }
    }

    displayProfile() {
        if (!this.results) {
            document.querySelector('.profile-content').innerHTML =
                '<p class="no-results">Aucun résultat disponible. Veuillez d\'abord passer le test.</p>';
            return;
        }

        this.updateProfileDisplay();
        this.createProfileChart();
    }

    updateProfileDisplay() {
        const { scores, dominantType, profile } = this.results;

        // Update hero section
        document.getElementById('profile-emoji').textContent = profile.emoji;
        document.getElementById('dominant-type-hero').textContent = `${profile.emoji} ${profile.name}`;
        document.getElementById('profile-tagline').textContent = profile.description;
        document.getElementById('dominant-score').textContent = scores[dominantType] + '%';

        // Update hero background color based on dominant type
        const heroElement = document.querySelector('.profile-hero');
        const profileColor = this.profiles[dominantType].color;
        heroElement.style.background = `linear-gradient(135deg, ${profileColor} 0%, var(--accent-color) 100%)`;

        // Setup tab functionality
        this.setupProfileTabs();

        // Populate strengths
        this.populateStrengths(profile.strengths);

        // Populate growth recommendations
        this.populateGrowthRecommendations(profile.improvements, dominantType);

        // Populate compatibility matrix
        this.populateCompatibilityMatrix(dominantType);

        // Populate detailed breakdown
        this.populateDetailedBreakdown(scores);

        // Populate personalized tips
        this.populatePersonalizedTips(profile, dominantType);

        // Setup action buttons
        this.setupActionButtons();
    }

    setupProfileTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;

                // Remove active class from all tabs and panels
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab and corresponding panel
                btn.classList.add('active');
                document.getElementById(`${targetTab}-panel`).classList.add('active');
            });
        });
    }

    populateStrengths(strengths) {
        const strengthsGrid = document.getElementById('strengths-grid');
        strengthsGrid.innerHTML = strengths.slice(0, 6).map((strength, index) => `
            <div class="strength-card" style="animation-delay: ${index * 0.1}s">
                <h5>💪 ${strength.split(' - ')[0]}</h5>
                <p>${strength.split(' - ')[1] || strength}</p>
            </div>
        `).join('');
    }

    populateGrowthRecommendations(improvements, dominantType) {
        const growthDiv = document.getElementById('growth-recommendations');
        growthDiv.innerHTML = improvements.slice(0, 4).map((improvement, index) => `
            <div class="growth-item" style="animation-delay: ${index * 0.1}s">
                <h5>🎯 ${improvement.split(' - ')[0]}</h5>
                <p>${improvement.split(' - ')[1] || improvement}</p>
                <a href="#team" class="growth-action">Explorer en équipe</a>
            </div>
        `).join('');
    }

    populateCompatibilityMatrix(dominantType) {
        const compatibilityDiv = document.getElementById('compatibility-matrix');
        const compatibility = {
            D: { D: 'medium', I: 'high', S: 'low', C: 'medium' },
            I: { D: 'high', I: 'high', S: 'medium', C: 'low' },
            S: { D: 'low', I: 'medium', S: 'high', C: 'high' },
            C: { D: 'medium', I: 'low', S: 'high', C: 'medium' }
        };

        const typeInfo = {
            D: { emoji: '🔥', name: 'Dominance' },
            I: { emoji: '⭐', name: 'Influence' },
            S: { emoji: '🤝', name: 'Stabilité' },
            C: { emoji: '🔍', name: 'Conformité' }
        };

        compatibilityDiv.innerHTML = Object.keys(compatibility[dominantType]).map(type => {
            const level = compatibility[dominantType][type];
            const levelText = level === 'high' ? 'Excellente' : level === 'medium' ? 'Bonne' : 'À développer';
            return `
                <div class="compatibility-item">
                    <div class="compatibility-emoji">${typeInfo[type].emoji}</div>
                    <div class="compatibility-level compatibility-${level}">${levelText}</div>
                    <div>${typeInfo[type].name}</div>
                </div>
            `;
        }).join('');
    }

    populateDetailedBreakdown(scores) {
        const breakdownDiv = document.getElementById('dimension-breakdown');
        const dimensions = [
            { key: 'D', emoji: '🔥', name: 'Dominance', desc: 'Prise de décision et leadership' },
            { key: 'I', emoji: '⭐', name: 'Influence', desc: 'Communication et persuasion' },
            { key: 'S', emoji: '🤝', name: 'Stabilité', desc: 'Coopération et patience' },
            { key: 'C', emoji: '🔍', name: 'Conformité', desc: 'Précision et analyse' }
        ];

        breakdownDiv.innerHTML = dimensions.map((dim, index) => `
            <div class="dimension-item" style="animation-delay: ${index * 0.1}s">
                <div class="dimension-emoji">${dim.emoji}</div>
                <div class="dimension-score" style="color: var(--${dim.key.toLowerCase()}-color)">${scores[dim.key]}%</div>
                <div class="dimension-label">${dim.name}</div>
                <div class="dimension-description">${dim.desc}</div>
            </div>
        `).join('');
    }

    populatePersonalizedTips(profile, dominantType) {
        const tipsDiv = document.getElementById('personal-tips');
        const tips = [
            { icon: '🎯', title: 'Conseil Principal', content: `En tant que profil ${profile.name}, concentrez-vous sur vos forces naturelles tout en développant votre flexibilité.` },
            { icon: '🤝', title: 'En Équipe', content: 'Votre style complémente bien certains profils. Explorez la section équipe pour optimiser la collaboration.' },
            { icon: '📈', title: 'Développement', content: 'Travaillez sur les dimensions moins développées pour un profil plus équilibré et polyvalent.' }
        ];

        tipsDiv.innerHTML = tips.map((tip, index) => `
            <div class="tip-item" style="animation-delay: ${index * 0.1}s">
                <h5>${tip.icon} ${tip.title}</h5>
                <p>${tip.content}</p>
            </div>
        `).join('');
    }

    setupActionButtons() {
        // Partage de profil
        document.getElementById('share-profile-btn').addEventListener('click', () => {
            this.shareProfile();
        });

        // Comparaison
        document.getElementById('compare-btn').addEventListener('click', () => {
            this.showPage('team');
        });
    }

    shareProfile() {
        if (navigator.share && this.results) {
            navigator.share({
                title: 'Mon Profil DISC',
                text: `Je suis ${this.results.profile.name} (${this.results.dominantType}) avec un score de ${this.results.scores[this.results.dominantType]}%`,
                url: window.location.href
            });
        } else {
            // Fallback: copier dans le presse-papiers
            const shareText = `Mon Profil DISC: ${this.results.profile.name} (${this.results.dominantType}) - ${this.results.scores[this.results.dominantType]}%`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Profil copié dans le presse-papiers!');
            });
        }
    }

    createProfileChart() {
        const ctx = document.getElementById('profile-radar-chart').getContext('2d');
        const { scores, dominantType } = this.results;

        if (this.profileChart) {
            this.profileChart.destroy();
        }

        // Amplifier les scores pour une meilleure visualisation
        const originalScores = scores;
        const amplifiedScores = this.amplifyScores(scores);

        // Utiliser la couleur du profil dominant
        const profileColor = this.profiles[dominantType].color;

        this.profileChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['🔥 Dominance', '⭐ Influence', '🤝 Stabilité', '🔍 Conformité'],
                datasets: [{
                    label: 'Mon Profil DISC (Visualisation amplifiée)',
                    data: [amplifiedScores.D, amplifiedScores.I, amplifiedScores.S, amplifiedScores.C],
                    backgroundColor: `${profileColor}30`,
                    borderColor: profileColor,
                    borderWidth: 3,
                    pointBackgroundColor: profileColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: profileColor,
                    pointHoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 20
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#7f8c8d',
                            callback: function(value) {
                                if (value === 0) return '';
                                if (value === 20) return 'Faible';
                                if (value === 40) return 'Modéré';
                                if (value === 60) return 'Développé';
                                if (value === 80) return 'Fort';
                                if (value === 100) return 'Dominant';
                                return '';
                            }
                        },
                        grid: {
                            color: function(context) {
                                const value = context.tick.value;
                                if (value === 20) return 'rgba(231, 76, 60, 0.2)';   // Rouge faible
                                if (value === 40) return 'rgba(230, 126, 34, 0.2)';  // Orange modéré
                                if (value === 60) return 'rgba(243, 156, 18, 0.2)';  // Jaune développé
                                if (value === 80) return 'rgba(39, 174, 96, 0.2)';   // Vert fort
                                if (value === 100) return 'rgba(39, 174, 96, 0.3)';  // Vert dominant
                                return 'rgba(0,0,0,0.05)';
                            },
                            lineWidth: 2
                        },
                        angleLines: {
                            color: 'rgba(0,0,0,0.08)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#2c3e50',
                            padding: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#2c3e50',
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: profileColor,
                        borderWidth: 2,
                        cornerRadius: 8,
                        displayColors: false,
                        padding: 12,
                        callbacks: {
                            title: function(context) {
                                const labels = ['Dominance', 'Influence', 'Stabilité', 'Conformité'];
                                return labels[context[0].dataIndex];
                            },
                            label: function(context) {
                                const dimension = ['D', 'I', 'S', 'C'][context.dataIndex];
                                const realScore = originalScores[dimension];
                                const amplifiedScore = context.parsed.r;
                                const qualLevel = this.getQualitativeLevel(amplifiedScore);
                                return [
                                    `Score réel: ${realScore}%`,
                                    `Niveau: ${qualLevel.label}`,
                                    `(Visualisation amplifiée)`
                                ];
                            }.bind(this)
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Ajouter une note explicative sous le graphique
        this.addAmplificationNote('profile-chart');
    }

    addAmplificationNote(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with id '${containerId}' not found`);
            return;
        }

        const existingNote = container.querySelector('.amplification-note');
        if (existingNote) {
            existingNote.remove();
        }

        const note = document.createElement('div');
        note.className = 'amplification-note';
        note.innerHTML = '📊 <em>Visualisation des forces relatives - Scores réels dans les détails</em>';
        note.style.cssText = `
            text-align: center;
            font-size: 11px;
            color: #7f8c8d;
            font-style: italic;
            margin-top: 8px;
            padding: 4px;
            background: rgba(127, 140, 141, 0.1);
            border-radius: 4px;
        `;
        container.appendChild(note);
    }

    displayTeam() {
        const teamData = JSON.parse(localStorage.getItem('discTeam') || '[]');
        this.displayTeamMembers(teamData);
        this.createTeamCharts(teamData);
        this.generateTeamInsights(teamData);
    }

    displayTeamMembers(teamData) {
        const container = document.getElementById('team-members');
        container.innerHTML = '';

        if (teamData.length === 0) {
            container.innerHTML = '<p class="no-members">Aucun membre d\'équipe ajouté.</p>';
            return;
        }

        teamData.forEach((member, index) => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member';
            memberDiv.innerHTML = `
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <span class="member-type">${this.profiles[member.dominantType].name}</span>
                </div>
                <div class="member-scores">
                    <div class="score-mini d-color" style="width: ${member.scores.D}%">${member.scores.D}%</div>
                    <div class="score-mini i-color" style="width: ${member.scores.I}%">${member.scores.I}%</div>
                    <div class="score-mini s-color" style="width: ${member.scores.S}%">${member.scores.S}%</div>
                    <div class="score-mini c-color" style="width: ${member.scores.C}%">${member.scores.C}%</div>
                </div>
                ${member.name !== 'Moi' ? `<button class="remove-member" data-index="${index}">Supprimer</button>` : ''}
            `;
            container.appendChild(memberDiv);
        });

        document.querySelectorAll('.remove-member').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeMember(index);
            });
        });
    }

    addTeamMember() {
        const name = prompt('Nom du membre de l\'équipe:');
        if (!name) return;

        const dScore = parseInt(prompt('Score Dominance (0-100):') || '0');
        const iScore = parseInt(prompt('Score Influence (0-100):') || '0');
        const sScore = parseInt(prompt('Score Stabilité (0-100):') || '0');
        const cScore = parseInt(prompt('Score Conformité (0-100):') || '0');

        if (isNaN(dScore) || isNaN(iScore) || isNaN(sScore) || isNaN(cScore)) {
            alert('Veuillez entrer des valeurs numériques valides.');
            return;
        }

        const scores = { D: dScore, I: iScore, S: sScore, C: cScore };
        const dominantType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        const teamData = JSON.parse(localStorage.getItem('discTeam') || '[]');
        teamData.push({
            name,
            scores,
            dominantType,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem('discTeam', JSON.stringify(teamData));
        this.displayTeam();
    }

    removeMember(index) {
        const teamData = JSON.parse(localStorage.getItem('discTeam') || '[]');
        teamData.splice(index, 1);
        localStorage.setItem('discTeam', JSON.stringify(teamData));
        this.displayTeam();
    }

    createTeamCharts(teamData) {
        this.createTeamRadarChart(teamData);
        this.createTeamCompositionChart(teamData);
    }

    createTeamRadarChart(teamData) {
        const ctx = document.getElementById('team-radar-chart').getContext('2d');

        if (teamData.length === 0) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            return;
        }

        const avgScores = { D: 0, I: 0, S: 0, C: 0 };
        teamData.forEach(member => {
            Object.keys(avgScores).forEach(type => {
                avgScores[type] += member.scores[type];
            });
        });

        Object.keys(avgScores).forEach(type => {
            avgScores[type] = Math.round(avgScores[type] / teamData.length);
        });

        // Amplifier les scores pour une meilleure visualisation
        const originalScores = avgScores;
        const amplifiedScores = this.amplifyScores(avgScores);

        if (this.teamRadarChart) {
            this.teamRadarChart.destroy();
        }

        this.teamRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['🔥 Dominance', '⭐ Influence', '🤝 Stabilité', '🔍 Conformité'],
                datasets: [{
                    label: 'Profil Moyen de l\'Équipe (Visualisation amplifiée)',
                    data: [amplifiedScores.D, amplifiedScores.I, amplifiedScores.S, amplifiedScores.C],
                    backgroundColor: 'rgba(46, 204, 113, 0.3)',
                    borderColor: '#27ae60',
                    borderWidth: 3,
                    pointBackgroundColor: '#27ae60',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#27ae60',
                    pointHoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 20
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#7f8c8d',
                            callback: function(value) {
                                if (value === 0) return '';
                                if (value === 20) return 'Faible';
                                if (value === 40) return 'Modéré';
                                if (value === 60) return 'Développé';
                                if (value === 80) return 'Fort';
                                if (value === 100) return 'Dominant';
                                return '';
                            }
                        },
                        grid: {
                            color: function(context) {
                                const value = context.tick.value;
                                if (value === 20) return 'rgba(231, 76, 60, 0.2)';   // Rouge faible
                                if (value === 40) return 'rgba(230, 126, 34, 0.2)';  // Orange modéré
                                if (value === 60) return 'rgba(243, 156, 18, 0.2)';  // Jaune développé
                                if (value === 80) return 'rgba(39, 174, 96, 0.2)';   // Vert fort
                                if (value === 100) return 'rgba(39, 174, 96, 0.3)';  // Vert dominant
                                return 'rgba(0,0,0,0.05)';
                            },
                            lineWidth: 2
                        },
                        angleLines: {
                            color: 'rgba(0,0,0,0.08)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#2c3e50',
                            padding: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#2c3e50',
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#27ae60',
                        borderWidth: 2,
                        cornerRadius: 8,
                        displayColors: false,
                        padding: 12,
                        callbacks: {
                            title: function(context) {
                                const labels = ['Dominance', 'Influence', 'Stabilité', 'Conformité'];
                                return labels[context[0].dataIndex];
                            },
                            label: function(context) {
                                const dimension = ['D', 'I', 'S', 'C'][context.dataIndex];
                                const realScore = originalScores[dimension];
                                const amplifiedScore = context.parsed.r;
                                const qualLevel = this.getQualitativeLevel(amplifiedScore);
                                return [
                                    `Score moyen réel: ${realScore}%`,
                                    `Niveau équipe: ${qualLevel.label}`,
                                    `(${teamData.length} membres)`,
                                    `(Visualisation amplifiée)`
                                ];
                            }.bind(this)
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Ajouter une note explicative sous le graphique
        this.addAmplificationNote('team-chart');
    }

    createTeamCompositionChart(teamData) {
        const ctx = document.getElementById('team-composition-chart').getContext('2d');

        if (teamData.length === 0) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            return;
        }

        const composition = { D: 0, I: 0, S: 0, C: 0 };
        teamData.forEach(member => {
            composition[member.dominantType]++;
        });

        if (this.teamCompositionChart) {
            this.teamCompositionChart.destroy();
        }

        this.teamCompositionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Dominance', 'Influence', 'Stabilité', 'Conformité'],
                datasets: [{
                    data: [composition.D, composition.I, composition.S, composition.C],
                    backgroundColor: ['#e74c3c', '#f39c12', '#27ae60', '#3498db'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    generateTeamInsights(teamData) {
        if (teamData.length === 0) {
            document.getElementById('team-strengths').innerHTML = '<p>Ajoutez des membres pour voir les forces de l\'équipe.</p>';
            document.getElementById('team-weaknesses').innerHTML = '<p>Ajoutez des membres pour voir les zones d\'amélioration.</p>';
            document.getElementById('team-recommendations-content').innerHTML = '<p>Ajoutez des membres pour obtenir des recommandations.</p>';
            return;
        }

        // Calculer les scores moyens
        const avgScores = { D: 0, I: 0, S: 0, C: 0 };
        teamData.forEach(member => {
            Object.keys(avgScores).forEach(type => {
                avgScores[type] += member.scores[type];
            });
        });

        Object.keys(avgScores).forEach(type => {
            avgScores[type] = Math.round(avgScores[type] / teamData.length);
        });

        // Analyser la distribution des profils dominants
        const profileDistribution = { D: 0, I: 0, S: 0, C: 0 };
        teamData.forEach(member => {
            profileDistribution[member.dominantType]++;
        });

        // Identifier les forces et faiblesses de manière plus intelligente
        const strengths = [];
        const weaknesses = [];
        const recommendations = [];

        // Analyse relative : comparer les scores entre eux
        const sortedScores = Object.entries(avgScores).sort((a, b) => b[1] - a[1]);
        const highest = sortedScores[0];
        const lowest = sortedScores[3];
        const secondLowest = sortedScores[2];

        // Forces basées sur les scores relatifs et la distribution
        if (highest[1] > 35 || profileDistribution[highest[0]] >= 2) {
            const strengthsMap = {
                'D': "🎯 Leadership naturel et capacité de prise de décision",
                'I': "🗣️ Excellente communication et dynamisme d'équipe",
                'S': "🤝 Cohésion solide et environnement collaboratif",
                'C': "🔍 Rigueur et attention aux détails"
            };
            strengths.push(strengthsMap[highest[0]]);
        }

        // Ajouter des forces selon la composition de l'équipe
        if (Object.keys(profileDistribution).filter(key => profileDistribution[key] > 0).length >= 3) {
            strengths.push("🌈 Diversité de profils complémentaires");
        }

        if (teamData.length >= 4 && Math.max(...Object.values(profileDistribution)) <= Math.ceil(teamData.length / 2)) {
            strengths.push("⚖️ Équipe bien équilibrée sans dominance excessive");
        }

        // Faiblesses basées sur les scores les plus bas et les manques
        const weaknessThreshold = 20;
        const improvementThreshold = 30;

        if (lowest[1] < weaknessThreshold) {
            const weaknessesMap = {
                'D': "🔻 Manque d'assertivité et de leadership directif",
                'I': "🔻 Communication limitée et manque d'enthousiasme collectif",
                'S': "🔻 Instabilité et difficultés de coopération",
                'C': "🔻 Manque de rigueur dans les processus"
            };
            weaknesses.push(weaknessesMap[lowest[0]]);
        }

        if (secondLowest[1] < weaknessThreshold) {
            const weaknessesMap = {
                'D': "🔻 Prise de décision hésitante",
                'I': "🔻 Motivation d'équipe insuffisante",
                'S': "🔻 Résistance au changement",
                'C': "🔻 Attention aux détails perfectible"
            };
            weaknesses.push(weaknessesMap[secondLowest[0]]);
        }

        // Recommandations basées sur l'analyse
        if (lowest[1] < improvementThreshold) {
            const recommendationsMap = {
                'D': "💡 Développer les compétences de leadership et d'initiative personnelle",
                'I': "💡 Améliorer la communication interne et les compétences d'influence",
                'S': "💡 Renforcer la cohésion d'équipe et les processus collaboratifs",
                'C': "💡 Implémenter des processus qualité et améliorer la précision"
            };
            recommendations.push(recommendationsMap[lowest[0]]);
        }

        if (secondLowest[1] < improvementThreshold) {
            const secondRecommendationsMap = {
                'D': "💡 Encourager la prise d'initiative et l'autonomie décisionnelle",
                'I': "💡 Organiser des sessions de team building et de communication",
                'S': "💡 Créer un environnement plus stable et prévisible",
                'C': "💡 Former aux méthodologies et outils de contrôle qualité"
            };
            recommendations.push(secondRecommendationsMap[secondLowest[0]]);
        }

        // Recommandations spécifiques selon la composition
        if (profileDistribution.D === 0) {
            recommendations.push("💡 Recruter un profil Dominance pour le leadership");
        }
        if (profileDistribution.I === 0) {
            recommendations.push("💡 Développer les compétences de communication de l'équipe");
        }
        if (profileDistribution.S === 0) {
            recommendations.push("💡 Renforcer la stabilité et les processus collaboratifs");
        }
        if (profileDistribution.C === 0) {
            recommendations.push("💡 Améliorer les processus de contrôle qualité");
        }

        // Recommandation d'équilibrage si déséquilibre important
        const maxProfile = Math.max(...Object.values(profileDistribution));
        if (maxProfile > teamData.length * 0.6 && teamData.length >= 3) {
            const dominantProfile = Object.keys(profileDistribution).find(key => profileDistribution[key] === maxProfile);
            recommendations.push(`💡 Équilibrer l'équipe en ajoutant des profils complémentaires au profil ${this.profiles[dominantProfile].name} dominant`);
        }

        // Affichage des résultats
        document.getElementById('team-strengths').innerHTML =
            strengths.length > 0 ? `<ul>${strengths.map(s => `<li>${s}</li>`).join('')}</ul>` : '<p>✨ Équipe avec des forces à révéler selon son développement.</p>';

        document.getElementById('team-weaknesses').innerHTML =
            weaknesses.length > 0 ? `<ul>${weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>` : '<p>✅ Aucune faiblesse majeure identifiée dans cette configuration.</p>';

        document.getElementById('team-recommendations-content').innerHTML =
            recommendations.length > 0 ? `<ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul>` : '<p>🎉 L\'équipe présente un excellent équilibre ! Continuez à développer les synergies.</p>';
    }

    updateNavigation() {
        const results = localStorage.getItem('discResults');
        const profileLink = document.querySelector('[href="#profile"]');
        const teamLink = document.querySelector('[href="#team"]');

        if (!results) {
            profileLink.style.opacity = '0.5';
            teamLink.style.opacity = '0.5';
        } else {
            profileLink.style.opacity = '1';
            teamLink.style.opacity = '1';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DISCAnalyzer();
});