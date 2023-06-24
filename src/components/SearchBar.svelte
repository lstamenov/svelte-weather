<script lang="ts">
  import Service from "../services/Service";
  import type { SearchResult } from "../types";
  import { debounce } from "../utilities/debounce";
  import SearchResults from "./SearchResults.svelte";

  let results: SearchResult[] = [];
  let searchQuery: string = "";
  const service: Service = Service.getInstance();

  const fetchResults = (query: string) => async () => {
    if (!query) {
      results = [];
      return;
    }

    results = await service.fetchSearchResults(query);
  };

  const handleClearInput = () => searchQuery = '';

  $: debounce(fetchResults(searchQuery), 400);
</script>

<div class="container">
  <input placeholder="search" class="input" bind:value={searchQuery} />
  <SearchResults {handleClearInput} {results} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  .input {
    width: 300px;
    outline: none;
    border: 1px solid black;
  }
</style>
