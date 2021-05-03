<script>
export let primary;
export let text;
</script>

<button {...$$props} class:primary class:text on:click>
  <slot />
</button>

<style>
button {
  padding: 1.2rem 2.4rem;
  border: none;
  border-radius: 1.6rem;
  font-weight: 500;
  background-color: #e5e7eb;
  cursor: pointer;
}

button.primary {
  background-color: #34d399;
}

button.text {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  background: none;
}
</style>
