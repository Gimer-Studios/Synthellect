document.addEventListener('DOMContentLoaded', (event) => {
    const postsContainer = document.getElementById('postsContainer');
    const searchBar = document.getElementById('searchBar');

    let startIndex = 0;

    function displayPosts(filteredPosts, count = 25) {
        const visiblePosts = filteredPosts.slice(startIndex, startIndex + count);

        visiblePosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            const postUsername = document.createElement('h2');
            postUsername.textContent = post.post_username;
            postUsername.className = 'post-username';

            const postText = document.createElement('p');
            postText.textContent = post.post_text;
            postText.className = 'post-text';

            const postDate = document.createElement('p');
            postDate.className = 'post-date';
            postDate.textContent = post.post_date;

            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.className = 'like-button';

            const repostButton = document.createElement('button');
            repostButton.textContent = 'Repost';
            repostButton.className = 'repost-button';

            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share';
            shareButton.className = 'share-button';
            shareButton.addEventListener('click', () => {
                navigator.clipboard.writeText('https://synthellect.gimerstudios.com');
                alert('Link copied to clipboard!');
            });

            postDiv.appendChild(postUsername);
            postDiv.appendChild(postText);
            postDiv.appendChild(postDate);
            postDiv.appendChild(likeButton);
            postDiv.appendChild(repostButton);
            postDiv.appendChild(shareButton);

            postsContainer.appendChild(postDiv);
        });

        startIndex += count;
    }

    function loadMorePosts() {
        fetch('https://sql.gimerstudios.com:3000/posts')
            .then(response => response.json())
            .then(posts => {
                posts.reverse();
                displayPosts(posts);
            })
            .catch(error => console.error('Error:', error));
    }

    // Initial load
    loadMorePosts();

    searchBar.addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.post_username.toLowerCase().includes(searchQuery) ||
            post.post_text.toLowerCase().includes(searchQuery)
        );
        displayPosts(filteredPosts);
    });

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMorePosts();
        }
    });
});
