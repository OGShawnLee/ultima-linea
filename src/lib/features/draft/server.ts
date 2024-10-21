import type { AuthToken } from "@auth/schema";
import type { CardDraft, DraftData } from "@draft/schema";
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

export function getDrafts(currentUser: AuthToken) {
  return useAwait<CardDraft[]>(() => (
    e.select(e.Draft, (draft) => ({
      id: true,
      title: true,
      summary: true,
      updated_at: true,
      order_by: {
        expression: draft.updated_at,
        direction: e.DESC
      },
      filter: e.op(draft.user, "=", buildUserRelationQuery(currentUser))
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