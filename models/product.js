const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
    },
})

const Product = mongoose.models.Product||mongoose.model('Product', productSchema);
export default Product;