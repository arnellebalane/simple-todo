<script>
import Badge from '@components/Badge.svelte';

import { settings } from '@features/settings/store';
import { TODOS_DATE_ABSOLUTE } from '@features/todos/constants';
import { formatAbsoluteDate, formatRelativeDate } from '../lib/date';

let { date } = $props();

const dateObject = $derived(new Date(`${date}T00:00:00`));
const dateDisplay = $derived.by(() => {
    const display =
        $settings.todoDateDisplay === TODOS_DATE_ABSOLUTE
            ? formatAbsoluteDate(dateObject)
            : formatRelativeDate(dateObject);
    return display.charAt(0).toUpperCase() + display.substring(1);
});
</script>

<Badge {icon} data-testid="todo-item-date">
    {dateDisplay}
</Badge>

{#snippet icon()}
    <svg slot="icon" width="14" height="14" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7Z"
        />
    </svg>
{/snippet}
