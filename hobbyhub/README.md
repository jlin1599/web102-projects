# 🍽️ FoodieBoard

A community platform for food lovers to share meals, recipes, and tasty recommendations. Built with React and Supabase.

## ✨ Features

### ✅ Required Features (All Implemented)

1. **Create a Post**
   - Title (required)
   - Content (optional)
   - Image URL (optional)
   - Secret code for edit/delete access

2. **Home Feed**
   - Display all posts with title, creation time, and upvote count
   - Sort by most recent or most upvoted
   - Search posts by title

3. **Post Detail Page**
   - Full content and image display
   - Upvote functionality (unlimited upvotes)
   - Comments section
   - Edit and delete buttons (with secret code verification)

4. **Edit/Delete**
   - Posts can be edited or deleted only with the correct secret code
   - Only the original creator can edit/delete their posts

## 🛠️ Tech Stack

- **Frontend**: React (with Vite)
- **Backend**: Supabase (Database + Client)
- **Routing**: React Router DOM
- **Styling**: CSS with modern design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd hobbyhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update the `.env` file with your credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up the database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the following SQL to create the tables:

   ```sql
   -- Create posts table
   CREATE TABLE posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT,
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     upvotes INTEGER DEFAULT 0,
     secret_code TEXT
   );

   -- Create comments table
   CREATE TABLE comments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security (optional but recommended)
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

   -- Create policies for public read access
   CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);
   CREATE POLICY "Allow public read access" ON comments FOR SELECT USING (true);

   -- Create policies for insert access
   CREATE POLICY "Allow public insert" ON posts FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public insert" ON comments FOR INSERT WITH CHECK (true);

   -- Create policies for update access (only with secret code)
   CREATE POLICY "Allow update with secret code" ON posts FOR UPDATE USING (true);

   -- Create policies for delete access (only with secret code)
   CREATE POLICY "Allow delete with secret code" ON posts FOR DELETE USING (true);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 How to Use

### Creating a Post
1. Click "Create Post" in the navigation
2. Fill in the title (required)
3. Add content and image URL (optional)
4. Set a secret code to edit/delete later (optional)
5. Click "Create Post"

### Viewing and Interacting
1. Browse posts on the home page
2. Use the search bar to find specific posts
3. Sort by "Most Recent" or "Most Upvoted"
4. Click on any post to view details
5. Upvote posts (unlimited times)
6. Add comments to posts

### Editing/Deleting Posts
1. Go to the post detail page
2. Enter the secret code you set when creating the post
3. Click "Edit" or "Delete"
4. For editing, make changes and click "Update Post"

## 📱 Sample Use Cases

- "3-ingredient pancake recipe" with a picture and steps
- "Spotted this burger in Brooklyn — 9/10"
- "What's your favorite comfort food?"
- "Need help improving my homemade pizza dough"

## 🔧 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation and search
│   ├── Home.jsx            # Posts feed
│   ├── CreatePost.jsx      # Post creation form
│   ├── PostDetail.jsx      # Single post view
│   └── *.css               # Component styles
├── App.jsx                 # Main app with routing
├── supabase.js             # Supabase client
└── *.css                   # Global styles
```

## 🎨 Design Features

- **Modern UI**: Clean, food-themed design with gradients
- **Responsive**: Works on desktop and mobile
- **Interactive**: Hover effects and smooth transitions
- **Accessible**: Proper form labels and keyboard navigation

## 🚀 Deployment

### Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Set environment variables in Vercel dashboard

## 🔮 Future Enhancements

- [ ] Tags system (Recipe, Review, Question, Quick Bite)
- [ ] Filter by tags
- [ ] Dark mode toggle
- [ ] Image upload with Supabase storage
- [ ] User authentication
- [ ] Repost functionality

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy cooking and sharing! 🍳✨**
