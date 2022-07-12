import { createSlice } from "@reduxjs/toolkit";

export const QrSlice = createSlice({
    name: 'qr',
    initialState: {
        translate: [0,0],
        scale: [129,128],
        rotate: 0,
        value: "www.antonkindt.be",
        forground: "#000000",
        background: "#ffffff",
    },
    reducers: {
        setQrTranslate: (state, action) => {
            state.translate = action.payload;
        },
        setQrScale: (state, action) => {
            state.scale = action.payload;
        },
        setQrRotate: (state, action) => {
            state.rotate = action.payload;
        },
        setQrValue: (state, action) => {
            state.value = action.payload;
        },
        setQrForground: (state, action) => {
            state.forground = action.payload;
        },
        setQrBackground: (state, action) => {
            state.background = action.payload;
        },
    }
})