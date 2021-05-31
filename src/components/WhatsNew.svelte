<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';
import { changelogs, setVersionIfHigher } from '@stores/changelogs';

const dispatch = createEventDispatcher();

$: screens = [
  ...$changelogs,
  {
    title: `You're now up to date!`,
    imageLight: './dist/assets/images/whats-new-empty-light.jpg',
    imageDark: './dist/assets/images/whats-new-empty-dark.jpg',
  },
];

let index = 0;
$: canPrevious = index > 0;
$: canNext = index < screens.length - 1;
$: if (screens[index].version) {
  setVersionIfHigher(screens[index].version);
}

const handlePrevious = () => (index = Math.max(index - 1, 0));
const handleNext = () => (index = Math.min(index + 1, screens.length - 1));
</script>

<h2>What's new in Simple Todo</h2>

{#each screens as screen, i}
  <article class:active={i === index}>
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
      icon
      small
      iconLight="./dist/assets/icons/chevron-left-light.svg"
      iconDark="./dist/assets/icons/chevron-left-dark.svg"
      class="PreviousButton"
      on:click={handlePrevious}
    >
      Previous
    </Button>
  {/if}

  <ul>
    {#each screens as screen, i}
      <li class:active={i === index} />
    {/each}
  </ul>

  {#if canNext}
    <Button
      icon
      small
      iconLight="./dist/assets/icons/chevron-right-light.svg"
      iconDark="./dist/assets/icons/chevron-right-dark.svg"
      class="NextButton"
      on:click={handleNext}
    >
      Next
    </Button>
  {:else}
    <Button primary small on:click={() => dispatch('close')}>Close</Button>
  {/if}
</footer>

<style>
h2 {
  margin-bottom: 1.6rem;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
}

article:not(.active) {
  display: none;
}

article h3 {
  margin-bottom: 2.4rem;
  font-size: 2.8rem;
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
