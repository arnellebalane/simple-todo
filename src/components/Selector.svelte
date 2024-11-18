<script>
let {
    name,
    value = $bindable(),
    choices,
    disabled = false,
    choiceComponent: ChoiceComponent,
    class: componentClass,
    onChange,
    ...restProps
} = $props();
</script>

<div class={componentClass} class:background={!ChoiceComponent} {...restProps}>
    {#each choices as choice}
        <label class:disabled>
            <input
                {name}
                {disabled}
                type="radio"
                bind:group={value}
                value={choice.value}
                onchange={(event) => onChange?.(event.target.value)}
                aria-label={choice.label}
            />

            {#if ChoiceComponent}
                <ChoiceComponent {choice} selected={choice.value === value} />
            {:else}
                <span class:selected={choice.value === value}>{choice.label}</span>
            {/if}
        </label>
    {/each}
</div>

<style>
div {
    display: flex;
    gap: 2px;
    border-radius: 8px;
}

div.background {
    padding: 2px;
    background-color: var(--dimmed-300);
}

label {
    flex: 1 0 0;
    position: relative;
    cursor: pointer;
}

label.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

input {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0);
    opacity: 0;
}

span {
    display: block;
    padding: 1.2rem 2.4rem;
    line-height: 1.6rem;
    text-align: center;
    background-color: var(--main);
}

label:first-child span {
    border-radius: 8px 0 0 8px;
}

label:last-child span {
    border-radius: 0 8px 8px 0;
}

span.selected {
    background-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary);
}
</style>
