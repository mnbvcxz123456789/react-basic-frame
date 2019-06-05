export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}

export function getUserInfo() {
    // return function(dispatch) {
    //     dispatch(getUserInfoRequest);
    //     return fetch('http://0.0.0.0:8080/api/user.json')
    //             .then(response => {
    //                 deubgger;
    //                 return response.json()
    //             })
    //             .then( json => {
    //                 dispatch(getUserInfoSuccess(json))
    //             }).catch(() => {
    //                 dispatch(getUserInfoFail())
    //             })
    // }
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.get('http://0.0.0.0:8080/api/user.json'),
        // afterSuccess: (dispatch, getState, response) => {
        //     // 请求成功后执行的函数
        // },
        // otherData: otherData
    }
}