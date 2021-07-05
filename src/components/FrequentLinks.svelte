<script>
export let links = [];
</script>

<div>
  <h3>Frequently Visited</h3>

  <ul>
    {#each links as link (link.url)}
      <li>
        <a href={link.url} rel="noopener noreferrer" data-tooltip={link.title}>
          <img src={link.icon} alt={link.title} />
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
h3 {
  margin-bottom: 4px;
  font-size: 1rem;
  line-height: 8px;
  text-transform: uppercase;
}

ul {
  display: flex;
  gap: 4px;

  padding: 0;
  list-style: none;
  overflow: auto;
}

li {
  border-radius: 4px;
}

a {
  display: block;
  width: 2.6rem;
  height: 2.6rem;
  padding: 4px;
}

img {
  display: block;
  height: 100%;
}

:global(body[data-background]) h3 {
  color: var(--light);
}

:global(body[data-background]) li {
  background-color: var(--main-transparent);
}
</style>
