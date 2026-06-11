    // Sintetizador Nativo Web Audio API para no depender de llamadas externas
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let isMuted = false;

    function playSound(type) {
        if (isMuted) return;
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            gainNode.gain.setValueAtTime(0.08, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // Nota C5
            osc.frequency.setValueAtTime(659.25, now + 0.1); // Nota E5
            osc.frequency.setValueAtTime(783.99, now + 0.2); // Nota G5
            gainNode.gain.setValueAtTime(0.12, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (type === 'warning') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now); 
            osc.frequency.linearRampToValueAtTime(170, now + 0.2);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.35);
            gainNode.gain.setValueAtTime(0.12, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        const icon = document.getElementById("audio-icon");
        if (isMuted) {
            icon.className = "fa-solid fa-volume-xmark";
        } else {
            icon.className = "fa-solid fa-volume-high";
            playSound('click');
        }
    }

    // Banco de Datos Completo con Imágenes Referenciales Reales para cada Caso
    const cases = [
        {
            id: 1,
            grade: "6° Grado - Privacidad en Redes",
            title: "El 'Meme' Humillante de WhatsApp",
            desc: "Mateo acude asustado a ti. Le tomaron una foto en el patio cuando sufrió una caída accidental con su bandeja de comida. La imagen fue editada con textos humillantes y viralizada en el grupo masivo del salón. Mateo se niega rotundamente a entrar a clase por miedo a las burlas.",
            icon: "fa-solid fa-comment-nodes",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
            options: [
                {
                    id: "A",
                    text: "Acción Punitiva Directa: Entrar al aula, confiscar los smartphones de todos los alumnos bajo sospecha y exigir coordinación para una suspensión general.",
                    stars: 1,
                    type: "error",
                    title: "⚠️ Enfoque Reactivo / Rompe Canales",
                    feedback: "Decomisar dispositivos mediante la fuerza infunde miedo y muda el acoso hacia grupos privados fuera de tu alcance, incrementando el aislamiento social de la víctima."
                },
                {
                    id: "B",
                    text: "Acción Formativa Líder: Intervenir el grupo con apoyo docente mediante una sesión relámpago dictada por ti sobre empatía digital. Pactar el borrado seguro con los administradores y respaldar emocionalmente a Mateo.",
                    stars: 3,
                    type: "success",
                    title: "✨ ¡Liderazgo de Mediación Ejemplar!",
                    feedback: "¡Excelente! Utilizas tu estatus de estudiante mayor como influencia positiva para cambiar la conducta del grupo. Desactivas la distribución atacando la raíz: la falta de sensibilidad en línea."
                },
                {
                    id: "C",
                    text: "Acción Pasiva / Evasiva: Aconsejar a Mateo que ignore la situación, argumentando que son simples chistes digitales cotidianos y sugerirle salirse del grupo.",
                    stars: 0,
                    type: "warning",
                    title: "❌ Minimización del Daño",
                    feedback: "Restar importancia al ciberacoso valida la agresión de manera implícita. Salirse del grupo virtual no elimina la humillación presencial que sufrirá en los pasillos."
                }
            ]
        },
        {
            id: 2,
            grade: "7° Grado - Convivencia Gamer",
            title: "La Exclusión Sistemática de Valentina",
            desc: "Valentina solía jugar en línea los fines de semana con sus amigas. Tras cometer un error crítico que provocó la derrota de su equipo, las demás crearon un nuevo clan privado, la banearon de las salas y le envían chats despectivos tildándola de 'inútil y estorbo'.",
            icon: "fa-solid fa-gamepad",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
            options: [
                {
                    id: "A",
                    text: "Estrategia de Contraataque: Organizar un equipo con tus compañeros de grados superiores, ingresar a sus salas de juego y humillarlas competitivamente para darles una lección.",
                    stars: 1,
                    type: "error",
                    title: "⚠️ Venganza / Fuego contra Fuego",
                    feedback: "Responder a la toxicidad con más hostilidad degrada tu autoridad ética como mediador escolar y normaliza la violencia competitiva como vía de resolución."
                },
                {
                    id: "B",
                    text: "Estrategia de Círculo Restaurativo: Citar a las compañeras involucradas a un espacio seguro. Hacerlas reflexionar sobre cómo la agresión en videojuegos destruye la convivencia física y estructurar un 'Pacto de Juego Limpio'.",
                    stars: 3,
                    type: "success",
                    title: "✨ ¡Criterio de Reparación Integral!",
                    feedback: "¡Formidable! Visibilizas que la violencia en el entorno gaming tiene repercusiones reales en la salud emocional, impulsando acuerdos voluntarios y de respeto mutuo."
                },
                {
                    id: "C",
                    text: "Estrategia de Desvío: Indicarle a Valentina que busque grupos de juego en internet formados por desconocidos y que no mezcle el colegio con pasatiempos.",
                    stars: 0,
                    type: "warning",
                    title: "❌ Evasión Sistémica",
                    feedback: "Exponer a una menor a comunidades de internet desconocidas sin supervisión introduce riesgos de seguridad peores, evadiendo el quiebre de convivencia que subsiste en el salón."
                }
            ]
        },
        {
            id: 3,
            grade: "6° Grado - Ciberseguridad Técnica",
            title: "Suplantación por Olvido de Sesión",
            desc: "Camilo olvidó cerrar su perfil personal en una de las tablets de la sala de cómputo del colegio. Otro alumno accedió, alteró sus fotos por imágenes denigrantes y redactó publicaciones falsas insultando abiertamente al cuerpo docente de la institución.",
            icon: "fa-solid fa-user-ninja",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
            options: [
                {
                    id: "A",
                    text: "Acción Correctiva Educativa: Ayudar a Camilo a restablecer contraseñas y cerrar sesiones de manera remota. Diseñar de inmediato un panel de consejería rápida sobre la importancia de la huella digital y seguridad de datos en dispositivos compartidos.",
                    stars: 3,
                    type: "success",
                    title: "✨ ¡Solución Técnica e Integradora!",
                    feedback: "¡Brillante! Solucionas la vulnerabilidad informática de forma inmediata y transformas un incidente crítico en una lección colectiva sobre leyes de protección de datos y ciberseguridad."
                },
                {
                    id: "B",
                    text: "Acción Investigativa Rigurosa: Postergar el arreglo de la cuenta para usarla como evidencia. Dedicar las jornadas de descanso a interrogar alumnos hasta hallar al infractor para forzar una disculpa pública grupal.",
                    stars: 1,
                    type: "error",
                    title: "⚠️ Exposición Prolongada del Riesgo",
                    feedback: "Dejar la cuenta abierta prolonga el daño reputacional de Camilo en tiempo real. Además, la humillación pública forzada detona escaladas de violencia interna en el plantel."
                }
            ]
        },
        {
            id: 4,
            grade: "8° Grado - Desinformación / Fake News",
            title: "El Rumor Viral en TikTok",
            desc: "Un video editado circula velozmente en TikTok sugiriendo con pruebas falsas que Sofía saboteó los proyectos científicos de sus compañeros para ganar un concurso escolar. El aula entera ha comenzado a enviarle amenazas y comentarios de odio digital en sus fotos.",
            icon: "fa-solid fa-video-slash",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
            options: [
                {
                    id: "A",
                    text: "Mitigación y Verificación Crítica: Reportar colectivamente el video en la plataforma de origen para su eliminación. Organizar un debate en clase sobre desinformación ('Fake News') demostrando la falsedad del material y restaurando públicamente el buen nombre de Sofía.",
                    stars: 3,
                    type: "success",
                    title: "✨ ¡Defensa Crítica de la Verdad!",
                    feedback: "¡Espectacular! Enseñas al grupo a consumir contenido digital con mentalidad crítica y analítica, deteniendo los linchamientos virtuales causados por rumores no verificados."
                },
                {
                    id: "B",
                    text: "Crear un Contra-Video: Diseñar otro video exponiendo de manera agresiva a los presuntos creadores del rumor original para que el colegio dirija los ataques virtuales hacia ellos.",
                    stars: 1,
                    type: "error",
                    title: "⚠️ Alimentación del Bucle Digital",
                    feedback: "Combatir la difamación con difamación multiplica la toxicidad escolar. Como mediador ético, tu deber es enfriar el conflicto y esclarecer la verdad, no alimentar el ciberacoso masivo."
                }
            ]
        },
        {
            id: 5,
            grade: "5° Grado - Ingeniería Social / Alerta de Riesgo",
            title: "El Engaño de las Monedas Virtuales",
            desc: "Descubres que un estudiante de primaria de grado 5° está en contacto por Discord con un perfil desconocido que dice ser alumno de otra institución. Este perfil le promete regalarle 'monedas de juego gratis' a cambio de fotos de su carné escolar y el teléfono de sus padres.",
            icon: "fa-solid fa-triangle-exclamation",
            image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=1000&q=80",
            options: [
                {
                    id: "A",
                    text: "Intervención de Red de Protección: Frenar la entrega de datos de manera inmediata. Explicar cariñosamente al menor los peligros de la ingeniería social y canalizar el caso con orientación y padres de familia por tratarse de un riesgo de seguridad externa.",
                    stars: 3,
                    type: "success",
                    title: "✨ ¡Activación Protectora Impecable!",
                    feedback: "¡Fantástico! Identificaste un peligro mayor de ciberseguridad. Al activar la red familiar e institucional sin generar pánico, resguardas la integridad física y digital del estudiante menor de forma óptima."
                },
                {
                    id: "B",
                    text: "Manejo Encubierto: Hacerte pasar por el niño en el chat de Discord para confrontar y amenazar al desconocido, exigiéndole que deje de molestar a los alumnos de tu escuela.",
                    stars: 1,
                    type: "error",
                    title: "⚠️ Exposición Imprudente al Peligro",
                    feedback: "Confrontar directamente a perfiles potencialmente maliciosos o criminales te expone a ti y a la escuela de forma peligrosa. Estos casos de seguridad extrema requieren la ruta oficial de adultos calificados."
                }
            ]
        }
    ];

    let currentCaseIndex = 0;
    let totalStars = 0;
    let selectedOption = null;
    let isShowingFeedback = false;

    function startGame() {
        playSound('click');
        const intro = document.getElementById("screen-intro");
        intro.className = "screen animate__animated animate__fadeOutDown";
        
        setTimeout(() => {
            intro.classList.remove("active");
            const gameScreen = document.getElementById("screen-game");
            gameScreen.classList.add("active");
            gameScreen.className = "screen active animate__animated animate__fadeInUp";
            currentCaseIndex = 0;
            totalStars = 0;
            loadCase();
        }, 400);
    }

    function loadCase() {
        const currentCase = cases[currentCaseIndex];
        selectedOption = null;
        isShowingFeedback = false;

        document.getElementById("case-counter").innerText = `Caso: ${currentCaseIndex + 1} / ${cases.length}`;
        document.getElementById("score-counter").innerText = `Estrellas: ${totalStars}`;
        document.getElementById("case-grade").innerText = currentCase.grade;
        document.getElementById("case-title").innerText = currentCase.title;
        document.getElementById("case-desc").innerText = currentCase.desc;
        document.getElementById("case-image").src = currentCase.image;
        document.getElementById("case-category-icon").className = `case-icon ${currentCase.icon}`;
        
        const boxWrapper = document.getElementById("case-box-wrapper");
        boxWrapper.className = "case-box animate__animated animate__pulse";
        setTimeout(() => boxWrapper.className = "case-box", 600);

        const feedbackBox = document.getElementById("feedback-container");
        feedbackBox.style.display = "none";
        feedbackBox.className = "feedback-box";

        const nextBtn = document.getElementById("next-btn");
        nextBtn.innerHTML = `<i class="fa-solid fa-signature"></i> Evaluar Alternativa de Solución`;
        nextBtn.disabled = true;

        const container = document.getElementById("options-container");
        container.innerHTML = "";
        
        currentCase.options.forEach(opt => {
            const li = document.createElement("li");
            li.className = "option-card animate__animated animate__fadeInLeft";
            
            const marker = document.createElement("div");
            marker.className = "option-marker";
            marker.innerText = opt.id;
            
            const textSpan = document.createElement("span");
            textSpan.className = "option-text";
            textSpan.innerText = opt.text;
            
            li.appendChild(marker);
            li.appendChild(textSpan);
            
            li.onclick = () => selectOptionHandler(li, opt);
            container.appendChild(li);
        });
    }

    function selectOptionHandler(element, option) {
        if (isShowingFeedback) return;
        playSound('click');

        document.querySelectorAll(".option-card").forEach(el => el.classList.remove("selected"));
        element.classList.add("selected");
        selectedOption = option;
        document.getElementById("next-btn").disabled = false;
    }

    function handleNextStep() {
        const nextBtn = document.getElementById("next-btn");

        if (!isShowingFeedback) {
            isShowingFeedback = true;
            totalStars += selectedOption.stars;
            document.getElementById("score-counter").innerText = `Estrellas: ${totalStars}`;

            playSound(selectedOption.type);

            const feedbackBox = document.getElementById("feedback-container");
            feedbackBox.className = `feedback-box ${selectedOption.type} animate__animated animate__headShake`;
            
            const iconEl = document.getElementById("fb-icon-type");
            if (selectedOption.type === 'success') iconEl.className = "feedback-icon fa-solid fa-circle-check";
            else if (selectedOption.type === 'warning') iconEl.className = "feedback-icon fa-solid fa-triangle-exclamation";
            else iconEl.className = "feedback-icon fa-solid fa-circle-xmark";

            document.getElementById("feedback-title").innerText = selectedOption.title + ` (+${selectedOption.stars} ⭐)`;
            document.getElementById("feedback-text").innerText = selectedOption.feedback;

            document.querySelectorAll(".option-card").forEach(el => {
                if(!el.classList.contains("selected")) el.style.opacity = "0.5";
            });

            if (currentCaseIndex < cases.length - 1) {
                nextBtn.innerHTML = `Siguiente Caso Misión <i class="fa-solid fa-arrow-right"></i>`;
            } else {
                nextBtn.innerHTML = `Ver Resultados Finales <i class="fa-solid fa-square-poll-vertical"></i>`;
            }
        } else {
            playSound('click');
            if (currentCaseIndex < cases.length - 1) {
                currentCaseIndex++;
                loadCase();
            } else {
                showResults();
            }
        }
    }

    function showResults() {
        playSound('success');
        document.getElementById("screen-game").classList.remove("active");
        
        const resultsScreen = document.getElementById("screen-results");
        resultsScreen.classList.add("active");

        const finalScore = document.getElementById("final-score");
        const finalStars = document.getElementById("final-stars");
        const finalFeedback = document.getElementById("final-feedback");

        const maxStars = cases.length * 3;
        finalScore.innerText = `${totalStars} / ${maxStars} ⭐`;

        if (totalStars >= 13) {
            finalStars.innerText = "⭐⭐⭐⭐⭐";
            finalFeedback.innerHTML = "<strong>🏆 ¡Mediador Digital de Élite!</strong> Has cumplido plenamente el objetivo del programa. Tus decisiones priorizan la contención pedagógica, la seguridad técnica, la privacidad y la reparación del daño sin apelar al miedo o el castigo improductivo. Demuestras una excelente comprensión de la ciudadanía digital activa.";
        } else if (totalStars >= 8) {
            finalStars.innerText = "⭐⭐⭐";
            finalFeedback.innerHTML = "<strong>Orientador Escolar en Formación.</strong> Posees principios correctos para resguardar el bienestar del menor, pero ocasionalmente tomaste soluciones que segregan o evaden el conflicto. Te sugerimos profundizar en técnicas de diálogo restaurativo directo.";
        } else {
            finalStars.innerText = "⭐";
            finalFeedback.innerHTML = "<strong>Requiere Mayor Formación.</strong> Tus elecciones mostraron una inclinación a buscar culpables, humillar públicamente o restar valor a incidentes de ciberacoso. Recuerda que la mediación tiene un sentido educativo; el mediador busca sanar el entorno escolar guiando con el ejemplo ético.";
        }
    }

    function resetGame() {
        playSound('click');
        document.getElementById("screen-results").classList.remove("active");
        const intro = document.getElementById("screen-intro");
        intro.className = "screen active animate__animated animate__fadeInDown";
    }