<script lang="ts">
  export let title: string;
  export let onSave: (newTitle: string) => () => void;

  let shouldShowSaveButton: boolean = false;
  let modifiedTitle: string = title;
</script>

<div class="editable-input">
  <input
    on:input={() => (shouldShowSaveButton = true)}
    class="title"
    bind:value={modifiedTitle}
  />
  {#if shouldShowSaveButton}
    <button on:click={onSave(modifiedTitle)} class="save-btn">Save</button>
  {/if}
</div>

<style>
  .title {
    background-color: transparent;
    outline: none;
    border: 1px solid;
    width: 100%;
  }

  .editable-input {
    position: relative;
  }

  .save-btn {
    position: absolute;
    right: 2px;
    top: 1px;
    padding: 5px;
    background-color: rgb(240, 215, 25);
    border: 1px solid;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .save-btn:hover {
    background-color: rgb(249, 232, 104);
  }
</style>
