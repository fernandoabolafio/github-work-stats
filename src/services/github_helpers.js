import get from 'lodash/fp/get';
import moment from 'moment';


// Event types
export const ET_PR = "PullRequestEvent";
export const ET_ISSUE = "IssuesEvent";
export const ET_CREATE = "CreateEvent";
export const ET_PR_REVIEW = "PullRequestReviewCommentEvent";
export const ET_PUSH = "PushEvent";

const eventInfos = {
    [ET_PR]: {
        payloadName: "pull_request"
    },
    [ET_ISSUE]: {
        payloadName: "issue"
    },
    [ET_CREATE]: {
        payloadName: ""
    },
    [ET_PR_REVIEW]: {
        payloadName: "comment"
    },
    [ET_PUSH]: {
        payloadName: ""
    }
};


const getEventTitle = (event) => {
    const eventInfo = eventInfos[event.type];
    const title = eventInfo ? get(["payload", eventInfo.payloadName, "title"], event) : "N/A"
    return title || "N/A";
}

const getEventUrl = (event) => {
    const eventInfo = eventInfos[event.type];
    const title = eventInfo ? get(["payload", eventInfo.payloadName, "url"], event) : "N/A"
    return title || "N/A";
}

const getPRMerged = event => {
    if(event.type !== ET_PR)
        return "N/A"
    return event.payload.pull_request.merged_at || "unmerged";
}

const getIssueOrPrClosed = event => {
    if(event.type !== ET_ISSUE && event.type !== ET_PR)
        return "N/A"
    const { payloadName } = eventInfos[event.type];
    return event.payload[payloadName].closed_at || "still openned"
}

export const summarizeEvent = ev => ({
    type: ev.type,
    date: moment(ev.created_at).format(),
    url: getEventUrl(ev),
    title: getEventTitle(ev),
    closed: getIssueOrPrClosed(ev),
    merged: getPRMerged(ev)
});