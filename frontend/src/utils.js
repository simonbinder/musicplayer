//link: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
