<script>
import get from 'lodash/get';
import shortcuts from '../shortcuts.json';

export let data = {};

const items = Object.values(shortcuts);

const getItemKeys = (item) => {
  let keys = item.keys;
  if (!Array.isArray(keys[0])) {
    keys = [keys];
  }

  const keysMap = {
    altKey: 'Alt',
    metaKey: 'Cmd',
    ctrlKey: 'Ctrl',
  };
  return keys.map((key) =>
    key
      .map((k) => {
        if (k.startsWith('Key')) {
          return k.substring(3);
        }
        return get(keysMap, k, k);
      })
      .join('+')
  );
};
</script>

<ul>
  {#each items as item (item.label)}
    <li>
      <p>{item.label}</p>
      {#each getItemKeys(item) as key (key)}
        <kbd>{key}</kbd>
      {/each}
    </li>
  {/each}
</ul>

<style>
ul {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: center;
  gap: 4px;
}

p {
  margin-right: auto;
}

kbd {
  padding: 8px 1.2rem;
  border-radius: 4px;
  font-size: 1.4rem;
  background-color: var(--dimmed-200);
}
</style>
