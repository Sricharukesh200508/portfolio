require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Certification.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Admin User
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const passwordHash = await bcrypt.hash(adminPass, 12);
    await User.create({ username: process.env.ADMIN_USERNAME || 'admin', passwordHash });
    console.log('👤 Admin user created');

    // Seed Profile
    await Profile.create({
      name: 'Sri Charukesh N',
      tagline: 'AI Engineer · ML Researcher · LLM Systems Builder',
      bio: `I'm Sri Charukesh N, an AI & ML engineer pursuing my B.Tech at SRM Institute of Science and Technology, Tiruchirappalli. I build intelligent systems that bridge cutting-edge research with production-grade software. My work spans LLM-integrated pipelines, computer vision with YOLOv8, explainable AI with SHAP, and cloud-native deployments on GCP. I believe AI should be transparent, interpretable, and impactful — not just accurate. When I'm not engineering models, I'm contributing to research: my work on intrusion detection was accepted at ICICC-2026 (Springer LNNS, Scopus Indexed).`,
      email: 'sricharu73@gmail.com',
      linkedin: 'https://linkedin.com/in/sri-charu-kesh',
      github: 'https://github.com/Sricharukesh200508',
      college: 'SRM Institute of Science and Technology, Tiruchirappalli',
      degree: 'B.Tech — Computer Science (AI & ML Specialisation)',
      cgpa: '8.6 / 10.0',
      expectedGraduation: 'May 2027'
    });
    console.log('📋 Profile created');

    // Seed Projects
    await Project.insertMany([
      {
        title: 'Customer Churn Prediction System',
        description: 'An end-to-end ML pipeline for predicting customer churn with SHAP-based explainable AI. Features real-time inference via FastAPI, containerized deployment on GCP Cloud Run, and an interactive SHAP dashboard for model transparency. Research paper accepted at ICICC 2026 (Springer LNNS, Scopus Indexed).',
        techStack: ['Python', 'XGBoost', 'FastAPI', 'GCP', 'Docker', 'SHAP', 'Cloud Run'],
        category: 'ML',
        githubUrl: 'https://github.com/Sricharukesh200508',
        liveUrl: '',
        featured: true,
        hasPublication: true,
        publicationName: 'ICICC 2026 — Springer LNNS, Scopus Indexed',
        order: 1
      },
      {
        title: 'SaaS Client Metrics & Analytics Dashboard',
        description: 'Multi-tenant analytics platform for SaaS businesses. Built with FastAPI and MySQL, containerized with Docker, and deployed on GCP. Achieved 25% query time reduction through optimized indexing and caching strategies. Supports multiple client workspaces with isolated data pipelines.',
        techStack: ['Python', 'FastAPI', 'MySQL', 'Docker', 'GCP', 'REST APIs'],
        category: 'Web',
        githubUrl: 'https://github.com/Sricharukesh200508',
        liveUrl: '',
        featured: true,
        hasPublication: false,
        order: 2
      },
      {
        title: 'AI-Based Hybrid Crowd Analytics System',
        description: 'Hybrid deep learning system combining YOLOv8 for object detection and CSRNet for density estimation, enabling real-time crowd density analysis and anomaly detection. Uses OpenCV for video stream processing with 30+ FPS performance on GPU hardware.',
        techStack: ['Python', 'PyTorch', 'YOLOv8', 'CSRNet', 'OpenCV', 'CUDA'],
        category: 'Computer Vision',
        githubUrl: 'https://github.com/Sricharukesh200508',
        liveUrl: '',
        featured: true,
        hasPublication: false,
        order: 3
      }
    ]);
    console.log('🚀 Projects seeded');

    // Seed Experience
    await Experience.insertMany([
      {
        company: 'Beau Roi Technologies Pvt. Ltd',
        role: 'AI & Web Development Intern',
        duration: 'Jan 2026 – Jun 2026',
        startDate: 'January 2026',
        endDate: 'June 2026',
        location: 'Remote, India',
        type: 'internship',
        bullets: [
          'Built scalable AI-powered SaaS services using Python, FastAPI, and MySQL',
          'Debugged live production APIs and conducted root cause analysis with documented findings',
          'Contributed to LLM-integrated pipelines and automated alerting systems',
          'Collaborated on multi-tenant architecture design for cloud-native deployments'
        ],
        order: 1
      },
      {
        company: 'Witspire',
        role: 'Full Stack Developer Intern',
        duration: 'Dec 2024',
        startDate: 'December 2024',
        endDate: 'December 2024',
        location: 'Trichy, Tamil Nadu',
        type: 'internship',
        bullets: [
          'Developed Python and MySQL backend services for web applications',
          'Built and debugged REST APIs following industry best practices',
          'Worked in an agile team environment delivering features under tight deadlines'
        ],
        order: 2
      }
    ]);
    console.log('💼 Experience seeded');

    // Seed Skills
    await Skill.insertMany([
      // Languages
      { name: 'Python', category: 'Languages', proficiency: 95, icon: '🐍', order: 1 },
      { name: 'SQL', category: 'Languages', proficiency: 82, icon: '🗄️', order: 2 },
      { name: 'C', category: 'Languages', proficiency: 70, icon: '⚙️', order: 3 },
      // AI/ML
      { name: 'Machine Learning', category: 'AI/ML', proficiency: 90, icon: '🧠', order: 1 },
      { name: 'XGBoost', category: 'AI/ML', proficiency: 88, icon: '🌲', order: 2 },
      { name: 'PyTorch', category: 'AI/ML', proficiency: 85, icon: '🔥', order: 3 },
      { name: 'YOLOv8', category: 'AI/ML', proficiency: 85, icon: '👁️', order: 4 },
      { name: 'Computer Vision', category: 'AI/ML', proficiency: 83, icon: '🔭', order: 5 },
      { name: 'NLP', category: 'AI/ML', proficiency: 80, icon: '💬', order: 6 },
      // LLMs
      { name: 'LLMs', category: 'LLMs', proficiency: 82, icon: '🤖', order: 1 },
      { name: 'AI Agents', category: 'LLMs', proficiency: 78, icon: '🕵️', order: 2 },
      { name: 'Prompt Engineering', category: 'LLMs', proficiency: 88, icon: '✍️', order: 3 },
      { name: 'SHAP / XAI', category: 'LLMs', proficiency: 85, icon: '🔍', order: 4 },
      // Cloud
      { name: 'GCP', category: 'Cloud', proficiency: 80, icon: '☁️', order: 1 },
      { name: 'Docker', category: 'Cloud', proficiency: 85, icon: '🐳', order: 2 },
      { name: 'CI/CD', category: 'Cloud', proficiency: 75, icon: '🔄', order: 3 },
      { name: 'AWS (Basic)', category: 'Cloud', proficiency: 60, icon: '🌩️', order: 4 },
      // Web
      { name: 'FastAPI', category: 'Web', proficiency: 88, icon: '⚡', order: 1 },
      { name: 'REST APIs', category: 'Web', proficiency: 90, icon: '🔗', order: 2 },
      { name: 'HTML/CSS/JS', category: 'Web', proficiency: 78, icon: '🌐', order: 3 },
      // Databases
      { name: 'MySQL', category: 'Databases', proficiency: 85, icon: '🐬', order: 1 },
      { name: 'MongoDB', category: 'Databases', proficiency: 80, icon: '🍃', order: 2 },
      // Tools
      { name: 'NumPy / Pandas', category: 'Tools', proficiency: 92, icon: '📊', order: 1 },
      { name: 'Git', category: 'Tools', proficiency: 88, icon: '🔀', order: 2 },
      { name: 'Jupyter', category: 'Tools', proficiency: 90, icon: '📓', order: 3 }
    ]);
    console.log('⚡ Skills seeded');

    // Seed Certifications
    await Certification.insertMany([
      {
        name: 'Generative AI & NLP',
        issuer: 'IBM / Coursera',
        date: '2025',
        credentialUrl: 'https://coursera.org',
        skills: ['Generative AI', 'NLP', 'Transformers', 'LLMs']
      },
      {
        name: 'Google Cloud AI Infrastructure',
        issuer: 'Google / Coursera',
        date: '2025',
        credentialUrl: 'https://coursera.org',
        skills: ['GCP', 'Vertex AI', 'Cloud Run', 'AI Infrastructure']
      },
      {
        name: 'Google Cloud Computing Foundations',
        issuer: 'NPTEL Elite',
        date: '2024',
        credentialUrl: 'https://nptel.ac.in',
        skills: ['Cloud Computing', 'GCP', 'Networking']
      },
      {
        name: 'Database Management Essentials',
        issuer: 'University of Colorado / Coursera',
        date: '2024',
        credentialUrl: 'https://coursera.org',
        skills: ['SQL', 'Database Design', 'Query Optimization']
      },
      {
        name: 'Computer Networks & Network Security',
        issuer: 'IBM',
        date: '2024',
        credentialUrl: 'https://coursera.org',
        skills: ['Networking', 'Cybersecurity', 'Protocols']
      },
      {
        name: 'AI & ML Workshop',
        issuer: 'IIT Madras — Mechanica',
        date: '2025',
        credentialUrl: '',
        skills: ['Machine Learning', 'Deep Learning', 'AI Research']
      }
    ]);
    console.log('🏆 Certifications seeded');

    console.log('\n✅ ===== DATABASE SEEDING COMPLETE =====');
    console.log(`🔐 Admin Login: username="${process.env.ADMIN_USERNAME || 'admin'}", password="${process.env.ADMIN_PASSWORD || 'Admin@123456'}"`);
    console.log('🌐 Visit /admin to access the admin panel\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
