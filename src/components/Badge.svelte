<script>
let { variant = 'li', icon, children, ...restProps } = $props();
</script>

<svelte:element this={variant} class="Badge" class:icon {...restProps}>
    {#if icon}
        <span>{@render icon()}</span>
    {/if}
    {@render children?.()}
</svelte:element>

<style>
.Badge {
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dimmed-500);
    background-color: var(--dimmed-200);
}

.Badge.icon {
    display: inline-flex;
    align-items: center;
}

.Badge.icon span {
    width: 1.4rem;
    height: 1.4rem;
    margin-left: -0.4rem;
    margin-right: 0.4rem;
    background: transparent center center no-repeat;
    background-size: 1.4rem;
    background-image: var(--icon-dark);
}
</style>
