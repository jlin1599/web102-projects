import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import PostDetail from './components/PostDetail'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('posts')
        .select('*')
        .order(sortBy === 'upvotes' ? 'upvotes' : 'created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [sortBy, searchTerm])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const createPost = async (postData) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()

      if (error) {
        console.error('Error creating post:', error)
        return false
      } else {
        setPosts([data[0], ...posts])
        return true
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  const upvotePost = async (postId) => {
    try {
      // Get current post to find current upvote count
      const currentPost = posts.find(post => post.id === postId)
      if (!currentPost) return

      const { error } = await supabase
        .from('posts')
        .update({ upvotes: (currentPost.upvotes || 0) + 1 })
        .eq('id', postId)

      if (error) {
        console.error('Error upvoting post:', error)
      } else {
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, upvotes: (post.upvotes || 0) + 1 }
            : post
        ))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deletePost = async (postId) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) {
        console.error('Error deleting post:', error)
        return false
      } else {
        setPosts(posts.filter(post => post.id !== postId))
        return true
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  const updatePost = async (postId, updates) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId)

      if (error) {
        console.error('Error updating post:', error)
        return false
      } else {
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, ...updates }
            : post
        ))
        return true
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  return (
    <Router>
      <div className="App">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={fetchPosts}
        />
        <main className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  posts={posts}
                  loading={loading}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onUpvote={upvotePost}
                />
              } 
            />
            <Route 
              path="/create" 
              element={
                <CreatePost 
                  onCreatePost={createPost}
                />
              } 
            />
            <Route 
              path="/post/:id" 
              element={
                <PostDetail 
                  onUpvote={upvotePost}
                  onDelete={deletePost}
                  onUpdate={updatePost}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
