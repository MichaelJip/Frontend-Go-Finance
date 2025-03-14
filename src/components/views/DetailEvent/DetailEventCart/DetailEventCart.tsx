import { ICart, ITicket } from "@/types/ticket";
import { convertIDR } from "@/utils/formatCurrency";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  onCreateOrder: () => void;
  isLoading: boolean;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity, isLoading, onCreateOrder } =
    props;
  const session = useSession();
  const router = useRouter();
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      {session.status === "authenticated" ? (
        <Fragment>
          <CardBody>
            <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
            {cart?.ticket === "" ? (
              <p className="text-foreground-500">Your cart is empty</p>
            ) : (
              <div className="items-center justify-between sm:flex-col lg:flex lg:flex-row">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold">{dataTicketInCart.name}</h4>
                  <div className="flex items-center gap-2">
                    <Button
                      size="md"
                      variant="bordered"
                      className="h-9 w-9 min-w-0 scale-90 rounded-full font-bold text-foreground-500"
                      onPress={() => onChangeQuantity("decrement")}
                    >
                      -
                    </Button>
                    <span className="text-lg font-bold">{cart.quantity}</span>
                    <Button
                      size="md"
                      variant="bordered"
                      className="h-9 w-9 min-w-0 scale-90 rounded-full font-bold text-foreground-500"
                      onPress={() => onChangeQuantity("increment")}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <p className="font-bold">
                  {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
                </p>
              </div>
            )}
            <Divider />
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              size="md"
              disabled={cart.quantity === 0 || isLoading}
              className="disabled:bg-primary-200"
              fullWidth
              isLoading={isLoading}
              onPress={onCreateOrder}
            >
              Checkout
            </Button>
          </CardFooter>
        </Fragment>
      ) : (
        <CardBody>
          <Button
            color="primary"
            size="lg"
            as={Link}
            href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
          >
            Login for book ticket
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default DetailEventCart;
