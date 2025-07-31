import { Link } from 'react-router-dom'
import './Home.css'

function Home({ posts, loading, sortBy, setSortBy, onUpvote }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner">🍽️</div>
        <p>Loading delicious posts...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <h2>🍽️ No posts yet!</h2>
        <p>Be the first to share your favorite food!</p>
        <Link to="/create" className="create-first-post">
          Create Your First Post
        </Link>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>🍽️ FoodieBoard</h1>
        <p>Share your favorite meals, recipes, and food discoveries!</p>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="created_at">Most Recent</option>
            <option value="upvotes">Most Upvoted</option>
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {post.image_url && (
              <div className="post-image">
                <img src={post.image_url} alt={post.title} />
              </div>
            )}
            
            <div className="post-content">
              <h3 className="post-title">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              
              {post.content && (
                <p className="post-excerpt">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content
                  }
                </p>
              )}
              
              <div className="post-meta">
                <span className="post-date">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                
                <button 
                  onClick={() => onUpvote(post.id)}
                  className="upvote-button"
                >
                  👍 {post.upvotes || 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home 