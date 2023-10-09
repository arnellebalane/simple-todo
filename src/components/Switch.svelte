<script>
export let value;
</script>

<label class:checked={value}>
    <input type="checkbox" bind:checked={value} id={$$props.name} {...$$restProps} on:change />
    <span />
</label>

<style>
label {
    position: relative;
    width: 3.8rem;
    padding: 3px;
    border-radius: 2rem;
    background-color: var(--dimmed-300);
    cursor: pointer;
}

label.checked {
    background-color: var(--primary-faded);
}

span {
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background-color: var(--main);
    transition: transform 150ms ease;
}

label.checked span {
    background-color: var(--primary);
    transform: translateX(100%);
}

input {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0);
    opacity: 0;
}
</style>
