<script>
import Button from '@components/Button.svelte';

import WhatsNewImageDark from '@assets/images/whats-new-empty-dark.jpg';
import WhatsNewImageLight from '@assets/images/whats-new-empty-light.jpg';
import { icons } from '@lib/icons';
import { changelogs, setVersionIfHigher } from '../store';

let { onClose } = $props();

const screens = $derived([
    ...$changelogs,
    {
        title: `You're now up to date!`,
        imageLight: WhatsNewImageLight,
        imageDark: WhatsNewImageDark,
    },
]);

let index = $state(0);
const canPrevious = $derived(index > 0);
const canNext = $derived(index < screens.length - 1);
$effect(() => {
    if (screens[index].version) {
        setVersionIfHigher(screens[index].version);
    }
});

const handlePrevious = () => (index = Math.max(index - 1, 0));
const handleNext = () => (index = Math.min(index + 1, screens.length - 1));
</script>

<h2>What's new in Simple Todo</h2>

{#each screens as screen, i}
    <article class:active={i === index} data-testid="changelog-screen">
        <h3>{screen.title}</h3>
        <picture class="Image--light">
            <source srcset={screen.imageDark} media="(prefers-color-scheme: dark)" />
            <img src={screen.imageLight} alt={screen.title} />
        </picture>
    </article>
{/each}

<footer>
    {#if canPrevious}
        <Button
            small
            class="PreviousButton"
            data-testid="changelogs-previous-btn"
            iconLight={icons.chevronLeftLight}
            iconDark={icons.chevronLeftDark}
            onClick={handlePrevious}
        >
            Previous
        </Button>
    {/if}

    <ul>
        {#each screens as screen, i}
            <li class:active={i === index} data-testid="changelogs-page"></li>
        {/each}
    </ul>

    {#if canNext}
        <Button
            small
            class="NextButton"
            data-testid="changelogs-next-btn"
            iconLight={icons.chevronRightLight}
            iconDark={icons.chevronRightDark}
            onClick={handleNext}
        >
            Next
        </Button>
    {:else}
        <Button primary small onClick={onClose} data-testid="changelogs-close-btn">Close</Button>
    {/if}
</footer>

<style>
h2 {
    margin-bottom: 1.6rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
}

article:not(.active) {
    display: none;
}

article h3 {
    margin-bottom: 2.4rem;
    font-size: 2.6rem;
    font-weight: 600;
    text-align: center;
}

article img {
    display: flex;
    width: 100%;
    aspect-ratio: calc(500 / 300);
    border-radius: 8px;
}

footer {
    position: relative;
    display: flex;
    margin-top: 1.8rem;
}

footer :global(.PreviousButton) {
    margin-right: auto;
}

footer :global(.NextButton) {
    margin-left: auto;
}

ul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0;
    margin: 0 auto;
    list-style: none;
    pointer-events: none;
}

li {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--dimmed-300);
}

li.active {
    background-color: var(--inverted);
}
</style>
