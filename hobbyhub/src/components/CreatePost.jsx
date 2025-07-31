import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatePost.css'

function CreatePost({ onCreatePost }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    secret_code: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setError('Title is required!')
      return
    }

    setLoading(true)
    setError('')

    try {
      const success = await onCreatePost({
        title: formData.title.trim(),
        content: formData.content.trim(),
        image_url: formData.image_url.trim(),
        secret_code: formData.secret_code.trim(),
        upvotes: 0
      })

      if (success) {
        navigate('/')
      } else {
        setError('Failed to create post. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-post">
      <div className="create-post-container">
        <h1>🍽️ Create a New Post</h1>
        <p>Share your favorite food, recipe, or food discovery!</p>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., My quick ramen hack"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content (optional)</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your recipe, review, or thoughts..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL (optional)</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/your-image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="secret_code">Secret Code (optional)</label>
            <input
              type="text"
              id="secret_code"
              name="secret_code"
              value={formData.secret_code}
              onChange={handleChange}
              placeholder="Set a code to edit/delete this post later"
            />
            <small>This code will be needed to edit or delete your post</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost 