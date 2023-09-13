<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
</script>

<menu class={$$props.class}>
    <button class="ToggleButton">Toggle</button>

    <button class="DeleteButton" on:click={() => dispatch('delete')}>Delete</button>
    <button class="EditButton" on:click={() => dispatch('edit')}>Edit</button>
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
    background-image: url('./dist/assets/icons/dots.svg');
}

.EditButton {
    background-image: url('./dist/assets/icons/edit.svg');
}

.DeleteButton {
    background-image: url('./dist/assets/icons/delete.svg');
}

menu:hover .ToggleButton,
menu:not(:hover) .EditButton,
menu:not(:hover) .DeleteButton {
    display: none;
}
</style>
