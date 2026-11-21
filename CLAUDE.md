SplitMate
Aplicación web para gestionar y dividir gastos grupales (viajes, pisos compartidos, salidas). Varias personas crean un grupo, registran lo que paga cada una y la app calcula quién debe a quién.

Es un proyecto real para el portfolio del usuario, que lo construye desde cero para aprender. Tiene que poder defenderlo en una entrevista de trabajo y entender cada parte del código.

Reglas de trabajo (OBLIGATORIAS)
El usuario es principiante (HTML, CSS y JavaScript básicos). Habla en español, con palabras sencillas.

Explica cada concepto de forma sencilla, sin tecnicismos innecesarios ni explicaciones largas.
No avances demasiado rápido: una tarea cada vez.
Antes de pasar al siguiente paso, espera a que confirme que el anterior funciona.
Enseña, no programes por él: dale el código para que lo escriba él. No edites sus archivos salvo que lo pida.
No le des archivos enteros reescritos si solo hay que cambiar unas líneas.
Dile exactamente en qué archivo y en qué lugar va cada trozo de código.
Explica qué hace el código y por qué lo usamos.
No cambies nombres de variables, clases o estructuras sin necesidad.
Si hay errores, pide una captura del código o del error antes de suponer qué pasa.
No añadas funcionalidades que todavía no hacen falta.
Ayúdale a tomar buenas decisiones técnicas, con ventajas y desventajas de cada opción.
Antes de cada paso, revisa el código real de los archivos: no des por hecho que un cambio ya está hecho.

Identidad visual
Moderna, minimalista y tecnológica, interfaz oscura con tonos azules. Limpia, intuitiva y responsive.

Uso Color
Fondo principal #080D18
Fondo de tarjetas #111C2E
Color principal #45B8E8
Color secundario #A5DDF5
Texto principal #E8F0FA
Texto secundario #8FA3BA
Bordes #23334A
Tecnologías
Versión 1 (MVP): HTML5, CSS3, JavaScript vanilla y LocalStorage.
Git y GitHub para control de versiones (todavía no está iniciado).
Versión 2: Node.js + Express, API REST y base de datos. React solo si de verdad aporta algo.
Estructura objetivo (llegar a ella poco a poco, cuando tenga sentido)
splitmate/
├── index.html
├── css/styles.css
├── src/
│ ├── core/ money.js, balances.js, settle.js, splits.js (lógica pura, sin DOM ni storage)
│ ├── storage/ store.js
│ ├── ui/ render.js, events.js
│ └── main.js
├── tests/core.test.js
└── README.md
Lo que ya sabe usar
querySelector, addEventListener, preventDefault, value, trim, alert, createElement, textContent, classList.add, appendChild, arrays, push, JSON.stringify / JSON.parse, localStorage.setItem / getItem / removeItem, reset, funciones y forEach.

Fases
Gestión de grupos (prioridad actual): que renderGroups() sea la única función que pinta los grupos, mensaje cuando no hay grupos, sin código duplicado, sin nombres vacíos, evitar duplicados, eliminar grupos, abrir un grupo al hacer clic.
Participantes por grupo: añadir, listar, eliminar, sin vacíos ni duplicados, guardar y recuperar.
Gastos: descripción, importe, quién pagó, entre quiénes se divide y fecha. Añadir, listar, editar, eliminar, guardar y recuperar.
División: equitativa (repartir bien los céntimos sobrantes) y personalizada (la suma debe dar el total).
Balances: cuánto pagó cada uno y cuánto le tocaba. Dinero siempre en céntimos (números enteros). Ejemplo: Vittorio paga 90 € para 3 → Vittorio +60 €, Marcos −30 €, Lucas −30 €.
Liquidación: quién paga a quién y cuánto. Primero un algoritmo greedy sencillo; no decir que el greedy garantiza siempre el mínimo de transferencias. Más adelante, optimizar para grupos pequeños.
Persistencia: todo en LocalStorage, organizado por grupo, sin mezclar datos entre grupos.
Diseño y UX: dashboard, vista de grupo, participantes, gastos, balances, liquidación, mensajes de confirmación y error, estados vacíos, responsive, animaciones sutiles, accesibilidad. Primero que sea fácil de usar.
Pruebas y calidad: tests de división (incluidos los céntimos sobrantes), balances y liquidación; separar lógica, almacenamiento, interfaz y eventos en módulos.
Publicación: GitHub, README profesional, capturas, publicar la app y enlazarla en su portfolio.
Segunda etapa: backend para compartir grupos entre dispositivos mediante enlaces (LocalStorage solo guarda en un navegador). Más adelante, quizá con autenticación.

Dónde lo dejamos (actualizar al avanzar)
FASE 1 TERMINADA: crear, evitar duplicados, eliminar (con confirm), grupos como objetos {id, name, participants}, abrir un grupo y volver (misma página, home-view / group-view con hidden). Repositorio: https://github.com/VittoOsella/splitmate (rama main). Ciclo: git add . → git commit -m "..." → git push.

Ahora: FASE 2, participantes dentro de cada grupo.

Limpiezas pendientes (no urgentes): en main.js, quitar el .trim() repetido del if y los dos console.log de prueba; en styles.css, .welcome-card button:hover está repetido.
Decisiones técnicas (para el documento final de entrevista)

- Una sola fuente de verdad: el array groups manda y renderGroups() pinta la pantalla a partir de él.
- Nombres de grupo sin repetir, ignorando mayúsculas (some + toLowerCase).
- Borrar con confirm(), para evitar borrados accidentales.
- Rojo suave (#e86a6a) solo para acciones de borrar, por convención.
- Grupos como objetos con id, en vez de textos, porque cada grupo necesitará participantes y gastos.
- Una sola página (SPA): home-view y group-view se muestran u ocultan con el atributo hidden; más simple que dos páginas HTML.
- stopPropagation() en "Eliminar", porque el botón está dentro de la tarjeta y el clic también abría el grupo.
- Cambios explicados por número de línea y de abajo hacia arriba, para que los números no se muevan.
