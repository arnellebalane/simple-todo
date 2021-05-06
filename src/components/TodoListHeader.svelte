<script>
export let title;
export let done;
export let total;

$: isEmpty = total === 0;
</script>

<header class={$$props.class}>
  <h1>{title}</h1>

  {#if !isEmpty}
    <p>{done}<span>/{total}</span></p>
  {/if}
</header>

<style>
header {
  display: flex;
  align-items: baseline;
}

h1 {
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: 700;
}

p {
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.5rem;
  background-color: var(--primary);
}
</style>
