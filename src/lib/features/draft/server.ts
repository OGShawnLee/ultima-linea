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

export function findDraft(id: string, currentUser: AuthToken) {
  return useAwait(() => (
    e.select(e.Draft, () => ({
      id: true,
      title: true,
      summary: true,
      content: true,
      text: true,
      filter_single: { id, user: buildUserRelationQuery(currentUser) }
    })).run(getClient())
  ))
}

export function updateDraft(id: string, data: DraftData, currentUser: AuthToken) {
  return useAwait(() => (
    e.update(e.Draft, () => ({
      set: data,
      filter_single: { id, user: buildUserRelationQuery(currentUser) }
    })).run(getClient())
  ))
}