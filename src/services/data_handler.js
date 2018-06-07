
export const aggregateBy = (items, key) => 
    items.reduce((acc, item) => {
        if(!item[key]) 
            return acc
        if (!acc[item[key]]) {
            acc[item[key]] = [item]
        } else {
            acc[item[key]].push(item)
        }
        return acc;
    }, {});
