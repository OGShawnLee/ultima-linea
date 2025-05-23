import type { AuthToken } from "@auth/schema";
import type { CategoriesData } from "@categories/schema";
import type { CardDraft, DraftData, DraftState } from "@draft/schema";
import type { CaptionData, ImageData } from "@picture/schema";
import e, { getClient } from "@db";
import { useAwait } from "$lib";
import { buildUserRelationQuery } from "@user/server";
import { buildCreateCaptionQuery, buildCreateImageQuery } from "@picture/server";

const CommonDraftShape = e.shape(e.Draft, () => ({
  id: true,
  article: { id: true },
  title: true,
  summary: true,
  content: true,
  text: true,
  image: { image_key: true, image_url: true },
  caption: { image_label: true, image_src: true },
  region: true,
  featured: true,
  can_be_published: true,
  is_different_from_article: true,
  is_published: true,
  updated_at: true,
}));

export function addDraftCategories(id: string, data: CategoriesData, currentUser: AuthToken) {
  return useAwait(() => (
    e.update(e.Draft, () => ({
      set: { region: data.region, featured: data.featured },
      filter_single: { id, user: buildUserRelationQuery(currentUser) },
    })).run(getClient())
  ))
}

export function addDraftPicture(id: string, data: CaptionData & ImageData, currentUser: AuthToken) {
  const image = buildCreateImageQuery(data);
  const caption = buildCreateCaptionQuery(data);
  return useAwait(() => (
    e.update(e.Draft, () => ({
      set: {
        image,
        caption,
        updated_at: image.created_at
      },
      filter_single: { id, user: buildUserRelationQuery(currentUser) },
    })).run(getClient())
  ))
}

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

export function deleteDraft(id: string, currentUser: AuthToken) {
  return useAwait(() => (
    e.delete(e.Draft, () => ({
      filter_single: { id, user: buildUserRelationQuery(currentUser) }
    })).run(getClient())
  ))
}

export function findDraft(id: string, currentUser: AuthToken) {
  return useAwait(() => (
    e.select(e.Draft, (draft) => ({
      ...CommonDraftShape(draft),
      text: true,
      filter_single: { id, user: buildUserRelationQuery(currentUser) }
    })).run(getClient())
  ))
}

export function findDraftPage(id: string, currentUser: AuthToken) {
  const draft = e.select(e.Draft, (draft) => ({
    ...CommonDraftShape(draft),
    user: {
      name: true,
      display_name: true
    },
    filter_single: { id, user: buildUserRelationQuery(currentUser) }
  }));
  const recent = e.select(e.Draft, (draft) => ({
    ...CommonDraftShape(draft),
    limit: 2,
    order_by: {
      expression: draft.created_at,
      direction: e.DESC
    },
    filter: e.op(
      e.op(draft.user, "=", buildUserRelationQuery(currentUser)),
      "and",
      e.op(draft.id, "!=", e.uuid(id))
    )
  }));
  const more = e.select(e.Draft, (draft) => ({
    ...CommonDraftShape(draft),
    order_by: {
      expression: draft.created_at,
      direction: e.DESC
    },
    filter: e.op(
      e.op(
        e.op(draft.user, "=", buildUserRelationQuery(currentUser)),
        "and",
        e.op(draft.id, "!=", e.uuid(id))
      ),
      "and",
      e.op(draft.id, "not in", recent.id)
    )
  }));
  return useAwait(() => (
    e.select({ draft, recent, more }).run(getClient())
  ))
}

export function getDrafts(currentUser: AuthToken) {
  return useAwait<CardDraft[]>(() => (
    e.select(e.Draft, (draft) => ({
      ...CommonDraftShape(draft),
      order_by: {
        expression: draft.updated_at,
        direction: e.DESC
      },
      filter: e.op(draft.user, "=", buildUserRelationQuery(currentUser))
    })).run(getClient())
  ))
}

export function getDraftsByState(currentUser: AuthToken, state: DraftState) {
  return useAwait<CardDraft[]>(() => (
    e.select(e.Draft, (draft) => {
      let filter = e.op(draft.user, "=", buildUserRelationQuery(currentUser));

      if (state === "PUBLISHABLE") {
        filter = e.op(filter, "and", e.op(draft.is_published, "=", false));
        filter = e.op(filter, "and", e.op(draft.can_be_published, "=", true));
      }

      if (state === "PUBLISHED") {
        filter = e.op(filter, "and", e.op(draft.is_published, "=", true));
      }

      if (state === "UNPUBLISHED") {
        filter = e.op(filter, "and", e.op(draft.is_published, "=", false));
      }

      if (state === "UPDATABLE") {
        filter = e.op(filter, "and", e.op(draft.is_published, "=", true));
        filter = e.op(filter, "and", e.op(draft.is_different_from_article, "=", true));
      }

      return {
        ...CommonDraftShape(draft),
        order_by: {
          expression: draft.updated_at,
          direction: e.DESC
        },
        filter
      }
    }).run(getClient())
  ));
}

export function publishDraft(id: string, currentUser: AuthToken) {
  const draft = buildDraftRelationQuery(id, currentUser);
  return useAwait(() => (
    e.select(e.update(draft, () => ({
      set: {
        article: e.insert(e.News, {
          title: draft.title,
          summary: draft.summary,
          content: draft.content,
          text: draft.text,
          region: draft.region,
          image: draft.image,
          caption: e.insert(e.Caption, {
            image_label: draft.caption.image_label,
            image_src: draft.caption.image_src
          }),
          featured: draft.featured,
          user: draft.user
        })
      }
    })), (draft) => ({
      article: draft.article
    })).run(getClient())
  ));
}

export function updateDraft(id: string, data: DraftData, currentUser: AuthToken) {
  return useAwait(() => (
    e.update(e.Draft, () => ({
      set: data,
      filter_single: { id, user: buildUserRelationQuery(currentUser) }
    })).run(getClient())
  ))
}

export function updateDraftArticle(id: string, currentUser: AuthToken) {
  const draft = buildDraftRelationQuery(id, currentUser);
  return useAwait(() => (
    e.update(draft.article, (article) => ({
      set: {
        title: draft.title,
        summary: draft.summary,
        content: draft.content,
        text: draft.text,
        region: draft.region,
        image: draft.image,
        caption: e.update(article.caption, () => ({
          set: {
            image_label: draft.caption.image_label,
            image_src: draft.caption.image_src
          }
        })),
        featured: draft.featured
      }
    })).run(getClient())
  ))
}

export function buildDraftRelationQuery(id: string, currentUser: AuthToken) {
  return e.select(e.Draft, () => ({
    id: true,
    filter_single: { id, user: buildUserRelationQuery(currentUser) }
  }));
}

export function updateDraftPicture(id: string, data: CaptionData, currentUser: AuthToken) {
  const draft = buildDraftRelationQuery(id, currentUser);
  return useAwait(() => (
    e.update(draft, () => ({
      set: {
        updated_at: e.update(e.Caption, (caption) => ({
          set: {
            image_label: data["image-label"],
            image_src: data["image-src"]
          },
          filter_single: e.op(draft.caption.id, "=", caption.id)
        })).updated_at
      },
    })).run(getClient())
  ))
}