<script>
export let choice;
export let selected;
</script>

<p class:selected>
  {choice.label}
  <span>{choice.subtext}</span>
</p>

<style>
p {
  padding: 1.2rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

p.selected {
  border-color: var(--primary);
}

span {
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
}
</style>
