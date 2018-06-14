import request from 'superagent';
const GITHUB_API_URL = "https://api.github.com";

export const paths = {
    getUserEventsUrl: (username, page) => `${GITHUB_API_URL}/users/${username}/events?publicpage=${page}&per_page=300`
};

export const getUserEvents = (username) => {
    const promisses = [
        request.get(paths.getUserEventsUrl(username, 1)),
        request.get(paths.getUserEventsUrl(username, 2)),
        request.get(paths.getUserEventsUrl(username, 3))
    ]
    return new Promise((resolve, reject) => {
        Promise.all(promisses).then((responses) => {
            const data = [].concat.apply([],responses.map(r => r.body));
            resolve(data);
        })
    })
}
    