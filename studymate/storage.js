// utils/storage.js

export const storage = {
  // User Profile
  saveProfile: (profile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },
  
  getProfile: () => {
    const data = localStorage.getItem('userProfile');
    return data ? JSON.parse(data) : null;
  },
  
  // Study Plan
  savePlan: (plan) => {
    localStorage.setItem('studyPlan', JSON.stringify(plan));
  },
  
  getPlan: () => {
    const data = localStorage.getItem('studyPlan');
    return data ? JSON.parse(data) : null;
  },
  
  // Settings
  updateSettings: (settings) => {
    const profile = storage.getProfile();
    const updated = { ...profile, ...settings };
    storage.saveProfile(updated);
  },
  
  // Progress
  markDayComplete: (dayNumber) => {
    const progress = storage.getProgress() || { completedDays: [] };
    if (!progress.completedDays.includes(dayNumber)) {
      progress.completedDays.push(dayNumber);
    }
    localStorage.setItem('progress', JSON.stringify(progress));
  },
  
  getProgress: () => {
    const data = localStorage.getItem('progress');
    return data ? JSON.parse(data) : { completedDays: [], studyHours: 0 };
  },
  
  // Clear all (for testing)
  clearAll: () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('studyPlan');
    localStorage.removeItem('progress');
  }
};