<script>
import { portal } from 'svelte-portal';

export let show = false;
</script>

{#if show}
  <div class="ModalBackground" use:portal={'body'}>
    <div class="ModalContent">
      <slot />
    </div>
  </div>
{/if}

<style>
.ModalBackground {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 4.8rem;
  padding-bottom: 25vh;
  background-color: var(--dark-transparent);
  overflow: auto;
}

.ModalContent {
  width: 50rem;
  padding: 3.6rem;
  border-radius: 1.6rem;
  margin: auto;
  background-color: var(--light);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
</style>
