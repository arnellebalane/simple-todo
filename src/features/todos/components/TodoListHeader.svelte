<script>
let { title, total, class: componentClass, onAddTodo } = $props();

const isEmpty = $derived(total === 0);
</script>

<header class={componentClass} data-testid="todo-list-header">
    <h1>{title}</h1>

    {#if !isEmpty}
        <button onclick={onAddTodo} data-testid="todo-list-header-add-btn">
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            Add Todo
        </button>
    {/if}
</header>

<style>
header {
    display: flex;
    align-items: center;
}

h1 {
    margin-right: auto;
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 2.4rem;
}

button {
    width: 2.4rem;
    height: 2.4rem;
    padding: 0;
    border: none;
    font-size: 0;
    color: var(--primary);
    background: none;
    cursor: pointer;
}

svg {
    display: block;
}
</style>
