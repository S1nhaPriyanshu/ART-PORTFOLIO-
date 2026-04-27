# Atelier Tenebris

Atelier Tenebris is a cinematic, Dark Academia-inspired art portfolio and commission platform. Built with a focus on immersive aesthetics and smooth interactions, it showcases high-end artwork while providing a streamlined backend for handling commission requests and payments.

## Features

*   **Cinematic Design:** A dark, moody aesthetic inspired by classical art and "Ruinart" themes, utilizing deep tones and elegant typography.
*   **Immersive Animations:** GSAP-powered micro-interactions, smooth page transitions, and floating ambient elements (like the signature "Floating Orb").
*   **Masonry Gallery:** A responsive, dynamic masonry layout to display the artist's portfolio.
*   **Commission System:** An integrated backend to handle commission inquiries and process payments securely via Stripe.
*   **Modern Stack:** Built on top of robust, modern web technologies ensuring high performance and a great developer experience.

## Tech Stack

*   **Frontend Framework:** [Nuxt 3](https://nuxt.com/) / [Vue 3](https://vuejs.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [GSAP (GreenSock Animation Platform)](https://gsap.com/)
*   **Backend (Commissions/Payments):** Node.js / Express (or Nuxt server routes) with [Stripe Integration](https://stripe.com/)

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or yarn
*   A Stripe account (for commission features)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd <project-directory>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    *   Create a `.env` file in the root directory.
    *   Add necessary variables (e.g., Stripe API keys, database URLs if applicable).

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:3000`.

## Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run generate`: Pre-renders every route of your application.
*   `npm run preview`: Starts a local server to preview your production build.

## License

This project is intended as a personal portfolio. Please respect the artist's original work and do not use the artworks without permission.
