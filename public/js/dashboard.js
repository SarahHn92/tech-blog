const newFormHandler = async (event) => {
    event.preventDefault();

    const blogName = document.querySelector('#blogName').value.trim();
    const blogBody= document.querySelector('#blogBody').value.trim();

    if (blogName && blogBody) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({ blogName, blogBody }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Blogpost failed to compile!');
        }
    }
};

const deleteBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id'));

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete!');
    }
};

const addComment = async (event) => {
    event.preventDefault();
    
    const postId = document.querySelector('#addCommentBtn').getAttribute('data-id');
    const comment = document.querySelector('#addComment').value.trim();

    if (postId && comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.status)
        }
    }
};


if (document.querySelector('.newPostForm')) {
    document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);
}

if (document.querySelector('#deletePost')) {
    document.querySelector('#deletePost').addEventListener('click', deleteBtnHandler);
}
