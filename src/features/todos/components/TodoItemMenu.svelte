<script>
let { class: componentClass, onDelete, onEdit } = $props();
</script>

<menu class={componentClass} data-testid="todo-item-menu">
    <button class="ToggleButton" data-testid="todo-item-toggle">Toggle</button>

    <button class="DeleteButton" onclick={onDelete} data-testid="todo-item-delete">Delete</button>
    <button class="EditButton" onclick={onEdit} data-testid="todo-item-edit">Edit</button>
</menu>

<style>
menu {
    display: flex;
    gap: 4px;
    padding: 1.4rem;
    padding-right: 8px;
    border-radius: 0 8px 8px 0;
    background-color: var(--main);
}

menu::before {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    width: 3.2rem;
    height: 100%;
    background-image: linear-gradient(to left, var(--main) 0%, transparent 100%);
    pointer-events: none;
}

button {
    width: 2.4rem;
    height: 2.4rem;
    border: none;
    font-size: 0;
    background: transparent center center no-repeat;
    background-size: 2rem;
    cursor: pointer;
}

.ToggleButton {
    background-image: url('/src/assets/icons/dots.svg');
}

.EditButton {
    background-image: url('/src/assets/icons/edit.svg');
}

.DeleteButton {
    background-image: url('/src/assets/icons/delete.svg');
}

menu:hover .ToggleButton,
menu:not(:hover) .EditButton,
menu:not(:hover) .DeleteButton {
    display: none;
}
</style>
