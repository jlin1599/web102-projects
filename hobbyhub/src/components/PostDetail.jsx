import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './PostDetail.css'

function PostDetail({ onUpvote, onDelete, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [secretCode, setSecretCode] = useState('')
  const [showEditForm, setShowEditForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    try {
      console.log('Fetching post with ID:', id)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching post:', error)
        setError('Post not found')
      } else {
        console.log('Post data:', data)
        setPost(data)
        setEditData({
          title: data.title,
          content: data.content,
          image_url: data.image_url
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching comments:', error)
      } else {
        setComments(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) return

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: id,
          content: newComment.trim()
        }])
        .select()

      if (error) {
        console.error('Error adding comment:', error)
      } else {
        setComments([...comments, data[0]])
        setNewComment('')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = () => {
    if (secretCode === post.secret_code) {
      setShowEditForm(true)
    } else {
      setError('Invalid secret code')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    try {
      const success = await onUpdate(id, editData)
      if (success) {
        setShowEditForm(false)
        setSecretCode('')
        setError('')
        fetchPost() // Refresh the post data
      } else {
        setError('Failed to update post')
      }
    } catch {
      setError('An error occurred')
    }
  }

  const handleDelete = async () => {
    if (secretCode === post.secret_code) {
      const success = await onDelete(id)
      if (success) {
        navigate('/')
      } else {
        setError('Failed to delete post')
      }
    } else {
      setError('Invalid secret code')
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner">🍽️</div>
        <p>Loading delicious post...</p>
        <p>Post ID: {id}</p>
      </div>
    )
  }

  if (error && !post) {
    return (
      <div className="error-state">
        <h2>😔 {error}</h2>
        <p>Post ID: {id}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="post-detail">
      <div className="post-detail-container">
        {showEditForm ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <h2>Edit Post</h2>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                value={editData.content}
                onChange={(e) => setEditData({...editData, content: e.target.value})}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={editData.image_url}
                onChange={(e) => setEditData({...editData, image_url: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
              <button type="submit">Update Post</button>
            </div>
          </form>
        ) : (
          <>
            <div className="post-header">
              <h1>{post.title}</h1>
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

            {post.image_url && (
              <div className="post-image">
                <img src={post.image_url} alt={post.title} />
              </div>
            )}

            {post.content && (
              <div className="post-content">
                <p>{post.content}</p>
              </div>
            )}

            <div className="post-actions">
              <div className="secret-code-section">
                <input
                  type="text"
                  placeholder="Enter secret code to edit/delete"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="secret-code-input"
                />
                <button onClick={handleEdit} className="edit-button">
                  Edit
                </button>
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </>
        )}

        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>
          
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
            />
            <button type="submit" disabled={!newComment.trim()}>
              Add Comment
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.content}</p>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail 