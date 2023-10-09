<script>
import { onMount, onDestroy } from 'svelte';

import { APP_VERSION } from '@lib/constants';
import { config } from '@lib/config';
import { icons } from '@lib/icons';
import { enableShortcut, disableShortcut } from '@features/shortcuts';
import { settings } from '@features/settings/store';
import { changelogs, version } from '@features/changelogs/store';
import { tags } from '@features/tags/store';
import { frequentLinks } from '@features/quick-links/store';

import Button from '@components/Button.svelte';
import SettingsFormModal from '@features/settings/components/SettingsFormModal.svelte';
import WhatsNewModal from '@features/changelogs/components/WhatsNewModal.svelte';
import WhatsNewButton from '@features/changelogs/components/WhatsNewButton.svelte';
import QuickLinks from '@features/quick-links/components/QuickLinks.svelte';
import FrequentLinks from '@features/quick-links/components/FrequentLinks.svelte';

import ChromeWebStoreImage from '@assets/images/chrome-webstore.png';

let settingsUnsubscribe = null;
let settingsFormData = {};
let showSettingsForm = false;
const toggleSettingsForm = (show) => {
    showSettingsForm = show;
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

let showWhatsNewModal = false;
const toggleWhatsNewModal = (show) => (showWhatsNewModal = show);
$: hasChangeLogs = $changelogs.length > 0;
$: hasSeenChangeLogs = $version === APP_VERSION;

$: hasQuickLinks = $settings.quickLinks?.length ?? 0 > 0;
$: showFrequentLinks = $frequentLinks.length > 0 && $settings.showFrequentLinks;

const showChromeWebstoreButton = config.VITE_PUBLIC_IS_WEB_BUILD === 'true';

const handleSettingsChange = (event) => settings.preview(event.detail);
const handleSettingsSubmit = (event) => {
    settings.save(event.detail);
    tags.save();
    toggleSettingsForm(false);
};
const handleSettingsClose = () => {
    settings.restore();
    tags.restore();
    toggleSettingsForm(false);
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
            <WhatsNewButton pulse={!hasSeenChangeLogs} on:click={() => toggleWhatsNewModal(true)} />
        {/if}
        <Button
            icon
            medium
            iconLight={icons.settingsLight}
            iconDark={icons.settingsDark}
            on:click={() => toggleSettingsForm(true)}
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
    show={showSettingsForm}
    data={settingsFormData}
    on:change={handleSettingsChange}
    on:submit={handleSettingsSubmit}
    on:close={handleSettingsClose}
/>

<WhatsNewModal show={showWhatsNewModal} on:close={() => toggleWhatsNewModal(false)} />

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
