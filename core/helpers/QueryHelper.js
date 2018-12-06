QueryHelper = {
    parse: (query) => {
        const parsedQueries = {
            limit: parseInt(query['limit']) || 0,
            skip: parseInt(query['skip']) || 0,
            sort: query['sort'] || null,
            fields: query['fields'] || null,
        }
        
        return parsedQueries;
    }
}

module.exports = QueryHelper;