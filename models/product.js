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
        type: Float32Array,
        required: true
    },
    imagePath: {
        type: String,
        required: true,
    },
})

const Product = mongoose.models.Product||mongoose.model('Product', productSchema);
export default Product;