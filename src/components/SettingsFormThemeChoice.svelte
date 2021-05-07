<script>
export let choice;
export let selected;
</script>

<p class:selected>
  <span data-value={choice.value} />
  {choice.label}
</p>

<style>
p {
  padding: 1.2rem;
  border: 2px solid transparent;
  border-radius: 8px;
  text-align: center;
}

p.selected {
  border-color: var(--primary);
}

span {
  position: relative;
  display: block;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 8px;
  background-color: var(--dimmed-300);
}

span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3px;
  border-radius: 50%;
  background-clip: content-box;
}

span[data-value='SYSTEM']::before {
  background-image: linear-gradient(to bottom right, var(--light), var(--light) 50%, var(--dark) 50%, var(--dark));
}

span[data-value='LIGHT']::before {
  background-color: var(--light);
}

span[data-value='DARK']::before {
  background-color: var(--dark);
}
</style>
