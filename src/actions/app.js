import * as sel from '../selectors';

const exportToCsv = (data, fields) => {
    let csvContent = data.reduce((acc, info) => {
        let row = "";
        fields.forEach(f => row += `"${info[f]}",`)
        return acc + row + "\n";
    }, "");
    const titles = fields.reduce((acc, f) => acc + `"${f}",`, "");
    const csv = "data:text/csv;charset=utf-8," + titles + "\n" + csvContent;
    const content = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', content);
    link.setAttribute('download', "data");
    link.click();;
}

export const exportData = () => 
    (dispatch, getState) => {
        const events = sel.userEventsAggregateByType(getState())
        const data = [].concat.apply([], Object.keys(events).map(type => events[type].items));
    
        const fields = ['type', 'date', 'title', 'url', 'merged', 'closed'];
        exportToCsv(data, fields);
    };