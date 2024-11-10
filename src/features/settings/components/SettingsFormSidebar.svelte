<script>
import { settingsTabs } from '../config';

let { value = $bindable(), class: componentClass } = $props();
</script>

<aside class={componentClass} data-cy="settings-form-sidebar">
    <h1>Settings</h1>

    {#each settingsTabs as tab, index (tab.id)}
        <label>
            <input type="radio" name="sidebar" bind:group={value} value={index} />
            <span>{tab.label}</span>
        </label>
    {/each}
</aside>

<style>
aside {
    display: flex;
    flex-direction: column;

    padding: 3.6rem 1.8rem;
    border-radius: 1.6rem 0 0 1.6rem;
    background-color: var(--dimmed-100);
}

h1 {
    padding: 0 1.8rem;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}

label {
    display: block;
    position: relative;
    cursor: pointer;
}

input {
    position: absolute;
    opacity: 0;
    transform: scale(0);
}

span {
    display: block;
    padding: 8px 1.8rem;
    border-radius: 8px;
    line-height: 2rem;
}

label:hover span,
input:focus + span {
    background-color: var(--dimmed-200);
}

input:checked + span {
    background-color: var(--primary);
}
</style>
