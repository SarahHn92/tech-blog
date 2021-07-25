const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blogName').value.trim();
    const body= document.querySelector('#blogBody').value.trim();
    const description = document.querySelector('#blogDesc').value.trim();

    if (name && body && description) {
        const response = await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({ name, body, description }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Blogpost failed to compile!');
        }
    }
};

const deleteBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id'));

    const response = await fetch(`/api/dashboard/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete!');
    }
};

