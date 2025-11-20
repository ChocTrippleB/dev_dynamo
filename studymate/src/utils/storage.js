// Centralized localStorage management

export const storage = {
  // User Profile
  saveProfile: (profile) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  },

  getProfile: () => {
    try {
      const data = localStorage.getItem('userProfile');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load profile:', e);
      return null;
    }
  },

  // Settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem('settings');
      return data ? JSON.parse(data) : {
        language: 'english',
        difficulty: 'medium',
        voiceEnabled: false,
        learningStyles: []
      };
    } catch (e) {
      console.error('Failed to load settings:', e);
      return {
        language: 'english',
        difficulty: 'medium',
        voiceEnabled: false,
        learningStyles: []
      };
    }
  },

  // Study Plan
  savePlan: (plan) => {
    try {
      localStorage.setItem('studyPlan', JSON.stringify(plan));
    } catch (e) {
      console.error('Failed to save plan:', e);
    }
  },

  getPlan: () => {
    try {
      const data = localStorage.getItem('studyPlan');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load plan:', e);
      return null;
    }
  },

  // Subjects
  saveSubjects: (subjects) => {
    const profile = storage.getProfile() || {};
    profile.subjects = subjects;
    storage.saveProfile(profile);
  },

  getSubjects: () => {
    const profile = storage.getProfile();
    return profile?.subjects || [];
  },

  // Exam Dates
  addExam: (exam) => {
    try {
      const exams = storage.getExams();
      exams.push({ ...exam, id: Date.now() });
      localStorage.setItem('exams', JSON.stringify(exams));
    } catch (e) {
      console.error('Failed to add exam:', e);
    }
  },

  removeExam: (id) => {
    try {
      const exams = storage.getExams();
      const filtered = exams.filter(exam => exam.id !== id);
      localStorage.setItem('exams', JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to remove exam:', e);
    }
  },

  getExams: () => {
    try {
      const data = localStorage.getItem('exams');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load exams:', e);
      return [];
    }
  },

  // Stats
  updateStats: (stats) => {
    try {
      localStorage.setItem('stats', JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to update stats:', e);
    }
  },

  getStats: () => {
    try {
      const data = localStorage.getItem('stats');
      return data ? JSON.parse(data) : {
        questionsAsked: 0,
        studyHours: 0,
        topicsCompleted: 0,
        averageScore: 0
      };
    } catch (e) {
      console.error('Failed to load stats:', e);
      return {
        questionsAsked: 0,
        studyHours: 0,
        topicsCompleted: 0,
        averageScore: 0
      };
    }
  },

  incrementStat: (key, amount = 1) => {
    const stats = storage.getStats();
    stats[key] = (stats[key] || 0) + amount;
    storage.updateStats(stats);
  },

  // Progress
  markDayComplete: (dayNumber) => {
    try {
      const progress = storage.getProgress();
      if (!progress.completedDays.includes(dayNumber)) {
        progress.completedDays.push(dayNumber);
      }
      localStorage.setItem('progress', JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to mark day complete:', e);
    }
  },

  getProgress: () => {
    try {
      const data = localStorage.getItem('progress');
      return data ? JSON.parse(data) : {
        completedDays: [],
        studyHours: 0
      };
    } catch (e) {
      console.error('Failed to load progress:', e);
      return {
        completedDays: [],
        studyHours: 0
      };
    }
  },

  // Authentication
  register: (userData) => {
    try {
      // Save user credentials
      const users = storage.getUsers();

      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        return { success: false, error: 'User already exists' };
      }

      // Add new user
      users.push({
        id: Date.now(),
        email: userData.email,
        password: userData.password, // In production, hash this!
        name: userData.name,
        grade: userData.grade,
        subjects: userData.subjects || [],
        examFocus: userData.examFocus || '',
        textLanguage: userData.textLanguage || 'english',
        voiceLanguage: userData.voiceLanguage || 'english',
        learningStyles: userData.learningStyles || [],
        saveQA: userData.saveQA || false,
        voiceInput: userData.voiceInput || false,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('users', JSON.stringify(users));
      return { success: true };
    } catch (e) {
      console.error('Registration failed:', e);
      return { success: false, error: 'Registration failed' };
    }
  },

  login: (email, password) => {
    try {
      const users = storage.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Save as profile
        storage.saveProfile({
          name: user.name,
          grade: user.grade,
          subjects: user.subjects
        });
        // Save user settings
        storage.saveSettings({
          language: user.textLanguage || 'english',
          difficulty: 'medium', // Default, can be changed later
          voiceEnabled: user.voiceInput || false,
          learningStyles: user.learningStyles || []
        });
        return { success: true, user };
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (e) {
      console.error('Login failed:', e);
      return { success: false, error: 'Login failed' };
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('currentUser');
      return { success: true };
    } catch (e) {
      console.error('Logout failed:', e);
      return { success: false };
    }
  },

  getCurrentUser: () => {
    try {
      const data = localStorage.getItem('currentUser');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get current user:', e);
      return null;
    }
  },

  isAuthenticated: () => {
    return storage.getCurrentUser() !== null;
  },

  getUsers: () => {
    try {
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load users:', e);
      return [];
    }
  },

  // Clear all
  clearAll: () => {
    try {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('studyPlan');
      localStorage.removeItem('progress');
      localStorage.removeItem('settings');
      localStorage.removeItem('exams');
      localStorage.removeItem('stats');
      localStorage.removeItem('users');
      localStorage.removeItem('currentUser');
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
};
