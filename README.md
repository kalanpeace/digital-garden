# Digital Garden 🌱

A terminal-themed personal website built with Next.js and TypeScript. Features a unique retro-terminal aesthetic while maintaining modern web functionality.

## 🖥️ Live Demo
Visit: Kalanpeace.com



## ✨ Features

- 📟 Terminal-inspired UI
- 📝 Newsletter subscription system
- 🗂️ Dynamic knowledge base
- 🔄 Real-time social media connections
- 📱 Fully responsive design
- 🌙 Clean, minimalist interface

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- SCSS Modules
- Supabase (for newsletter)

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/kalanpeace/digital-garden.git
cd digital-garden
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 📁 Project Structure

```
digital-garden/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Modifying the Theme
The terminal theme can be customized in `global.scss`:
- Colors
- Typography
- Spacing
- Animations

### Content Sections
1. **Terminal Broadcast**: Edit `app/page.tsx` to modify the main content
2. **Knowledge Base**: Update the TreeView structure in `app/page.tsx`
3. **Network Connections**: Add or remove social links
4. **System Specs**: Customize your profile information

## 📝 Newsletter Setup

1. Create a Supabase project
2. Create a `newsletter_subscribers` table:
```sql
create table newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active'::text
);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Inspired by retro terminal interfaces and https://www.sacred.computer/
- Built with [Next.js](https://nextjs.org/)
- Styled with SCSS Modules
- Database by [Supabase](https://supabase.com/)

---

Made with ❤️ by [Kalan Peace](https://github.com/kalanpeace)
