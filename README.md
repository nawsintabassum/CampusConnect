# CampusConnect

CampusConnect is a modern, responsive **University Student Portal** built entirely with **HTML5, CSS3, Vanilla JavaScript and LocalStorage**.

It is designed as a portfolio-ready Software Engineering project demonstrating frontend architecture, reusable UI patterns, client-side CRUD, filtering, modals, responsive layouts and persistent browser data.

## ✨ Features

- Professional landing page
- Frontend-only demo authentication
- Student dashboard with academic KPIs
- Notice Board with search, category filtering, sorting and important flags
- Weekly Class Routine with current-day highlighting
- Assignment Tracker with:
  - Add / Edit / Delete
  - Status management
  - Priority
  - Deadline
  - Search and filters
- Events module with:
  - Search and category filtering
  - Details modal
  - Countdown
  - LocalStorage registration simulation
- Study Resources with bookmark persistence
- Editable student profile
- Light/Dark mode with persistence
- Responsive mobile sidebar
- Toast notifications
- Empty states and confirmation dialogs
- Realistic sample university data
- No frameworks or backend dependencies

## 📁 Structure

```text
CampusConnect/
├── index.html
├── login.html
├── dashboard.html
├── notices.html
├── routine.html
├── assignments.html
├── events.html
├── resources.html
├── profile.html
├── settings.html
├── README.md
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── assignments.js
│   ├── notices.js
│   ├── events.js
│   ├── resources.js
│   └── profile.js
└── assets/
    ├── images/
    └── icons/
```

## 🚀 Setup / Run

No installation is required.

### Option 1 — Direct

Open `index.html` in a modern browser.

### Option 2 — VS Code

1. Open the CampusConnect folder in VS Code.
2. Install the **Live Server** extension if you want automatic reload.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

Because this is a static project, it can also be deployed to GitHub Pages, Netlify or Vercel as a static site.

## 🔐 Demo Login

Authentication is intentionally simulated.

Use:
- Email / Student ID: any non-empty value
- Password: any value with 4 or more characters

The project stores only a local demo session in `localStorage`.

## 🧠 JavaScript Architecture

### `app.js`

Provides shared application utilities:

- LocalStorage helpers
- Sample data initialization
- Theme switching
- Toast notifications
- Authentication guard
- Logout
- Modal creation
- Common UI shell
- Date formatting

### `auth.js`

Handles:

- Login form validation
- Show/hide password
- Remember-me preference
- LocalStorage session creation
- Redirect to dashboard

### `dashboard.js`

Calculates and renders:

- Pending assignments
- Upcoming events
- Dashboard notices
- Student profile information
- Academic progress widgets

### `assignments.js`

Implements complete assignment CRUD:

```text
Create → Add Assignment
Read → Render from LocalStorage
Update → Edit / Status
Delete → Confirmation + removal
```

### `notices.js`

Implements:

- Search
- Category filtering
- Date sorting
- Important flag toggling
- Details modal

### `events.js`

Implements:

- Search
- Category filtering
- Details modal
- Countdown timer
- Registration persistence

### `resources.js`

Implements:

- Search
- Category filtering
- Bookmark / remove bookmark
- Bookmark-only view

### `profile.js`

Loads profile information from LocalStorage and saves edited values.

## 💾 LocalStorage Data

The project uses keys such as:

```text
cc_user
cc_profile
cc_assignments
cc_notices
cc_events
cc_resources
cc_bookmarks
cc_registrations
cc_theme
cc_notifications_enabled
```

## 🎨 Design System

The interface uses:

- Blue / white / neutral palette
- Rounded cards
- Soft shadows
- Consistent spacing
- Responsive grids
- Accessible form controls
- Reusable buttons, badges, cards and modals
- Subtle hover and entrance effects

## 🌐 Deployment

### GitHub Pages

Push the repository to GitHub and enable Pages from the repository settings.

### Netlify

Drag the project folder into Netlify Drop or connect the GitHub repository.

### Vercel

Import the repository as a static project. No build command is required.

## 🔮 Future Full-Stack Upgrade

The current project intentionally has no backend. A production version could evolve into:

### Frontend

- React / Next.js
- TypeScript
- Tailwind CSS or a component library
- React Query / TanStack Query

### Backend

- Node.js + Express or NestJS
- REST API / GraphQL
- JWT / session authentication
- Role-based access control

### Database

- PostgreSQL / MySQL
- Prisma ORM

### Additional Production Features

- Real student authentication
- University SSO
- Admin dashboard
- Teacher portal
- Course enrollment
- Real attendance synchronization
- Assignment submission
- File uploads
- Push/email notifications
- Calendar integration
- Real event registration
- Analytics
- Audit logs
- Secure password hashing
- API validation and rate limiting

## 📌 Portfolio Notes

CampusConnect demonstrates:

- Semantic HTML5
- Responsive CSS architecture
- Vanilla JavaScript modules
- CRUD operations
- Browser storage
- DOM manipulation
- Form validation
- Filtering and searching
- Modal interfaces
- Theme persistence
- Responsive dashboard design
- UX states and feedback

> This project is a frontend demonstration and does not provide real university authentication or server-side data security.
