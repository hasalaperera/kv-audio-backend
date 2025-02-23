import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.shutterstock.com/shutterstock/photos/2470054311/display_1500/stock-vector-avatar-gender-neutral-silhouette-vector-illustration-profile-picture-no-image-for-social-media-2470054311.jpg"
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false 
    }
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;