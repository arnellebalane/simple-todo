<script>
import { settings } from '@stores/settings';

$: image = $settings.backgroundImage;
$: isUnsplashImage = $settings.backgroundImage?.user_link;
</script>

<footer>
  <small>
    Built by <a href="https://arnellebalane.com" target="_blank" rel="noopener noreferrer">Arnelle Balane</a> &middot;
    <a href="https://github.com/arnellebalane/simple-todo" target="_blank" rel="noopener noreferrer">GitHub</a> &middot;
    <a href="https://twitter.com/simpletodoapp" target="_blank" rel="noopener norefeffer">Twitter</a>
  </small>

  {#if isUnsplashImage}
    <small>
      Photo by <a
        href="{image.user_link}?utm_source=simple-todo&utm_medium=referral "
        target="_blank"
        rel="noopener noreferrer">{image.user_name}</a
      >
      on
      <a
        href="https://unsplash.com?utm_source=simple-todo&utm_medium=referral "
        target="_blank"
        rel="noopener noreferrer">Unsplash</a
      >
    </small>
  {/if}
</footer>

<style>
footer {
  display: flex;
  justify-content: space-between;
  gap: 3.6rem;
  width: 100%;
  height: 5rem;
  padding: 1.4rem 3.6rem;
}

small {
  font-size: 1.4rem;
  color: var(--text-main);
}

:global(body[data-background]) small {
  color: var(--light);
}
</style>
