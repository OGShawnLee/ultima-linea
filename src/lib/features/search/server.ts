import type { SearchData } from "@search/schema";
import { type HandleSearchReturns, handleSearch, handleSearchWithRegion } from "@queries";
import { useAwait } from "$lib";
import { getClient } from "@server/db";
import { isRegion } from "@categories/schema";

export function getSearchResults(data: SearchData) {
  return useAwait<HandleSearchReturns>(async () => {
    if (data.term) {      
      if (data.region && isRegion(data.region)) {
        return handleSearchWithRegion(getClient(), { region: data.region, term: data.term });
      }
      
      return handleSearch(getClient(), { term: data.term });
    }

    return [];
  })
}