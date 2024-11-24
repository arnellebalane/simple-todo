<script>
let { choice, selected } = $props();
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
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
}

p.selected {
    border-color: var(--primary);
}

span {
    display: block;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--dimmed-500);
}
</style>
