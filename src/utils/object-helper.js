

const _randomSlice = (arr, size) => {
    if(Array.isArray(arr)) {
        let newArr = [...arr]
        newArr.splice(Math.floor(Math.random()*arr.length),1)
        return arr.length <=(size + 1) ? newArr : _randomSlice(newArr, size)
    } else throw new Error("the first argument of the function must be an array")
}

export {
    _randomSlice
}