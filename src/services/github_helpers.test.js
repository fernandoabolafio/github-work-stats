import * as githelp from './github_helpers';
import moment from 'moment';
import MOCK_EVENTS from '../../mocks/user_events.json';

describe("test helper functions to manipulate github data", () => {
    
    it("generates a summary for a push event", () => {
        const event = MOCK_EVENTS.filter(ev => ev.type === githelp.ET_PUSH)[0];
        expect(event).toBeTruthy();
        const summary = githelp.summarizeEvent(event);
        expect(summary).toEqual({
            type: event.type,
            date: moment(event.created_at).format(),
            url: 'N/A',
            title: 'N/A',
            closed: 'N/A',
            merged: 'N/A'
        });
    });

    it("generates a summary for a pull request event", () => {
        const event = MOCK_EVENTS.filter(ev => ev.type === githelp.ET_PR)[0];
        expect(event).toBeTruthy();
        const summary = githelp.summarizeEvent(event);
        
        expect(summary).toEqual({
            type: event.type,
            date: moment(event.created_at).format(),
            title: event.payload.pull_request.title,
            url: event.payload.pull_request.url,
            closed: "still openned",
            merged: "unmerged"
        });
    });
})