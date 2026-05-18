# TODO - Posts (backend connected) 

## Step 1
- Update `frontend/src/pages/Posts.jsx`:
  - Remove modal usage (PostEditorModal)
  - “New Article” navigates to `/admin/posts/new`
  - “Edit” navigates to `/admin/posts/edit/:id`

## Step 2
- Update `frontend/src/pages/NewArticle.jsx`:
  - Remove localStorage mock logic
  - Load categories from `/api/categories` (auth)
  - If `mode === 'edit'`, fetch post by id from `/api/posts/:id` (auth) and prefill the form
  - On save:
    - create: `POST /api/posts`
    - edit: `PUT /api/posts/:id`
  - Navigate back to `/admin/posts` after success

## Step 3
- Ensure `frontend/src/pages/Posts.jsx` still supports delete + publish via backend.

## Step 4
- Run frontend + backend and manually test create/edit/publish/delete.

