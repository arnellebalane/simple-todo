<script>
export let tags = [];
</script>

<ul class={$$props.class}>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<style>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
  list-style: none;
}

ul:empty {
  display: none;
}

li {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dimmed-500);
  background-color: var(--dimmed-200);
}
</style>
