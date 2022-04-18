import {Component,createRef} from "react";
import ProductAttributes from "./ProductAttributes/ProductAttributes";
import classes from "./ProductDescription.module.css"
import Button from "../../UI/Button/Button";
class ProductDescription extends Component
{
    constructor(props) {
        super(props);
        this.productDescription = createRef()
        this.state = {
            currentMainImageSource: this.props.gallery[0]
        }
    }
    componentDidMount() {
        // parse the incoming HTML elements and add some margin
        this.productDescription.current.innerHTML = this.props.description
        Array.from(this.productDescription.current.children).forEach(child => child.style.marginBottom = "0.8rem")
    }

    productImageClickedHandler = (newImgSource) => {
        this.setState({currentMainImageSource: newImgSource})
    }

    render()
    {
        const productImages = this.props.gallery.map(imgSource => <img onClick={() => this.productImageClickedHandler(imgSource)}
                                                                       key={imgSource}
                                                                       className={classes.ProductImage}
                                                                       src={imgSource}
                                                                       alt={`${this.props.name} gallery`}/>)

        // get the price object based on the current selected currency
        const productPrice = this.props.prices.find(price => price.currency.label === this.props.currency.label)

        // determine the current main image to be shown
        const currentMainImageElement = Array.from(productImages).find(img => img.key === this.state.currentMainImageSource)

        // determine whether the product is already added to cart or not in order to disable the add to cart button if so
        const addedToCart = this.props.cartProducts.find(cartProduct => cartProduct.product.id === this.props.id)
        // determine whether any attribute is selected or not, to make the button disabled in case on not selecting any product attribute
        const attributesSelected = this.props.attributes.every(attribute => attribute.value !== "")
        return(
            <section className={classes.ProductDescription}>
                <div className={classes.ProductGallery}>
                    {productImages}
                </div>
                <div className={classes.Product}>
                    <div className={classes.ProductMainImage}>
                        {currentMainImageElement}
                    </div>
                    <div className={classes.ProductDetails}>
                        <h2 className={classes.ProductName}>{this.props.name}</h2>
                        <p className={classes.ProductBrand}>{this.props.brand}</p>
                        <ProductAttributes
                            attributes={this.props.attributes} changeAttribute={this.props.changeAttribute}
                            inProductDescription={this.props.inProductDescription} productId={this.props.id}
                            contentName={this.props.contentName}
                            noCartOverlay={this.props.noCartOverlay}
                        />
                        <div>
                            <h2 className={classes.ProductPrice}>price</h2>
                            <span>{productPrice.currency.symbol} {productPrice.amount}</span>
                        </div>
                        <Button primary clicked={this.props.addToCart} disabled={addedToCart || !attributesSelected}>add to cart</Button>
                        <div className={classes.ProductTextDescription} ref={this.productDescription}>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ProductDescription;