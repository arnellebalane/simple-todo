<script>
import Modal from '@components/Modal.svelte';

export let show;

const updates = [
  {
    title: 'Keyboard Shortcuts',
    imageLight: './whats-new/keyboard-shortcuts-light.jpg',
    imageDark: './whats-new/keyboard-shortcuts-dark.jpg',
  },
];
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close>
  <h2>What's new in Simple Todo</h2>

  {#each updates as update}
    <article>
      <h3>{update.title}</h3>
      <picture class="Image--light">
        <source srcset={update.imageDark} media="(prefers-color-scheme: dark)" />
        <img src={update.imageLight} alt={update.title} />
      </picture>
    </article>
  {/each}
</Modal>

<style>
h2 {
  margin-bottom: 1.6rem;
  font-size: 1.6rem;
  text-align: center;
}

article h3 {
  margin-bottom: 2.4rem;
  font-size: 2.8rem;
  text-align: center;
}

article img {
  display: flex;
  width: 100%;
  border-radius: 8px;
}
</style>
