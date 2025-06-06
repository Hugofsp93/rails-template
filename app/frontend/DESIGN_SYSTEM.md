# Design System Guide

## 1. Introduction

This document describes the visual and component standards for the frontend of this project. The goal is to ensure consistency, facilitate maintenance, and accelerate the development of new features.

## 2. Technologies and Tools
- **TailwindCSS v4**: Used for all utility styling and dark mode.
- **React**: Componentization and UI reuse.
- **react-phone-input-2**: For custom phone input fields.
- **Flowbite**: For some dropdown and UI behaviors.

## 3. Colors and Themes
- Palette based on Tailwind utilities (`utility-700`, `neutral-50`, etc).
- Dark mode support via Tailwind (`dark:`).
- To customize, edit `tailwind.config.js`.

**Example:**
```jsx
<button className="bg-utility-700 text-neutral-50 hover:bg-utility-600 dark:bg-utility-600">Save</button>
```

## 4. Spacing and Layout
- Use Tailwind utilities for padding, margin, gap, grid, and flex.
- Example: `p-4`, `m-2`, `gap-6`, `grid-cols-2`, `flex`, etc.

## 5. Components

### Table
Reusable table for data listing.
```jsx
<Table columns={columns} data={users} actions={actions} onActionClick={handleActionClick} />
```
- Main props: `columns`, `data`, `actions`, `onActionClick`
- Supports custom cell rendering via a `render` function in columns

### Pagination
Reusable pagination.
```jsx
<Pagination
  currentPage={pagination.current_page}
  totalPages={pagination.total_pages}
  totalItems={pagination.total}
  perPage={pagination.per_page}
  onPageChange={handlePageChange}
/>
```

### SearchBar
Search field with debounce.
```jsx
<SearchBar onSearch={handleSearch} placeholder="Search..." debounceTime={300} />
```

### FilterDropdown
Dropdown for custom filters.
```jsx
<FilterDropdown
  id="statusFilter"
  options={filterOptions}
  selectedValue={confirmedFilter}
  onChange={handleFilterChange}
/>
```

### PhoneInputWrapper
Custom and responsive phone input field.
```jsx
<PhoneInputWrapper
  label="Phone"
  value={phone}
  onChange={setPhone}
  error={error}
  required
/>
```
- Custom styles in `app/frontend/styles/phoneInput.css`

## 6. Shared Styles
- Global and custom styles are in `app/frontend/styles/`.
- For phone fields, use and edit `phoneInput.css`.
- To add new global styles, create files in `styles/` and import them in the necessary component.

## 7. Best Practices
- Always use Tailwind utility classes for new components.
- Prefer reusable and decoupled components.
- Maintain consistency in spacing, colors, and fonts.
- Document new components and hooks.
- Ensure dark mode support.
- Use props for component customization.

## 8. How to Create/Modify Components Following the Standard
1. Create a new file in `app/frontend/components/ComponentName/index.jsx`.
2. Use Tailwind classes for styling.
3. If you need global styles, create a file in `app/frontend/styles/` and import it in the component.
4. Ensure dark mode support using `dark:`.
5. Document props and usage examples at the top of the file or in this guide.
6. For hooks/utilities, create files in `app/frontend/hooks/` or `app/frontend/utils/`.

## 9. Code Examples

### Example Table with Custom Actions
```jsx
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', render: (user) => (
    <span className={user.confirmed ? 'text-green-600' : 'text-red-600'}>
      {user.confirmed ? 'Confirmed' : 'Unconfirmed'}
    </span>
  ) }
]

const actions = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' }
]

<Table columns={columns} data={users} actions={actions} onActionClick={handleActionClick} />
```

### Example Usage of PhoneInputWrapper
```jsx
<PhoneInputWrapper
  label="Phone"
  value={data.user.phone}
  onChange={(value) => setData('user.phone', value)}
  error={errors.phone}
  required
/>
```

---

## 10. Questions and Contributions
- For questions about the design system, refer to this file or the examples in the components themselves.
- To contribute, follow the organization and documentation standards described here. 