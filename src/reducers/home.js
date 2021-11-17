

let initState = {
    test: '',
}

export default (state=initState, action) => {
    switch(action.type){
        case 'TEST_ACTION':
            return {...state, test: action.value}
        default:
            return state
    }
}