<script>
import TodoListHeader from '@components/TodoListHeader.svelte';

export let title;
</script>

<article>
  <TodoListHeader {title} />
</article>

<style>
article {
  padding: 2.4rem;
  border-radius: 1.6rem;
  background-color: #f9fafb;
}
</style>
