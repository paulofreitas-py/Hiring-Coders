// mongodb nao usa migrations. com ele se usa o schema aqui apresentado

import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Number,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true,
});

export default mongoose.model('Notifications', NotificationSchema);
