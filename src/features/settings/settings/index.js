import MiscellaneousSettings from './MiscellaneousSettings.svelte';

export const id = 'MISCELLANEOUS';
export const label = 'Miscellaneous';
export const component = MiscellaneousSettings;

export const getDefaultSettings = () => ({
    enablePrivacyMode: false,
});
export const allowedFields = ['enablePrivacyMode'];
