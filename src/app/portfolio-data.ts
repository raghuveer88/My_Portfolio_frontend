export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  name: string;
  date: string;
  description: string;
  technologies: string[];
  award?: string;
  image: string;
  repo?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  result: string;
  description: string;
  icon: string; // FontAwesome icon class, e.g. "fa-trophy"
}

export const PORTFOLIO = {
  person: {
    name: 'Raghuveer Draksharam',
    tagline: 'Software Engineer & AI/ML Enthusiast'
  },
  experiences: [
    {
    company: 'Kloudspot',
    role: 'Machine Learning Engineer Intern',
    location: 'Sunnyvale, CA',
    period: 'Jun 2025 – Jul 2025',
    achievements: [
      
    ],
    technologies: ['Python', 'LightGBM', 'FastAPI', 'Angular', 'MLflow', 'GitHub Actions', 'Machine Learning']
  },
  {
    company: 'Clarivate',
    role: 'Machine Learning Intern',
    location: 'Noida, India',
    period: 'Jan 2022 – Jun 2022',
    achievements: [

    ],
    technologies: ['Python', 'Pandas', 'PyTorch', 'BERT', 'Transformers']
  },
  {
    company: 'ADP, Inc.',
    role: 'Software Engineer',
    location: 'Hyderabad, India',
    period: 'Jul 2022 – Jul 2024',
    achievements: [

    ],
    technologies: ['Angular','python', 'Spring Boot', 'MySQL', 'Git', 'Jira', 'CI/CD']
  }
  ] as Experience[],
  projects: [
    {
    name: 'AI Knowledge Worker (RAG Assistant)',
    date: '2025',
    description:
      'Built a RAG-based document assistant that ingests company docs, generates embeddings, and stores them in ChromaDB for similarity-based retrieval. Implemented chunking, retrieval, and prompt-grounded generation to answer questions with document context via a Gradio chat UI.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'HuggingFace Embeddings', 'Gradio'],
    award: 'Personal Project',
    image: 'assets/rag_img.png',
    repo: 'https://github.com/raghuveer88/RAG_for_documents'
  },
  {
    name: 'LLM Fine-Tuned Price Prediction',
    date: '2025',
    description:
      'Fine-tuned Llama-3.2-3B to predict product prices from short descriptions using a 200K-item dataset with a prompt–completion training pipeline and QLoRA. Built preprocessing, tokenization, and evaluation workflows to compare fine-tuned outputs against baseline frontier-model predictions.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'HuggingFace', 'QLoRA', 'Llama-3.2-3B'],
    award: 'Course Project',
    image: 'assets/fine_tune_llm.png',
    repo: 'https://github.com/raghuveer88/QLORA-Price-prredictor'
  },
  {
    name: 'Jokes Meet AI',
    date: '2025',
    description:
      'Built an NLP pipeline to embed 1M+ jokes using Sentence-BERT and discover humor groupings with HDBSCAN using preprocessing (tokenization, lemmatization, normalization). Reduced the embedding space with UMAP to surface 15 humor categories, then improved classification with a fine-tuned DistilBERT model (83.1% accuracy).',
    technologies: ['Python', 'Sentence-BERT', 'HDBSCAN', 'UMAP', 'DistilBERT', 'Transformers'],
    award: 'Data Science Course Project',
    image: 'assets/jokes_meet_ai.png',
    repo: 'https://github.com/raghuveer88/Joke-Clustering-and-Predictions/tree/main'
  },
  {
    name: 'Student-Faculty Discussion Forum & Availability Tracker',
    date: '2021',
    description:
      'Developed a MERN app for real-time faculty availability and student discussions using WebSockets, reducing student wait times from hours to minutes through live status updates and collaborative threads.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    award: 'Campus Project',
    image: 'assets/student_faculty_form.png'
  },
  {
    name: 'Rental Bike Tracking System',
    date: '2021',
    description:
      'Built a mobile + web bike rental platform with location selection, fare estimation, secure payments, and route optimization. Integrated Google Maps APIs and implemented a secure virtual wallet for transactions.',
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
    award: 'Campus Project',
    image: 'assets/bike_rental.png'
  },
  {
    name: 'Hybrid DASH + P2P Video Delivery',
    date: '2025',
    image: 'assets/dash.png',
    description:
      'Built a browser-based prototype combining MPEG-DASH adaptive streaming with a WebRTC peer mesh where peers exchange video segments while preserving ABR; designed instant CDN fallback to maintain consistent QoS under churn.',
    technologies: ['MPEG-DASH', 'WebRTC', 'JavaScript', 'Node.js', 'Express', 'Socket.IO', 'ABR', 'Segment Scheduler'],
    award: 'Campus Project',
    repo: 'https://github.com/raghuveer88/Collaborative-Video-Delivey-Merging-Dash-and-P2P'
  },
  {
    name: 'Shell in C',
    date: '2025',
    image: 'assets/shell_in_c.png',
    description:
      'Implemented a Unix-style shell in C with robust parsing, history recall, foreground/background execution, and job control built on fork/exec; added signal-safe handling (SIGCHLD/SIGINT) for reliable process management.',
    technologies: ['C', 'POSIX', 'fork/exec', 'signals', 'job control', 'parsing'],
    award: 'Campus Project',
    repo: 'https://github.com/raghuveer88/Shell-in-c'
  },
  {
    name: 'ICC 2019 World Cup – Match Prediction',
    date: '2019',
    image: 'assets/cricket_world_cup.png',
    description:
      'Built an end-to-end ML pipeline to predict ICC 2019 match winners with calibrated probabilities using engineered features (Elo, recent form, head-to-head, venue/toss). Benchmarked LR/GB/RF with time-series validation and ran Monte Carlo simulations to estimate tournament advancement odds.',
    technologies: ['Python', 'pandas', 'scikit-learn', 'Elo', 'logistic regression', 'gradient boosting', 'random forest', 'calibration', 'Monte Carlo'],
    award: 'Campus Project',
    repo: 'https://github.com/raghuveer88/ICC-2019-WC-prediction'
  }
  ] as Project[],
  skills: [
    {
    category: 'Programming Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C', 'Go', 'SQL']
    },
    {
    category: 'Frameworks & Development',
    items: ['Angular', 'React', 'Node.js', 'Express', 'Spring Boot', 'FastAPI', 'Tailwind CSS']
    },
    {
    category: 'AI/ML & Data',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'HuggingFace', 'LangChain', 'OpenAI API', 'Pandas', 'NumPy', 'PySpark', 'Matplotlib', 'Seaborn']
    },
    {
    category: 'Databases, Cloud & Tools',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'ChromaDB', 'AWS', 'Docker', 'Kubernetes', 'Linux', 'Git', 'Jira', 'Jenkins', 'Selenium', 'CI/CD']
    }
  ] as SkillCategory[],
  achievements: [
    { title: 'Hackathon Finalist', result: '3rd Place', description: 'Built a hybrid movie recommender in 24 hours (CF + content); selected as a finalist', icon: 'fa-trophy' },
    { title: 'National Level U‑16 Cricket Player', result: 'Captain & Club Head', description: 'Represented Andhra Pradesh in national tournaments and led the university cricket team to a 75% win rate.', icon: 'fa-medal' }
  ] as Achievement[]
};
