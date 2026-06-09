# TODO - Admin Dashboard UI Migration (SOURCE -> TARGET)

- [x] Inspect TARGET admin dashboard UI components (dashboard, modal, login page)
- [x] Inspect SOURCE admin dashboard UI components (dashboard, modal, login, globals)
- [x] Generate UI Audit for SOURCE
- [x] Generate compatibility report for TARGET
- [x] Map SOURCE UI -> TARGET functionality (presentation-only)
- [ ] Apply presentation-only UI changes per mapping
  - [x] Update TARGET `src/components/admin/AdminLogin.module.css` to match SOURCE
- [ ] Verification after changes
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manually verify `/admin/login` + `/admin/dashboard` visually


