import { act } from "react";
import { combineReducers, createStore } from "redux";


const INITIAL_STATE = {
    apiUrl : "https://api.unsplash.com",
    apiAccessToken :"",
    apiPage : 1,
    images : [],
    searchValue : null,
    loadValue : 'loading...',
    intersectStatus : false,
    imgLoading :true,
    intersectVisible : false,
    recomendedImages : [],
    mainImage : {}

}

function reducer(state = INITIAL_STATE , action) {
    return {
        ...state,
        apiPage : apiPage(state.apiPage,action),
        searchValue : input(state.searchValue,action),
        images : images(state.images,action),
        intersectStatus : isVisible(state.intersectStatus,action),
        imgLoading : isVisible(state.imgLoading,action),
        intersectVisible : isVisible(state.intersectVisible,action),
        loadValue : loadValue(state.loadValue,action),
        recomendedImages : recomendedImages(state.recomendedImages,action),
        mainImage : mainImage(state.mainImage,action)
    }
}
function loadValue(state,action) {
    if(action.type === "loadvalue") {
        return action.payload
    }else {
        return state
    }
}
function mainImage(state,action) {
    if(action.type === "setMainImage") {
        return action.payload
    }else {
        return state
    }
}
function apiPage(prevState, action) {
    switch(action.type) {
        case "page-up" : return prevState ++
        case "page-down" : return prevState --
        case "page" : return action.payload
        default : return prevState
    }
}

function setApiPage(prevState,action) {
    switch(action.type) {
        case "increment" : prevState + 1
        default : prevState
    }
}
function input(prevState,action) {
    if(action.type == "input") {
        return action.payload
    } else {
        return prevState    
    }
}

function images(prevState,action) {
    if(action.type === "add-images") {
        return prevState.concat(action.payload)
    }else if(action.type === "create-images") {
        return action.payload
    }else {
        return prevState
    }
}
function recomendedImages(prevState,action) {
    if(action.type === "add-RecImages") {
        return prevState.concat(action.payload)
    }else if(action.type === "create-RecImages") {
        return action.payload
    }else {
        return prevState
    }
}

function isVisible(prevState,action) {
    switch(action.type) {
        case "intersect" : return action.payload
        case "img-loading" : return action.payload
        default : return prevState
    }
}


const store = createStore(reducer)

export default store
