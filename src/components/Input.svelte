<script>
export let name = '';
export let value = '';
</script>

<input bind:value name id={name} {...$$restProps} />

<style>
input {
    display: block;
    width: 100%;
    padding: 8px 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 8px;
    line-height: 2.2rem;
    color-scheme: light dark;
    background-color: transparent;
}

input::placeholder {
    color: var(--dimmed-500);
}
</style>
