import { useState, useEffect } from "react";
import css from "./OrderHistoryCard.module.css";
import OrderDetails from "../../../Modals/OrderDetailsModal/OrderDetails";

const OrderHistoryCard = ({ udata, setViewDet, setOrderId }) => {
  const {
    id,
    imgSrc,
    name,
    address,
    orderNum,
    items,
    orderedOn,
    itemTotal,
    coupon,
    taxesandcharges,
    totalSavings,
    grandTotal,
    paymentType,
    orderStatus,
    phoneNum,
    deliveredTo,
    fssaiNo,
    fav,
    summaryLinkId,
  } = udata;

  useEffect(() => {
    const loadRazorpay = async () => {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("You are offline... Failed to load Razorpay SDK");
      }
    };

    loadRazorpay();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const options = {
      key: "rzp_test_ccIIeBfQT9brlp",
      currency: "INR",
      amount: amount * 100,
      name: "Paradise Hotel",
      description: "Thanks for purchasing",
      image: "",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successful");
      },
      prefill: {
        name: "Shezad Khot",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePayment = () => {
    displayRazorpay(grandTotal);
  };


  return (
    <>
      <div className={css.outerDiv}>
        <div className={css.innerDiv}>
          <div className={css.topBar}>
            <div className={css.leftHead}>
              <div className={css.imgBox}>
                <img className={css.img} src={imgSrc} alt="Picture" />
              </div>
              <div className={css.det}>
                <div className={css.name}>{name}</div>
                <div className={css.address}>{address}</div>
              </div>
            </div>
            <div className={css.status}>{orderStatus}</div>
          </div>
          <div className={css.midBar}>
            <div className={css.txtBox}>
              <div className={css.titleTxt}>ORDER NUMBER</div>
              <div className={css.vlaTxt}>{orderNum}</div>
            </div>
            <div className={css.txtBox}>
              <div className={css.titleTxt}>TOTAL AMOUNT</div>
              <div className={css.vlaTxt}>₹ {grandTotal}</div>
            </div>
            <div className={css.txtBox}>
              <div className={css.titleTxt}>ITEMS</div>
              {items?.map((val, i) => {
                return (
                  <div className={css.itemDet} key={i}>
                    <span className={css.qtyTxt}>{val?.qty}</span>
                    <span className={css.cross}>X</span>
                    <div className={css.vlaTxt}>{val?.itemName}</div>
                  </div>
                );
              })}
            </div>
            <div className={css.txtBox}>
              <div className={css.titleTxt}>ORDERED ON</div>
              <div className={css.vlaTxt}>{orderedOn}</div>
            </div>
          </div>
          <div className={css.footerBar}>
            <div className="d-flex justify-content-center align-items-center flex-end gap-2">
              <button
                className={`btn btn-primary`} // Add Bootstrap btn and btn-primary classes
                onClick={() => {
                  setViewDet((val) => !val);
                  setOrderId(id);
                }}
              >
                View Details
              </button>
                <button
              className={`btn btn-success`}
              onClick={handlePayment}
            >
              Pay Now
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryCard;
