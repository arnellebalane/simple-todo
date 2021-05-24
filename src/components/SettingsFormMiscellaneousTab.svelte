<script>
import Switch from '@components/Switch.svelte';

export let data = {
  enablePrivacyMode: false,
};
</script>

<section>
  <div class="Field--inline">
    <label for="enablePrivacyMode">Enable privacy mode</label>
    <Switch name="enablePrivacyMode" bind:value={data.enablePrivacyMode} on:change />
  </div>
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
}

.Field--inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 700;
}

.Field--inline label {
  margin-right: auto;
  margin-bottom: 0;
}
</style>
