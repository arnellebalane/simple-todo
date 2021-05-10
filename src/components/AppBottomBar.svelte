<script>
import { settings } from '@stores/settings';

$: image = $settings.backgroundImage;
</script>

<footer>
  {#if image}
    <p>
      Photo by <a href={image.photo_link} target="_blank" rel="noopener noreferrer">{image.user_name}</a> on
      <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
    </p>
  {/if}
</footer>

<style>
footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 5rem;
  padding: 1.4rem 3.6rem;
}

p {
  font-size: 1.4rem;
  color: var(--light);
}
</style>
