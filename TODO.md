# TODO

- [x] Implement backend posts CRUD in `backend/controllers/postController.js`

- [x] Implement `backend/routes/postRoutes.js` endpoints (GET/POST/PUT/DELETE) with `requireAuth`

- [x] Wire posts routes in `backend/server.js` under `/api/posts`

- [ ] Connect `frontend/src/pages/Posts.jsx` to backend (fetch posts, delete, edit, publish)
- [ ] Update `frontend/src/components/Post/PostEditorModal.jsx` to:
  - [ ] fetch categories dynamically from `/api/categories`
  - [ ] use `category_id` in payload
  - [ ] call backend for create/update
- [ ] Ensure delete works end-to-end from Posts list
- [ ] Run backend + frontend and verify list/create/edit/delete flows
- [x] Confirm editor/category dropdown uses backend (not hardcoded)
- [x] Backend posts CRUD + /api/posts wiring




