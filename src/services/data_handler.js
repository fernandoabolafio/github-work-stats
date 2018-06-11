import get from 'lodash/fp/get';

export const aggregateBy = key => items => 
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


export const aggregateByDeepKey = keys => items => 
    items.reduce((acc, item) => {
        const value = get(keys, item);
        if(!value)
            return acc;
        if(!acc[value]) {
            acc[value] = [item];
        } else {
            acc[value].push(item);
        }
        return acc;
    }, {})


export const toArray = obj => 
    Object.keys(obj).map(key => obj[key]);

export const resumeAggregate = agg => 
    Object.keys(agg).map(type => ({
        name: type,
        count: agg[type].length
    }));