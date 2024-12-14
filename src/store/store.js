import { configureStore } from "@reduxjs/toolkit";
import article from "../slices/article";


export default configureStore({
    reducer: {
      article :article
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  

