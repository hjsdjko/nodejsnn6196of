Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(), 
        "m+": this.getMinutes(),
        "s+": this.getSeconds(), 
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export default {

	isNothing (prop) {
		return prop === null || prop === undefined || prop === ''
	},
	getDateTimeFormat (days=0, fmt='yyyy-MM-dd hh:mm:ss') {
		return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days).Format(fmt)
	},
    translateDataToTree(data) {
        let parents = data.filter(value => value.parentid == 0)
        let children = data.filter(value => value.parentid != 0)
        let translator = (parents, children) => {
            parents.forEach((parent) => {
                children.forEach((current, index) => {
                    if (current.parentid === parent.id) {
                        let temp = JSON.parse(JSON.stringify(children))
                        temp.splice(index, 1)
                        translator([current], temp)
                        typeof parent.childs !== 'undefined' ? parent.childs.push(current) : parent.childs = [current]
                    }
                })}
            )
        }
        translator(parents, children)
        return parents
    },
    
}
