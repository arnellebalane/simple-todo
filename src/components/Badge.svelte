<script>
export let variant = 'li';
export let icon = false;
export let iconLight = null;
export let iconDark = null;

$: iconVariables = icon ? `--icon-light: url(${iconLight}); --icon-dark: url(${iconDark})` : '';
</script>

{#if variant === 'li'}
    <li style={iconVariables} class:icon {...$$restProps}>
        {#if icon}
            <div><slot name="icon" /></div>
        {/if}
        <slot />
    </li>
{:else if variant === 'span'}
    <span style={iconVariables} class:icon {...$$restProps}>
        {#if icon}
            <div><slot name="icon" /></div>
        {/if}
        <slot />
    </span>
{/if}

<style>
li,
span {
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dimmed-500);
    background-color: var(--dimmed-200);
}

.icon {
    display: inline-flex;
    align-items: center;
}

.icon div {
    width: 1.4rem;
    height: 1.4rem;
    margin-left: -0.4rem;
    margin-right: 0.4rem;
    background: transparent center center no-repeat;
    background-size: 1.4rem;
    background-image: var(--icon-dark);
}
@media (prefers-color-scheme: dark) {
    .icon::before {
        background-image: var(--icon-light);
    }

    :global(body[data-theme='LIGHT']) .icon::before {
        background-image: var(--icon-dark);
    }
}
</style>
