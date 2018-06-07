import request from 'superagent';
const GITHUB_API_URL = "https://api.github.com";

export const paths = {
    getUserEventsUrl: (username) => `${GITHUB_API_URL}/users/${username}/events?publicpage=1&per_page=300`
};

export const getUserEvents = (username) =>
    request.get(paths.getUserEventsUrl(username));