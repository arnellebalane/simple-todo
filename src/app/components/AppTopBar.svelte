<script>
import { onDestroy, onMount } from 'svelte';

import Button from '@components/Button.svelte';
import WhatsNewButton from '@features/changelogs/components/WhatsNewButton.svelte';
import WhatsNewModal from '@features/changelogs/components/WhatsNewModal.svelte';
import FrequentLinks from '@features/quick-links/components/FrequentLinks.svelte';
import QuickLinks from '@features/quick-links/components/QuickLinks.svelte';
import SettingsFormModal from '@features/settings/components/SettingsFormModal.svelte';

import ChromeWebStoreImage from '@assets/images/chrome-webstore.png';
import { changelogs, version } from '@features/changelogs/store';
import { frequentLinks } from '@features/quick-links/store';
import { settings } from '@features/settings/store';
import { disableShortcut, enableShortcut } from '@features/shortcuts';
import { tags } from '@features/tags/store';
import { config } from '@lib/config';
import { APP_VERSION } from '@lib/constants';
import { icons } from '@lib/icons';

const hasChangeLogs = $derived($changelogs.length > 0);
const hasSeenChangeLogs = $derived($version === APP_VERSION);
const hasQuickLinks = $derived($settings.quickLinks?.length ?? 0 > 0);
const showFrequentLinks = $derived($frequentLinks.length > 0 && $settings.showFrequentLinks);

const showChromeWebstoreButton = config.VITE_PUBLIC_IS_WEB_BUILD === 'true';

let showWhatsNewModal = $state(false);
const toggleWhatsNewModal = (show) => (showWhatsNewModal = show);

let settingsUnsubscribe = $state(null);
let settingsFormData = $state({});
let showSettingsFormModal = $state(false);
const toggleSettingsFormModal = (show) => {
    showSettingsFormModal = show;
    if (show) {
        settingsUnsubscribe = settings.subscribe((value) => {
            settingsFormData = value;
        });
        settings.preview($settings);
    } else {
        settingsUnsubscribe();
        settingsFormData = {};
    }
};

const handleSettingsSubmit = (data) => {
    settings.save(data);
    tags.save();
    toggleSettingsFormModal(false);
};
const handleSettingsClose = () => {
    settings.restore();
    tags.restore();
    toggleSettingsFormModal(false);
};

onMount(() => enableShortcut('togglePrivacyMode', settings.togglePrivacyMode));
onDestroy(() => disableShortcut('togglePrivacyMode'));
</script>

<header>
    <div class="LeftColumn">
        {#if hasQuickLinks}
            <QuickLinks links={$settings.quickLinks} />
        {/if}
        {#if showFrequentLinks}
            <FrequentLinks links={$frequentLinks} />
        {/if}
    </div>

    <div class="RightColumn">
        {#if hasChangeLogs}
            <WhatsNewButton pulse={!hasSeenChangeLogs} onClick={() => toggleWhatsNewModal(true)} />
        {/if}
        <Button
            medium
            iconLight={icons.settingsLight}
            iconDark={icons.settingsDark}
            onClick={() => toggleSettingsFormModal(true)}
            data-cy="settings-btn"
        >
            Settings
        </Button>

        {#if showChromeWebstoreButton}
            <a
                href="https://chrome.google.com/webstore/detail/simple-todo/kobeijgkgkcgknodjkganceliljepmjf/"
                rel="noopener noreferrer"
                class="umami--click--chrome-webstore-link"
                data-cy="chrome-webstore-link"
            >
                <img src={ChromeWebStoreImage} alt="Available in the Chrome Webstore" width="150" height="42" />
            </a>
        {/if}
    </div>
</header>

<SettingsFormModal
    show={showSettingsFormModal}
    data={settingsFormData}
    onChange={settings.preview}
    onSubmit={handleSettingsSubmit}
    onClose={handleSettingsClose}
/>

<WhatsNewModal show={showWhatsNewModal} onClose={() => toggleWhatsNewModal(false)} />

<style>
header {
    display: flex;
    gap: 3.6rem;
    width: 100%;
    height: 6.4rem;
    padding: 1.4rem 3.6rem;
}

div {
    flex: 1 0 0;
    display: flex;
    align-items: center;
}

.LeftColumn {
    justify-content: flex-start;
    gap: 3.6rem;
}

.RightColumn {
    justify-content: flex-end;
    gap: 8px;
}

img {
    display: block;
    max-height: 4.2rem;
    margin-left: 1.2rem;
}
</style>
