# Cinematic Developer Portfolio Template ⚡

A high-performance, immersive developer portfolio template built for the community by **Ram Sharma**.

Designed with **Next.js 14**, **Tailwind CSS**, and **GSAP**, this template helps software engineers showcase their work with a premium, "living" aesthetic.

![Portfolio Preview](public/preview.png)

## 🌟 Introduction

This project was created by [Ram Sharma](https://github.com/sharmaram25) as a robust, open-source foundation for developers who want to stand out. It goes beyond static sites, offering a "Titan" design language that feels alive.

## ✨ Key Features

- **"Titan" Hero Section**: A massive, cinematic typography-driven opening with 3D parallax and "God Ray" lighting effects.
- **"Alive" Interactions**: Mouse-driven parallax, magnetic buttons, and ambient cursor effects.
- **Performance First**: Smooth scrolling via **Lenis**, optimized images, and GPU-accelerated animations.
- **Horizontal Project Gallery**: A unique, scroll-triggered horizontal showcase for projects with interactive "cutout" visuals.
- **"Connectivity Hub"**: A minimalist, classy contact section replacing traditional forms with interactive nodes.
- **Tech Arsenal**: A game-inspired, grid-based skills display.
- **Responsive**: Fully optimized for mobile, tablet, and desktop experiences with distinct layouts for each.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**:
  - [GSAP](https://gsap.com/) (ScrollTrigger, Flip)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/sharmaram25/cinematic-portfolio.git
    cd cinematic-portfolio
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or port 8080 if configured) to view it in the browser.

## 🎨 Customization

### 1. Hero Image

Replace `public/ram.webp` with your own cutout image. Ensure it is a high-resolution transparent PNG/WEBP.

- **Tip**: Use a drop shadow on your PNG for better depth integration.

### 2. Personal Styling

Adjust colors in `src/app/globals.css` or `tailwind.config.ts`. The project uses a semantic color system:

- `gold`: Primary accent
- `zinc-950`: Background base

### 3. Project Data

Update `src/components/projects/Projects.tsx` with your own case studies. The layout automatically handles horizontal scrolling logic.

### 4. Contact Links

Modify `src/components/contact/Contact.tsx` to update your email and social handles.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js settings.
4.  Hit **Deploy**.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

---

**Created for the Community by [Ram Sharma](https://twitter.com/ram_dev).**
_Crafted with precision code._
