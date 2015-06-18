var _ = require('underscore');

module.exports = {

    _escape : function(str) {
        str = decodeURIComponent(str);
        return str;
    },

    _split : function(str) {
        var result = {};
        if (str) {
            _.each(str.split(/[,]+/gim), function(s) {
                if (s != '') {
                    s = this._escape(s);
                    result[s] = s;
                }
            }, this);
        }
        return _.keys(result).sort();
    },

    _getCriteria : function(params, key) {
        if (!params)
            return [];
        return this._split(params[key]);
    },

    _getWhere : function(params) {
        var result = [];
        var q = this._getCriteria(params, 'q');
        if (q.length) {
            var or = [];
            _.each(q, function(token) {
                or.push("(properties->>'label') ilike '%" + token + "%'");
                or.push("(properties->>'description') ilike '%" + token + "%'");
            })
            result.push('(' + or.join(' or ') + ')');
        }

        var types = this._getCriteria(params, 'type');
        if (types.length) {
            var or = [];
            _.each(types, function(type) {
                or.push("(properties->>'keywords') ilike '%" + type + "%'");
            });
            result.push('(' + or.join(' or ') + ')');
        }
        return result;
    },

    getId : function(params) {
        var where = this._getWhere(params);
        return JSON.stringify(where);
    },
    prepareDatasource : function(args) {
        var dataLayer = args.dataLayer;
        var config = args.config;
        var where = this._getWhere(args.params);
        if (!where.length)
            return;

        var query = dataLayer.Datasource.table;
        var str = ' and ' + where.join(' and ');
        query = query.replace(/\s*\/\*\s*where_statement\s*\*\//, str);
        console.log('QUERY:', query)
        dataLayer.Datasource.table = query;
    }

}