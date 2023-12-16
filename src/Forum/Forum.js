import './Forum.css';
import { Grid, Button,TextField,Paper, Typography,AccordionSummary,Accordion,Modal,AccordionDetails} from '@mui/material';
import React, { useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';



function Forum() {
  const [post, setPost] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [editedPost, setEditedPost] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClear = () => {
    setPost("");
  };
 

  const handlePosts = async (event) => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    // Check if required fields are filled
    event.preventDefault();
    console.log("Submitting:", {
      post,
    });
  
    if (
      !post.trim()
    ) {
      alert("Please write a posts.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/forum/addPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post,
          user: userObj
        }),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Body:", await response.text());
  
      if (response.ok) {
        // Request successful
        console.log("Posts successful");
        fetchPosts();
        handleClear();
       

      } else {
        // Handle error
        const errorMessage = await response.text();
        console.error("Request failed:", errorMessage);
        alert(`An error occurred during request: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during request:", error.message);
      alert(`An error occurred during request: ${error.message}`);
    }
  };
  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);


  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/forum/getPosts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch posts. Status Code: ${response.status}`);
        throw new Error('Failed to fetch posts');
      }

      const allPosts = await response.json();
      console.log('All Posts:', allPosts);
  
      const transformedPosts = allPosts.map(post => ({
        ...post,
        id: post.forumid,
        userr: post.user.id,
        replies: [], // Add an empty array for replies
      }));
       
      // Fetch replies for each post
    await Promise.all(
      transformedPosts.map(async post => {
        try {
          const repliesResponse = await fetch(`http://localhost:8080/forum/getReplies?postId=${post.id}`);
          if (repliesResponse.ok) {
            const repliesText = await repliesResponse.text();
            const replies = repliesText ? JSON.parse(repliesText) : [];
            post.replies = replies;
          }
        } catch (error) {
          console.error(`Error fetching replies for post ${post.id}:`, error);
        }
      })
    );
      // Filter out requests that are marked as deleted
      const activePosts = transformedPosts.filter(newPost => !newPost.isDeleted);
      setNewPosts(activePosts);
      setShowProgress(true);
  
      console.log('Successfully fetched posts');
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  
  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/forum/updatePost/${editingPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: editedPost }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to update track: ${errorResponse.message}`);
      }

      // After successful update, fetch the updated list of requests
      fetchPosts();
      setIsEditModalOpen(false);
      setEditingPostId(null);
      setEditedPost('');
      setShowSaveConfirmationModal(true);
    } catch (error) {
      console.error('Error updating track:', error.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEditIconClick = (postId, currentPost) => {
    setEditingPostId(postId);
    setEditedPost(currentPost);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingPostId(null);
    setEditedPost('');
  };

  const handleCloseSaveConfirmationModal = () => {
    setShowSaveConfirmationModal(false);
  };


  const confirmDeletePost = async (forumId) => {
    try {
      const response = await fetch(`http://localhost:8080/forum/deletePost/${forumId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Try to parse error response
        throw new Error(`Failed to delete post: ${errorResponse.message}`);
      }

      // After successful deletion
      fetchPosts();
      setShowDeleteConfirmation(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleDeleteRequest = (forumId) => {
    setRequestToDelete(forumId);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteRequest = () => {
    setRequestToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleReply = async (postId) => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const replyContent = document.getElementById("replyni-"+postId).value;
  console.log("Sending reply request - postId: " + postId + ", content: " + replyContent);

  try {
    const response = await fetch("http://localhost:8080/forum/addReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userObj.id,  
        postId,
        replyContent: replyContent
      }),
    });

    if (response.ok) {
      
      console.log("Reply added successfully");
      document.getElementById("replyni-"+postId).value=""
      setActiveReplyPostId(null); 

      fetchPosts();
    } else {
      const errorMessage = await response.text();
      console.error("Request failed:", errorMessage);
      alert(`An error occurred during reply: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error during reply:", error.message);
    alert(`An error occurred during reply: ${error.message}`);
  }
};
     
  return (
    <div>
      <div >
      <Header />
      </div>
       
       <div className='forum-container'>
      <div className="con">
        <div className="forum-title">
          <p>WHAT'S NEW ?</p>
        </div>
        <div className="para">
          <p>
            Our forum is a space for open and meaningful discussions where
            community members can connect, share knowledge, and voice their
            thoughts. It's a place to ask questions, offer insights, and engage
            with others who share your interests.
          </p>
        </div>
        <div>
          <TextField
            label="What's on your mind?"
            variant="outlined"
            id='post'
            multiline
            rows={15}
            fullWidth
            margin="normal"
            InputProps={{ style: { border: "none" } }}
            style={{ backgroundColor: "#fff" }}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>

        <Grid container spacing={2} style={{ maxWidth: "450px" }}>
          <Grid item>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fff",
                color: "#213555",
                height: "50px",
                width: "100px",
                fontWeight: "bold",
                fontSize: "1em",
              }}
              onClick={handleClear}
            >
              CLEAR
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#829CA6",
                color: "#fff",
                height: "50px",
                width: "100px",
                fontWeight: "bold",
                fontSize: "1em",
              }}
              onClick={handlePosts}
            >
              POST
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className='forum-posts'>
  {showProgress && newPosts.length > 0 && (
    <Grid container spacing={2}>
      {newPosts.map((newPost) => (
        <Grid item key={newPost.id} sm={12}>
          <Paper elevation={3} style={{ textAlign: 'left', padding: '10px', width: '80%', margin: '10px auto' }} >
          <h4 style={{fontStyle:'italic'}}> {newPost.user.username}
             {user.id !== null && user.id === newPost.userr? <>
              <Button onClick={()=>{handleEditIconClick(newPost.id, newPost.post)}} variant='contained' style={{fontSize:"16px",marginLeft: '78%'}}>EDIT
              <FontAwesomeIcon icon={faEdit} style={{marginLeft:'3px', cursor: 'pointer'}}/></Button>
              <Button onClick={()=>{handleDeleteRequest(newPost.id)}} variant='contained' color="error" style={{fontSize:"16px",marginLeft:'5px'}}>DELETE</Button>
                </>:<></>}
                </h4>
            <h3>{newPost.post}</h3>
            <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Replies</Typography>
            </AccordionSummary>
        <AccordionDetails style={{background:'#eee'}}>
        {user.id!==null?<>
          <textarea id={"replyni-"+newPost.id}/>
            <Button variant='contained' onClick={()=>{handleReply(newPost.id)}}>Reply</Button>
            <br/>
            </>:<></>}
            {console.log('REPLY:',newPost.replies)}
            {console.log('newPosts:', newPosts)}
            
            {Array.isArray(newPost.replies) && newPost.replies.length > 0 ? <>
            {newPost.replies.map((reply,id)=>{
              console.log('Current reply:', reply); // Log the reply object
              return <Paper key={id} style={{margin:'5px', padding:'10px'}} elevation={1}>
                <h3>{reply.reply}</h3>
                <h6 style={{fontStyle:'italic'}}>{reply.user.username}</h6>
                </Paper>
            })}
            </>:<>No Replies Yet</>}
          </AccordionDetails>
        </Accordion>
            </Paper>
        </Grid>
      ))}
    </Grid>
  )}
</div>

{/* Edit Modal */}
<Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <div className="forum-popup">
          <h1>Posts Edited</h1>
          <div>
  <input
    type="text"
    value={editedPost}
    onChange={(e) => setEditedPost(e.target.value)}
    style={{
      width: '200px',
      height: '40px',
    }}
  />
</div>
<div>
  <Button
    variant="contained"
    onClick={handleUpdatePost}
    style={{
      color: '#FFFFFF',
      background: '#213555',
      borderRadius: '10px',
      width: '150px',
      fontWeight: 'bold',
      marginTop: '20px',
    }}
  >
    Save
  </Button>
</div>

        </div>
      </Modal>
      {/* Save Confirmation Modal */}
      <Modal open={showSaveConfirmationModal} onClose={handleCloseSaveConfirmationModal}>
        <div className="forum-popup">
          <h1>Save Confirmation</h1>
          <p>The changes have been successfully saved.</p>
          <Button
            variant="contained"
            onClick={handleCloseSaveConfirmationModal}
            style={{
              color: '#FFFFFF',
              background: '#213555',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
              marginTop: '20px',
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
       {/* Delete Confirmation Modal */}
       <Modal open={showDeleteConfirmation} onClose={cancelDeleteRequest}>
        <div className="forum-popup2">
          <h1>Delete Confirmation</h1>
          <p>Are you sure you want to delete this request?</p>
          <Button
            variant="contained"
            onClick={() => confirmDeletePost(requestToDelete)}
            style={{
              color: '#FFFFFF',
              background: '#213555',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={cancelDeleteRequest}
            style={{
              color: '#FFFFFF',
              background: '#FF0000',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
            }}
          >
            No
          </Button>
        </div>
      </Modal>
       {/* Success Modal */}
       <Modal open={showSuccessModal} onClose={handleCloseSuccessModal}>
        <div className="forum-popup2">
          <h1>Deletion Successful</h1>
          <p>The request has been successfully deleted.</p>
          <Button
            variant="contained"
            onClick={handleCloseSuccessModal}
            style={{
              color: '#FFFFFF',
              background: '#213555',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
              marginTop: '20px',
              marginLeft:'75px'
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
    </div>
  );
}

export default Forum;
