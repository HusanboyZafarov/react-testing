import { render, screen } from "@testing-library/react";
import QuantitySelector from "../../src/components/QuantitySelector";
import { CartProvider } from "../../src/providers/CartProvider";
import { Product } from "../../src/entities";
import userEvent from "@testing-library/user-event";

describe("QuantitySelector", () => {
  const renderComponent = () => {
    const product: Product = {
      id: 1,
      name: "Milk",
      price: 5,
      categoryId: 1,
    };

    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    );

    const getAddToCartButton = () =>
      screen.queryByRole("button", { name: /add to cart/i });

    const getQuantityControls = () => ({
      quantity: screen.queryByRole("status"),
      incrementButton: screen.queryByRole("button", { name: "+" }),
      decrementButton: screen.queryByRole("button", { name: "-" }),
    });

    const user = userEvent.setup();

    const addToCart = async () => {
      const button = getAddToCartButton();
      await user.click(button!);
    };

    const incrementQuantity = async () => {
      const { incrementButton } = getQuantityControls();
      await user.click(incrementButton!);
    };

    const decrementQuantity = async () => {
      const { decrementButton } = getQuantityControls();
      await user.click(decrementButton!);
    };

    return {
      getAddToCartButton,
      getQuantityControls,
      addToCart,
      incrementQuantity,
      decrementQuantity,
    };
  };

  it("should render the Add to Cart button", () => {
    const { getAddToCartButton } = renderComponent();

    expect(getAddToCartButton()).toBeInTheDocument();
  });

  it("should add the product to cart", async () => {
    const { getAddToCartButton, getQuantityControls, addToCart } =
      renderComponent();

    await addToCart();

    const { quantity, decrementButton, incrementButton } =
      getQuantityControls();

    expect(quantity).toHaveTextContent("1");
    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(getAddToCartButton()).not.toBeInTheDocument();
  });

  it("should increment the quantity", async () => {
    const { getQuantityControls, addToCart, incrementQuantity } =
      renderComponent();
    await addToCart();

    await incrementQuantity();

    const { quantity } = getQuantityControls();
    expect(quantity).toHaveTextContent("2");
  });

  it("should decrement the quantity", async () => {
    const {
      getQuantityControls,
      addToCart,
      incrementQuantity,
      decrementQuantity,
    } = renderComponent();
    await addToCart();
    await incrementQuantity();

    await decrementQuantity();

    const { quantity } = getQuantityControls();
    expect(quantity).toHaveTextContent("1");
  });

  it("should remove product from the cart", async () => {
    const {
      getAddToCartButton,
      getQuantityControls,
      addToCart,
      decrementQuantity,
    } = renderComponent();
    await addToCart();
    const { quantity, decrementButton, incrementButton } =
      getQuantityControls();

    await decrementQuantity();

    expect(quantity).not.toBeInTheDocument();
    expect(decrementButton).not.toBeInTheDocument();
    expect(incrementButton).not.toBeInTheDocument();
    expect(getAddToCartButton()).toBeInTheDocument();
  });
});
