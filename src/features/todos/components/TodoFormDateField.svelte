<script>
import Button from '@components/Button.svelte';
import Input from '@components/Input.svelte';

export let value;

const handleRemove = () => (value = '');
</script>

<div>
    <Input name="date" {value} onChange={(date) => (value = date)} type="date" />
    <Button type="button" onClick={handleRemove} disabled={!value} data-cy="clear-date-btn">Clear Date</Button>
</div>

<style>
div {
    display: flex;
    gap: 0.8rem;
}

div > :global(button) {
    flex-shrink: 0;
}
</style>
