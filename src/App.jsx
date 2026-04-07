// ============================================================
// App.jsx — LearnHub : Plateforme + Admin complet
// React 18 · React Router v6 · Tailwind CSS · Lucide React
// ============================================================

import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import {
  GraduationCap, LayoutDashboard, BookOpen, Users, MessageSquare, Globe,
  Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Check, CheckCircle2,
  Search, Menu, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ArrowLeft,
  Play, Clock, Lock, Star, Award, FileText, PlayCircle, Link as LinkIcon,
  BarChart2, DollarSign, TrendingUp, Heart, Send, AlertCircle, Settings,
  Layers, Upload, MoveUp, MoveDown, Filter, CreditCard, ShieldCheck,
  Phone, ImageIcon, LogIn, LogOut, UserPlus, Hourglass
} from 'lucide-react';

// ════════════════════════════════════════════════════════════
// UTILITAIRES
// ════════════════════════════════════════════════════════════
function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  let id = null;
  const s = url.match(/youtu\.be\/([^?&/]+)/);   if (s) id = s[1];
  const w = url.match(/[?&]v=([^&]+)/);           if (w) id = w[1];
  const e = url.match(/embed\/([^?&/]+)/);        if (e) id = e[1];
  const sh = url.match(/shorts\/([^?&/]+)/);      if (sh) id = sh[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

const genId = () => Math.random().toString(36).slice(2, 11);
const getInitials = (name = '') => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const fmtPrice = n => n?.toLocaleString('fr-FR') + ' FCFA';

// ════════════════════════════════════════════════════════════
// DONNÉES MOCK
// ════════════════════════════════════════════════════════════
const MOCK_STUDENTS = [
  { id: 's1', name: 'Fatima Abakar',  avatar: 'FA', email: 'fatima@example.com',  joinDate: '2026-01-15', courseIds: ['js-debutant', 'react-avance'] },
  { id: 's2', name: 'Youssouf Koro',  avatar: 'YK', email: 'youssouf@example.com', joinDate: '2026-01-22', courseIds: ['js-debutant'] },
  { id: 's3', name: 'Amina Brahim',   avatar: 'AB', email: 'amina@example.com',    joinDate: '2026-02-01', courseIds: ['js-debutant', 'python-data'] },
  { id: 's4', name: 'Mahamat Ali',    avatar: 'MA', email: 'mahamat@example.com',  joinDate: '2026-02-10', courseIds: ['react-avance'] },
  { id: 's5', name: 'Zara Moussa',    avatar: 'ZM', email: 'zara@example.com',     joinDate: '2026-02-18', courseIds: ['python-data', 'js-debutant', 'react-avance'] },
  { id: 's6', name: 'Hassan Idriss',  avatar: 'HI', email: 'hassan@example.com',   joinDate: '2026-03-05', courseIds: ['python-data'] },
  { id: 's7', name: 'Nadia Oumar',    avatar: 'NO', email: 'nadia@example.com',    joinDate: '2026-03-12', courseIds: ['js-debutant', 'react-avance', 'python-data'] },
  { id: 's8', name: 'Ibrahim Koko',   avatar: 'IK', email: 'ibrahim.k@example.com',joinDate: '2026-03-20', courseIds: ['js-debutant'] },
];

const INITIAL_COURSES = [
  {
    id: 'js-debutant', published: true, createdAt: '2026-01-10',
    title: 'JavaScript pour les débutants absolus',
    description: 'Apprenez JavaScript de zéro avec des exemples concrets. Variables, fonctions, DOM et événements. Idéal si vous n\'avez jamais programmé.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    category: 'Développement Web', level: 'Débutant', duration: '6h 45min',
    instructor: { name: 'Ibrahim Mahamat', avatar: 'IM', bio: 'Développeur Full-Stack · 8 ans d\'expérience · Formateur certifié' },
    isFree: true, price: 0, rating: 4.8, studentsCount: 3241,
    lessons: [
      {
        id: 'js-l1', order: 1, title: 'Variables, types et opérateurs', duration: '22min',
        videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        content: `## Variables et Types de données\n\nJavaScript est un langage dynamiquement typé. Trois façons de déclarer une variable :\n\n\`\`\`js\nconst nom = "Alice";   // immuable\nlet age = 25;           // modifiable\nvar ancien = true;      // éviter (portée fonction)\n\`\`\`\n\n**Les types primitifs :**\n- \`string\` — chaînes : \`"bonjour"\`\n- \`number\` — \`42\`, \`3.14\`\n- \`boolean\` — \`true\` / \`false\`\n- \`null\` et \`undefined\` — absence de valeur\n\n**Comparaisons — toujours utiliser l'égalité stricte :**\n\`\`\`js\n5 == "5"    // true  (laxe, éviter)\n5 === "5"   // false (stricte, privilégier)\n\`\`\``,
        pdfs: [{ name: 'Cheat Sheet — Variables JS', url: '#' }, { name: 'Exercices — Leçon 1', url: '#' }],
        comments: [
          { id: 'c1', author: 'Fatima Abakar', avatar: 'FA', date: '2026-03-01', text: 'Enfin une explication claire de == vs === !', likes: 14,
            replies: [{ id: 'c1r1', author: 'Ibrahim Mahamat', avatar: 'IM', date: '2026-03-02', text: 'Merci Fatima ! N\'hésite pas si tu as des questions.', likes: 5, replies: [] }] },
          { id: 'c2', author: 'Youssouf Koro', avatar: 'YK', date: '2026-03-10', text: 'Super structuré. La vidéo + texte c\'est le combo parfait.', likes: 8, replies: [] },
        ],
      },
      {
        id: 'js-l2', order: 2, title: 'Fonctions — déclaration, portée, arrow functions', duration: '28min',
        videoUrl: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ',
        content: `## Fonctions en JavaScript\n\n**Déclaration classique :**\n\`\`\`js\nfunction additionner(a, b) {\n  return a + b;\n}\n\`\`\`\n\n**Arrow function :**\n\`\`\`js\nconst diviser = (a, b) => a / b;\n\`\`\`\n\n**Portée (scope) :**\n\`\`\`js\nlet compteur = 0;\nfunction incrementer() {\n  let local = 1; // n'existe que dans cette fonction\n  compteur += local;\n}\n\`\`\``,
        pdfs: [{ name: 'Guide complet — Fonctions JS', url: '#' }],
        comments: [{ id: 'c3', author: 'Hassan Idriss', avatar: 'HI', date: '2026-03-20', text: 'La notion de hoisting enfin claire !', likes: 6, replies: [] }],
      },
      {
        id: 'js-l3', order: 3, title: 'DOM et gestion des événements', duration: '30min',
        videoUrl: 'https://youtu.be/y17RuWkWdn8',
        content: `## Manipulation du DOM\n\n**Sélectionner :**\n\`\`\`js\nconst titre = document.getElementById('titre');\nconst btns  = document.querySelectorAll('.btn');\n\`\`\`\n\n**Modifier :**\n\`\`\`js\ntitre.textContent = "Nouveau titre";\ntitre.classList.add("actif");\n\`\`\`\n\n**Écouter des événements :**\n\`\`\`js\nbtn.addEventListener('click', (e) => {\n  e.preventDefault();\n  console.log('Cliqué !');\n});\n\`\`\``,
        pdfs: [{ name: 'Référence DOM — MDN (résumé)', url: '#' }, { name: 'Projet pratique — Todo List', url: '#' }],
        comments: [],
      },
    ],
  },
  {
    id: 'react-avance', published: true, createdAt: '2026-01-28',
    title: 'React Avancé — Hooks, Performance & Patterns',
    description: 'Maîtrisez useCallback, useMemo, useReducer, Context API et les patterns pros (HOC, Compound Components, Render Props). Pour développeurs React intermédiaires.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'Développement Web', level: 'Avancé', duration: '14h 20min',
    instructor: { name: 'Aïcha Oumar', avatar: 'AO', bio: 'Senior React Developer · 6 ans d\'XP · Ancienne ingénieure chez une licorne tech' },
    isFree: false, price: 4990, rating: 4.9, studentsCount: 1087,
    lessons: [
      {
        id: 'react-l1', order: 1, title: 'useCallback & useMemo — mémoïsation en profondeur', duration: '35min',
        videoUrl: 'https://www.youtube.com/watch?v=_AyFP5s69N4',
        content: `## Optimisation avec useCallback et useMemo\n\n**useCallback** — mémoïse une fonction :\n\`\`\`jsx\nconst handleSubmit = useCallback((values) => {\n  api.submitForm(values);\n}, [api]);\n\`\`\`\n\n**useMemo** — mémoïse un calcul :\n\`\`\`jsx\nconst filtered = useMemo(() => {\n  return items.filter(i => i.active && i.price < budget);\n}, [items, budget]);\n\`\`\`\n\n> ⚠️ Ne pas mémoïser par défaut — le coût mémoire peut dépasser le gain.`,
        pdfs: [{ name: 'Slides — Optimisation React', url: '#' }, { name: 'Exercices — Profiling DevTools', url: '#' }],
        comments: [
          { id: 'c4', author: 'Mahamat Ali', avatar: 'MA', date: '2026-02-10', text: 'Enfin la distinction claire sur les coûts mémoire de useMemo !', likes: 23,
            replies: [{ id: 'c4r1', author: 'Aïcha Oumar', avatar: 'AO', date: '2026-02-11', text: 'C\'est l\'erreur la plus fréquente en code review. Content que ce soit clair !', likes: 11, replies: [] }] },
        ],
      },
      {
        id: 'react-l2', order: 2, title: 'Context API & useReducer — état global', duration: '40min',
        videoUrl: 'https://www.youtube.com/watch?v=5LrDIWkK_Bc',
        content: `## Context API + useReducer\n\n\`\`\`jsx\nconst CartContext = createContext(null);\n\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case 'ADD': return { ...state, items: [...state.items, action.payload] };\n    case 'CLEAR': return { items: [], total: 0 };\n    default: throw new Error('Action inconnue');\n  }\n}\n\nexport function CartProvider({ children }) {\n  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });\n  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;\n}\n\`\`\``,
        pdfs: [{ name: 'Schéma — Architecture Context + Reducer', url: '#' }],
        comments: [],
      },
      {
        id: 'react-l3', order: 3, title: 'Patterns avancés — HOC, Compound, Render Props', duration: '45min',
        videoUrl: 'https://www.youtube.com/watch?v=BcVAq3YFiuc',
        content: `## HOC — Higher-Order Component\n\n\`\`\`jsx\nfunction withAuth(WrappedComponent) {\n  return function AuthGuard(props) {\n    const { user } = useAuth();\n    if (!user) return <Navigate to="/login" />;\n    return <WrappedComponent {...props} currentUser={user} />;\n  };\n}\n\`\`\`\n\n## Compound Components\n\n\`\`\`jsx\n<Tabs defaultTab="profile">\n  <Tabs.Tab id="profile">Profil</Tabs.Tab>\n  <Tabs.Panel id="profile"><ProfileForm /></Tabs.Panel>\n</Tabs>\n\`\`\``,
        pdfs: [{ name: 'Slides — Patterns React Pro', url: '#' }, { name: 'Exercices — Tabs Compound', url: '#' }],
        comments: [],
      },
    ],
  },
  {
    id: 'python-data', published: true, createdAt: '2026-02-05',
    title: 'Python pour la Data Science — de zéro à l\'analyse',
    description: 'De l\'installation à la visualisation : Pandas, NumPy, Matplotlib. Cours pratique sur des datasets réels. Interface en français, projets inclus.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    category: 'Data Science', level: 'Intermédiaire', duration: '18h 00min',
    instructor: { name: 'Dr. Hassan Idriss', avatar: 'HI', bio: 'Data Scientist · PhD en IA · 200+ articles sur Medium' },
    isFree: false, price: 7990, rating: 4.7, studentsCount: 4512,
    lessons: [
      {
        id: 'py-l1', order: 1, title: 'Environnement Python & Jupyter Notebook', duration: '20min',
        videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
        content: `## Installation avec Anaconda\n\n\`\`\`bash\nconda create -n datasci python=3.11\nconda activate datasci\nconda install pandas numpy matplotlib seaborn jupyter\n\`\`\`\n\n**Lancer Jupyter :**\n\`\`\`bash\njupyter lab\n\`\`\`\n\n> 💡 Raccourci : **Shift+Enter** pour exécuter une cellule.`,
        pdfs: [{ name: 'Guide Installation Anaconda', url: '#' }, { name: 'Raccourcis Jupyter Notebook', url: '#' }],
        comments: [
          { id: 'c5', author: 'Zara Moussa', avatar: 'ZM', date: '2026-01-18', text: 'Parfait pour débuter ! Guide PDF très utile.', likes: 10, replies: [] },
          { id: 'c6', author: 'Ali Oumar', avatar: 'AO', date: '2026-01-25', text: 'VS Code peut remplacer Jupyter ?', likes: 3,
            replies: [{ id: 'c6r1', author: 'Dr. Hassan Idriss', avatar: 'HI', date: '2026-01-25', text: 'Oui ! Installez l\'extension Jupyter de Microsoft dans VS Code.', likes: 8, replies: [] }] },
        ],
      },
      {
        id: 'py-l2', order: 2, title: 'Pandas — DataFrames, nettoyage et analyse', duration: '50min',
        videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        content: `## Pandas — Explorer des données\n\n\`\`\`python\nimport pandas as pd\n\ndf = pd.read_csv('ventes.csv', parse_dates=['date'])\nprint(df.shape)          # (lignes, colonnes)\nprint(df.describe())     # statistiques\nprint(df.isnull().sum()) # valeurs manquantes\n\`\`\`\n\n**Grouper et agréger :**\n\`\`\`python\ndf.groupby('categorie').agg(\n    total=('montant', 'sum'),\n    nb=('id', 'count'),\n).reset_index()\n\`\`\``,
        pdfs: [{ name: 'Cheat Sheet Pandas (A4)', url: '#' }, { name: 'Dataset — Ventes Tchad 2025', url: '#' }],
        comments: [],
      },
      {
        id: 'py-l3', order: 3, title: 'Visualisation avec Matplotlib & Seaborn', duration: '42min',
        videoUrl: 'https://www.youtube.com/watch?v=a9UrKTVEeZA',
        content: `## Matplotlib — graphiques de base\n\n\`\`\`python\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\naxes[0].plot(df['date'], df['ventes'], color='#6366f1', linewidth=2)\naxes[0].set_title('Évolution des ventes')\n\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\nplt.show()\n\`\`\``,
        pdfs: [{ name: 'Gallery Matplotlib — exemples', url: '#' }, { name: 'Projet final — Dashboard Ventes', url: '#' }],
        comments: [],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// CONTEXTE GLOBAL
// ════════════════════════════════════════════════════════════
const AppContext = createContext(null);

const ADMIN_USER = { id: 'admin', name: 'Administrateur', email: 'admin@learnhub.com', password: 'admin123', isAdmin: true };

function AppProvider({ children }) {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [toast, setToast] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_done') || '{}'); } catch { return {}; }
  });
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_enrolled') || '["js-debutant"]'); } catch { return ['js-debutant']; }
  });
  const [likedComments, setLikedComments] = useState({});
  const [commentsMap, setCommentsMap] = useState(() => {
    const m = {};
    INITIAL_COURSES.forEach(c => c.lessons.forEach(l => { m[l.id] = l.comments || []; }));
    return m;
  });

  // ── Auth ─────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_session') || 'null'); } catch { return null; }
  });
  const [users, setUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_users') || JSON.stringify([ADMIN_USER])); } catch { return [ADMIN_USER]; }
  });

  // ── Paiements ─────────────────────────────────────────────
  const [paymentRequests, setPaymentRequests] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_payments') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('lh_done', JSON.stringify(completedLessons)); }, [completedLessons]);
  useEffect(() => { localStorage.setItem('lh_enrolled', JSON.stringify(enrolledCourses)); }, [enrolledCourses]);
  useEffect(() => { localStorage.setItem('lh_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('lh_payments', JSON.stringify(paymentRequests)); }, [paymentRequests]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('lh_session', JSON.stringify(currentUser));
    else localStorage.removeItem('lh_session');
  }, [currentUser]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Auth ─────────────────────────────────────────────────
  const register = useCallback((name, email, password) => {
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return { error: 'Cet email est déjà utilisé.' };
    const newUser = { id: genId(), name, email, password, isAdmin: false, joinDate: new Date().toISOString().split('T')[0] };
    setUsers(p => [...p, newUser]);
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, isAdmin: false };
    setCurrentUser(session);
    return { user: session };
  }, [users]);

  const login = useCallback((email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { error: 'Email ou mot de passe incorrect.' };
    const session = { id: found.id, name: found.name, email: found.email, isAdmin: found.isAdmin };
    setCurrentUser(session);
    return { user: session };
  }, [users]);

  const logout = useCallback(() => setCurrentUser(null), []);

  // ── Paiements ─────────────────────────────────────────────
  const submitPayment = useCallback((courseId, courseName, coursePrice, userName, screenshot) => {
    const req = { id: genId(), userId: currentUser?.id, courseId, courseName, coursePrice, userName, screenshot, status: 'pending', createdAt: new Date().toISOString().split('T')[0] };
    setPaymentRequests(p => [...p, req]);
    showToast('Demande envoyée ! En attente de confirmation.');
  }, [currentUser, showToast]);

  const approvePayment = useCallback((id) => {
    setPaymentRequests(p => p.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    showToast('Paiement approuvé — accès accordé !');
  }, [showToast]);

  const rejectPayment = useCallback((id) => {
    setPaymentRequests(p => p.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    showToast('Paiement refusé.', 'info');
  }, [showToast]);

  const getPaymentStatus = useCallback((courseId) => {
    if (!currentUser) return null;
    const req = paymentRequests.find(r => r.userId === currentUser.id && r.courseId === courseId);
    return req?.status || null;
  }, [currentUser, paymentRequests]);

  // ── Public ────────────────────────────────────────────────
  const isEnrolled = useCallback(id => {
    if (currentUser?.isAdmin) return true;
    if (enrolledCourses.includes(id)) return true;
    if (!currentUser) return false;
    return paymentRequests.some(r => r.userId === currentUser.id && r.courseId === id && r.status === 'approved');
  }, [enrolledCourses, currentUser, paymentRequests]);
  const enrollCourse = useCallback(id => setEnrolledCourses(p => p.includes(id) ? p : [...p, id]), []);
  const toggleLessonComplete = useCallback(id => setCompletedLessons(p => ({ ...p, [id]: !p[id] })), []);
  const toggleLike = useCallback(id => setLikedComments(p => ({ ...p, [id]: !p[id] })), []);
  const getCourseProgress = useCallback((courseId) => {
    const c = courses.find(x => x.id === courseId);
    if (!c || !c.lessons.length) return 0;
    return Math.round((c.lessons.filter(l => completedLessons[l.id]).length / c.lessons.length) * 100);
  }, [courses, completedLessons]);
  const addComment = useCallback((lessonId, text, parentId = null) => {
    const newC = { id: genId(), author: 'Vous', avatar: 'ME', date: new Date().toISOString().split('T')[0], text, likes: 0, replies: [] };
    setCommentsMap(p => {
      const list = [...(p[lessonId] || [])];
      if (parentId) return { ...p, [lessonId]: list.map(c => c.id === parentId ? { ...c, replies: [...(c.replies||[]), newC] } : c) };
      return { ...p, [lessonId]: [newC, ...list] };
    });
  }, []);

  // ── Admin — Cours ─────────────────────────────────────────
  const addCourse = useCallback((data) => {
    const id = genId();
    setCourses(p => [...p, { ...data, id, lessons: [], studentsCount: 0, rating: 0, createdAt: new Date().toISOString().split('T')[0] }]);
    showToast('Cours créé avec succès !');
    return id;
  }, [showToast]);

  const updateCourse = useCallback((id, data) => {
    setCourses(p => p.map(c => c.id === id ? { ...c, ...data } : c));
    showToast('Cours mis à jour !');
  }, [showToast]);

  const deleteCourse = useCallback((id) => {
    setCourses(p => p.filter(c => c.id !== id));
    setEnrolledCourses(p => p.filter(x => x !== id));
    showToast('Cours supprimé.', 'info');
  }, [showToast]);

  const togglePublished = useCallback((id) => {
    setCourses(p => p.map(c => c.id === id ? { ...c, published: !c.published } : c));
  }, []);

  // ── Admin — Leçons ────────────────────────────────────────
  const addLesson = useCallback((courseId, data) => {
    setCourses(p => p.map(c => {
      if (c.id !== courseId) return c;
      const lesson = { ...data, id: genId(), order: c.lessons.length + 1, comments: [] };
      return { ...c, lessons: [...c.lessons, lesson] };
    }));
    showToast('Leçon ajoutée !');
  }, [showToast]);

  const updateLesson = useCallback((courseId, lessonId, data) => {
    setCourses(p => p.map(c => c.id !== courseId ? c : { ...c, lessons: c.lessons.map(l => l.id === lessonId ? { ...l, ...data } : l) }));
    showToast('Leçon mise à jour !');
  }, [showToast]);

  const deleteLesson = useCallback((courseId, lessonId) => {
    setCourses(p => p.map(c => {
      if (c.id !== courseId) return c;
      const lessons = c.lessons.filter(l => l.id !== lessonId).map((l, i) => ({ ...l, order: i + 1 }));
      return { ...c, lessons };
    }));
    setCommentsMap(p => { const n = { ...p }; delete n[lessonId]; return n; });
    showToast('Leçon supprimée.', 'info');
  }, [showToast]);

  const moveLessonUp = useCallback((courseId, lessonId) => {
    setCourses(p => p.map(c => {
      if (c.id !== courseId) return c;
      const idx = c.lessons.findIndex(l => l.id === lessonId);
      if (idx <= 0) return c;
      const ls = [...c.lessons];
      [ls[idx - 1], ls[idx]] = [ls[idx], ls[idx - 1]];
      return { ...c, lessons: ls.map((l, i) => ({ ...l, order: i + 1 })) };
    }));
  }, []);

  const moveLessonDown = useCallback((courseId, lessonId) => {
    setCourses(p => p.map(c => {
      if (c.id !== courseId) return c;
      const idx = c.lessons.findIndex(l => l.id === lessonId);
      if (idx >= c.lessons.length - 1) return c;
      const ls = [...c.lessons];
      [ls[idx], ls[idx + 1]] = [ls[idx + 1], ls[idx]];
      return { ...c, lessons: ls.map((l, i) => ({ ...l, order: i + 1 })) };
    }));
  }, []);

  // ── Admin — Commentaires ──────────────────────────────────
  const deleteStudent = useCallback((userId) => {
    setUsers(p => p.filter(u => u.id !== userId));
    setPaymentRequests(p => p.filter(r => r.userId !== userId));
    showToast('Étudiant supprimé.', 'info');
  }, [showToast]);

  const deleteComment = useCallback((lessonId, commentId, parentId = null) => {
    setCommentsMap(p => {
      const list = p[lessonId] || [];
      if (parentId) return { ...p, [lessonId]: list.map(c => c.id === parentId ? { ...c, replies: c.replies.filter(r => r.id !== commentId) } : c) };
      return { ...p, [lessonId]: list.filter(c => c.id !== commentId) };
    });
    showToast('Commentaire supprimé.', 'info');
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      courses, toast, showToast,
      completedLessons, toggleLessonComplete,
      enrolledCourses, enrollCourse, isEnrolled,
      likedComments, toggleLike,
      commentsMap, addComment, deleteComment,
      getCourseProgress,
      addCourse, updateCourse, deleteCourse, togglePublished,
      addLesson, updateLesson, deleteLesson, moveLessonUp, moveLessonDown,
      currentUser, users, register, login, logout, deleteStudent,
      paymentRequests, submitPayment, approvePayment, rejectPayment, getPaymentStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// ════════════════════════════════════════════════════════════
// COMPOSANTS PARTAGÉS
// ════════════════════════════════════════════════════════════

// ── Toast ─────────────────────────────────────────────────
function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const styles = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-slate-700' };
  const Icon = toast.type === 'success' ? CheckCircle2 : AlertCircle;
  return (
    <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium animate-pulse-once ${styles[toast.type] || styles.success}`}>
      <Icon size={16} />{toast.message}
    </div>
  );
}

// ── Modal de suppression ───────────────────────────────────
function DeleteModal({ label, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 size={24} className="text-red-500" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Confirmer la suppression</h3>
        <p className="text-sm text-slate-500 text-center mb-6">
          Supprimer <strong className="text-slate-700">"{label}"</strong> ? Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">Annuler</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">Supprimer</button>
        </div>
      </div>
    </div>
  );
}

// ── Navbar publique ────────────────────────────────────────
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();
  if (location.pathname.startsWith('/admin')) return null;
  const initials = currentUser ? getInitials(currentUser.name) : null;
  return (
    <nav className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-slate-800 shadow-xl">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 font-bold text-lg hover:text-violet-400 transition-colors">
        <GraduationCap size={24} className="text-violet-400" />
        <span className="hidden sm:inline">LearnHub</span>
      </button>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:flex items-center gap-1.5">
          <BookOpen size={15} /><span>Catalogue</span>
        </button>
        {currentUser?.isAdmin && (
          <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-violet-400 text-sm transition-colors hidden sm:flex items-center gap-1.5">
            <Settings size={15} /><span>Admin</span>
          </button>
        )}
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold">{initials}</div>
            <span className="text-sm text-slate-300 hidden sm:inline truncate max-w-28">{currentUser.name}</span>
            <button onClick={() => { logout(); navigate('/'); }} className="text-slate-400 hover:text-red-400 transition-colors" title="Déconnexion"><LogOut size={16} /></button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/connexion')} className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-700">
              <LogIn size={15} /><span>Connexion</span>
            </button>
            <button onClick={() => navigate('/inscription')} className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <UserPlus size={15} /><span className="hidden sm:inline">S'inscrire</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Badge niveau ───────────────────────────────────────────
function LevelBadge({ level }) {
  const c = { 'Débutant': 'bg-emerald-100 text-emerald-700', 'Intermédiaire': 'bg-amber-100 text-amber-700', 'Avancé': 'bg-red-100 text-red-700' };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c[level] || 'bg-slate-100 text-slate-600'}`}>{level}</span>;
}

// ── Carte stat admin ───────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color }) {
  const colors = { violet: 'bg-violet-50 text-violet-600', emerald: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600', blue: 'bg-blue-50 text-blue-600' };
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500 font-medium">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[color]}`}><Icon size={18} /></div>
      </div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── État vide ──────────────────────────────────────────────
function EmptyState({ icon: Icon, title, sub, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-700 mb-1">{title}</h3>
      {sub && <p className="text-sm text-slate-400 mb-4">{sub}</p>}
      {action && <button onClick={action} className="flex items-center gap-2 bg-violet-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors"><Plus size={15} />{actionLabel}</button>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SITE PUBLIC — Catalogue & Cours
// ════════════════════════════════════════════════════════════

function CourseCard({ course }) {
  const navigate = useNavigate();
  const { isEnrolled, getCourseProgress } = useApp();
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);

  return (
    <div onClick={() => navigate(`/cours/${course.id}`)} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-slate-100 flex flex-col">
      <div className="relative overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isFree
            ? <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">Gratuit</span>
            : <span className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">Pro</span>}
        </div>
        {enrolled && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-600/60 rounded-full h-1.5">
                <div className="bg-violet-400 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-white text-xs font-medium">{progress}%</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{course.category}</span>
          <LevelBadge level={course.level} />
        </div>
        <h3 className="font-semibold text-slate-800 mb-1.5 leading-snug line-clamp-2 flex-1">{course.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">{course.instructor.avatar}</div>
          <span className="text-xs text-slate-500 truncate">{course.instructor.name}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
            <span className="flex items-center gap-1"><Users size={12} />{course.studentsCount.toLocaleString()}</span>
          </div>
          <span className="flex items-center gap-0.5 font-semibold text-amber-500"><Star size={12} />{course.rating}</span>
        </div>
        {!course.isFree && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-800">{fmtPrice(course.price)}</span>
            {enrolled ? <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><Check size={12} />Inscrit</span>
              : <span className="text-xs text-violet-600 font-semibold">Voir →</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterBtn({ v, cur, set, cls }) {
  return (
    <button onClick={() => set(v)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${v === cur ? cls : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{v}</button>
  );
}

function HomePage() {
  const { courses } = useApp();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Tous');
  const [lvl, setLvl] = useState('Tous');
  const [type, setType] = useState('Tous');

  const published = courses.filter(c => c.published);
  const categories = ['Tous', ...new Set(published.map(c => c.category))];

  const filtered = published.filter(c => {
    const q = search.toLowerCase();
    return (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.instructor.name.toLowerCase().includes(q))
      && (cat === 'Tous' || c.category === cat)
      && (lvl === 'Tous' || c.level === lvl)
      && (type === 'Tous' || (type === 'Gratuit' ? c.isFree : !c.isFree));
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">Apprenez, progressez,<br /><span className="text-violet-400">excellez.</span></h1>
          <p className="text-slate-300 mb-8">Des cours de qualité professionnelle, enseignés par des experts.</p>
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Rechercher un cours, instructeur..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-slate-800 bg-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm" />
          </div>
          <div className="flex justify-center gap-8 mt-10">
            <div><p className="font-bold text-2xl text-violet-400">{published.length}</p><p className="text-xs text-slate-400">Cours</p></div>
            <div><p className="font-bold text-2xl text-violet-400">{MOCK_STUDENTS.length}+</p><p className="text-xs text-slate-400">Étudiants</p></div>
            <div><p className="font-bold text-2xl text-violet-400">4.8★</p><p className="text-xs text-slate-400">Note moy.</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-14 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-slate-400" />
          {categories.map(c => <FilterBtn key={c} v={c} cur={cat} set={setCat} cls="bg-violet-600 text-white" />)}
          <div className="ml-auto flex flex-wrap gap-1.5">
            {['Tous','Débutant','Intermédiaire','Avancé'].map(l => <FilterBtn key={l} v={l} cur={lvl} set={setLvl} cls="bg-slate-800 text-white" />)}
            <span className="text-slate-200 mx-1">|</span>
            {['Tous','Gratuit','Payant'].map(t => <FilterBtn key={t} v={t} cur={type} set={setType} cls="bg-orange-500 text-white" />)}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-6">{filtered.length} cours trouvé{filtered.length !== 1 ? 's' : ''}</p>
        {filtered.length === 0
          ? <EmptyState icon={Search} title="Aucun cours trouvé" sub="Essayez d'autres mots-clés ou filtres." action={() => { setSearch(''); setCat('Tous'); setLvl('Tous'); setType('Tous'); }} actionLabel="Réinitialiser" />
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(c => <CourseCard key={c.id} course={c} />)}</div>}
      </div>
    </div>
  );
}

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, isEnrolled, enrollCourse, getCourseProgress, completedLessons, currentUser, getPaymentStatus } = useApp();
  const course = courses.find(c => c.id === courseId);

  if (!course) return <div className="min-h-screen flex items-center justify-center"><EmptyState icon={BookOpen} title="Cours introuvable" action={() => navigate('/')} actionLabel="Retour au catalogue" /></div>;

  const enrolled = isEnrolled(courseId);
  const progress = getCourseProgress(courseId);
  const paymentStatus = getPaymentStatus(courseId);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm mb-5 flex items-center gap-1.5 transition-colors"><ArrowLeft size={14} />Retour</button>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 text-white">
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">{course.category}</span>
                <LevelBadge level={course.level} />
                {course.isFree ? <span className="text-xs bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-full">Gratuit</span>
                  : <span className="text-xs bg-violet-600 text-white font-bold px-2.5 py-1 rounded-full">Pro</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">{course.title}</h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-5">
                <span className="flex items-center gap-1"><Clock size={14} />{course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={14} />{course.lessons.length} leçons</span>
                <span className="flex items-center gap-1"><Users size={14} />{course.studentsCount.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-amber-400"><Star size={14} />{course.rating}/5</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center font-bold text-sm">{course.instructor.avatar}</div>
                <div><p className="font-semibold text-sm">{course.instructor.name}</p><p className="text-xs text-slate-400">{course.instructor.bio}</p></div>
              </div>
            </div>
            <div className="lg:w-72 shrink-0">
              <div className="bg-white text-slate-800 rounded-2xl p-5 shadow-2xl">
                <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-xl mb-4" />
                {enrolled ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Progression</span><span className="font-semibold">{progress}%</span></div>
                      <div className="bg-slate-200 rounded-full h-2"><div className="bg-violet-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
                      <p className="text-xs text-slate-400 mt-1 text-right">{course.lessons.filter(l => completedLessons[l.id]).length} / {course.lessons.length} leçons</p>
                    </div>
                    <button onClick={() => navigate(`/cours/${courseId}/lecon/${course.lessons[0]?.id}`)} className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2">
                      <Play size={15} />{progress > 0 ? 'Continuer' : 'Commencer le cours'}
                    </button>
                  </>
                ) : course.isFree ? (
                  <>
                    <p className="text-center text-emerald-600 font-bold text-lg mb-3">Accès gratuit</p>
                    <button onClick={() => enrollCourse(courseId)} className="w-full bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition-colors text-sm">S'inscrire gratuitement</button>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-center mb-1">{fmtPrice(course.price)}</p>
                    <p className="text-xs text-slate-400 text-center mb-4">Paiement unique · Accès à vie</p>
                    {paymentStatus === 'pending' ? (
                      <div className="w-full bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 flex items-center gap-2 justify-center text-amber-700 text-sm font-semibold">
                        <Hourglass size={16} />En attente de confirmation
                      </div>
                    ) : paymentStatus === 'rejected' ? (
                      <>
                        <div className="w-full bg-red-50 border border-red-200 rounded-xl py-3 px-4 flex items-center gap-2 justify-center text-red-600 text-sm font-semibold mb-2">
                          <X size={16} />Paiement refusé
                        </div>
                        <button onClick={() => navigate(`/paiement/${courseId}`)} className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2">
                          <CreditCard size={15} />Réessayer
                        </button>
                      </>
                    ) : (
                      <button onClick={() => currentUser ? navigate(`/paiement/${courseId}`) : navigate('/connexion', { state: { redirect: `/cours/${courseId}` } })}
                        className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors mb-2 text-sm flex items-center justify-center gap-2">
                        <CreditCard size={15} />Acheter ce cours
                      </button>
                    )}
                    <div className="mt-3 pt-3 border-t text-xs text-slate-400 space-y-1">
                      <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" />Accès à vie</p>
                      <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" />Certificat de complétion</p>
                      <p className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" />Support de l'instructeur</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Layers size={20} />Contenu du cours ({course.lessons.length} leçons · {course.duration})</h2>
        <div className="space-y-2">
          {course.lessons.map((lesson, i) => {
            const locked = !enrolled && !course.isFree && i > 0;
            const done = completedLessons[lesson.id];
            return (
              <button key={lesson.id} disabled={locked}
                onClick={() => !locked && navigate(`/cours/${courseId}/lecon/${lesson.id}`)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all border ${locked ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' : done ? 'bg-emerald-50 border-emerald-200 hover:shadow-md cursor-pointer' : 'bg-white border-slate-200 hover:bg-violet-50 hover:border-violet-200 hover:shadow-md cursor-pointer'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {done ? <Check size={16} /> : lesson.order}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${done ? 'text-emerald-700' : 'text-slate-700'}`}>{lesson.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1"><Clock size={11} />{lesson.duration}</span>
                    {lesson.pdfs?.length > 0 && <span className="flex items-center gap-1"><FileText size={11} />{lesson.pdfs.length} fichier{lesson.pdfs.length > 1 ? 's' : ''}</span>}
                  </p>
                </div>
                {locked ? <Lock size={16} className="text-slate-400 shrink-0" /> : done ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <Play size={16} className="text-slate-400 shrink-0" />}
              </button>
            );
          })}
        </div>
        {!enrolled && !course.isFree && (
          <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <Lock size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div><p className="text-sm font-semibold text-amber-800">Contenu verrouillé</p><p className="text-xs text-amber-700 mt-0.5">Achetez ce cours pour débloquer toutes les leçons. La première est en aperçu gratuit.</p></div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Lecteur YouTube ────────────────────────────────────────
function YouTubePlayer({ url }) {
  const embed = getYoutubeEmbedUrl(url);
  if (!embed) return null;
  return (
    <div className="relative w-full bg-black rounded-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe className="absolute top-0 left-0 w-full h-full" src={embed} title="Lecteur de cours" frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  );
}

// ── Markdown simplifié ─────────────────────────────────────
function MD({ content }) {
  const html = (content || '')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-emerald-400 p-4 rounded-xl overflow-x-auto text-xs my-4 font-mono leading-relaxed"><code>$1</code></pre>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-slate-800 mt-6 mb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-slate-700 mt-5 mb-1.5">$1</h3>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-violet-400 pl-4 py-1 my-3 bg-violet-50 text-violet-800 text-sm rounded-r-lg italic">$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-violet-700 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-600 text-sm my-0.5">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-slate-600 text-sm leading-relaxed mb-3">')
    .replace(/\n/g, '<br/>');
  return <div dangerouslySetInnerHTML={{ __html: `<p class="text-slate-600 text-sm leading-relaxed mb-3">${html}</p>` }} />;
}

// ── Commentaire ────────────────────────────────────────────
function CommentItem({ comment, lessonId, depth = 0 }) {
  const { toggleLike, likedComments, addComment } = useApp();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const liked = likedComments[comment.id];
  const likes = comment.likes + (liked ? 1 : 0);
  const colors = ['from-violet-500 to-blue-500','from-orange-400 to-red-500','from-emerald-400 to-teal-500','from-pink-400 to-violet-500'];
  const color = colors[comment.author.charCodeAt(0) % colors.length];

  return (
    <div className="flex gap-3">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>{comment.avatar}</div>
      <div className="flex-1 min-w-0">
        <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-slate-800">{comment.author}</span>
            <span className="text-xs text-slate-400">{comment.date}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex gap-4 mt-1.5 pl-2">
          <button onClick={() => toggleLike(comment.id)} className={`text-xs flex items-center gap-1 transition-colors ${liked ? 'text-red-500 font-semibold' : 'text-slate-400 hover:text-red-400'}`}>
            <Heart size={12} fill={liked ? 'currentColor' : 'none'} />{likes > 0 && likes}
          </button>
          {depth === 0 && <button onClick={() => setReplyOpen(!replyOpen)} className="text-xs text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1"><MessageSquare size={12} />Répondre</button>}
        </div>
        {replyOpen && (
          <div className="mt-2 flex gap-2">
            <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder={`Répondre à ${comment.author}...`} rows={2}
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400" />
            <div className="flex flex-col gap-1">
              <button onClick={() => { if (replyText.trim()) { addComment(lessonId, replyText.trim(), comment.id); setReplyText(''); setReplyOpen(false); } }}
                disabled={!replyText.trim()} className="bg-violet-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-violet-700 disabled:opacity-40 transition-colors flex items-center gap-1"><Send size={11} />Envoyer</button>
              <button onClick={() => setReplyOpen(false)} className="text-slate-400 text-xs hover:text-slate-600"><X size={13} /></button>
            </div>
          </div>
        )}
        {comment.replies?.length > 0 && (
          <div className="mt-3 space-y-3 pl-2 border-l-2 border-slate-100">
            {comment.replies.map(r => <CommentItem key={r.id} comment={r} lessonId={lessonId} depth={1} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function CommentsSection({ lessonId }) {
  const { commentsMap, addComment } = useApp();
  const [text, setText] = useState('');
  const list = commentsMap[lessonId] || [];

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2"><MessageSquare size={20} />Commentaires <span className="text-sm font-normal text-slate-400">({list.length})</span></h3>
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">ME</div>
          <div className="flex-1">
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Partagez votre question ou expérience..." rows={3}
              className="w-full text-sm resize-none focus:outline-none text-slate-700 placeholder-slate-400" />
            <div className="flex justify-end mt-2 pt-2 border-t border-slate-100">
              <button onClick={() => { if (text.trim()) { addComment(lessonId, text.trim()); setText(''); } }} disabled={!text.trim()}
                className="flex items-center gap-1.5 bg-violet-600 text-white text-sm px-4 py-1.5 rounded-xl hover:bg-violet-700 disabled:opacity-40 transition-colors"><Send size={14} />Publier</button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {list.length === 0 ? <p className="text-sm text-slate-400 text-center py-8">Aucun commentaire. Soyez le premier !</p>
          : list.map(c => <CommentItem key={c.id} comment={c} lessonId={lessonId} />)}
      </div>
    </div>
  );
}

function LessonSidebar({ course, currentLessonId, enrolled }) {
  const navigate = useNavigate();
  const { completedLessons, getCourseProgress } = useApp();
  const progress = getCourseProgress(course.id);

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-100">
        <button onClick={() => navigate(`/cours/${course.id}`)} className="text-xs text-violet-600 hover:text-violet-800 transition-colors mb-2 flex items-center gap-1"><ArrowLeft size={12} />Détails du cours</button>
        <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{course.title}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 bg-slate-200 rounded-full h-1.5"><div className="bg-violet-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          <span className="text-xs text-slate-500 shrink-0">{progress}%</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{course.lessons.filter(l => completedLessons[l.id]).length}/{course.lessons.length} terminées</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {course.lessons.map((lesson, i) => {
          const locked = !enrolled && !course.isFree && i > 0;
          const done = completedLessons[lesson.id];
          const cur = lesson.id === currentLessonId;
          return (
            <button key={lesson.id} disabled={locked}
              onClick={() => !locked && navigate(`/cours/${course.id}/lecon/${lesson.id}`)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all ${cur ? 'bg-violet-50 border border-violet-200' : locked ? 'opacity-50 cursor-not-allowed border border-transparent' : 'hover:bg-slate-50 cursor-pointer border border-transparent'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? 'bg-emerald-100 text-emerald-600' : cur ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-400'}`}>
                {done ? <Check size={12} /> : locked ? <Lock size={10} /> : lesson.order}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs leading-snug line-clamp-2 ${cur ? 'text-violet-700 font-semibold' : done ? 'text-emerald-700' : 'text-slate-600'}`}>{lesson.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={9} />{lesson.duration}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses, isEnrolled, toggleLessonComplete, completedLessons } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const enrolled = isEnrolled(courseId);

  if (!course) return <div className="min-h-screen flex items-center justify-center"><EmptyState icon={BookOpen} title="Cours introuvable" action={() => navigate('/')} actionLabel="Accueil" /></div>;

  const lessonIdx = course.lessons.findIndex(l => l.id === lessonId);
  const lesson = course.lessons[lessonIdx];
  if (!lesson) return <div className="min-h-screen flex items-center justify-center"><EmptyState icon={BookOpen} title="Leçon introuvable" action={() => navigate(`/cours/${courseId}`)} actionLabel="Retour au cours" /></div>;

  const locked = !enrolled && !course.isFree && lessonIdx > 0;
  if (locked) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-center bg-white rounded-2xl p-10 shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5"><Lock size={28} className="text-red-500" /></div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Contenu verrouillé</h2>
        <p className="text-slate-500 text-sm mb-6">Achetez ce cours pour accéder à toutes les leçons.</p>
        <button onClick={() => navigate(`/cours/${courseId}`)} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl hover:bg-violet-700 transition-colors font-medium text-sm">Voir les détails</button>
      </div>
    </div>
  );

  const prevLesson = lessonIdx > 0 ? course.lessons[lessonIdx - 1] : null;
  const nextLesson = lessonIdx < course.lessons.length - 1 ? course.lessons[lessonIdx + 1] : null;
  const done = completedLessons[lesson.id];

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <div className="hidden lg:flex"><LessonSidebar course={course} currentLessonId={lessonId} enrolled={enrolled} /></div>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="bg-black/50 flex-1" onClick={() => setSidebarOpen(false)} />
          <LessonSidebar course={course} currentLessonId={lessonId} enrolled={enrolled} />
        </div>
      )}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-slate-700"><Menu size={20} /></button>
          <button onClick={() => navigate(`/cours/${courseId}`)} className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1"><ArrowLeft size={12} />Cours</button>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-xs text-slate-600 flex-1 truncate font-medium">{lesson.title}</span>
          <button onClick={() => toggleLessonComplete(lesson.id)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all border shrink-0 font-medium flex items-center gap-1.5 ${done ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300'}`}>
            <Check size={12} />{done ? 'Complétée' : 'Marquer complétée'}
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          {lesson.videoUrl && <YouTubePlayer url={lesson.videoUrl} />}
          <div className="mt-5 mb-5">
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-2"><span>Leçon {lesson.order}/{course.lessons.length}</span><span>·</span><Clock size={11} /><span>{lesson.duration}</span></p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{lesson.title}</h1>
          </div>
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 mb-5"><MD content={lesson.content} /></div>
          {lesson.pdfs?.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><FileText size={16} />Ressources <span className="text-xs font-normal text-slate-400">({lesson.pdfs.length})</span></h3>
              <div className="space-y-2">
                {lesson.pdfs.map((pdf, i) => {
                  const hasUrl = pdf.url && pdf.url !== '#';
                  return hasUrl ? (
                    <a key={i} href={pdf.url} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group cursor-pointer">
                      <FileText size={18} className="text-red-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-red-700 flex-1 truncate">{pdf.name}</span>
                      <ChevronRight size={14} className="text-red-400 shrink-0" />
                    </a>
                  ) : (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 opacity-60">
                      <FileText size={18} className="text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-500 flex-1 truncate">{pdf.name}</span>
                      <span className="text-xs text-slate-400">Lien indisponible</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center gap-3 mb-8">
            {prevLesson
              ? <button onClick={() => navigate(`/cours/${courseId}/lecon/${prevLesson.id}`)} className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:border-violet-300 transition-all"><ChevronLeft size={14} /><span className="hidden sm:inline truncate max-w-32">{prevLesson.title}</span><span className="sm:hidden">Précédent</span></button>
              : <div />}
            {nextLesson
              ? <button onClick={() => { if (!done) toggleLessonComplete(lesson.id); navigate(`/cours/${courseId}/lecon/${nextLesson.id}`); }} className="flex items-center gap-2 text-xs bg-violet-600 text-white px-3 py-2 rounded-xl hover:bg-violet-700 transition-all"><span className="hidden sm:inline truncate max-w-32">{nextLesson.title}</span><span className="sm:hidden">Suivant</span><ChevronRight size={14} /></button>
              : <button onClick={() => { if (!done) toggleLessonComplete(lesson.id); navigate(`/cours/${courseId}`); }} className="flex items-center gap-2 text-xs bg-emerald-500 text-white px-3 py-2 rounded-xl hover:bg-emerald-600 transition-all"><Award size={14} />Terminer le cours</button>}
          </div>
          <CommentsSection lessonId={lesson.id} />
        </div>
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════════════════════

const ADMIN_NAV = [
  { path: '/admin',              label: 'Dashboard',      icon: LayoutDashboard, exact: true },
  { path: '/admin/cours',        label: 'Cours',          icon: BookOpen },
  { path: '/admin/paiements',    label: 'Paiements',      icon: CreditCard },
  { path: '/admin/etudiants',    label: 'Étudiants',      icon: Users },
  { path: '/admin/commentaires', label: 'Commentaires',   icon: MessageSquare },
];

function AdminSidebar({ close, navigate, locationPath }) {
  return (
    <aside className="w-56 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <GraduationCap size={20} className="text-violet-400" />
        <div>
          <p className="font-bold text-sm text-white">LearnHub</p>
          <p className="text-xs text-slate-500">Administration</p>
        </div>
        {close && <button onClick={close} className="ml-auto text-slate-500 hover:text-white lg:hidden"><X size={18} /></button>}
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {ADMIN_NAV.map(({ path, label, icon: Icon, exact }) => {
          const active = exact ? locationPath === path : locationPath.startsWith(path);
          return (
            <button key={path} onClick={() => { navigate(path); close?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon size={16} />{label}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"><Globe size={16} />Voir le site</button>
        <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"><Settings size={16} />Paramètres</button>
      </div>
    </aside>
  );
}

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden lg:flex shrink-0"><AdminSidebar navigate={navigate} locationPath={location.pathname} /></div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="bg-black/60 flex-1" onClick={() => setMobileOpen(false)} />
          <AdminSidebar close={() => setMobileOpen(false)} navigate={navigate} locationPath={location.pathname} />
        </div>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center gap-3 border-b border-slate-800">
          <button onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <GraduationCap size={18} className="text-violet-400" />
          <span className="font-semibold text-sm">Admin</span>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// ── Admin Dashboard ────────────────────────────────────────
function AdminDashboard() {
  const { courses, users, paymentRequests } = useApp();
  const navigate = useNavigate();
  const published = courses.filter(c => c.published).length;
  const totalStudents = users.filter(u => !u.isAdmin).length;
  const revenue = paymentRequests.filter(r => r.status === 'approved').reduce((s, r) => s + (r.coursePrice || 0), 0);
  const avgRating = courses.length ? (courses.reduce((s, c) => s + (c.rating || 0), 0) / courses.length).toFixed(1) : '—';
  const recentCourses = [...courses].sort((a, b) => b.createdAt?.localeCompare(a.createdAt || '') || 0).slice(0, 5);

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
            <p className="text-sm text-slate-500 mt-0.5">Vue d'ensemble de la plateforme</p>
          </div>
          <button onClick={() => navigate('/admin/cours/nouveau')} className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium shadow-md shadow-violet-200">
            <Plus size={16} />Nouveau cours
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Cours publiés" value={published} sub={`${courses.length} au total`} icon={BookOpen} color="violet" />
          <StatCard label="Étudiants" value={totalStudents} sub="comptes inscrits" icon={Users} color="blue" />
          <StatCard label="Revenus confirmés" value={fmtPrice(revenue)} sub={`${paymentRequests.filter(r => r.status === 'approved').length} paiement(s) approuvé(s)`} icon={DollarSign} color="emerald" />
          <StatCard label="Note moyenne" value={avgRating} sub="sur 5 étoiles" icon={Star} color="amber" />
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Nouveau cours', icon: Plus, action: () => navigate('/admin/cours/nouveau'), color: 'violet' },
            { label: 'Voir les cours', icon: BookOpen, action: () => navigate('/admin/cours'), color: 'slate' },
            { label: 'Commentaires', icon: MessageSquare, action: () => navigate('/admin/commentaires'), color: 'slate' },
            { label: 'Étudiants', icon: Users, action: () => navigate('/admin/etudiants'), color: 'slate' },
          ].map(({ label, icon: Icon, action, color }) => (
            <button key={label} onClick={action} className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-violet-300 transition-all text-sm font-medium ${color === 'violet' ? 'text-violet-700 border-violet-200 bg-violet-50' : 'text-slate-600'}`}>
              <Icon size={20} className={color === 'violet' ? 'text-violet-600' : 'text-slate-400'} />{label}
            </button>
          ))}
        </div>

        {/* Tableau récent */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2"><TrendingUp size={16} className="text-violet-500" />Cours récents</h2>
            <button onClick={() => navigate('/admin/cours')} className="text-xs text-violet-600 hover:text-violet-800 flex items-center gap-1">Tous les cours<ChevronRight size={13} /></button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentCourses.map(c => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                <img src={c.image} alt={c.title} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{c.title}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-2"><LevelBadge level={c.level} /><span>{c.lessons.length} leçons</span></p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{c.published ? 'Publié' : 'Brouillon'}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.isFree ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-700'}`}>{c.isFree ? 'Gratuit' : fmtPrice(c.price)}</span>
                </div>
                <button onClick={() => navigate(`/admin/cours/${c.id}/modifier`)} className="text-slate-400 hover:text-violet-600 transition-colors"><Pencil size={15} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Admin Cours — liste ────────────────────────────────────
function AdminCoursesList() {
  const { courses, deleteCourse, togglePublished } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      {toDelete && <DeleteModal label={toDelete.title} onCancel={() => setToDelete(null)} onConfirm={() => { deleteCourse(toDelete.id); setToDelete(null); }} />}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Cours</h1>
            <p className="text-sm text-slate-500 mt-0.5">{courses.length} cours au total</p>
          </div>
          <button onClick={() => navigate('/admin/cours/nouveau')} className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium shadow-md shadow-violet-200">
            <Plus size={16} />Nouveau cours
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
          </div>
          {filtered.length === 0
            ? <EmptyState icon={BookOpen} title="Aucun cours" sub="Créez votre premier cours." action={() => navigate('/admin/cours/nouveau')} actionLabel="Créer un cours" />
            : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Cours','Catégorie','Niveau','Prix','Leçons','Statut','Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={c.image} alt={c.title} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                            <div className="min-w-0"><p className="text-sm font-medium text-slate-800 truncate max-w-48">{c.title}</p><p className="text-xs text-slate-400">{c.instructor.name}</p></div>
                          </div>
                        </td>
                        <td className="px-4 py-3"><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{c.category}</span></td>
                        <td className="px-4 py-3"><LevelBadge level={c.level} /></td>
                        <td className="px-4 py-3">
                          {c.isFree ? <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Gratuit</span>
                            : <span className="text-sm font-semibold text-slate-700">{fmtPrice(c.price)}</span>}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 text-center">{c.lessons.length}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => togglePublished(c.id)} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${c.published ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                            {c.published ? <Eye size={11} /> : <EyeOff size={11} />}{c.published ? 'Publié' : 'Brouillon'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => navigate(`/admin/cours/${c.id}/modifier`)} title="Modifier" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"><Pencil size={15} /></button>
                            <button onClick={() => navigate(`/admin/cours/${c.id}/lecons`)} title="Gérer les leçons" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Layers size={15} /></button>
                            <button onClick={() => navigate(`/cours/${c.id}`)} title="Voir sur le site" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"><Globe size={15} /></button>
                            <button onClick={() => setToDelete(c)} title="Supprimer" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ── Admin Course Form (Créer / Modifier) ───────────────────
const EMPTY_COURSE = { title: '', description: '', image: '', category: 'Développement Web', level: 'Débutant', duration: '', instructor: { name: '', bio: '' }, isFree: true, price: 0, published: false };
const CATEGORIES = ['Développement Web','Data Science','Design','Marketing','Business','Cybersécurité','DevOps'];
const LEVELS = ['Débutant','Intermédiaire','Avancé'];

function AdminCourseForm() {
  const { courseId } = useParams();
  const { courses, addCourse, updateCourse } = useApp();
  const navigate = useNavigate();
  const isEdit = Boolean(courseId);
  const existing = isEdit ? courses.find(c => c.id === courseId) : null;

  const [form, setForm] = useState(() => existing ? {
    title: existing.title, description: existing.description, image: existing.image,
    category: existing.category, level: existing.level, duration: existing.duration,
    instructor: { name: existing.instructor.name, bio: existing.instructor.bio },
    isFree: existing.isFree, price: existing.price || 0, published: existing.published,
  } : EMPTY_COURSE);
  const [errors, setErrors] = useState({});

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const setInstr = (field, val) => setForm(p => ({ ...p, instructor: { ...p.instructor, [field]: val } }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.description.trim()) e.description = 'Requis';
    if (!form.instructor.name.trim()) e.instrName = 'Requis';
    if (!form.duration.trim()) e.duration = 'Requis';
    if (!form.isFree && (!form.price || form.price <= 0)) e.price = 'Prix requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data = { ...form, instructor: { ...form.instructor, avatar: getInitials(form.instructor.name) } };
    if (isEdit) { updateCourse(courseId, data); navigate('/admin/cours'); }
    else { const id = addCourse(data); navigate(`/admin/cours/${id}/lecons`); }
  };

  const inputCls = (err) => `w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 ${err ? 'border-red-300' : 'border-slate-200'}`;

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-7">
          <button onClick={() => navigate('/admin/cours')} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-violet-600 hover:border-violet-300 transition-colors"><ArrowLeft size={16} /></button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{isEdit ? 'Modifier le cours' : 'Nouveau cours'}</h1>
            {isEdit && <p className="text-sm text-slate-400 mt-0.5 truncate max-w-xs">{existing?.title}</p>}
          </div>
        </div>

        <div className="space-y-5">
          {/* Informations de base */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><BookOpen size={16} className="text-violet-500" />Informations générales</h2>
            <div className="space-y-4">
              <FormField label="Titre du cours *" error={errors.title}>
                <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Ex : Introduction à React" className={inputCls(errors.title)} />
              </FormField>
              <FormField label="Description *" error={errors.description}>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Décrivez le contenu du cours, les prérequis et ce que les étudiants vont apprendre..." className={`${inputCls(errors.description)} resize-none`} />
              </FormField>
              <FormField label="Image de couverture (URL)">
                <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." className={inputCls(false)} />
                {form.image && <img src={form.image} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl" onError={e => e.target.style.display='none'} />}
              </FormField>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Catégorie">
                  <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls(false)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Niveau">
                  <select value={form.level} onChange={e => set('level', e.target.value)} className={inputCls(false)}>
                    {LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </FormField>
                <FormField label="Durée totale *" error={errors.duration}>
                  <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="Ex : 8h 30min" className={inputCls(errors.duration)} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Instructeur */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Award size={16} className="text-violet-500" />Instructeur</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Nom *" error={errors.instrName}>
                <input value={form.instructor.name} onChange={e => setInstr('name', e.target.value)} placeholder="Prénom Nom" className={inputCls(errors.instrName)} />
              </FormField>
              <FormField label="Biographie courte">
                <input value={form.instructor.bio} onChange={e => setInstr('bio', e.target.value)} placeholder="Ex : Développeur senior avec 10 ans d'expérience" className={inputCls(false)} />
              </FormField>
            </div>
            {form.instructor.name && (
              <div className="flex items-center gap-3 mt-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">{getInitials(form.instructor.name)}</div>
                <div><p className="text-sm font-medium text-slate-700">{form.instructor.name}</p><p className="text-xs text-slate-400">{form.instructor.bio}</p></div>
              </div>
            )}
          </div>

          {/* Tarification */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><DollarSign size={16} className="text-violet-500" />Tarification</h2>
            <div className="flex items-center gap-4 mb-4">
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => set('isFree', val)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${form.isFree === val ? (val ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-violet-500 bg-violet-50 text-violet-700') : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  {val ? '🎁 Gratuit' : '💎 Payant'}
                </button>
              ))}
            </div>
            {!form.isFree && (
              <FormField label="Prix (FCFA) *" error={errors.price}>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" value={form.price} onChange={e => set('price', Number(e.target.value))} placeholder="4990" className={`${inputCls(errors.price)} pl-8`} />
                </div>
              </FormField>
            )}
          </div>

          {/* Publication */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Globe size={16} className="text-violet-500" />Publication</h2>
            <button onClick={() => set('published', !form.published)}
              className={`flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all ${form.published ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                {form.published ? <Eye size={18} className="text-emerald-600" /> : <EyeOff size={18} className="text-slate-400" />}
                <div className="text-left">
                  <p className={`text-sm font-semibold ${form.published ? 'text-emerald-700' : 'text-slate-600'}`}>{form.published ? 'Publié — visible sur le site' : 'Brouillon — non visible'}</p>
                  <p className="text-xs text-slate-400">{form.published ? 'Les étudiants peuvent voir et s\'inscrire.' : 'Cliquez pour publier le cours.'}</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${form.published ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button onClick={() => navigate('/admin/cours')} className="flex items-center gap-2 border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"><X size={15} />Annuler</button>
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium shadow-md shadow-violet-200 flex-1 sm:flex-none justify-center">
            <Save size={15} />{isEdit ? 'Enregistrer' : 'Créer et gérer les leçons →'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Admin Leçons — liste ───────────────────────────────────
function AdminLessonsList() {
  const { courseId } = useParams();
  const { courses, deleteLesson, moveLessonUp, moveLessonDown } = useApp();
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState(null);
  const course = courses.find(c => c.id === courseId);

  if (!course) return <AdminLayout><EmptyState icon={BookOpen} title="Cours introuvable" action={() => navigate('/admin/cours')} actionLabel="Retour" /></AdminLayout>;

  return (
    <AdminLayout>
      {toDelete && <DeleteModal label={toDelete.title} onCancel={() => setToDelete(null)} onConfirm={() => { deleteLesson(courseId, toDelete.id); setToDelete(null); }} />}
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/admin/cours')} className="text-slate-400 hover:text-slate-700 transition-colors"><ArrowLeft size={18} /></button>
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <span className="hover:text-violet-600 cursor-pointer" onClick={() => navigate('/admin/cours')}>Cours</span>
            <ChevronRight size={13} />
            <span className="text-slate-700 font-medium truncate max-w-48">{course.title}</span>
            <ChevronRight size={13} />
            <span className="text-slate-700 font-medium">Leçons</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6 mt-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Leçons du cours</h1>
            <p className="text-sm text-slate-500">{course.lessons.length} leçon{course.lessons.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate(`/admin/cours/${courseId}/modifier`)} className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-sm"><Pencil size={14} />Cours</button>
            <button onClick={() => navigate(`/admin/cours/${courseId}/lecons/nouvelle`)} className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium"><Plus size={15} />Ajouter une leçon</button>
          </div>
        </div>

        {course.lessons.length === 0
          ? <EmptyState icon={PlayCircle} title="Aucune leçon" sub="Ajoutez la première leçon de ce cours." action={() => navigate(`/admin/cours/${courseId}/lecons/nouvelle`)} actionLabel="Ajouter une leçon" />
          : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {course.lessons.map((l, i) => (
                  <div key={l.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    {/* Ordre + reorder */}
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <button onClick={() => moveLessonUp(courseId, l.id)} disabled={i === 0} className="text-slate-300 hover:text-violet-500 disabled:opacity-30 transition-colors"><ChevronUp size={14} /></button>
                      <span className="text-xs font-bold text-slate-400 w-5 text-center">{l.order}</span>
                      <button onClick={() => moveLessonDown(courseId, l.id)} disabled={i === course.lessons.length - 1} className="text-slate-300 hover:text-violet-500 disabled:opacity-30 transition-colors"><ChevronDown size={14} /></button>
                    </div>
                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{l.title}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1"><Clock size={11} />{l.duration}</span>
                        {l.videoUrl && <span className="flex items-center gap-1 text-red-400"><PlayCircle size={11} />Vidéo</span>}
                        {l.pdfs?.length > 0 && <span className="flex items-center gap-1"><FileText size={11} />{l.pdfs.length} PDF</span>}
                        <span className="flex items-center gap-1"><MessageSquare size={11} />{l.comments?.length || 0} comment.</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => navigate(`/admin/cours/${courseId}/lecons/${l.id}/modifier`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => navigate(`/cours/${courseId}/lecon/${l.id}`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"><Globe size={15} /></button>
                      <button onClick={() => setToDelete(l)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </AdminLayout>
  );
}

// ── Admin Leçon Form (Créer / Modifier) ────────────────────
const EMPTY_LESSON = { title: '', duration: '', videoUrl: '', content: '', pdfs: [] };

function AdminLessonForm() {
  const { courseId, lessonId } = useParams();
  const { courses, addLesson, updateLesson } = useApp();
  const navigate = useNavigate();
  const isEdit = Boolean(lessonId);
  const course = courses.find(c => c.id === courseId);
  const existing = isEdit ? course?.lessons.find(l => l.id === lessonId) : null;

  const [form, setForm] = useState(() => existing ? { title: existing.title, duration: existing.duration, videoUrl: existing.videoUrl || '', content: existing.content || '', pdfs: existing.pdfs || [] } : EMPTY_LESSON);
  const [errors, setErrors] = useState({});
  const [previewTab, setPreviewTab] = useState('edit');

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const addPdf = () => setForm(p => ({ ...p, pdfs: [...p.pdfs, { name: '', url: '' }] }));
  const removePdf = i => setForm(p => ({ ...p, pdfs: p.pdfs.filter((_, idx) => idx !== i) }));
  const updatePdf = (i, f, v) => setForm(p => ({ ...p, pdfs: p.pdfs.map((pdf, idx) => idx === i ? { ...pdf, [f]: v } : pdf) }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.duration.trim()) e.duration = 'Requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const cleanedForm = { ...form, pdfs: form.pdfs.filter(p => p.name.trim()) };
    if (isEdit) { updateLesson(courseId, lessonId, cleanedForm); }
    else { addLesson(courseId, cleanedForm); }
    navigate(`/admin/cours/${courseId}/lecons`);
  };

  if (!course) return <AdminLayout><EmptyState icon={BookOpen} title="Cours introuvable" action={() => navigate('/admin/cours')} actionLabel="Retour" /></AdminLayout>;

  const embedPreview = getYoutubeEmbedUrl(form.videoUrl);
  const videoId = embedPreview?.split('/embed/')[1];

  const inputCls = (err) => `w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 ${err ? 'border-red-300' : 'border-slate-200'}`;

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-7">
          <button onClick={() => navigate(`/admin/cours/${courseId}/lecons`)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-violet-600 hover:border-violet-300 transition-colors"><ArrowLeft size={16} /></button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{isEdit ? 'Modifier la leçon' : 'Nouvelle leçon'}</h1>
            <p className="text-sm text-slate-400 mt-0.5 truncate max-w-xs">{course.title}</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Infos */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><PlayCircle size={16} className="text-violet-500" />Informations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2"><FormField label="Titre *" error={errors.title}><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Ex : Introduction aux hooks React" className={inputCls(errors.title)} /></FormField></div>
              <FormField label="Durée *" error={errors.duration}><input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="Ex : 25min" className={inputCls(errors.duration)} /></FormField>
            </div>
          </div>

          {/* Vidéo */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><PlayCircle size={16} className="text-violet-500" />Vidéo YouTube</h2>
            <FormField label="URL YouTube (watch?v=, youtu.be/, embed/, shorts/)">
              <div className="relative"><LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className={`${inputCls(false)} pl-9`} /></div>
            </FormField>
            {videoId && (
              <div className="mt-3">
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Check size={11} className="text-emerald-500" />URL valide · ID : <code className="bg-slate-100 px-1 rounded text-violet-700">{videoId}</code></p>
                <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="preview" className="w-full sm:w-72 h-40 object-cover rounded-xl border border-slate-200" />
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2"><FileText size={16} className="text-violet-500" />Contenu (Markdown)</h2>
              <div className="flex bg-slate-100 rounded-lg p-0.5">
                {['edit','preview'].map(t => <button key={t} onClick={() => setPreviewTab(t)} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${previewTab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>{t === 'edit' ? 'Écrire' : 'Aperçu'}</button>)}
              </div>
            </div>
            {previewTab === 'edit'
              ? <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={12} placeholder={`## Titre de la leçon\n\nVotre contenu en Markdown...\n\n\`\`\`js\n// exemple de code\n\`\`\``}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 resize-y font-mono" />
              : <div className="min-h-32 bg-slate-50 rounded-xl p-4 border border-slate-200"><MD content={form.content || '*Aucun contenu*'} /></div>}
          </div>

          {/* PDFs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2"><FileText size={16} className="text-violet-500" />Fichiers PDF</h2>
              <button onClick={addPdf} className="flex items-center gap-1.5 text-xs bg-violet-50 text-violet-600 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"><Plus size={13} />Ajouter</button>
            </div>
            {form.pdfs.length === 0 ? <p className="text-sm text-slate-400 text-center py-4">Aucun fichier. Cliquez sur "Ajouter".</p>
              : <div className="space-y-3">
                  {form.pdfs.map((pdf, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText size={15} className="text-red-400 shrink-0" />
                        <input value={pdf.name} onChange={e => updatePdf(i, 'name', e.target.value)} placeholder="Nom du fichier (ex: Cheat Sheet React)" className="flex-1 text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white" />
                        <button onClick={() => removePdf(i)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0"><X size={15} /></button>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
                        <LinkIcon size={13} className="text-slate-400 shrink-0" />
                        <input value={pdf.url} onChange={e => updatePdf(i, 'url', e.target.value)} placeholder="https://exemple.com/fichier.pdf" className="flex-1 text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white" />
                      </div>
                    </div>
                  ))}
                </div>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={() => navigate(`/admin/cours/${courseId}/lecons`)} className="flex items-center gap-2 border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"><X size={15} />Annuler</button>
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium shadow-md shadow-violet-200 flex-1 sm:flex-none justify-center">
            <Save size={15} />{isEdit ? 'Enregistrer' : 'Créer la leçon'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Admin Commentaires ─────────────────────────────────────
function AdminComments() {
  const { courses, commentsMap, deleteComment } = useApp();
  const [filterCourse, setFilterCourse] = useState('all');
  const [toDelete, setToDelete] = useState(null);

  const allComments = [];
  courses.forEach(course => {
    course.lessons.forEach(lesson => {
      (commentsMap[lesson.id] || []).forEach(comment => {
        allComments.push({ ...comment, courseId: course.id, courseTitle: course.title, lessonId: lesson.id, lessonTitle: lesson.title, parentId: null });
        (comment.replies || []).forEach(reply => {
          allComments.push({ ...reply, courseId: course.id, courseTitle: course.title, lessonId: lesson.id, lessonTitle: lesson.title, parentId: comment.id });
        });
      });
    });
  });

  const filtered = filterCourse === 'all' ? allComments : allComments.filter(c => c.courseId === filterCourse);

  return (
    <AdminLayout>
      {toDelete && <DeleteModal label={`commentaire de ${toDelete.author}`} onCancel={() => setToDelete(null)} onConfirm={() => { deleteComment(toDelete.lessonId, toDelete.id, toDelete.parentId); setToDelete(null); }} />}
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-slate-800">Commentaires</h1><p className="text-sm text-slate-500 mt-0.5">{allComments.length} commentaire{allComments.length !== 1 ? 's' : ''} au total</p></div>
          <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)} className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white">
            <option value="all">Tous les cours</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filtered.length === 0
            ? <EmptyState icon={MessageSquare} title="Aucun commentaire" sub="Les commentaires des étudiants apparaîtront ici." />
            : (
              <div className="divide-y divide-slate-100">
                {filtered.map((c, i) => (
                  <div key={`${c.id}-${i}`} className={`flex gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${c.parentId ? 'pl-10 bg-slate-50/50' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-slate-800">{c.author}</span>
                        {c.parentId && <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">Réponse</span>}
                        <span className="text-xs text-slate-400">{c.date}</span>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs text-violet-600 truncate max-w-32">{c.courseTitle}</span>
                        <ChevronRight size={10} className="text-slate-300" />
                        <span className="text-xs text-slate-500 truncate max-w-32">{c.lessonTitle}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Heart size={11} />{c.likes} j'aime</p>
                    </div>
                    <button onClick={() => setToDelete(c)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0 self-start mt-1"><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Admin Étudiants ────────────────────────────────────────
function AdminStudents() {
  const { courses, users, paymentRequests, deleteStudent } = useApp();
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);

  // Uniquement les non-admins
  const students = users.filter(u => !u.isAdmin);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const avatarColors = ['from-violet-500 to-blue-500','from-orange-400 to-red-500','from-emerald-400 to-teal-500','from-pink-400 to-violet-500','from-amber-400 to-orange-500'];

  // Cours d'un étudiant = paiements approuvés + cours gratuits s'il est le "user par défaut"
  const getStudentCourses = (userId) => {
    return paymentRequests
      .filter(r => r.userId === userId && r.status === 'approved')
      .map(r => courses.find(c => c.id === r.courseId)?.title)
      .filter(Boolean);
  };

  const thisMonth = new Date().toISOString().slice(0, 7); // "2026-04"

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-slate-800">Étudiants</h1><p className="text-sm text-slate-500 mt-0.5">{students.length} compte{students.length !== 1 ? 's' : ''} inscrit{students.length !== 1 ? 's' : ''}</p></div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 w-48" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total étudiants" value={students.length} icon={Users} color="violet" />
          <StatCard label="Cours achetés" value={paymentRequests.filter(r => r.status === 'approved').length} sub="paiements confirmés" icon={BookOpen} color="blue" />
          <StatCard label="Ce mois" value={students.filter(s => (s.joinDate || '').startsWith(thisMonth)).length} sub="nouveaux inscrits" icon={TrendingUp} color="emerald" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState icon={Users} title="Aucun étudiant inscrit" sub="Les comptes créés apparaîtront ici." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{['Étudiant','Email','Inscrit le','Cours achetés',''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((s, idx) => {
                    const color = avatarColors[idx % avatarColors.length];
                    const courseNames = getStudentCourses(s.id);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{getInitials(s.name)}</div>
                            <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">{s.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{s.joinDate || '—'}</td>
                        <td className="px-4 py-3">
                          {courseNames.length === 0
                            ? <span className="text-xs text-slate-400">Aucun</span>
                            : <div className="flex flex-wrap gap-1">
                                {courseNames.map(n => <span key={n} className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full border border-violet-100 truncate max-w-36">{n}</span>)}
                              </div>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setToDelete(s)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {toDelete && (
        <DeleteModal
          label={toDelete.name}
          onConfirm={() => { deleteStudent(toDelete.id); setToDelete(null); }}
          onCancel={() => setToDelete(null)}
        />
      )}
    </AdminLayout>
  );
}

// ════════════════════════════════════════════════════════════
// AUTH — Connexion / Inscription
// ════════════════════════════════════════════════════════════
function LoginPage() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => { if (currentUser) navigate(redirect, { replace: true }); }, [currentUser, navigate, redirect]);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(form.email, form.password);
    if (res.error) setError(res.error);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Connexion</h1>
          <p className="text-sm text-slate-500 mt-1">Accédez à vos cours</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2"><AlertCircle size={15} />{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="vous@exemple.com" required
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 pr-10" />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2">
              <LogIn size={16} />Se connecter
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-5">
            Pas encore de compte ?{' '}
            <button onClick={() => navigate('/inscription', { state: { redirect } })} className="text-violet-600 font-semibold hover:underline">S'inscrire</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisterPage() {
  const { register, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect || '/';
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => { if (currentUser) navigate(redirect, { replace: true }); }, [currentUser, navigate, redirect]);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas.');
    if (form.password.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères.');
    const res = register(form.name.trim(), form.email, form.password);
    if (res.error) setError(res.error);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Créer un compte</h1>
          <p className="text-sm text-slate-500 mt-1">Rejoignez des milliers d'apprenants</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2"><AlertCircle size={15} />{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Fatima Abakar" required
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="vous@exemple.com" required
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min. 6 caractères" required
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 pr-10" />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmer le mot de passe</label>
              <input type="password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} placeholder="••••••••" required
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2">
              <UserPlus size={16} />Créer mon compte
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-5">
            Déjà un compte ?{' '}
            <button onClick={() => navigate('/connexion', { state: { redirect } })} className="text-violet-600 font-semibold hover:underline">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PAIEMENT
// ════════════════════════════════════════════════════════════
function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, currentUser, submitPayment, getPaymentStatus } = useApp();
  const course = courses.find(c => c.id === courseId);

  const [userName, setUserName] = useState(currentUser?.name || '');
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!currentUser) navigate('/connexion', { state: { redirect: `/paiement/${courseId}` } });
  }, [currentUser, navigate, courseId]);

  useEffect(() => {
    const status = getPaymentStatus(courseId);
    if (status === 'pending' || status === 'approved') navigate(`/cours/${courseId}`, { replace: true });
  }, [getPaymentStatus, courseId, navigate]);

  if (!course) return <Navigate to="/" replace />;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setScreenshot(ev.target.result); setPreview(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!screenshot) return;
    setSubmitting(true);
    setTimeout(() => {
      submitPayment(courseId, course.title, course.price, userName, screenshot);
      setSubmitting(false);
      setDone(true);
    }, 800);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Hourglass size={32} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Demande envoyée !</h2>
          <p className="text-sm text-slate-500 mb-6">Votre capture d'écran a été transmise à l'administrateur. L'accès au cours sera activé après confirmation.</p>
          <button onClick={() => navigate('/')} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm">
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate(`/cours/${courseId}`)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft size={14} />Retour au cours
        </button>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Acheter ce cours</h1>
        <p className="text-slate-500 text-sm mb-6">{course.title}</p>

        {/* Instructions paiement */}
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Phone size={16} className="text-violet-600" />Instructions de paiement</h2>
          <p className="text-sm text-slate-600 mb-3">Effectuez un paiement mobile money du montant exact :</p>
          <div className="bg-white rounded-xl p-4 border border-violet-100 space-y-2 mb-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Montant</span>
              <span className="font-bold text-slate-800 text-lg">{fmtPrice(course.price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Numéro</span>
              <span className="font-bold text-violet-700 text-lg tracking-wider">65 57 88 98</span>
            </div>
          </div>
          <div className="flex gap-3 text-xs text-slate-600">
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-center">
              <p className="font-bold text-orange-500 text-base mb-0.5">Airtel Money</p>
              <p>*150# → Envoyer → 65578898</p>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-center">
              <p className="font-bold text-blue-500 text-base mb-0.5">Moov Money</p>
              <p>*555# → Transfert → 65578898</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Confirmer votre paiement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Votre nom complet</label>
              <input type="text" value={userName} onChange={e => setUserName(e.target.value)} required placeholder="Tel qu'il apparaît sur votre compte mobile money"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Capture d'écran du paiement <span className="text-red-500">*</span></label>
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${preview ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                {preview ? (
                  <img src={preview} alt="Aperçu" className="h-full w-full object-contain rounded-xl p-1" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon size={28} />
                    <p className="text-sm">Cliquez pour joindre la capture</p>
                    <p className="text-xs">PNG, JPG jusqu'à 5 Mo</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {preview && (
                <button type="button" onClick={() => { setScreenshot(null); setPreview(null); }} className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1">
                  <X size={12} />Supprimer la capture
                </button>
              )}
            </div>
            <button type="submit" disabled={!screenshot || submitting} className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Envoi en cours...' : <><Send size={15} />Envoyer ma demande</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ADMIN — Paiements
// ════════════════════════════════════════════════════════════
function AdminPayments() {
  const { paymentRequests, approvePayment, rejectPayment } = useApp();
  const [filter, setFilter] = useState('pending');
  const [preview, setPreview] = useState(null);

  const filtered = paymentRequests.filter(r => filter === 'all' || r.status === filter);
  const pendingCount = paymentRequests.filter(r => r.status === 'pending').length;

  const statusLabel = { pending: 'En attente', approved: 'Approuvé', rejected: 'Refusé' };
  const statusCls = { pending: 'bg-amber-50 text-amber-700 border-amber-200', approved: 'bg-emerald-50 text-emerald-700 border-emerald-200', rejected: 'bg-red-50 text-red-600 border-red-200' };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><CreditCard size={22} className="text-violet-600" />Paiements</h1>
            {pendingCount > 0 && <p className="text-sm text-amber-600 mt-0.5">{pendingCount} demande{pendingCount > 1 ? 's' : ''} en attente</p>}
          </div>
          <div className="flex gap-2">
            {['pending', 'approved', 'rejected', 'all'].map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filter === s ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300'}`}>
                {s === 'all' ? 'Tous' : statusLabel[s]}{s === 'pending' && pendingCount > 0 ? ` (${pendingCount})` : ''}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={CreditCard} title="Aucune demande" sub="Les demandes de paiement apparaîtront ici." />
        ) : (
          <div className="space-y-3">
            {filtered.map(req => (
              <div key={req.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4">
                <button onClick={() => setPreview(req.screenshot)} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-200 hover:border-violet-400 transition-colors">
                  <img src={req.screenshot} alt="Capture" className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-slate-800">{req.userName}</p>
                      <p className="text-sm text-slate-500 truncate">{req.courseName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{req.createdAt} · {fmtPrice(req.coursePrice)}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusCls[req.status]}`}>{statusLabel[req.status]}</span>
                  </div>
                  {req.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => approvePayment(req.id)} className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
                        <Check size={13} />Approuver
                      </button>
                      <button onClick={() => rejectPayment(req.id)} className="flex items-center gap-1.5 bg-red-500 text-white text-xs px-4 py-2 rounded-xl hover:bg-red-600 transition-colors font-semibold">
                        <X size={13} />Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal aperçu capture */}
      {preview && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-600 hover:text-red-500"><X size={16} /></button>
            <img src={preview} alt="Capture plein écran" className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ════════════════════════════════════════════════════════════
// APPLICATION — Routes
// ════════════════════════════════════════════════════════════
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toast />
        <Navbar />
        <Routes>
          {/* ── Site public ──────────────────────────────── */}
          <Route path="/"                                              element={<HomePage />} />
          <Route path="/connexion"                                     element={<LoginPage />} />
          <Route path="/inscription"                                   element={<RegisterPage />} />
          <Route path="/cours/:courseId"                               element={<CourseDetailPage />} />
          <Route path="/cours/:courseId/lecon/:lessonId"               element={<LessonPage />} />
          <Route path="/paiement/:courseId"                            element={<PaymentPage />} />
          {/* ── Admin ────────────────────────────────────── */}
          <Route path="/admin"                                         element={<AdminDashboard />} />
          <Route path="/admin/cours"                                   element={<AdminCoursesList />} />
          <Route path="/admin/cours/nouveau"                           element={<AdminCourseForm />} />
          <Route path="/admin/cours/:courseId/modifier"                element={<AdminCourseForm />} />
          <Route path="/admin/cours/:courseId/lecons"                  element={<AdminLessonsList />} />
          <Route path="/admin/cours/:courseId/lecons/nouvelle"         element={<AdminLessonForm />} />
          <Route path="/admin/cours/:courseId/lecons/:lessonId/modifier" element={<AdminLessonForm />} />
          <Route path="/admin/commentaires"                            element={<AdminComments />} />
          <Route path="/admin/etudiants"                               element={<AdminStudents />} />
          <Route path="/admin/paiements"                               element={<AdminPayments />} />
          {/* ── Fallback ─────────────────────────────────── */}
          <Route path="*"                                              element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
