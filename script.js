const key = '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';

const getProfile = async (username = '') => {
    // get value from search bar if not default search
    if (username === ''){
        username = document.querySelector('#search-input').value;
    }
    const apiUrl = `https://api.github.com/users/${username}`
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if (data.message === 'Not Found'){
            console.error('User Not Found')
            return;
        }
        const details = document.querySelector('.details');
        details.innerHTML = `
        <div class="pfp-wrapper">
            <img class="pfp" src="${data.avatar_url}">
        </div>
        <div class="text-wrapper">
            <div class="name">${data.name || data.login}</div>
            <div class="login">@${data.login }</div>
            <div class="bio">${data.bio || 'Account doesn\'t have a bio.'}</div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-name">Public Repos</div>
                    <div class="stat-value">${data.public_repos}</div>
                </div>
                <div class="stat">
                    <div class="stat-name">Followers</div>
                    <div class="stat-value">${data.followers}</div>
                </div>
                <div class="stat">
                    <div class="stat-name">Following</div>
                    <div class="stat-value">${data.following}</div>
                </div>
            </div>
            <div class="links">
                <div class="link">
                    <div class="link-name">Github: </div>
                    <a class="link-value" href="${changeUrl(data.url)}">${changeUrl(data.url)}</a>
                </div>
                <div class="link">
                    <div class="link-name">Repos: </div>
                    <a  class="link-value" href="${changeUrl(data.repos_url)}">${changeUrl(data.repos_url)}</a>
                </div>
            </div>
        </div>

        `
    } catch(error){
        console.error(error);
    }
}

// change api links such that they function
function changeUrl(url){
    url = url.replace('api.', '');
    url = url.replace('users/', '')
    if (url.includes('/repos')){
        url = url.replace('/repos', '?tab=repositories')
    }
    return url;
}

window.addEventListener('DOMContentLoaded', async event => {
    await getProfile('kovaak');
})
