import { configureStore} from "@reduxjs/toolkit";
import UserInfoSlice from "./slices/UserInfoSlice";
import CommentSlice from "./slices/CommentSlice";
import CommunitySlice from "./slices/CommunitySlice";
import AttractionSlice from "./slices/AttractionSlice";
import RentalShopSlice from "./slices/RentalShopSlice";

const store = configureStore({
    reducer:{
        userInfo: UserInfoSlice,
        comment:CommentSlice,
        community:CommunitySlice,
        attraction:AttractionSlice,
        rentalShop:RentalShopSlice,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),
    devTools: true
});

export default store;