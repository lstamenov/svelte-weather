<script lang="ts">
  export let name: string;
  export let region: string;
  export let country: string;
  export let onClick: () => void;
</script>

<button on:click={onClick}>{`${name}, ${region}, ${country}`}</button>

<style>
  button {
    margin: 0;
    padding: 5px;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }
  button:hover {
    background-color: rgb(170, 170, 170);
    transition: 0.3s ease-in-out;
  }
</style>
