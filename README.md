# Bay Area Small Business Study - Landing Page

A professional landing page for recruiting Bay Area small business owners to participate in a research study about how they run their day-to-day business operations — finances, marketing, website management, and more.

## Features

- **Sticky Navigation** - Smooth scroll anchors to all sections
- **Hero Section** - Compelling value proposition with gradient background
- **Multi-Section Layout** - Why, What, Who, Join, and FAQ sections
- **Typeform Integration** - Embedded form for study sign-ups
- **Responsive Design** - Mobile-first, works beautifully on all devices
- **Dark Theme** - Professional #0b1220 background with sky/indigo accents
- **SEO Optimized** - Meta tags for search and social sharing

## Quick Start

1. **Configure Your Typeform URL**

   You have two options:

   **Option A: Set an environment variable (recommended)**
   - Create a `.env` file in the root directory
   - Add: `VITE_TYPEFORM_URL=https://form.typeform.com/to/YOUR-FORM-ID`

   **Option B: Edit the source code**
   - Open `client/src/pages/home.tsx`
   - Replace the `TYPEFORM_URL` constant with your actual Typeform URL

2. **Configure Typeform Redirect (Optional)**

   To redirect users to the thank-you page after form submission:
   - In your Typeform settings, set the redirect URL to: `https://your-domain.replit.app/thank-you`
   - Add `?session_id={{response_id}}` to track individual submissions

3. **Run the Application**

   The application is already running! Just click the webview to see your landing page.

4. **Customize Content**

   All content is in `client/src/pages/home.tsx`. Edit the text, bullet points, FAQ items, or business type tags to match your study.

## Sections Overview

- **Header** - Sticky navigation with quick links to all sections
- **Hero** - Main value proposition and call-to-action
- **Why** - Explains the purpose of the research study
- **What** - Details about participation (60 min, $150 compensation)
- **Who** - Target audience and business types
- **Join** - Typeform integration for sign-ups
- **FAQ** - Common questions about the study
- **Footer** - Simple branding footer

## Design

The landing page uses an SF 49ers-inspired theme with:
- Primary Red: Scarlet red (`#AA0000`) for CTAs and primary actions
- Secondary Gold: Metallic gold (`#B3995D`) for accents and highlights
- Background: White with alternating light red (`red-50`) and gold (`amber-50`) tints
- Hero: Red-to-gold gradient background (`from-red-50 via-amber-50 to-yellow-50`)
- Text: Neutral colors (neutral-900, neutral-600) for hierarchy
- Typography: System fonts with bold, energetic styling
- Spacing: Generous padding and consistent gaps
- Borders: Subtle neutral-200 borders
- Hover effects: Red darkens to `#8B0000`, smooth transitions on all interactive elements

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: Wouter (single page)
- **Backend**: Express.js (minimal)

## Admin Access

The application includes a simple admin panel to manage submissions and testimonials.

**Access the admin panel:**
- Navigate to `/admin/login`
- Default credentials:
  - Username: `admin`
  - Password: `admin123`

**Important Security Notes for Production:**
1. Change the default admin password before deploying
2. Ensure SESSION_SECRET environment variable is set to a secure random string
3. Consider using a production-ready session store (e.g., connect-pg-simple with PostgreSQL) instead of the default MemoryStore
4. The current setup uses MemoryStore which is suitable for development but not recommended for production deployments

## Publishing

When you're ready to deploy, use the publish button in Replit to make your landing page live with a custom domain.

**Before publishing:**
1. Set a strong SESSION_SECRET in your environment variables
2. Change the admin password (see Admin Access section)
3. Configure your Typeform webhook URL (if using webhooks)

## Pushing Your Changes to GitHub

If you would like to push the latest fixes from this environment to a GitHub repository, you'll need to configure a remote and push from your local machine:

1. Create a new repository on GitHub (or identify an existing one) without adding any starter files like a README or `.gitignore`.
2. In this project directory, add the remote: `git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPO.git`
3. Push the current branch (named `work`) to GitHub: `git push -u origin work`

> **Note:** This hosted workspace does not have GitHub credentials, so pushes must be performed from your own machine or from an environment with the necessary SSH keys or access tokens configured.
