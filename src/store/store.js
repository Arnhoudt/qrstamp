import {configureStore} from '@reduxjs/toolkit'
import { QrSlice } from './QrSlice'

export const store = configureStore(
    {
        reducer: {
            qr: QrSlice.reducer,
        }
    }
)

export const {setQrTranslate, setQrScale, setQrRotate, setQrValue, setQrForground, setQrBackground} = QrSlice.actions