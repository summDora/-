export function changeDate(value) {
    // value 为标准时间
    var year = value.getFullYear()
    var month= (value.getMonth()+1).toString().padStart(2,'0')
    var day = (value.getDate()).toString().padStart(2,'0')
    // var hour = value.getHours();
    // var minute = value.getMinutes();
    // var second = value.getSeconds();
    var formatting = year+'-'+month+'-'+day;
    console.log(formatting);
    return formatting
}