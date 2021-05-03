<script>
export let title;
export let done;
export let total;
</script>

<header>
  <h1>{title}</h1>
  <p>{done}<span>/{total}</span></p>
</header>

<style>
header {
  display: flex;
  align-items: baseline;
}

h1 {
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: 500;
}

p {
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.5rem;
  background-color: #34d399;
}
</style>
