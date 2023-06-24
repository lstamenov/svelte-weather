<script lang="ts">
  import Cards from "./components/Cards.svelte";
  import SearchBar from "./components/SearchBar.svelte";
</script>

<main>
  <SearchBar />
  <Cards />
</main>

<style>
  main {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
