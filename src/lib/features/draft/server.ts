import type { AuthToken } from "@auth/schema";
import type { DraftData } from "@draft/schema";
import e, { getClient } from "@db";
import { useAwait } from "$lib";
import { buildUserRelationQuery } from "@user/server";

export function createDraft(data: DraftData, currentUser: AuthToken) {
  return useAwait(() => (
    e.insert(e.Draft, {
      title: data.title,
      summary: data.summary,
      content: data.content,
      text: data.text,
      user: buildUserRelationQuery(currentUser)
    }).run(getClient())
  ))
}