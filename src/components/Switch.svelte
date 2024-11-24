<script>
let { name, checked, onChange, ...restProps } = $props();
</script>

<label class:checked>
    <input
        {name}
        bind:checked
        id={name}
        type="checkbox"
        onchange={(event) => onChange?.(event.target.checked)}
        {...restProps}
    />
    <span></span>
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
