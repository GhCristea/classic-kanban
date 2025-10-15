<script lang="ts">
  export let open = false;
  let el: HTMLDialogElement;
  $: open ? (el?.open || el?.showModal?.()) : el?.close?.();
</script>

<dialog bind:this={el}>
  <slot />
</dialog>


