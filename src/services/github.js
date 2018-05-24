import request from 'superagent';
const GITHUB_API_URL = "https://api.github.com";

export const paths = {
    getUserEventsUrl: (username) => `${GITHUB_API_URL}/users/${username}/received_events/public`
};

export const getUserEvents = (username) =>
    request.get(paths.getUserEventsUrl(username));