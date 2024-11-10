<script>
let {
    children,
    primary = false,
    text = false,
    medium = false,
    small = false,
    class: componentClass,
    iconLight,
    iconDark,
    onClick,
    ...restProps
} = $props();

const icon = $derived(iconLight && iconDark);
const iconVariables = $derived(icon ? `--icon-light: url(${iconLight}); --icon-dark: url(${iconDark})` : '');
</script>

<button
    style={iconVariables}
    class={componentClass}
    class:primary
    class:text
    class:medium
    class:small
    class:icon
    onclick={onClick}
    {...restProps}
>
    {@render children?.()}
</button>

<style>
button {
    padding: 1.2rem 2.4rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    line-height: 2rem;
    background-color: var(--dimmed-300);
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

button.primary {
    background-color: var(--primary);
}

button.text {
    background: none;
}

button.medium,
button.small {
    padding: 8px 1.2rem;
    font-size: 1.3rem;
}

button.small {
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 6px;
}

button.icon {
    width: 4.4rem;
    height: 4.4rem;
    padding: 0;
    font-size: 0;
    background: transparent center center no-repeat;
    background-image: var(--icon-dark);
    background-size: 2.4rem;
}

button.icon.medium {
    width: 3.6rem;
    height: 3.6rem;
}

button.icon.small {
    width: 3.2rem;
    height: 3.2rem;
}

:global(body[data-background]) button.icon {
    background-color: var(--main-transparent);
}

:global(body[data-theme='DARK']) button.icon {
    background-image: var(--icon-light);
}

@media (prefers-color-scheme: dark) {
    button.icon {
        background-image: var(--icon-light);
    }

    :global(body[data-theme='LIGHT']) button.icon {
        background-image: var(--icon-dark);
    }
}
</style>
