const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blogName').value.trim();
    const body= document.querySelector('#blogBody').value.trim();

    if (name && body) {
        const response = await fetch(`/api/dash`, {
            method: 'POST',
            body: JSON.stringify({ name, body }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert('Blogpost failed to compile!');
        }
    }
};

const deleteBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id'));

    const response = await fetch(`/api/dash/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Failed to delete!');
    }
};

const addComment = async (event) => {
    event.preventDefault();
    
    const postId = document.querySelector('#addCommentBtn').getAttribute('data-id');
    const comment = document.querySelector('#addComment').value.trim();

    if (postId && comment) {
        const response = await fetch('/api/comment/', {
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
