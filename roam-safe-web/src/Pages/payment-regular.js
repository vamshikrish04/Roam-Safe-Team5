import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/layout";
import Imgcredit from "../Images/credit-card.png";
import { getApihandler, postApihandler } from "../Apihandler";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";

function PaymentPageRagular() {
   let history = useNavigate();
  const { userId, mechId, bookingId } = useParams();
  console.log("Idsr--->", userId);
  console.log("Idsm--->", mechId);
  console.log("Idst--->", bookingId);
  const { register, handleSubmit, reset } = useForm();

  const [amount, setAmount] = useState();
  useEffect(()=>{
    getAmount();
},[])
const getAmount = async()=>{
  const res = await getApihandler(`/getAmountForRegularBooking/${bookingId}`);
  console.log("res-->", res);
  setAmount(res.data.amount);

}
  const onSubmit = async (value) => {
    const { card_number, cvv, expire_date } = value;
    const data = {
      card_number: card_number,
      cvv: cvv,
      expire_date: expire_date,
      amount: Number(amount),
    };
    console.log("value--->", data);
    const res = await postApihandler(
      `/bookingPaymentforMechanic/${bookingId}/${userId}/${mechId}`,
      data
    );
    console.log("res----->",res);
     if (res.status === 200) {
       Swal.fire({
         position: "middle-centre",
         icon: "success",
         title: `${res.message}`,
         showConfirmButton: false,
         timer: 2000,
       });

       history("/booking-history-user");
     } else {
       swal("Sorry!", `${res.error.response.data.message}`, "error");
     }
  };

  return (
    <Layout>
      <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
        <img src={Imgcredit} className="Credit-card-css" />
        <h2 className="text-center mt-3">Credit Card</h2>
        <div className="form-group mt-5">
          <input
            type="number"
            className="form-control mt-3"
            placeholder="Amount"
            value={amount}
           
          />

          <input
            type="text"
            className="form-control mt-3"
            placeholder="Card Number"
            name="card_number"
            {...register("card_number")}
            maxLength="16"
          />
          <div className="expiry-and-cvc-container mt-3">
            <input
              type="text"
              className="form-control expiration-date-field"
              placeholder="MM/YY"
              name="expire_date"
              {...register("expire_date")}
            />
            <input
              type="text"
              className="form-control cvc-field ml-3"
              placeholder="CVV"
              name="cvv"
              {...register("cvv")}
              maxLength="3"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-5"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <hr />
      </form>
    </Layout>
  );
}

export default PaymentPageRagular;
