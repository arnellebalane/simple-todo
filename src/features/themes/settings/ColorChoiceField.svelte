<script>
let { choice, selected } = $props();
</script>

<p class:selected>
    <span data-value={choice.value}></span>
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
    display: block;
    width: 3.6rem;
    height: 3.6rem;
    border: 3px solid var(--dimmed-300);
    border-radius: 50%;
    margin: auto;
}

span[data-value='GREEN'] {
    background-color: var(--green);
}

span[data-value='YELLOW'] {
    background-color: var(--yellow);
}

span[data-value='BLUE'] {
    background-color: var(--blue);
}

span[data-value='PURPLE'] {
    background-color: var(--purple);
}

span[data-value='PINK'] {
    background-color: var(--pink);
}
</style>
