import QuickLinksSettings from './QuickLinksSettings.svelte';

export const id = 'QUICK_LINKS';
export const label = 'Quick Links';
export const component = QuickLinksSettings;

export const defaultSettings = {
  quickLinks: [],
  showFrequentLinks: false,
};
export const allowedFields = ['quickLinks', 'showFrequentLinks'];
