<script>
export let links = [];
</script>

<ul>
  {#each links as link (link.url)}
    <li>
      <a href={link.url} rel="noopener noreferrer" title={link.name}>
        <img src={link.image} alt={link.name} />
      </a>
    </li>
  {/each}
</ul>

<style>
ul {
  display: flex;
  gap: 8px;

  padding: 0;
  list-style: none;
}

li {
  border-radius: 8px;
}

a {
  display: block;
  width: 3.6rem;
  height: 3.6rem;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

:global(body[data-background]) li {
  background-color: var(--main-transparent);
}
</style>
