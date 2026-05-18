# TODO - Categories Backend + Frontend

- [x] Implement backend controller: `backend/controllers/categoryController.js`
  - [ ] GET all categories
  - [ ] GET category by id
  - [ ] POST create category (slugify name)
  - [ ] PUT/PATCH update category (slugify if name changes)
  - [ ] DELETE category


- [x] Implement backend routes: `backend/routes/categoryRoutes.js`
  - [x] Protect GET/POST/PUT/PATCH/DELETE with `requireAuth`



- [x] Mount routes in `backend/server.js`
  - [x] `app.use('/api/categories', categoryRoutes)`


- [x] Update frontend page: `frontend/src/pages/Categories.jsx`
  - [x] Replace mock state with API calls
  - [x] Wire Add/Edit/Delete to backend endpoints
  - [x] Add loading + error states
  - [x] Keep search + modals UI



- [x] Run & verify
  - [ ] Start backend
  - [ ] Start frontend
  - [ ] Test `/admin/categories` CRUD end-to-end



